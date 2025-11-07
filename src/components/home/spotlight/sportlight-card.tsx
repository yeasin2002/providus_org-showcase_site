import { Mail, MapPin } from "lucide-react";

interface SpotlightProject {
  id: string;
  name: string;
  contact_person: string;
  contact_email: string;
  country: string;
  language: string;
  website: string | null;
  created_at: Date;
}

interface SpotLightCardProps {
  item: SpotlightProject;
}

export function SpotLightCard({ item }: SpotLightCardProps) {
  return (
    <article
      id={item.id}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 font-work-sans"
    >
      {/* Content */}
      <div className="p-6">
        {/* Language Badge */}
        {/* <div className="mb-3">
          <Button className="text-white bg-gold hover:bg-gold/90 h-7 text-xs px-3 pointer-events-none">
            {item.language.toUpperCase()}
          </Button>
        </div> */}

        {/* Church Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

        {/* Country */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{item.country.toUpperCase()}</span>
        </div>

        {/* Contact Person */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Contact:</span> {item.contact_person}
          </p>
        </div>

        {/* Action Links */}
        <div className="space-y-2">
          {/* Email */}
          <a
            href={`mailto:${item.contact_email}`}
            className="flex items-center gap-2 text-sm text-gold hover:underline"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>

          {/* Website */}
          {item.website && (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gold hover:underline font-semibold"
            >
              Visit Website →
            </a>
          )}
        </div>

        {/* Joined Date */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Member since{" "}
            {new Date(item.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        </div>
      </div>
    </article>
  );
}
