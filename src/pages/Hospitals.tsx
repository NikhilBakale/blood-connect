import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const [requestId, setRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedRequestId = sessionStorage.getItem("currentRequestId");
    if (!savedRequestId) {
      toast({
        title: "No Request Found",
        description: "Please create a blood request first",
        variant: "destructive",
      });
      navigate("/request");
      return;
    }
    setRequestId(savedRequestId);
  }, [navigate]);

  const toggleHospital = (hospitalId: number) => {
    setSelectedHospitals((prev) =>
      prev.includes(hospitalId)
        ? prev.filter((id) => id !== hospitalId)
        : [...prev, hospitalId]
    );
  };

  const handleSubmitRequests = async () => {
    if (selectedHospitals.length === 0) {
      toast({
        title: "No Hospitals Selected",
        description: "Please select at least one hospital",
        variant: "destructive",
      });
      return;
    }

    if (!requestId) {
      toast({
        title: "Error",
        description: "Request ID not found",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const selectedHospitalData = mockHospitals.filter(h => 
        selectedHospitals.includes(h.id)
      );

      const { error } = await supabase
        .from("blood_requests")
        .update({ 
          selected_hospitals: selectedHospitalData as any
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: `Your request has been sent to ${selectedHospitals.length} hospital(s)`,
      });

      sessionStorage.removeItem("currentRequestId");
      navigate("/success");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!requestId) {
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
            Choose one or more hospitals to send your blood request
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
            disabled={selectedHospitals.length === 0 || loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Submitting..." : "Submit Requests to Selected Hospitals"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
