import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-form',
  styleUrls: ['./task-form.component.scss'],
  templateUrl: "./task-form.component.html" 
})

export class TaskFormComponent {
  @Output() createTask = new EventEmitter(false);

  taskForm = new FormGroup ({
    title: new FormControl(),
    description: new FormControl()
  });

 

  onSubmit(): void {
    const task: any = this.taskForm.value;
    this.createTask.emit(task);
  }
}
