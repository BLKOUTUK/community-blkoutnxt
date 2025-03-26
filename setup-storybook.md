# Setting Up Storybook for UI Component Preview

Storybook is a powerful tool for developing and previewing UI components in isolation. Here's how to add it to your project:

## Installation

```bash
npx storybook@latest init
```

This will:
1. Add necessary dependencies
2. Create a basic Storybook configuration
3. Add npm scripts to your package.json

## Running Storybook

After installation, you can start Storybook with:

```bash
npm run storybook
```

This will open Storybook in your browser (typically at http://localhost:6006).

## Creating Stories for Your Components

Create a story file for the CommunityShowcase component:

```tsx
// src/components/dashboard/CommunityShowcase.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CommunityShowcase } from './CommunityShowcase';

const meta: Meta<typeof CommunityShowcase> = {
  component: CommunityShowcase,
  title: 'Dashboard/CommunityShowcase',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityShowcase>;

export const Default: Story = {
  args: {
    onFollow: (id) => console.log(`Following ${id}`),
    onUnfollow: (id) => console.log(`Unfollowing ${id}`),
  },
};

// Mock the AuthContext for Storybook
export const WithMockData: Story = {
  decorators: [
    (Story) => {
      // Mock the useAuth hook
      const mockUseAuth = () => ({
        user: { id: 'mock-user-id' },
        session: {},
        loading: false,
        signIn: async () => {},
        signUp: async () => ({}),
        signOut: async () => {},
      });
      
      // Mock the Airtable service
      const mockGetFeaturedMembers = async () => [
        {
          id: '1',
          name: 'John Doe',
          role: 'Community Leader',
          bio: 'Passionate about community building and social justice.',
          tags: ['Leadership', 'Advocacy'],
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: '2',
          name: 'Jane Smith',
          role: 'Content Creator',
          bio: 'Digital storyteller focused on LGBTQ+ narratives.',
          tags: ['Content', 'Media'],
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
      ];
      
      const mockGetNewMembers = async () => [
        {
          id: '3',
          name: 'Alex Johnson',
          role: 'New Member',
          bio: 'Just joined the community. Excited to connect!',
          tags: ['Networking'],
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      ];
      
      const mockGetRecommendedMembers = async () => [
        {
          id: '4',
          name: 'Taylor Williams',
          role: 'Artist',
          bio: 'Visual artist exploring identity through digital media.',
          tags: ['Art', 'Digital'],
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
      ];
      
      // Override the imports in the component
      jest.mock('@/contexts/AuthContext', () => ({
        useAuth: mockUseAuth,
      }));
      
      jest.mock('@/integrations/airtable/communityService', () => ({
        getFeaturedMembers: mockGetFeaturedMembers,
        getNewMembers: mockGetNewMembers,
        getRecommendedMembers: mockGetRecommendedMembers,
      }));
      
      return <Story />;
    },
  ],
  args: {
    onFollow: (id) => console.log(`Following ${id}`),
    onUnfollow: (id) => console.log(`Unfollowing ${id}`),
  },
};
```

## Benefits of Using Storybook

1. **Component Isolation**: Develop and test components without needing the entire app running
2. **Interactive Documentation**: Automatically documents your components and their props
3. **Visual Testing**: Easily test different states and variations of your components
4. **Collaboration**: Share component designs with team members via Storybook