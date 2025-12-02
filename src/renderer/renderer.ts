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
  TimerData,
  ActivityTimer,
  NewsData,
  MovieTVRecommendation,
  RecommendationAnswer,
  ApiServiceName,
  FunFact,
  OnThisDay,
  MP3Data,
  MP3Track,
} from '../modules/shared/types';

// ========================================
// Constants
// ========================================

// Priority order for sorting (lower = higher priority)
const PRIORITY_ORDER: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

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
const greetingText = document.getElementById('greetingText') as HTMLElement;
const homeDate = document.getElementById('homeDate') as HTMLElement;
const tasksToday = document.getElementById('tasksToday') as HTMLElement;
const eventsToday = document.getElementById('eventsToday') as HTMLElement;
const overdueCount = document.getElementById('overdueCount') as HTMLElement;
const weekTasksCount = document.getElementById('weekTasksCount') as HTMLElement;
const nextUpContent = document.getElementById('nextUpContent') as HTMLElement;
const upcomingTasksList = document.getElementById('upcomingTasksList') as HTMLElement;
const upcomingEventsList = document.getElementById('upcomingEventsList') as HTMLElement;
const birthdaysList = document.getElementById('birthdaysList') as HTMLElement;
const importantEventsList = document.getElementById('importantEventsList') as HTMLElement;
const quickAddTask = document.getElementById('quickAddTask') as HTMLButtonElement;
const quickAddEvent = document.getElementById('quickAddEvent') as HTMLButtonElement;
const goToToday = document.getElementById('goToToday') as HTMLButtonElement;

// Settings Navigation
const settingsNavItems = document.querySelectorAll('.settings-nav-item') as NodeListOf<HTMLElement>;
const settingsCategories = document.querySelectorAll('.settings-category') as NodeListOf<HTMLElement>;
const resetSettingsBtn = document.getElementById('resetSettingsBtn') as HTMLButtonElement;

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

// Module Toggle Settings
const healthEnabledToggle = document.getElementById('healthEnabled') as HTMLInputElement;
const bookmarksEnabledToggle = document.getElementById('bookmarksEnabled') as HTMLInputElement;
const vpnEnabledToggle = document.getElementById('vpnEnabled') as HTMLInputElement;
const toolsEnabledToggle = document.getElementById('toolsEnabled') as HTMLInputElement;
const timerEnabledToggle = document.getElementById('timerEnabled') as HTMLInputElement;
const newsEnabledToggle = document.getElementById('newsEnabled') as HTMLInputElement;
const playgroundEnabledToggle = document.getElementById('playgroundEnabled') as HTMLInputElement;
const mp3EnabledToggle = document.getElementById('mp3Enabled') as HTMLInputElement;

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

// Timer Module Elements
const startTimerBtn = document.getElementById('startTimerBtn') as HTMLButtonElement;
const stopTimerBtn = document.getElementById('stopTimerBtn') as HTMLButtonElement;
const activeTimerDisplay = document.getElementById('activeTimerDisplay') as HTMLElement;
const timerFormCard = document.getElementById('timerFormCard') as HTMLElement;
const timerForm = document.getElementById('timerForm') as HTMLFormElement;
const timerNameInput = document.getElementById('timerName') as HTMLInputElement;
const timerCategoryInput = document.getElementById('timerCategory') as HTMLSelectElement;
const timerTagsInput = document.getElementById('timerTags') as HTMLInputElement;
const cancelTimerBtn = document.getElementById('cancelTimerBtn') as HTMLButtonElement;
const activitiesList = document.getElementById('activitiesList') as HTMLElement;
const activityCategoryFilter = document.getElementById('activityCategoryFilter') as HTMLSelectElement;
const totalTimeToday = document.getElementById('totalTimeToday') as HTMLElement;
const activitiesCountToday = document.getElementById('activitiesCountToday') as HTMLElement;
const topCategoryToday = document.getElementById('topCategoryToday') as HTMLElement;

// News Module Elements
const refreshNewsBtn = document.getElementById('refreshNewsBtn') as HTMLButtonElement;
const newsLastUpdated = document.getElementById('newsLastUpdated') as HTMLElement;
const newsArticlesList = document.getElementById('newsArticlesList') as HTMLElement;
const sportsScoresList = document.getElementById('sportsScoresList') as HTMLElement;

// Recommender Module Elements
const questionnaireCard = document.getElementById('questionnaireCard') as HTMLElement;
const recommendationsCard = document.getElementById('recommendationsCard') as HTMLElement;
const currentQuestion = document.getElementById('currentQuestion') as HTMLElement;
const optionsGrid = document.getElementById('optionsGrid') as HTMLElement;
const progressText = document.getElementById('progressText') as HTMLElement;
const questionProgressFill = document.getElementById('questionProgressFill') as HTMLElement;
const restartQuestionnaireBtn = document.getElementById('restartQuestionnaireBtn') as HTMLButtonElement;
const newRecommendationsBtn = document.getElementById('newRecommendationsBtn') as HTMLButtonElement;
const recommendationsGrid = document.getElementById('recommendationsGrid') as HTMLElement;

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

// Timer module state
let timerData: TimerData = {
  activities: [],
  activeTimer: null,
};
let timerInterval: ReturnType<typeof setInterval> | null = null;

// News module state
let newsData: NewsData = {
  articles: [],
  sports: [],
  lastUpdated: null,
};

// Playground module state
let currentFunFact: FunFact | null = null;
let currentOnThisDay: OnThisDay[] = [];

// MP3 module state
let mp3Data: MP3Data = {
  folders: [],
  tracks: [],
  playHistory: [],
  playbackState: {
    currentTrackId: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    shuffle: false,
    repeat: 'none',
  },
};

// Recommender module state
const recommendationQuestions = [
  { id: 'q1', question: 'What genre are you in the mood for?', options: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'] },
  { id: 'q2', question: 'How much time do you have?', options: ['Quick (under 90 min)', 'Standard (90-120 min)', 'Long (over 2 hours)', 'Series (multiple episodes)'] },
  { id: 'q3', question: 'What era do you prefer?', options: ['Classic (before 2000)', 'Modern (2000-2015)', 'Recent (2015-present)', 'No preference'] },
  { id: 'q4', question: 'What rating are you looking for?', options: ['Critically acclaimed (8+)', 'Good (7-8)', 'Anything watchable (6+)', 'Hidden gems'] },
  { id: 'q5', question: 'What mood are you in?', options: ['Feel-good', 'Thrilling', 'Thought-provoking', 'Relaxing', 'Intense'] },
];
let currentQuestionIndex = 0;
let recommendationAnswers: RecommendationAnswer[] = [];

// Easter egg state
let konamiSequence: string[] = [];
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Additional Easter Egg codes
const GTA_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight']; // Party mode
const RETRO_CODE = ['ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowDown']; // Retro filter

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

  // Apply module visibility in navbar
  updateNavbarModuleVisibility();

  // Navigate to default start page
  navigateToSection(settings.defaultStartPage);

  // Apply platform class
  if (window.jarvisAPI) {
    const platform = window.jarvisAPI.getPlatform();
    document.body.classList.add(`platform-${platform}`);
  }
}

// Update navbar visibility based on module settings
function updateNavbarModuleVisibility(): void {
  if (!settings?.modules) return;

  // Map navbar sections to their module settings
  const moduleMapping: Record<string, boolean> = {
    'health': settings.modules.health?.enabled ?? true,
    'vpn': settings.modules.vpn?.enabled ?? true,
    'bookmarks': settings.modules.bookmarks?.enabled ?? true,
    'tools': settings.modules.tools?.enabled ?? true,
    'timers': settings.modules.timer?.enabled ?? true,
    'news': settings.modules.news?.enabled ?? true,
    'playground': settings.modules.playground?.enabled ?? true,
    'mp3': settings.modules.mp3?.enabled ?? true,
  };

  // Update visibility of each nav item based on module settings
  navItems.forEach((item) => {
    const section = item.getAttribute('data-section');
    if (section && section in moduleMapping) {
      const isEnabled = moduleMapping[section];
      item.style.display = isEnabled ? '' : 'none';
    }
  });
}

function applyTheme(theme: 'dark' | 'light' | 'system'): void {
  let effectiveTheme = theme;
  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${effectiveTheme}-theme`);
}

function updateThemeRadioButtons(): void {
  const themeDark = document.getElementById('themeDark') as HTMLInputElement;
  const themeLight = document.getElementById('themeLight') as HTMLInputElement;
  const themeSystem = document.getElementById('themeSystem') as HTMLInputElement;
  
  if (themeDark) themeDark.checked = settings.theme === 'dark';
  if (themeLight) themeLight.checked = settings.theme === 'light';
  if (themeSystem) themeSystem.checked = settings.theme === 'system';
}

function populateSettingsUI(): void {
  themeSelect.value = settings.theme;
  updateThemeRadioButtons();
  sidebarToggleSetting.checked = settings.sidebarExpanded;
  startPageSelect.value = settings.defaultStartPage;
  notificationsEnabled.checked = settings.notifications.enabled;
  soundsEnabled.checked = settings.notifications.sounds;
  taskReminders.checked = settings.notifications.taskReminders;
  eventReminders.checked = settings.notifications.eventReminders;

  // Populate module toggles
  if (settings.modules) {
    if (healthEnabledToggle) healthEnabledToggle.checked = settings.modules.health?.enabled ?? true;
    if (bookmarksEnabledToggle) bookmarksEnabledToggle.checked = settings.modules.bookmarks?.enabled ?? true;
    if (vpnEnabledToggle) vpnEnabledToggle.checked = settings.modules.vpn?.enabled ?? true;
    if (toolsEnabledToggle) toolsEnabledToggle.checked = settings.modules.tools?.enabled ?? true;
    if (timerEnabledToggle) timerEnabledToggle.checked = settings.modules.timer?.enabled ?? true;
    if (newsEnabledToggle) newsEnabledToggle.checked = settings.modules.news?.enabled ?? true;
    if (playgroundEnabledToggle) playgroundEnabledToggle.checked = settings.modules.playground?.enabled ?? true;
    if (mp3EnabledToggle) mp3EnabledToggle.checked = settings.modules.mp3?.enabled ?? true;
  }
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
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function updateDashboard(): void {
  const today = new Date();
  const todayStr = getDateString(today);

  // Update greeting and date
  if (greetingText) {
    greetingText.textContent = getGreeting();
  }
  if (homeDate) {
    homeDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  // Count tasks due today
  const tasksDueToday = tasks.filter(t => t.dueDate === todayStr && t.status === 'pending').length;
  if (tasksToday) tasksToday.textContent = tasksDueToday.toString();

  // Count events today
  const eventsTodayCount = getEventsForDate(today).length;
  if (eventsToday) eventsToday.textContent = eventsTodayCount.toString();

  // Count overdue tasks
  const overdueTasks = tasks.filter(t => t.status === 'pending' && isOverdue(t.dueDate)).length;
  if (overdueCount) overdueCount.textContent = overdueTasks.toString();

  // Count tasks this week
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const weekTasks = tasks.filter(t => {
    if (t.status !== 'pending' || !t.dueDate) return false;
    const dueDate = new Date(t.dueDate);
    return dueDate >= today && dueDate <= nextWeek;
  }).length;
  if (weekTasksCount) weekTasksCount.textContent = weekTasks.toString();

  // Render "Next Up" - most urgent task
  const nextTask = tasks
    .filter(t => t.status === 'pending')
    .sort((a, b) => {
      // Overdue first, then by due date
      const aOverdue = isOverdue(a.dueDate);
      const bOverdue = isOverdue(b.dueDate);
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      // Then by priority
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      // Then by due date
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })[0];

  if (nextUpContent) {
    if (nextTask) {
      const isTaskOverdue = isOverdue(nextTask.dueDate);
      nextUpContent.innerHTML = `
        <div class="next-up-item">
          <div class="next-up-priority ${nextTask.priority}"></div>
          <div class="next-up-info">
            <div class="next-up-title">${escapeHtml(nextTask.title)}</div>
            <div class="next-up-meta ${isTaskOverdue ? 'overdue' : ''}">
              ${isTaskOverdue ? '<span class="overdue-indicator">Overdue:</span> ' : ''}${nextTask.dueDate ? formatDate(nextTask.dueDate) : 'No due date'} 
              · ${nextTask.priority.charAt(0).toUpperCase() + nextTask.priority.slice(1)} priority
            </div>
          </div>
        </div>
      `;
    } else {
      nextUpContent.innerHTML = `
        <div class="empty-state-modern">
          <div class="empty-icon-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <p class="empty-title">All caught up!</p>
          <p class="empty-subtitle">No pending tasks for today</p>
        </div>
      `;
    }
  }

  // Render upcoming tasks (next 7 days, pending only)
  const upcomingTasks = tasks
    .filter(t => t.status === 'pending')
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  if (upcomingTasksList) {
    if (upcomingTasks.length === 0) {
      upcomingTasksList.innerHTML = `
        <div class="empty-state-modern">
          <div class="empty-icon-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <p class="empty-title">No upcoming tasks</p>
          <p class="empty-subtitle">Click "New Task" to create one</p>
        </div>
      `;
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
  }

  // Render upcoming events (next 7 days)
  const upcomingEvents = events
    .filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (upcomingEventsList) {
    if (upcomingEvents.length === 0) {
      upcomingEventsList.innerHTML = `
        <div class="empty-state-modern">
          <div class="empty-icon-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <p class="empty-title">No upcoming events</p>
          <p class="empty-subtitle">Your schedule is clear</p>
        </div>
      `;
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
  }

  // Render birthdays this week
  const birthdays = events
    .filter(e => e.type === 'birthday')
    .filter(e => {
      const eventDate = new Date(e.date);
      const thisYearDate = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return thisYearDate >= today && thisYearDate <= nextWeek;
    });

  if (birthdaysList) {
    if (birthdays.length === 0) {
      birthdaysList.innerHTML = '<p class="highlight-empty">No birthdays this week</p>';
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

  // Render important events this week (meetings, reminders)
  const importantEvents = events
    .filter(e => e.type === 'meeting' || e.type === 'reminder')
    .filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .slice(0, 3);

  if (importantEventsList) {
    if (importantEvents.length === 0) {
      importantEventsList.innerHTML = '<p class="highlight-empty">No important events</p>';
    } else {
      importantEventsList.innerHTML = importantEvents.map(event => `
        <div class="preview-item" style="padding: 8px 0;">
          <span class="event-type-badge ${event.type}">${event.type}</span>
          <div class="preview-item-content">
            <div class="preview-item-title">${escapeHtml(event.title)}</div>
            <div class="preview-item-meta">${formatDate(event.date)}</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Render news bulletins on home page
  renderNewsBulletins();
  
  // Render health alerts on home page
  renderHealthAlerts();
}

function renderNewsBulletins(): void {
  const newsBulletinsContent = document.getElementById('newsBulletinsContent');
  if (!newsBulletinsContent) return;

  if (newsData.articles.length === 0) {
    newsBulletinsContent.innerHTML = `
      <div class="empty-state-modern">
        <div class="empty-icon-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2z"/>
            <line x1="10" y1="6" x2="18" y2="6"/>
            <line x1="10" y1="10" x2="18" y2="10"/>
          </svg>
        </div>
        <p class="empty-title">No news yet</p>
        <p class="empty-subtitle">Visit News page to load headlines</p>
      </div>
    `;
    return;
  }

  // Display top 5 news articles
  const topNews = newsData.articles.slice(0, 5);
  newsBulletinsContent.innerHTML = topNews.map(article => `
    <div class="news-bulletin-item" data-url="${escapeHtml(article.url || '')}">
      <div class="news-bulletin-content">
        <span class="news-bulletin-source">${escapeHtml(article.source || 'News')}</span>
        <div class="news-bulletin-title">${escapeHtml(article.title)}</div>
        ${article.publishedAt ? `<span class="news-bulletin-time">${formatRelativeTime(article.publishedAt)}</span>` : ''}
      </div>
    </div>
  `).join('');

  // Add click handlers to open articles
  newsBulletinsContent.querySelectorAll('.news-bulletin-item').forEach(item => {
    item.addEventListener('click', () => {
      const url = (item as HTMLElement).dataset.url;
      if (url) {
        window.open(url, '_blank');
      }
    });
  });
}

function renderHealthAlerts(): void {
  const healthAlertsContent = document.getElementById('healthAlertsContent');
  if (!healthAlertsContent) return;

  const alerts: Array<{ type: string; icon: string; title: string; description: string; priority: 'urgent' | 'warning' | 'info' }> = [];

  // Check for medications due today
  if (healthData.medications && healthData.medications.length > 0) {
    const activeMeds = healthData.medications.filter(med => med.active !== false);
    
    activeMeds.forEach(med => {
      alerts.push({
        type: 'medication',
        icon: '💊',
        title: med.name,
        description: `Take ${med.dosage} - ${med.frequency}`,
        priority: 'info',
      });
    });
  }

  // Check weight tracking - remind if no recent entries
  if (healthData.weightEntries && healthData.weightEntries.length > 0) {
    const lastWeight = healthData.weightEntries[healthData.weightEntries.length - 1];
    const lastDate = new Date(lastWeight.date);
    const daysSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince > 7) {
      alerts.push({
        type: 'reminder',
        icon: '⚖️',
        title: 'Log Your Weight',
        description: `Last logged ${daysSince} days ago`,
        priority: 'warning',
      });
    }
  }

  // Check blood pressure - remind if no recent entries
  if (healthData.bloodPressureEntries && healthData.bloodPressureEntries.length > 0) {
    const lastBP = healthData.bloodPressureEntries[healthData.bloodPressureEntries.length - 1];
    const lastDate = new Date(lastBP.date);
    const daysSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince > 3) {
      alerts.push({
        type: 'reminder',
        icon: '❤️',
        title: 'Check Blood Pressure',
        description: `Last checked ${daysSince} days ago`,
        priority: 'warning',
      });
    }
  }

  if (alerts.length === 0) {
    healthAlertsContent.innerHTML = `
      <div class="empty-state-modern">
        <div class="empty-icon-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p class="empty-title">All good!</p>
        <p class="empty-subtitle">No health alerts today</p>
      </div>
    `;
    return;
  }

  healthAlertsContent.innerHTML = alerts.map(alert => `
    <div class="health-alert-item ${alert.priority}">
      <div class="health-alert-icon">${alert.icon}</div>
      <div class="health-alert-content">
        <div class="health-alert-title">${escapeHtml(alert.title)}</div>
        <div class="health-alert-description">${escapeHtml(alert.description)}</div>
      </div>
    </div>
  `).join('');
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// ========================================
// Navigation Functions
// ========================================

function navigateToSection(sectionId: string): void {
  // Check if the target module is disabled - if so, redirect to home
  const moduleMapping: Record<string, boolean | undefined> = {
    'health': settings?.modules?.health?.enabled,
    'vpn': settings?.modules?.vpn?.enabled,
    'bookmarks': settings?.modules?.bookmarks?.enabled,
    'tools': settings?.modules?.tools?.enabled,
    'timers': settings?.modules?.timer?.enabled,
    'news': settings?.modules?.news?.enabled,
    'playground': settings?.modules?.playground?.enabled,
    'mp3': settings?.modules?.mp3?.enabled,
  };

  // If the module is explicitly disabled, redirect to home
  if (sectionId in moduleMapping && moduleMapping[sectionId] === false) {
    sectionId = 'home';
  }

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
    updateThemeRadioButtons();
  });

  // Theme radio buttons
  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const value = (e.target as HTMLInputElement).value as 'dark' | 'light' | 'system';
      settings.theme = value;
      themeSelect.value = value;
      applyTheme(settings.theme);
      saveSettings();
    });
  });

  // Settings navigation
  settingsNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      if (category) {
        settingsNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        settingsCategories.forEach(cat => {
          cat.classList.remove('active');
          if (cat.id === `settings-${category}`) {
            cat.classList.add('active');
          }
        });
      }
    });
  });

  // Reset settings button
  resetSettingsBtn?.addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      const defaultSettings: UserSettings = {
        theme: 'dark',
        sidebarExpanded: true,
        defaultStartPage: 'home',
        notifications: {
          enabled: true,
          sounds: true,
          taskReminders: true,
          eventReminders: true,
        },
        modules: settings.modules, // Keep existing module settings
      };
      settings = defaultSettings;
      await saveSettings();
      applySettings();
      populateSettingsUI();
      showToast('Settings reset to defaults', 'success');
    }
  });

  // Status card navigation
  document.querySelectorAll('.status-card-action').forEach(action => {
    action.addEventListener('click', () => {
      const section = (action as HTMLElement).dataset.navigate;
      if (section) navigateToSection(section);
    });
  });

  // Quick setting items navigation
  document.querySelectorAll('.quick-setting-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = (item as HTMLElement).dataset.navigate;
      if (section) navigateToSection(section);
    });
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

  // Module toggle event listeners
  healthEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.health) {
      settings.modules.health.enabled = healthEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  bookmarksEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.bookmarks) {
      settings.modules.bookmarks.enabled = bookmarksEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  vpnEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.vpn) {
      settings.modules.vpn.enabled = vpnEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  toolsEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.tools) {
      settings.modules.tools.enabled = toolsEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  timerEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.timer) {
      settings.modules.timer.enabled = timerEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  newsEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.news) {
      settings.modules.news.enabled = newsEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  playgroundEnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.playground) {
      settings.modules.playground.enabled = playgroundEnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
  });

  mp3EnabledToggle?.addEventListener('change', () => {
    if (settings.modules?.mp3) {
      settings.modules.mp3.enabled = mp3EnabledToggle.checked;
      saveSettings();
      updateNavbarModuleVisibility();
    }
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
  
  // Apply search filter
  const searchInput = document.getElementById('bookmarkSearchInput') as HTMLInputElement;
  const searchTerm = searchInput?.value?.toLowerCase() || '';
  
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(b => b.category === categoryFilter);
  }
  if (typeFilter !== 'all') {
    filtered = filtered.filter(b => b.type === typeFilter);
  }
  if (searchTerm) {
    filtered = filtered.filter(b => 
      b.label.toLowerCase().includes(searchTerm) || 
      b.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort by order
  filtered.sort((a, b) => a.order - b.order);
  
  if (filtered.length === 0) {
    bookmarksGrid.innerHTML = `
      <div class="empty-state-modern">
        <div class="empty-icon-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <p class="empty-title">No bookmarks yet</p>
        <p class="empty-subtitle">Click "Add Bookmark" to save your favorites</p>
      </div>
    `;
    return;
  }
  
  bookmarksGrid.innerHTML = filtered.map(bookmark => `
    <div class="bookmark-card-modern" data-id="${bookmark.id}">
      <div class="bookmark-card-icon ${bookmark.type}">
        ${getBookmarkEmoji(bookmark.type)}
      </div>
      <div class="bookmark-card-info">
        <div class="bookmark-card-label">${escapeHtml(bookmark.label)}</div>
        <div class="bookmark-card-category">${escapeHtml(bookmark.category)}</div>
      </div>
      <div class="bookmark-card-actions">
        <button class="bookmark-action-btn edit-btn" data-id="${bookmark.id}" aria-label="Edit bookmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="bookmark-action-btn delete-btn" data-id="${bookmark.id}" aria-label="Delete bookmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  // Add event listeners
  bookmarksGrid.querySelectorAll('.bookmark-card-modern').forEach(card => {
    card.addEventListener('click', async (e) => {
      if ((e.target as HTMLElement).closest('.bookmark-card-actions')) return;
      const id = (card as HTMLElement).dataset.id!;
      await launchBookmark(id);
    });
  });
  
  bookmarksGrid.querySelectorAll('.bookmark-action-btn.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this bookmark?')) {
        await deleteBookmark(id);
      }
    });
  });
}

function getBookmarkEmoji(type: string): string {
  const emojis: Record<string, string> = {
    url: '🌐',
    app: '📱',
    game: '🎮',
    file: '📄',
    folder: '📁',
  };
  return emojis[type] || '🔗';
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
    scanToolsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
      Scanning...
    `;
  }
  
  // Show scanning indicator in the tools grid
  if (toolsGrid) {
    toolsGrid.innerHTML = `
      <div class="scanning-indicator">
        <div class="scanning-spinner"></div>
        <p>Scanning for DevOps tools...</p>
        <span>This may take a few seconds</span>
      </div>
    `;
  }
  
  try {
    if (window.jarvisAPI) {
      toolsData.detectedTools = await window.jarvisAPI.scanTools();
    } else {
      // Mock scan for browser testing - simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      toolsData.detectedTools = [
        { name: 'node', displayName: 'Node.js', installed: true, version: '18.0.0', path: null, docsUrl: 'https://nodejs.org/docs', lastChecked: new Date().toISOString() },
        { name: 'python', displayName: 'Python', installed: true, version: '3.11.0', path: null, docsUrl: 'https://docs.python.org', lastChecked: new Date().toISOString() },
        { name: 'docker', displayName: 'Docker', installed: true, version: '24.0.0', path: null, docsUrl: 'https://docs.docker.com', lastChecked: new Date().toISOString() },
        { name: 'go', displayName: 'Go', installed: false, version: '', path: null, docsUrl: 'https://go.dev/doc/', lastChecked: new Date().toISOString() },
        { name: 'kubectl', displayName: 'kubectl', installed: false, version: '', path: null, docsUrl: 'https://kubernetes.io/docs/', lastChecked: new Date().toISOString() },
      ];
      localStorage.setItem('jarvis-tools', JSON.stringify(toolsData));
    }
    toolsData.lastFullScan = new Date().toISOString();
    renderTools();
    
    // Show success with count
    const installedCount = toolsData.detectedTools.filter(t => t.installed).length;
    const totalCount = toolsData.detectedTools.length;
    showToast(`Scan complete: ${installedCount} of ${totalCount} tools installed`, 'success');
  } catch (error) {
    console.error('Tool scan failed:', error);
    
    // Show specific error message based on error type
    let errorMessage = 'Failed to scan tools. ';
    if (error instanceof Error) {
      if (error.message.includes('permission')) {
        errorMessage += 'Check file permissions and try again.';
      } else if (error.message.includes('timeout')) {
        errorMessage += 'The scan timed out. Try again later.';
      } else {
        errorMessage += 'Please try again or check the console for details.';
      }
    } else {
      errorMessage += 'Please try again or check the console for details.';
    }
    
    showToast(errorMessage, 'error');
    
    // Show error state in the grid
    if (toolsGrid) {
      toolsGrid.innerHTML = `
        <div class="empty-state error-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>Scan failed</p>
          <span>Click "Scan Tools" to try again</span>
        </div>
      `;
    }
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

// VPN state
let vpnProfiles: Array<{
  id: string;
  name: string;
  type: string;
  status: 'disconnected' | 'connecting' | 'connected';
}> = [];

async function loadVPNData(): Promise<void> {
  try {
    if (window.jarvisAPI) {
      const vpnData = await window.jarvisAPI.getVPNData();
      // Use the data from the API
      if (vpnData && vpnData.profiles) {
        vpnProfiles = vpnData.profiles.map(p => ({
          id: p.id,
          name: p.name,
          type: 'OpenVPN',
          status: 'disconnected' as const,
        }));
      }
    }
    renderVPNProfiles();
  } catch (error) {
    console.error('Failed to load VPN data:', error);
  }
}

function renderVPNProfiles(): void {
  const vpnProfilesList = document.getElementById('vpnProfilesList');
  if (!vpnProfilesList) return;

  if (vpnProfiles.length === 0) {
    vpnProfilesList.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <p>No VPN profiles</p>
        <span>Import an OVPN configuration file to get started</span>
      </div>
    `;
    return;
  }

  vpnProfilesList.innerHTML = vpnProfiles.map(profile => `
    <div class="vpn-profile-item" data-id="${profile.id}">
      <div class="vpn-profile-info">
        <div class="vpn-profile-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div class="vpn-profile-details">
          <span class="vpn-profile-name">${escapeHtml(profile.name)}</span>
          <span class="vpn-profile-type">${escapeHtml(profile.type)}</span>
        </div>
      </div>
      <div class="vpn-profile-actions">
        <span class="vpn-profile-status ${profile.status}">${profile.status}</span>
        <button class="vpn-connect-btn ${profile.status === 'connected' ? 'disconnect' : ''}" data-id="${profile.id}">
          ${profile.status === 'connected' ? 'Disconnect' : 'Connect'}
        </button>
        <button class="task-action-btn delete" data-id="${profile.id}" aria-label="Delete profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners for connect/disconnect buttons
  vpnProfilesList.querySelectorAll('.vpn-connect-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      const profile = vpnProfiles.find(p => p.id === id);
      if (profile) {
        if (profile.status === 'connected') {
          await handleVPNDisconnect();
        } else {
          await handleVPNConnect(id);
        }
      }
    });
  });

  // Add event listeners for delete buttons
  vpnProfilesList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this VPN profile?')) {
        await handleDeleteVPNProfile(id);
      }
    });
  });
}

async function handleImportVPNProfile(): Promise<void> {
  if (window.jarvisAPI) {
    // In a full implementation, this would open a file dialog
    showToast('Select an OVPN file to import', 'info');
    // For now, show a placeholder since file dialog requires more integration
    showToast('VPN profile import requires selecting a file from your system', 'info');
  } else {
    // Demo mode - add a mock profile
    const mockProfile = {
      id: `vpn-${Date.now()}`,
      name: `Demo VPN ${vpnProfiles.length + 1}`,
      type: 'OpenVPN',
      status: 'disconnected' as const,
    };
    vpnProfiles.push(mockProfile);
    renderVPNProfiles();
    showToast('Demo VPN profile added', 'success');
  }
}

async function handleVPNConnect(profileId: string): Promise<void> {
  const profile = vpnProfiles.find(p => p.id === profileId);
  if (!profile) return;

  profile.status = 'connecting';
  renderVPNProfiles();
  updateVPNStatus('connecting', profile.name);

  try {
    if (window.jarvisAPI) {
      const success = await window.jarvisAPI.connectVPN(profileId);
      if (success) {
        profile.status = 'connected';
        updateVPNStatus('connected', profile.name);
        showToast(`Connected to ${profile.name}`, 'success');
      } else {
        profile.status = 'disconnected';
        updateVPNStatus('disconnected', null);
        showToast('Failed to connect to VPN', 'error');
      }
    } else {
      // Demo mode - simulate connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      profile.status = 'connected';
      updateVPNStatus('connected', profile.name);
      showToast(`Connected to ${profile.name}`, 'success');
    }
  } catch (error) {
    console.error('VPN connection failed:', error);
    profile.status = 'disconnected';
    updateVPNStatus('disconnected', null);
    showToast('VPN connection failed', 'error');
  }

  renderVPNProfiles();
}

async function handleVPNDisconnect(): Promise<void> {
  const connectedProfile = vpnProfiles.find(p => p.status === 'connected');
  
  try {
    if (window.jarvisAPI) {
      await window.jarvisAPI.disconnectVPN();
    } else {
      // Demo mode - simulate disconnection
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    vpnProfiles.forEach(p => p.status = 'disconnected');
    updateVPNStatus('disconnected', null);
    renderVPNProfiles();
    showToast(connectedProfile ? `Disconnected from ${connectedProfile.name}` : 'VPN disconnected', 'info');
  } catch (error) {
    console.error('VPN disconnection failed:', error);
    showToast('Failed to disconnect VPN', 'error');
  }
}

async function handleDeleteVPNProfile(profileId: string): Promise<void> {
  const profile = vpnProfiles.find(p => p.id === profileId);
  if (!profile) return;

  try {
    if (window.jarvisAPI) {
      await window.jarvisAPI.deleteVPNProfile(profileId);
    }
    vpnProfiles = vpnProfiles.filter(p => p.id !== profileId);
    renderVPNProfiles();
    showToast(`Deleted profile: ${profile.name}`, 'info');
  } catch (error) {
    console.error('Failed to delete VPN profile:', error);
    showToast('Failed to delete VPN profile', 'error');
  }
}

function updateVPNStatus(status: 'disconnected' | 'connecting' | 'connected', profileName: string | null): void {
  const statusIndicator = document.getElementById('vpnStatusIndicator');
  const statusLabel = document.getElementById('vpnStatusLabel');
  const activeProfile = document.getElementById('vpnActiveProfile');
  const statusDetails = document.getElementById('vpnStatusDetails');
  const statusIcon = statusIndicator?.querySelector('.vpn-status-icon');

  if (statusLabel) {
    statusLabel.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  }

  if (activeProfile) {
    activeProfile.textContent = profileName ? `Connected to: ${profileName}` : 'No active connection';
  }

  if (statusIcon) {
    statusIcon.classList.remove('disconnected', 'connecting', 'connected');
    statusIcon.classList.add(status);
  }

  if (statusDetails) {
    statusDetails.style.display = status === 'connected' ? 'flex' : 'none';
  }
}

// ========================================
// Timer Module Functions
// ========================================

async function loadTimerData(): Promise<void> {
  if (window.jarvisAPI) {
    timerData = await window.jarvisAPI.getTimerData();
  } else {
    const saved = localStorage.getItem('jarvis-timer');
    if (saved) timerData = JSON.parse(saved);
  }
  renderActiveTimer();
  renderActivities();
  updateTimerSummary();
}

function renderActiveTimer(): void {
  if (!activeTimerDisplay) return;
  
  if (timerData.activeTimer) {
    const startTime = new Date(timerData.activeTimer.startTime);
    
    activeTimerDisplay.innerHTML = `
      <div class="timer-status-active">
        <span class="timer-name">${escapeHtml(timerData.activeTimer.name)}</span>
        <span class="timer-category-badge">${escapeHtml(timerData.activeTimer.category)}</span>
        <span class="timer-elapsed" id="timerElapsed">00:00:00</span>
        <span class="timer-started-at">Started at ${formatTime(startTime.toTimeString().slice(0, 5))}</span>
      </div>
    `;
    
    if (startTimerBtn) startTimerBtn.style.display = 'none';
    if (stopTimerBtn) stopTimerBtn.style.display = 'inline-flex';
    
    // Start interval to update elapsed time
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateElapsedTime, 1000);
    updateElapsedTime();
  } else {
    activeTimerDisplay.innerHTML = `
      <div class="timer-status-idle">
        <span class="timer-idle-text">No timer running</span>
      </div>
    `;
    
    if (startTimerBtn) startTimerBtn.style.display = 'inline-flex';
    if (stopTimerBtn) stopTimerBtn.style.display = 'none';
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
}

function updateElapsedTime(): void {
  if (!timerData.activeTimer) return;
  
  const timerElapsed = document.getElementById('timerElapsed');
  if (!timerElapsed) return;
  
  const startTime = new Date(timerData.activeTimer.startTime);
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  
  timerElapsed.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function renderActivities(): void {
  if (!activitiesList) return;
  
  const filter = activityCategoryFilter?.value || 'all';
  let filtered = [...timerData.activities];
  
  if (filter !== 'all') {
    filtered = filtered.filter(a => a.category === filter);
  }
  
  // Sort by most recent
  filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  
  if (filtered.length === 0) {
    activitiesList.innerHTML = `
      <div class="empty-state">
        <p>No activities recorded yet</p>
        <span>Start a timer to track your activities</span>
      </div>
    `;
    return;
  }
  
  const categoryIcons: Record<string, string> = {
    'Work': '💼',
    'Exercise': '🏃',
    'Learning': '📚',
    'Personal': '🏠',
    'Other': '📌',
  };
  
  activitiesList.innerHTML = filtered.slice(0, 20).map(activity => `
    <div class="activity-item" data-id="${activity.id}">
      <div class="activity-icon">${categoryIcons[activity.category] || '📌'}</div>
      <div class="activity-info">
        <span class="activity-name">${escapeHtml(activity.name)}</span>
        <span class="activity-meta">${activity.category} • ${formatDate(activity.startTime)}</span>
      </div>
      <span class="activity-duration">${formatDuration(activity.duration)}</span>
      <div class="task-actions">
        <button class="task-action-btn delete" data-id="${activity.id}" aria-label="Delete activity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  activitiesList.querySelectorAll('.task-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this activity?')) {
        await deleteActivity(id);
      }
    });
  });
}

async function deleteActivity(id: string): Promise<void> {
  if (window.jarvisAPI) {
    await window.jarvisAPI.deleteActivity(id);
  }
  timerData.activities = timerData.activities.filter(a => a.id !== id);
  if (!window.jarvisAPI) {
    localStorage.setItem('jarvis-timer', JSON.stringify(timerData));
  }
  renderActivities();
  updateTimerSummary();
  showToast('Activity deleted', 'info');
}

function updateTimerSummary(): void {
  const today = getDateString(new Date());
  const todayActivities = timerData.activities.filter(a => 
    a.startTime.startsWith(today)
  );
  
  const totalSeconds = todayActivities.reduce((sum, a) => sum + a.duration, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (totalTimeToday) totalTimeToday.textContent = `${hours}h ${minutes}m`;
  if (activitiesCountToday) activitiesCountToday.textContent = todayActivities.length.toString();
  
  // Find top category
  const categoryCounts: Record<string, number> = {};
  todayActivities.forEach(a => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + a.duration;
  });
  
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  if (topCategoryToday) topCategoryToday.textContent = topCategory ? topCategory[0] : '--';
}

function showTimerForm(): void {
  if (timerFormCard) timerFormCard.style.display = 'block';
  if (timerNameInput) timerNameInput.focus();
}

function hideTimerForm(): void {
  if (timerFormCard) timerFormCard.style.display = 'none';
  if (timerForm) timerForm.reset();
}

async function handleTimerFormSubmit(e: Event): Promise<void> {
  e.preventDefault();
  
  const name = timerNameInput.value.trim();
  const category = timerCategoryInput.value;
  const tags = timerTagsInput.value.split(',').map(t => t.trim()).filter(t => t);
  
  if (window.jarvisAPI) {
    timerData.activeTimer = await window.jarvisAPI.startTimer(name, category, tags);
  } else {
    timerData.activeTimer = {
      id: crypto.randomUUID(),
      name,
      category,
      startTime: new Date().toISOString(),
      tags,
    };
    localStorage.setItem('jarvis-timer', JSON.stringify(timerData));
  }
  
  hideTimerForm();
  renderActiveTimer();
  showToast('Timer started', 'success');
}

async function handleStopTimer(): Promise<void> {
  if (!timerData.activeTimer) return;
  
  if (window.jarvisAPI) {
    const activity = await window.jarvisAPI.stopTimer('');
    if (activity) {
      timerData.activities.push(activity);
      timerData.activeTimer = null;
    }
  } else {
    const now = new Date();
    const startTime = new Date(timerData.activeTimer.startTime);
    const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    
    const activity: ActivityTimer = {
      id: timerData.activeTimer.id,
      name: timerData.activeTimer.name,
      category: timerData.activeTimer.category,
      startTime: timerData.activeTimer.startTime,
      endTime: now.toISOString(),
      duration,
      tags: timerData.activeTimer.tags,
      notes: '',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
    
    timerData.activities.push(activity);
    timerData.activeTimer = null;
    localStorage.setItem('jarvis-timer', JSON.stringify(timerData));
  }
  
  renderActiveTimer();
  renderActivities();
  updateTimerSummary();
  showToast('Timer stopped and activity saved', 'success');
}

// ========================================
// News Module Functions
// ========================================

async function loadNewsData(): Promise<void> {
  if (window.jarvisAPI) {
    newsData = await window.jarvisAPI.getNewsData();
  } else {
    const saved = localStorage.getItem('jarvis-news');
    if (saved) newsData = JSON.parse(saved);
  }
  renderNews();
}

function renderNews(): void {
  if (newsLastUpdated && newsData.lastUpdated) {
    const date = new Date(newsData.lastUpdated);
    newsLastUpdated.textContent = `Last updated: ${date.toLocaleTimeString()}`;
  }
  
  renderNewsArticles();
  renderSportsScores();
}

function renderNewsArticles(): void {
  if (!newsArticlesList) return;
  
  if (newsData.articles.length === 0) {
    newsArticlesList.innerHTML = `
      <div class="empty-state">
        <p>No news articles yet</p>
        <span>Click "Refresh News" to load latest headlines</span>
      </div>
    `;
    
    // Clear other sections
    const featuredCard = document.getElementById('featuredNewsCard');
    const topStories = document.getElementById('topStoriesList');
    if (featuredCard) {
      featuredCard.innerHTML = `
        <div class="featured-news-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2z"/>
            <line x1="10" y1="6" x2="18" y2="6"/>
            <line x1="10" y1="10" x2="18" y2="10"/>
          </svg>
          <p>Refresh to load featured news</p>
        </div>
      `;
    }
    if (topStories) {
      topStories.innerHTML = '<div class="empty-state-small"><p>No stories yet</p></div>';
    }
    return;
  }
  
  // Render featured article (first article)
  const featuredCard = document.getElementById('featuredNewsCard');
  if (featuredCard && newsData.articles.length > 0) {
    const featured = newsData.articles[0];
    featuredCard.innerHTML = `
      <div class="featured-news-content" data-url="${escapeHtml(featured.url || '')}">
        ${featured.imageUrl ? `<img src="${escapeHtml(featured.imageUrl)}" alt="" class="featured-news-image">` : ''}
        <span class="featured-news-source">${escapeHtml(featured.source || 'News')}</span>
        <div class="featured-news-title">${escapeHtml(featured.title)}</div>
        <div class="featured-news-description">${escapeHtml(featured.description || '')}</div>
        <span class="featured-news-time">${featured.publishedAt ? formatRelativeTime(featured.publishedAt) : ''}</span>
      </div>
    `;
    featuredCard.querySelector('.featured-news-content')?.addEventListener('click', () => {
      if (featured.url) window.open(featured.url, '_blank');
    });
  }
  
  // Render top stories (articles 1-5)
  const topStories = document.getElementById('topStoriesList');
  if (topStories) {
    const top = newsData.articles.slice(1, 6);
    if (top.length === 0) {
      topStories.innerHTML = '<div class="empty-state-small"><p>No stories yet</p></div>';
    } else {
      topStories.innerHTML = top.map(article => `
        <div class="top-story-item" data-url="${escapeHtml(article.url || '')}">
          <div class="top-story-title">${escapeHtml(article.title)}</div>
          <div class="top-story-meta">
            <span>${escapeHtml(article.source || 'News')}</span>
            <span>${article.publishedAt ? formatRelativeTime(article.publishedAt) : ''}</span>
          </div>
        </div>
      `).join('');
      topStories.querySelectorAll('.top-story-item').forEach(item => {
        item.addEventListener('click', () => {
          const url = (item as HTMLElement).dataset.url;
          if (url) window.open(url, '_blank');
        });
      });
    }
  }
  
  // Render category articles (world, tech, entertainment)
  const categories = [
    { id: 'worldNewsList', category: 'general' },
    { id: 'techNewsList', category: 'technology' },
    { id: 'entertainmentNewsList', category: 'entertainment' },
  ];
  
  categories.forEach(({ id, category }) => {
    const container = document.getElementById(id);
    if (!container) return;
    
    const categoryArticles = newsData.articles.filter(a => 
      a.category?.toLowerCase() === category || 
      (category === 'general' && !a.category)
    ).slice(0, 4);
    
    if (categoryArticles.length === 0) {
      // Show some articles anyway if category is empty
      const fallbackArticles = newsData.articles.slice(0, 4);
      container.innerHTML = fallbackArticles.map(article => `
        <div class="category-article-item" data-url="${escapeHtml(article.url || '')}">
          <div class="category-article-title">${escapeHtml(article.title)}</div>
          <div class="category-article-source">${escapeHtml(article.source || 'News')}</div>
        </div>
      `).join('');
    } else {
      container.innerHTML = categoryArticles.map(article => `
        <div class="category-article-item" data-url="${escapeHtml(article.url || '')}">
          <div class="category-article-title">${escapeHtml(article.title)}</div>
          <div class="category-article-source">${escapeHtml(article.source || 'News')}</div>
        </div>
      `).join('');
    }
    
    container.querySelectorAll('.category-article-item').forEach(item => {
      item.addEventListener('click', () => {
        const url = (item as HTMLElement).dataset.url;
        if (url) window.open(url, '_blank');
      });
    });
  });
  
  // Render all headlines
  newsArticlesList.innerHTML = newsData.articles.map(article => `
    <div class="news-article-card" data-url="${escapeHtml(article.url || '')}">
      <div class="news-article-title">${escapeHtml(article.title)}</div>
      <div class="news-article-description">${escapeHtml(article.description || '')}</div>
      <div class="news-article-meta">
        <span>${escapeHtml(article.source || 'News')}</span>
        <span>${article.publishedAt ? formatRelativeTime(article.publishedAt) : ''}</span>
      </div>
    </div>
  `).join('');
  
  newsArticlesList.querySelectorAll('.news-article-card').forEach(article => {
    article.addEventListener('click', () => {
      const url = (article as HTMLElement).dataset.url;
      if (url) window.open(url, '_blank');
    });
  });
}

function renderSportsScores(): void {
  if (!sportsScoresList) return;
  
  if (newsData.sports.length === 0) {
    sportsScoresList.innerHTML = `
      <div class="empty-state-small">
        <p>No sports updates</p>
      </div>
    `;
    return;
  }
  
  sportsScoresList.innerHTML = newsData.sports.map(item => `
    <div class="category-article-item">
      <div class="category-article-title">${escapeHtml(item.homeTeam)} vs ${escapeHtml(item.awayTeam)}</div>
      <div class="category-article-source">${escapeHtml(item.competition)} • ${item.status === 'finished' ? `${item.homeScore}-${item.awayScore}` : item.status}</div>
    </div>
  `).join('');
}

async function handleRefreshNews(): Promise<void> {
  if (refreshNewsBtn) {
    refreshNewsBtn.disabled = true;
    refreshNewsBtn.textContent = 'Loading...';
  }
  
  try {
    if (window.jarvisAPI) {
      newsData.articles = await window.jarvisAPI.fetchNews();
      newsData.sports = await window.jarvisAPI.fetchSportsScores();
      newsData.lastUpdated = new Date().toISOString();
    } else {
      // Mock data for browser testing
      newsData.articles = [
        { id: '1', title: 'Sample News Article', description: 'This is a sample article.', source: 'Demo', url: '#', imageUrl: null, publishedAt: new Date().toISOString(), category: 'general' },
      ];
      newsData.sports = [
        { id: '1', homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 2, awayScore: 1, status: 'finished', competition: 'Demo League', startTime: new Date().toISOString() },
      ];
      newsData.lastUpdated = new Date().toISOString();
      localStorage.setItem('jarvis-news', JSON.stringify(newsData));
    }
    
    renderNews();
    showToast('News updated successfully', 'success');
  } catch (error) {
    console.error('Failed to fetch news:', error);
    showToast('Failed to fetch news', 'error');
  } finally {
    if (refreshNewsBtn) {
      refreshNewsBtn.disabled = false;
      refreshNewsBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="1 4 1 10 7 10"/>
          <polyline points="23 20 23 14 17 14"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
        Refresh News
      `;
    }
  }
}

// ========================================
// Recommender Module Functions
// ========================================

function initRecommender(): void {
  currentQuestionIndex = 0;
  recommendationAnswers = [];
  renderQuestion();
}

function renderQuestion(): void {
  if (currentQuestionIndex >= recommendationQuestions.length) {
    getRecommendations();
    return;
  }
  
  const question = recommendationQuestions[currentQuestionIndex];
  
  if (currentQuestion) currentQuestion.textContent = question.question;
  if (progressText) progressText.textContent = `Question ${currentQuestionIndex + 1} of ${recommendationQuestions.length}`;
  if (questionProgressFill) questionProgressFill.style.width = `${((currentQuestionIndex + 1) / recommendationQuestions.length) * 100}%`;
  
  if (optionsGrid) {
    optionsGrid.innerHTML = question.options.map(option => 
      `<button class="option-btn" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`
    ).join('');
    
    optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => handleOptionSelect((btn as HTMLElement).dataset.value!));
    });
  }
  
  if (restartQuestionnaireBtn) {
    restartQuestionnaireBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
  }
}

function handleOptionSelect(value: string): void {
  const question = recommendationQuestions[currentQuestionIndex];
  recommendationAnswers.push({ questionId: question.id, answer: value });
  currentQuestionIndex++;
  renderQuestion();
}

async function getRecommendations(): Promise<void> {
  if (questionnaireCard) questionnaireCard.style.display = 'none';
  if (recommendationsCard) recommendationsCard.style.display = 'block';
  
  if (recommendationsGrid) {
    recommendationsGrid.innerHTML = '<div class="empty-state"><p>Loading recommendations...</p></div>';
  }
  
  try {
    let recommendations: MovieTVRecommendation[] = [];
    
    if (window.jarvisAPI) {
      recommendations = await window.jarvisAPI.getRecommendations(recommendationAnswers);
    } else {
      // Mock recommendations for browser testing
      recommendations = [
        { id: '1', title: 'The Dark Knight', type: 'movie', year: 2008, rating: 9.0, genre: ['Action', 'Drama'], description: 'When the menace known as the Joker emerges...', posterUrl: null, backdropUrl: null },
        { id: '2', title: 'Breaking Bad', type: 'tv', year: 2008, rating: 9.5, genre: ['Crime', 'Drama'], description: 'A high school chemistry teacher turned drug maker.', posterUrl: null, backdropUrl: null },
      ];
    }
    
    renderRecommendations(recommendations);
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    showToast('Failed to get recommendations', 'error');
  }
}

function renderRecommendations(recommendations: MovieTVRecommendation[]): void {
  if (!recommendationsGrid) return;
  
  if (recommendations.length === 0) {
    recommendationsGrid.innerHTML = '<div class="empty-state"><p>No recommendations found. Try different preferences!</p></div>';
    return;
  }
  
  recommendationsGrid.innerHTML = recommendations.map(rec => `
    <div class="recommendation-card">
      ${rec.posterUrl 
        ? `<img src="${escapeHtml(rec.posterUrl)}" alt="${escapeHtml(rec.title)}" class="recommendation-poster">`
        : `<div class="recommendation-poster-placeholder">${rec.type === 'movie' ? '🎬' : '📺'}</div>`
      }
      <div class="recommendation-info">
        <span class="recommendation-type">${rec.type}</span>
        <div class="recommendation-title">${escapeHtml(rec.title)}</div>
        <div class="recommendation-meta">
          <span>${rec.year}</span>
          <span class="recommendation-rating">⭐ ${rec.rating.toFixed(1)}</span>
        </div>
        <div class="recommendation-description">${escapeHtml(rec.description)}</div>
      </div>
    </div>
  `).join('');
}

function handleRestartQuestionnaire(): void {
  currentQuestionIndex = 0;
  recommendationAnswers = [];
  if (questionnaireCard) questionnaireCard.style.display = 'block';
  if (recommendationsCard) recommendationsCard.style.display = 'none';
  renderQuestion();
}

// ========================================
// API Integrations Module Functions
// ========================================

async function loadIntegrationsData(): Promise<void> {
  await updateIntegrationStatuses();
}

async function updateIntegrationStatuses(): Promise<void> {
  // Update status displays based on settings
  if (!settings?.modules?.apiIntegrations) return;
  
  const lastfmStatus = document.getElementById('lastfmStatus');
  const sonarrStatus = document.getElementById('sonarrStatus');
  const radarrStatus = document.getElementById('radarrStatus');
  
  if (lastfmStatus) {
    const config = settings.modules.apiIntegrations.lastfm;
    lastfmStatus.textContent = config.apiKey ? (config.status === 'connected' ? 'Connected' : 'Configured') : 'Not configured';
    lastfmStatus.className = `integration-status ${config.status === 'connected' ? 'connected' : ''}`;
  }
  
  if (sonarrStatus) {
    const config = settings.modules.apiIntegrations.sonarr;
    sonarrStatus.textContent = config.apiKey ? (config.status === 'connected' ? 'Connected' : 'Configured') : 'Not configured';
    sonarrStatus.className = `integration-status ${config.status === 'connected' ? 'connected' : ''}`;
  }
  
  if (radarrStatus) {
    const config = settings.modules.apiIntegrations.radarr;
    radarrStatus.textContent = config.apiKey ? (config.status === 'connected' ? 'Connected' : 'Configured') : 'Not configured';
    radarrStatus.className = `integration-status ${config.status === 'connected' ? 'connected' : ''}`;
  }
}

async function handleTestConnection(service: ApiServiceName): Promise<void> {
  const btn = document.querySelector(`.test-connection-btn[data-service="${service}"]`) as HTMLButtonElement;
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Testing...';
  }
  
  try {
    if (window.jarvisAPI) {
      const result = await window.jarvisAPI.testApiConnection(service);
      
      if (result.success) {
        showToast(`${service} connection successful!`, 'success');
        
        // Load additional data for connected services
        if (service === 'lastfm') {
          await loadLastFMData();
        } else if (service === 'sonarr') {
          await loadSonarrData();
        } else if (service === 'radarr') {
          await loadRadarrData();
        }
      } else {
        showToast(`${service} connection failed: ${result.error}`, 'error');
      }
    } else {
      showToast('API testing requires Electron integration', 'info');
    }
  } catch (error) {
    console.error(`Failed to test ${service} connection:`, error);
    showToast(`Failed to test ${service} connection`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Test Connection';
    }
  }
}

async function loadLastFMData(): Promise<void> {
  if (!window.jarvisAPI) return;
  
  const userInfo = await window.jarvisAPI.getLastFMUserInfo();
  const lastfmUser = document.getElementById('lastfmUser');
  const lastfmUserImage = document.getElementById('lastfmUserImage') as HTMLImageElement;
  const lastfmUsername = document.getElementById('lastfmUsername');
  const lastfmPlayCount = document.getElementById('lastfmPlayCount');
  
  if (userInfo && lastfmUser) {
    lastfmUser.style.display = 'flex';
    if (lastfmUserImage && userInfo.imageUrl) lastfmUserImage.src = userInfo.imageUrl;
    if (lastfmUsername) lastfmUsername.textContent = userInfo.realName || userInfo.username;
    if (lastfmPlayCount) lastfmPlayCount.textContent = `${userInfo.playCount.toLocaleString()} scrobbles`;
    
    // Load recent tracks
    const tracks = await window.jarvisAPI.getLastFMRecentTracks();
    const lastfmRecentTracks = document.getElementById('lastfmRecentTracks');
    const lastfmTracksList = document.getElementById('lastfmTracksList');
    
    if (tracks.length > 0 && lastfmRecentTracks && lastfmTracksList) {
      lastfmRecentTracks.style.display = 'block';
      lastfmTracksList.innerHTML = tracks.slice(0, 5).map(track => `
        <div class="track-item">
          ${track.imageUrl ? `<img src="${escapeHtml(track.imageUrl)}" alt="" class="track-image">` : ''}
          <div class="track-info">
            <span class="track-name">${escapeHtml(track.name)}</span>
            <span class="track-artist">${escapeHtml(track.artist)}</span>
          </div>
          ${track.nowPlaying ? '<span class="now-playing-badge">▶ Now Playing</span>' : ''}
        </div>
      `).join('');
    }
  }
}

async function loadSonarrData(): Promise<void> {
  if (!window.jarvisAPI) return;
  
  const status = await window.jarvisAPI.getSonarrStatus();
  const sonarrStats = document.getElementById('sonarrStats');
  const sonarrSeriesCount = document.getElementById('sonarrSeriesCount');
  const sonarrEpisodeCount = document.getElementById('sonarrEpisodeCount');
  const sonarrQueueCount = document.getElementById('sonarrQueueCount');
  
  if (status && sonarrStats) {
    sonarrStats.style.display = 'grid';
    if (sonarrSeriesCount) sonarrSeriesCount.textContent = status.seriesCount.toString();
    if (sonarrEpisodeCount) sonarrEpisodeCount.textContent = status.episodeCount.toString();
    if (sonarrQueueCount) sonarrQueueCount.textContent = status.queueCount.toString();
  }
}

async function loadRadarrData(): Promise<void> {
  if (!window.jarvisAPI) return;
  
  const status = await window.jarvisAPI.getRadarrStatus();
  const radarrStats = document.getElementById('radarrStats');
  const radarrMovieCount = document.getElementById('radarrMovieCount');
  const radarrQueueCount = document.getElementById('radarrQueueCount');
  
  if (status && radarrStats) {
    radarrStats.style.display = 'grid';
    if (radarrMovieCount) radarrMovieCount.textContent = status.movieCount.toString();
    if (radarrQueueCount) radarrQueueCount.textContent = status.queueCount.toString();
  }
}

// ========================================
// Easter Egg Functions
// ========================================

function handleKonamiCode(e: KeyboardEvent): void {
  konamiSequence.push(e.key);
  
  // Keep sequence at max length of longest code
  if (konamiSequence.length > 10) {
    konamiSequence.shift();
  }
  
  // Check for Konami Code
  if (konamiSequence.slice(-KONAMI_CODE.length).join(',') === KONAMI_CODE.join(',')) {
    activateKonamiEasterEgg();
    konamiSequence = [];
    return;
  }
  
  // Check for GTA Code (Party Mode)
  if (konamiSequence.slice(-GTA_CODE.length).join(',') === GTA_CODE.join(',')) {
    activatePartyMode();
    konamiSequence = [];
    return;
  }
  
  // Check for Retro Code
  if (konamiSequence.slice(-RETRO_CODE.length).join(',') === RETRO_CODE.join(',')) {
    activateRetroMode();
    konamiSequence = [];
    return;
  }
}

function activateKonamiEasterEgg(): void {
  document.body.classList.add('konami-activated');
  showToast('🎮 Konami Code Activated! You found a secret!', 'success');
  spawnConfetti();
  
  setTimeout(() => {
    document.body.classList.remove('konami-activated');
  }, 5000);
}

function activatePartyMode(): void {
  document.body.classList.add('party-mode');
  showToast('🎉 Party Mode Activated! Let\'s dance!', 'success');
  
  setTimeout(() => {
    document.body.classList.remove('party-mode');
  }, 5000);
}

function activateRetroMode(): void {
  document.body.classList.add('retro-mode');
  showToast('📺 Retro Mode Activated! Welcome to the past!', 'success');
  
  setTimeout(() => {
    document.body.classList.remove('retro-mode');
  }, 5000);
}

function spawnConfetti(): void {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'];
  const particleCount = 25; // Reduced from 50 for better performance
  
  // Use document fragment for batch DOM updates
  const fragment = document.createDocumentFragment();
  const particles: HTMLDivElement[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 1.5}s`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    fragment.appendChild(confetti);
    particles.push(confetti);
  }
  
  document.body.appendChild(fragment);
  
  // Batch remove all particles after animation
  setTimeout(() => {
    particles.forEach(p => p.remove());
  }, 3500);
}

// ========================================
// Playground Module Functions
// ========================================

async function loadPlaygroundData(): Promise<void> {
  // Load initial data for playground
  await handleRefreshFunFact();
  await handleRefreshOnThisDay();
}

async function handleRefreshFunFact(): Promise<void> {
  const funFactContent = document.getElementById('funFactContent');
  const refreshBtn = document.getElementById('refreshFunFactBtn') as HTMLButtonElement;
  
  if (refreshBtn) {
    refreshBtn.disabled = true;
  }
  
  try {
    if (window.jarvisAPI) {
      currentFunFact = await window.jarvisAPI.fetchFunFact();
    } else {
      // Mock data for browser testing
      currentFunFact = {
        id: `fact-${Date.now()}`,
        fact: 'A group of flamingos is called a "flamboyance".',
        category: 'random',
        source: 'Nature Facts',
      };
    }
    
    if (funFactContent && currentFunFact) {
      funFactContent.innerHTML = `
        <p class="fun-fact-text">${escapeHtml(currentFunFact.fact)}</p>
        ${currentFunFact.source ? `<span class="fun-fact-source">Source: ${escapeHtml(currentFunFact.source)}</span>` : ''}
      `;
    }
  } catch (error) {
    console.error('Failed to fetch fun fact:', error);
    if (funFactContent) {
      funFactContent.innerHTML = '<p class="fun-fact-text">Failed to load fun fact. Try again!</p>';
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
    }
  }
}

async function handleRefreshOnThisDay(): Promise<void> {
  const onThisDayContent = document.getElementById('onThisDayContent');
  const refreshBtn = document.getElementById('refreshOnThisDayBtn') as HTMLButtonElement;
  
  if (refreshBtn) {
    refreshBtn.disabled = true;
  }
  
  try {
    if (window.jarvisAPI) {
      currentOnThisDay = await window.jarvisAPI.fetchOnThisDay();
    } else {
      // Mock data for browser testing
      currentOnThisDay = [
        { id: '1', year: 1969, event: 'Apollo 11 landed on the Moon', category: 'historical' },
        { id: '2', year: 1776, event: 'Declaration of Independence signed', category: 'historical' },
        { id: '3', year: 1946, event: 'Famous person was born', category: 'birth' },
      ];
    }
    
    renderOnThisDay();
  } catch (error) {
    console.error('Failed to fetch On This Day:', error);
    if (onThisDayContent) {
      onThisDayContent.innerHTML = '<div class="empty-state"><p>Failed to load events. Try again!</p></div>';
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
    }
  }
}

function renderOnThisDay(): void {
  const onThisDayContent = document.getElementById('onThisDayContent');
  if (!onThisDayContent) return;
  
  if (currentOnThisDay.length === 0) {
    onThisDayContent.innerHTML = '<div class="empty-state"><p>No events found for today.</p></div>';
    return;
  }
  
  onThisDayContent.innerHTML = currentOnThisDay.map(event => `
    <div class="on-this-day-item">
      <span class="on-this-day-year">${event.year}</span>
      <div class="on-this-day-event">
        ${escapeHtml(event.event)}
        <span class="on-this-day-category ${event.category}">${event.category}</span>
      </div>
    </div>
  `).join('');
}

// ========================================
// MP3 Module Functions
// ========================================

async function loadMP3Data(): Promise<void> {
  if (window.jarvisAPI) {
    mp3Data = await window.jarvisAPI.getMP3Data();
  } else {
    const saved = localStorage.getItem('jarvis-mp3');
    if (saved) mp3Data = JSON.parse(saved);
  }
  renderMP3Library();
  renderMP3History();
}

function renderMP3Library(): void {
  const trackList = document.getElementById('mp3TrackList');
  if (!trackList) return;
  
  if (mp3Data.tracks.length === 0) {
    trackList.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <p>No music yet</p>
        <span>Click "Add Folder" to import your music collection</span>
      </div>
    `;
    return;
  }
  
  trackList.innerHTML = mp3Data.tracks.map(track => `
    <div class="mp3-track-item${mp3Data.playbackState.currentTrackId === track.id ? ' playing' : ''}" data-id="${track.id}">
      <div class="mp3-track-item-cover">
        ${track.coverArt 
          ? `<img src="${track.coverArt}" alt="${escapeHtml(track.album || 'Album')}">`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>`
        }
      </div>
      <div class="mp3-track-item-info">
        <div class="mp3-track-item-title">${escapeHtml(track.title)}</div>
        <div class="mp3-track-item-artist">${escapeHtml(track.artist)}</div>
      </div>
      <span class="mp3-track-item-duration">${formatMP3Duration(track.duration)}</span>
    </div>
  `).join('');
  
  // Add click handlers
  trackList.querySelectorAll('.mp3-track-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = (item as HTMLElement).dataset.id;
      if (id) playMP3Track(id);
    });
  });
}

function formatMP3Duration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function playMP3Track(trackId: string): void {
  const track = mp3Data.tracks.find(t => t.id === trackId);
  if (!track) return;
  
  mp3Data.playbackState.currentTrackId = trackId;
  mp3Data.playbackState.isPlaying = true;
  
  updateMP3PlayerDisplay(track);
  renderMP3Library();
  showToast(`Now playing: ${track.title}`, 'info');
}

function updateMP3PlayerDisplay(track: MP3Track | null): void {
  const titleEl = document.getElementById('mp3TrackTitle');
  const artistEl = document.getElementById('mp3TrackArtist');
  const albumEl = document.getElementById('mp3TrackAlbum');
  const albumArt = document.getElementById('mp3AlbumArt');
  const totalTime = document.getElementById('mp3TimeTotal');
  
  if (!track) {
    if (titleEl) titleEl.textContent = 'No track playing';
    if (artistEl) artistEl.textContent = '--';
    if (albumEl) albumEl.textContent = '--';
    if (totalTime) totalTime.textContent = '0:00';
    return;
  }
  
  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
  if (albumEl) albumEl.textContent = track.album || '--';
  if (totalTime) totalTime.textContent = formatMP3Duration(track.duration);
  
  if (albumArt && track.coverArt) {
    albumArt.innerHTML = `<img src="${track.coverArt}" alt="${escapeHtml(track.album || 'Album')}">`;
  }
}

function renderMP3History(): void {
  const historyList = document.getElementById('mp3HistoryList');
  if (!historyList) return;
  
  if (mp3Data.playHistory.length === 0) {
    historyList.innerHTML = '<div class="empty-state"><p>No listening history yet</p></div>';
    return;
  }
  
  const recentHistory = mp3Data.playHistory.slice(-10).reverse();
  
  historyList.innerHTML = recentHistory.map(entry => {
    const track = mp3Data.tracks.find(t => t.id === entry.trackId);
    if (!track) return '';
    
    return `
      <div class="mp3-track-item" data-id="${track.id}">
        <div class="mp3-track-item-cover">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="mp3-track-item-info">
          <div class="mp3-track-item-title">${escapeHtml(track.title)}</div>
          <div class="mp3-track-item-artist">${escapeHtml(track.artist)}</div>
        </div>
      </div>
    `;
  }).join('');
}

async function handleAddMP3Folder(): Promise<void> {
  showToast('Folder import requires full Electron integration', 'info');
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
  await loadTimerData();
  await loadNewsData();
  await loadIntegrationsData();
  await loadPlaygroundData();
  await loadMP3Data();
  await loadVPNData();
  setupEventListeners();
  setupNewModuleEventListeners();
  renderCalendar();
  initRecommender();
  
  // Update app version display
  if (appVersion && window.jarvisAPI) {
    const version = await window.jarvisAPI.getAppVersion();
    if (version) appVersion.textContent = `Version ${version}`;
  }
}

function setupNewModuleEventListeners(): void {
  // Timer Module
  if (startTimerBtn) startTimerBtn.addEventListener('click', showTimerForm);
  if (stopTimerBtn) stopTimerBtn.addEventListener('click', handleStopTimer);
  if (cancelTimerBtn) cancelTimerBtn.addEventListener('click', hideTimerForm);
  if (timerForm) timerForm.addEventListener('submit', handleTimerFormSubmit);
  if (activityCategoryFilter) activityCategoryFilter.addEventListener('change', renderActivities);
  
  // News Module
  if (refreshNewsBtn) refreshNewsBtn.addEventListener('click', handleRefreshNews);
  
  // Recommender Module
  if (restartQuestionnaireBtn) restartQuestionnaireBtn.addEventListener('click', handleRestartQuestionnaire);
  if (newRecommendationsBtn) newRecommendationsBtn.addEventListener('click', handleRestartQuestionnaire);
  
  // Playground Module
  const refreshFunFactBtn = document.getElementById('refreshFunFactBtn');
  const refreshOnThisDayBtn = document.getElementById('refreshOnThisDayBtn');
  if (refreshFunFactBtn) refreshFunFactBtn.addEventListener('click', handleRefreshFunFact);
  if (refreshOnThisDayBtn) refreshOnThisDayBtn.addEventListener('click', handleRefreshOnThisDay);
  
  // MP3 Module
  const mp3AddFolderBtn = document.getElementById('mp3AddFolderBtn');
  if (mp3AddFolderBtn) mp3AddFolderBtn.addEventListener('click', handleAddMP3Folder);
  
  // Bookmarks quick access
  document.querySelectorAll('.quick-access-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = (btn as HTMLElement).dataset.url;
      if (url) window.open(url, '_blank');
    });
  });
  
  // Bookmark search
  const bookmarkSearchInput = document.getElementById('bookmarkSearchInput') as HTMLInputElement;
  if (bookmarkSearchInput) {
    bookmarkSearchInput.addEventListener('input', () => {
      renderBookmarks();
    });
  }
  
  // API Integrations
  document.querySelectorAll('.test-connection-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = (btn as HTMLElement).dataset.service as ApiServiceName;
      handleTestConnection(service);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
