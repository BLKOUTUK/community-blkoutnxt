
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import {
  ActivityIcon,
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  GlobeIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  Users2Icon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <aside className="w-64 hidden md:block bg-sidebar border-r border-sidebar-border shrink-0">
          <div className="flex flex-col h-[calc(100vh-4rem)] p-4 gap-1">
            <SidebarItem
              icon={<HomeIcon className="h-4 w-4" />}
              label="Dashboard"
              href="/dashboard"
              active={path === '/dashboard'}
            />
            <SidebarItem
              icon={<UserIcon className="h-4 w-4" />}
              label="Profile"
              href="/profile"
              active={path === '/profile'}
            />
            <SidebarItem
              icon={<Users2Icon className="h-4 w-4" />}
              label="Community"
              href="/community"
              active={path === '/community'}
            />
            <SidebarItem
              icon={<MessageSquareIcon className="h-4 w-4" />}
              label="Messages"
              href="/messages"
              active={path === '/messages'}
            />
            <SidebarItem
              icon={<FileTextIcon className="h-4 w-4" />}
              label="Resources"
              href="/resources"
              active={path === '/resources'}
            />
            <SidebarItem
              icon={<CalendarIcon className="h-4 w-4" />}
              label="Events"
              href="/events"
              active={path === '/events'}
            />
            <SidebarItem
              icon={<ActivityIcon className="h-4 w-4" />}
              label="Projects"
              href="/projects"
              active={path.startsWith('/projects')}
            />
            <SidebarItem
              icon={<FolderIcon className="h-4 w-4" />}
              label="Submissions"
              href="/submissions"
              active={path === '/submissions'}
            />
            <SidebarItem
              icon={<GlobeIcon className="h-4 w-4" />}
              label="Network"
              href="/network"
              active={path === '/network'}
            />
            <div className="mt-auto">
              <SidebarItem
                icon={<SettingsIcon className="h-4 w-4" />}
                label="Settings"
                href="/settings"
                active={path === '/settings'}
              />
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
