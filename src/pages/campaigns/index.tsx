import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CampaignIntegration } from '@/components/CampaignIntegration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from 'lucide-react';

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Support our community initiatives and make a difference.
          </p>
        </div>
        
        {/* Featured Campaign */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Featured Campaign</h2>
          <CampaignIntegration variant="featured" showTabs={false} />
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="Mentorship">Mentorship</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
          }}>
            Reset
          </Button>
        </div>
        
        {/* All Campaigns */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <CampaignIntegration 
              variant="full" 
              showTabs={false} 
              limit={6} 
              category={categoryFilter !== 'all' ? categoryFilter : undefined} 
            />
          </TabsContent>
          
          <TabsContent value="upcoming">
            <CampaignIntegration 
              variant="full" 
              showTabs={false} 
              limit={6} 
              category={categoryFilter !== 'all' ? categoryFilter : undefined} 
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <CampaignIntegration 
              variant="full" 
              showTabs={false} 
              limit={6} 
              category={categoryFilter !== 'all' ? categoryFilter : undefined} 
            />
          </TabsContent>
        </Tabs>
        
        {/* Campaign Impact */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Campaign Impact</h2>
          <p className="text-muted-foreground">
            Our campaigns have made a significant difference in our community. Here's what we've accomplished together:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">$75,000+</p>
              <p className="text-sm text-muted-foreground">Funds Raised</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Successful Campaigns</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">850+</p>
              <p className="text-sm text-muted-foreground">Community Members Supported</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Community Projects Funded</p>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-6 space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold">Browse Campaigns</h3>
              <p className="text-sm text-muted-foreground">
                Explore our active campaigns and find causes that resonate with you and your values.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold">Support a Campaign</h3>
              <p className="text-sm text-muted-foreground">
                Contribute to campaigns through donations, volunteering, or sharing with your network.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold">See the Impact</h3>
              <p className="text-sm text-muted-foreground">
                Track the progress of campaigns you've supported and see the real-world impact of your contribution.
              </p>
            </div>
          </div>
        </div>
        
        {/* Start Your Own Campaign */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Have an Idea for a Campaign?</h2>
            <p>
              If you have a project or initiative that would benefit our community, we want to hear from you. 
              Start your own campaign and we'll help you bring it to life.
            </p>
            <Button size="lg" variant="secondary">
              Start a Campaign
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}