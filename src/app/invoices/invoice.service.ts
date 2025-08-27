import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Invoice {
  id: number;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesSubject = new BehaviorSubject<Invoice[]>([
    { id: 1, customer: 'Adam', amount: 200.0, status: 'Hutang', date: '2025-08-20' },
    { id: 2, customer: 'Aim', amount: 75.25, status: 'Clear', date: '2025-08-21' },
    { id: 3, customer: 'Alep', amount: 25.75, status: 'X ingat', date: '2025-08-22' },
  ]);

  invoices$ = this.invoicesSubject.asObservable();

  getInvoices(): Invoice[] {
    return this.invoicesSubject.getValue();
  }

  addInvoice(invoice: Invoice) {
    const current = this.invoicesSubject.getValue();
    this.invoicesSubject.next([...current, invoice]);
  }

  updateInvoice(updatedInvoice: Invoice) {
    const invoices = this.invoicesSubject.getValue();
    const index = invoices.findIndex(i => i.id === updatedInvoice.id);
    if (index !== -1) {
      invoices[index] = { ...updatedInvoice };
      this.invoicesSubject.next([...invoices]);
    }
  }
  deleteInvoice(id: number) {
    const updatedInvoices = this.invoicesSubject.getValue().filter(inv => inv.id !== id);
    this.invoicesSubject.next(updatedInvoices);
  }
  
  
}
