import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvoicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Invoice-App';
}
