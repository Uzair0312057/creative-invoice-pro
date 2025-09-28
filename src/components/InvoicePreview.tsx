import { InvoiceData } from "@/types/invoice";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface InvoicePreviewProps {
  data: InvoiceData;
  total: number;
}

const InvoicePreview = ({ data, total }: InvoicePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div id="invoice-preview" className="bg-invoice-bg border border-invoice-border rounded-lg p-8 max-w-4xl mx-auto print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-4">
          {data.freelancer.logo && (
            <img
              src={data.freelancer.logo}
              alt="Logo"
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">INVOICE</h1>
            <p className="text-muted-foreground">{data.invoice.number}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {data.freelancer.name || "Your Name"}
          </h2>
          <div className="text-sm text-muted-foreground space-y-1">
            {data.freelancer.email && <p>{data.freelancer.email}</p>}
            {data.freelancer.phone && <p>{data.freelancer.phone}</p>}
            {data.freelancer.address && (
              <div className="whitespace-pre-line">{data.freelancer.address}</div>
            )}
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Bill To & Invoice Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Bill To:</h3>
          <div className="text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">
              {data.client.name || "Client Name"}
            </p>
            {data.client.company && (
              <p>{data.client.company}</p>
            )}
            {data.client.email && <p>{data.client.email}</p>}
            {data.client.address && (
              <div className="whitespace-pre-line">{data.client.address}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice Date:</span>
              <span className="font-medium">
                {formatDate(data.invoice.date) || "Select Date"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">
                {formatDate(data.invoice.dueDate) || "Select Due Date"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="bg-secondary/50 rounded-t-lg border border-b-0 p-4">
          <div className="grid grid-cols-12 gap-4 font-semibold text-foreground">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        
        <div className="border border-t-0 rounded-b-lg">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-12 gap-4 p-4 ${
                index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
              }`}
            >
              <div className="col-span-6">
                <div className="font-medium text-foreground">
                  {item.description || "Service description"}
                </div>
              </div>
              <div className="col-span-2 text-center text-muted-foreground">
                {item.quantity}
              </div>
              <div className="col-span-2 text-center text-muted-foreground">
                ${item.rate.toFixed(2)}
              </div>
              <div className="col-span-2 text-right font-medium text-foreground">
                ${(item.quantity * item.rate).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Section */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="bg-secondary/30 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Link */}
      {data.invoice.paymentLink && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Payment</h3>
          <div className="bg-accent/50 border border-accent-foreground/20 rounded-lg p-4">
            <p className="text-muted-foreground mb-2">
              Click the link below to make a payment:
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(data.invoice.paymentLink, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </div>
      )}

      {/* Notes */}
      {data.invoice.notes && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Notes</h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground whitespace-pre-line">
              {data.invoice.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;