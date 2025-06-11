import { Label } from "@radix-ui/react-label"; // Correct import
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
const CustomLabel = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
    <Label ref={ref} className={cn(labelVariants(), className)} {...props} />
));

CustomLabel.displayName = "CustomLabel";
export { CustomLabel as Label };
