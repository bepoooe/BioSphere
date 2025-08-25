import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { BioProvider } from "@/context/BioContext";
import { ChevronRight, Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BioSphere - AI-Powered Multi-Platform Bio Generator",
  description:
    "Generate perfect bios for Twitter, Instagram, and LinkedIn with AI. Craft compelling profiles that truly represent you across all social platforms.",
};

export default function Home() {
  return (
    <>
      <AuthHeader />
      <main className="relative min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <div className="relative z-10 px-4 py-16 sm:py-20 sm:px-8 md:px-10 pt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">            <Link
                href="https://github.com/bepoooe/BioSphere"
                target="_blank"
                className="group inline-block"
              >
                <AnimatedGradientText className="px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-accent/20">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-500 drop-shadow-sm" />
                  <hr className="mx-2 h-4 w-[1px] bg-gradient-to-b from-accent to-primary opacity-60" />
                  <span className="font-semibold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">Star on Github</span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-accent" />
                </AnimatedGradientText>
              </Link>
              
              <div className="space-y-4">
                <h1 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center max-w-5xl mx-auto leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
                    CRAFT PERFECT
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    BIOS FOR ANY
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">
                    PLATFORM!
                  </span>
                </h1>
                
                <div className="max-w-2xl mx-auto space-y-3">
                  <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    BioSphere: Where every word counts
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Generate compelling, platform-optimized bios for Twitter, Instagram, and LinkedIn with the power of AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              <BioProvider>
                <div className="space-y-8">
                  <UserInput />
                </div>
                <div className="space-y-8">
                  <Output />
                </div>
              </BioProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
