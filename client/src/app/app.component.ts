import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-healthcare';
  private httResource = inject(httpResource);

  ngOnInit() {
    const products = this.httResource.get('localhost:3000/products');
    console.log(products);
  }

}
