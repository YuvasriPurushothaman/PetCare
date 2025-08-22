import { Component, OnInit } from '@angular/core';
import { TreatmentRecordService } from 'src/app/services/treatment-record.service';

@Component({
  selector: 'app-view-my-treatment-record',
  templateUrl: './view-my-treatment-record.component.html',
  styleUrls: ['./view-my-treatment-record.component.css']
})
export class ViewMyTreatmentRecordComponent implements OnInit {

  records: any[] = [];
  userId: number;

  constructor(private treatmentService: TreatmentRecordService) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('userId') || 0;
    this.getTreatment();
  }

  getTreatment() {
    this.treatmentService.getRecordById(this.userId).subscribe(
      (data) => {
        this.records = data;
        console.log(data);
      }
    );
  }
}
