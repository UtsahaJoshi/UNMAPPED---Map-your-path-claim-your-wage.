# Gig Worker App

_Started 2026-04-26 08:06 UTC_

---

## User



## Assistant

I'll design this thoughtfully. Let me start by asking a few key questions to shape the direction, since "Fintech meets the UN" can go many ways.

_[tool: questions_v2]_

## User

Questions answered:
- format: Mobile-first phone frame (since gig workers are on phones)
- aesthetic: Decide for me
- glass_intensity: Decide for me
- language: Decide for me
- type_pairing: Decide for me
- passport_style: 1
- tweaks: Language toggle EN/NE
- novelty: Decide for me
- demo_job: Motorcycle rider/delivery → ISCO 8322 Car/taxi/van drivers

## Assistant

I have my direction. Let me commit to the system out loud, then build.

**System I'm committing to:**
- **Format:** iOS phone frame (mobile-first), single prototype with all 4 sections in a vertical scroll.
- **Aesthetic:** Balanced — institutional navy `#0A1F3D` + cream `#F5F1E8` base, with a single warm gold accent `oklch(0.78 0.12 75)` for institutional credibility ("UN-leaning"), and a fintech-style data green for positive deltas. Subtle glass — used only on key cards and overlays, not everywhere.
- **Type:** Inter for UI + Instrument Serif for institutional headings (lends document-like authority) + JetBrains Mono for data/codes.
- **Language:** EN primary, Nepali (Devanagari) inline beneath key headings in smaller weight — toggle in header to flip primary/secondary, exposed as a Tweak.
- **Demo:** Motorcycle delivery rider → ISCO 8322.
- **Novelty:** Mostly conventional fintech patterns, with two distinctive moments — (1) a data-stamped "Institutional Passport" with foil-press feel, (2) the wage delta reveal animation.

Building now.

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

Let me peek at the iOS frame API quickly so I use it correctly.

_[tool: grep]_

Good. Now let me write the main HTML and component files.

_[tool: read_file]_

Got it. Now I'll build the app. I'll write a clean main HTML file plus a single app component file.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the four core sections.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built. **UNMAPPED.html** delivers all 4 components in an iOS frame:

1. **Hero search** — glass bar, voice mic with pulse, dropdown with orange "Negative Space" / blue "Included Alias" badges, ISCO mapping subtitle.
2. **Logic Bridge** — editable rate input with /month·/day·/hour dropdown, comparison bars vs. national rate, big serif delta (+NPR 14,500), 80% growth badge, Nepal Rastra Bank confidence card.
3. **Skill Gap** — gradient progress bar with tick marks, ISCO-08 task checklist, working text-to-speech (EN/NE).
4. **Institutional Passport** — navy + gold foil card with guilloché texture, microprint, status dots, QR code, document number, WhatsApp share.

**Tweaks:** EN ⇄ ने language toggle (also accessible from header pill).

## User

Verifier agent check completed

## Assistant

_[tool: grep]_

The hook returns a tuple `[values, setTweak]`, not `{tweaks, setTweak}`. Also `TweaksPanel` uses `title` not seen in the source — let me check and fix usages. Also `TweakSection` uses `label` not `title`, and `TweakButton` uses `label` prop, not children.

_[tool: snip]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Fixed the crash — `useTweaks` returns a tuple `[values, setTweak]`, and `TweakSection`/`TweakButton` use `label` props rather than children. The app now renders cleanly.

## User

I feel like desktop layout should also be given

## Assistant

I'll add a desktop layout that shows the same content laid out for a wider canvas, with a toggle in Tweaks to switch between mobile/desktop.

_[tool: snip]_

_[tool: read_file]_

I'll create a desktop layout. Let me design it as a single dashboard view — search hero on top, then a 2-column layout below with the bridge on left, skills + passport stacked on right.

_[tool: copy_starter_component]_

_[tool: grep]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Added a desktop layout — full dashboard with the search hero + bridge stacked on the left, skill checklist + institutional passport on the right. Defaults to desktop now; toggle between Mobile/Desktop in Tweaks (Layout → Form factor).

## User

i think you forgot the regional baseline there are 3 cards that are compared.

