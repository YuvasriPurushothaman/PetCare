import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: string = "";
  isDropdownOpen = false;
  isAdmin: boolean = false;
  isPetOwner: boolean = false;
  isLoggedIn: boolean = false;
  username = localStorage.getItem("username");
  displayName: string | null = '';
  showToast: boolean = false;
  toastMessage: string = '';
  isUserDropdownOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.displayName = this.truncateUsername(this.username);
    if (this.role !== null) {
      this.setRole();
    }
  }

  setRole() {
    if (this.role !== "") {
      this.isLoggedIn = true;
      if (this.role === "Hospital Admin") {
        this.isAdmin = true;
      } else {
        this.isPetOwner = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      this.showToastMessage('Logging out');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  toggleUserDropdown(isOpen: boolean) {
    this.isUserDropdownOpen = isOpen;
  }

  truncateUsername(username: string | null): string {
    if (username && username.length > 7) {
      return username.substring(0, 5) + '..';
    }
    return username || '';
  }
}
