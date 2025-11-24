import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Phone, Building2, CheckCircle2 } from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  location: string;
  distance: string;
  phone: string;
  availability: string;
  bloodBank: boolean;
}

const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    location: "123 Main Street, Downtown",
    distance: "2.5 km",
    phone: "+1 234-567-8900",
    availability: "Available",
    bloodBank: true,
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    location: "456 Oak Avenue, Midtown",
    distance: "4.1 km",
    phone: "+1 234-567-8901",
    availability: "Available",
    bloodBank: true,
  },
  {
    id: 3,
    name: "Regional Healthcare Complex",
    location: "789 Pine Road, Eastside",
    distance: "5.8 km",
    phone: "+1 234-567-8902",
    availability: "Limited",
    bloodBank: true,
  },
  {
    id: 4,
    name: "Memorial Hospital",
    location: "321 Elm Street, Westend",
    distance: "7.2 km",
    phone: "+1 234-567-8903",
    availability: "Available",
    bloodBank: true,
  },
];

const Hospitals = () => {
  const navigate = useNavigate();
  const [selectedHospitals, setSelectedHospitals] = useState<number[]>([]);
  const [requestData, setRequestData] = useState<any>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("bloodRequest");
    if (!storedData) {
      toast({
        title: "No Request Data",
        description: "Please fill out the blood request form first",
        variant: "destructive",
      });
      navigate("/request");
      return;
    }
    setRequestData(JSON.parse(storedData));
  }, [navigate]);

  const toggleHospital = (hospitalId: number) => {
    setSelectedHospitals((prev) =>
      prev.includes(hospitalId)
        ? prev.filter((id) => id !== hospitalId)
        : [...prev, hospitalId]
    );
  };

  const handleSubmitRequests = () => {
    if (selectedHospitals.length === 0) {
      toast({
        title: "No Hospitals Selected",
        description: "Please select at least one hospital",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending requests
    toast({
      title: "Requests Sent Successfully!",
      description: `Your blood request has been sent to ${selectedHospitals.length} hospital(s)`,
    });

    // Clear session storage
    sessionStorage.removeItem("bloodRequest");
    
    // Navigate to success page after a short delay
    setTimeout(() => {
      navigate("/success");
    }, 1500);
  };

  if (!requestData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/request")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Form
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Hospitals</h1>
          <p className="text-muted-foreground">
            Choose one or more hospitals to send your blood request for{" "}
            <span className="font-semibold text-primary">{requestData.bloodType}</span> blood
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {mockHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className={`cursor-pointer transition-all shadow-card hover:shadow-lg ${
                selectedHospitals.includes(hospital.id)
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => toggleHospital(hospital.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={selectedHospitals.includes(hospital.id)}
                        onCheckedChange={() => toggleHospital(hospital.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <CardTitle className="text-xl">{hospital.name}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {hospital.distance} away
                    </CardDescription>
                  </div>
                  <Badge
                    variant={hospital.availability === "Available" ? "default" : "secondary"}
                    className={
                      hospital.availability === "Available"
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }
                  >
                    {hospital.availability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{hospital.phone}</span>
                </div>
                {hospital.bloodBank && (
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Blood Bank Available</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-6 rounded-lg shadow-card">
          <div className="text-sm text-muted-foreground">
            {selectedHospitals.length} hospital(s) selected
          </div>
          <Button
            size="lg"
            onClick={handleSubmitRequests}
            disabled={selectedHospitals.length === 0}
            className="w-full sm:w-auto"
          >
            Submit Requests to Selected Hospitals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
