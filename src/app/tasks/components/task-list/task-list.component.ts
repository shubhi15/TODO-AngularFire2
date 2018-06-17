import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ITask } from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-list',
  styleUrls: ['./task-list.component.scss'],
  template: `
  <ul class="tabs tabs-fixed-width tab-demo z-depth-1">
    <li class="tab"><a [routerLink]="['/tasks']">All</a></li>
    <li class="tab"><a class = "active" [routerLink]="['/tasks', {completed: true}]">Completed</a></li>
    <li class="tab"><a [routerLink]="['/tasks', {completed: false}]">Pending</a></li>
  </ul>

    <div style = "display:flex; flex-wrap:wrap; justify-content:flex-start;">
 
      <app-task-item
      *ngFor="let task of tasks | async"
      [task]="task"
      (remove)="remove.emit(task)"
      (shareTask)="shareTask.emit($event)"
      (update)="update.emit({task: task, changes: $event})">
      </app-task-item>
     
    </div>
  `
})

export class TaskListComponent {
  @Input() filter: string;
  @Input() tasks: FirebaseListObservable<ITask[]>;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);
  @Output() shareTask = new EventEmitter(false);
}
