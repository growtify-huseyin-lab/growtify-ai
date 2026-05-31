// Locale selector over kurumsal-constants (TR, untouched) + kurumsal-constants.en (EN).
// Server components call these with getLocale(); client components use the hooks file.
import {
  KURUMSAL_HERO,
  KURUMSAL_PROBLEMS,
  KURUMSAL_SERVICES,
  KURUMSAL_GROWT_PHASES,
  KURUMSAL_PROCESS,
  KURUMSAL_STATS,
  KURUMSAL_FAQ,
  KURUMSAL_SECTORS,
} from "./kurumsal-constants";
import {
  KURUMSAL_HERO_EN,
  KURUMSAL_PROBLEMS_EN,
  KURUMSAL_SERVICES_EN,
  KURUMSAL_GROWT_PHASES_EN,
  KURUMSAL_PROCESS_EN,
  KURUMSAL_STATS_EN,
  KURUMSAL_FAQ_EN,
  KURUMSAL_SECTORS_EN,
} from "./kurumsal-constants.en";

const isEn = (l: string) => l === "en";

export const getKHero = (l: string): typeof KURUMSAL_HERO =>
  isEn(l) ? (KURUMSAL_HERO_EN as unknown as typeof KURUMSAL_HERO) : KURUMSAL_HERO;
export const getKProblems = (l: string): typeof KURUMSAL_PROBLEMS =>
  isEn(l) ? (KURUMSAL_PROBLEMS_EN as unknown as typeof KURUMSAL_PROBLEMS) : KURUMSAL_PROBLEMS;
export const getKServices = (l: string): typeof KURUMSAL_SERVICES =>
  isEn(l) ? (KURUMSAL_SERVICES_EN as unknown as typeof KURUMSAL_SERVICES) : KURUMSAL_SERVICES;
export const getKGrowtPhases = (l: string): typeof KURUMSAL_GROWT_PHASES =>
  isEn(l) ? (KURUMSAL_GROWT_PHASES_EN as unknown as typeof KURUMSAL_GROWT_PHASES) : KURUMSAL_GROWT_PHASES;
export const getKProcess = (l: string): typeof KURUMSAL_PROCESS =>
  isEn(l) ? (KURUMSAL_PROCESS_EN as unknown as typeof KURUMSAL_PROCESS) : KURUMSAL_PROCESS;
export const getKStats = (l: string): typeof KURUMSAL_STATS =>
  isEn(l) ? (KURUMSAL_STATS_EN as unknown as typeof KURUMSAL_STATS) : KURUMSAL_STATS;
export const getKFaq = (l: string): typeof KURUMSAL_FAQ =>
  isEn(l) ? (KURUMSAL_FAQ_EN as unknown as typeof KURUMSAL_FAQ) : KURUMSAL_FAQ;
export const getKSectors = (l: string): typeof KURUMSAL_SECTORS =>
  isEn(l) ? (KURUMSAL_SECTORS_EN as unknown as typeof KURUMSAL_SECTORS) : KURUMSAL_SECTORS;
