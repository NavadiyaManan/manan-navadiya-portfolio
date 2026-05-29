import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;
  isError = false;

  email = 'man.navadiya110@gmail.com';
  phone = '+91 96247 00430';
  location = 'Ahmedabad, Gujarat, India';
  availabilityStatus = 'Available for Full-time Roles & Select Freelance';

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.isSuccess = false;
      this.isError = false;

      try {
        await this.firebaseService.submitContact(this.contactForm.value);
        this.isSubmitting = false;
        this.isSuccess = true;
        this.contactForm.reset();

        // Reset success state after a few seconds
        setTimeout(() => {
          this.isSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('Error submitting form to Firebase:', error);
        this.isSubmitting = false;
        this.isError = true;
        
        // Reset error state after a few seconds
        setTimeout(() => {
          this.isError = false;
        }, 6000);
      }
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
