import type { ContentSection } from "./types";

export const CAREER_VALUE_ICONS = ["Sparkles", "Users", "BookOpen"] as const;
export const CAREER_BENEFIT_ICONS = [
  "HeartPulse",
  "PiggyBank",
  "Plane",
  "Wifi",
  "BookOpen",
  "Sparkles",
] as const;

export type Role = {
  title: string;
  team: string;
  location: string;
  level: string;
  type: string;
};

export const ROLES: Role[] = [
  { title: "Senior Firmware Engineer", team: "Engineering", location: "San Francisco, CA · Hybrid", level: "Senior", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
  { title: "Performance Marketing Manager", team: "Growth", location: "Remote (US)", level: "Senior", type: "Full-time" },
  { title: "Customer Success Lead", team: "Operations", location: "Austin, TX · Hybrid", level: "Lead", type: "Full-time" },
  { title: "Image Sensor Engineer", team: "Hardware", location: "San Jose, CA · On-site", level: "Senior", type: "Full-time" },
  { title: "Mobile Engineer (iOS / Android)", team: "Engineering", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
  { title: "Mechanical Engineer (Optical Housings)", team: "Hardware", location: "Shenzhen, CN · On-site", level: "Senior", type: "Full-time" },
  { title: "Content & Brand Storyteller", team: "Marketing", location: "Remote (US)", level: "Mid", type: "Full-time" },
];

export type CareerValue = { iconName: string; title: string; body: string };

export const VALUES: CareerValue[] = [
  {
    iconName: "Sparkles",
    title: "Quiet engineering",
    body:
      "We obsess over the details users don't see. The team writes for clarity, ships small, and tests the corner cases first.",
  },
  {
    iconName: "Users",
    title: "Honest collaboration",
    body:
      "We critique work, not people. We disagree in the open, commit fully once a decision is made, and don't relitigate over Slack.",
  },
  {
    iconName: "BookOpen",
    title: "Bias toward writing",
    body:
      "Important decisions get a short doc. We default to async. Meetings exist when written communication has genuinely failed.",
  },
];

export type CareerBenefit = { iconName: string; title: string; body: string };

export const BENEFITS: CareerBenefit[] = [
  { iconName: "HeartPulse", title: "Comprehensive health", body: "100% of medical, dental, vision premiums covered for you; 75% for dependents." },
  { iconName: "PiggyBank",  title: "401(k) with 4% match", body: "Vest immediately. We also contribute 2% regardless of your contribution." },
  { iconName: "Plane",      title: "Unlimited PTO (with a floor)", body: "Take what you need — minimum 18 days/year enforced by the team lead." },
  { iconName: "Wifi",       title: "Remote-first stipend", body: "$2,000 home office setup, $80/mo internet, co-working credits." },
  { iconName: "BookOpen",   title: "Learning budget", body: "$2,500/year for books, courses, and conferences. No approvals — book it." },
  { iconName: "Sparkles",   title: "Sabbatical at 4 years", body: "4 paid weeks off after every 4 years of service. Don't open Slack." },
];

export type CareerProcess = { n: number; title: string; body: string };

export const PROCESS: CareerProcess[] = [
  { n: 1, title: "Apply", body: "We read every application. Most get a response within 5 business days." },
  { n: 2, title: "30-min intro", body: "A casual call with the hiring manager to learn about you and the role." },
  { n: 3, title: "Take-home or live exercise", body: "We respect your time — exercises are scoped to 2–3 hours and are paid for senior roles." },
  { n: 4, title: "Team conversations", body: "Two or three 45-minute conversations with future teammates and cross-functional partners." },
  { n: 5, title: "Decision within a week", body: "We don't ghost. You'll get a yes, a no, or a clear timeline." },
];

export type CareersContent = {
  roles: Role[];
  values: CareerValue[];
  benefits: CareerBenefit[];
  process: CareerProcess[];
};

export const CAREERS_PAGE: ContentSection<CareersContent> = {
  key: "careers.page",
  label: "Careers 页 · Roles / Values / Benefits / Process",
  description:
    "招聘页:开放岗位列表、文化价值观、福利、面试流程。" +
    `Values iconName: ${CAREER_VALUE_ICONS.join(", ")} · ` +
    `Benefits iconName: ${CAREER_BENEFIT_ICONS.join(", ")}`,
  page: "careers",
  previewHref: "/careers",
  defaults: { roles: ROLES, values: VALUES, benefits: BENEFITS, process: PROCESS },
};
