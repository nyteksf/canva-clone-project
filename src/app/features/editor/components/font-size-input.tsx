import React from "react";
import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FontSizeInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
    const STEP_SIZE = 1;

    const increment = () => onChange(value + STEP_SIZE);
    const decrement = () => {
        if (value >= 1) {
            onChange(value - STEP_SIZE);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if backspace is pressed and input length is 1
        if (e.key === "Backspace" && value.toString().length === 1) {
            e.preventDefault(); // Prevent deletion of the last character
            return;
        } 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        onChange(value);
    };

    return (
        <div className="flex items-center">
            <Button
                onClick={increment}
                variant="outline"
                className="p-2 rounded-r-none border-r-0"
                size="icon"
            >
                <Plus className="size-4" />
            </Button>
            <Input
                onChange={handleChange}
                value={value}
                onKeyDown={handleKeyDown}
                className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
            />
            <Button
                onClick={decrement}
                variant="outline"
                className="p-2 rounded-l-none border-l-0"
                size="icon"
            >
                <Minus className="size-4" />
            </Button>
        </div>
    );
};
