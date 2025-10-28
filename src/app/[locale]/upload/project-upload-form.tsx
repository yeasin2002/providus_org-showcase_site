"use client";

import startSharpIcon from "@/assets/star-sharp.svg";
import { CTAButton } from "@/components/shared/buttons";
import { FormFileUpload } from "@/components/shared/form-file-upload";
import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { FormTextarea } from "@/components/shared/form-textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Video } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project/Church name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photo: z.any().refine((files) => files && files.length > 0, {
    message: "Photo is required",
  }),
  video: z.any().optional(),
  country: z.string().min(1, "Please select your country/region"),
  contactEmail: z.string().email("Please enter a valid email address"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  donationLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  additionalPhotos: z.string(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const countries = [
  { value: "af", label: "Afghanistan" },
  { value: "al", label: "Albania" },
  { value: "dz", label: "Algeria" },
  { value: "as", label: "American Samoa" },
  { value: "ad", label: "Andorra" },
  { value: "ao", label: "Angola" },
  { value: "ai", label: "Anguilla" },
  { value: "aq", label: "Antarctica" },
  { value: "ag", label: "Antigua and Barbuda" },
  { value: "ar", label: "Argentina" },
  { value: "am", label: "Armenia" },
  { value: "aw", label: "Aruba" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "az", label: "Azerbaijan" },
  { value: "bs", label: "Bahamas" },
  { value: "bh", label: "Bahrain" },
  { value: "bd", label: "Bangladesh" },
  { value: "bb", label: "Barbados" },
  { value: "by", label: "Belarus" },
  { value: "be", label: "Belgium" },
  { value: "bz", label: "Belize" },
  { value: "bj", label: "Benin" },
  { value: "bm", label: "Bermuda" },
  { value: "bt", label: "Bhutan" },
  { value: "bo", label: "Bolivia" },
  { value: "ba", label: "Bosnia and Herzegovina" },
  { value: "bw", label: "Botswana" },
  { value: "br", label: "Brazil" },
  { value: "io", label: "British Indian Ocean Territory" },
  { value: "vg", label: "British Virgin Islands" },
  { value: "bn", label: "Brunei" },
  { value: "bg", label: "Bulgaria" },
  { value: "bf", label: "Burkina Faso" },
  { value: "bi", label: "Burundi" },
  { value: "kh", label: "Cambodia" },
  { value: "cm", label: "Cameroon" },
  { value: "ca", label: "Canada" },
  { value: "cv", label: "Cape Verde" },
  { value: "ky", label: "Cayman Islands" },
  { value: "cf", label: "Central African Republic" },
  { value: "td", label: "Chad" },
  { value: "cl", label: "Chile" },
  { value: "cn", label: "China" },
  { value: "cx", label: "Christmas Island" },
  { value: "cc", label: "Cocos (Keeling) Islands" },
  { value: "co", label: "Colombia" },
  { value: "km", label: "Comoros" },
  { value: "cg", label: "Congo" },
  { value: "cd", label: "Congo (Dem. Rep.)" },
  { value: "ck", label: "Cook Islands" },
  { value: "cr", label: "Costa Rica" },
  { value: "hr", label: "Croatia" },
  { value: "cu", label: "Cuba" },
  { value: "cw", label: "Curaçao" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "dj", label: "Djibouti" },
  { value: "dm", label: "Dominica" },
  { value: "do", label: "Dominican Republic" },
  { value: "tl", label: "East Timor" },
  { value: "ec", label: "Ecuador" },
  { value: "eg", label: "Egypt" },
  { value: "sv", label: "El Salvador" },
  { value: "gq", label: "Equatorial Guinea" },
  { value: "er", label: "Eritrea" },
  { value: "ee", label: "Estonia" },
  { value: "sz", label: "Eswatini" },
  { value: "et", label: "Ethiopia" },
  { value: "fk", label: "Falkland Islands" },
  { value: "fo", label: "Faroe Islands" },
  { value: "fj", label: "Fiji" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "gf", label: "French Guiana" },
  { value: "pf", label: "French Polynesia" },
  { value: "ga", label: "Gabon" },
  { value: "gm", label: "Gambia" },
  { value: "ge", label: "Georgia" },
  { value: "de", label: "Germany" },
  { value: "gh", label: "Ghana" },
  { value: "gi", label: "Gibraltar" },
  { value: "gr", label: "Greece" },
  { value: "gl", label: "Greenland" },
  { value: "gd", label: "Grenada" },
  { value: "gp", label: "Guadeloupe" },
  { value: "gu", label: "Guam" },
  { value: "gt", label: "Guatemala" },
  { value: "gg", label: "Guernsey" },
  { value: "gn", label: "Guinea" },
  { value: "gw", label: "Guinea-Bissau" },
  { value: "gy", label: "Guyana" },
  { value: "ht", label: "Haiti" },
  { value: "hn", label: "Honduras" },
  { value: "hk", label: "Hong Kong" },
  { value: "hu", label: "Hungary" },
  { value: "is", label: "Iceland" },
  { value: "in", label: "India" },
  { value: "id", label: "Indonesia" },
  { value: "ir", label: "Iran" },
  { value: "iq", label: "Iraq" },
  { value: "ie", label: "Ireland" },
  { value: "im", label: "Isle of Man" },
  { value: "il", label: "Israel" },
  { value: "it", label: "Italy" },
  { value: "ci", label: "Ivory Coast" },
  { value: "jm", label: "Jamaica" },
  { value: "jp", label: "Japan" },
  { value: "je", label: "Jersey" },
  { value: "jo", label: "Jordan" },
  { value: "kz", label: "Kazakhstan" },
  { value: "ke", label: "Kenya" },
  { value: "ki", label: "Kiribati" },
  { value: "xk", label: "Kosovo" },
  { value: "kw", label: "Kuwait" },
  { value: "kg", label: "Kyrgyzstan" },
  { value: "la", label: "Laos" },
  { value: "lv", label: "Latvia" },
  { value: "lb", label: "Lebanon" },
  { value: "ls", label: "Lesotho" },
  { value: "lr", label: "Liberia" },
  { value: "ly", label: "Libya" },
  { value: "li", label: "Liechtenstein" },
  { value: "lt", label: "Lithuania" },
  { value: "lu", label: "Luxembourg" },
  { value: "mo", label: "Macao" },
  { value: "mg", label: "Madagascar" },
  { value: "mw", label: "Malawi" },
  { value: "my", label: "Malaysia" },
  { value: "mv", label: "Maldives" },
  { value: "ml", label: "Mali" },
  { value: "mt", label: "Malta" },
  { value: "mh", label: "Marshall Islands" },
  { value: "mq", label: "Martinique" },
  { value: "mr", label: "Mauritania" },
  { value: "mu", label: "Mauritius" },
  { value: "yt", label: "Mayotte" },
  { value: "mx", label: "Mexico" },
  { value: "fm", label: "Micronesia" },
  { value: "md", label: "Moldova" },
  { value: "mc", label: "Monaco" },
  { value: "mn", label: "Mongolia" },
  { value: "me", label: "Montenegro" },
  { value: "ms", label: "Montserrat" },
  { value: "ma", label: "Morocco" },
  { value: "mz", label: "Mozambique" },
  { value: "mm", label: "Myanmar" },
  { value: "na", label: "Namibia" },
  { value: "nr", label: "Nauru" },
  { value: "np", label: "Nepal" },
  { value: "nl", label: "Netherlands" },
  { value: "nc", label: "New Caledonia" },
  { value: "nz", label: "New Zealand" },
  { value: "ni", label: "Nicaragua" },
  { value: "ne", label: "Niger" },
  { value: "ng", label: "Nigeria" },
  { value: "nu", label: "Niue" },
  { value: "nf", label: "Norfolk Island" },
  { value: "kp", label: "North Korea" },
  { value: "mk", label: "North Macedonia" },
  { value: "mp", label: "Northern Mariana Islands" },
  { value: "no", label: "Norway" },
  { value: "om", label: "Oman" },
  { value: "pk", label: "Pakistan" },
  { value: "pw", label: "Palau" },
  { value: "ps", label: "Palestine" },
  { value: "pa", label: "Panama" },
  { value: "pg", label: "Papua New Guinea" },
  { value: "py", label: "Paraguay" },
  { value: "pe", label: "Peru" },
  { value: "ph", label: "Philippines" },
  { value: "pn", label: "Pitcairn" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "pr", label: "Puerto Rico" },
  { value: "qa", label: "Qatar" },
  { value: "re", label: "Réunion" },
  { value: "ro", label: "Romania" },
  { value: "ru", label: "Russia" },
  { value: "rw", label: "Rwanda" },
  { value: "bl", label: "Saint Barthélemy" },
  { value: "sh", label: "Saint Helena" },
  { value: "kn", label: "Saint Kitts and Nevis" },
  { value: "lc", label: "Saint Lucia" },
  { value: "mf", label: "Saint Martin (French)" },
  { value: "pm", label: "Saint Pierre and Miquelon" },
  { value: "vc", label: "Saint Vincent and the Grenadines" },
  { value: "ws", label: "Samoa" },
  { value: "sm", label: "San Marino" },
  { value: "st", label: "São Tomé and Príncipe" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "sn", label: "Senegal" },
  { value: "rs", label: "Serbia" },
  { value: "sc", label: "Seychelles" },
  { value: "sl", label: "Sierra Leone" },
  { value: "sg", label: "Singapore" },
  { value: "sx", label: "Sint Maarten" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "sb", label: "Solomon Islands" },
  { value: "so", label: "Somalia" },
  { value: "za", label: "South Africa" },
  { value: "gs", label: "South Georgia" },
  { value: "kr", label: "South Korea" },
  { value: "ss", label: "South Sudan" },
  { value: "es", label: "Spain" },
  { value: "lk", label: "Sri Lanka" },
  { value: "sd", label: "Sudan" },
  { value: "sr", label: "Suriname" },
  { value: "sj", label: "Svalbard and Jan Mayen" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "sy", label: "Syria" },
  { value: "tw", label: "Taiwan" },
  { value: "tj", label: "Tajikistan" },
  { value: "tz", label: "Tanzania" },
  { value: "th", label: "Thailand" },
  { value: "tg", label: "Togo" },
  { value: "tk", label: "Tokelau" },
  { value: "to", label: "Tonga" },
  { value: "tt", label: "Trinidad and Tobago" },
  { value: "tn", label: "Tunisia" },
  { value: "tr", label: "Turkey" },
  { value: "tm", label: "Turkmenistan" },
  { value: "tc", label: "Turks and Caicos Islands" },
  { value: "tv", label: "Tuvalu" },
  { value: "vi", label: "U.S. Virgin Islands" },
  { value: "ug", label: "Uganda" },
  { value: "ua", label: "Ukraine" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "uy", label: "Uruguay" },
  { value: "uz", label: "Uzbekistan" },
  { value: "vu", label: "Vanuatu" },
  { value: "va", label: "Vatican City" },
  { value: "ve", label: "Venezuela" },
  { value: "vn", label: "Vietnam" },
  { value: "wf", label: "Wallis and Futuna" },
  { value: "eh", label: "Western Sahara" },
  { value: "ye", label: "Yemen" },
  { value: "zm", label: "Zambia" },
  { value: "zw", label: "Zimbabwe" },
];

export const ProjectUploadForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement API call to submit data to Supabase
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-rubik" id="join-here">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl font-bold">Share Your Story</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Take a few minutes to share your ministry’s work with the world.
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Here you can upload your project details, photo, and optional video so
          your church becomes visible to donors and partners who want to help
          directly.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gold rounded-2xl p-8 md:p-12 bg-card shadow-sm font-montserrat"
      >
        {/* 1. Project/Church Name */}
        <div className="mb-6">
          <FormInput
            label="1. Your mission/project name"
            required
            registration={register("projectName")}
            error={errors.projectName}
          />
        </div>

        {/* 2. Short Description */}
        <div className="mb-6">
          <FormTextarea
            label="2. Short Description of Your Project:"
            required
            registration={register("description")}
            error={errors.description as any}
            rows={6}
          />
        </div>

        {/* 3 & 4. Upload Photo and Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Main Photo */}
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="3. Upload one main photo that will appear on your public card"
                required
                accept="image/jpeg,image/png,image/webp"
                maxSize={5 * 1024 * 1024}
                icon={<Upload className="w-6 h-6 text-[#C4A053]" />}
                helperText="JPG/PNG Max 5MB — Choose a photo that shows your project activity or church community."
                error={errors.photo as any}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />

          {/* Video */}
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="4. Upload a Video"
                accept="video/mp4,video/webm"
                maxSize={50 * 1024 * 1024}
                icon={<Video className="w-6 h-6 text-[#C4A053]" />}
                helperText="MP4, Max 50MB — A short introduction or news if you have one."
                error={errors.video as any}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />

          {/* ✅ Additional Photos (optional) */}
          <Controller
            name="additionalPhotos"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="5. Additional Photos (optional)"
                accept="image/jpeg,image/png,image/webp"
                maxSize={5 * 1024 * 1024}
                icon={<Upload className="w-6 h-6 text-[#C4A053]" />}
                helperText="JPG/PNG/WebP Max 5MB each — You may upload extra photos to show your mission or community."
                error={errors.additionalPhotos as any}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />
        </div>

        {/* 5. Country / Region */}
        <div className="mb-6">
          <FormSelect
            label="5. Country"
            required
            registration={register("country")}
            error={errors.country}
            options={countries}
          />
        </div>

        {/* 6. Contact Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            6. Contact Information (Displayed Publicly)
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Please share how people can contact and support your church.
          </p>

          <div className="space-y-4">
            <FormInput
              label="Church Email Address"
              subLabel="(For donors or partners to contact you directly.)"
              required
              type="email"
              registration={register("contactEmail")}
              error={errors.contactEmail}
            />

            <FormInput
              label="Church Website or Social Media Link"
              subLabel="(Your main online page – e.g., website, Facebook, or Instagram.)"
              type="url"
              registration={register("website")}
              error={errors.website}
            />

            <FormInput
              label="Donation Link (optional)"
              subLabel="(If you accept online donations, add the direct link here – e.g., PayPal, bank page, or fundraising site.)"
              type="url"
              registration={register("donationLink")}
              error={errors.donationLink}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-4">
          <CTAButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish My Story"}
          </CTAButton>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            This Is Just The Beginning. You Can Add More Projects Anytime To
            Help Them Be Discovered By Donors And Supporters
          </p>
        </div>
      </form>
    </section>
  );
};
