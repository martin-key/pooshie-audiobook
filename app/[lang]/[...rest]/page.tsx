import { notFound } from "next/navigation";

// Any unknown path inside a locale (/de/whatever, or /whatever rewritten to /en/whatever)
// lands here, so the localized not-found page renders inside the [lang] layout.
export default function CatchAll() {
  notFound();
}
