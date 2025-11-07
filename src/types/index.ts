import type { StaticImageData } from "next/image";

export type Project = {
  id: string;
  church_id: string;
  project_name: string;
  short_description: string;
  main_photo_url: string;
  video_url: string;
  language: string;
  country: string;
  submitted_at: string;
  approved_at: string;
  additional_photo: string;
  church_email: string;
  church_website: string;
  donation_link: string;
  status: string;
  is_spotlight: boolean;
};

export interface Mission {
  mainImage: StaticImageData;
  extraImages?: StaticImageData[];
  churchName: string;
  projectTitle: string;
  country: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  videoUrl?: string;
  contactEmail?: string;
  website?: string;
  donationLink?: string;
}
