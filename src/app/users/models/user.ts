import { firebase } from '../../firebase';


export interface ITask {
  $key?: string;
  completed: boolean;
  createdAt: Object;
  title: string;
  description: string;
}


export class User {
 $key?: string;
 uid: string;
 displayName:string;
 email:string;

  constructor(uid: string, displayName: string, email:string) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
  }
}
