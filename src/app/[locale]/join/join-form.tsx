"use client";

import startSharpIcon from "@/assets/star-sharp.svg";
import { CTAButton } from "@/components/shared/buttons";
import { FormInput } from "@/components/shared/form-input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const workSteps = [
  "It doesn't take much to open new doors for your church. By joining the Alliance, your ministry becomes visible to people worldwide who are ready to support. ",
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
  website: z.string().optional(), // Honeypot field
  mathAnswer: z.string().min(1, "Please answer the security question"),
});

type JoinFormData = z.infer<typeof joinSchema>;

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const MIN_SUBMIT_TIME = 3000; // 5 seconds minimum

// Generate simple math question
const generateMathQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { question: `${num1} + ${num2}`, answer: num1 + num2 };
};

export const JoinFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  const [formLoadTime] = useState<number>(Date.now());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [timeWarning, setTimeWarning] = useState("");
  const [mathQuestion] = useState(generateMathQuestion());
  const [interactionCount, setInteractionCount] = useState(0);

  // Watch honeypot field
  const websiteValue = watch("website");
  const mathAnswer = watch("mathAnswer");

  // Track user interactions (real users interact with form)
  useEffect(() => {
    const handleInteraction = () => {
      setInteractionCount((prev) => prev + 1);
    };

    // Track clicks, typing, mouse movement
    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("mousemove", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("mousemove", handleInteraction);
    };
  }, []);

  const onSubmit = async (data: JoinFormData) => {
    setSubmitAttempted(true);
    setTimeWarning("");

    // 1. Honeypot check
    if (data.website) {
      console.warn("Spam detected: honeypot field filled");
      return; // Silently reject
    }

    // 2. Time check
    const timeElapsed = Date.now() - formLoadTime;
    if (timeElapsed < MIN_SUBMIT_TIME) {
      setTimeWarning(
        "Please take a moment to review your information before submitting."
      );
      setSubmitAttempted(false);
      return;
    }

    // 3. Math verification
    const userAnswer = parseInt(data.mathAnswer || "0", 10);
    if (userAnswer !== mathQuestion.answer) {
      setTimeWarning(
        "Incorrect answer to the security question. Please try again."
      );
      setSubmitAttempted(false);
      return;
    }

    // 4. Interaction check (bots don't interact naturally)
    if (interactionCount < 5) {
      console.warn("Insufficient interaction detected");
      setTimeWarning("Please review the form before submitting.");
      setSubmitAttempted(false);
      return;
    }

    // 5. Remove honeypot field before sending
    const { website, mathAnswer: _, ...submitData } = data;

    try {
      // Your API submission logic here
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submitData,
          formLoadTime,
          submitTime: Date.now(),
          interactionCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Handle success (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error("Submission error:", error);
      setTimeWarning("An error occurred. Please try again.");
      setSubmitAttempted(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-montserrat">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl  font-bold">PROCESS</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6" id="join-here">
          How It Works
        </h2>
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
        className="border border-gold rounded-2xl p-8 md:p-12 bg-card shadow-sm font-montserrat"
      >
        <div
          style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            {...register("website")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="Church Name"
            required
            registration={register("churchName")}
            error={errors.churchName}
          />
          <FormInput
            label="Your Name"
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
          <label className="block text-gray-700 font-medium mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            {...register("country", { required: "Country is required" })}
            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold ${
              errors.country ? "border-red-500" : ""
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select your country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Simple Math CAPTCHA - Frontend Only */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Security Question <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3 text-lg font-semibold">
              {mathQuestion.question} = ?
            </div>
            <input
              type="text"
              {...register("mathAnswer")}
              placeholder="Your answer"
              className={`w-32 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold ${
                errors.mathAnswer ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.mathAnswer && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mathAnswer.message}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Please solve this simple math problem to verify you're human
          </p>
        </div>

        {/* Time warning message */}
        {timeWarning && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800 text-sm text-center">{timeWarning}</p>
          </div>
        )}

        <div className="flex justify-center">
          <CTAButton type="submit" disabled={isSubmitting || submitAttempted}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : submitAttempted ? (
              "Submitted"
            ) : (
              "Join the Alliance for Free"
            )}
          </CTAButton>
        </div>
      </form>
    </section>
  );
};
