import { User } from './models/user';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../auth';
import { firebase } from '../firebase';


@Injectable()
export class UserService {
  users$: FirebaseListObservable<User[]>;
  currentLoggedInUserID:string;

  constructor(private afDb: AngularFireDatabase, private auth: AuthService) {
    auth.uid$
      .take(1)
      .subscribe(uid => {
        this.currentLoggedInUserID = uid;
        const path = `/users/`;
        this.users$ = afDb.list(path);
      });
  }
  getUsers() :any {
     
        return this.users$.map((val : any[])=> {
            console.log(val);
            return val.filter(v => v.uid !== this.currentLoggedInUserID
               && (v.email != undefined && v.email != ''));
        });
     
  }

  
  
 
}
