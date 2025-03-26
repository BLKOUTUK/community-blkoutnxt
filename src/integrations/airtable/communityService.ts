// Import the mock client for development and preview
import * as airtableClient from './mockClient';

// Types for community members
export interface CommunityMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  tags?: string[];
  avatar?: string;
  featured?: boolean;
  joinDate?: string;
}

export interface UserConnection {
  userId: string;
  followingId: string;
}

// Get featured community members
export const getFeaturedMembers = async (): Promise<CommunityMember[]> => {
  try {
    const records = await airtableClient.getRecords('CommunityMembers', {
      filterByFormula: '{featured} = TRUE()',
      sort: [{ field: 'name', direction: 'asc' }],
    });
    
    return records as CommunityMember[];
  } catch (error) {
    console.error('Error fetching featured members:', error);
    return [];
  }
};

// Get new community members (joined in the last 30 days)
export const getNewMembers = async (): Promise<CommunityMember[]> => {
  try {
    const records = await airtableClient.getRecords('CommunityMembers', {
      filterByFormula: 'DATETIME_DIFF(TODAY(), {joinDate}, "days") <= 30',
      sort: [{ field: 'joinDate', direction: 'desc' }],
    });
    
    return records as CommunityMember[];
  } catch (error) {
    console.error('Error fetching new members:', error);
    return [];
  }
};

// Get recommended members for a user (not currently followed)
export const getRecommendedMembers = async (userId: string): Promise<CommunityMember[]> => {
  try {
    // Get all members
    const allMembers = await airtableClient.getRecords('CommunityMembers');
    
    // Get user's connections
    const connections = await airtableClient.getRecords('UserConnections', {
      filterByFormula: `{userId} = '${userId}'`,
    }) as UserConnection[];
    
    // Filter out members the user is already following
    const followingIds = connections.map(conn => conn.followingId);
    const recommendedMembers = (allMembers as CommunityMember[]).filter(
      member => !followingIds.includes(member.id) && member.id !== userId
    );
    
    // Return a subset of recommended members (up to 5)
    return recommendedMembers.slice(0, 5);
  } catch (error) {
    console.error('Error fetching recommended members:', error);
    return [];
  }
};

// Follow a community member
export const followMember = async (userId: string, followingId: string): Promise<UserConnection> => {
  try {
    const record = await airtableClient.createRecord('UserConnections', {
      userId,
      followingId,
    });
    
    return record as UserConnection;
  } catch (error) {
    console.error('Error following member:', error);
    throw error;
  }
};

// Unfollow a community member
export const unfollowMember = async (userId: string, followingId: string): Promise<{ success: boolean }> => {
  try {
    // Find the connection record
    const connections = await airtableClient.getRecords('UserConnections', {
      filterByFormula: `AND({userId} = '${userId}', {followingId} = '${followingId}')`,
    }) as UserConnection[];
    
    if (connections.length === 0) {
      throw new Error('Connection not found');
    }
    
    // Delete the connection
    const connectionId = connections[0].id;
    await airtableClient.deleteRecord('UserConnections', connectionId);
    
    return { success: true };
  } catch (error) {
    console.error('Error unfollowing member:', error);
    throw error;
  }
};

// Check if a user is following another user
export const isFollowing = async (userId: string, followingId: string): Promise<boolean> => {
  try {
    const connections = await airtableClient.getRecords('UserConnections', {
      filterByFormula: `AND({userId} = '${userId}', {followingId} = '${followingId}')`,
    }) as UserConnection[];
    
    return connections.length > 0;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
};