import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpHeaderResponse, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { TasksBatch } from '../Todos/todo-details.component';
import { Resolve } from '@angular/router';

@Injectable()
export class TodosService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  getTodos(): Observable<Todos[]> {
    const todos = this.http.get<Todos[]>(this.baseUrl + 'api/Todo/GetTodos');
    return todos;
  }

  getTodoDetails(todoKey: number): Observable<Todos> {
    const params = new HttpParams().set('todoKey', todoKey.toString());
    const todoDetails = this.http.get<Todos>(this.baseUrl + 'api/Todo/GetTodoDetails', { params: params });
    return todoDetails;
  }

  createTodo(todoDetails: Todos): Observable<Response>{
    const newTodoDetails = this.http.post<Response>(this.baseUrl + 'api/Todo/CreateTodo', todoDetails);
    return newTodoDetails;
  }

  deleteTodo(todoKey: number): Observable<Response> {
    const params = new HttpParams().set('todoKey', todoKey.toString());
    const deleteTodoResponse = this.http.delete<Response>(this.baseUrl + 'api/Todo/DeleteTodo', { params: params });
    return deleteTodoResponse;
  }

  updateTodo(todoKey: number, patch: any): Observable<Response> {
    const params = new HttpParams().set('todoKey', todoKey.toString());
    const serverResponse = this.http.patch<Response>(this.baseUrl + 'api/Todo/UpdateTodo', patch, { params: params });
    return serverResponse;
  }

  saveTasksBatch(todoKey: number, tasksBatch: TasksBatch): Observable<Response> {
    const params = new HttpParams().set('todoKey', todoKey.toString());
    const taskBatchSaveResult = this.http.post<Response>(this.baseUrl + 'api/Todo/SaveTasksBatch', tasksBatch, { params: params });
    return taskBatchSaveResult;
  }

  getTodoTaks(todoKey: number): Observable<Tasks[]> {
    const params = new HttpParams().set('todoKey', todoKey.toString());
    const todoTasks = this.http.get<Tasks[]>(this.baseUrl + 'api/Todo/GetTodoTasks', {params: params});
    return todoTasks;
  }

}

export class Todos {
  todoKey: number;
  todoListName: string;
  tasks: Tasks[];

}

export class Tasks {
  taskKey: number;
  todoKey: number;
  taskDescription: string;
  completed: boolean;
}
