import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, Search, User, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(3);

  const showNotification = () => {
    toast({
      title: "New notification",
      description: "You have a new message from the community",
    });
    setNotificationCount(Math.max(0, notificationCount - 1));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-black bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
              BLKOUTNXT
            </span>
          </Link>
          <div className="hidden md:flex gap-4">
            <Link 
              to="/community" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${isActive('/community') ? 'font-medium text-foreground' : ''}`}
            >
              Community
            </Link>
            <Link 
              to="/campaigns" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${isActive('/campaigns') ? 'font-medium text-foreground' : ''}`}
            >
              Campaigns
            </Link>
            <Link 
              to="/projects" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${isActive('/projects') ? 'font-medium text-foreground' : ''}`}
            >
              Projects
            </Link>
            <Link 
              to="/resources" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${isActive('/resources') ? 'font-medium text-foreground' : ''}`}
            >
              Resources
            </Link>
            <Link 
              to="/events" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${isActive('/events') ? 'font-medium text-foreground' : ''}`}
            >
              Events
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" onClick={showNotification}>
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" onClick={() => navigate('/search')}>
            <Search className="h-5 w-5" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name || 'User'} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <div className="flex items-center gap-2 w-full text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/auth/login')}>
              Login
            </Button>
          )}
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <span className="font-display text-xl font-black bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
                    BLKOUTNXT
                  </span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="flex flex-col gap-1 py-4">
                  <SheetClose asChild>
                    <Link 
                      to="/community" 
                      className={`flex items-center px-4 py-2 rounded-md ${isActive('/community') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      Community
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/projects" 
                      className={`flex items-center px-4 py-2 rounded-md ${isActive('/projects') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      Projects
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/resources" 
                      className={`flex items-center px-4 py-2 rounded-md ${isActive('/resources') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      Resources
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/events" 
                      className={`flex items-center px-4 py-2 rounded-md ${isActive('/events') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      Events
                    </Link>
                  </SheetClose>
                </div>
                
                {user ? (
                  <div className="mt-auto border-t py-4">
                    <div className="flex items-center gap-3 px-4 mb-4">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name || 'User'} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.name || 'User'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <SheetClose asChild>
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/dashboard" 
                          className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3">
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                          Dashboard
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/settings" 
                          className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Settings
                        </Link>
                      </SheetClose>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md mt-2"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto border-t py-4 px-4">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={() => navigate('/auth/login')}>
                        Login
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/auth/signup')}>
                        Sign Up
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}