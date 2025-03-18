import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import {
  Plus,
  Minus,
  RotateCcw,
  Save,
  History,
  Trash2,
  Download,
  Upload,
  Copy,
} from "lucide-react";
import StepValueInput from "./StepValueInput";
import { cn } from "@/lib/utils";
import isEven from "is-even";

interface CounterProps {
  initialValue?: number;
  className?: string;
  maxValue?: number;
  minValue?: number;
  theme?: "default" | "dark" | "light" | "colorful";
  showControls?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  className,
  maxValue = 100,
  minValue = -100,
  theme = "default",
  showControls = true,
}) => {
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<{
    increment: boolean;
    decrement: boolean;
    reset: boolean;
    save: boolean;
    clear: boolean;
    copy: boolean;
  }>({
    increment: false,
    decrement: false,
    reset: false,
    save: false,
    clear: false,
    copy: false,
  });
  const [history, setHistory] = useState<number[]>([initialValue]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [reachedLimit, setReachedLimit] = useState<{
    max: boolean;
    min: boolean;
  }>({ max: false, min: false });

  // Get theme-based styles
  const getThemeStyles = useCallback(() => {
    switch (theme) {
      case "dark":
        return {
          container: "bg-gray-900 border-gray-800",
          title: "text-gray-100",
          counterEven: "bg-gray-800 border-gray-700 text-gray-100",
          counterOdd: "bg-gray-800 border-gray-700 text-gray-100",
          buttonBg: "bg-gray-800 border-gray-700",
          buttonHover: "hover:bg-gray-700 hover:border-gray-600",
          text: "text-gray-300",
          secondaryText: "text-gray-400",
        };
      case "light":
        return {
          container: "bg-gray-100 border-gray-200",
          title: "text-gray-900",
          counterEven: "bg-white border-gray-300 text-gray-900",
          counterOdd: "bg-white border-gray-300 text-gray-900",
          buttonBg: "bg-white border-gray-300",
          buttonHover: "hover:bg-gray-50 hover:border-gray-400",
          text: "text-gray-700",
          secondaryText: "text-gray-500",
        };
      case "colorful":
        return {
          container:
            "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-indigo-400",
          title: "text-white",
          counterEven:
            "bg-white/20 backdrop-blur-sm border-white/30 text-white",
          counterOdd: "bg-black/20 backdrop-blur-sm border-black/30 text-white",
          buttonBg: "bg-white/10 backdrop-blur-sm border-white/20",
          buttonHover: "hover:bg-white/20 hover:border-white/30",
          text: "text-white",
          secondaryText: "text-white/70",
        };
      default:
        return {
          container:
            "bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700",
          title:
            "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500",
          counterEven: "bg-blue-900/50 border-blue-700 text-blue-100",
          counterOdd: "bg-purple-900/50 border-purple-700 text-purple-100",
          buttonBg: "bg-slate-800/50 border-slate-600",
          buttonHover: "hover:bg-slate-700/70 hover:border-slate-500",
          text: "text-slate-300",
          secondaryText: "text-slate-400",
        };
    }
  }, [theme]);

  const themeStyles = getThemeStyles();

  const handleIncrement = () => {
    const newCount = Math.min(count + step, maxValue);
    const reachedMax = newCount === maxValue;
    setCount(newCount);
    setIsAnimating({ ...isAnimating, increment: true });
    setReachedLimit((prev) => ({ ...prev, max: reachedMax }));
    if (newCount !== count) {
      setHistory((prev) => [...prev.slice(-19), newCount]);
    }
  };

  const handleDecrement = () => {
    const newCount = Math.max(count - step, minValue);
    const reachedMin = newCount === minValue;
    setCount(newCount);
    setIsAnimating({ ...isAnimating, decrement: true });
    setReachedLimit((prev) => ({ ...prev, min: reachedMin }));
    if (newCount !== count) {
      setHistory((prev) => [...prev.slice(-19), newCount]);
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsAnimating({ ...isAnimating, reset: true });
    setReachedLimit({ max: false, min: false });
    setHistory((prev) => [...prev.slice(-19), 0]);
  };

  const handleSaveValue = () => {
    // Only save if it's not already the last value in history
    if (history[history.length - 1] !== count) {
      setHistory((prev) => [...prev.slice(-19), count]);
    }
    setIsAnimating({ ...isAnimating, save: true });
  };

  const handleClearHistory = () => {
    setHistory([count]);
    setIsAnimating({ ...isAnimating, clear: true });
  };

  const handleCopyValue = () => {
    navigator.clipboard.writeText(count.toString());
    setIsAnimating({ ...isAnimating, copy: true });
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const loadHistoryValue = (value: number) => {
    setCount(value);
    setReachedLimit({
      max: value === maxValue,
      min: value === minValue,
    });
  };

  // Export counter data as JSON
  const exportData = () => {
    const data = {
      currentValue: count,
      step,
      history,
      min: minValue,
      max: maxValue,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "counter-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import counter data from JSON file
  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (data.currentValue !== undefined) setCount(data.currentValue);
            if (data.step !== undefined) setStep(data.step);
            if (data.history !== undefined) setHistory(data.history);
            setReachedLimit({
              max: data.currentValue === maxValue,
              min: data.currentValue === minValue,
            });
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Reset animation states after a short delay
  useEffect(() => {
    const animatingStates = Object.values(isAnimating);
    if (animatingStates.some((state) => state)) {
      const timer = setTimeout(() => {
        setIsAnimating({
          increment: false,
          decrement: false,
          reset: false,
          save: false,
          clear: false,
          copy: false,
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Check if the current count is even or odd
  const isCountEven = isEven(count);

  return (
    <div
      className={cn(
        "flex flex-col items-center p-8 rounded-xl shadow-xl border",
        themeStyles.container,
        className,
      )}
    >
      <div className={cn("text-3xl font-bold mb-6", themeStyles.title)}>
        Enhanced Counter
      </div>
      <div className="flex items-center justify-center w-full mb-6">
        {showControls && (
          <Button
            variant="outline"
            size="lg"
            disabled={count === minValue}
            className={cn(
              "h-16 w-16 rounded-full mr-6 transition-all",
              themeStyles.buttonBg,
              themeStyles.buttonHover,
              isAnimating.decrement &&
                "bg-red-500/20 scale-95 border-red-500/50",
              count === minValue && "opacity-50 cursor-not-allowed",
            )}
            onClick={handleDecrement}
            aria-label="Decrement counter"
          >
            <Minus
              className={cn(
                "h-6 w-6",
                reachedLimit.min ? "text-red-300/50" : "text-red-400",
              )}
            />
          </Button>
        )}

        <div className="flex flex-col justify-center items-end">
          <div
            className={
              cn(
                "text-7xl font-bold min-w-[180px] text-center py-4 px-8 rounded-lg border shadow-inner transition-colors",
                isCountEven ? themeStyles.counterEven : themeStyles.counterOdd,
              ) + " flex  justify-center items-center"
            }
          >
            {count}
          </div>
          <div className={cn("text-xs mt-1", themeStyles.secondaryText)}>
            {isCountEven ? "Even number" : "Odd number"}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "transition-all",
                themeStyles.text,
                "hover:text-white hover:bg-slate-700/50",
                isAnimating.reset && "bg-amber-500/20 scale-95 text-amber-300",
              )}
              onClick={handleReset}
              aria-label="Reset counter"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "transition-all",
                themeStyles.text,
                "hover:text-white hover:bg-slate-700/50",
                isAnimating.save && "bg-blue-500/20 scale-95 text-blue-300",
              )}
              onClick={handleSaveValue}
              aria-label="Save value"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "transition-all",
                themeStyles.text,
                "hover:text-white hover:bg-slate-700/50",
                isAnimating.copy && "bg-green-500/20 scale-95 text-green-300",
              )}
              onClick={handleCopyValue}
              aria-label="Copy value"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>

        {showControls && (
          <Button
            variant="outline"
            size="lg"
            disabled={count === maxValue}
            className={cn(
              "h-16 w-16 rounded-full ml-6 transition-all",
              themeStyles.buttonBg,
              themeStyles.buttonHover,
              isAnimating.increment &&
                "bg-green-500/20 scale-95 border-green-500/50",
              count === maxValue && "opacity-50 cursor-not-allowed",
            )}
            onClick={handleIncrement}
            aria-label="Increment counter"
          >
            <Plus
              className={cn(
                "h-6 w-6",
                reachedLimit.max ? "text-green-300/50" : "text-green-400",
              )}
            />
          </Button>
        )}
      </div>
      <div className="w-full max-w-xs space-y-4">
        <StepValueInput
          currentStep={step}
          onStepChange={handleStepChange}
          className={cn(
            "border rounded-md w-full shadow-inner",
            themeStyles.buttonBg,
          )}
        />

        <div
          className={cn(
            "border rounded-md p-4 shadow-inner",
            themeStyles.buttonBg,
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={cn("text-sm font-medium", themeStyles.text)}>
              Value History
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="h-8 w-8 p-0"
                disabled={history.length <= 1}
              >
                <Trash2 className={cn("h-4 w-4", themeStyles.secondaryText)} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleHistory}
                className="h-8 w-8 p-0"
              >
                <History className={cn("h-4 w-4", themeStyles.secondaryText)} />
              </Button>
            </div>
          </div>

          {showHistory && (
            <div className="mt-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
              <div className="grid grid-cols-4 gap-2">
                {history.slice(-20).map((value, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => loadHistoryValue(value)}
                    className={cn(
                      "h-8 text-xs",
                      themeStyles.buttonBg,
                      themeStyles.buttonHover,
                    )}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div
            className={cn(
              "text-xs mt-2 flex justify-between items-center",
              themeStyles.secondaryText,
            )}
          >
            <span>{history.length} values saved</span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={exportData}
                className="h-6 w-6 p-0"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={importData}
                className="h-6 w-6 p-0"
              >
                <Upload className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-between text-xs px-1",
            themeStyles.secondaryText,
          )}
        >
          <div>Min: {minValue}</div>
          <div>Current: {count}</div>
          <div>Max: {maxValue}</div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
