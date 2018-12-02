import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpHeaderResponse, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  getTodos(): Observable<Todo[]> {
    var todos = this.http.get<Todo[]>(this.baseUrl + 'api/Todo/GetTodos');
    return todos;
  }

  getTodoDetails(todoKey: number): Observable<Todo> {
    var params = new HttpParams().set('todoKey', todoKey.toString());
    var todoDetails = this.http.get<Todo>(this.baseUrl + 'api/Todo/GetTodoDetails', {params: params});
    return todoDetails;
  }

  getTodoTaks(todoKey: number): Observable<TodoTask[]> {
    var params = new HttpParams().set('todoKey', todoKey.toString());
    var todoTasks = this.http.get<TodoTask[]>(this.baseUrl + 'api/Todo/GetTodoTasks', {params: params});
    return todoTasks;
  }

}

export interface Todo {
  todoKey: number;
  name: string;
}

export interface TodoTask {
  TaskKey: number;
  TodoKey: number;
  TaskName: string;
  Completed: boolean;
}
