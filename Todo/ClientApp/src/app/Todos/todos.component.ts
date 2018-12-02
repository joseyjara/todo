import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'todos',
  styleUrls: ['./todos.component.css'],
  templateUrl: './todos.component.html'
})

export class TodosComponent {
  constructor(private route: ActivatedRoute) {}
}
