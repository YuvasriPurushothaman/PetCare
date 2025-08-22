import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css']
})
export class ViewPetComponent implements OnInit {
pets:Pet[];
pet={};

  constructor(private petService:PetService) { }

  ngOnInit(): void {
    // this.getPetById(petId);
  }
getPetById(petId){
  this.petService.getPetById(petId).subscribe(data=>{
    this.pet=data;
  })
}
updatePetById(petId,updatePet){
  this.petService.updatePetById(petId,updatePet).subscribe(data=>{
    this.pet=data;
  })
}
}
