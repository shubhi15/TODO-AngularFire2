import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    styleUrls: ['./sign-in.component.scss'],
    templateUrl: './sign-in.component.html'
 
})
export class SignInComponent {
    constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

    signInAnonymously(): void {
        this.auth.signInAnonymously()
            .then(() => this.postSignIn());
    }

    signinForm = this.formBuilder.group ({
        loginName:  ['', Validators.email],
        loginPassword: ['', [Validators.required]]
    });

    serverError:string = '';

    signInWithFacebook(): void {
        this.auth.signInWithFacebook()
            .then(() => this.postSignIn());
    }

    signInWithGithub(): void {
        this.auth.signInWithGithub()
            .then(() => this.postSignIn());
    }

    signInEmailPassword(username, password):any {
        return this.auth.signInEmailPassword(username, password);
    }
    createUserWithEmailPass(username, password):any {
        return this.auth.createUserWithEmailPass(username, password).then(()=> {
            return this.signInEmailPassword(username, password);
        });
    }

    signInWithGoogle(): void {
        this.auth.signInWithGoogle()
            .then(() => this.postSignIn());
    }
    onSubmit(): void {
        let json = this.signinForm.value;
        this.signInEmailPassword(json.loginName, json.loginPassword).then(()=> {
            this.router.navigate(['/tasks']);    
        }).catch((err)=> {
            this.serverError = err;
        });
    }

    onSignUpSubmit(): void {
        let json = this.signinForm.value;
        this.createUserWithEmailPass(json.loginName, json.loginPassword).then(()=> {
            this.router.navigate(['/tasks']);    
        }).catch((err)=> {
            this.serverError = err;
        });
    }

    private postSignIn(): void {
        this.router.navigate(['/tasks']);
    }
}
