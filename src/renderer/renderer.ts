// Type declarations for Jarvis API exposed via preload
import type { UserSettings, Task, CalendarEvent, EventType } from '../types/global';
import type {
  Meal,
  WeightEntry,
  SleepEntry,
  BloodPressureEntry,
  Medication,
  Bookmark,
  DetectedTool,
  HealthData,
  BookmarksData,
  ToolsData,
  UpdateInfo,
} from '../modules/shared/types';

// ========================================
// DOM Elements
// ========================================

// App Bar
const minimizeBtn = document.getElementById('minimizeBtn') as HTMLButtonElement;
const maximizeBtn = document.getElementById('maximizeBtn') as HTMLButtonElement;
const closeBtn = document.getElementById('closeBtn') as HTMLButtonElement;
const maximizeIcon = document.getElementById('maximizeIcon') as HTMLElement;
const restoreIcon = document.getElementById('restoreIcon') as HTMLElement;

// Sidebar
const sidebar = document.getElementById('sidebar') as HTMLElement;
const sidebarToggle = document.getElementById('sidebarToggle') as HTMLButtonElement;
const navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
const contentSections = document.querySelectorAll('.content-section') as NodeListOf<HTMLElement>;

// Home Dashboard
const todayDate = document.getElementById('todayDate') as HTMLElement;
const tasksToday = document.getElementById('tasksToday') as HTMLElement;
const eventsToday = document.getElementById('eventsToday') as HTMLElement;
const overdueCount = document.getElementById('overdueCount') as HTMLElement;
const upcomingTasksList = document.getElementById('upcomingTasksList') as HTMLElement;
const upcomingEventsList = document.getElementById('upcomingEventsList') as HTMLElement;
const birthdaysList = document.getElementById('birthdaysList') as HTMLElement;
const quickAddTask = document.getElementById('quickAddTask') as HTMLButtonElement;
const quickAddEvent = document.getElementById('quickAddEvent') as HTMLButtonElement;
const goToToday = document.getElementById('goToToday') as HTMLButtonElement;

// Tasks
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLElement;
const taskFilter = document.getElementById('taskFilter') as HTMLSelectElement;
const taskSort = document.getElementById('taskSort') as HTMLSelectElement;

// Task Modal
const taskModal = document.getElementById('taskModal') as HTMLElement;
const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const taskIdInput = document.getElementById('taskId') as HTMLInputElement;
const taskTitleInput = document.getElementById('taskTitle') as HTMLInputElement;
const taskDescriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
const taskDueDateInput = document.getElementById('taskDueDate') as HTMLInputElement;
const taskPriorityInput = document.getElementById('taskPriority') as HTMLSelectElement;
const closeTaskModal = document.getElementById('closeTaskModal') as HTMLButtonElement;
const cancelTaskBtn = document.getElementById('cancelTaskBtn') as HTMLButtonElement;
const taskModalTitle = document.getElementById('taskModalTitle') as HTMLElement;

// Calendar
const addEventBtn = document.getElementById('addEventBtn') as HTMLButtonElement;
const calendarGrid = document.getElementById('calendarGrid') as HTMLElement;
const currentMonthEl = document.getElementById('currentMonth') as HTMLElement;
const prevMonthBtn = document.getElementById('prevMonth') as HTMLButtonElement;
const nextMonthBtn = document.getElementById('nextMonth') as HTMLButtonElement;
const todayBtn = document.getElementById('todayBtn') as HTMLButtonElement;
const selectedDateTitle = document.getElementById('selectedDateTitle') as HTMLElement;
const dayEventsList = document.getElementById('dayEventsList') as HTMLElement;

// Event Modal
const eventModal = document.getElementById('eventModal') as HTMLElement;
const eventForm = document.getElementById('eventForm') as HTMLFormElement;
const eventIdInput = document.getElementById('eventId') as HTMLInputElement;
const eventTitleInput = document.getElementById('eventTitle') as HTMLInputElement;
const eventDescriptionInput = document.getElementById('eventDescription') as HTMLTextAreaElement;
const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;
const eventTypeInput = document.getElementById('eventType') as HTMLSelectElement;
const eventStartTimeInput = document.getElementById('eventStartTime') as HTMLInputElement;
const eventEndTimeInput = document.getElementById('eventEndTime') as HTMLInputElement;
const eventRecurringInput = document.getElementById('eventRecurring') as HTMLInputElement;
const eventReminderInput = document.getElementById('eventReminder') as HTMLSelectElement;
const closeEventModal = document.getElementById('closeEventModal') as HTMLButtonElement;
const cancelEventBtn = document.getElementById('cancelEventBtn') as HTMLButtonElement;
const eventModalTitle = document.getElementById('eventModalTitle') as HTMLElement;

// Settings
const themeSelect = document.getElementById('themeSelect') as HTMLSelectElement;
const sidebarToggleSetting = document.getElementById('sidebarToggleSetting') as HTMLInputElement;
const startPageSelect = document.getElementById('startPageSelect') as HTMLSelectElement;
const notificationsEnabled = document.getElementById('notificationsEnabled') as HTMLInputElement;
const soundsEnabled = document.getElementById('soundsEnabled') as HTMLInputElement;
const taskReminders = document.getElementById('taskReminders') as HTMLInputElement;
const eventReminders = document.getElementById('eventReminders') as HTMLInputElement;
const checkUpdatesBtn = document.getElementById('checkUpdatesBtn') as HTMLButtonElement;
const appVersion = document.getElementById('appVersion') as HTMLElement;

// Health Module Elements
const todayCalories = document.getElementById('todayCalories') as HTMLElement;
const currentWeight = document.getElementById('currentWeight') as HTMLElement;
const lastSleep = document.getElementById('lastSleep') as HTMLElement;
const lastBP = document.getElementById('lastBP') as HTMLElement;
const addMealBtn = document.getElementById('addMealBtn') as HTMLButtonElement;
const addWeightBtn = document.getElementById('addWeightBtn') as HTMLButtonElement;
const addSleepBtn = document.getElementById('addSleepBtn') as HTMLButtonElement;
const addBPBtn = document.getElementById('addBPBtn') as HTMLButtonElement;
const addMedicationBtn = document.getElementById('addMedicationBtn') as HTMLButtonElement;
const medicationsList = document.getElementById('medicationsList') as HTMLElement;
const mealsList = document.getElementById('mealsList') as HTMLElement;

// Health Modals
const mealModal = document.getElementById('mealModal') as HTMLElement;
const mealForm = document.getElementById('mealForm') as HTMLFormElement;
const mealIdInput = document.getElementById('mealId') as HTMLInputElement;
const mealDateInput = document.getElementById('mealDate') as HTMLInputElement;
const mealTimeInput = document.getElementById('mealTime') as HTMLInputElement;
const mealItemsInput = document.getElementById('mealItems') as HTMLInputElement;
const mealCaloriesInput = document.getElementById('mealCalories') as HTMLInputElement;
const mealNotesInput = document.getElementById('mealNotes') as HTMLTextAreaElement;
const closeMealModal = document.getElementById('closeMealModal') as HTMLButtonElement;
const cancelMealBtn = document.getElementById('cancelMealBtn') as HTMLButtonElement;

const weightModal = document.getElementById('weightModal') as HTMLElement;
const weightForm = document.getElementById('weightForm') as HTMLFormElement;
const weightIdInput = document.getElementById('weightId') as HTMLInputElement;
const weightDateInput = document.getElementById('weightDate') as HTMLInputElement;
const weightValueInput = document.getElementById('weightValue') as HTMLInputElement;
const weightUnitInput = document.getElementById('weightUnit') as HTMLSelectElement;
const weightNotesInput = document.getElementById('weightNotes') as HTMLTextAreaElement;
const closeWeightModal = document.getElementById('closeWeightModal') as HTMLButtonElement;
const cancelWeightBtn = document.getElementById('cancelWeightBtn') as HTMLButtonElement;

const sleepModal = document.getElementById('sleepModal') as HTMLElement;
const sleepForm = document.getElementById('sleepForm') as HTMLFormElement;
const sleepIdInput = document.getElementById('sleepId') as HTMLInputElement;
const sleepDateInput = document.getElementById('sleepDate') as HTMLInputElement;
const sleepStartTimeInput = document.getElementById('sleepStartTime') as HTMLInputElement;
const sleepEndTimeInput = document.getElementById('sleepEndTime') as HTMLInputElement;
const sleepQualityInput = document.getElementById('sleepQuality') as HTMLSelectElement;
const sleepNotesInput = document.getElementById('sleepNotes') as HTMLTextAreaElement;
const closeSleepModal = document.getElementById('closeSleepModal') as HTMLButtonElement;
const cancelSleepBtn = document.getElementById('cancelSleepBtn') as HTMLButtonElement;

const bpModal = document.getElementById('bpModal') as HTMLElement;
const bpForm = document.getElementById('bpForm') as HTMLFormElement;
const bpIdInput = document.getElementById('bpId') as HTMLInputElement;
const bpDateInput = document.getElementById('bpDate') as HTMLInputElement;
const bpTimeInput = document.getElementById('bpTime') as HTMLInputElement;
const bpSystolicInput = document.getElementById('bpSystolic') as HTMLInputElement;
const bpDiastolicInput = document.getElementById('bpDiastolic') as HTMLInputElement;
const bpPulseInput = document.getElementById('bpPulse') as HTMLInputElement;
const bpNotesInput = document.getElementById('bpNotes') as HTMLTextAreaElement;
const closeBPModal = document.getElementById('closeBPModal') as HTMLButtonElement;
const cancelBPBtn = document.getElementById('cancelBPBtn') as HTMLButtonElement;

const medicationModal = document.getElementById('medicationModal') as HTMLElement;
const medicationForm = document.getElementById('medicationForm') as HTMLFormElement;
const medicationIdInput = document.getElementById('medicationId') as HTMLInputElement;
const medicationNameInput = document.getElementById('medicationName') as HTMLInputElement;
const medicationDosageInput = document.getElementById('medicationDosage') as HTMLInputElement;
const medicationFrequencyInput = document.getElementById('medicationFrequency') as HTMLSelectElement;
const medicationTimesInput = document.getElementById('medicationTimes') as HTMLInputElement;
const medicationStartDateInput = document.getElementById('medicationStartDate') as HTMLInputElement;
const medicationEndDateInput = document.getElementById('medicationEndDate') as HTMLInputElement;
const medicationNotesInput = document.getElementById('medicationNotes') as HTMLTextAreaElement;
const closeMedicationModal = document.getElementById('closeMedicationModal') as HTMLButtonElement;
const cancelMedicationBtn = document.getElementById('cancelMedicationBtn') as HTMLButtonElement;

// Bookmarks Module Elements
const addBookmarkBtn = document.getElementById('addBookmarkBtn') as HTMLButtonElement;
const bookmarksGrid = document.getElementById('bookmarksGrid') as HTMLElement;
const bookmarkCategoryFilter = document.getElementById('bookmarkCategoryFilter') as HTMLSelectElement;
const bookmarkTypeFilter = document.getElementById('bookmarkTypeFilter') as HTMLSelectElement;

const bookmarkModal = document.getElementById('bookmarkModal') as HTMLElement;
const bookmarkForm = document.getElementById('bookmarkForm') as HTMLFormElement;
const bookmarkIdInput = document.getElementById('bookmarkId') as HTMLInputElement;
const bookmarkLabelInput = document.getElementById('bookmarkLabel') as HTMLInputElement;
const bookmarkTypeInput = document.getElementById('bookmarkType') as HTMLSelectElement;
const bookmarkCategoryInput = document.getElementById('bookmarkCategory') as HTMLSelectElement;
const bookmarkTargetInput = document.getElementById('bookmarkTarget') as HTMLInputElement;
const closeBookmarkModal = document.getElementById('closeBookmarkModal') as HTMLButtonElement;
const cancelBookmarkBtn = document.getElementById('cancelBookmarkBtn') as HTMLButtonElement;

// VPN Module Elements - defined but not yet used (placeholder for future VPN feature)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vpnElements = {
  statusIndicator: document.getElementById('vpnStatusIndicator'),
  statusLabel: document.getElementById('vpnStatusLabel'),
  activeProfile: document.getElementById('vpnActiveProfile'),
  statusDetails: document.getElementById('vpnStatusDetails'),
  externalIP: document.getElementById('vpnExternalIP'),
  uploadSpeed: document.getElementById('vpnUploadSpeed'),
  downloadSpeed: document.getElementById('vpnDownloadSpeed'),
  profilesList: document.getElementById('vpnProfilesList'),
};
const importVPNProfileBtn = document.getElementById('importVPNProfileBtn') as HTMLButtonElement;

// Tools Module Elements
const scanToolsBtn = document.getElementById('scanToolsBtn') as HTMLButtonElement;
const toolsLastScan = document.getElementById('toolsLastScan') as HTMLElement;
const toolsGrid = document.getElementById('toolsGrid') as HTMLElement;

// Update Modal Elements
const updateModal = document.getElementById('updateModal') as HTMLElement;
const closeUpdateModal = document.getElementById('closeUpdateModal') as HTMLButtonElement;
const currentVersionDisplay = document.getElementById('currentVersionDisplay') as HTMLElement;
const latestVersionDisplay = document.getElementById('latestVersionDisplay') as HTMLElement;
const updateNotes = document.getElementById('updateNotes') as HTMLElement;
const ignoreUpdateBtn = document.getElementById('ignoreUpdateBtn') as HTMLButtonElement;
const downloadUpdateBtn = document.getElementById('downloadUpdateBtn') as HTMLButtonElement;

// Toast
const toastContainer = document.getElementById('toastContainer') as HTMLElement;

// ========================================
// State
// ========================================
let settings: UserSettings;
let tasks: Task[] = [];
let events: CalendarEvent[] = [];
let currentCalendarDate = new Date();
let selectedDate: Date | null = null;

// New module states
let healthData: HealthData = {
  meals: [],
  weightEntries: [],
  sleepEntries: [],
  bloodPressureEntries: [],
  medications: [],
  medicationReminders: [],
};
let bookmarksData: BookmarksData = {
  bookmarks: [],
  categories: ['General', 'Work', 'Personal', 'Entertainment'],
};
let toolsData: ToolsData = {
  detectedTools: [],
  lastFullScan: null,
};

// Easter egg state
let konamiSequence: string[] = [];
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// ========================================
// Utility Functions
// ========================================

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timeStr: string | null): string {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ========================================
// Settings Functions
// ========================================

async function loadSettings(): Promise<void> {
  if (window.jarvisAPI) {
    settings = await window.jarvisAPI.getSettings();
  } else {
    // Fallback for browser testing
    const saved = localStorage.getItem('jarvis-settings');
    settings = saved ? JSON.parse(saved) : {
      theme: 'dark',
      sidebarExpanded: true,
      defaultStartPage: 'home',
      notifications: {
        enabled: true,
        sounds: true,
        taskReminders: true,
        eventReminders: true,
      },
    };
  }
  applySettings();
  populateSettingsUI();
}

async function saveSettings(): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.saveSettings(settings);
  } else {
    localStorage.setItem('jarvis-settings', JSON.stringify(settings));
  }
}

function applySettings(): void {
  // Apply theme
  applyTheme(settings.theme);

  // Apply sidebar state
  if (!settings.sidebarExpanded) {
    sidebar.classList.add('collapsed');
    sidebarToggle.setAttribute('aria-expanded', 'false');
  } else {
    sidebar.classList.remove('collapsed');
    sidebarToggle.setAttribute('aria-expanded', 'true');
  }

  // Navigate to default start page
  navigateToSection(settings.defaultStartPage);

  // Apply platform class
  if (window.jarvisAPI) {
    const platform = window.jarvisAPI.getPlatform();
    document.body.classList.add(`platform-${platform}`);
  }
}

function applyTheme(theme: 'dark' | 'light' | 'system'): void {
  let effectiveTheme = theme;
  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${effectiveTheme}-theme`);
}

function populateSettingsUI(): void {
  themeSelect.value = settings.theme;
  sidebarToggleSetting.checked = settings.sidebarExpanded;
  startPageSelect.value = settings.defaultStartPage;
  notificationsEnabled.checked = settings.notifications.enabled;
  soundsEnabled.checked = settings.notifications.sounds;
  taskReminders.checked = settings.notifications.taskReminders;
  eventReminders.checked = settings.notifications.eventReminders;
}

// ========================================
// Task Functions
// ========================================

async function loadTasks(): Promise<void> {
  if (window.jarvisAPI) {
    tasks = await window.jarvisAPI.getTasks();
  } else {
    const saved = localStorage.getItem('jarvis-tasks');
    tasks = saved ? JSON.parse(saved) : [];
  }
  renderTasks();
  updateDashboard();
}

async function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  if (window.jarvisAPI) {
    const newTask = await window.jarvisAPI.createTask(taskData);
    tasks.push(newTask);
  } else {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    localStorage.setItem('jarvis-tasks', JSON.stringify(tasks));
  }
  renderTasks();
  updateDashboard();
  showToast('Task created successfully', 'success');
}

async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  if (window.jarvisAPI) {
    const updated = await window.jarvisAPI.updateTask(id, updates);
    if (updated) {
      const index = tasks.findIndex(t => t.id === id);
      if (index !== -1) tasks[index] = updated;
    }
  } else {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('jarvis-tasks', JSON.stringify(tasks));
    }
  }
  renderTasks();
  updateDashboard();
}

async function deleteTask(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteTask(id);
  }
  tasks = tasks.filter(t => t.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-tasks', JSON.stringify(tasks));
  }
  renderTasks();
  updateDashboard();
  showToast('Task deleted', 'info');
}

function renderTasks(): void {
  const filter = taskFilter.value;
  const sort = taskSort.value;

  let filteredTasks = [...tasks];

  // Apply filter
  if (filter === 'pending') {
    filteredTasks = filteredTasks.filter(t => t.status === 'pending');
  } else if (filter === 'completed') {
    filteredTasks = filteredTasks.filter(t => t.status === 'completed');
  } else if (filter === 'overdue') {
    filteredTasks = filteredTasks.filter(t => t.status === 'pending' && isOverdue(t.dueDate));
  }

  // Apply sort
  filteredTasks.sort((a, b) => {
    if (sort === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sort === 'priority') {
      const priorities = { high: 0, medium: 1, low: 2 };
      return priorities[a.priority] - priorities[b.priority];
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
        <p>No tasks found</p>
        <span>Click "Add Task" to create a new task</span>
      </div>
    `;
    return;
  }

  taskList.innerHTML = filteredTasks.map(task => `
    <div class="task-item ${task.status === 'completed' ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-checkbox ${task.status === 'completed' ? 'checked' : ''}" data-id="${task.id}"></div>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta">
          ${task.dueDate ? `<span class="due-date ${isOverdue(task.dueDate) && task.status === 'pending' ? 'overdue' : ''}">${isOverdue(task.dueDate) && task.status === 'pending' ? 'Overdue: ' : 'Due: '}${formatDate(task.dueDate)}</span>` : ''}
          <span class="priority-badge ${task.priority}">${task.priority}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action-btn edit" data-id="${task.id}" aria-label="Edit task">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="task-action-btn delete" data-id="${task.id}" aria-label="Delete task">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners
  taskList.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      const task = tasks.find(t => t.id === id);
      if (task) {
        updateTask(id, { status: task.status === 'completed' ? 'pending' : 'completed' });
      }
    });
  });

  taskList.querySelectorAll('.task-action-btn.edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      openEditTaskModal(id);
    });
  });

  taskList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(id);
      }
    });
  });
}

function openAddTaskModal(): void {
  taskModalTitle.textContent = 'Add Task';
  taskIdInput.value = '';
  taskForm.reset();
  taskModal.classList.add('active');
  taskTitleInput.focus();
}

function openEditTaskModal(id: string): void {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  taskModalTitle.textContent = 'Edit Task';
  taskIdInput.value = task.id;
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  taskDueDateInput.value = task.dueDate || '';
  taskPriorityInput.value = task.priority;
  taskModal.classList.add('active');
  taskTitleInput.focus();
}

function closeTaskModalFn(): void {
  taskModal.classList.remove('active');
  taskForm.reset();
}

// ========================================
// Calendar/Event Functions
// ========================================

async function loadEvents(): Promise<void> {
  if (window.jarvisAPI) {
    events = await window.jarvisAPI.getEvents();
  } else {
    const saved = localStorage.getItem('jarvis-events');
    events = saved ? JSON.parse(saved) : [];
  }
  renderCalendar();
  updateDashboard();
}

async function createEvent(eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  if (window.jarvisAPI) {
    const newEvent = await window.jarvisAPI.createEvent(eventData);
    events.push(newEvent);
  } else {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    events.push(newEvent);
    localStorage.setItem('jarvis-events', JSON.stringify(events));
  }
  renderCalendar();
  updateDashboard();
  if (selectedDate) renderDayEvents(selectedDate);
  showToast('Event created successfully', 'success');
}

async function updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<void> {
  if (window.jarvisAPI) {
    const updated = await window.jarvisAPI.updateEvent(id, updates);
    if (updated) {
      const index = events.findIndex(e => e.id === id);
      if (index !== -1) events[index] = updated;
    }
  } else {
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('jarvis-events', JSON.stringify(events));
    }
  }
  renderCalendar();
  updateDashboard();
  if (selectedDate) renderDayEvents(selectedDate);
}

async function deleteEvent(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteEvent(id);
  }
  events = events.filter(e => e.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-events', JSON.stringify(events));
  }
  renderCalendar();
  updateDashboard();
  if (selectedDate) renderDayEvents(selectedDate);
  showToast('Event deleted', 'info');
}

function renderCalendar(): void {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  currentMonthEl.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = '';

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(year, month - 1, day);
    html += renderCalendarDay(date, true);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isCurrentDay = date.getTime() === today.getTime();
    const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
    html += renderCalendarDay(date, false, isCurrentDay, isSelected);
  }

  // Next month days
  const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
  const remainingCells = totalCells - (startDayOfWeek + daysInMonth);
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(year, month + 1, day);
    html += renderCalendarDay(date, true);
  }

  calendarGrid.innerHTML = html;

  // Add event listeners
  calendarGrid.querySelectorAll('.calendar-day').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const dateStr = (dayEl as HTMLElement).dataset.date!;
      selectedDate = new Date(dateStr);
      renderCalendar();
      renderDayEvents(selectedDate);
    });
  });
}

function renderCalendarDay(date: Date, isOtherMonth: boolean, isToday = false, isSelected = false): string {
  const dateStr = getDateString(date);
  const dayEvents = getEventsForDate(date);

  const classes = [
    'calendar-day',
    isOtherMonth ? 'other-month' : '',
    isToday ? 'today' : '',
    isSelected ? 'selected' : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}" data-date="${dateStr}">
      <div class="day-number">${date.getDate()}</div>
      <div class="day-events">
        ${dayEvents.slice(0, 3).map(e => `
          <div class="day-event-dot ${e.type}">${escapeHtml(e.title)}</div>
        `).join('')}
        ${dayEvents.length > 3 ? `<div class="day-event-dot">+${dayEvents.length - 3} more</div>` : ''}
      </div>
    </div>
  `;
}

function getEventsForDate(date: Date): CalendarEvent[] {
  const dateStr = getDateString(date);
  return events.filter(e => {
    if (e.date === dateStr) return true;
    // Handle recurring yearly events (birthdays)
    if (e.recurring) {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate();
    }
    return false;
  });
}

function renderDayEvents(date: Date): void {
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  selectedDateTitle.textContent = dateStr;

  const dayEvents = getEventsForDate(date);

  if (dayEvents.length === 0) {
    dayEventsList.innerHTML = '<div class="empty-state"><p>No events on this day</p></div>';
    return;
  }

  dayEventsList.innerHTML = dayEvents.map(event => `
    <div class="event-item" data-id="${event.id}">
      <span class="event-type-badge ${event.type}">${event.type}</span>
      <div class="event-item-content">
        <div class="event-item-title">${escapeHtml(event.title)}</div>
        ${event.startTime ? `<div class="event-item-time">${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ''}</div>` : ''}
      </div>
      <div class="event-actions">
        <button class="task-action-btn edit" data-id="${event.id}" aria-label="Edit event">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="task-action-btn delete" data-id="${event.id}" aria-label="Delete event">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners
  dayEventsList.querySelectorAll('.task-action-btn.edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      openEditEventModal(id);
    });
  });

  dayEventsList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this event?')) {
        deleteEvent(id);
      }
    });
  });
}

function openAddEventModal(date?: Date): void {
  eventModalTitle.textContent = 'Add Event';
  eventIdInput.value = '';
  eventForm.reset();
  if (date) {
    eventDateInput.value = getDateString(date);
  }
  eventModal.classList.add('active');
  eventTitleInput.focus();
}

function openEditEventModal(id: string): void {
  const event = events.find(e => e.id === id);
  if (!event) return;

  eventModalTitle.textContent = 'Edit Event';
  eventIdInput.value = event.id;
  eventTitleInput.value = event.title;
  eventDescriptionInput.value = event.description;
  eventDateInput.value = event.date;
  eventTypeInput.value = event.type;
  eventStartTimeInput.value = event.startTime || '';
  eventEndTimeInput.value = event.endTime || '';
  eventRecurringInput.checked = event.recurring;
  eventReminderInput.value = event.reminder;
  eventModal.classList.add('active');
  eventTitleInput.focus();
}

function closeEventModalFn(): void {
  eventModal.classList.remove('active');
  eventForm.reset();
}

// ========================================
// Dashboard Functions
// ========================================

function updateDashboard(): void {
  const today = new Date();
  const todayStr = getDateString(today);

  // Update today's date display
  todayDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  // Count tasks due today
  const tasksDueToday = tasks.filter(t => t.dueDate === todayStr && t.status === 'pending').length;
  tasksToday.textContent = tasksDueToday.toString();

  // Count events today
  const eventsTodayCount = getEventsForDate(today).length;
  eventsToday.textContent = eventsTodayCount.toString();

  // Count overdue tasks
  const overdueTasks = tasks.filter(t => t.status === 'pending' && isOverdue(t.dueDate)).length;
  overdueCount.textContent = overdueTasks.toString();

  // Render upcoming tasks (next 7 days, pending only)
  const upcomingTasks = tasks
    .filter(t => t.status === 'pending')
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  if (upcomingTasks.length === 0) {
    upcomingTasksList.innerHTML = '<div class="empty-state"><p>No upcoming tasks</p></div>';
  } else {
    upcomingTasksList.innerHTML = upcomingTasks.map(task => `
      <div class="preview-item">
        <div class="preview-item-checkbox ${task.status === 'completed' ? 'checked' : ''}" data-id="${task.id}"></div>
        <div class="preview-item-content">
          <div class="preview-item-title ${task.status === 'completed' ? 'completed' : ''}">${escapeHtml(task.title)}</div>
          <div class="preview-item-meta ${isOverdue(task.dueDate) ? 'overdue' : ''}">${task.dueDate ? formatDate(task.dueDate) : 'No due date'}</div>
        </div>
      </div>
    `).join('');

    upcomingTasksList.querySelectorAll('.preview-item-checkbox').forEach(checkbox => {
      checkbox.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id!;
        const task = tasks.find(t => t.id === id);
        if (task) {
          updateTask(id, { status: task.status === 'completed' ? 'pending' : 'completed' });
        }
      });
    });
  }

  // Render upcoming events (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const upcomingEvents = events
    .filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (upcomingEvents.length === 0) {
    upcomingEventsList.innerHTML = '<div class="empty-state"><p>No upcoming events</p></div>';
  } else {
    upcomingEventsList.innerHTML = upcomingEvents.map(event => `
      <div class="preview-item">
        <span class="event-type-badge ${event.type}">${event.type}</span>
        <div class="preview-item-content">
          <div class="preview-item-title">${escapeHtml(event.title)}</div>
          <div class="preview-item-meta">${formatDate(event.date)}${event.startTime ? ` at ${formatTime(event.startTime)}` : ''}</div>
        </div>
      </div>
    `).join('');
  }

  // Render birthdays this week
  const birthdays = events
    .filter(e => e.type === 'birthday')
    .filter(e => {
      const eventDate = new Date(e.date);
      const thisYearDate = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return thisYearDate >= today && thisYearDate <= nextWeek;
    });

  if (birthdays.length === 0) {
    birthdaysList.innerHTML = '<div class="empty-state"><p>No birthdays this week</p></div>';
  } else {
    birthdaysList.innerHTML = birthdays.map(event => {
      const eventDate = new Date(event.date);
      const thisYearDate = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return `
        <div class="preview-item">
          <span class="event-type-badge birthday" role="img" aria-label="Birthday">🎂</span>
          <div class="preview-item-content">
            <div class="preview-item-title">${escapeHtml(event.title)}</div>
            <div class="preview-item-meta">${thisYearDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ========================================
// Navigation Functions
// ========================================

function navigateToSection(sectionId: string): void {
  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === sectionId) {
      item.classList.add('active');
    }
  });

  contentSections.forEach((section) => {
    section.classList.remove('active');
    if (section.id === `${sectionId}-section`) {
      section.classList.add('active');
    }
  });
}

// ========================================
// Window Control Functions
// ========================================

function updateMaximizeButton(isMaximized: boolean): void {
  if (isMaximized) {
    maximizeIcon.style.display = 'none';
    restoreIcon.style.display = 'block';
  } else {
    maximizeIcon.style.display = 'block';
    restoreIcon.style.display = 'none';
  }
}

// ========================================
// Event Listeners Setup
// ========================================

function setupEventListeners(): void {
  // Window controls
  minimizeBtn?.addEventListener('click', () => window.jarvisAPI?.minimizeWindow());
  maximizeBtn?.addEventListener('click', () => window.jarvisAPI?.maximizeWindow());
  closeBtn?.addEventListener('click', () => window.jarvisAPI?.closeWindow());

  // Listen for maximize/unmaximize events
  if (window.jarvisAPI) {
    window.jarvisAPI.onWindowStateChange(updateMaximizeButton);
    // Check initial maximize state
    window.jarvisAPI.isMaximized().then(updateMaximizeButton);
  }

  // Sidebar toggle
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const isExpanded = !sidebar.classList.contains('collapsed');
    sidebarToggle.setAttribute('aria-expanded', isExpanded.toString());
    settings.sidebarExpanded = isExpanded;
    saveSettings();
  });

  // Navigation
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      if (section) navigateToSection(section);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        if (section) navigateToSection(section);
      }
    });
  });

  // Quick actions on home
  quickAddTask.addEventListener('click', openAddTaskModal);
  quickAddEvent.addEventListener('click', () => openAddEventModal());
  goToToday.addEventListener('click', () => {
    currentCalendarDate = new Date();
    selectedDate = new Date();
    navigateToSection('calendar');
    renderCalendar();
    renderDayEvents(selectedDate);
  });

  // "See All" buttons
  document.querySelectorAll('.see-all-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = (btn as HTMLElement).dataset.navigate;
      if (section) navigateToSection(section);
    });
  });

  // Tasks
  addTaskBtn.addEventListener('click', openAddTaskModal);
  closeTaskModal.addEventListener('click', closeTaskModalFn);
  cancelTaskBtn.addEventListener('click', closeTaskModalFn);
  taskModal.addEventListener('click', (e) => {
    if (e.target === taskModal) closeTaskModalFn();
  });

  taskFilter.addEventListener('change', renderTasks);
  taskSort.addEventListener('change', renderTasks);

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskData = {
      title: taskTitleInput.value.trim(),
      description: taskDescriptionInput.value.trim(),
      dueDate: taskDueDateInput.value || null,
      priority: taskPriorityInput.value as 'low' | 'medium' | 'high',
      status: 'pending' as const,
      reminder: null,
    };

    if (taskIdInput.value) {
      await updateTask(taskIdInput.value, taskData);
      showToast('Task updated successfully', 'success');
    } else {
      await createTask(taskData);
    }
    closeTaskModalFn();
  });

  // Calendar
  addEventBtn.addEventListener('click', () => openAddEventModal(selectedDate || undefined));
  prevMonthBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });
  nextMonthBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });
  todayBtn.addEventListener('click', () => {
    currentCalendarDate = new Date();
    selectedDate = new Date();
    renderCalendar();
    renderDayEvents(selectedDate);
  });

  // Events modal
  closeEventModal.addEventListener('click', closeEventModalFn);
  cancelEventBtn.addEventListener('click', closeEventModalFn);
  eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal) closeEventModalFn();
  });

  eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const eventData = {
      title: eventTitleInput.value.trim(),
      description: eventDescriptionInput.value.trim(),
      date: eventDateInput.value,
      type: eventTypeInput.value as EventType,
      startTime: eventStartTimeInput.value || null,
      endTime: eventEndTimeInput.value || null,
      recurring: eventRecurringInput.checked,
      reminder: eventReminderInput.value as CalendarEvent['reminder'],
    };

    if (eventIdInput.value) {
      await updateEvent(eventIdInput.value, eventData);
      showToast('Event updated successfully', 'success');
    } else {
      await createEvent(eventData);
    }
    closeEventModalFn();
  });

  // Settings
  themeSelect.addEventListener('change', () => {
    settings.theme = themeSelect.value as 'dark' | 'light' | 'system';
    applyTheme(settings.theme);
    saveSettings();
  });

  sidebarToggleSetting.addEventListener('change', () => {
    settings.sidebarExpanded = sidebarToggleSetting.checked;
    saveSettings();
  });

  startPageSelect.addEventListener('change', () => {
    settings.defaultStartPage = startPageSelect.value as UserSettings['defaultStartPage'];
    saveSettings();
  });

  notificationsEnabled.addEventListener('change', () => {
    settings.notifications.enabled = notificationsEnabled.checked;
    saveSettings();
  });

  soundsEnabled.addEventListener('change', () => {
    settings.notifications.sounds = soundsEnabled.checked;
    saveSettings();
  });

  taskReminders.addEventListener('change', () => {
    settings.notifications.taskReminders = taskReminders.checked;
    saveSettings();
  });

  eventReminders.addEventListener('change', () => {
    settings.notifications.eventReminders = eventReminders.checked;
    saveSettings();
  });

  // System theme change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (settings.theme === 'system') {
      applyTheme('system');
    }
  });

  // ========================================
  // Health Module Event Listeners
  // ========================================
  
  addMealBtn?.addEventListener('click', openAddMealModal);
  closeMealModal?.addEventListener('click', closeMealModalFn);
  cancelMealBtn?.addEventListener('click', closeMealModalFn);
  mealModal?.addEventListener('click', (e) => {
    if (e.target === mealModal) closeMealModalFn();
  });
  mealForm?.addEventListener('submit', handleMealSubmit);

  addWeightBtn?.addEventListener('click', openAddWeightModal);
  closeWeightModal?.addEventListener('click', closeWeightModalFn);
  cancelWeightBtn?.addEventListener('click', closeWeightModalFn);
  weightModal?.addEventListener('click', (e) => {
    if (e.target === weightModal) closeWeightModalFn();
  });
  weightForm?.addEventListener('submit', handleWeightSubmit);

  addSleepBtn?.addEventListener('click', openAddSleepModal);
  closeSleepModal?.addEventListener('click', closeSleepModalFn);
  cancelSleepBtn?.addEventListener('click', closeSleepModalFn);
  sleepModal?.addEventListener('click', (e) => {
    if (e.target === sleepModal) closeSleepModalFn();
  });
  sleepForm?.addEventListener('submit', handleSleepSubmit);

  addBPBtn?.addEventListener('click', openAddBPModal);
  closeBPModal?.addEventListener('click', closeBPModalFn);
  cancelBPBtn?.addEventListener('click', closeBPModalFn);
  bpModal?.addEventListener('click', (e) => {
    if (e.target === bpModal) closeBPModalFn();
  });
  bpForm?.addEventListener('submit', handleBPSubmit);

  addMedicationBtn?.addEventListener('click', openAddMedicationModal);
  closeMedicationModal?.addEventListener('click', closeMedicationModalFn);
  cancelMedicationBtn?.addEventListener('click', closeMedicationModalFn);
  medicationModal?.addEventListener('click', (e) => {
    if (e.target === medicationModal) closeMedicationModalFn();
  });
  medicationForm?.addEventListener('submit', handleMedicationSubmit);

  // ========================================
  // Bookmarks Module Event Listeners
  // ========================================
  
  addBookmarkBtn?.addEventListener('click', openAddBookmarkModal);
  closeBookmarkModal?.addEventListener('click', closeBookmarkModalFn);
  cancelBookmarkBtn?.addEventListener('click', closeBookmarkModalFn);
  bookmarkModal?.addEventListener('click', (e) => {
    if (e.target === bookmarkModal) closeBookmarkModalFn();
  });
  bookmarkForm?.addEventListener('submit', handleBookmarkSubmit);
  bookmarkCategoryFilter?.addEventListener('change', renderBookmarks);
  bookmarkTypeFilter?.addEventListener('change', renderBookmarks);

  // ========================================
  // Tools Module Event Listeners
  // ========================================
  
  scanToolsBtn?.addEventListener('click', handleScanTools);

  // ========================================
  // Update Module Event Listeners
  // ========================================
  
  checkUpdatesBtn?.addEventListener('click', handleCheckForUpdates);
  closeUpdateModal?.addEventListener('click', closeUpdateModalFn);
  ignoreUpdateBtn?.addEventListener('click', closeUpdateModalFn);
  downloadUpdateBtn?.addEventListener('click', handleDownloadUpdate);
  updateModal?.addEventListener('click', (e) => {
    if (e.target === updateModal) closeUpdateModalFn();
  });

  // ========================================
  // VPN Module Event Listeners
  // ========================================
  
  importVPNProfileBtn?.addEventListener('click', handleImportVPNProfile);

  // ========================================
  // Easter Egg - Konami Code Listener
  // ========================================
  
  document.addEventListener('keydown', handleKonamiCode);
}

// ========================================
// Health Module Functions
// ========================================

async function loadHealthData(): Promise<void> {
  if (window.jarvisAPI) {
    healthData = await window.jarvisAPI.getHealthData();
  } else {
    const saved = localStorage.getItem('jarvis-health');
    if (saved) healthData = JSON.parse(saved);
  }
  updateHealthDashboard();
}

function updateHealthDashboard(): void {
  const today = getDateString(new Date());
  
  // Today's calories
  const todayMeals = healthData.meals.filter(m => m.date === today);
  const totalCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
  if (todayCalories) todayCalories.textContent = totalCalories.toString();
  
  // Latest weight
  if (healthData.weightEntries.length > 0) {
    const latest = healthData.weightEntries[healthData.weightEntries.length - 1];
    if (currentWeight) currentWeight.textContent = `${latest.weight} ${latest.unit}`;
  }
  
  // Latest sleep
  if (healthData.sleepEntries.length > 0) {
    const latest = healthData.sleepEntries[healthData.sleepEntries.length - 1];
    const hours = Math.floor(latest.durationMinutes / 60);
    const mins = latest.durationMinutes % 60;
    if (lastSleep) lastSleep.textContent = `${hours}h ${mins}m`;
  }
  
  // Latest BP
  if (healthData.bloodPressureEntries.length > 0) {
    const latest = healthData.bloodPressureEntries[healthData.bloodPressureEntries.length - 1];
    if (lastBP) lastBP.textContent = `${latest.systolic}/${latest.diastolic}`;
  }
  
  renderMedications();
  renderMeals();
}

function renderMedications(): void {
  if (!medicationsList) return;
  
  const activeMeds = healthData.medications.filter(m => m.active);
  
  if (activeMeds.length === 0) {
    medicationsList.innerHTML = '<div class="empty-state"><p>No medications added</p></div>';
    return;
  }
  
  medicationsList.innerHTML = activeMeds.map(med => `
    <div class="medication-item" data-id="${med.id}">
      <div class="medication-info">
        <span class="medication-name">${escapeHtml(med.name)}</span>
        <span class="medication-dosage">${escapeHtml(med.dosage)} - ${med.frequency.replace(/-/g, ' ')}</span>
      </div>
      <span class="medication-status active">Active</span>
      <div class="task-actions">
        <button class="task-action-btn delete" data-id="${med.id}" aria-label="Delete medication">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  medicationsList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this medication?')) {
        await deleteMedication(id);
      }
    });
  });
}

function renderMeals(): void {
  if (!mealsList) return;
  
  const today = getDateString(new Date());
  const todayMeals = healthData.meals.filter(m => m.date === today);
  
  if (todayMeals.length === 0) {
    mealsList.innerHTML = '<div class="empty-state"><p>No meals logged today</p></div>';
    return;
  }
  
  mealsList.innerHTML = todayMeals.map(meal => `
    <div class="meal-item" data-id="${meal.id}">
      <div class="meal-info">
        <span class="meal-name">${escapeHtml(meal.items.join(', '))}</span>
        <span class="meal-calories">${meal.calories} calories • ${formatTime(meal.time)}</span>
      </div>
      <div class="task-actions">
        <button class="task-action-btn delete" data-id="${meal.id}" aria-label="Delete meal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  mealsList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this meal?')) {
        await deleteMeal(id);
      }
    });
  });
}

function openAddMealModal(): void {
  if (mealModal && mealForm) {
    mealForm.reset();
    mealIdInput.value = '';
    mealDateInput.value = getDateString(new Date());
    mealModal.classList.add('active');
  }
}

function closeMealModalFn(): void {
  mealModal?.classList.remove('active');
}

async function handleMealSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const mealData = {
    date: mealDateInput.value,
    time: mealTimeInput.value,
    items: mealItemsInput.value.split(',').map(i => i.trim()),
    calories: parseInt(mealCaloriesInput.value) || 0,
    notes: mealNotesInput.value,
  };
  
  if (window.jarvisAPI) {
    const newMeal = await window.jarvisAPI.createMeal(mealData);
    healthData.meals.push(newMeal);
  } else {
    const newMeal: Meal = {
      ...mealData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    healthData.meals.push(newMeal);
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  
  closeMealModalFn();
  updateHealthDashboard();
  showToast('Meal logged successfully', 'success');
}

async function deleteMeal(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteMeal(id);
  }
  healthData.meals = healthData.meals.filter(m => m.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  updateHealthDashboard();
  showToast('Meal deleted', 'info');
}

function openAddWeightModal(): void {
  if (weightModal && weightForm) {
    weightForm.reset();
    weightIdInput.value = '';
    weightDateInput.value = getDateString(new Date());
    weightModal.classList.add('active');
  }
}

function closeWeightModalFn(): void {
  weightModal?.classList.remove('active');
}

async function handleWeightSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const entryData = {
    date: weightDateInput.value,
    weight: parseFloat(weightValueInput.value),
    unit: weightUnitInput.value as 'kg' | 'lbs',
    notes: weightNotesInput.value,
  };
  
  if (window.jarvisAPI) {
    const newEntry = await window.jarvisAPI.createWeightEntry(entryData);
    healthData.weightEntries.push(newEntry);
  } else {
    const newEntry: WeightEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    healthData.weightEntries.push(newEntry);
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  
  closeWeightModalFn();
  updateHealthDashboard();
  showToast('Weight logged successfully', 'success');
}

function openAddSleepModal(): void {
  if (sleepModal && sleepForm) {
    sleepForm.reset();
    sleepIdInput.value = '';
    sleepDateInput.value = getDateString(new Date());
    sleepModal.classList.add('active');
  }
}

function closeSleepModalFn(): void {
  sleepModal?.classList.remove('active');
}

async function handleSleepSubmit(e: Event): Promise<void> {
  e.preventDefault();
  
  // Calculate duration in minutes
  const start = sleepStartTimeInput.value.split(':').map(Number);
  const end = sleepEndTimeInput.value.split(':').map(Number);
  let durationMinutes = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
  if (durationMinutes < 0) durationMinutes += 24 * 60; // Handle overnight sleep
  
  const entryData = {
    date: sleepDateInput.value,
    startTime: sleepStartTimeInput.value,
    endTime: sleepEndTimeInput.value,
    durationMinutes,
    quality: sleepQualityInput.value as SleepEntry['quality'],
    notes: sleepNotesInput.value,
  };
  
  if (window.jarvisAPI) {
    const newEntry = await window.jarvisAPI.createSleepEntry(entryData);
    healthData.sleepEntries.push(newEntry);
  } else {
    const newEntry: SleepEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    healthData.sleepEntries.push(newEntry);
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  
  closeSleepModalFn();
  updateHealthDashboard();
  showToast('Sleep logged successfully', 'success');
}

function openAddBPModal(): void {
  if (bpModal && bpForm) {
    bpForm.reset();
    bpIdInput.value = '';
    bpDateInput.value = getDateString(new Date());
    bpModal.classList.add('active');
  }
}

function closeBPModalFn(): void {
  bpModal?.classList.remove('active');
}

async function handleBPSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const entryData = {
    date: bpDateInput.value,
    time: bpTimeInput.value,
    systolic: parseInt(bpSystolicInput.value),
    diastolic: parseInt(bpDiastolicInput.value),
    pulse: bpPulseInput.value ? parseInt(bpPulseInput.value) : null,
    notes: bpNotesInput.value,
  };
  
  if (window.jarvisAPI) {
    const newEntry = await window.jarvisAPI.createBloodPressureEntry(entryData);
    healthData.bloodPressureEntries.push(newEntry);
  } else {
    const newEntry: BloodPressureEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    healthData.bloodPressureEntries.push(newEntry);
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  
  closeBPModalFn();
  updateHealthDashboard();
  showToast('Blood pressure logged successfully', 'success');
}

function openAddMedicationModal(): void {
  if (medicationModal && medicationForm) {
    medicationForm.reset();
    medicationIdInput.value = '';
    medicationStartDateInput.value = getDateString(new Date());
    medicationModal.classList.add('active');
  }
}

function closeMedicationModalFn(): void {
  medicationModal?.classList.remove('active');
}

async function handleMedicationSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const medData = {
    name: medicationNameInput.value,
    dosage: medicationDosageInput.value,
    frequency: medicationFrequencyInput.value as Medication['frequency'],
    times: medicationTimesInput.value.split(',').map(t => t.trim()).filter(t => t),
    startDate: medicationStartDateInput.value || getDateString(new Date()),
    endDate: medicationEndDateInput.value || null,
    active: true,
    notes: medicationNotesInput.value,
  };
  
  if (window.jarvisAPI) {
    const newMed = await window.jarvisAPI.createMedication(medData);
    healthData.medications.push(newMed);
  } else {
    const newMed: Medication = {
      ...medData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    healthData.medications.push(newMed);
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  
  closeMedicationModalFn();
  updateHealthDashboard();
  showToast('Medication added successfully', 'success');
}

async function deleteMedication(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteMedication(id);
  }
  healthData.medications = healthData.medications.filter(m => m.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-health', JSON.stringify(healthData));
  }
  updateHealthDashboard();
  showToast('Medication deleted', 'info');
}

// ========================================
// Bookmarks Module Functions
// ========================================

async function loadBookmarksData(): Promise<void> {
  if (window.jarvisAPI) {
    bookmarksData = await window.jarvisAPI.getBookmarksData();
  } else {
    const saved = localStorage.getItem('jarvis-bookmarks');
    if (saved) bookmarksData = JSON.parse(saved);
  }
  populateBookmarkCategories();
  renderBookmarks();
}

function populateBookmarkCategories(): void {
  if (!bookmarkCategoryFilter || !bookmarkCategoryInput) return;
  
  // Update category filter
  bookmarkCategoryFilter.innerHTML = '<option value="all">All Categories</option>' +
    bookmarksData.categories.map(c => `<option value="${c}">${c}</option>`).join('');
  
  // Update category input in modal
  bookmarkCategoryInput.innerHTML = bookmarksData.categories
    .map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderBookmarks(): void {
  if (!bookmarksGrid) return;
  
  let filtered = [...bookmarksData.bookmarks];
  
  // Apply filters
  const categoryFilter = bookmarkCategoryFilter?.value || 'all';
  const typeFilter = bookmarkTypeFilter?.value || 'all';
  
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(b => b.category === categoryFilter);
  }
  if (typeFilter !== 'all') {
    filtered = filtered.filter(b => b.type === typeFilter);
  }
  
  // Sort by order
  filtered.sort((a, b) => a.order - b.order);
  
  if (filtered.length === 0) {
    bookmarksGrid.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <p>No bookmarks yet</p>
        <span>Click "Add Bookmark" to create your first bookmark</span>
      </div>
    `;
    return;
  }
  
  bookmarksGrid.innerHTML = filtered.map(bookmark => `
    <div class="bookmark-card" data-id="${bookmark.id}">
      <div class="bookmark-icon">
        ${getBookmarkIcon(bookmark.type)}
      </div>
      <span class="bookmark-label">${escapeHtml(bookmark.label)}</span>
      <span class="bookmark-type">${bookmark.type}</span>
      <div class="bookmark-actions">
        <button class="task-action-btn launch" data-id="${bookmark.id}" aria-label="Launch bookmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
        <button class="task-action-btn delete" data-id="${bookmark.id}" aria-label="Delete bookmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  // Add event listeners
  bookmarksGrid.querySelectorAll('.bookmark-card').forEach(card => {
    card.addEventListener('dblclick', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      await launchBookmark(id);
    });
  });
  
  bookmarksGrid.querySelectorAll('.task-action-btn.launch').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      await launchBookmark(id);
    });
  });
  
  bookmarksGrid.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this bookmark?')) {
        await deleteBookmark(id);
      }
    });
  });
}

function getBookmarkIcon(type: string): string {
  const icons: Record<string, string> = {
    url: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    game: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  };
  return icons[type] || icons.file;
}

function openAddBookmarkModal(): void {
  if (bookmarkModal && bookmarkForm) {
    bookmarkForm.reset();
    bookmarkIdInput.value = '';
    bookmarkModal.classList.add('active');
  }
}

function closeBookmarkModalFn(): void {
  bookmarkModal?.classList.remove('active');
}

async function handleBookmarkSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const bookmarkData = {
    label: bookmarkLabelInput.value,
    type: bookmarkTypeInput.value as Bookmark['type'],
    target: bookmarkTargetInput.value,
    icon: null,
    category: bookmarkCategoryInput.value,
    order: bookmarksData.bookmarks.length,
  };
  
  if (window.jarvisAPI) {
    const newBookmark = await window.jarvisAPI.createBookmark(bookmarkData);
    bookmarksData.bookmarks.push(newBookmark);
  } else {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bookmarksData.bookmarks.push(newBookmark);
    localStorage.setItem('jarvis-bookmarks', JSON.stringify(bookmarksData));
  }
  
  closeBookmarkModalFn();
  renderBookmarks();
  showToast('Bookmark added successfully', 'success');
}

async function launchBookmark(id: string): Promise<void> {
  if (window.jarvisAPI) {
    const success = await window.jarvisAPI.launchBookmark(id);
    if (success) {
      showToast('Launching...', 'info');
    } else {
      showToast('Failed to launch bookmark', 'error');
    }
  } else {
    const bookmark = bookmarksData.bookmarks.find(b => b.id === id);
    if (bookmark && bookmark.type === 'url') {
      window.open(bookmark.target, '_blank');
      showToast('Opening in browser...', 'info');
    }
  }
}

async function deleteBookmark(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteBookmark(id);
  }
  bookmarksData.bookmarks = bookmarksData.bookmarks.filter(b => b.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-bookmarks', JSON.stringify(bookmarksData));
  }
  renderBookmarks();
  showToast('Bookmark deleted', 'info');
}

// ========================================
// Tools Module Functions
// ========================================

async function loadToolsData(): Promise<void> {
  if (window.jarvisAPI) {
    toolsData = await window.jarvisAPI.getToolsData();
  } else {
    const saved = localStorage.getItem('jarvis-tools');
    if (saved) toolsData = JSON.parse(saved);
  }
  renderTools();
}

function renderTools(): void {
  if (!toolsGrid) return;
  
  if (toolsData.lastFullScan && toolsLastScan) {
    toolsLastScan.textContent = `Last scan: ${formatDate(toolsData.lastFullScan)}`;
  }
  
  if (toolsData.detectedTools.length === 0) {
    toolsGrid.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        <p>No tools detected yet</p>
        <span>Click "Scan Tools" to detect installed DevOps tools</span>
      </div>
    `;
    return;
  }
  
  const toolIcons: Record<string, string> = {
    terraform: '🏗️',
    docker: '🐳',
    ansible: '🔧',
    python: '🐍',
    node: '💚',
    go: '🔵',
    kubectl: '☸️',
    'aws-cli': '☁️',
  };
  
  toolsGrid.innerHTML = toolsData.detectedTools.map(tool => `
    <div class="tool-card" data-name="${tool.name}">
      <div class="tool-icon">${toolIcons[tool.name] || '🔧'}</div>
      <div class="tool-info">
        <span class="tool-name">${tool.displayName}</span>
        <span class="tool-version">${tool.installed ? `v${tool.version}` : 'Not installed'}</span>
      </div>
      <span class="tool-status ${tool.installed ? 'installed' : 'missing'}">${tool.installed ? 'Installed' : 'Missing'}</span>
      <div class="tool-actions">
        <button class="task-action-btn docs" data-name="${tool.name}" aria-label="Open docs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  toolsGrid.querySelectorAll('.task-action-btn.docs').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const name = (e.currentTarget as HTMLElement).dataset.name!;
      if (window.jarvisAPI) {
        await window.jarvisAPI.openToolDocs(name as DetectedTool['name']);
      } else {
        const tool = toolsData.detectedTools.find(t => t.name === name);
        if (tool) {
          window.open(tool.docsUrl, '_blank');
        }
      }
    });
  });
}

async function handleScanTools(): Promise<void> {
  if (scanToolsBtn) {
    scanToolsBtn.disabled = true;
    scanToolsBtn.textContent = 'Scanning...';
  }
  
  try {
    if (window.jarvisAPI) {
      toolsData.detectedTools = await window.jarvisAPI.scanTools();
    } else {
      // Mock scan for browser testing
      toolsData.detectedTools = [
        { name: 'node', displayName: 'Node.js', installed: true, version: '18.0.0', path: null, docsUrl: 'https://nodejs.org/docs', lastChecked: new Date().toISOString() },
        { name: 'python', displayName: 'Python', installed: true, version: '3.11.0', path: null, docsUrl: 'https://docs.python.org', lastChecked: new Date().toISOString() },
      ];
      localStorage.setItem('jarvis-tools', JSON.stringify(toolsData));
    }
    toolsData.lastFullScan = new Date().toISOString();
    renderTools();
    showToast('Tool scan complete', 'success');
  } catch {
    showToast('Failed to scan tools', 'error');
  } finally {
    if (scanToolsBtn) {
      scanToolsBtn.disabled = false;
      scanToolsBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        Scan Tools
      `;
    }
  }
}

// ========================================
// Update Module Functions
// ========================================

async function handleCheckForUpdates(): Promise<void> {
  if (checkUpdatesBtn) {
    checkUpdatesBtn.disabled = true;
    checkUpdatesBtn.textContent = 'Checking...';
  }
  
  try {
    let updateInfo: UpdateInfo | null = null;
    
    if (window.jarvisAPI) {
      updateInfo = await window.jarvisAPI.checkForUpdates();
    }
    
    if (updateInfo && updateInfo.isOutdated) {
      showUpdateModal(updateInfo);
    } else {
      showToast('You are using the latest version', 'success');
    }
  } catch {
    showToast('Failed to check for updates', 'error');
  } finally {
    if (checkUpdatesBtn) {
      checkUpdatesBtn.disabled = false;
      checkUpdatesBtn.textContent = 'Check for Updates';
    }
  }
}

function showUpdateModal(info: UpdateInfo): void {
  if (currentVersionDisplay) currentVersionDisplay.textContent = `v${info.currentVersion}`;
  if (latestVersionDisplay) latestVersionDisplay.textContent = `v${info.latestVersion}`;
  if (updateNotes) updateNotes.innerHTML = `<p>${escapeHtml(info.releaseNotes) || 'No release notes available.'}</p>`;
  updateModal?.classList.add('active');
}

function closeUpdateModalFn(): void {
  updateModal?.classList.remove('active');
}

async function handleDownloadUpdate(): Promise<void> {
  if (window.jarvisAPI) {
    showToast('Starting download...', 'info');
    const success = await window.jarvisAPI.downloadUpdate();
    if (success) {
      showToast('Download complete. Installing...', 'success');
      await window.jarvisAPI.installUpdate();
    } else {
      showToast('Download not available. Please update manually.', 'warning');
    }
  }
  closeUpdateModalFn();
}

// ========================================
// VPN Module Functions
// ========================================

async function handleImportVPNProfile(): Promise<void> {
  showToast('VPN profile import requires full Electron integration', 'info');
}

// ========================================
// Easter Egg Functions
// ========================================

function handleKonamiCode(e: KeyboardEvent): void {
  konamiSequence.push(e.key);
  
  if (konamiSequence.length > KONAMI_CODE.length) {
    konamiSequence.shift();
  }
  
  if (konamiSequence.join(',') === KONAMI_CODE.join(',')) {
    activateEasterEgg();
    konamiSequence = [];
  }
}

function activateEasterEgg(): void {
  document.body.classList.add('konami-activated');
  showToast('🎮 Konami Code Activated! You found a secret!', 'success');
  
  setTimeout(() => {
    document.body.classList.remove('konami-activated');
  }, 5000);
}

// ========================================
// Initialization
// ========================================

async function init(): Promise<void> {
  await loadSettings();
  await loadTasks();
  await loadEvents();
  await loadHealthData();
  await loadBookmarksData();
  await loadToolsData();
  setupEventListeners();
  renderCalendar();
  
  // Update app version display
  if (appVersion && window.jarvisAPI) {
    const version = await window.jarvisAPI.getAppVersion();
    if (version) appVersion.textContent = `Version ${version}`;
  }
}

document.addEventListener('DOMContentLoaded', init);
