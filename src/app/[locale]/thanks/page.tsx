import logo from "@/assets/logo-dark.svg";
import { CTAButton } from "@/components/shared/buttons";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-white container mx-auto font-montserrat py-10">
      <Image src={logo} alt="Logo" />

      {/* Main Thank You Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-16 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-[#023C5E] text-center mb-4 text-balance ">
          Thank you for sharing your story!
        </h1>
        <div className="text-center max-w-6xl mx-auto space-y-3">
          <p>
            Your project will be reviewed and shortly displayed on the Showcase
            website, where donors and supporters from around the world can
            discover it. You’re also welcome to share more — you’ll receive
            another email soon with a link to upload another project whenever
            you’re ready
          </p>
          <p className="text-lg text-gray-600 text-center  mb-12">
            Every story makes a difference. There are many donors wishing to
            find ministries like yours — and now they will be able to.
          </p>
        </div>
        {/* Party Popper Icon */}
        <div className="mb-4">
          <div className="text-9xl">💌</div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-gray-100 rounded-3xl mx-6 md:mx-12 py-16 px-8 md:px-12 text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Want to see what other churches are sharing?
        </h3>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Check out the Showcase page, where churches from around the world tell
          their stories and inspire new supporters.
        </p>

        {/* CTA Button */}
        <CTAButton>Let’s See the Others</CTAButton>
      </section>
    </main>
  );
}
