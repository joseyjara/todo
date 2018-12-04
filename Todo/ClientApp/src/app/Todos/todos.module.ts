import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxToastModule } from 'devextreme-angular';
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
    DxToastModule,
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
}


