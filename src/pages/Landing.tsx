import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wand2, Palette, FileDown, Link as LinkIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-primary" />,
      title: "Easy Invoice Creation",
      description: "Create professional invoices in seconds with our intuitive form builder"
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Custom Branding",
      description: "Add your logo and customize the invoice design to match your brand"
    },
    {
      icon: <FileDown className="h-8 w-8 text-primary" />,
      title: "Export to PDF",
      description: "Download your invoices as high-quality PDF files ready to send"
    },
    {
      icon: <LinkIcon className="h-8 w-8 text-primary" />,
      title: "Payment Links",
      description: "Include payment links to make it easy for clients to pay you"
    }
  ];

  return (
    <div className="min-h-screen bg-subtle-gradient">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">InvoiceGen</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/builder">
              <Button variant="outline">Try It Now</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-6">
            Create Invoices in Seconds
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simple, fast, and professional invoices for freelancers. Build beautiful invoices with live preview, PDF export, and payment links.
          </p>
          <Link to="/builder">
            <Button size="lg" className="text-lg px-8 py-6">
              <FileText className="mr-2 h-5 w-5" />
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional invoice creation made simple with all the features freelancers need
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-accent w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-hero-gradient rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who create professional invoices with InvoiceGen
          </p>
          <Link to="/builder">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Create Your First Invoice
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">InvoiceGen</span>
              </div>
              <p className="text-muted-foreground">
                Professional invoice generation for modern freelancers
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/builder" className="hover:text-primary transition-colors">Invoice Builder</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 InvoiceGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;