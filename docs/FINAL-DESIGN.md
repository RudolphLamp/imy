# Group Design E - Final design rationale

Create.IT - IMY 320: Multimedia Trends, University of Pretoria, 2026.

## Design direction

The final workspace keeps the established dark creative identity, with the original indigo and cyan accents, restrained borders, consistent typography, and more space around the primary content. The orbital hero is drawn in CSS. Course photography provides a clear visual entry to each subject. The catalogue and wishlist retain a row-based list view, while My Learning retains its course progress list. The original multi-column footer and About page remain accessible from the workspace. The catalogue, learning dashboard, wishlist, cart, account hub, and certificates share navigation and interaction styles.

The first action is now explicit: **Find your next course** moves focus to the course search. Categories remain available in one place, and advanced level/price options appear on request. This reduces the simultaneous competing controls identified by participants while preserving useful filtering.

## Response to the Group Design D findings

The supplied usability report describes four participants completing five core journeys. All tasks were completed, but the clarity score and observations identified friction. The following changes are implementation responses; they are not claims of a second user study or improved UEQ scores.

| Report recommendation | Final implementation | How to review |
| --- | --- | --- |
| 1. Fix the completion message | The progress record is computed synchronously outside the React state updater. Completion reads “Course complete! Your certificate is ready.” | Finish the last module in My Learning. |
| 2. Celebrate at the moment of completion | The certificate ceremony, congratulations, and confetti open immediately when the last unique module is completed. | No intermediate Claim Certificate click is required. |
| 3. Announce the certificate affordance | Automatic ceremony resolves the primary discovery issue. A highlighted “Your certificate is ready” action and a Certificates page remain available afterward. | Close the ceremony and reopen the achievement. |
| 4. Add a catalogue starting point | One primary hero action leads to prominent search. Categories are grouped below it; optional advanced filters no longer occupy the sidebar. | Search for `motion`, browse two results, or reset filters. |
| 5. Clarify demo payment | Both cart and review explicitly state that no payment is required. The review describes the local receipt and enrolment action. | Open checkout before confirming. |
| 6. Make the curriculum affordance clearer | Native details/summary controls include numbered modules, an explicit expand instruction, and rotating chevrons. | Expand a module using mouse or keyboard. |
| 7. Improve continuation (optional in the report) | A labelled lesson shell includes a guide, saved module position, completed-module checklist, personal notes, and a downloadable text resource. | Leave a course after one module, refresh, and continue. |

## Peak-End Rule

The enrolment celebration remains at the commitment moment, following order confirmation. Smaller milestone messages recognise 25%, 50%, and 75% progress. The final module immediately opens the certificate ceremony, placing the strongest end feedback at the actual end of the journey. A downloaded certificate and a persistent achievement give the user something to revisit. Reduced-motion preferences suppress confetti and decorative animation.

## Completeness and access

The implemented journeys include demo entry, local account registration/sign-in/sign-out, course search, category/level/price filtering, sorting, course details, wishlist, cart removal, review/confirmation, order persistence, receipts, progress persistence, module continuation, notes, resource download, completion, certificate download, FAQs, local support questions, editable reviews, and profile updates.

The header and side navigation are anchored to the viewport; the document owns page scrolling. The sidebar has its own overflow for short screens. A desktop header chevron collapses and expands it, with the preference saved in browser storage. Mobile navigation uses an explicit toggle and backdrop. Modal dialogs move and contain keyboard focus, support Escape, restore focus when the initiating control remains available, and lock background scrolling. Native labels, progress elements, disclosure controls, and live feedback support keyboard and assistive-technology users.

## Verification

Automated checks: `npm run lint`, `npm test`, and `npm run build`. The progress regression suite verifies the full 25/50/75/100 sequence, duplicate completion, legacy percentage records, out-of-order modules, and invalid indexes. These specifically protect the completion failure found in usability testing.

Browser verification covers course search and details, cart/checkout/enrolment, lesson continuation after refresh, saved notes, immediate completion ceremony, the generated PNG download, wishlist persistence, order receipts, local registration, rejected incorrect passwords, and successful sign-in. Responsive layout checks cover 320, 390, 768, and 1024 CSS pixel containers, plus desktop. Navigation anchoring is checked after scrolling 900 pixels. Checks also cover desktop collapse/expand and persistence after refresh, mobile drawer navigation, list curriculum expansion, restored footer links, and travel from About back to My Learning. The bundled course images remove remote image dependencies from the final build.

## Prototype boundaries

The assignment permits a teaching-system placeholder and does not require a backend. This implementation makes those boundaries explicit. No real payment details are requested, no email is sent, and support questions/reviews remain local. Certificates are prototype completion artifacts and do not claim accreditation. Accounts and data are device-local; registration is an interaction demonstration rather than production security.

## Submission contents

The repository contains the complete runnable source, dependency lockfile, local course images, documentation, supplied evaluation and overview PDFs, earlier research reports, and a GitHub Actions verification workflow. The README provides setup and marker review instructions. Use Node.js 22.12+ and run `npm ci` followed by `npm run dev`.
