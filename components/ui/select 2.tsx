import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string;
    size?: "default" | "sm" | "lg";
  }
>(({ className, children, placeholder, size = "default", ...props }, ref) => {
  const sizeClasses: Record<"sm" | "default" | "lg", string> = {
    sm: "h-8 px-2 py-1 text-xs",
    default: "h-9 px-3 py-2 text-sm",
    lg: "h-10 px-4 py-2",
  };

  return (
    <div className="relative">
      <select
        className={cn(
          "flex w-full rounded-md border border-gray-300 bg-white text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none pr-8",
          sizeClasses[size as keyof typeof sizeClasses],
          className
        )}
        ref={ref}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
});

Select.displayName = "Select";

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const SelectItem = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, children, ...props }, ref) => (
  <option
    ref={ref}
    className={cn("py-2 px-3 hover:bg-gray-100", className)}
    {...props}
  >
    {children}
  </option>
));

SelectItem.displayName = "SelectItem";

const SelectTrigger = Select;
const SelectValue = ({ placeholder }: { placeholder?: string }) => null;

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};