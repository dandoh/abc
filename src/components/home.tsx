import React from "react";
import Counter from "./Counter";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Button } from "./ui/button";
import isEven from "is-even";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 animate-gradient-x",
        className,
      )}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-200/10 animate-float"
            style={{
              width: `${Math.random() * 12 + 5}px`,
              height: `${Math.random() * 12 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header with animated gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 animate-gradient-x"></div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="bg-green-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-green-300 animate-pulse" />
                <span className="text-green-300 font-medium tracking-wider uppercase text-sm">
                  Welcome to
                </span>
                <Sparkles className="h-5 w-5 text-green-300 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-bold tracking-tight text-white mb-8 drop-shadow-xl relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 animate-gradient-x">
              Simple Counter App
            </span>
            <span className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-80"></span>
          </h1>

          <p className="text-2xl text-green-100 max-w-2xl mx-auto font-medium leading-relaxed">
            A minimalist counter application with powerful features and a
            beautiful interface
          </p>
        </div>

        {/* Counter component with enhanced styling */}
        <div className="flex justify-center mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <Counter
              initialValue={0}
              className="w-full max-w-md shadow-2xl border-2 border-green-300/50 rounded-xl backdrop-blur-md bg-green-800/40 hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 relative"
            />
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Intuitive Controls",
              description:
                "Simple plus and minus buttons with visual feedback for easy counting",
              icon: <Zap className="h-6 w-6 text-green-300" />,
            },
            {
              title: "Reset Functionality",
              description:
                "Quickly reset your counter to zero with a single click",
              icon: <RefreshCw className="h-6 w-6 text-green-300" />,
            },
            {
              title: "Custom Step Values",
              description:
                "Set your own increment and decrement step values for precise counting",
              icon: <Settings className="h-6 w-6 text-green-300" />,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-green-900/40 backdrop-blur-md p-6 rounded-xl border border-green-400/30 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:translate-y-[-5px] hover:bg-green-900/50 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-800/70 rounded-lg group-hover:bg-green-700/70 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-100">
                  {feature.title}
                </h3>
              </div>
              <p className="text-green-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How to use section with improved styling */}
        <div className="mt-8 text-center text-green-200 bg-green-900/40 p-10 rounded-2xl max-w-2xl mx-auto backdrop-blur-md shadow-2xl border border-green-400/30 transform transition-all duration-500 hover:border-green-300/60 hover:bg-green-900/50 group">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-6 w-6 text-green-300 group-hover:text-green-200 transition-colors" />
            <h3 className="text-2xl font-semibold text-green-100 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-teal-200">
              How to Use
            </h3>
            <Star className="h-6 w-6 text-green-300 group-hover:text-green-200 transition-colors" />
          </div>

          <ul className="space-y-5 text-base">
            {[
              "Use the plus and minus buttons to change the counter value.",
              "The reset button will return the counter to zero.",
              "You can also customize the increment/decrement step value.",
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-center justify-center gap-4 hover:bg-green-800/40 p-3 rounded-lg transition-all group-hover:translate-x-1 duration-300"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-sm font-bold shadow-lg text-white">
                  {i + 1}
                </span>
                <span className="flex-1 text-left">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-5 border-t border-green-700/40 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
            <span className="text-green-300/90 text-sm font-medium">
              Try it now
            </span>
            <ArrowRight className="h-4 w-4 text-green-300/90 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Call to action button */}
      <div className="mt-16 mb-12">
        <Button className="px-8 py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-medium shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Footer with improved styling */}
      <div className="absolute bottom-4 text-green-300/60 text-sm flex items-center gap-3">
        <span>© 2023 Simple Counter App</span>
        <span className="inline-block w-1 h-1 rounded-full bg-green-300/40"></span>
        <span>All rights reserved</span>
        <span className="inline-block w-1 h-1 rounded-full bg-green-300/40"></span>
        <a href="#" className="hover:text-green-200 transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Home;
