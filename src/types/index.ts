export interface User {
  id: string;
  auth_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CVArchive {
  id: string;
  teacher_id: string;
  file_path: string;
  file_type?: string;
  uploaded_at: string;
}

export interface Education {
  id: string;
  teacher_id: string;
  degree: string;
  institution: string;
  start_date?: string;
  end_date?: string;
  additional_info?: string;
}

export interface Experience {
  id: string;
  teacher_id: string;
  position: string;
  institution: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface Certification {
  id: string;
  teacher_id: string;
  certification_name: string;
  issuing_institution?: string;
  issue_date?: string;
  expiration_date?: string;
}

export interface Skill {
  id: string;
  skill_name: string;
}

export type SkillLevel = 'Experto' | 'Profesional' | 'Usuario';

export interface TeacherSkill {
  teacher_id: string;
  skill_id: string;
  level: SkillLevel;
}

export interface Database {
  public: {
    Tables: {
      teachers: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      cv_archive: {
        Row: CVArchive;
        Insert: Omit<CVArchive, 'id' | 'uploaded_at'>;
        Update: Partial<Omit<CVArchive, 'id' | 'uploaded_at'>>;
      };
      education: {
        Row: Education;
        Insert: Omit<Education, 'id'>;
        Update: Partial<Omit<Education, 'id'>>;
      };
      experience: {
        Row: Experience;
        Insert: Omit<Experience, 'id'>;
        Update: Partial<Omit<Experience, 'id'>>;
      };
      certifications: {
        Row: Certification;
        Insert: Omit<Certification, 'id'>;
        Update: Partial<Omit<Certification, 'id'>>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, 'id'>;
        Update: Partial<Omit<Skill, 'id'>>;
      };
      teacher_skills: {
        Row: TeacherSkill;
        Insert: TeacherSkill;
        Update: Partial<TeacherSkill>;
      };
    };
    Functions: {
      search_teachers: {
        Args: {
          search_term: string | null;
          area_filter: string | null;
          academic_level_filter: string | null;
          experience_years_filter: string | null;
        };
        Returns: {
          teacher_id: string;
          full_name: string;
          email: string;
          skills: string[];
          certifications_count: number;
          experience_years: number;
        }[];
      };
    };
    Enums: {
      skill_level: SkillLevel;
    };
  };
}