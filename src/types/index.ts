export type Church = {
  id: string;
  name: string;
  country: string;
  website: string | null;
  language: string;
  metadata: Record<string, unknown>;
  created_at: string;
  contact_email: string;
  contact_person: string;
};

export interface Project {
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
  churches: Church;
}
