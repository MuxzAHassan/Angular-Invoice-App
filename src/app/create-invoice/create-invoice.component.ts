import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InvoiceService } from '../invoices/invoice.service';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      customer_name: ['', Validators.required],
      date: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  submitInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const formValue = this.invoiceForm.value;
    const nextId = this.invoiceService.getInvoices().length
      ? Math.max(...this.invoiceService.getInvoices().map(i => i.id)) + 1
      : 1;

    this.invoiceService.addInvoice({
      id: nextId,
      customer: formValue.customer_name,
      date: formValue.date,
      amount: formValue.amount,
      status: 'Pending', // default status
    });

    // Reset form
    this.invoiceForm.reset({ customer_name: '', date: '', amount: 0 });

    // Redirect to invoices list
    this.router.navigate(['/invoices']);
  }
}
