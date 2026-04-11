

## Plan: Update Deliverables Section Card Hover Effect

### What changes

**1. Replace hover effect on desktop `ModuleCard`**
- Remove the current complex hover logic: animated tracing border (conic gradient), `isInFlow` cascade highlighting, `isActive` lift/scale, and all related glow/shadow states
- Replace with a simple smooth transition: on hover, the entire card background becomes a gold gradient, text colors invert to dark, and border becomes solid gold. On mouse leave, it smoothly returns to the default dark state
- Transition duration ~400ms for a smooth feel

**2. Equalize card sizes**
- Add a `min-h` value to all cards (desktop `ModuleCard`) so they match the natural height of the taller cards (cards 02/03 which have 2-line descriptions). This ensures all 6 cards render at the same height regardless of content length

**3. Replace hover effect on mobile `MobileModuleCard`**
- Same treatment: tap toggles the card to gold background with dark text, smooth transition

**4. Simplify parent state logic**
- Remove `isInFlow` logic and the `ctaGlow` cascade from hover — each card only needs its own hovered/not-hovered state
- Remove the FlowArrow/RowConnector active-state dependency on `hoveredIndex` (arrows stay in their default dim state, or remove the flow-cascade behavior)

### Technical details

**File:** `src/components/DeliverablesSection.tsx`

**ModuleCard hover style (replacing current):**
- Default: dark bg `hsl(0 0% 11%)`, subtle border, light text
- Hovered: gold bg `linear-gradient(135deg, hsl(45 100% 50%), hsl(40 100% 45%))`, dark text (`hsl(0 0% 5%)`), gold border, gold shadow
- All inner elements (step number, accent bar, step badge, title, description) transition their colors to dark on hover
- `transition: all 0.4s ease` on the card and inner elements

**Card sizing:**
- Add `min-h-[220px]` (or similar) to both desktop and mobile card inner containers, with `flex flex-col` to distribute content properly

**Removed:** conic-gradient border animation, `borderTrace` keyframes dependency for cards, `isInFlow` prop/logic, `ctaGlow` cascade from hover

