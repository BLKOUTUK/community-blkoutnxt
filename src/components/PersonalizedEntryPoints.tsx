import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface EntryPoint {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export function PersonalizedEntryPoints() {
  const { user } = useAuth();
  
  // Determine user interests based on profile or activity
  const hasProfile = user?.profile?.completed;
  const isNewUser = user?.createdAt && (new Date().getTime() - new Date(user.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000;
  const interestedInEvents = user?.preferences?.events;
  const interestedInNetworking = user?.preferences?.networking;
  const interestedInResources = user?.preferences?.resources;
  
  const entryPoints: EntryPoint[] = [
    // Always show these core entry points
    {
      title: "Community Feed",
      description: "See the latest updates from the community",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      href: "/community",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Messages",
      description: "Check your conversations and connect with others",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      href: "/messages",
      color: "bg-blue-500/10 text-blue-500",
    },
    
    // Conditional entry points based on user preferences
    ...(isNewUser ? [
      {
        title: "Complete Your Profile",
        description: "Help us personalize your experience",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
        href: "/profile/edit",
        color: "bg-green-500/10 text-green-500",
      }
    ] : []),
    
    ...(interestedInEvents ? [
      {
        title: "Upcoming Events",
        description: "Discover events that match your interests",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        ),
        href: "/events",
        color: "bg-orange-500/10 text-orange-500",
      }
    ] : []),
    
    ...(interestedInNetworking ? [
      {
        title: "Network Connections",
        description: "Grow your professional network",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M16 22h2a2 2 0 0 0 2-2v-4.172a2 2 0 0 0-.586-1.414L12 7l-1.5-1.5" />
            <path d="M8 22H6a2 2 0 0 1-2-2v-4.172a2 2 0 0 1 .586-1.414L12 7l1.5-1.5" />
            <path d="M12 2v5" />
            <path d="M5 7.5 7.5 5" />
            <path d="m16.5 5 2.5 2.5" />
          </svg>
        ),
        href: "/network",
        color: "bg-pink-500/10 text-pink-500",
      }
    ] : []),
    
    ...(interestedInResources ? [
      {
        title: "Learning Resources",
        description: "Access educational content and guides",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        ),
        href: "/resources",
        color: "bg-cyan-500/10 text-cyan-500",
      }
    ] : []),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entryPoints.map((entry, index) => (
        <Link key={index} to={entry.href} className="block group">
          <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-2.5 ${entry.color}`}>
                  {entry.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}