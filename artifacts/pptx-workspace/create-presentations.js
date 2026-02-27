const pptxgen = require('/Users/loab/Documents/ai-coding-factory/projects/todo-app/artifacts/pptx-workspace/node_modules/pptxgenjs');
const fs = require('fs');
const path = require('path');

const BASE = '/Users/loab/Documents/ai-coding-factory/projects/todo-app/artifacts';
const DELIVERABLES = path.join(BASE, 'deliverables');
const WORKSPACE = path.join(BASE, 'pptx-workspace');

// Color palette: Tech blue + dark
const COLORS = {
  primary: '#1971c2',
  accent: '#339af0',
  dark: '#212529',
  mid: '#495057',
  light: '#f1f3f5',
  white: '#ffffff',
  green: '#2f9e44',
  orange: '#e67700',
  purple: '#862e9c',
  red: '#c92a2a'
};

const stories = [
  {
    id: 'US-01',
    title: 'Go Backend Scaffold',
    epic: 'EPIC-01 — Project Foundation & Infrastructure',
    points: 2,
    priority: 'Must Have',
    epicColor: COLORS.green,
    summary: 'Establish the Go + Gin + GORM backend with health check endpoint, auto-migrated SQLite database, and structured request logging.',
    criteria: [
      'Server starts on port 8080 with go run ./...',
      'GET /health returns 200 OK with {"status":"ok"}',
      'todos.db auto-created via GORM on first run',
      'Method, path, status, and latency logged to stdout'
    ],
    techStack: ['Go 1.21+', 'Gin HTTP framework', 'GORM ORM', 'SQLite (todos.db)'],
    screenshot: path.join(DELIVERABLES, 'US-01/screenshots/00-initial-load.png')
  },
  {
    id: 'US-02',
    title: 'React + TypeScript Frontend Scaffold',
    epic: 'EPIC-01 — Project Foundation & Infrastructure',
    points: 1,
    priority: 'Must Have',
    epicColor: COLORS.green,
    summary: 'Scaffold the React + TypeScript + Vite frontend with a dev server on port 3000, Todo App title, and clean TypeScript build.',
    criteria: [
      'Dev server starts on http://localhost:3000',
      'Browser shows "Todo App" title on load',
      'npm run build completes without TypeScript errors',
      'VITE_API_URL configures backend connection'
    ],
    techStack: ['React 18', 'TypeScript', 'Vite', 'ESLint'],
    screenshot: path.join(DELIVERABLES, 'US-02/screenshots/00-initial-load.png')
  },
  {
    id: 'US-03',
    title: 'Create a Todo',
    epic: 'EPIC-02 — Todo CRUD (Core Feature)',
    points: 3,
    priority: 'Must Have',
    epicColor: COLORS.orange,
    summary: 'Allow users to add new todos by typing in the input field and pressing Enter. Empty submissions are ignored. Todos persist in the database.',
    criteria: [
      'Typing + Enter creates todo if input is non-empty',
      'Empty input is ignored — no blank todos created',
      'New todo persists across page reloads (stored in DB)',
      'POST /todos returns 201 Created with new todo',
      'Input field clears after successful creation'
    ],
    techStack: ['React state', 'POST /todos API', 'SQLite persistence'],
    screenshot: path.join(DELIVERABLES, 'US-03/screenshots/02-list-three-todos.png')
  },
  {
    id: 'US-04',
    title: 'List All Todos',
    epic: 'EPIC-02 — Todo CRUD (Core Feature)',
    points: 2,
    priority: 'Must Have',
    epicColor: COLORS.orange,
    summary: 'Fetch and display all todos from the backend on app load, with a skeleton loader during fetch and an empty state message when the list is empty.',
    criteria: [
      'GET /todos returns all stored todos as an array',
      'Empty list shows "empty state" message',
      'Each todo displays title and completion status',
      'Skeleton loader shown while fetch is in progress'
    ],
    techStack: ['GET /todos API', 'Skeleton loading', 'React useEffect'],
    screenshot: path.join(DELIVERABLES, 'US-04/screenshots/02-list-three-todos.png')
  },
  {
    id: 'US-05',
    title: 'Complete / Uncomplete a Todo',
    epic: 'EPIC-02 — Todo CRUD (Core Feature)',
    points: 2,
    priority: 'Must Have',
    epicColor: COLORS.orange,
    summary: 'Toggle todo completion status via checkbox. Completed todos show strikethrough text. State persists across reloads via the backend.',
    criteria: [
      'Clicking checkbox marks todo as completed (strikethrough)',
      'Clicking completed checkbox toggles back to active',
      'Toggle state persists across page reloads',
      'PUT /todos/:id returns 404 for unknown IDs'
    ],
    techStack: ['PUT /todos/:id API', 'Checkbox toggle', 'SQLite update'],
    screenshot: path.join(DELIVERABLES, 'US-05/screenshots/03-complete-todo.png')
  },
  {
    id: 'US-06',
    title: 'Edit a Todo Title',
    epic: 'EPIC-02 — Todo CRUD (Core Feature)',
    points: 3,
    priority: 'Must Have',
    epicColor: COLORS.orange,
    summary: 'Double-click a todo title to enter inline edit mode. Save with Enter or blur; cancel with Escape. Empty edits are discarded.',
    criteria: [
      'Double-click title activates inline edit input',
      'Enter or click-away saves the new title',
      'Escape cancels edit and restores original title',
      'Empty title edit is cancelled (no empty todos)',
      'New title persists after page reload'
    ],
    techStack: ['PUT /todos/:id API', 'onDoubleClick handler', 'cancelledRef guard'],
    screenshot: path.join(DELIVERABLES, 'US-06/screenshots/06-edit-saved.png')
  },
  {
    id: 'US-07',
    title: 'Delete a Todo',
    epic: 'EPIC-02 — Todo CRUD (Core Feature)',
    points: 2,
    priority: 'Must Have',
    epicColor: COLORS.orange,
    summary: 'Delete a todo by hovering to reveal a delete button. The todo is removed immediately from the list and permanently from the database.',
    criteria: [
      'Clicking delete removes todo from the list immediately',
      'Backend confirms deletion — todo removed from DB',
      'DELETE /todos/:id returns 404 for unknown IDs',
      'Delete button only visible on hover (clean UI)'
    ],
    techStack: ['DELETE /todos/:id API', 'CSS hover reveal', 'SQLite delete'],
    screenshot: path.join(DELIVERABLES, 'US-07/screenshots/12-delete-todo.png')
  },
  {
    id: 'US-08',
    title: 'Filter Todos by Status',
    epic: 'EPIC-03 — Todo Organization & Filtering',
    points: 2,
    priority: 'Should Have',
    epicColor: COLORS.purple,
    summary: 'Filter the todo list by All, Active, or Completed status using the footer filter bar. The active filter is visually highlighted.',
    criteria: [
      '"Active" filter shows only incomplete todos',
      '"Completed" filter shows only done todos',
      '"All" filter shows every todo',
      'Active filter is visually highlighted in the UI'
    ],
    techStack: ['React state filtering', 'Footer filter bar', 'CSS highlight'],
    screenshot: path.join(DELIVERABLES, 'US-08/screenshots/09-filter-active.png')
  },
  {
    id: 'US-11',
    title: 'Loading & Error States',
    epic: 'EPIC-04 — User Experience Polish',
    points: 3,
    priority: 'Should Have',
    epicColor: COLORS.red,
    summary: 'Show skeleton loaders during data fetch, toast notifications for API errors, auto-dismiss after 4 seconds, and disable action buttons during in-flight requests.',
    criteria: [
      'Skeleton loader shown while fetching todos',
      'Toast notification appears on any API failure',
      'Toast auto-dismisses after 4 seconds',
      'Action buttons disabled during pending mutations'
    ],
    techStack: ['Skeleton CSS animation', 'Toast component', 'React loading state'],
    screenshot: path.join(DELIVERABLES, 'US-11/screenshots/00-initial-load.png')
  }
];

async function createStoryPresentation(story) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI Coding Factory';
  pptx.title = `${story.id} — ${story.title}`;

  // === SLIDE 1: Title ===
  const slide1 = pptx.addSlide();
  // Background
  slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 7.5, fill: { color: '1971c2' } });
  slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 2.3, fill: { color: '1557a0' } });
  // Story ID badge
  slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.4, w: 1.5, h: 0.5, fill: { color: 'ffffff' }, rectRadius: 0.1 });
  slide1.addText(story.id, { x: 0.5, y: 0.4, w: 1.5, h: 0.5, color: '1971c2', bold: true, fontSize: 14, align: 'center', valign: 'middle' });
  // Main title
  slide1.addText(story.title, { x: 0.5, y: 1.2, w: 9, h: 1.8, color: 'FFFFFF', bold: true, fontSize: 40, align: 'left', valign: 'middle' });
  // Epic
  slide1.addText(story.epic, { x: 0.5, y: 3.0, w: 9, h: 0.5, color: 'BDD7F4', fontSize: 18, align: 'left' });
  // Meta row
  slide1.addText(`Priority: ${story.priority}   |   Story Points: ${story.points}`, {
    x: 0.5, y: 5.5, w: 9, h: 0.4, color: 'FFFFFF', fontSize: 14, align: 'left'
  });
  slide1.addText('Sprint 1 — Todo App', { x: 0.5, y: 6.3, w: 9, h: 0.4, color: 'BDD7F4', fontSize: 12, align: 'left' });

  // === SLIDE 2: Summary + Tech Stack ===
  const slide2 = pptx.addSlide();
  slide2.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: '1971c2' } });
  slide2.addText('Overview', { x: 0.4, y: 0.15, w: 9, h: 0.8, color: 'FFFFFF', bold: true, fontSize: 24, valign: 'middle' });
  slide2.addText(story.id + ' — ' + story.title, { x: 0.4, y: 0.55, w: 9, h: 0.4, color: 'BDD7F4', fontSize: 12 });

  slide2.addText('Story Summary', { x: 0.4, y: 1.3, w: 9.2, h: 0.4, color: '1971c2', bold: true, fontSize: 16 });
  slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.75, w: 9.2, h: 1.3, fill: { color: 'e7f5ff' }, line: { color: '74c0fc', width: 1 } });
  slide2.addText(story.summary, { x: 0.6, y: 1.85, w: 8.8, h: 1.1, color: '212529', fontSize: 14, wrap: true });

  slide2.addText('Tech Stack', { x: 0.4, y: 3.25, w: 4, h: 0.4, color: '1971c2', bold: true, fontSize: 16 });
  story.techStack.forEach((item, i) => {
    slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4 + (i % 2) * 4.7, y: 3.75 + Math.floor(i / 2) * 0.7, w: 4.3, h: 0.5, fill: { color: 'f1f3f5' }, line: { color: 'dee2e6', width: 1 }, rectRadius: 0.05 });
    slide2.addText(item, { x: 0.5 + (i % 2) * 4.7, y: 3.75 + Math.floor(i / 2) * 0.7, w: 4.1, h: 0.5, color: '495057', fontSize: 12, valign: 'middle' });
  });

  slide2.addText(`Points: ${story.points}`, { x: 7, y: 3.25, w: 2.6, h: 0.4, color: '495057', fontSize: 14, align: 'right' });

  // === SLIDE 3: Acceptance Criteria ===
  const slide3 = pptx.addSlide();
  slide3.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: '1971c2' } });
  slide3.addText('Acceptance Criteria', { x: 0.4, y: 0.15, w: 9, h: 0.8, color: 'FFFFFF', bold: true, fontSize: 24, valign: 'middle' });
  slide3.addText(story.id + ' — ' + story.title, { x: 0.4, y: 0.55, w: 9, h: 0.4, color: 'BDD7F4', fontSize: 12 });

  story.criteria.forEach((criterion, i) => {
    const y = 1.3 + i * 0.95;
    slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.75, fill: { color: i % 2 === 0 ? 'f8f9fa' : 'ffffff' }, line: { color: 'dee2e6', width: 1 }, rectRadius: 0.05 });
    slide3.addShape(pptx.shapes.OVAL, { x: 0.55, y: y + 0.2, w: 0.35, h: 0.35, fill: { color: '2f9e44' } });
    slide3.addText('✓', { x: 0.55, y: y + 0.18, w: 0.35, h: 0.35, color: 'FFFFFF', fontSize: 11, align: 'center', valign: 'middle', bold: true });
    slide3.addText(criterion, { x: 1.05, y: y + 0.08, w: 8.3, h: 0.58, color: '212529', fontSize: 13, valign: 'middle', wrap: true });
  });

  // === SLIDE 4: Screenshot / Demo ===
  const slide4 = pptx.addSlide();
  slide4.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: '1971c2' } });
  slide4.addText('Feature Demo', { x: 0.4, y: 0.15, w: 9, h: 0.8, color: 'FFFFFF', bold: true, fontSize: 24, valign: 'middle' });
  slide4.addText(story.id + ' — ' + story.title, { x: 0.4, y: 0.55, w: 9, h: 0.4, color: 'BDD7F4', fontSize: 12 });

  if (fs.existsSync(story.screenshot)) {
    slide4.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 9.2, h: 5.6, fill: { color: 'f1f3f5' }, line: { color: 'dee2e6', width: 1 } });
    slide4.addImage({ path: story.screenshot, x: 0.5, y: 1.3, w: 9.0, h: 5.4, sizing: { type: 'contain', w: 9.0, h: 5.4 } });
  } else {
    slide4.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 9.2, h: 5.6, fill: { color: 'f1f3f5' }, line: { color: 'dee2e6', width: 1 } });
    slide4.addText('E2E screenshot: ' + path.basename(story.screenshot), { x: 0.5, y: 3.5, w: 9, h: 1, color: '868e96', fontSize: 14, align: 'center' });
  }

  // === SLIDE 5: Definition of Done ===
  const slide5 = pptx.addSlide();
  slide5.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: '1971c2' } });
  slide5.addText('Definition of Done', { x: 0.4, y: 0.15, w: 9, h: 0.8, color: 'FFFFFF', bold: true, fontSize: 24, valign: 'middle' });
  slide5.addText(story.id + ' — ' + story.title, { x: 0.4, y: 0.55, w: 9, h: 0.4, color: 'BDD7F4', fontSize: 12 });

  const dod = [
    ['Unit tests written with >80% coverage', true],
    ['Integration tests for API endpoints', true],
    ['Code review completed', true],
    ['E2E tests passed (all journeys green)', true],
    ['User documentation written (help article, FAQ, troubleshooting)', true],
    ['Architecture diagram updated', true],
    ['PowerPoint deliverable generated', true],
    ['Git commit and push completed', false]
  ];

  dod.forEach(([item, done], i) => {
    const y = 1.3 + i * 0.67;
    const col = done ? '2f9e44' : 'adb5bd';
    slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.55, fill: { color: done ? 'ebfbee' : 'f8f9fa' }, line: { color: done ? 'b2f2bb' : 'dee2e6', width: 1 }, rectRadius: 0.05 });
    slide5.addText(done ? '✓' : '○', { x: 0.55, y: y + 0.05, w: 0.4, h: 0.45, color: col, fontSize: 14, align: 'center', valign: 'middle', bold: true });
    slide5.addText(item, { x: 1.05, y: y + 0.05, w: 8.3, h: 0.45, color: done ? '212529' : '868e96', fontSize: 12, valign: 'middle' });
  });

  const outPath = path.join(DELIVERABLES, story.id, `ACF-${story.id}-presentation.pptx`);
  await pptx.writeFile({ fileName: outPath });
  console.log(`Created: ${outPath}`);
}

async function main() {
  for (const story of stories) {
    await createStoryPresentation(story);
  }
  console.log('All presentations created.');
}

main().catch(err => { console.error(err); process.exit(1); });
