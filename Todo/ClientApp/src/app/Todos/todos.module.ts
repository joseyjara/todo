import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { TodoDetailsComponent } from './todo-details.component';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    TodoDetailsComponent,
    TodoListComponent
  ],
  imports: [
    DxDataGridModule,
    RouterModule.forChild([
      { path: '', component: TodoListComponent },
      { path: ':todoKey', component: TodoDetailsComponent }      
    ])
  ],
  exports: [TodoDetailsComponent,
    TodoListComponent],
  providers: [],
  bootstrap: []
})
export class TodosModule {
  todoKey = 0;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.todoKey = params['todoKey']);
  }
}


