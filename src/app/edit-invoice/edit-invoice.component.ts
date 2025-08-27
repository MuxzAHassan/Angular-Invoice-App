import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { InvoiceService, Invoice } from '../invoices/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceId!: number;
  invoice!: Invoice;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.invoiceForm = this.fb.group({
      customer_name: ['', Validators.required],
      date: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    const invoices = this.invoiceService.getInvoices();
    this.invoice = invoices.find(inv => inv.id === this.invoiceId)!;

    if (!this.invoice) {
      alert('Invoice not found!');
      this.router.navigate(['/invoices']);
      return;
    }

    // Pre-fill form
    this.invoiceForm.patchValue({
      customer_name: this.invoice.customer,
      date: this.invoice.date,
      amount: this.invoice.amount
    });
  }

  updateInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const updated: Invoice = {
      id: this.invoiceId,
      customer: this.invoiceForm.value.customer_name,
      date: this.invoiceForm.value.date,
      amount: this.invoiceForm.value.amount,
      status: this.invoice.status // keep existing status
    };

    this.invoiceService.updateInvoice(updated);
    this.router.navigate(['/invoices']);
  }
}
