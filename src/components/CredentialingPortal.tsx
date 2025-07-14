import { useState } from "react";
import { CheckCircle, AlertCircle, Clock, Download, User, Building, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface CredentialingPortalProps {
  npi: string;
  onLogout: () => void;
}

type Step = "idle" | "retrieving" | "retrieved" | "validating" | "validated" | "error" | "workflow-created";

export const CredentialingPortal = ({ npi, onLogout }: CredentialingPortalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("idle");
  const [mockData, setMockData] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<string>("");

  const mockCAQHData = {
    npi: npi,
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    specialty: "Internal Medicine",
    licenseNumber: "MD12345",
    licenseState: "CA",
    deaNumber: "BJ1234567",
    medicalSchool: "University of California, San Francisco",
    residency: "UCSF Medical Center",
    boardCertification: "American Board of Internal Medicine",
    status: "Active",
    lastUpdated: "2024-01-15"
  };

  const handleGetNPIData = async () => {
    setCurrentStep("retrieving");
    toast({ title: "Retrieving CAQH and NPI data..." });
    
    // Simulate API call delay
    setTimeout(() => {
      setMockData(mockCAQHData);
      setCurrentStep("retrieved");
      toast({
        title: "Success!",
        description: "CAQH and NPI data retrieved successfully",
      });
    }, 2000);
  };

  const handleValidateData = async () => {
    setCurrentStep("validating");
    toast({ title: "Validating data..." });
    
    // Simulate validation with 80% success rate
    setTimeout(() => {
      const isValid = Math.random() > 0.2;
      
      if (isValid) {
        setCurrentStep("validated");
        setValidationResult("success");
        toast({
          title: "Validation Successful!",
          description: "Data validated successfully! Ready for credentialing workflow.",
        });
      } else {
        setCurrentStep("error");
        setValidationResult("CAQH data mismatch - manual review required");
        toast({
          title: "Validation Failed",
          description: "Data mismatch detected. Manual review required.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleCreateWorkflow = () => {
    setCurrentStep("workflow-created");
    toast({
      title: "Credentialing Workflow Created!",
      description: "Your credentialing workflow is ready to be triggered.",
    });
  };

  const getStepStatus = (step: Step) => {
    if (currentStep === step) return "current";
    if (
      (step === "retrieved" && ["validating", "validated", "workflow-created"].includes(currentStep)) ||
      (step === "validated" && currentStep === "workflow-created")
    ) {
      return "completed";
    }
    return "pending";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-light">Credentialing Portal</h1>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>

        {/* Progress Steps */}
        <Card className="card-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              NPI: {npi}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1: Data Retrieval */}
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  getStepStatus("retrieved") === "completed" ? "bg-green-100 text-green-600" :
                  getStepStatus("retrieved") === "current" ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {currentStep === "retrieving" ? (
                    <Clock className="w-6 h-6 animate-spin" />
                  ) : getStepStatus("retrieved") === "completed" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Download className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-medium mb-2">Retrieve Data</h3>
                <p className="text-sm text-muted-foreground mb-3">Get CAQH and NPI registry data</p>
                <Button
                  onClick={handleGetNPIData}
                  disabled={currentStep !== "idle"}
                  className="w-full"
                  variant={getStepStatus("retrieved") === "completed" ? "secondary" : "default"}
                >
                  {currentStep === "retrieving" ? "Retrieving..." : "Get NPI Data"}
                </Button>
              </div>

              {/* Step 2: Validation */}
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  getStepStatus("validated") === "completed" ? "bg-green-100 text-green-600" :
                  getStepStatus("validated") === "current" ? "bg-primary text-primary-foreground" :
                  currentStep === "error" ? "bg-red-100 text-red-600" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {currentStep === "validating" ? (
                    <Clock className="w-6 h-6 animate-spin" />
                  ) : getStepStatus("validated") === "completed" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : currentStep === "error" ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Shield className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-medium mb-2">Validate Data</h3>
                <p className="text-sm text-muted-foreground mb-3">Compare and verify information</p>
                <Button
                  onClick={handleValidateData}
                  disabled={currentStep !== "retrieved"}
                  className="w-full"
                  variant={getStepStatus("validated") === "completed" ? "secondary" : "default"}
                >
                  {currentStep === "validating" ? "Validating..." : "Validate Data"}
                </Button>
              </div>

              {/* Step 3: Workflow Creation */}
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  currentStep === "workflow-created" ? "bg-green-100 text-green-600" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {currentStep === "workflow-created" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Building className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-medium mb-2">Create Workflow</h3>
                <p className="text-sm text-muted-foreground mb-3">Initialize credentialing process</p>
                <Button
                  onClick={handleCreateWorkflow}
                  disabled={currentStep !== "validated"}
                  className="w-full"
                  variant={currentStep === "workflow-created" ? "secondary" : "default"}
                >
                  Create Workflow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Display */}
        {mockData && (
          <Card className="card-shadow mb-8">
            <CardHeader>
              <CardTitle>Retrieved Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="font-medium">{mockData.firstName} {mockData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Specialty</label>
                    <p className="font-medium">{mockData.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">License Number</label>
                    <p className="font-medium">{mockData.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">DEA Number</label>
                    <p className="font-medium">{mockData.deaNumber}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Medical School</label>
                    <p className="font-medium">{mockData.medicalSchool}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Board Certification</label>
                    <p className="font-medium">{mockData.boardCertification}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <Badge variant="secondary">{mockData.status}</Badge>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Updated</label>
                    <p className="font-medium">{mockData.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Result */}
        {(currentStep === "validated" || currentStep === "error") && (
          <Card className={`card-shadow ${currentStep === "error" ? "border-red-200" : "border-green-200"}`}>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-3 ${currentStep === "error" ? "text-red-600" : "text-green-600"}`}>
                {currentStep === "error" ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <CheckCircle className="w-6 h-6" />
                )}
                <div>
                  <h3 className="font-medium">
                    {currentStep === "error" ? "Validation Failed" : "Validation Successful"}
                  </h3>
                  <p className="text-sm">
                    {currentStep === "error" ? validationResult : "Data validated successfully! Ready for credentialing workflow."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};