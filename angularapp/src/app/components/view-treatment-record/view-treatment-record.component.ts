import { Component, OnInit } from '@angular/core';
import { TreatmentRecordService } from 'src/app/services/treatment-record.service';

@Component({
  selector: 'app-view-treatment-record',
  templateUrl: './view-treatment-record.component.html',
  styleUrls: ['./view-treatment-record.component.css']
})
export class ViewTreatmentRecordComponent implements OnInit {

  records:any[]

  constructor(private treatmentService:TreatmentRecordService) { }

  ngOnInit(): void {
    this.getAllTreatment()
  }

  getAllTreatment(){
    this.treatmentService.getAllRecords().subscribe((data)=>{
      this.records=data;
      console.log(data);
      
    })
  }


}
