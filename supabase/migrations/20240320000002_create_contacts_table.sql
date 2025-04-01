-- Create user_type enum safely
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type' AND typnamespace = 'public'::regnamespace) THEN
        CREATE TYPE public.user_type AS ENUM ('black_queer_man', 'organizer', 'ally', 'organization');
    END IF;
END $$;

-- Create contacts table
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null unique,
  role text not null,
  organisation text,
  status text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create trigger to update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_contacts_updated_at
  before update on public.contacts
  for each row
  execute function public.update_updated_at_column(); 