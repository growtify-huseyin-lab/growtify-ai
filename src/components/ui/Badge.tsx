type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "muted";
  className?: string;
};

const variants = {
  primary: "bg-primary/10 text-primary dark:bg-primary/20",
  accent: "bg-accent/30 text-dark dark:text-accent",
  muted: "bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-dark-muted",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
