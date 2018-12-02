import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

   tempTodosItems = [
    { 'itemNumber': 1, 'todoKey': 1, 'itemName': 'Lettuce' },
    { 'itemNumber': 2, 'todoKey': 1, 'itemName': 'Tomatoes' },
    { 'itemNumber': 3, 'todoKey': 1, 'itemName': 'Peppers' },
    { 'itemNumber': 4, 'todoKey': 1, 'itemName': 'Pineapple' },
    { 'itemNumber': 5, 'todoKey': 1, 'itemName': 'Milk' },
    { 'itemNumber': 6, 'todoKey': 2, 'itemName': 'Master bathroom sink' },
    { 'itemNumber': 7, 'todoKey': 2, 'itemName': 'Kitchen sink' },
    { 'itemNumber': 8, 'todoKey': 2, 'itemName': 'Buy kitchen faucet' },
    { 'itemNumber': 9, 'todoKey': 2, 'itemName': 'Re-do deck' },
    { 'itemNumber': 10, 'todoKey': 3, 'itemName': 'Chest' },
    { 'itemNumber': 11, 'todoKey': 3, 'itemName': 'Shoulders' },
    { 'itemNumber': 12, 'todoKey': 3, 'itemName': 'Biceps' },
    { 'itemNumber': 13, 'todoKey': 3, 'itemName': 'Triceps' },
    { 'itemNumber': 14, 'todoKey': 4, 'itemName': 'C# for dummies' },
    { 'itemNumber': 15, 'todoKey': 4, 'itemName': 'Typescript for dummies' }
  ];



  getTodos(): Observable<Todo[]> {
    var todos = this.http.get<Todo[]>(this.baseUrl + 'api/Todo/GetTodos');
    return todos;
  }

  getTodosItems() {
    return this.tempTodosItems;
  }

}


interface Todo {
  todoKey: number;
  name: string;
}
