
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
}

export function AuthLayout({ children, title, description, image }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-blkout-900">
        {image ? (
          <div className="absolute inset-0 bg-gradient-to-tr from-blkout-900 via-blkout-900/90 to-blkout-900/80">
            <img 
              src={image} 
              alt="Authentication visual" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70" 
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-blkout-900 via-purple-900/20 to-orange-900/20 animate-pulse-slow" />
        )}
        <div className="relative z-10 flex flex-col justify-center items-start p-12">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/70 max-w-md">{description}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
