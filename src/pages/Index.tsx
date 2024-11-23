import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const mentors = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Fintech Entrepreneur",
    expertise: ["Venture Capital", "Startups", "Finance"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
  },
  {
    id: "2",
    name: "Anjali Patel",
    role: "Financial Advisor",
    expertise: ["Wealth Management", "Investment", "Planning"],
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
  },
  {
    id: "3",
    name: "Meera Reddy",
    role: "Tech Founder",
    expertise: ["Leadership", "Scale-up", "Innovation"],
    imageUrl: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<Record<string, string>>({});

  const handleConnect = (mentorId: string) => {
    setRequests(prev => ({
      ...prev,
      [mentorId]: "pending"
    }));
    
    toast({
      title: "Request Sent!",
      description: "Your connection request has been sent to the mentor.",
    });

    // Store request in localStorage
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    storedRequests[mentorId] = "pending";
    localStorage.setItem("mentorRequests", JSON.stringify(storedRequests));
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const getRequestStatus = (mentorId: string) => {
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    return storedRequests[mentorId] || "Not Connected";
  };

  return (
    <div className="min-h-screen bg-[#201336]">
      <main className="container px-4 py-16">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        
        <section className="text-center mb-16 animate-fade-up">
          <h1 className="font-outfit font-bold text-4xl md:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Connect. Learn. Grow.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with successful female entrepreneurs and financial advisors who can help guide your journey to success.
          </p>
        </section>

        <section>
          <h2 className="font-outfit font-semibold text-3xl text-center mb-12 text-white">Featured Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex flex-col">
                <MentorCard {...mentor} />
                <div className="mt-4 space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => handleConnect(mentor.id)}
                    disabled={getRequestStatus(mentor.id) !== "Not Connected"}
                  >
                    Connect
                  </Button>
                  <div className="text-white text-center p-2 bg-primary/20 rounded">
                    Status: {getRequestStatus(mentor.id)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;