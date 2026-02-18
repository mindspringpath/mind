-- MindSpring Focus Coaching Database Schema
-- Updated to match current live Supabase database

-- Users table (auth.users reference)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table (for extended user information)
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (for role-based access control)
CREATE TABLE public.user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'client', 'coach')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);

-- Availability slots table (for scheduling)
CREATE TABLE public.availability_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  session_type TEXT DEFAULT 'Initial Consultation',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  session_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table (for contact forms)
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Program enrolments table
CREATE TABLE public.program_enrolments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_enrolments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own appointments
CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments" ON public.appointments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can manage all data
CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all availability slots" ON public.availability_slots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all contact messages" ON public.contact_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );

-- Public can insert contact messages
CREATE POLICY "Public can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own program enrolments
CREATE POLICY "Users can view own enrolments" ON public.program_enrolments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own enrolments" ON public.program_enrolments
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_date_time ON public.appointments(date, time);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_availability_slots_date ON public.availability_slots(slot_date);
CREATE INDEX idx_availability_slots_active ON public.availability_slots(is_active);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
