import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit{

  constructor(public authService : AuthenticationService) {
  }
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  logout() {
    this.authService.logout()
  }
}
