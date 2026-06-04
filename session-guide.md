# d3-org-chart Session — Presenter Guide

**Duration:** 30–45 minutes  
**Format:** Slides → browser demo → code peek → Q&A

---

## Phase 1 — Introduction (5 min)

**Open with the problem:**
> "Imagine you need to show who reports to whom across 500 people. You could build a D3 tree from scratch — that's weeks of work. Or you use d3-org-chart and get zoom, pan, expand/collapse, and search in an afternoon."

**Show the demo app screenshot on slide 10 first** — give them the "wow" before the theory.

**Key points to land:**
- It's built on D3 v7 but abstracts away all the boilerplate
- The one superpower: `.nodeContent()` — you write the card HTML, the library does everything else
- 500K monthly npm downloads — it's production-proven

---

## Phase 2 — Data Model & Core API (5 min)

**Walk through slide 6 (data format):**
- Stress how simple it is: just `id` + `parentId` + whatever fields you need
- Draw a 3-node example on the whiteboard if available: CEO → VP → Manager
- One rule: exactly one root node (`parentId: null`)

**Walk through slide 7 (the 4-method chain):**

```
new OrgChart()
  .container(ref)     ← where to render
  .data(array)        ← your flat array
  .nodeContent(fn)    ← returns HTML per node
  .render()           ← draws it
```

Tell them: "That's it. Everything else — zoom, collapse buttons, animations — just works."

**Mention the chart ref pattern:** store the instance in `useRef` so you can call `.search()`, `.fit()`, `.addNode()` later from toolbar buttons.

---

## Phase 3 — Live Demo (20 min)

**Open the demo app in the browser.** Walk through in this exact order:

### Step 1 — Initial render (2 min)
- Point out: 50 employees, 4 departments, 4 levels deep, loads and auto-fits
- "It figures out the layout. You don't touch SVG coordinates."

### Step 2 — Zoom & Pan (2 min)
- Scroll wheel to zoom
- Click toolbar "Zoom In / Zoom Out" buttons
- Click "Fit" — snaps back to full view
- "The chart is an SVG inside a foreignObject. D3's zoom behavior handles all of this."

### Step 3 — Expand / Collapse (3 min)
- Click the expand/collapse button on any VP node
- The subtree animates in/out smoothly
- Collapse a whole department, then expand it
- "The library tracks which nodes are expanded. You don't manage that state yourself."

### Step 4 — Search (4 min)
- Type "engineer" in the search box
- Watch non-matching nodes dim, matching ones highlight
- Clear and search a name, e.g. "sarah"
- "Internally, `.search()` walks the node tree and applies a CSS class. You control the highlight styles."

### Step 5 — Node click → Detail drawer (4 min)
- Click any employee card
- The right-side drawer slides in with full details: email, department, location, employment type, status
- "The click handler receives the full node data object — same shape as what you passed in."

### Step 6 — Add a node dynamically (5 min)
- Click "Add Employee" button
- Fill in the form (name, title, department, parent)
- Submit — the node appears in the chart with animation
- "`.addNode()` takes the same object shape. No re-render, no re-fetch. The chart updates in place."

---

## Phase 4 — Code Peek + Q&A (5–10 min)

**Open `src/components/OrgChart/index.tsx` in the editor.**

Point out:
1. `containerRef` — plain div, the chart mounts into it
2. `chartRef` — keeps the OrgChart instance across renders
3. The `useEffect` — runs once on mount, passes data + nodeContent + event handlers
4. `onNodeClick` callback — sets React state, which triggers the drawer

**Open `src/components/OrgChart/nodeTemplate.ts`.**

Point out:
1. It's a plain function: `(employee) => string`
2. No JSX — just template literals
3. You can pull in any CSS variables, inline styles, or class names from your design system
4. Avatar initials built with a simple `.split(" ").map(n => n[0]).join("")`

**Open Q&A.**

Common questions to prep for:
- *"Can I use it with a backend API?"* → Yes, fetch your data, put it in state, pass to `.data()`. Re-call `.render()` or `.updateNode()`.
- *"What about TypeScript types?"* → Install `@types/d3-org-chart`. The `OrgChart` class is generic.
- *"Can nodes have multiple parents?"* → No, it's a strict tree. For DAGs you'd need a different approach.
- *"How does performance hold up at 1000+ nodes?"* → The library uses compact mode and virtualization tricks. In practice, tested fine at 1000 nodes; above that you'd want paging/lazy-load.

---

## Tips

- **Keep the browser open on the demo** — if slides get boring, jump to the demo early
- **Have the `OrgChart/index.tsx` and `nodeTemplate.ts` files open in a second tab** ready to switch to
- **Compact mode** — if you have 2 min to spare, toggle `.compact(true)` live to show the layout change
