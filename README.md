# Bridging Hearts Bereavement Support Group
## Interactive Mind Map & Task Management System

> A browser-based organizational planning tool for **Bridging Hearts Bereavement Support Group** — a New Hampshire nonprofit providing grief support to families.
> Built with plain HTML, CSS, and JavaScript. No frameworks, no server, no installation required.

---

## 📁 Repository Contents

| File | Description |
|---|---|
| `BridgingHearts_TaskMap.html` | ⭐ Primary file — interactive mind map with full task management panel |
| `BridgingHearts_Interactive_MindMap.html` | Mind map with branches dropdown legend (no task panel) |
| `BridgingHearts_MindMap.html` | Original interactive mind map |
| `BridgingHearts_Markmap.md` | Source content in Markmap markdown format |
| `BridgingHearts_AppsScript.gs` | Google Apps Script for importing tasks into Google Sheets |

---

## 🗺️ Mind Map Overview

The mind map covers the full forward-looking work outline for organizational formation and operations, organized into **11 branches**:

1. **Info** — organization identity and purpose
2. **Organizational Planning** — legal formation & governance
3. **Policies & Compliance** — core, operational, and HR policies
4. **Finance & Accounting** — income, budgeting, and banking controls
5. **Operations** — programs, staffing, and facilities
6. **Communications & Community Ties** — external/internal comms and marketing
7. **Teams & Committees** — standing committees and reporting structure
8. **Risk Management & Best Practices** — insurance, privacy, compliance
9. **Systems & Tools** — software and platform needs
10. **Next Steps / Action Items** — prioritized action list
11. **Questions / Open Items** — decisions still pending

---

## 🚀 Getting Started

All files are single-file HTML — no build step, no dependencies to install.

### Open the mind map
1. Download `BridgingHearts_TaskMap.html`
2. Open it in any modern browser (Chrome, Firefox, Safari, Edge)
3. That's it — no internet connection required after the page loads

### Navigation
| Action | How |
|---|---|
| **Pan** | Click and drag the canvas |
| **Zoom** | Scroll wheel |
| **Expand / collapse a branch** | Left-click any node |
| **Add / edit a task** | Right-click any node |
| **Toggle branches** | Use the Branches dropdown in the top bar |
| **Expand all** | "Expand All" button |
| **Return to overview** | "Overview" button |
| **Reset pan/zoom** | "Reset View" button |

---

## ✅ Task Management

The **Task Map** (`BridgingHearts_TaskMap.html`) adds a full task panel to every node.

### Adding a task
1. **Right-click** any node on the mind map
2. A panel slides in from the right with fields for:
   - **Status** — To Do / In Progress / Done
   - **Priority** — High / Medium / Low
   - **Owner / Assigned To**
   - **Due Date**
   - **Notes**
3. Click **Save Task**

### Visual indicators
- Nodes with saved tasks show a **teal glow ring** and a **colored status dot**
- The top bar displays a live **task count badge**
- Hovering over a tasked node shows a **summary tooltip**

### Exporting to Google Sheets
1. Click **Export to Sheets** in the top bar
2. A CSV file downloads (e.g. `BridgingHearts_Tasks_2026-03-18.csv`)
3. Open your Google Sheet and use the **🌿 Mind Map → Import CSV** menu

> ⚠️ **Note:** Tasks are stored in browser memory only and are lost on page refresh. Always export before closing.

---

## 📊 Google Sheets Integration

`BridgingHearts_AppsScript.gs` is a Google Apps Script that creates a formatted task tracker in Google Sheets.

### One-time setup
1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any placeholder code
4. Paste the entire contents of `BridgingHearts_AppsScript.gs`
5. Click **Save (💾)** and reload the Sheet
6. A **🌿 Mind Map** menu will appear — click **Set Up Sheet** once

### Ongoing workflow
```
Mind Map → right-click nodes → fill task panel → Save Task
         → Export to Sheets (downloads CSV)
         → Google Sheet → 🌿 Mind Map → Import CSV → select file
```

### Sheet menu options
| Menu item | What it does |
|---|---|
| 📋 Set Up Sheet | Creates headers, formatting, column widths — run once |
| 📥 Import CSV | Imports exported CSV; adds new rows, updates existing ones |
| 🎨 Reformat All Rows | Re-applies color coding if formatting gets disrupted |
| 🗑️ Clear All Tasks | Wipes all data rows (with confirmation prompt) |

---

## 🎨 Design

- **Typography:** Cormorant Garamond (headings) + Jost (body) via Google Fonts
- **Palette:** Warm parchment background with 11 distinct branch colors
- **Layout:** Horizontal tree rendered with [D3.js v7](https://d3js.org/) (loaded from CDN)
- **No frameworks** — pure HTML/CSS/JS, single-file architecture

---

## 🔗 Referenced Links

Links embedded in the mind map for key legal formation steps:

- [NH Articles of Incorporation](https://sos.nh.gov/corporation-division/forms/) — NH Secretary of State
- [NH Charitable Trust Form](https://doj.nh.gov/charitable-trusts/) — NH DOJ, Attorney General's Office

---

## 📋 Markmap Source

`BridgingHearts_Markmap.md` contains the full content in [Markmap](https://markmap.js.org/) format — useful for:
- Viewing in the [Markmap REPL](https://markmap.js.org/repl)
- Editing with the [Markmap VS Code extension](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode)
- Serving as a human-readable source of truth for the mind map content

---

## 🏢 About Bridging Hearts

**Bridging Hearts Bereavement Support Group** is a New Hampshire-based nonprofit providing grief support to families. Support group meetings are held on Mondays and Fridays. The organization operates on a free/donation model.

- 📧 info@bridgingheartsnh.org

---

*Draft 2026-02-02 · Built by: BYRNESZ with Claude (Anthropic)*
