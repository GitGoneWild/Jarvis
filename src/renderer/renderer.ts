// Type declarations for Jarvis API exposed via preload
import type { UserSettings, Task, CalendarEvent, EventType } from '../types/global';

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
}

// ========================================
// Initialization
// ========================================

async function init(): Promise<void> {
  await loadSettings();
  await loadTasks();
  await loadEvents();
  setupEventListeners();
  renderCalendar();
}

document.addEventListener('DOMContentLoaded', init);
