import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { InvoiceData, InvoiceItem } from "@/types/invoice";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  total: number;
}

const InvoiceForm = ({ data, onChange, total }: InvoiceFormProps) => {
  const updateFreelancer = (field: string, value: string) => {
    onChange({
      ...data,
      freelancer: { ...data.freelancer, [field]: value }
    });
  };

  const updateClient = (field: string, value: string) => {
    onChange({
      ...data,
      client: { ...data.client, [field]: value }
    });
  };

  const updateInvoice = (field: string, value: string) => {
    onChange({
      ...data,
      invoice: { ...data.invoice, [field]: value }
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      rate: 0
    };
    onChange({
      ...data,
      items: [...data.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    onChange({
      ...data,
      items: data.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Freelancer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="freelancer-name">Full Name</Label>
              <Input
                id="freelancer-name"
                value={data.freelancer.name}
                onChange={(e) => updateFreelancer('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="freelancer-email">Email</Label>
              <Input
                id="freelancer-email"
                type="email"
                value={data.freelancer.email}
                onChange={(e) => updateFreelancer('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="freelancer-phone">Phone</Label>
              <Input
                id="freelancer-phone"
                value={data.freelancer.phone}
                onChange={(e) => updateFreelancer('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="freelancer-logo">Logo URL</Label>
              <Input
                id="freelancer-logo"
                value={data.freelancer.logo}
                onChange={(e) => updateFreelancer('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="freelancer-address">Address</Label>
            <Textarea
              id="freelancer-address"
              value={data.freelancer.address}
              onChange={(e) => updateFreelancer('address', e.target.value)}
              placeholder="123 Main St, City, State 12345"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={data.client.name}
                onChange={(e) => updateClient('name', e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <Label htmlFor="client-company">Company</Label>
              <Input
                id="client-company"
                value={data.client.company}
                onChange={(e) => updateClient('company', e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="client-email">Client Email</Label>
            <Input
              id="client-email"
              type="email"
              value={data.client.email}
              onChange={(e) => updateClient('email', e.target.value)}
              placeholder="jane@acme.com"
            />
          </div>
          <div>
            <Label htmlFor="client-address">Client Address</Label>
            <Textarea
              id="client-address"
              value={data.client.address}
              onChange={(e) => updateClient('address', e.target.value)}
              placeholder="456 Business Ave, City, State 67890"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input
                id="invoice-number"
                value={data.invoice.number}
                onChange={(e) => updateInvoice('number', e.target.value)}
                placeholder="INV-001"
              />
            </div>
            <div>
              <Label htmlFor="invoice-date">Date</Label>
              <Input
                id="invoice-date"
                type="date"
                value={data.invoice.date}
                onChange={(e) => updateInvoice('date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="invoice-due-date">Due Date</Label>
              <Input
                id="invoice-due-date"
                type="date"
                value={data.invoice.dueDate}
                onChange={(e) => updateInvoice('dueDate', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="payment-link">Payment Link (Optional)</Label>
            <Input
              id="payment-link"
              value={data.invoice.paymentLink}
              onChange={(e) => updateInvoice('paymentLink', e.target.value)}
              placeholder="https://paypal.me/username or Stripe payment link"
            />
          </div>
          <div>
            <Label htmlFor="invoice-notes">Notes</Label>
            <Textarea
              id="invoice-notes"
              value={data.invoice.notes}
              onChange={(e) => updateInvoice('notes', e.target.value)}
              placeholder="Thank you for your business!"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Items & Services
            <Button onClick={addItem} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.items.map((item, index) => (
            <div key={item.id} className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Web Development Services"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    placeholder="1"
                  />
                </div>
                <div className="col-span-3">
                  <Label>Rate ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    placeholder="100.00"
                  />
                </div>
                <div className="col-span-1">
                  <Label>Total</Label>
                  <div className="text-sm font-medium py-2">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1">
                  {data.items.length > 1 && (
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {index < data.items.length - 1 && <Separator />}
            </div>
          ))}
          
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <div className="text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;