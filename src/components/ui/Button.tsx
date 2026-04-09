import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
};

const variants = {
  primary: "bg-primary text-white hover:bg-primary-light",
  secondary: "bg-white dark:bg-dark-card text-primary border-2 border-primary hover:bg-primary hover:text-white dark:hover:bg-primary",
  accent: "bg-accent text-dark hover:brightness-95",
  ghost: "bg-transparent text-primary hover:bg-primary/5 dark:hover:bg-primary/10",
  outline: "bg-transparent text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/5 dark:text-primary-light dark:border-primary-light/30 dark:hover:border-primary-light",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
