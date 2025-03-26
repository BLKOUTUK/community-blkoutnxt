import { useState } from 'react';
import { CommunityShowcase } from '@/components/dashboard/CommunityShowcase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { NotificationCard } from '@/components/NotificationCard';
import { PersonalizedEntryPoints } from '@/components/PersonalizedEntryPoints';
import { CallToAction } from '@/components/CallToAction';
import { SignupForm } from '@/components/SignupForm';
import { EngagementCard } from '@/components/dashboard/EngagementCard';
import { 
  MessageSquareIcon, 
  UserIcon, 
  CalendarIcon, 
  FileTextIcon,
  HeartIcon
} from 'lucide-react';

// Mock data for previewing components
const mockNotifications = [
  {
    id: '1',
    type: 'message',
    title: 'New message from James',
    description: 'Hey, I saw your post about the upcoming event. Would love to connect!',
    time: '2 min ago',
    read: false,
    actionUrl: '/messages/1',
    actionLabel: 'Reply',
    user: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  },
  {
    id: '2',
    type: 'connection',
    title: 'New connection request',
    description: 'Michael Johnson wants to connect with you',
    time: '1 hour ago',
    read: false,
    actionUrl: '/network',
    actionLabel: 'View Profile',
    user: {
      name: 'Michael Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    id: '3',
    type: 'event',
    title: 'Upcoming Event Reminder',
    description: 'Community Meetup starts in 2 days. Don\'t forget to RSVP!',
    time: '3 hours ago',
    read: true,
    actionUrl: '/events/5',
    actionLabel: 'View Event',
  },
  {
    id: '4',
    type: 'like',
    title: 'Your post received likes',
    description: '5 people liked your recent post about mental health resources',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Completion',
    description: 'Your profile is 80% complete. Add a bio to reach 100%!',
    time: '2 days ago',
    read: true,
    actionUrl: '/profile/edit',
    actionLabel: 'Complete Profile',
  },
];

const mockEngagementMetrics = [
  {
    label: 'Community Participation',
    value: 7,
    total: 10,
    change: 5,
    icon: <UserIcon className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Events Attended',
    value: 3,
    total: 8,
    change: 12,
    icon: <CalendarIcon className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Resources Accessed',
    value: 12,
    total: 20,
    change: -3,
    icon: <FileTextIcon className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Messages Exchanged',
    value: 28,
    total: 50,
    change: 15,
    icon: <MessageSquareIcon className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Connections Made',
    value: 5,
    total: 10,
    change: 0,
    icon: <HeartIcon className="h-4 w-4 text-primary" />,
  },
];

export default function Preview() {
  const [activeTab, setActiveTab] = useState('community');
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleFollow = (id: string) => {
    console.log(`Following member with ID: ${id}`);
  };

  const handleUnfollow = (id: string) => {
    console.log(`Unfollowing member with ID: ${id}`);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">UI Component Preview</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="entrypoints">Entry Points</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="community" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Showcase Component</CardTitle>
              <CardDescription>
                Preview how the community showcase component will appear with mock data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommunityShowcase
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
              />
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Engagement Metrics</h3>
                <EngagementCard metrics={mockEngagementMetrics} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Component</CardTitle>
              <CardDescription>
                Preview how notifications will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <NotificationCard
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDismiss={handleDismiss}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="entrypoints" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Entry Points</CardTitle>
              <CardDescription>
                Preview how personalized entry points will appear on the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalizedEntryPoints />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cta" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action Variants</CardTitle>
              <CardDescription>
                Preview different call-to-action component styles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Default Style</h3>
                <CallToAction
                  title="Join Our Community Today"
                  description="Be part of a movement that celebrates, supports, and amplifies Black queer voices."
                  buttonText="Sign Up Now"
                  buttonHref="/auth/signup"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Gradient Style</h3>
                <CallToAction
                  title="Upcoming Community Event"
                  description="Join us for our monthly virtual meetup with special guest speakers."
                  buttonText="Register Now"
                  buttonHref="/events/register"
                  secondaryButtonText="Learn More"
                  secondaryButtonHref="/events"
                  variant="gradient"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Subtle Style with Image</h3>
                <CallToAction
                  title="Explore Our Resources"
                  description="Access our curated collection of resources designed specifically for Black queer men."
                  buttonText="Browse Resources"
                  buttonHref="/resources"
                  variant="subtle"
                  align="left"
                  imageSrc="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Signup Form</CardTitle>
              <CardDescription>
                Preview the signup form component
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-md">
                <SignupForm redirectTo="/preview" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          This is a preview environment. No data is being saved.
        </p>
        <Button asChild variant="outline">
          <a href="/">Return to Main Application</a>
        </Button>
      </div>
    </div>
  );
}