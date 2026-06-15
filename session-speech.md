# d3-org-chart — Session Speech Script

> **How to use this:** Read through the whole thing once to understand the concepts yourself.
> Then use it as a loose script — you don't need to memorize it word for word.
> The sections in [brackets] are stage directions for you, not spoken aloud.

---

## PART 1 — Opening Hook (2 min)

"Let me start with a question.

Imagine you're a new joiner at a company with 300 people. Your manager tells you:
*'Go figure out who the VP of Engineering reports to, and who's on their team.'*

You could open a spreadsheet. You'd scroll through 300 rows, filter by department,
cross-reference manager names... and ten minutes later you're still not sure.

Or — you could open an org chart. One glance and you see the entire reporting structure.
That's the problem d3-org-chart solves. And today I'm going to show you exactly how it works —
and how to build one yourself in a React app in about 30 minutes."

---

## PART 2 — The Linked List Analogy (5 min)

> [This section is the core concept explanation. Take your time here.]

"Before we look at the library, I want to build some intuition using a data structure
you probably already know — the **linked list**.

In a linked list, every node has two things:
- A **value** — the data it holds
- A **pointer** — a reference to the next node

```
[ Node A ] → [ Node B ] → [ Node C ] → null
```

Each node knows about the next one. That's how you traverse the list.

Now, what if instead of pointing to just *one* next node,
each node could point to *multiple* children?

```
              [ CEO ]
             /       \
         [ VP Eng ] [ VP Sales ]
        /    \
  [Manager] [Manager]
```

That's a **tree**. Same idea as a linked list — each node has a value and references
to other nodes — but now a node can have *many* children instead of just one.

Here's the key insight that makes d3-org-chart elegant:

**You don't give it a tree. You give it a flat list — and it builds the tree for you.**

Think of it like this — instead of building the linked list manually by connecting nodes,
you give each node a name tag and a 'reports to' badge:

```
Name tag:    'James Patel'
Reports to:  'Sarah Chen'
```

Every employee in our data has:
- An **id** — their unique name tag
- A **parentId** — the id of who they report to

```typescript
// This is ALL the structure the library needs:
{ id: '2', parentId: '1', name: 'James Patel', title: 'VP Engineering' }
{ id: '1', parentId: null, name: 'Sarah Chen', title: 'CEO' }
```

Notice `parentId: null` on the CEO — that means 'I report to nobody. I'm the root.'

Internally, d3-org-chart takes this flat array and calls D3's `stratify()` function,
which is essentially building the linked list connections for you — reading each
parentId and wiring up the parent → child pointers.

So the mental model is:

```
Your flat array  →  stratify()  →  Tree of linked nodes  →  SVG on screen
```

You only manage the flat array. The library handles everything else."

---

## PART 3 — What the Library Does For You (3 min)

"Once it has that tree, d3-org-chart does a *lot* of work you'd otherwise have to build yourself.

**Layout calculation** — it figures out where to position every node so the chart
looks good. This is actually a hard problem — if a VP has 8 direct reports, how do you
space them so they don't overlap? The library uses a flex-tree algorithm to handle this.

**SVG rendering** — every node becomes a `foreignObject` element inside an SVG,
which is what lets you put actual HTML — your custom card design — inside the chart.

**Zoom and pan** — powered by D3's zoom behavior. You get smooth pinch-to-zoom
and drag-to-pan for free.

**Expand and collapse** — when you click to hide a subtree, the library doesn't delete
nodes from the DOM — it toggles their visibility and recalculates positions with animation.
The hidden nodes are stored in `_children` instead of `children`, which is the classic
D3 collapsible tree pattern.

**The one thing you control** — is the `.nodeContent()` function.
This is where you return an HTML string that becomes the content of each card.
The library renders it, positions it, handles events — you just design it."

---

## PART 4 — Live Setup Walkthrough (3 min)

"Let me show you how few lines it takes to get this running.

**Step 1 — Install:**
```bash
npm install d3-org-chart d3
```

**Step 2 — Your data** — a flat array, exactly like we discussed:
```typescript
const employees = [
  { id: '1', parentId: null,  name: 'Sarah Chen',  title: 'CEO'           },
  { id: '2', parentId: '1',   name: 'James Patel', title: 'VP Engineering' },
  { id: '3', parentId: '1',   name: 'Priya Nair',  title: 'VP Sales'       },
  { id: '4', parentId: '2',   name: 'Kevin Zhang', title: 'Eng Manager'    },
];
```

**Step 3 — React component** — this is the entire integration:
```typescript
import { useRef, useEffect } from 'react';
import { OrgChart } from 'd3-org-chart';

export function OrgChartComponent({ data }) {
  const containerRef = useRef(null);   // ← points to the DOM div
  const chartRef = useRef(null);       // ← holds the chart instance

  useEffect(() => {
    chartRef.current = new OrgChart()
      .container(containerRef.current) // WHERE to render
      .data(data)                       // WHAT to render
      .nodeContent(d => `              // HOW each card looks
        <div style='padding: 10px'>
          <strong>${d.data.name}</strong>
          <div>${d.data.title}</div>
        </div>
      `)
      .render();
  }, []);   // ← runs once on mount

  return <div ref={containerRef} style={{ height: '600px' }} />;
}
```

That's it. Four method calls. The chart renders, zooms, pans, and collapses
out of the box from those four lines."

---

## PART 5 — The Demo (20 min)

> [Switch to the browser. Open localhost:5173 or the deployed app.]

"Now let me show you the actual app we built. It has 50 employees
across Engineering, Sales, HR, and Operations — four levels deep.

---

### Demo Step 1 — Initial render

'When the page loads, the chart auto-fits to the container.
Notice it starts with only the first two levels expanded —
that's controlled by `initialExpandLevel`.
The library calculated all the positions and spacing automatically.'

---

### Demo Step 2 — Zoom and pan

[Scroll to zoom in, drag to pan]

'Scroll wheel to zoom. Click and drag to pan.
This is D3's zoom behavior — we get it for free.
We also have toolbar buttons for Zoom In, Zoom Out, and Fit.'

[Click Fit button]

'Fit snaps back to show the whole chart.'

---

### Demo Step 3 — Layout directions

[Click the ↓ Top, → Left, ← Right, ↑ Bottom buttons]

'The library supports four layout directions.
One property change — `chart.layout(\"left\")` — and the whole tree
re-orients with animation. Great for wide organizations or horizontal displays.'

---

### Demo Step 4 — Compact mode

[Toggle Compact button]

'Compact mode packs nodes more densely — useful when you have
wide hierarchies with many siblings. Toggle it off and on.
Notice how the spacing and arrangement changes.'

---

### Demo Step 5 — Expand and collapse

[Click a VP node's expand/collapse button]

'Click the button on any node to expand or collapse its subtree.
The library stores collapsed children in `_children` — that's
the same pattern you'd implement manually in a linked list to
\"detach\" a branch without losing the data.'

[Click Expand All, then Collapse All]

'Expand All and Collapse All are single method calls —
`chart.expandAll()` and `chart.collapseAll()`.'

---

### Demo Step 6 — Search

[Type 'engineer' in the search box]

'The search highlights matching nodes. Under the hood,
we find the matching employee in our flat array, then call
`chart.setHighlighted(id)` and `chart.setCentered(id)`
to both highlight and navigate to that node.'

[Clear the search]

---

### Demo Step 7 — Node click → detail drawer

[Click any employee card]

'Clicking a card opens this detail drawer.
The `onNodeClick` callback receives the full data object —
same shape as what we put in the flat array.
React handles rendering this panel — the library just fires the event.'

---

### Demo Step 8 — Show Reporting Path

[With drawer open, click 'Show Reporting Path to Root']

'This is one of my favourite features — `setUpToTheRootHighlighted()`.
It highlights the clicked node and every ancestor up to the CEO.
Visually shows the chain of command — who does this person ultimately report to?
This is essentially traversing a linked list from a leaf node back to the root.'

---

### Demo Step 9 — Add Employee

[Close drawer, click + Add, fill in a new employee]

'We fill in a form and call `chart.addNode()` — the node appears
in the chart with animation. No re-render, no page reload.
The library inserts it into the D3 hierarchy and updates positions.'

---

### Demo Step 10 — Remove Employee

[Click an employee → Remove Employee → Confirm]

'And `chart.removeNode(id)` removes it. Notice the CEO has no Remove button —
we check `parentId === null` and hide the option for the root node,
because a tree without a root is no longer a tree.'

---

### Demo Step 11 — Export PNG

[Click ↓ Export PNG]

'`chart.exportImg({ full: true, scale: 3 })` — exports the entire chart
as a high-resolution PNG, even the parts that are off-screen.
One method call.'

---

### Demo Step 12 — Fullscreen

[Click ⛶ Fullscreen]

'And fullscreen — `chart.fullscreen()` — expands the chart to fill the browser.
Perfect for presentations or walkthroughs with stakeholders.'

---

## PART 6 — Code Peek (5 min)

> [Open the code editor or GitHub. Show two files.]

**File 1: `src/components/OrgChart/index.tsx`**

'Three things to notice:
1. `containerRef` — a plain div, nothing special. This is where the SVG mounts.
2. `chartRef` — holds the OrgChart instance so Toolbar buttons can call methods later.
3. The `useEffect` with empty deps `[]` — runs once on mount. We never recreate
   the chart from scratch; all updates are imperative via the chart instance.
   This is important — if you put `data` in the deps array, the chart recreates
   every time data changes and you lose zoom state.'

**File 2: `src/components/OrgChart/nodeTemplate.ts`**

'This function receives one argument — the employee object —
and returns an HTML string. No JSX, just a template literal.
The library injects this string into a `foreignObject` inside the SVG.

The avatar initials:
```typescript
name.split(\" \").map(n => n[0]).join(\"\")
// \"Sarah Chen\" → [\"S\", \"C\"] → \"SC\"
```

The department badge color — a lookup table by department name.
You can make this as complex as you want — inline styles, CSS classes,
data attributes. The library renders it exactly as you return it.'

---

## PART 7 — Key Takeaways (2 min)

'Let me leave you with four things to remember:

**One** — The data model is just a flat array with `id` and `parentId`.
Think of it as a linked list where each node says who its parent is.
The library builds the tree from that.

**Two** — `.nodeContent()` is your canvas. You return HTML, the library handles layout,
zoom, events, and animation. Your design system, your rules.

**Three** — Keep one chart instance alive (store in `useRef`).
All interactions — zoom, highlight, add, remove — are method calls on that instance.
Don't recreate the chart on every data change.

**Four** — It handles the hard parts — flex-tree layout, SVG foreignObject, D3 zoom,
expand/collapse state, export. You handle the data and the card design.
That's a good trade.'

---

## Q&A Prep

**Q: Can I use it with real API data?**
> Yes. Fetch your data, store it in state, pass it to `.data()` on init.
> For live updates, use `.addNode()`, `.removeNode()`, `.updateNode()`.

**Q: What if someone has two managers? (Multiple parents)**
> d3-org-chart is a strict tree — one parent per node.
> For matrix orgs or DAGs, you'd need a different approach, like a force-directed graph.
> You can fake secondary relationships using the `connections` feature — it draws
> a line between any two nodes — but structurally each node still has one parent.

**Q: How does it perform with 1000+ employees?**
> Tested up to ~1000 nodes without issues. For larger datasets, enable compact mode
> and use `initialExpandLevel: 1` so most nodes start collapsed.
> Above ~2000 nodes you'd want server-side pagination and lazy-loading subtrees.

**Q: Can I use it without React?**
> Yes — it's framework-agnostic. Just call `.container('#my-div').data(array).render()`.
> Works with Vue, Angular, or plain HTML.

**Q: TypeScript support?**
> Install `@types/d3-org-chart`. The `OrgChart` class is generic — `OrgChart<YourType>`
> gives you typed `.data()`, `.nodeContent()`, and callback arguments.
