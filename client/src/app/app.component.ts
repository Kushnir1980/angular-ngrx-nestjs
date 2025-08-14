import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-nest';
  isLoggedIn = signal(false);
  private httpResource = inject(HttpClient);

  ngOnInit() {

    this.httpResource.get('/api/products').subscribe();

    const random = Math.round(Math.random() * 1000).toString();

    const newProduct = {
      price: Math.random() * 1000,
      name: `New product ${random}`,
      description: 'Product description',
    };

    const newUser = {
      email: `my${random}@email.com`,
      password: `password_${random}`,
    };

    //this.httpResource.post('/api/products', newProduct).subscribe();
    //this.httpResource.post('/api/auth/signup', newUser).subscribe()

  }

  onSignup() {
    const newUser = {
      email: `test@email.com`,
      password: `12345`,
    };
    this.httpResource.post('/api/auth/signup', newUser).subscribe(() => {
      this.isLoggedIn.set(true);
    });
  }

  onLogin() {
    const user = {
      email: 'test2@email.com',
      password: '12345',
    };
    this.httpResource.post('/api/auth/login', user).subscribe(() => {
      this.isLoggedIn.set(true);
    });
  }

  onLogout() {
    this.httpResource.post('/api/auth/logout', {}).subscribe(() => {
      this.isLoggedIn.set(true);
    });
  }

}
