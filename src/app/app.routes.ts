import { Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { EditInvoiceComponent} from './edit-invoice/edit-invoice.component';

export const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'edit-invoice/:id', component: EditInvoiceComponent }

];

