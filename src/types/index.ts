export interface Project {
  id: string;
  name: string;
  description: string;
  demoUrl?: string;
  imagePath: string;
}

export interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  what: string;
  who: string;
  imagePath: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  investment: string;
}
