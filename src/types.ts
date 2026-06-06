export interface ResumeHeader {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string; // HTML or markdown bullet points
}

export interface EducationSection {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  role: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: string; // e.g. "Native", "Fluent", "Conversational"
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeStyles {
  fontDisplay: string; // Clash Display, Cabinet Grotesk, Space Grotesk, Playfair Display, Inter
  fontBody: string; // Satoshi, General Sans, JetBrains Mono, Inter
  fontSizeScale: "compact" | "normal" | "spacious"; // Tailwind scale sizes
  spacingScale: "compact" | "normal" | "spacious" | "generous";
  accentColor: string; // neon mint #00FFB2, electric blue #0066FF, etc.
  borderRadius: "sharp" | "soft" | "round";
  headerStyle: "classic" | "modern" | "minimal" | "bold" | "creative";
  dividerStyle: "line" | "dots" | "none" | "gradient";
  showNumbering: boolean;
  iconStyle: "none" | "filled" | "outline";
}

export interface ResumeData {
  id: string;
  name: string;
  templateId: string;
  lastModified: string;
  atsScore: number;
  folderId?: string;
  tags: string[];
  isFavorite: boolean;
  header: ResumeHeader;
  experiences: WorkExperience[];
  educations: EducationSection[];
  skills: { category: string; list: string[] }[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  customSections: CustomSection[];
  styles: ResumeStyles;
}

export interface VersionSnapshot {
  id: string;
  resumeId: string;
  timestamp: string;
  versionName: string;
  atsScore: number;
  data: ResumeData;
}

export interface JobCard {
  id: string;
  company: string;
  logo: string;
  role: string;
  salary: string;
  date: string;
  status: "wishlist" | "applied" | "phonescreen" | "interview" | "offer" | "rejected";
  resumeVersionUsedId?: string;
  coverLetter?: string;
  notes: string;
}

export interface ATSAnalysisResult {
  matchScore: number;
  missingKeywords: string[];
  missingSkills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  experienceGaps: string;
  educationMatch: boolean;
  educationDetails: string;
  toneMatch: string;
}

export interface BulletSuggestion {
  id: string;
  text: string;
  keywordMatched: boolean;
}
