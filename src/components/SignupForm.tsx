
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [userType, setUserType] = useState<string>('');
  const [emailConsent, setEmailConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !userType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission - this would connect to your Supabase/SendFox in production
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "You've been added to our community. Welcome!",
      });
      setName('');
      setEmail('');
      setLink('');
      setUserType('');
      setEmailConsent(false);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="p-6 md:p-8 rounded-xl w-full max-w-md mx-auto glass-panel bg-gradient-to-br from-purple-800/90 to-blkout-900/80">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          GET CONNECTED
        </h2>
        <p className="text-white/80 text-sm mt-2">
          JOIN THE CONVERSATION • GET MAIL • MEET THE COMMUNITY
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="name"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="How do you identify?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="black-queer-men">Black Queer Man</SelectItem>
              <SelectItem value="accomplices-allies">Accomplice/Ally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {userType === 'accomplices-allies' && (
          <div className="space-y-2">
            <Input
              id="link"
              placeholder="Share a link that tells us about you"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="consent" 
            checked={emailConsent}
            onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
            className="border-white/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
          />
          <Label htmlFor="consent" className="text-sm font-normal text-white/80">
            I agree to receive email updates and promotions
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-purple-500 hover:bg-purple-600"
          disabled={isSubmitting}
          aria-label="Subscribe to BLKOUTNXT"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
