import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  todoKey: number = 0;

  constructor(private route: ActivatedRoute ) {
    console.log(this.route.snapshot.params);
  }

  ngOnInit()
  {

  }

}
