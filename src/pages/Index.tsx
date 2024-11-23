import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mentors = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Fintech Entrepreneur",
    expertise: ["Venture Capital", "Startups", "Finance"],
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&id=1"
  },
  {
    id: "2",
    name: "Anjali Patel",
    role: "Financial Advisor",
    expertise: ["Wealth Management", "Investment", "Planning"],
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&id=2"
  },
  {
    id: "3",
    name: "Meera Reddy",
    role: "Tech Founder",
    expertise: ["Leadership", "Scale-up", "Innovation"],
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&id=3"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnect = (mentorId: string) => {
    // Here we would normally make an API call to connect with the mentor
    toast({
      title: "Request Sent!",
      description: "Your connection request has been sent to the mentor.",
    });
  };

  const handleSignOut = () => {
    // Here we would handle sign out logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
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
          <h2 className="font-outfit font-semibold text-3xl text-center mb-12">Featured Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex flex-col">
                <MentorCard {...mentor} />
                <Button 
                  className="mt-4"
                  onClick={() => handleConnect(mentor.id)}
                >
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;