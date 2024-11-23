import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface Request {
  id: string;
  userName: string;
  status: string;
}

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    // Load requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    const formattedRequests = Object.entries(storedRequests).map(([id, status]) => ({
      id,
      userName: "User", // In a real app, this would come from the user profile
      status: status as string
    }));
    setRequests(formattedRequests);
  }, []);

  const handleSignOut = () => {
    navigate("/mentor-login");
  };

  const handleRequest = (requestId: string, action: "accept" | "reject") => {
    // Update local state
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
          : req
      )
    );

    // Update localStorage
    const storedRequests = JSON.parse(localStorage.getItem("mentorRequests") || "{}");
    storedRequests[requestId] = action === "accept" ? "accepted" : "rejected";
    localStorage.setItem("mentorRequests", JSON.stringify(storedRequests));

    // Show toast notification
    toast({
      title: `Request ${action}ed`,
      description: `You have ${action}ed the connection request.`
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
                <div key={request.id} className="flex items-center justify-between bg-primary/10 p-4 rounded-lg">
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
                  {request.status !== "pending" && (
                    <span className="text-white capitalize">{request.status}</span>
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