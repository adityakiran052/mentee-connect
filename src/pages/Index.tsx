import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ChatSection } from "@/components/ChatSection";

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
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    setRequests(storedRequests);
    
    const storedChats = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    setChatMessages(storedChats);
  }, []);

  const handleConnect = (mentorId: string) => {
    const requestId = `${currentUser.id}-${mentorId}`;
    
    // Check if there's already a connection request
    const existingRequest = requests[requestId];
    if (existingRequest) {
      toast({
        title: "Already Connected",
        description: "You have already sent a connection request to this mentor.",
      });
      return;
    }

    const updatedRequests = {
      ...requests,
      [requestId]: "pending"
    };
    
    setRequests(updatedRequests);
    localStorage.setItem("mentorRequests", JSON.stringify(updatedRequests));
    
    toast({
      title: "Request Sent!",
      description: "Your connection request has been sent to the mentor.",
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSendMessage = (requestId: string) => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser.id,
      message: message.trim(),
      timestamp: Date.now()
    };

    const updatedMessages = {
      ...chatMessages,
      [requestId]: [...(chatMessages[requestId] || []), newMessage]
    };

    setChatMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setMessage("");
  };

  const getRequestStatus = (mentorId: string) => {
    const requestId = `${currentUser.id}-${mentorId}`;
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    return storedRequests[requestId] || "Not Connected";
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

        <section className="mb-12">
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

        <section className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-outfit mb-4 text-white">Active Chats</h2>
          {Object.entries(requests).map(([requestId, status]) => {
            if (status === "accepted" && requestId.startsWith(currentUser.id)) {
              const mentorId = requestId.split('-')[1];
              const mentor = mentors.find(m => m.id === mentorId);
              
              return (
                <div key={requestId} className="bg-primary/10 p-4 rounded-lg mb-4">
                  <h3 className="text-white mb-2">{mentor?.name}</h3>
                  <div className="bg-primary/5 p-4 rounded-lg h-60 overflow-y-auto mb-4">
                    {chatMessages[requestId]?.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-2 ${
                          msg.sender === currentUser.id ? "text-right" : "text-left"
                        }`}
                      >
                        <span className="inline-block bg-primary/30 rounded-lg px-3 py-2 text-white">
                          {msg.message}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={() => handleSendMessage(requestId)}>
                      Send
                    </Button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </section>
      </main>
    </div>
  );
};

export default Index;