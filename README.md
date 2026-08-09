# Bridging Hearts Bereavement Support Group
## Interactive Mind Map & Task Management System — v2.0

> A browser-based organizational planning and task management tool for **Bridging Hearts Bereavement Support Group** — a New Hampshire nonprofit providing grief support to families.
> Built with plain HTML, CSS, and JavaScript. No frameworks, no server, no installation required.

---

## 📁 Repository Contents

| File | Version | Description |
|---|---|---|
| `BridgingHearts_EditableMap.html` | ⭐ v2.0 — **Current** | Fully editable mind map with node add/delete/rename/reorder, JSON import/export, and task management |
| `BridgingHearts_TaskMap.html` | v1.0 — Baseline | Original interactive mind map with task panel and CSV export |
| `BridgingHearts_Interactive_MindMap.html` | v1.0 | Mind map with branches dropdown legend (no task panel) |
| `BridgingHearts_MindMap.html` | v1.0 | Original interactive mind map |
| `BridgingHearts_Markmap.md` | — | Source content in Markmap markdown format |
| `BridgingHearts_AppsScript.gs` | — | Google Apps Script for importing tasks into Google Sheets |
| `index.html` | — | GitHub Pages entry point — redirects to the current version |

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
1. Download `BridgingHearts_EditableMap.html`
2. Open it in any modern browser (Chrome, Firefox, Safari, Edge)
3. That's it — no internet connection required after the page loads

### Navigation
| Action | How |
|---|---|
| **Pan** | Click and drag the canvas |
| **Zoom** | Scroll wheel |
| **Expand / collapse a branch** | Left-click any node |
| **Open node options** | Right-click any node |
| **Toggle branches** | Use the Branches dropdown in the top bar |
| **Expand all** | "Expand All" button |
| **Return to overview** | "Overview" button |
| **Reset pan/zoom** | "Reset View" button |

---

## ✏️ Editing the Mind Map (v2.0)

`BridgingHearts_EditableMap.html` is a fully editable mind map. Right-click any node to access the context menu:

| Option | What it does |
|---|---|
| ✏️ **Rename** | Opens an inline text editor directly on the node. Press **Enter** to save, **Shift+Enter** for a new line, **Escape** to cancel |
| ➕ **Add Child Node** | Creates a new child node and opens the inline editor immediately |
| ↪️ **Add Sibling Below** | Creates a new node at the same level, directly below the current one |
| 📋 **Edit Task / Notes** | Opens the task panel to add status, priority, owner, due date, and notes |
| ⬆️ **Move Up** | Moves the node one position up among its siblings |
| ⬇️ **Move Down** | Moves the node one position down among its siblings |
| 🗑️ **Delete Node** | Deletes the node and all its children after confirmation |

> **Note:** The root node (Bridging Hearts) cannot be deleted or moved.

---

## 💾 Saving & Restoring Your Work (JSON)

> ⚠️ The mind map runs entirely in the browser. Changes are **not automatically saved** — always export before closing.

### Save your session
1. Click **Save JSON** in the top bar
2. A dated file downloads: `BridgingHearts_MindMap_2026-08-09.json`
3. Store this file in a safe location (Google Drive recommended)

### Restore a previous session
1. Click **Import JSON** in the top bar
2. Click to browse or drag-and-drop your saved `.json` file into the modal
3. The full map — including all nodes, structure, and tasks — is restored exactly

### What the JSON file contains
- Complete node tree (all branches, names, hierarchy, links)
- All task data (status, priority, owner, due date, notes)
- Collapse/expand state of each branch

---

## ✅ Task Management

Right-click any node → **Edit Task / Notes** to open the task panel.

### Task fields
| Field | Options |
|---|---|
| **Status** | To Do / In Progress / Done |
| **Priority** | High / Medium / Low |
| **Owner** | Free text — e.g. Amy Lin |
| **Due Date** | Date picker |
| **Notes** | Free text — context, links, decisions |

### Visual indicators on the map
- Nodes with saved tasks show a **teal glow ring**
- A **colored status dot** appears in the top-right corner of the node (amber = To Do, teal = In Progress, green = Done)
- The top bar displays a live **task count badge**
- Hovering over any tasked node shows a **summary tooltip**

---

## 📊 Google Sheets Integration

### Export tasks to a CSV
1. Click **Export Tasks** in the top bar
2. A CSV file downloads: `BridgingHearts_Tasks_2026-08-09.csv`
3. Import into Google Sheets using the Apps Script menu (see below)

### Google Apps Script setup (one time)
1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any placeholder code and paste the full contents of `BridgingHearts_AppsScript.gs`
4. Click **Save (💾)** and reload the Sheet
5. A **🌿 Mind Map** menu appears — click **Set Up Sheet** once to create headers and formatting

### Ongoing workflow
```
Mind Map → right-click node → Edit Task / Notes → Save Task
         → Export Tasks (downloads CSV)
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
- **Palette:** Warm parchment background (`#f7f4ef`) with 11 distinct branch colors
- **Layout:** Horizontal tree rendered with [D3.js v7](https://d3js.org/) (loaded from CDN)
- **Architecture:** Pure HTML/CSS/JS — single-file, no frameworks, no server required

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

## 📌 Version History

| Version | File | Key Changes |
|---|---|---|
| v2.0 | `BridgingHearts_EditableMap.html` | Add/delete/rename/reorder nodes · Inline editor · JSON import/export · Right-click context menu |
| v1.0 | `BridgingHearts_TaskMap.html` | Task panel · Status/priority/owner/due/notes · CSV export · Branches dropdown |
| v0.1 | `BridgingHearts_MindMap.html` | Original read-only interactive mind map |

---

## 🏢 About Bridging Hearts

**Bridging Hearts Bereavement Support Group** is a New Hampshire-based nonprofit providing grief support to families. Support group meetings are held on Mondays and Fridays. The organization operates on a free/donation model.

- 📧 info@bridgingheartsnh.org

---

*v2.0 · August 2026 · Built with Claude (Anthropic)*
