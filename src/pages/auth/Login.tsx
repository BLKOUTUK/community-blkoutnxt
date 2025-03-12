
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Log in to continue your journey with BLKOUTNXT. Connect with the community and access resources designed for Black queer men."
      image="/lovable-uploads/dc713c55-ebd1-4f09-9c74-e6f18b6fc6b7.png"
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login to Continue</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
