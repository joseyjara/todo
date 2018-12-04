import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular'
import { TodosService, Todos, Tasks } from '../services/todos.service';
import { generate, observe } from 'fast-json-patch'
import { Location } from '@angular/common';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  @ViewChild('tasksGrid') tasksGrid: DxDataGridComponent;

  todoKey: number = 0;
  todoDetail: Todos;
  taskList: Tasks[] = [];
  formValid: boolean = true;

  todoObserver: any;
  taskListObserver: any;

  taskGridPendingChanges: boolean;
  taskGridUpdateInProgress: boolean;
  todoTasksToCreate: Tasks[] = [];
  todoTasksKeysToDelete: number[] = [];
  todoTasksToUpdate: Tasks[] = [];
  

  todoForm = new FormGroup({
    todoListName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  
  constructor(private _location: Location, private route: ActivatedRoute, private router: Router, private todoService: TodosService ) {
  }

  ngOnInit() {

    this.todoKey = parseInt(this.route.snapshot.params['todoKey']);
    if (this.todoKey > 0) {
      const todoSub = this.todoService.getTodoDetails(this.todoKey).subscribe(res => {
        this.setTodoForm(res);
      }, err => {
        console.log('cannot get details for selected todo', err)
      }, () => {
        if (todoSub) todoSub.unsubscribe();
      });

      const tasksSub = this.todoService.getTodoTaks(this.todoKey).subscribe(res => {
        this.setTasksGrid(res);
      }, err => {
        console.log('cannot get tasks for selected todo', err);
      }, () => {
        if (tasksSub) tasksSub.unsubscribe();
      })
    }
    else {
      this.todoDetail = new Todos();
    }
  }

  setTodoForm(todos: Todos) {
    this.todoDetail = todos;
    this.todoObserver = observe(this.todoDetail);
    this.todoForm.controls['todoListName'].setValue(todos.todoListName);
  }

  setTasksGrid(tasks: Tasks[]) {
    this.taskList = tasks;
  }

  onInitNewTaskRow(e: any) {
    e.data = {
      'completed': false
    }
  }

  rowInserting(e: any) {
    
    this.taskGridUpdateInProgress = true;
    if (e.data) {
      console.log('inserting row');
      e.cancel = false;
      this.taskGridPendingChanges = true;
    } else {
      e.cancel = true;
    }
  }

  rowInserted(e: any) {
    const task = e.data as Tasks;
    console.log('pushing new task');
    if (task) {
      
      task.todoKey = this.todoKey;
      this.todoTasksToCreate.push(task);
    }
  }

  rowUpdating(e: any) {
    this.taskGridPendingChanges = true;
    this.taskGridUpdateInProgress = true;
  }

  rowUpdated(e: any) {
    if (e.key) {
      const taskToUpdate = this.taskList.find(x => x.taskKey == e.key);

      if (e.data.taskDescription)
        taskToUpdate.taskDescription = e.data.taskDescription;
      if (e.data.completed)
        taskToUpdate.completed = e.data.completed;

      this.todoTasksToUpdate.push(taskToUpdate);
    }    
  }

  rowRemoving(e: any) {
    this.taskGridUpdateInProgress = true;
    this.taskGridPendingChanges = true;
  }

  rowRemoved(e: any) {
    if (e.key)
      this.todoTasksKeysToDelete.push(e.key);
  }

  todoContentReady(e: any) {
    if (this.taskGridPendingChanges) {
      this.taskGridUpdateInProgress = false;
      this.taskGridPendingChanges = false;
      setTimeout(() => { this.saveGridData(); }, 100)
    } else {
      if (this.taskGridUpdateInProgress) {
        this.taskGridUpdateInProgress = false;
        this.tasksGrid.instance.cancelEditData();
      }
    }
  }

  saveGridData() {
    var taskData: TasksBatch = new TasksBatch();
    taskData.TasksToCreate = this.todoTasksToCreate;
    taskData.TasksKeysToDelete = this.todoTasksKeysToDelete;
    taskData.TasksToUpdate = this.todoTasksToUpdate;
    if (this.todoKey) {
      const saveGridSub = this.todoService.saveTasksBatch(this.todoKey, taskData).subscribe(res => {
        this.tasksGrid.instance.cancelEditData();
      }, err => {
          console.log('cannot save tasks', err);
        }, () => {
          if (saveGridSub) saveGridSub.unsubscribe();
          this.resetTaskData();
      });
    }
  }

  resetTaskData() {
    this.todoTasksToCreate = [];
    this.todoTasksKeysToDelete = [];
    this.todoTasksToUpdate = [];
  }

  saveTodo() {
    
    if (this.todoForm.invalid) {
      this.formValid = false;
      alert('Please complete all required fields!');
    } else {
      this.todoDetail.todoListName = this.todoForm.controls['todoListName'].value;
    }

    if (this.todoKey > 0) {

      this.tasksGrid.instance.saveEditData();


      const patch = generate(this.todoObserver);
      if ((patch as Array<any>).length > 0) {
        const updateSub = this.todoService.updateTodo(this.todoKey, patch).subscribe(res => {
          console.log('changes made!');
        }, err => {
          console.log('Could not update record', err)
        }, () => {
          if (updateSub) updateSub.unsubscribe();
        });
      }
    }
    else {
      const createSub = this.todoService.createTodo(this.todoDetail).subscribe(res => {
        this.todoKey = parseInt(res.toString());
        this.tasksGrid.instance.saveEditData();
        this._location.replaceState('Todos/' + res.toString());
      }, err => {
        console.log('Could not create new Todo', err);
      }, () => {
        if (createSub) createSub.unsubscribe();
      });
    }

  }

  cancelAndGoBackToList() {
    //check if there were changes made before re-routing feat.
    this.router.navigate(['/Todos/']);
  }

  customizeToolbar(e: any) {
    var toolbarItems = e.toolbarOptions.items;

    toolbarItems.unshift({
      location: 'before',
      template: 'listLabel'
    });

    toolbarItems.forEach(function (item) {
      if (item.name === 'addRowButton') {
        item.location = 'before';
      }
      else if (item.name === 'revertButton') {
        item.location = 'before';
      }
      else if (item.name === 'saveButton') {
        item.visible = false;
      }
    });
  }
}


export class TasksBatch {
  public TasksToUpdate: Tasks[];
  public TasksToCreate: Tasks[];
  public TasksKeysToDelete: number[];
}
