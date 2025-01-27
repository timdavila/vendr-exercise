export type FormData = {
  name: string;
  email: string;
  role: string;
  companyName: string;
  companySize: string;
  features: Feature[]
};

export type Feature = {
  key: string;
  description: string;
  selected: boolean;
};

const progressMap = {
  personal: 0,
  company: 33,
  features: 66,
  complete: 100
}

export const progressForStep = (step: string): number => {
  return progressMap[step as keyof typeof progressMap] ?? 0;
}