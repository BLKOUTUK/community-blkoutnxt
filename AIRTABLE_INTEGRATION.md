# Hybrid Supabase and Airtable Integration

This project uses a hybrid approach with Supabase and Airtable:
- **Supabase**: Authentication, user profiles, and core data
- **Airtable**: Community content, events, and resources

## Setup Instructions

### 1. Supabase Setup (Already configured)
- Authentication and user management remain in Supabase
- Core user data and profiles stay in Supabase

### 2. Airtable Setup (New)

#### Create an Airtable Base with the following tables:

**CommunityMembers Table**
- Name (Single line text)
- Role (Single line text)
- Bio (Long text)
- Avatar (Attachment)
- Tags (Multiple select)
- Email (Email)
- SupabaseUserId (Single line text) - Links to Supabase user
- IsFeatured (Checkbox)
- CreatedAt (Date)

**Events Table**
- Name (Single line text)
- Description (Long text)
- EventDate (Date)
- Location (Single line text)
- OrganizerId (Single line text) - Links to Supabase user
- RegistrationLink (URL)
- TargetAudience (Multiple select)

**Resources Table**
- Title (Single line text)
- Description (Long text)
- ResourceType (Single select)
- Link (URL)
- Tags (Multiple select)
- ContributorId (Single line text) - Links to Supabase user

### 3. Environment Variables

Add these variables to your `.env` file:

```
# Existing Supabase variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# New Airtable variables
VITE_AIRTABLE_API_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID=your_airtable_base_id
```

### 4. Install Airtable SDK

```bash
npm install airtable
```

## Data Synchronization Strategy

### User Registration Flow
1. User registers through Supabase Auth
2. On successful registration, create a corresponding record in Airtable CommunityMembers table
3. Store the Supabase User ID in the Airtable record for reference

### Content Management Flow
1. Community content, events, and resources are managed in Airtable
2. The application fetches this data using the Airtable API
3. User-specific actions (like following members) are tracked in Supabase

## Benefits of This Approach

1. **Leverage Existing Auth**: Keep using Supabase's robust authentication system
2. **Familiar Content Management**: Use Airtable's friendly interface for content management
3. **Best of Both Worlds**: Relational data in Supabase, content in Airtable
4. **Gradual Migration**: Move components to Airtable one at a time without disrupting the application

## Implementation Notes

- The `src/integrations/airtable` directory contains all Airtable-related code
- Components like `CommunityShowcase` have been updated to use Airtable data
- User authentication still uses Supabase

## Future Considerations

As the application grows, you may want to:
1. Set up webhooks between Supabase and Airtable for real-time synchronization
2. Use Zapier or n8n for more complex integrations between the platforms
3. Evaluate which platform works better for specific features and adjust accordingly