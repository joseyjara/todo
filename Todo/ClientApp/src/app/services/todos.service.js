"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodosService = /** @class */ (function () {
    function TodosService() {
        //constructor(private http: HttpClient, private apiUrl: string) {
        //  this.headers = new HttpHeaders();
        //  this.apiUrl = 'localhost:5000:api/';
        //}
        this.tempTodos = [
            { 'todoId': 1, 'name': 'Groceries' },
            { 'todoId': 2, 'name': 'Home Repairs' },
            { 'todoId': 3, 'name': 'Workouts' },
            { 'todoId': 4, 'name': 'Books to read' }
        ];
    }
    TodosService.prototype.getTodos = function () {
        return this.tempTodos;
    };
    return TodosService;
}());
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map