import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { TodoDetailsComponent } from './todo-details.component';
import { TodoListComponent } from './todo-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TodoDetailsComponent,
    TodoListComponent
  ],
  imports: [
    DxDataGridModule,
    DxButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  //todoKey = 0;
  //constructor(private route: ActivatedRoute) {
  //  this.route.params.subscribe(params => this.todoKey = params['todoKey']);
  //}
}


