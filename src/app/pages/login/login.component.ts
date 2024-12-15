import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  authForm!: FormGroup;
  isRegisterMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator = (group: FormGroup): { [key: string]: boolean } | null => {
    if (!this.isRegisterMode) {
      return null; // Skip validation if not in register mode
    }
  
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    // Check if password and confirmPassword are mismatched
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  
    // Clear errors if they match
    group.get('confirmPassword')?.setErrors(null);
    return null;
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    if (!this.isRegisterMode) {
      this.authForm.get('confirmPassword')?.reset();
    }
  }

  onSubmit(): void {
    console.log(this.authForm)
    if (this.authForm.invalid) {
      return;
    }

    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  register(): void {
    const { name, email, password } = this.authForm.value;
    if(!name || name.trim() == "") {
      return
    }
    
    console.log('Registering:', { email, password });
    var user = {
      username : name,
      email,
      password
    };
    
    // Simulate registration process
    this.authService.register([user]).subscribe({
      next: (response) => {
        console.log(response)
        // this.isLoading = false;
        // this.router.navigate(['/login']);
        this.isRegisterMode = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  login(): void {
    const { email, password } = this.authForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        // this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }
}
