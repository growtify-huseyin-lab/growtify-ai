// Growtify AI — quiz submit-screen guard.
//
// Lead capture fires only on the screen flagged `submitTrigger: true` in the
// screen skeleton. This check makes sure every quiz flow (TR/EN × bireysel/
// kurumsal) has exactly one such screen, that it is a text_input screen, and
// that it comes after the email screen. Run: npm run check:quiz
import { SCREENS as BIREYSEL_TR } from "../src/app/[locale]/test/lib/content-runtime";
import { SCREENS as BIREYSEL_EN } from "../src/app/[locale]/test/lib/content-runtime-en";
import { SCREENS as KURUMSAL_TR } from "../src/app/[locale]/test/kurumsal/lib/content-kurumsal-runtime";
import { SCREENS as KURUMSAL_EN } from "../src/app/[locale]/test/kurumsal/lib/content-kurumsal-runtime-en";

type Screen = { id: number; type: string; stateKey?: string; cta?: string; submitTrigger?: boolean };

const flows: Record<string, Screen[]> = {
  "bireysel TR": BIREYSEL_TR as Screen[],
  "bireysel EN": BIREYSEL_EN as Screen[],
  "kurumsal TR": KURUMSAL_TR as Screen[],
  "kurumsal EN": KURUMSAL_EN as Screen[],
};

let failed = false;
for (const [name, screens] of Object.entries(flows)) {
  const submit = screens.filter((s) => s.submitTrigger === true);
  const emailIdx = screens.findIndex((s) => s.stateKey === "email");
  const problems: string[] = [];
  if (submit.length !== 1) problems.push(`expected 1 submit screen, found ${submit.length}`);
  const s = submit[0];
  if (s && s.type !== "text_input") problems.push(`submit screen ${s.id} is "${s.type}", not text_input`);
  if (s && emailIdx === -1) problems.push("no email screen in flow");
  if (s && emailIdx > screens.indexOf(s)) problems.push(`submit screen ${s.id} comes before the email screen`);

  if (problems.length) {
    failed = true;
    console.error(`✗ ${name}: ${problems.join("; ")}`);
  } else {
    console.log(`✓ ${name}: submit on screen ${s.id} (${s.stateKey}) — CTA "${s.cta}"`);
  }
}

if (failed) process.exit(1);
