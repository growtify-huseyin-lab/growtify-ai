type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 transition-all duration-200 ${
        hover ? "hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-primary/5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
