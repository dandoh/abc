import React from "react";
import { cn } from "@/lib/utils";

interface TestNonExistentFileProps {
  title?: string;
  description?: string;
  className?: string;
}

const TestNonExistentFile: React.FC<TestNonExistentFileProps> = ({
  title = "Test Non-Existent File",
  description = "This file was created for testing purposes",
  className,
}) => {
  return (
    <div
      className={cn(
        "p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800",
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-slate-500 dark:text-slate-400">{description}</p>

      <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          This file was created for testing the "create" command on a
          non-existent file.
        </p>
      </div>
    </div>
  );
};

export default TestNonExistentFile;
