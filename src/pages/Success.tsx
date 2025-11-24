import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, FileText } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">Request Submitted Successfully!</CardTitle>
          <CardDescription className="text-base">
            Your blood request has been sent to the selected hospitals. They will review your request and contact you soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Hospitals will review your request within 24 hours</li>
              <li>You'll receive a call to confirm availability</li>
              <li>Follow the hospital's instructions for blood collection</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button onClick={() => navigate("/request")} variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Make Another Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
