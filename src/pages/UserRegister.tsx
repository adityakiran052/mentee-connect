import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast({
      title: "Registration Successful",
      description: "Please login with your credentials",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#201336] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-primary/20 rounded-lg shadow-lg">
        <h1 className="text-3xl font-outfit font-bold text-center mb-8 text-white">
          User Registration
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="text-center text-white">
            Already have an account?{" "}
            <Button variant="link" onClick={() => navigate("/login")} className="text-primary-foreground">
              Login here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;