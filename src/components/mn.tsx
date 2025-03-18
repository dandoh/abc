import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight, Info, Check, AlertCircle } from "lucide-react";

interface MnProps {
  className?: string;
  title?: string;
  description?: string;
  showInfo?: boolean;
}

const Mn: React.FC<MnProps> = ({
  className,
  title = "Main Navigation",
  description = "Navigate through the application with ease",
  showInfo = true,
}) => {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", active: true },
    { name: "Analytics", href: "/analytics", active: false },
    { name: "Settings", href: "/settings", active: false },
    { name: "Profile", href: "/profile", active: false },
  ];

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-800",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        </div>
        {showInfo && (
          <Button variant="outline" size="sm" className="gap-1">
            <Info className="h-4 w-4" />
            Help
          </Button>
        )}
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all",
              item.active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50",
            )}
          >
            <span className="flex-1">{item.name}</span>
            {item.active ? (
              <Check className="h-4 w-4 text-blue-500" />
            ) : (
              <ArrowRight className="h-4 w-4 opacity-50" />
            )}
          </a>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-700 dark:text-blue-300">
              Navigation Tips
            </h4>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
              Click on any navigation item to visit that section. The active
              page is highlighted in blue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mn;
