import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePwd = true;
  showToast: boolean = false;
  toastMessage: string = '';
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required]
    })
  }

  public login() {
    if (this.loginForm.invalid) {
        this.showToastMessage('Fill all fields');
        return;
    }

    this.authService.login(this.loginForm.value).subscribe(
        (data) => {
            this.showToastMessage('Login successful!');
            setTimeout(() => {
                this.router.navigate(['/']).then(() => {
                    window.location.reload();
                });
            }, 2000);
        },
        (error) => {
          // console.log(error.error,error.error.message);
            if (error.error && error.error.message) {
                this.showToastMessage(error.error.message);
            } else {
                this.showToastMessage('Invalid details');
              }
          }
      );
  }

  showToastMessage(message: string) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
          this.showToast = false;
      }, 3000);
  }

  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  public toggleVisibility() {
    this.hidePwd = !this.hidePwd;
  }

}
