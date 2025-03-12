
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function NotificationCard() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);
  const [communityNotifications, setCommunityNotifications] = useState(true);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellIcon className="h-5 w-5 text-primary" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>
          Control how you receive updates from the BLKOUTNXT community.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about community activities.
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-notifications">App notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications directly in the app.
              </p>
            </div>
            <Switch
              id="app-notifications"
              checked={appNotifications}
              onCheckedChange={setAppNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="event-notifications">Event reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming events and programs.
              </p>
            </div>
            <Switch
              id="event-notifications"
              checked={eventNotifications}
              onCheckedChange={setEventNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="community-notifications">Community updates</Label>
              <p className="text-sm text-muted-foreground">
                Stay informed about community contributions and stories.
              </p>
            </div>
            <Switch
              id="community-notifications"
              checked={communityNotifications}
              onCheckedChange={setCommunityNotifications}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save preferences</Button>
      </CardFooter>
    </Card>
  );
}
