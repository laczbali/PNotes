import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    private ngZone: NgZone,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "58371505-mdr56o2n4roesstr8s8p3i69r31n1kur.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large", text: "continue_with" }
    );
  }

  async handleCredentialResponse(response: any) {
    this.ngZone.run(async () => {
      const loginResult = await this.authService.login(response);
      if (loginResult) {
        this.router.navigate(['/']);
      } else {
        alert('Login failed');
      }
    });
  }

}
