import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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

// Sample campaign data - in a real implementation, this would be fetched from an API
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

interface CampaignWidgetProps {
  campaignId?: string;
  variant?: 'compact' | 'full';
  theme?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  showBranding?: boolean;
}

export function CampaignWidget({
  campaignId = '1', // Default to first campaign if none specified
  variant = 'full',
  theme = 'light',
  primaryColor = '#7c3aed', // Default purple
  secondaryColor = '#e5e7eb',
  showBranding = true
}: CampaignWidgetProps) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // In a real implementation, this would fetch from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];
      setCampaign(foundCampaign);
      setIsLoaded(true);
    }, 500);
  }, [campaignId]);

  // Apply theme and custom colors
  const themeStyles = {
    container: theme === 'light' 
      ? 'bg-white text-gray-900' 
      : 'bg-gray-900 text-white',
    border: theme === 'light'
      ? 'border border-gray-200'
      : 'border border-gray-700',
    badge: theme === 'light'
      ? 'bg-gray-100 text-gray-800'
      : 'bg-gray-800 text-gray-200',
    button: theme === 'light'
      ? `bg-[${primaryColor}] text-white hover:bg-opacity-90`
      : `bg-[${primaryColor}] text-white hover:bg-opacity-90`,
    progress: {
      background: secondaryColor,
      foreground: primaryColor
    }
  };

  if (!isLoaded) {
    return (
      <div className={`rounded-lg ${themeStyles.container} ${themeStyles.border} p-4 shadow-sm min-h-[200px] flex items-center justify-center`}>
        <div className="animate-pulse text-center">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-2"></div>
          <div className="h-2 w-16 bg-gray-200 dark:bg-gray-800 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className={`rounded-lg ${themeStyles.container} ${themeStyles.border} p-4 shadow-sm`}>
        <p className="text-center">Campaign not found</p>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`rounded-lg ${themeStyles.container} ${themeStyles.border} p-4 shadow-sm max-w-sm`}>
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${themeStyles.badge}`}>
                {campaign.status === 'active' ? 'Active' : 
                 campaign.status === 'completed' ? 'Completed' : 'Upcoming'}
              </span>
            </div>
            <h4 className="font-semibold text-sm line-clamp-1">{campaign.title}</h4>
            <div className="mt-2 space-y-1">
              <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: themeStyles.progress.background }}>
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${campaign.progress}%`,
                    backgroundColor: themeStyles.progress.foreground
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-medium">{campaign.progress}%</span>
                <span className="opacity-70">{campaign.daysLeft} days left</span>
              </div>
            </div>
            <a 
              href={`https://blkoutnxt.org/campaigns/${campaign.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium mt-2 inline-block hover:underline"
              style={{ color: primaryColor }}
            >
              Support this campaign
            </a>
          </div>
        </div>
        
        {showBranding && (
          <div className="mt-3 pt-2 border-t text-center text-xs opacity-70" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
            <a 
              href="https://blkoutnxt.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Powered by BLKOUTNXT
            </a>
          </div>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className={`rounded-lg ${themeStyles.container} ${themeStyles.border} p-4 shadow-sm max-w-md`}>
      <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${themeStyles.badge}`}>
              {campaign.status === 'active' ? 'Active' : 
               campaign.status === 'completed' ? 'Completed' : 'Upcoming'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${themeStyles.badge}`}>
              {campaign.category}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1">{campaign.title}</h3>
          <p className="text-sm opacity-80 line-clamp-2">{campaign.description}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="opacity-70">Progress</span>
            <span className="font-medium">{campaign.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: themeStyles.progress.background }}>
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${campaign.progress}%`,
                backgroundColor: themeStyles.progress.foreground
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatCurrency(campaign.current)}</span>
            <span className="opacity-70">of {formatCurrency(campaign.goal)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4 opacity-70" />
            <span>{campaign.supporters} supporters</span>
          </div>
          {campaign.daysLeft !== null && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 opacity-70" />
              <span>{campaign.daysLeft} days left</span>
            </div>
          )}
        </div>
        
        <a 
          href={`https://blkoutnxt.org/campaigns/${campaign.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-2 px-4 rounded-md text-center font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          {campaign.status === 'active' ? 'Support Campaign' : 
           campaign.status === 'completed' ? 'View Results' : 'Get Notified'}
        </a>
        
        {showBranding && (
          <div className="pt-2 border-t text-center text-xs opacity-70" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
            <a 
              href="https://blkoutnxt.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Powered by BLKOUTNXT
            </a>
          </div>
        )}
      </div>
    </div>
  );
}