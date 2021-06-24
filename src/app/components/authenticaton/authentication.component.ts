import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit {

  errorMessage?: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  authenticateWithGoogle() {
    this.authenticationService.authenticateWithGoogle()
      .then(() => this.router.navigate(['main']))
      .catch(error => this.errorMessage = error.message);
  }
}
