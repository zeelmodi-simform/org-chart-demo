# d3-org-chart Session — Slide Content

> Copy each slide's content into Google Slides / PowerPoint. Suggested layout: dark header bar, white body, code blocks in monospace on a dark background chip.

---

## Slide 1 — Title

**Heading:** d3-org-chart  
**Subheading:** Visualizing Organizational Hierarchies with D3  
**Footer:** [Your Name] · [Date] · Tech Session

---

## Slide 2 — Agenda

**Heading:** What We'll Cover

- What is d3-org-chart?
- Why choose it over alternatives?
- Data model — it's simpler than you think
- Core API — 4 methods to get started
- Live Demo (the main event)
- Code walkthrough
- Q&A

**Speaker note:** Tell them upfront — we'll spend most of the time in the browser. The slides are just a map.

---

## Slide 3 — What is d3-org-chart?

**Heading:** What is d3-org-chart?

- Open-source library by **Adam Bumbeishvili**
- Built on top of **D3.js v7**
- Turns a **flat JSON array** into a fully interactive org chart
- **500,000+ monthly npm downloads**
- Zero framework opinion — works with React, Vue, Angular, Vanilla JS

**Visual:** Screenshot of a rendered org chart with expand/collapse

---

## Slide 4 — Why d3-org-chart?

**Heading:** Why Not Just Use Plain D3 or Something Else?

| Option | Problem |
|--------|---------|
| Plain D3 | You write all the SVG, zoom, expand/collapse yourself — weeks of work |
| react-organizational-chart | Very limited customization, no built-in search |
| GoJS | Commercial license — not free |
| **d3-org-chart** | Free, interactive by default, 100% custom node UI |

**Key line:** "The node content is just an HTML string you control. Your design system, your rules."

---

## Slide 5 — Key Features

**Heading:** What You Get Out of the Box

- **Zoom & Pan** — mouse wheel + drag
- **Expand / Collapse** — click to show/hide subtrees
- **Search & Highlight** — find any node by any field
- **Custom Node Templates** — full HTML/CSS control via `.nodeContent()`
- **7 built-in themes** — Default, Sky, Circles, Oval, Clean…
- **Dynamic updates** — `.addNode()`, `.removeNode()`, `.updateNode()`
- **Export to PNG** — one method call
- **Compact layout** — for wide, flat hierarchies

---

## Slide 6 — Data Structure

**Heading:** Data Format — Just a Flat Array

```typescript
const employees = [
  {
    id: "1",
    parentId: null,          // ← root node (only one!)
    displayName: "Sarah Chen",
    jobTitle: "CEO",
    department: "Executive",
    profileImageUrl: "...",
  },
  {
    id: "2",
    parentId: "1",           // ← child of CEO
    displayName: "James Patel",
    jobTitle: "VP Engineering",
    department: "Engineering",
    profileImageUrl: "...",
  },
];
```

**Key rules:**
- Every node needs a unique `id`
- `parentId: null` = root (exactly one)
- All other fields are yours — add anything

---

## Slide 7 — The Core API

**Heading:** 4 Methods to Render Your First Chart

```typescript
import OrgChart from "d3-org-chart";

new OrgChart()
  .container("#chart-container")   // DOM element or CSS selector
  .data(employees)                  // your flat array
  .nodeContent((d) => `            // return HTML string per node
    <div class="card">
      <strong>${d.data.displayName}</strong>
      <span>${d.data.jobTitle}</span>
    </div>
  `)
  .render();                        // draw it!
```

**Useful extras:**

| Method | What it does |
|--------|-------------|
| `.fit()` | Auto-fit chart to container |
| `.search("query")` | Highlight matching nodes |
| `.setCentered("id")` | Pan to a specific node |
| `.addNode(node)` | Add a node dynamically |
| `.onNodeClick(fn)` | Handle click events |
| `.compact(true)` | Switch to compact layout |

---

## Slide 8 — React Integration

**Heading:** Plugging into React — useRef + useEffect

```tsx
import { useRef, useEffect } from "react";
import OrgChart from "d3-org-chart";

export function OrgChartComponent({ data }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<OrgChart | null>(null);

  useEffect(() => {
    if (!containerRef.current || !data.length) return;

    chartRef.current = new OrgChart()
      .container(containerRef.current)
      .data(data)
      .nodeContent((d) => nodeTemplate(d.data))
      .render();
  }, [data]);

  return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
}
```

**Two refs:** one for the DOM container, one to keep the chart instance for later method calls (search, zoom, etc.)

---

## Slide 9 — Custom Node Template

**Heading:** nodeContent — Your Design, Your Rules

```typescript
function nodeTemplate(employee: EmployeeNode): string {
  const initials = employee.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return `
    <div style="
      background: white;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    ">
      <div style="
        width: 40px; height: 40px;
        border-radius: 50%;
        background: #4f46e5;
        color: white;
        display: flex; align-items: center; justify-content: center;
        font-weight: 600; font-size: 14px;
      ">${initials}</div>
      <div>
        <div style="font-weight: 600; font-size: 14px;">${employee.displayName}</div>
        <div style="color: #6b7280; font-size: 12px;">${employee.jobTitle}</div>
        <span style="
          background: #ede9fe; color: #5b21b6;
          border-radius: 999px; padding: 2px 8px; font-size: 11px;
        ">${employee.department}</span>
      </div>
    </div>
  `;
}
```

**Tip:** This is just a string — you can template anything. Inject status dots, action buttons, avatars, badges.

---

## Slide 10 — Live Demo

**Heading:** Demo Time

> Switch to browser

**What we'll walk through:**
1. The chart renders 50 employees across 4 departments
2. Zoom / pan / fit to screen
3. Expand and collapse department subtrees
4. Search by name or job title
5. Click a card → employee detail drawer
6. Add a new employee to any team

---

## Slide 11 — Advanced Use Cases

**Heading:** Going Further

- **Compact layout** — `.compact(true)` for wide, flat orgs
- **Multi-root workaround** — add a hidden virtual root node (`display: none` in nodeContent)
- **Deep hierarchies** — tested and optimized for 50+ levels
- **Dynamic data** — call `.addNode()` / `.updateNode()` after API responses
- **Export** — `chart.exportImg({ full: true })` downloads the entire chart as PNG
- **Themes** — pass a theme object or use the 7 built-ins

---

## Slide 12 — Q&A + Resources

**Heading:** Resources & Links

| Resource | Link |
|----------|------|
| GitHub | github.com/bumbeishvili/org-chart |
| npm | npmjs.com/package/d3-org-chart |
| StackBlitz React starter | (search "d3-org-chart react" on StackBlitz) |
| This demo repo | [your repo link] |

**Questions?**
