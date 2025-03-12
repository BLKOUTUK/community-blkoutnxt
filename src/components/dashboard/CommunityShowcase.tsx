
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';

export interface TestimonialType {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  likes: number;
  comments: number;
  date: string;
}

interface CommunityShowcaseProps {
  testimonials: TestimonialType[];
}

export function CommunityShowcase({ testimonials }: CommunityShowcaseProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Community Voices</h2>
          <p className="text-muted-foreground">
            Hear from our amazing community members about their experiences.
          </p>
        </div>
        <Button>Share Your Story</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="flow-card">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                  <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{testimonial.author.name}</CardTitle>
                  {testimonial.author.role && (
                    <CardDescription>{testimonial.author.role}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{testimonial.content}</p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground border-t pt-4 flex justify-between">
              <div className="flex items-center space-x-1">
                <span>{testimonial.date}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <span>{testimonial.likes}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
                <span>{testimonial.comments}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
