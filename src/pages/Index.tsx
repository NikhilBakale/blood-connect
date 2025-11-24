import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Heart, Clock, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Droplets className="h-4 w-4" />
              <span>Save Lives With Blood Donation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Request Blood from Hospitals Near You
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Connect with nearby hospitals instantly. Submit your blood request and get responses from multiple medical centers in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/request")}
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                Request Blood Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple three-step process connects you with hospitals that can fulfill your blood requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Submit Request</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Fill out a simple form with your blood type requirements and patient details
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Choose Hospitals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Select from a list of nearby hospitals with available blood banks
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary/60 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>Get Response</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Hospitals review your request and contact you with availability information
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-secondary shadow-card max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold text-secondary-foreground">
              Every Second Counts in Emergency
            </h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
              Don't wait until it's too late. Submit your blood request now and connect with hospitals that can help. Our platform ensures your request reaches the right medical centers quickly.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/request")}
              className="shadow-lg"
            >
              <Droplets className="mr-2 h-5 w-5" />
              Start Your Request
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
