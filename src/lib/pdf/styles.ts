import { StyleSheet, Font } from "@react-pdf/renderer";

// Growtify brand colors
export const COLORS = {
  primary: "#5d47f0",
  primaryLight: "#9886fe",
  accent: "#C9FF85",
  dark: "#232323",
  text: "#222222",
  light: "#F8F8F8",
  gray: "#6b7280",
  grayLight: "#e5e7eb",
  white: "#ffffff",
} as const;

// Register Inter font (local TTF — Türkçe karakter desteği için)
import path from "path";

const fontDir = path.resolve(process.cwd(), "public/fonts");

Font.register({
  family: "Inter",
  fonts: [
    {
      src: path.join(fontDir, "Inter-Regular.ttf"),
      fontWeight: 400,
    },
    {
      src: path.join(fontDir, "Inter-SemiBold.ttf"),
      fontWeight: 600,
    },
    {
      src: path.join(fontDir, "Inter-Bold.ttf"),
      fontWeight: 700,
    },
    {
      src: path.join(fontDir, "Inter-ExtraBold.ttf"),
      fontWeight: 800,
    },
  ],
});

export const styles = StyleSheet.create({
  // Page
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },

  // Cover page
  coverPage: {
    fontFamily: "Inter",
    backgroundColor: COLORS.dark,
    color: COLORS.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  coverIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 800,
    textAlign: "center",
    color: COLORS.white,
    lineHeight: 1.3,
    marginBottom: 16,
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.primaryLight,
    lineHeight: 1.5,
    marginBottom: 30,
    maxWidth: 400,
  },
  coverBrand: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 40,
  },
  coverAccent: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 20,
  },

  // Section headers
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: COLORS.primary,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.dark,
    marginBottom: 8,
    marginTop: 16,
  },

  // Body text
  paragraph: {
    fontSize: 10,
    lineHeight: 1.7,
    color: COLORS.text,
    marginBottom: 10,
  },
  paragraphBold: {
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1.7,
    color: COLORS.dark,
    marginBottom: 10,
  },
  italic: {
    fontSize: 10,
    color: COLORS.gray,
    lineHeight: 1.6,
    marginBottom: 10,
  },

  // Lists
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 4,
  },
  bullet: {
    width: 16,
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 700,
  },
  listText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.6,
    color: COLORS.text,
  },

  // Numbered list
  numberCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 22,
    marginRight: 10,
  },

  // Cards / Boxes
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: COLORS.text,
  },

  // Highlight box (accent)
  highlightBox: {
    backgroundColor: "#F0EDFF",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
  },

  // Before/After
  beforeAfterRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  beforeBox: {
    flex: 1,
    backgroundColor: "#FEF2F2",
    borderRadius: 6,
    padding: 12,
  },
  afterBox: {
    flex: 1,
    backgroundColor: "#F0FDF4",
    borderRadius: 6,
    padding: 12,
  },
  beforeLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: "#DC2626",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  afterLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: "#16A34A",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: 14,
    fontWeight: 800,
    color: COLORS.dark,
  },

  // Prompt box
  promptBox: {
    backgroundColor: "#1E1B2E",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  promptLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.primaryLight,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  promptText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#E0E0E8",
  },

  // Checklist
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkBox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 3,
    marginRight: 10,
  },
  checkText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: COLORS.text,
  },

  // CTA page
  ctaPage: {
    fontFamily: "Inter",
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
    color: COLORS.white,
    marginBottom: 16,
  },
  ctaText: {
    fontSize: 12,
    textAlign: "center",
    color: "#E0E0FF",
    lineHeight: 1.6,
    marginBottom: 20,
    maxWidth: 380,
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: 800,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    textAlign: "center",
  },
  ctaUrl: {
    fontSize: 10,
    color: "#B0B0FF",
    marginTop: 12,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: 8,
  },
  footerBrand: {
    fontSize: 8,
    color: COLORS.gray,
  },
  footerPage: {
    fontSize: 8,
    color: COLORS.gray,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginVertical: 16,
  },
});
