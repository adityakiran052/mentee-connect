import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const MentorRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [expertise, setExpertise] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.match(/^mentor\.[a-z]+@gmail\.com$/)) {
      toast({
        title: "Invalid Email",
        description: "Mentor email must be in format: mentor.name@gmail.com",
        variant: "destructive"
      });
      return;
    }

    const mentors = JSON.parse(localStorage.getItem("mentors") || "[]");
    const newMentor = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      expertise: expertise.split(',').map(skill => skill.trim()),
      imageUrl
    };
    mentors.push(newMentor);
    localStorage.setItem("mentors", JSON.stringify(mentors));

    toast({
      title: "Registration Successful",
      description: "Please login with your credentials",
    });

    navigate("/mentor-login");
  };

  return (
    <div className="min-h-screen bg-[#201336] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-primary/20 rounded-lg shadow-lg">
        <h1 className="text-3xl font-outfit font-bold text-center mb-8 text-white">
          Mentor Registration
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="email"
            placeholder="mentor.name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="text"
            placeholder="Role (e.g. Financial Advisor)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="text"
            placeholder="Expertise (comma separated)"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="url"
            placeholder="Profile Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="text-center text-white">
            Already have an account?{" "}
            <Button variant="link" onClick={() => navigate("/mentor-login")} className="text-primary-foreground">
              Login here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRegister;