import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface StepValueInputProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

const StepValueInput: React.FC<StepValueInputProps> = ({
  currentStep = 1,
  onStepChange = () => {},
  className,
}) => {
  const [inputValue, setInputValue] = useState<string>(currentStep.toString());
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    const newStep = parseInt(inputValue, 10);
    if (!isNaN(newStep) && newStep > 0) {
      onStepChange(newStep);
    } else {
      // Reset to current step if invalid input
      setInputValue(currentStep.toString());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(currentStep.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-2 p-4 bg-background",
        className,
      )}
    >
      <div className="text-sm font-medium mb-1">Step Value</div>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            min="1"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-20 text-center"
            autoFocus
          />
          <div className="flex space-x-1">
            <Button size="sm" onClick={handleSave} variant="default">
              Save
            </Button>
            <Button size="sm" onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 border rounded-md min-w-[50px] text-center">
            {currentStep}
          </div>
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            Edit
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        Set how much to increment/decrement
      </p>
    </div>
  );
};

export default StepValueInput;
