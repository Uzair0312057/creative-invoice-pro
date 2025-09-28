export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface FreelancerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  email: string;
  address: string;
}

export interface InvoiceDetails {
  number: string;
  date: string;
  dueDate: string;
  notes: string;
  paymentLink: string;
}

export interface InvoiceData {
  freelancer: FreelancerInfo;
  client: ClientInfo;
  invoice: InvoiceDetails;
  items: InvoiceItem[];
}