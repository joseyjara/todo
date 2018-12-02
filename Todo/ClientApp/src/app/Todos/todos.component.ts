import { Component, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular'
import { TodosService } from '../services/todos.service';


@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  constructor(private todosService: TodosService) {

  }

  todosList: any;

  ngOnInit(): void {
    this.todosList = this.todosService.getTodos();
    console.log(this.todosList);
    }

}
