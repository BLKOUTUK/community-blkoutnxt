
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up the user
      const { error: signupError, data } = await signUp(email, password, name);
      
      if (signupError) throw signupError;
      
      // Send welcome email and schedule follow-up survey
      try {
        // Send the welcome email
        const welcomeResponse = await supabase.functions.invoke('send-email', {
          body: {
            email,
            firstName: name.split(' ')[0], // Get first name
            emailType: 'welcome'
          }
        });
        
        if (welcomeResponse.error) {
          console.error('Error sending welcome email:', welcomeResponse.error);
        }
        
        // Schedule a follow-up survey email after 3 days
        const userId = data?.user?.id;
        if (userId) {
          const reminderResponse = await supabase.functions.invoke('schedule-reminder', {
            body: {
              email,
              userId,
              firstName: name.split(' ')[0],
              reminderAfterDays: 3
            }
          });
          
          if (reminderResponse.error) {
            console.error('Error scheduling survey reminder:', reminderResponse.error);
          }
        }
      } catch (emailError) {
        // Log but don't block registration if email sending fails
        console.error('Error in email workflow:', emailError);
      }
      
      // Show success toast
      toast({
        title: "Registration successful",
        description: "Welcome to BLKOUTNXT! Please check your email to verify your account.",
      });
      
      // Redirect to login after successful signup
      navigate('/auth/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          type="text" 
          placeholder="Enter your full name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Create a password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Limited Access</span>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
