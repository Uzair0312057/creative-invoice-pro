import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Moon, Sun, Download, Copy, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/types/invoice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceBuilder = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem('invoiceData');
    return saved ? JSON.parse(saved) : {
      freelancer: {
        name: "",
        email: "",
        phone: "",
        address: "",
        logo: ""
      },
      client: {
        name: "",
        company: "",
        email: "",
        address: ""
      },
      invoice: {
        number: `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: "",
        paymentLink: ""
      },
      items: [
        {
          id: "1",
          description: "",
          quantity: 1,
          rate: 0
        }
      ]
    };
  });

  // Dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  const generatePDF = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${invoiceData.invoice.number}.pdf`);
      toast({
        title: "PDF Generated",
        description: "Your invoice has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyPaymentLink = () => {
    if (invoiceData.invoice.paymentLink) {
      navigator.clipboard.writeText(invoiceData.invoice.paymentLink);
      toast({
        title: "Copied!",
        description: "Payment link copied to clipboard",
      });
    } else {
      toast({
        title: "No Payment Link",
        description: "Please add a payment link first",
        variant: "destructive",
      });
    }
  };

  const clearInvoice = () => {
    setInvoiceData({
      freelancer: { name: "", email: "", phone: "", address: "", logo: "" },
      client: { name: "", company: "", email: "", address: "" },
      invoice: {
        number: `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: "",
        paymentLink: ""
      },
      items: [{ id: "1", description: "", quantity: 1, rate: 0 }]
    });
    toast({
      title: "Invoice Cleared",
      description: "All fields have been reset",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">InvoiceGen</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="h-4 w-4" />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={generatePDF} variant="default">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                
                <Button onClick={copyPaymentLink} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                
                <Button onClick={clearInvoice} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Invoice Builder</h2>
              <InvoiceForm 
                data={invoiceData} 
                onChange={setInvoiceData}
                total={calculateTotal()}
              />
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
              <div className="overflow-auto max-h-screen">
                <InvoicePreview 
                  data={invoiceData} 
                  total={calculateTotal()}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;