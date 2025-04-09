import * as React from "react";

// Simple function to combine class names
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

function Alert({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        variant === "destructive" ? "border-red-200 text-red-700" : "border-slate-200 text-slate-700",
        className || ""
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertTitle({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className || "")}
      {...props}
    >
      {children}
    </h5>
  );
}

function AlertDescription({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-sm", className || "")}
      {...props}
    >
      {children}
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription };