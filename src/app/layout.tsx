// Root layout is a pass-through. The real <html>/<body> + providers live in
// app/[locale]/layout.tsx (next-intl i18n routing, localePrefix="as-needed").
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
