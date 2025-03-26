import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarIcon, CheckCircle2Icon, HeartIcon, UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Campaign type definition
interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
  goal: number;
  current: number;
  supporters: number;
  daysLeft: number | null;
  image: string;
  organizer: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

// Sample campaign data
const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Mental Health Support Fund',
    description: 'Help us provide free therapy sessions and mental health resources to Black queer men in our community.',
    category: 'Health',
    status: 'active',
    progress: 65,
    goal: 10000,
    current: 6500,
    supporters: 124,
    daysLeft: 15,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    organizer: {
      name: 'Marcus Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    tags: ['Mental Health', 'Community Support', 'Healthcare Access']
  },
  {
    id: '2',
    title: 'Professional Development Scholarships',
    description: 'Fund scholarships for career advancement courses and certifications for community members.',
    category: 'Education',
    status: 'active',
    progress: 42,
    goal: 15000,
    current: 6300,
    supporters: 87,
    daysLeft: 23,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    organizer: {
      name: 'Devon Williams',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    tags: ['Education', 'Career Development', 'Scholarships']
  },
  {
    id: '3',
    title: 'Community Center Renovation',
    description: 'Help us renovate our community center to create a safe and welcoming space for gatherings and events.',
    category: 'Community',
    status: 'active',
    progress: 78,
    goal: 25000,
    current: 19500,
    supporters: 213,
    daysLeft: 7,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1',
    organizer: {
      name: 'Jamal Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    tags: ['Community Space', 'Renovation', 'Safe Spaces']
  },
  {
    id: '4',
    title: 'LGBTQ+ Youth Mentorship Program',
    description: 'Support our mentorship program connecting Black queer youth with successful Black queer professionals.',
    category: 'Mentorship',
    status: 'upcoming',
    progress: 0,
    goal: 12000,
    current: 0,
    supporters: 0,
    daysLeft: null,
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5',
    organizer: {
      name: 'Andre Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    tags: ['Youth', 'Mentorship', 'Education']
  },
  {
    id: '5',
    title: 'Black Queer Artists Showcase',
    description: 'Fund an exhibition showcasing the work of Black queer artists and providing them with exposure and opportunities.',
    category: 'Arts',
    status: 'completed',
    progress: 100,
    goal: 8000,
    current: 8000,
    supporters: 156,
    daysLeft: 0,
    image: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b',
    organizer: {
      name: 'Terrell Jackson',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    tags: ['Arts', 'Culture', 'Exhibition']
  }
];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Props for the CampaignIntegration component
interface CampaignIntegrationProps {
  variant?: 'full' | 'minimal' | 'featured';
  showTabs?: boolean;
  limit?: number;
  category?: string;
}

export function CampaignIntegration({ 
  variant = 'full', 
  showTabs = true,
  limit = 3,
  category
}: CampaignIntegrationProps) {
  const [activeTab, setActiveTab] = useState('active');
  
  // Filter campaigns based on status and category
  const filteredCampaigns = campaigns
    .filter(campaign => !category || campaign.category === category)
    .filter(campaign => {
      if (activeTab === 'all') return true;
      return campaign.status === activeTab;
    })
    .slice(0, limit);
  
  // Featured campaign (highest progress that's still active)
  const featuredCampaign = campaigns
    .filter(campaign => campaign.status === 'active')
    .sort((a, b) => b.progress - a.progress)[0];
  
  // Render a single campaign card
  const renderCampaignCard = (campaign: Campaign) => (
    <Card key={campaign.id} className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant={campaign.status === 'active' ? 'default' : 
                          campaign.status === 'completed' ? 'success' : 'secondary'}>
            {campaign.status === 'active' ? 'Active' : 
             campaign.status === 'completed' ? 'Completed' : 'Upcoming'}
          </Badge>
          <Badge variant="outline">{campaign.category}</Badge>
        </div>
        <CardTitle className="line-clamp-1">{campaign.title}</CardTitle>
        <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatCurrency(campaign.current)}</span>
            <span className="text-muted-foreground">of {formatCurrency(campaign.goal)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.supporters} supporters</span>
          </div>
          {campaign.daysLeft !== null && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{campaign.daysLeft} days left</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/campaigns/${campaign.id}`}>
            {campaign.status === 'active' ? 'Support Campaign' : 
             campaign.status === 'completed' ? 'View Results' : 'Get Notified'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
  
  // Render a featured campaign (larger display)
  const renderFeaturedCampaign = (campaign: Campaign) => (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-square md:aspect-auto overflow-hidden">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default">Featured Campaign</Badge>
            <Badge variant="outline">{campaign.category}</Badge>
          </div>
          <h3 className="text-2xl font-bold mb-2">{campaign.title}</h3>
          <p className="text-muted-foreground mb-6">{campaign.description}</p>
          
          <div className="space-y-6 mt-auto">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="font-medium">{formatCurrency(campaign.current)}</span>
                <span className="text-muted-foreground">of {formatCurrency(campaign.goal)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={campaign.organizer.avatar} alt={campaign.organizer.name} />
                  <AvatarFallback>{campaign.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">Organized by</p>
                  <p className="font-medium">{campaign.organizer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{campaign.daysLeft} days left</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link to={`/campaigns/${campaign.id}`}>
                  Support Campaign
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/campaigns/${campaign.id}`}>
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
  
  // Render a minimal campaign card
  const renderMinimalCampaignCard = (campaign: Campaign) => (
    <Card key={campaign.id} className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">{campaign.category}</Badge>
            {campaign.status === 'active' && campaign.daysLeft && campaign.daysLeft <= 7 && (
              <Badge variant="destructive" className="text-xs">Urgent</Badge>
            )}
          </div>
          <h4 className="font-semibold text-sm line-clamp-1">{campaign.title}</h4>
          <div className="mt-2 space-y-1">
            <Progress value={campaign.progress} className="h-1.5" />
            <div className="flex justify-between text-xs">
              <span className="font-medium">{campaign.progress}%</span>
              <span className="text-muted-foreground">{campaign.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
  
  // Main component render
  if (variant === 'featured' && featuredCampaign) {
    return (
      <div className="space-y-8">
        {renderFeaturedCampaign(featuredCampaign)}
        
        {showTabs && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">More Campaigns</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns
                .filter(campaign => campaign.id !== featuredCampaign.id)
                .map(campaign => renderCampaignCard(campaign))}
            </div>
          </>
        )}
      </div>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <div className="space-y-4">
        {showTabs && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        <div className="grid grid-cols-1 gap-4">
          {filteredCampaigns.map(campaign => renderMinimalCampaignCard(campaign))}
        </div>
        
        <Button variant="link" asChild className="w-full">
          <Link to="/campaigns" className="flex items-center justify-center gap-1">
            View all campaigns
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }
  
  // Default full view
  return (
    <div className="space-y-6">
      {showTabs && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => renderCampaignCard(campaign))}
      </div>
    </div>
  );
}