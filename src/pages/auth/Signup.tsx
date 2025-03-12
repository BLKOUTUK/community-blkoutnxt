
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function Signup() {
  return (
    <AuthLayout 
      title="Join Our Community" 
      description="Create an account to connect with the BLKOUTNXT community and access resources designed for Black queer men."
      image="/lovable-uploads/cfbe1b06-27fa-4552-8bf6-59e5c580f8b6.png"
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to join our community and access exclusive resources
          </p>
        </div>
        <SignupForm />
      </div>
    </AuthLayout>
  );
}
