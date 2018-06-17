import { UserService } from './../../../users/user.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { ITask } from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-item',
  styleUrls: ['./task-item.component.scss'],
  templateUrl: './task-item.component.html',
  host: {class: "card card-size blue-grey darken-1",
          style: "width:400px; margin-left:10px;"}
})

export class TaskItemComponent implements OnInit {
  @Input() task: ITask;
  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);
  @Output() shareTask = new EventEmitter(false);

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) {}

  editing = false;
  title = '';
  description = '';
  userArr: any[] = [];

  editTitle(): void {
    this.editing = true;
    this.title = this.task.title;
    this.description = this.task.description;
  }

  saveTask(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.task.title) {
        this.update.emit({title: title, description: this.description});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.update.emit({
      completed: !this.task.completed
    });
  }
  addTaskToUser(userDetail) {
    this.shareTask.emit({userDetail: userDetail, task: this.task});
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(val => {
      this.userArr = val;
      this.cdRef.detectChanges();
    })
  }
}
