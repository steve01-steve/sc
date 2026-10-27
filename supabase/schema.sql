create extension if not exists pgcrypto;

create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'สมาชิก' check(char_length(display_name) between 1 and 60),
 role text not null default 'member' check(role in ('member','admin')),
 created_at timestamptz not null default now()
);
create table if not exists public.policies(
 id uuid primary key default gen_random_uuid(),
 title text not null check(char_length(title) between 1 and 180),
 category text not null check(category in ('เศรษฐกิจ','การศึกษา','สาธารณสุข','สิ่งแวดล้อม','รัฐและสังคม','คุณภาพชีวิต')),
 summary text not null check(char_length(summary) between 1 and 500),
 details text not null default '',
 status text not null default 'published' check(status in ('draft','published','archived')),
 created_by uuid references public.profiles(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.comments(
 id uuid primary key default gen_random_uuid(),
 policy_id uuid not null references public.policies(id) on delete cascade,
 user_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check(char_length(body) between 1 and 2000),
 status text not null default 'pending' check(status in ('pending','approved','hidden')),
 created_at timestamptz not null default now(),
 moderated_by uuid references public.profiles(id) on delete set null,
 moderated_at timestamptz
);
create index if not exists policies_status_category_idx on public.policies(status,category);
create index if not exists comments_policy_status_idx on public.comments(policy_id,status,created_at desc);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public
as $$ begin
 insert into public.profiles(id,display_name)
 values(new.id,coalesce(nullif(left(new.raw_user_meta_data->>'display_name',60),''),'สมาชิก'))
 on conflict(id) do nothing;
 return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- สมาชิกแก้ได้เฉพาะชื่อผ่าน RPC นี้ ไม่สามารถเปลี่ยน role จากหน้าเว็บ
create or replace function public.update_my_display_name(new_display_name text)
returns void language plpgsql security definer set search_path=public
as $$ begin
 if auth.uid() is null then raise exception 'Please sign in'; end if;
 if new_display_name is null or char_length(trim(new_display_name)) < 1 or char_length(trim(new_display_name)) > 60 then
   raise exception 'Display name must be 1-60 characters';
 end if;
 update public.profiles set display_name=trim(new_display_name) where id=auth.uid();
end; $$;

alter table public.profiles enable row level security;
alter table public.policies enable row level security;
alter table public.comments enable row level security;
drop policy if exists "Profiles readable by signed-in users" on public.profiles;
create policy "Profiles readable by signed-in users" on public.profiles for select to authenticated using(true);
drop policy if exists "Admins update profiles" on public.profiles;
create policy "Admins update profiles" on public.profiles for update to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists "Published policies public" on public.policies;
create policy "Published policies public" on public.policies for select to anon,authenticated using(status='published' or public.is_admin());
drop policy if exists "Admins manage policies" on public.policies;
create policy "Admins manage policies" on public.policies for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists "Approved comments public" on public.comments;
create policy "Approved comments public" on public.comments for select to anon,authenticated using(status='approved' or user_id=auth.uid() or public.is_admin());
drop policy if exists "Members submit pending comments" on public.comments;
create policy "Members submit pending comments" on public.comments for insert to authenticated with check(auth.uid()=user_id and status='pending');
drop policy if exists "Admins moderate comments" on public.comments;
create policy "Admins moderate comments" on public.comments for update to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists "Admins delete comments" on public.comments;
create policy "Admins delete comments" on public.comments for delete to authenticated using(public.is_admin());

grant usage on schema public to anon,authenticated;
grant select on public.policies to anon,authenticated;
grant select on public.comments to anon,authenticated;
grant insert,update,delete on public.policies to authenticated;
grant insert,update,delete on public.comments to authenticated;
grant select on public.profiles to authenticated;
revoke update on public.profiles from authenticated;
grant execute on function public.is_admin() to anon,authenticated;
grant execute on function public.update_my_display_name(text) to authenticated;

-- หลังสมัครบัญชีผ่านเว็บไซต์ ให้แทนอีเมลด้านล่างด้วยอีเมลของคุณ แล้วรันคำสั่งนี้ใน SQL Editor:
-- update public.profiles p set role='admin' from auth.users u where p.id=u.id and u.email='YOUR_EMAIL_HERE';
