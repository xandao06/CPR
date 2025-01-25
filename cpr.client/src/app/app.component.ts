import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private baseUrl: string;
  constructor() {
    const host = window.location.hostname;
    const port = '7048';
    this.baseUrl = `https://${host}:${port}`;
  }

  getApiUrl(path: string): string {
    return `${this.baseUrl}/${path}`;
  }
  title = 'cpr.client';
}
