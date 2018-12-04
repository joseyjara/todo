import { Component, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular'
import { TodosService } from '../services/todos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'todos',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

  constructor(private todosService: TodosService, private router: Router) {

  }

  todosList: any;
  isToastVisible: boolean = false;

  deleteTask(e: any) {
    this.isToastVisible = true;
    if (e.key) {
      const deleteTodoSub = this.todosService.deleteTodo(e.key).subscribe(res => {
        
      }, err => {
        //handle error
        console.log('unable to delete', err);
      }, () => {
        if (deleteTodoSub)
          deleteTodoSub.unsubscribe();
        console.log(this.isToastVisible);
      });
    }
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(res => {
      console.log(res);
      this.todosList = res;
    }, err => {
      console.log('there was an error reaching API', err);
    });
  }

  editTodo(e: any) {
    this.router.navigate(['/Todos/', e.data.todoKey]);
  }

  createNewTodo() {
    this.router.navigate(['/Todos/',0]);
  }

  
}
