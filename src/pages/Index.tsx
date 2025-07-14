import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CredentialingPortal } from "@/components/CredentialingPortal";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNPI, setUserNPI] = useState("");

  const handleAuthenticated = (npi: string) => {
    setUserNPI(npi);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserNPI("");
  };

  if (!isAuthenticated) {
    return <AuthCard onAuthenticated={handleAuthenticated} />;
  }

  return (
    <CredentialingPortal npi={userNPI} onLogout={handleLogout} />
  );
};

export default Index;
