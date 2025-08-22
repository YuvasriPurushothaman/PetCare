import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  petId: number;
  userId: number;
  petForm: FormGroup;
  pet:Pet;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private petService: PetService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.petForm = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      breed: ["", Validators.required],
      dateOfBirth:  ["",[Validators.required, this.dateValidator()]],
      status: ["", Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      breed: ["", Validators.required],
      dateOfBirth:  ["",[Validators.required, this.dateValidator()]],
      status: ["", Validators.required]
    });
    this.petId = +parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.petId);
    this.userId=+localStorage.getItem("userId");
    console.log("userId",this.userId);

    this.petService.getPetById(this.petId).subscribe((data: any) => {
      this.petForm.patchValue(data)
      console.log(data);
      console.log(this.petForm.value);
    })
  }


  public updatePet() {
    if (this.petForm.valid) {
        this.pet = {
            "name": this.petForm.value.name,
            "species": this.petForm.value.species,
            "breed": this.petForm.value.breed,
            "dateOfBirth": this.petForm.value.dateOfBirth,
            "userId": this.userId,
            "status": this.petForm.value.status
        };
        this.petService.updatePetById(this.petId, this.pet).subscribe((data: any) => {
            this.showToastMessage('Pet updated successfully!');
            setTimeout(() => {
                this.router.navigate(['/user/pet/get-all']);
            }, 2000);
        },
        (error) => {
            if (error.status === 409) {
                this.showToastMessage(error.error.message); 
            } else {
                this.showToastMessage('Failed to update pet');
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



  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
      const selectedDate = new Date(control.value);
 
      return selectedDate > today ? { 'invalidDate': { value: control.value } } : null;
    };
  }

  get form() {
    return this.petForm.controls;
  }
}