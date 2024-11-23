import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";

const mentors = [
  {
    name: "Sarah Chen",
    role: "Fintech Entrepreneur",
    expertise: ["Venture Capital", "Startups", "Finance"],
    imageUrl: "/placeholder.svg"
  },
  {
    name: "Maria Rodriguez",
    role: "Financial Advisor",
    expertise: ["Wealth Management", "Investment", "Planning"],
    imageUrl: "/placeholder.svg"
  },
  {
    name: "Jessica Kim",
    role: "Tech Founder",
    expertise: ["Leadership", "Scale-up", "Innovation"],
    imageUrl: "/placeholder.svg"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <main className="container px-4 py-16">
        <section className="text-center mb-16 animate-fade-up">
          <h1 className="font-outfit font-bold text-4xl md:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Connect. Learn. Grow.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with successful female entrepreneurs and financial advisors who can help guide your journey to success.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Find Your Mentor
          </Button>
        </section>

        <section>
          <h2 className="font-outfit font-semibold text-3xl text-center mb-12">Featured Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.name} {...mentor} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;