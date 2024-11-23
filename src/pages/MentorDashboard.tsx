import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [requests] = useState([
    { id: 1, userName: "John Doe", status: "pending" },
    { id: 2, userName: "Jane Smith", status: "pending" },
  ]);

  const handleSignOut = () => {
    navigate("/mentor-login");
  };

  const handleRequest = (requestId: number, action: "accept" | "reject") => {
    // Here we would handle the request action
    console.log(`Request ${requestId} ${action}ed`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-outfit font-bold text-white">Mentor Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="bg-primary rounded-lg p-6">
          <h2 className="text-xl font-outfit mb-4 text-white">Connection Requests</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between bg-accent p-4 rounded-lg">
                <span className="text-white">{request.userName}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;