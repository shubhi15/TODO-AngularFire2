import { firebase } from '../../firebase';


export interface ITask {
  $key?: string;
  completed: boolean;
  createdAt: Object;
  title: string;
  description: string;
}


export class Task implements ITask {
  completed = false;
  createdAt = firebase.database.ServerValue.TIMESTAMP;
  title;
  description;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
