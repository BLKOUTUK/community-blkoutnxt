-- Enable RLS on contacts table
alter table public.contacts enable row level security;

-- Allow service role to insert and update contacts
create policy "Service role can insert contacts"
  on public.contacts
  for insert
  to service_role
  with check (true);

create policy "Service role can update contacts"
  on public.contacts
  for update
  to service_role
  using (true)
  with check (true);

-- Allow service role to read contacts
create policy "Service role can read contacts"
  on public.contacts
  for select
  to service_role
  using (true);

-- Allow anon role to read contacts
create policy "Anon role can read contacts"
  on public.contacts
  for select
  to anon
  using (true);

-- Create indexes for faster queries
create index if not exists idx_contacts_email
  on public.contacts(email);

create index if not exists idx_contacts_role
  on public.contacts(role);

create index if not exists idx_contacts_created_at
  on public.contacts(created_at); 