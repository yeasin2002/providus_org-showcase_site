"use client";

import startSharpIcon from "@/assets/star-sharp.svg";
import { CTAButton } from "@/components/shared/buttons";
import { FormInput } from "@/components/shared/form-input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const workSteps = [
  "A few minutes today can give your church global visibility and directsupport.",
  "It doesn’t take much to open new doors for your church. By joining the Alliance, your ministry becomes visible to people worldwide who are ready to support. ",
  "Your story and photos are displayed so that donors and partners can contact you directly — no middleman, no complicated process. ",
  "A few minutes here can mean lasting recognition for your church and real opportunities for your mission. Do it for your cause. Do it for your church.",
];

const joinSchema = z.object({
  churchName: z.string().min(2, "Church name must be at least 2 characters"),
  primaryContact: z
    .string()
    .min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(2, "Please enter your country/region"),
});

type JoinFormData = z.infer<typeof joinSchema>;

export const HowItWorksSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  const onSubmit = async (data: JoinFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement API call to submit data
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-montserrat">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl  font-bold">PROCESS</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
        {workSteps.map((item) => {
          return (
            <p
              className="text-lg text-muted-foreground  mx-auto mb-4 max-w-5xl"
              key={item}
            >
              {item}
            </p>
          );
        })}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#C79C44] rounded-2xl p-8 md:p-12 bg-card shadow-sm font-montserrat"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="Church Name"
            required
            registration={register("churchName")}
            error={errors.churchName}
          />
          <FormInput
            label="Primary Contact"
            required
            registration={register("primaryContact")}
            error={errors.primaryContact}
          />
        </div>

        <div className="mb-6">
          <FormInput
            label="E-Mail"
            required
            type="email"
            registration={register("email")}
            error={errors.email}
          />
        </div>

        <div className="mb-8">
          <FormInput
            label="Country/Region"
            required
            registration={register("country")}
            error={errors.country}
          />
        </div>

        <div className="flex justify-center">
          <CTAButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join the Alliance for Free"}
          </CTAButton>
        </div>
      </form>
    </section>
  );
};
