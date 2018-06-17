import { UserService } from './../users/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '../firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  user$:Observable<any>;

  constructor(public afAuth: AngularFireAuth,
     private afDb: AngularFireDatabase) {
    this.authenticated$ = afAuth.authState.map((user:any) => {
      return !!user;
    });
    this.user$ = afAuth.authState;
    this.uid$ = afAuth.authState.map((user :any) => {
      return user.uid
    });
    this.user$.take(1).subscribe(value => {
      if(value != null) {
        this.createUserEntity(value);
      }
     
    })
  }
  createUserEntity(user) {
    const path = `/users`;

        let item = this.afDb.list(path);
        
        item.subscribe(snapshot => {
          if(snapshot) { 
            let exists =  false;
            snapshot.forEach(value => {
              if(value.uid == user.uid) {
                exists = true;
              } 
            }); 
            if(!exists) {
              let userUI:any = {};
              userUI.uid = user.uid;
              userUI.email = user.email;
              userUI.dispayName = user.displayName;
              item.push(userUI);
            }
          //object exists 
          } else {
            item.push(user);
          }
          });

        
  }



  signIn(provider: firebase.auth.AuthProvider): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously()
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  signInWithGithub(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider());
  }

  signInWithGoogle(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.FacebookAuthProvider());
  }
  signInEmailPassword(username, password): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }
  createUserWithEmailPass(username, password): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(username, password);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
