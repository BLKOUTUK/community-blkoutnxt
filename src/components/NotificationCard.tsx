import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BellIcon, 
  CheckIcon, 
  MessageSquareIcon, 
  UserPlusIcon, 
  CalendarIcon,
  HeartIcon,
  XIcon
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'connection' | 'event' | 'like' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface NotificationCardProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

export function NotificationCard({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onDismiss
}: NotificationCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = expanded 
    ? notifications 
    : notifications.slice(0, 3);
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquareIcon className="h-4 w-4 text-blue-500" />;
      case 'connection':
        return <UserPlusIcon className="h-4 w-4 text-green-500" />;
      case 'event':
        return <CalendarIcon className="h-4 w-4 text-orange-500" />;
      case 'like':
        return <HeartIcon className="h-4 w-4 text-red-500" />;
      default:
        return <BellIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-border">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMarkAllAsRead}
              className="text-xs h-8"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[350px] overflow-y-auto">
          {displayNotifications.length > 0 ? (
            <>
              {displayNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div 
                    className={`relative p-4 ${notification.read ? '' : 'bg-primary/5'}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      {notification.user ? (
                        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={notification.user.avatar} 
                            alt={notification.user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10`}>
                          {getIcon(notification.type)}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        
                        {notification.actionUrl && notification.actionLabel && (
                          <div className="mt-2">
                            <Link 
                              to={notification.actionUrl}
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              {notification.actionLabel}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notification.id);
                          }}
                        >
                          <CheckIcon className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismiss(notification.id);
                        }}
                      >
                        <XIcon className="h-3 w-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>
                  {index < displayNotifications.length - 1 && <Separator />}
                </div>
              ))}
              
              {notifications.length > 3 && (
                <div className="p-3 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpanded(!expanded)}
                    className="text-xs"
                  >
                    {expanded ? "Show less" : `Show ${notifications.length - 3} more`}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <BellIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-sm font-medium">No notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                When you get notifications, they'll show up here.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}