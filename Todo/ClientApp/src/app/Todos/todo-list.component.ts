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

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(res => {
      this.todosList = res;
      console.log(this.todosList);
    }, err => {
      console.log('there was an error reaching API', err);
    });
  }

  editTodo(e: any) {
    this.router.navigate(['/Todos/', e.data.todoKey]);
    console.log(e);
  }

  createNewTodo() {

  }

}