import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {


  submitForm(form: NgForm): void 
  {

    if (form.invalid) {

      // Show validation errors
      return;
    }

    console.log('Form Data:', form.value);

    alert('Form submitted successfully!');

    form.resetForm();
  }

}