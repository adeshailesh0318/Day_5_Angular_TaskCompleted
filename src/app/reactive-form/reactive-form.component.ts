import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.registerForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{10}$')
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator
          ]
        ],

        confirmPassword: [
          '',
          Validators.required
        ]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // Custom Password Strength Validator
  passwordStrengthValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.value;

    if (!password) {
      return null;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return {
        passwordStrength: true
      };
    }

    return null;
  }

  // Custom Confirm Password Validator
  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      return {
        passwordMismatch: true
      };
    }

    return null;
  }

  submitForm(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Form Data:', this.registerForm.value);

    alert('Registration successful!');

    this.registerForm.reset();
  }
}