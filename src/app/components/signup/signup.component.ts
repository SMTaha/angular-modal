import { SIGNUP_URL, Departments } from './../../shared/global-vars';
import { StudentModel } from './../../shared/models';
import { Router } from '@angular/router';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    templateUrl: './signup.template.html',
    styleUrls: ['./signup.component.css'],
    providers: [
        SharedService
    ]
})

export class SignupComponent implements OnInit{
    signupErrorMessage: any;
    signupError: boolean;
    departments = Departments;   
    signUpContainer = document.getElementById('signup-container');
    userCredentials: StudentModel = {
        fullname: '',
        department: '',
        rollnumber: '',
        password: ''
    }
    constructor(public router: Router,
                private sharedService: SharedService){}
    ngOnInit(){
    }
    loging(value){
        this.userCredentials.department = value;
    }
    validateCredentials(){
        return this.userCredentials.fullname && this.userCredentials.department != "0"
            && this.userCredentials.rollnumber && this.userCredentials.password;
    }
    
    signUp(){
        if(this.validateCredentials){
            this.sharedService.postCall(SIGNUP_URL, this.userCredentials)
                .subscribe(res => {
                    if(res.status == 200) {
                        this.router.navigate(['/login']);
                    }
                }, err => {
                    console.error(this.signUpContainer);
                    
                    this.signupError = true;
                    this.signupErrorMessage = err['_body'];
                    setTimeout(()=>{
                        this.signupError = false;
                        this.signUpContainer.classList.remove('wobble');
                    }, 5000);
                    setTimeout(()=>{
                        this.signUpContainer.classList.add('wobble');
                    }, 100);
                })
        } 
    }
}