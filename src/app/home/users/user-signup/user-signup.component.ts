import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl,Validators } from '@angular/forms';
import { user } from '../../types/user.type';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit {
  @Output() signup = new EventEmitter<user>();
  userSignForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userSignForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {
    const { firstName, lastName, address, city, state, pin, email, password } = this.userSignForm.value;
    this.signup.emit({ firstName, lastName, address, city, state, pin, email, password });
  }
}
