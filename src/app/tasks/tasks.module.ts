import { UserService } from './../users/user.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// components
import { TaskFormComponent } from './components/task-form';
import { TaskItemComponent } from './components/task-item';
import { TaskListComponent } from './components/task-list';
import { TasksComponent } from './components/tasks';

// directives
import { AutoFocusDirective } from './directives';

// modules
import { TasksRoutesModule } from './tasks.routes';

// services
import { TasksService } from './tasks.service';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module



@NgModule({
  declarations: [
    AutoFocusDirective,
    TaskFormComponent,
    TaskItemComponent,
    TaskListComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TasksRoutesModule
  ],
  providers: [
    TasksService, UserService
  ]
})
export class TasksModule { }
