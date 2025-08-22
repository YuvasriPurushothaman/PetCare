import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
 
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  petForm: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
 
  constructor(private formBuilder: FormBuilder, private petService: PetService,private router:Router) {
    this.petForm = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      breed: ["", Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator()]],
      status: ["", Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      breed: ["", Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator()]],
      status: ["", Validators.required]
    });
  }
 
  addPet() {
    if (this.petForm.valid) {
        this.petService.addPet(this.petForm.value).subscribe(data => {
            console.log("added");
            this.showToastMessage('Pet added successfully!');
            setTimeout(() => {
                this.router.navigate(['/user/pet/get-all']);
            }, 2000);
        },
        (error) => {
            if (error.status === 409) {
                this.showToastMessage(error.error.message);
            } else if (error.status === 404) {
                this.showToastMessage('User not found');
            } else {
                this.showToastMessage('Failed to add pet');
            }
        });
    } else {
        this.showToastMessage('Please fill out all required fields');
        console.log('Form is invalid');
    }
}



  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
 
  get f() {
    return this.petForm.controls;
  }
 
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
      const selectedDate = new Date(control.value);
 
      return selectedDate > today ? { 'invalidDate': { value: control.value } } : null;
    };
  }
}