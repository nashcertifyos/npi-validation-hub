import { useState } from "react";
import { Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  onAuthenticated: (npi: string) => void;
}

export const AuthCard = ({ onAuthenticated }: AuthCardProps) => {
  const [npi, setNpi] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (npi.trim()) {
      onAuthenticated(npi.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-shadow">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Diamond className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-light text-foreground">Certify</h1>
            <p className="text-muted-foreground mt-2">Enter your NPI to begin credentialing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-muted-foreground text-sm mb-2">
                NPI Number
              </label>
              <Input
                type="text"
                value={npi}
                onChange={(e) => setNpi(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="underline-input"
                placeholder="Enter your 10-digit NPI"
                maxLength={10}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                National Provider Identifier (10 digits)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
              disabled={npi.length !== 10}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};