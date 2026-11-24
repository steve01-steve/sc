-- Surawittayakarn Student Council — Supabase schema
-- Run this script once in Supabase Dashboard → SQL Editor.
-- Browser clients use only the anon/publishable key; row-level security protects all data.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  role text not null default 'editor' check (role in ('super_admin','admin','editor')),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.council_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  full_name_en text,
  role_title text,
  role_title_en text,
  class_name text,
  photo_url text,
  bio text,
  bio_en text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.committees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_en text,
  description text,
  description_en text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  category text,
  category_en text,
  summary text,
  summary_en text,
  body text,
  body_en text,
  status text,
  status_en text,
  image_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  excerpt text,
  excerpt_en text,
  body text,
  body_en text,
  image_url text,
  published_at timestamptz default now(),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  image_url text not null,
  alt_text text,
  alt_text_en text,
  album text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  topic text not null check (topic in ('suggestion','question','project')),
  message text not null,
  status text not null default 'new' check (status in ('new','reviewed','closed')),
  created_at timestamptz not null default now()
);

create index if not exists council_members_published_sort_idx on public.council_members (is_published, sort_order);
create index if not exists committees_published_sort_idx on public.committees (is_published, sort_order);
create index if not exists projects_published_sort_idx on public.projects (is_published, sort_order);
create index if not exists news_published_date_idx on public.news (is_published, published_at desc);
create index if not exists gallery_published_sort_idx on public.gallery (is_published, sort_order);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists council_members_set_updated_at on public.council_members;
create trigger council_members_set_updated_at before update on public.council_members for each row execute function public.set_updated_at();
drop trigger if exists committees_set_updated_at on public.committees;
create trigger committees_set_updated_at before update on public.committees for each row execute function public.set_updated_at();
drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at before update on public.news for each row execute function public.set_updated_at();
drop trigger if exists gallery_set_updated_at on public.gallery;
create trigger gallery_set_updated_at before update on public.gallery for each row execute function public.set_updated_at();

create or replace function public.has_active_role(allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_active and p.role = any (allowed_roles)
  );
$$;

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, display_name, email, role, is_active)
  values (new.id, nullif(new.raw_user_meta_data ->> 'full_name',''), new.email, 'editor', false)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup after insert on auth.users for each row execute function public.create_profile_for_auth_user();

create or replace function public.set_user_role(target_profile_id uuid, target_role text, target_active boolean)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_id uuid := auth.uid();
  remaining_super_admins integer;
begin
  if caller_id is null or not public.has_active_role(array['super_admin']) then
    raise exception 'Only an active Super Admin can manage account access.' using errcode = '42501';
  end if;
  if target_role not in ('super_admin','admin','editor') then
    raise exception 'Invalid role.' using errcode = '22023';
  end if;
  if target_profile_id = caller_id and (target_role <> 'super_admin' or not target_active) then
    raise exception 'A Super Admin cannot disable or demote their own active account.' using errcode = '42501';
  end if;
  if exists (
    select 1 from public.profiles
    where id = target_profile_id and role = 'super_admin' and is_active
  ) and (target_role <> 'super_admin' or not target_active) then
    select count(*) into remaining_super_admins from public.profiles
    where role = 'super_admin' and is_active and id <> target_profile_id;
    if remaining_super_admins = 0 then
      raise exception 'At least one active Super Admin must remain.' using errcode = '42501';
    end if;
  end if;
  update public.profiles set role = target_role, is_active = target_active where id = target_profile_id;
  if not found then raise exception 'Profile not found.' using errcode = 'P0002'; end if;
end;
$$;

-- Public images, with uploads limited to active council editors and administrators.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sc-media','sc-media',true,5242880,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists sc_media_public_read on storage.objects;
create policy sc_media_public_read on storage.objects for select to anon, authenticated using (bucket_id = 'sc-media');
drop policy if exists sc_media_staff_upload on storage.objects;
create policy sc_media_staff_upload on storage.objects for insert to authenticated with check (bucket_id = 'sc-media' and public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists sc_media_staff_update on storage.objects;
create policy sc_media_staff_update on storage.objects for update to authenticated using (bucket_id = 'sc-media' and public.has_active_role(array['super_admin','admin','editor'])) with check (bucket_id = 'sc-media' and public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists sc_media_admin_delete on storage.objects;
create policy sc_media_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'sc-media' and public.has_active_role(array['super_admin','admin']));

alter table public.profiles enable row level security;
alter table public.council_members enable row level security;
alter table public.committees enable row level security;
alter table public.projects enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists profiles_select_self_or_super on public.profiles;
create policy profiles_select_self_or_super on public.profiles for select to authenticated
using (id = auth.uid() or public.has_active_role(array['super_admin']));

-- Public visitors can read published content. Editors work on drafts only.
drop policy if exists council_members_public_read on public.council_members;
create policy council_members_public_read on public.council_members for select to anon, authenticated using (is_published or public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists council_members_insert_staff on public.council_members;
create policy council_members_insert_staff on public.council_members for insert to authenticated with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists council_members_update_staff on public.council_members;
create policy council_members_update_staff on public.council_members for update to authenticated using (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published)) with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists council_members_delete_admin on public.council_members;
create policy council_members_delete_admin on public.council_members for delete to authenticated using (public.has_active_role(array['super_admin','admin']));

drop policy if exists committees_public_read on public.committees;
create policy committees_public_read on public.committees for select to anon, authenticated using (is_published or public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists committees_insert_staff on public.committees;
create policy committees_insert_staff on public.committees for insert to authenticated with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists committees_update_staff on public.committees;
create policy committees_update_staff on public.committees for update to authenticated using (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published)) with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists committees_delete_admin on public.committees;
create policy committees_delete_admin on public.committees for delete to authenticated using (public.has_active_role(array['super_admin','admin']));

drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects for select to anon, authenticated using (is_published or public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists projects_insert_staff on public.projects;
create policy projects_insert_staff on public.projects for insert to authenticated with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists projects_update_staff on public.projects;
create policy projects_update_staff on public.projects for update to authenticated using (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published)) with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists projects_delete_admin on public.projects;
create policy projects_delete_admin on public.projects for delete to authenticated using (public.has_active_role(array['super_admin','admin']));

drop policy if exists news_public_read on public.news;
create policy news_public_read on public.news for select to anon, authenticated using (is_published or public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists news_insert_staff on public.news;
create policy news_insert_staff on public.news for insert to authenticated with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists news_update_staff on public.news;
create policy news_update_staff on public.news for update to authenticated using (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published)) with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists news_delete_admin on public.news;
create policy news_delete_admin on public.news for delete to authenticated using (public.has_active_role(array['super_admin','admin']));

drop policy if exists gallery_public_read on public.gallery;
create policy gallery_public_read on public.gallery for select to anon, authenticated using (is_published or public.has_active_role(array['super_admin','admin','editor']));
drop policy if exists gallery_insert_staff on public.gallery;
create policy gallery_insert_staff on public.gallery for insert to authenticated with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists gallery_update_staff on public.gallery;
create policy gallery_update_staff on public.gallery for update to authenticated using (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published)) with check (public.has_active_role(array['super_admin','admin']) or (public.has_active_role(array['editor']) and not is_published));
drop policy if exists gallery_delete_admin on public.gallery;
create policy gallery_delete_admin on public.gallery for delete to authenticated using (public.has_active_role(array['super_admin','admin']));

drop policy if exists contact_messages_public_insert on public.contact_messages;
create policy contact_messages_public_insert on public.contact_messages for insert to anon, authenticated
with check (
  length(trim(name)) between 1 and 100
  and (email is null or length(email) <= 254)
  and topic in ('suggestion','question','project')
  and length(trim(message)) between 1 and 3000
);
drop policy if exists contact_messages_staff_read on public.contact_messages;
create policy contact_messages_staff_read on public.contact_messages for select to authenticated using (public.has_active_role(array['super_admin','admin']));
drop policy if exists contact_messages_staff_update on public.contact_messages;
create policy contact_messages_staff_update on public.contact_messages for update to authenticated using (public.has_active_role(array['super_admin','admin'])) with check (public.has_active_role(array['super_admin','admin']));

revoke all on public.profiles, public.council_members, public.committees, public.projects, public.news, public.gallery, public.contact_messages from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.council_members, public.committees, public.projects, public.news, public.gallery to anon, authenticated;
grant select on public.profiles to authenticated;
grant insert, update, delete on public.council_members, public.committees, public.projects, public.news, public.gallery to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update on public.contact_messages to authenticated;
revoke all on function public.set_user_role(uuid,text,boolean) from public;
grant execute on function public.set_user_role(uuid,text,boolean) to authenticated;
revoke all on function public.has_active_role(text[]) from public;
grant execute on function public.has_active_role(text[]) to anon, authenticated;
revoke all on function public.create_profile_for_auth_user() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;

-- Bootstrap the first administrator after inviting their account in Supabase Auth:
-- update public.profiles set role = 'super_admin', is_active = true
-- where email = 'YOUR-ADMIN-EMAIL';
