import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular'
import { TodosService, Todo, TodoTask } from '../services/todos.service';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {


  todoKey: number = 0;
  todo: Todo;
  todoForm = new FormGroup({
    todoName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  taskList: any[] = [];


  constructor(private route: ActivatedRoute, private todoService: TodosService ) {
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
        this.taskList = res;
      }, err => {
        console.log('cannot get tasks for selected todo', err);
      }, () => {
        if (tasksSub) tasksSub.unsubscribe();
      })
    }
  }

  setTodoForm(todo: Todo) {
    //this.todo = todo;
    this.todoForm.controls['todoName'].setValue(todo.name);
    }

  saveTodo() {

  }

  cancelAndGoBackToList() {

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
