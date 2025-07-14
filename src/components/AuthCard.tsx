import { useState } from "react";
import { Eye, EyeOff, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  onAuthenticated: (npi: string) => void;
}

export const AuthCard = ({ onAuthenticated }: AuthCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [npi, setNpi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // For demo purposes, simulate login
      onAuthenticated("1234567890");
    } else {
      // For demo purposes, use the entered NPI
      onAuthenticated(npi || "1234567890");
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-muted-foreground text-sm mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="underline-input"
                required
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="underline-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-6 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-muted-foreground text-sm mb-2">
                  NPI Number
                </label>
                <Input
                  type="text"
                  value={npi}
                  onChange={(e) => setNpi(e.target.value)}
                  className="underline-input"
                  placeholder="Enter your 10-digit NPI"
                  maxLength={10}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                Forgot Password?
              </button>
              <div>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary text-sm hover:underline"
                >
                  {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};