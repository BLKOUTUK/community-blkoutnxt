// Mock Airtable client for development and preview purposes
// This allows the application to run without actual Airtable credentials

// Mock data for community members
const mockCommunityMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Community Leader',
    bio: 'Passionate about community building and social justice.',
    tags: ['Leadership', 'Advocacy'],
    avatar: 'https://i.pravatar.cc/150?img=1',
    featured: true,
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Content Creator',
    bio: 'Digital storyteller focused on LGBTQ+ narratives.',
    tags: ['Content', 'Media'],
    avatar: 'https://i.pravatar.cc/150?img=2',
    featured: true,
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    role: 'New Member',
    bio: 'Just joined the community. Excited to connect!',
    tags: ['Networking'],
    avatar: 'https://i.pravatar.cc/150?img=3',
    featured: false,
    joinDate: '2024-05-01',
  },
  {
    id: '4',
    name: 'Taylor Williams',
    role: 'Artist',
    bio: 'Visual artist exploring identity through digital media.',
    tags: ['Art', 'Digital'],
    avatar: 'https://i.pravatar.cc/150?img=4',
    featured: false,
    joinDate: '2023-11-10',
  },
  {
    id: '5',
    name: 'Jordan Lee',
    role: 'Mental Health Advocate',
    bio: 'Working to improve mental health resources for BIPOC communities.',
    tags: ['Health', 'Advocacy'],
    avatar: 'https://i.pravatar.cc/150?img=5',
    featured: true,
    joinDate: '2023-06-15',
  },
  {
    id: '6',
    name: 'Morgan Chen',
    role: 'Entrepreneur',
    bio: 'Building tech solutions for underrepresented communities.',
    tags: ['Business', 'Technology'],
    avatar: 'https://i.pravatar.cc/150?img=6',
    featured: false,
    joinDate: '2023-09-22',
  },
];

// Mock data for user connections
const mockUserConnections = [
  { userId: 'mock-user-id', followingId: '2' },
  { userId: 'mock-user-id', followingId: '5' },
];

// Mock Airtable client functions
export const getRecords = async (tableName: string, options?: any) => {
  console.log(`Mock: Getting records from ${tableName} with options:`, options);
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (tableName === 'CommunityMembers') {
    // Filter records based on options if provided
    if (options?.filterByFormula) {
      if (options.filterByFormula.includes('featured')) {
        return mockCommunityMembers.filter(member => member.featured);
      }
      if (options.filterByFormula.includes('DATETIME_DIFF')) {
        // Return members who joined in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return mockCommunityMembers.filter(member => {
          const joinDate = new Date(member.joinDate);
          return joinDate >= thirtyDaysAgo;
        });
      }
    }
    return mockCommunityMembers;
  }
  
  if (tableName === 'UserConnections') {
    if (options?.filterByFormula && options.filterByFormula.includes('mock-user-id')) {
      return mockUserConnections;
    }
    return [];
  }
  
  return [];
};

export const getRecord = async (tableName: string, recordId: string) => {
  console.log(`Mock: Getting record ${recordId} from ${tableName}`);
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (tableName === 'CommunityMembers') {
    const member = mockCommunityMembers.find(m => m.id === recordId);
    if (member) return member;
  }
  
  throw new Error(`Record not found: ${recordId} in table ${tableName}`);
};

export const createRecord = async (tableName: string, fields: any) => {
  console.log(`Mock: Creating record in ${tableName} with fields:`, fields);
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Generate a mock ID
  const mockId = `mock-${Date.now()}`;
  
  return {
    id: mockId,
    ...fields,
  };
};

export const updateRecord = async (tableName: string, recordId: string, fields: any) => {
  console.log(`Mock: Updating record ${recordId} in ${tableName} with fields:`, fields);
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    id: recordId,
    ...fields,
  };
};

export const deleteRecord = async (tableName: string, recordId: string) => {
  console.log(`Mock: Deleting record ${recordId} from ${tableName}`);
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return { success: true, id: recordId };
};

// Export a mock base that does nothing but prevents errors
export const airtableBase = (tableName: string) => ({
  select: (options?: any) => ({
    all: async () => {
      const records = await getRecords(tableName, options);
      return records.map(record => ({
        id: record.id,
        fields: { ...record, id: undefined },
      }));
    },
  }),
  find: async (recordId: string) => {
    const record = await getRecord(tableName, recordId);
    return {
      id: record.id,
      fields: { ...record, id: undefined },
    };
  },
  create: async (fields: any) => {
    const record = await createRecord(tableName, fields);
    return {
      id: record.id,
      fields: { ...record, id: undefined },
    };
  },
  update: async (recordId: string, fields: any) => {
    const record = await updateRecord(tableName, recordId, fields);
    return {
      id: record.id,
      fields: { ...record, id: undefined },
    };
  },
  destroy: async (recordId: string) => {
    return deleteRecord(tableName, recordId);
  },
});