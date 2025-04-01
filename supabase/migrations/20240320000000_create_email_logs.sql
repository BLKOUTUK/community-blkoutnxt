-- Create email_logs table
create table if not exists public.email_logs (
  id uuid default uuid_generate_v4() primary key,
  airtable_record_id text,
  email_type text not null,
  sent_at timestamp with time zone not null,
  status text not null,
  user_type text not null,
  created_at timestamp with time zone default now()
);

-- Add RLS policies
alter table public.email_logs enable row level security;

-- Allow service role to insert logs
create policy "Service role can insert email logs"
  on public.email_logs
  for insert
  to service_role
  with check (true);

-- Allow service role to read logs
create policy "Service role can read email logs"
  on public.email_logs
  for select
  to service_role
  using (true);

-- Create index for faster queries
create index if not exists idx_email_logs_airtable_record_id
  on public.email_logs(airtable_record_id);

create index if not exists idx_email_logs_user_type
  on public.email_logs(user_type);

create index if not exists idx_email_logs_sent_at
  on public.email_logs(sent_at); 