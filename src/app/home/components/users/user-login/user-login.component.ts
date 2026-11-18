import { UserService } from './../services/user-service.service';
import { userlogin } from './../../../types/user.type';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { loginToken } from './../../../types/user.type';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  userloginForm!: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userloginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userloginForm.get('password');
  }

  onSubmit(): void {
    this.UserService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: loginToken) => {
        this.UserService.activateToken(result, this.email?.value);
        this.alertType = 0;
        this.alertMessage = 'Login successful';
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl || '/home/products', { replaceUrl: true });
      }, error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;

      }
    })
  }
}
