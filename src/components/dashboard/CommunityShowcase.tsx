import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CommunityMember, 
  getFeaturedMembers, 
  getNewMembers, 
  getRecommendedMembers 
} from '@/integrations/airtable/communityService';

interface CommunityShowcaseProps {
  onFollow: (memberId: string) => void;
  onUnfollow: (memberId: string) => void;
}

export function CommunityShowcase({
  onFollow,
  onUnfollow,
}: CommunityShowcaseProps) {
  const [activeTab, setActiveTab] = useState('featured');
  const [featuredMembers, setFeaturedMembers] = useState<CommunityMember[]>([]);
  const [newMembers, setNewMembers] = useState<CommunityMember[]>([]);
  const [recommendedMembers, setRecommendedMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const featured = await getFeaturedMembers();
        setFeaturedMembers(featured);
        
        const newest = await getNewMembers();
        setNewMembers(newest);
        
        if (user) {
          const recommended = await getRecommendedMembers(user.id);
          setRecommendedMembers(recommended);
        }
      } catch (error) {
        console.error("Error loading community members:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const renderMemberCard = (member: CommunityMember) => (
    <Card key={member.id} className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          {member.isFollowing !== undefined && (
            <Button
              variant={member.isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => member.isFollowing ? onUnfollow(member.id) : onFollow(member.id)}
              className="h-8"
            >
              {member.isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <CardTitle className="text-base mt-2">{member.name}</CardTitle>
        <CardDescription className="text-xs">{member.role}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-sm line-clamp-3">{member.bio}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {member.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {member.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{member.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to={`/profile/${member.id}`} 
          className="text-xs text-primary hover:underline w-full text-center"
        >
          View Profile
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Members</CardTitle>
        <CardDescription>Connect with other members of the BLKOUTNXT community</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="featured" onValueChange={setActiveTab} value={activeTab}>
          <div className="px-6">
            <TabsList className="w-full">
              <TabsTrigger value="featured" className="flex-1">Featured</TabsTrigger>
              <TabsTrigger value="new" className="flex-1">New Members</TabsTrigger>
              <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6 pt-4">
            <TabsContent value="featured" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredMembers.map(renderMemberCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newMembers.map(renderMemberCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedMembers.map(renderMemberCard)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button variant="outline" asChild>
          <Link to="/community">View All Community Members</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}