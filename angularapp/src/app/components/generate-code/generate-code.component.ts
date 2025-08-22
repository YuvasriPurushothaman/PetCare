import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent {
  generatedCode: string;
  isOpen:boolean=false;
  showToast: boolean = false;

  constructor(private authService:AuthService) {}

  generateInvitationCode() {
    this.authService.generateInvitationCode().subscribe(
      (response) => {
        this.generatedCode = response.code;
        this.isOpen=true;
      },
      (error) => {
        console.error("Error generating invitation code", error);
      }
    );
  }

  open(){
    this.isOpen=true;
  }

  close(){
    this.isOpen=false;
  }
  copyCode() {
    const code = this.generatedCode;
    navigator.clipboard.writeText(code).then(() => {
      this.showToast = true;
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
