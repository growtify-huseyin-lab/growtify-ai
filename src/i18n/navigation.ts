import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation wrappers — use these instead of next/link + next/navigation
// in localized components so /en prefix is handled automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
