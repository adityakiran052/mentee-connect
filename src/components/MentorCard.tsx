import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MentorCardProps {
  name: string;
  role: string;
  expertise: string[];
  imageUrl: string;
}

export const MentorCard = ({ name, role, expertise, imageUrl }: MentorCardProps) => {
  return (
    <Card className="bg-primary border-accent">
      <CardHeader className="flex items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-outfit font-semibold text-xl mb-1 text-white">{name}</h3>
        <p className="text-muted-foreground mb-3">{role}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {expertise.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};