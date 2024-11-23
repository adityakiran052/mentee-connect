import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface Request {
  id: string;
  userId: string;
  userName: string;
  status: string;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: number;
}

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const formattedRequests = Object.entries(storedRequests).map(([id, status]) => {
      const user = users.find((u: any) => u.id === id.split('-')[0]);
      return {
        id,
        userId: user?.id || "",
        userName: user?.name || "Unknown User",
        status: status as string
      };
    });
    setRequests(formattedRequests);

    // Load chat messages
    const storedChats = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    setChatMessages(storedChats);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentMentor");
    navigate("/mentor-login");
  };

  const handleRequest = (requestId: string, action: "accept" | "reject") => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
          : req
      )
    );

    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    storedRequests[requestId] = action === "accept" ? "accepted" : "rejected";
    localStorage.setItem("mentorRequests", JSON.stringify(storedRequests));

    toast({
      title: `Request ${action}ed`,
      description: `You have ${action}ed the connection request.`
    });

    if (action === "accept") {
      setActiveChat(requestId);
    }
  };

  const handleSendMessage = (requestId: string) => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      sender: "mentor",
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

  const handleCloseChat = (requestId: string) => {
    setActiveChat(null);
    
    // Update request status back to its original state
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "pending" }
          : req
      )
    );

    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    storedRequests[requestId] = "pending";
    localStorage.setItem("mentorRequests", JSON.stringify(storedRequests));

    toast({
      title: "Chat Closed",
      description: "The chat session has been closed."
    });
  };

  return (
    <div className="min-h-screen bg-[#201336]">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-outfit font-bold text-white">Mentor Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-outfit mb-4 text-white">Connection Requests</h2>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-white text-center p-4">No pending requests</div>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white">{request.userName}</span>
                    {request.status === "pending" && (
                      <div className="space-x-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleRequest(request.id, "accept")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRequest(request.id, "reject")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {request.status === "accepted" && (
                      <Button
                        variant="outline"
                        onClick={() => handleCloseChat(request.id)}
                      >
                        Close Chat
                      </Button>
                    )}
                  </div>

                  {activeChat === request.id && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg h-60 overflow-y-auto">
                        {chatMessages[request.id]?.map((msg, index) => (
                          <div
                            key={index}
                            className={`mb-2 ${
                              msg.sender === "mentor" ? "text-right" : "text-left"
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
                        <Button onClick={() => handleSendMessage(request.id)}>
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;