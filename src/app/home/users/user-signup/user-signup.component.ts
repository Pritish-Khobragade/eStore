import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { user } from '../../types/user.type';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit {
  @Output() signup = new EventEmitter<user>();
  userSignForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.userSignForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },
  {
    validator: matchPasswords,
  }
  );
  }

  
  get firstName(): AbstractControl<any, any> | null {
    return this.userSignForm.get('firstName');
  }

  get email(): AbstractControl<any,any> | null {
    return this.userSignForm.get('email');
  }

  get password(): AbstractControl<any,any> | null {
    return this.userSignForm.get('password');
  }

  get confirmPassword(): AbstractControl<any,any> | null {
    return this.userSignForm.get('confirmPassword');
  }


  onSubmit(): void {
    if (this.userSignForm.invalid) {
      this.userSignForm.markAllAsTouched();
      return;
    }

    const user: user = {
      firstName: this.firstName?.value,
      lastName: this.userSignForm.get('lastName')?.value,
      address: this.userSignForm.get('address')?.value,
      city: this.userSignForm.get('city')?.value,
      pin: this.userSignForm.get('pin')?.value,
      state: this.userSignForm.get('state')?.value,
      email: this.email?.value,
      password: this.password?.value,
    };

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMessage = 'User created successfully.';
          this.alertType = 0;
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        } else {
          this.alertMessage = result.message || 'Unable to create account.';
          this.alertType = 2;
        }
      },
      error: (error) => {
        this.alertMessage = error.error?.message || error.message || 'Unable to create account.';
        this.alertType = 2;
      },
    });
  }
}