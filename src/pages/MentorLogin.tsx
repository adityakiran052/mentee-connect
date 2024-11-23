import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const MentorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mentors = JSON.parse(localStorage.getItem("mentors") || "[]");
    const mentor = mentors.find((m: any) => m.email === email && m.password === password);

    if (mentor) {
      localStorage.setItem("currentMentor", JSON.stringify(mentor));
      navigate("/mentor-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl font-outfit font-bold text-center mb-8 text-white">
          Mentor Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="mentor.name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center text-white">
            Don't have an account?{" "}
            <Button variant="link" onClick={() => navigate("/mentor-register")} className="text-primary-foreground">
              Register here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorLogin;