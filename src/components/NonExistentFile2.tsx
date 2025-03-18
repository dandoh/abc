import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface NonExistentFile2Props {
  title?: string;
  description?: string;
  className?: string;
}

const NonExistentFile2: React.FC<NonExistentFile2Props> = ({
  title = "Non-Existent File 2",
  description = "This file was created for testing purposes",
  className,
}) => {
  const [count, setCount] = useState(0);

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
          This file was created because it didn't exist before. Test count:{" "}
          {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default NonExistentFile2;
