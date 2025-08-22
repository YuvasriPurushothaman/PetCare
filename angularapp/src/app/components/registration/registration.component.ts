import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;
  hidePwd = true;
  hideConfirmPwd = true;
  isHospitalAdmin = false;
  user: User;
  hideInvitationCode = true;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      username: ["", Validators.required],
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userRole: ["", Validators.required],
      invitationCode: [""]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      username: ["", Validators.required],
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userRole: ["", Validators.required],
      invitationCode: [""]
    });
  }

  onRoleChange() {
    this.isHospitalAdmin = this.registerForm.value.userRole === 'Hospital Admin';
    if (this.isHospitalAdmin) {
      this.registerForm.get('invitationCode').setValidators([Validators.required]);
    } else {
      this.registerForm.get('invitationCode').clearValidators();
    }
    this.registerForm.get('invitationCode').updateValueAndValidity();
  }

  passwordEqualCheck() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  public register() {
    if (this.registerForm.invalid) {
      this.showToastMessage('Form values should meet the requirements');
      return;
    } else if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.showToastMessage('Passwords do not match');
      return;
    } else if (!this.isPasswordComplex()) {
      this.showToastMessage('Password does not meet complexity requirements');
      return;
    } else if (this.isHospitalAdmin) {
      this.authService.validateInvitationCode(this.registerForm.value.invitationCode).subscribe(
        (isValid) => {
          if (isValid) {
            this.completeRegistration();
          } else {
            this.showToastMessage('Invalid invitation code');
          }
        },
        (error) => {
          console.log("Error validating invitation code", error);
        }
      );
    } else {
      this.completeRegistration();
    }
  }

  private completeRegistration() {
    this.user = {
        email: this.registerForm.value.email,
        mobileNumber: this.registerForm.value.mobileNumber,
        password: this.registerForm.value.password,
        userRole: this.registerForm.value.userRole,
        username: this.registerForm.value.username
    };
    this.authService.register(this.user).subscribe(
        (data) => {
            this.showToastMessage('Registration successful!');
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 2000);
        },
        (error) => {
          // console.error(error);
          const errorMessage = error.error?.message || 'An error occurred';
          this.showToastMessage(errorMessage);
          setTimeout(() => {
              window.location.reload();
              this.router.navigate(['/register']);
          }, 2000); 
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

  isPasswordComplex(): boolean {
    const hasUppercase = /[A-Z]/.test(this.registerForm.value.password);
    const hasLowercase = /[a-z]/.test(this.registerForm.value.password);
    const hasDigit = /\d/.test(this.registerForm.value.password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(this.registerForm.value.password);
    const hasLength = this.registerForm.value.password.length;
    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar && hasLength >= 8;
  }

  toggleVisibility() {
    this.hidePwd = !this.hidePwd;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPwd = !this.hideConfirmPwd;
  }

  toggleInvitationCodeVisibility() {
    this.hideInvitationCode = !this.hideInvitationCode;
  }

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  get mobileNumber() {
    return this.registerForm.get("mobileNumber");
  }

  get userRole() {
    return this.registerForm.get("userRole");
  }

  get isMismatch() {
    return this.passwordMismatch;
  }
}