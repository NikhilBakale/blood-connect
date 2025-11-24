import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Droplets, LogOut, Plus, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface BloodRequest {
  id: string;
  patient_name: string;
  blood_type: string;
  urgency: string;
  units_needed: string;
  contact_number: string;
  status: string;
  created_at: string;
  selected_hospitals: any;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchRequests();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        setUserName(profile.full_name || user.email || "User");
      }
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("blood_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "destructive";
      case "urgent":
        return "default";
      case "routine":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/request")}>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Droplets className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No requests yet</h3>
              <p className="text-muted-foreground mb-6">Create your first blood request to get started</p>
              <Button onClick={() => navigate("/request")}>
                <Plus className="mr-2 h-4 w-4" />
                Create Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {request.patient_name}
                        <Badge variant={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Requested on {format(new Date(request.created_at), "MMM dd, yyyy")}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className="text-sm font-medium capitalize">{request.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Type</p>
                      <p className="font-semibold">{request.blood_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Units Needed</p>
                      <p className="font-semibold">{request.units_needed || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold">{request.contact_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospitals</p>
                      <p className="font-semibold">
                        {Array.isArray(request.selected_hospitals) 
                          ? request.selected_hospitals.length 
                          : 0} selected
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
