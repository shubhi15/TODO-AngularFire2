import { UserService } from './../../../users/user.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TasksService } from '../../tasks.service';


@Component({
  selector: 'app-tasks',
  template: `
        <app-task-form (createTask)="tasksService.createTask($event)"></app-task-form>


        <app-task-list
          [filter]="filter | async"
          [tasks]="tasksService.visibleTasks$"
          (shareTask) = "shareTask($event)"
          (remove)="tasksService.removeTask($event)"
          (update)="tasksService.updateTask($event.task, $event.changes)"></app-task-list>

        <p>{{sharedValue}}</p>

   
  `
})
export class TasksComponent implements OnInit {
  filter: Observable<any>;
  sharedValue: string;
  constructor(
    public route: ActivatedRoute,
    public tasksService: TasksService,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.filter = this.route.params
      .pluck('completed')
      .do((value: string) => this.tasksService.filterTasks(value));
  }
  shareTask(obj :any ) {
    this.tasksService.shareTask(obj.userDetail, obj.task).then(value => {
      this.sharedValue = "Task shared Sucessfully";
    });
  }
}
