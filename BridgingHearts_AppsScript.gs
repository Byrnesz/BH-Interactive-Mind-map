/**
 * ═══════════════════════════════════════════════════════════════════
 * Bridging Hearts — Mind Map Task Importer
 * Google Apps Script  |  Paste into: Extensions → Apps Script
 * ═══════════════════════════════════════════════════════════════════
 *
 * SETUP (one time only):
 *   1. Open your Google Sheet.
 *   2. Go to Extensions → Apps Script.
 *   3. Delete any placeholder code.
 *   4. Paste this entire script and click 💾 Save.
 *   5. Reload your Sheet — a new "🌿 Mind Map" menu will appear.
 *   6. Click "🌿 Mind Map" → "Set Up Sheet" once to create headers & formatting.
 *
 * ONGOING WORKFLOW:
 *   • In the mind map HTML file: right-click any node → fill in the task
 *     panel → Save Task → repeat for as many nodes as you like.
 *   • Click "Export to Sheets" → a CSV file downloads.
 *   • In your Google Sheet: "🌿 Mind Map" → "Import CSV" → select the file.
 *   • Tasks are added/updated by Task name (no duplicates).
 *
 * ═══════════════════════════════════════════════════════════════════
 */

// ── CONFIG ─────────────────────────────────────────────────────
const SHEET_NAME  = 'Tasks';
const BRAND_COLOR = '#3d7a6e';   // Bridging Hearts teal
const HEADER_ROW  = 1;

const COLUMNS = {
  TASK:     1,   // A — Task / Item
  BRANCH:   2,   // B — Branch
  STATUS:   3,   // C — Status
  PRIORITY: 4,   // D — Priority
  OWNER:    5,   // E — Owner
  DUE:      6,   // F — Due Date
  NOTES:    7,   // G — Notes
  SAVED_ON: 8,   // H — Saved On
  IMPORTED: 9    // I — Imported At (added by this script)
};

const STATUS_COLORS = {
  'To Do':       { bg: '#fdf3e7', fg: '#8a5a2e' },
  'In Progress': { bg: '#e8f5f2', fg: '#3d7a6e' },
  'Done':        { bg: '#eaf5ea', fg: '#3d6e3d' }
};

const PRIORITY_COLORS = {
  'High':   { bg: '#fdeaea', fg: '#a03e3e' },
  'Medium': { bg: '#fdf6e7', fg: '#8a7030' },
  'Low':    { bg: '#eaf5ea', fg: '#3d6e3d' }
};

// ── MENU ────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🌿 Mind Map')
    .addItem('📋 Set Up Sheet',        'setupSheet')
    .addSeparator()
    .addItem('📥 Import CSV',          'importCSV')
    .addSeparator()
    .addItem('🎨 Reformat All Rows',   'reformatAllRows')
    .addItem('🗑️  Clear All Tasks',    'clearAllTasks')
    .addToUi();
}

// ── SET UP SHEET ─────────────────────────────────────────────────
function setupSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // ── Header row ──────────────────────────────────────────────
  const headers = [
    'Task / Item', 'Branch', 'Status', 'Priority',
    'Owner', 'Due Date', 'Notes', 'Saved On', 'Imported At'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Header styling
  const hRange = sheet.getRange(1, 1, 1, headers.length);
  hRange.setBackground(BRAND_COLOR)
        .setFontColor('#ffffff')
        .setFontWeight('bold')
        .setFontSize(11)
        .setFontFamily('Georgia')
        .setVerticalAlignment('middle')
        .setHorizontalAlignment('center')
        .setWrap(true);
  sheet.setRowHeight(1, 36);

  // ── Column widths ───────────────────────────────────────────
  sheet.setColumnWidth(COLUMNS.TASK,     260);
  sheet.setColumnWidth(COLUMNS.BRANCH,   160);
  sheet.setColumnWidth(COLUMNS.STATUS,   110);
  sheet.setColumnWidth(COLUMNS.PRIORITY, 90);
  sheet.setColumnWidth(COLUMNS.OWNER,    130);
  sheet.setColumnWidth(COLUMNS.DUE,      100);
  sheet.setColumnWidth(COLUMNS.NOTES,    280);
  sheet.setColumnWidth(COLUMNS.SAVED_ON, 100);
  sheet.setColumnWidth(COLUMNS.IMPORTED, 130);

  // ── Freeze header row ────────────────────────────────────────
  sheet.setFrozenRows(1);

  // ── Sheet tab color ──────────────────────────────────────────
  sheet.setTabColor(BRAND_COLOR);

  // ── Alternating row banding (applied after data is added) ───
  // Done on import instead so it covers actual data rows

  SpreadsheetApp.getUi().alert(
    '✅ Sheet ready!\n\n' +
    'Next steps:\n' +
    '1. In your mind map, right-click nodes to add tasks.\n' +
    '2. Click "Export to Sheets" to download a CSV.\n' +
    '3. Come back here: 🌿 Mind Map → Import CSV.'
  );
}

// ── IMPORT CSV ──────────────────────────────────────────────────
function importCSV() {
  const ui   = SpreadsheetApp.getUi();
  const html = HtmlService.createHtmlOutput(importDialogHTML())
    .setWidth(420)
    .setHeight(260);
  ui.showModalDialog(html, '📥 Import Mind Map CSV');
}

function importDialogHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Georgia, serif; padding: 20px; color: #1c1a17; }
  h2 { font-size: 16px; color: #3d7a6e; margin-bottom: 6px; }
  p { font-size: 12px; color: #7a7570; margin-bottom: 16px; line-height: 1.5; }
  input[type=file] { font-size: 12px; margin-bottom: 16px; }
  .btns { display: flex; gap: 10px; }
  button {
    padding: 8px 20px; border-radius: 6px; border: none; cursor: pointer;
    font-family: Georgia, serif; font-size: 13px; font-weight: bold;
  }
  .primary { background: #3d7a6e; color: #fff; }
  .primary:hover { background: #2d5a52; }
  .secondary { background: #f7f4ef; color: #1c1a17; border: 1px solid #e0dbd3; }
  #status { font-size: 11px; color: #3d7a6e; margin-top: 10px; }
</style>
</head>
<body>
<h2>Import Tasks from Mind Map</h2>
<p>Select the CSV file downloaded from the mind map.<br>
   Existing tasks with the same name will be updated; new ones will be added.</p>
<input type="file" id="csvFile" accept=".csv"/>
<div class="btns">
  <button class="primary" onclick="submit()">Import</button>
  <button class="secondary" onclick="google.script.host.close()">Cancel</button>
</div>
<div id="status"></div>
<script>
function submit() {
  const file = document.getElementById('csvFile').files[0];
  if (!file) { document.getElementById('status').textContent = '⚠ Please select a CSV file.'; return; }
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('status').textContent = 'Uploading…';
    google.script.run
      .withSuccessHandler(msg => {
        document.getElementById('status').textContent = msg;
        setTimeout(() => google.script.host.close(), 1800);
      })
      .withFailureHandler(err => {
        document.getElementById('status').textContent = '❌ Error: ' + err.message;
      })
      .processCSVData(e.target.result);
  };
  reader.readAsText(file);
}
<\/script>
</body>
</html>`;
}

// ── PROCESS CSV DATA ─────────────────────────────────────────────
function processCSVData(csvText) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }

  const rows    = parseCSV(csvText);
  if (rows.length < 2) return '⚠ CSV appears empty or invalid.';

  const dataRows  = rows.slice(1); // skip header
  const now       = new Date().toLocaleString();
  let   added     = 0;
  let   updated   = 0;

  // Build index of existing task names → row numbers
  const lastRow   = sheet.getLastRow();
  const existing  = {};
  if (lastRow >= 2) {
    const taskNames = sheet.getRange(2, COLUMNS.TASK, lastRow - 1, 1).getValues();
    taskNames.forEach((r, i) => {
      if (r[0]) existing[r[0].toString().trim().toLowerCase()] = i + 2;
    });
  }

  dataRows.forEach(row => {
    // CSV columns: Task, Branch, Status, Priority, Owner, Due, Notes, SavedOn
    const [task, branch, status, priority, owner, due, notes, savedOn] = row;
    if (!task) return;

    const key     = task.toString().trim().toLowerCase();
    const rowData = [task, branch, status, priority, owner, due, notes, savedOn, now];

    if (existing[key]) {
      // Update existing row
      const r = existing[key];
      sheet.getRange(r, 1, 1, rowData.length).setValues([rowData]);
      formatDataRow(sheet, r, status, priority);
      updated++;
    } else {
      // Append new row
      const newRow = sheet.getLastRow() + 1;
      sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
      formatDataRow(sheet, newRow, status, priority);
      added++;
    }
  });

  // Auto-resize notes column after import
  sheet.autoResizeColumn(COLUMNS.NOTES);

  return `✅ Done! ${added} added, ${updated} updated.`;
}

// ── FORMAT A DATA ROW ────────────────────────────────────────────
function formatDataRow(sheet, rowNum, status, priority) {
  const totalCols = 9;
  const rowRange  = sheet.getRange(rowNum, 1, 1, totalCols);

  // Base row style
  const rowBg = rowNum % 2 === 0 ? '#faf8f5' : '#ffffff';
  rowRange.setBackground(rowBg)
          .setFontSize(10)
          .setFontFamily('Arial')
          .setVerticalAlignment('middle')
          .setWrap(true);
  sheet.setRowHeight(rowNum, 28);

  // Status cell
  const sc = STATUS_COLORS[status] || { bg: '#f7f4ef', fg: '#7a7570' };
  const statusCell = sheet.getRange(rowNum, COLUMNS.STATUS);
  statusCell.setBackground(sc.bg)
            .setFontColor(sc.fg)
            .setFontWeight('bold')
            .setHorizontalAlignment('center');

  // Priority cell
  const pc = PRIORITY_COLORS[priority] || { bg: '#f7f4ef', fg: '#7a7570' };
  const priCell = sheet.getRange(rowNum, COLUMNS.PRIORITY);
  priCell.setBackground(pc.bg)
         .setFontColor(pc.fg)
         .setFontWeight('bold')
         .setHorizontalAlignment('center');

  // Task name bold
  sheet.getRange(rowNum, COLUMNS.TASK).setFontWeight('bold');

  // Due date center-aligned
  sheet.getRange(rowNum, COLUMNS.DUE).setHorizontalAlignment('center');
  sheet.getRange(rowNum, COLUMNS.SAVED_ON).setHorizontalAlignment('center');
  sheet.getRange(rowNum, COLUMNS.IMPORTED).setHorizontalAlignment('center')
       .setFontColor('#aaaaaa').setFontSize(9);
}

// ── REFORMAT ALL ROWS ────────────────────────────────────────────
function reformatAllRows() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) { SpreadsheetApp.getUi().alert('Sheet "' + SHEET_NAME + '" not found. Run Set Up first.'); return; }

  const last = sheet.getLastRow();
  if (last < 2) { SpreadsheetApp.getUi().alert('No data rows to format yet.'); return; }

  const data = sheet.getRange(2, 1, last - 1, 9).getValues();
  data.forEach((row, i) => {
    formatDataRow(sheet, i + 2, row[COLUMNS.STATUS - 1], row[COLUMNS.PRIORITY - 1]);
  });

  SpreadsheetApp.getUi().alert('✅ All rows reformatted.');
}

// ── CLEAR ALL TASKS ──────────────────────────────────────────────
function clearAllTasks() {
  const ui    = SpreadsheetApp.getUi();
  const resp  = ui.alert(
    'Clear all tasks?',
    'This will delete all task rows (the header row stays). This cannot be undone.',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const last = sheet.getLastRow();
  if (last >= 2) sheet.deleteRows(2, last - 1);
  ui.alert('✅ All task rows cleared.');
}

// ── CSV PARSER (handles quoted fields with commas/newlines) ──────
function parseCSV(text) {
  const rows   = [];
  let   row    = [];
  let   field  = '';
  let   inQ    = false;

  for (let i = 0; i < text.length; i++) {
    const ch   = text[i];
    const next = text[i + 1];

    if (inQ) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"')            { inQ = false; }
      else                            { field += ch; }
    } else {
      if      (ch === '"')  { inQ = true; }
      else if (ch === ',')  { row.push(field.trim()); field = ''; }
      else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        row.push(field.trim()); rows.push(row);
        row = []; field = '';
        if (ch === '\r') i++;
      } else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  return rows.filter(r => r.some(c => c));
}
