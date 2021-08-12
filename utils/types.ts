export enum InvoiceStatus {
  PAID = 'paid',
  PENDING = 'pending',
  DRAFT = 'draft',
}

export interface InvoiceType {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: 1 | 7 | 14 | 30;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus | string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

export type InvoiceArrType = InvoiceType[];

export interface State {
  invoices: InvoiceType[];
}

export enum ActionTypes {
  AddInvoice = 'ADD_INVOICE',
  InitializeInvoices = 'INIT_INVOICES',
}

export interface Action {
  type: ActionTypes;
  payload: {
    addInvoice?: InvoiceType;
    invoices?: InvoiceArrType;
  };
}
