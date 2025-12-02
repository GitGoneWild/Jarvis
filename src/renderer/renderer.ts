// Type declarations for Jarvis API exposed via preload
// Note: In browser context, jarvisAPI may not be available (only in Electron)

// DOM Elements
const sidebar = document.getElementById('sidebar') as HTMLElement;
const sidebarToggle = document.getElementById('sidebarToggle') as HTMLButtonElement;
const navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
const contentSections = document.querySelectorAll('.content-section') as NodeListOf<HTMLElement>;
const chatForm = document.getElementById('chatForm') as HTMLFormElement;
const chatInput = document.getElementById('chatInput') as HTMLInputElement;
const chatMessages = document.getElementById('chatMessages') as HTMLElement;
const typingIndicator = document.getElementById('typingIndicator') as HTMLElement;
const themeToggle = document.getElementById('themeToggle') as HTMLInputElement;

// State
let currentTheme: 'dark' | 'light' = 'dark';

// Initialize
function init(): void {
  loadTheme();
  setupEventListeners();
}

// Load saved theme
function loadTheme(): void {
  const savedTheme = localStorage.getItem('jarvis-theme') as 'dark' | 'light' | null;
  if (savedTheme) {
    currentTheme = savedTheme;
    applyTheme(currentTheme);
    themeToggle.checked = currentTheme === 'light';
  }
}

// Apply theme to body
function applyTheme(theme: 'dark' | 'light'): void {
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${theme}-theme`);
  localStorage.setItem('jarvis-theme', theme);
}

// Setup event listeners
function setupEventListeners(): void {
  // Sidebar toggle
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Navigation
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      if (section) {
        navigateToSection(section);
      }
    });
  });

  // Chat form submission
  chatForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    await handleChatSubmit();
  });

  // Theme toggle
  themeToggle.addEventListener('change', () => {
    currentTheme = themeToggle.checked ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
}

// Navigate to section
function navigateToSection(sectionId: string): void {
  // Update nav items
  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === sectionId) {
      item.classList.add('active');
    }
  });

  // Update content sections
  contentSections.forEach((section) => {
    section.classList.remove('active');
    if (section.id === `${sectionId}-section`) {
      section.classList.add('active');
    }
  });
}

// Handle chat submission
async function handleChatSubmit(): Promise<void> {
  const message = chatInput.value.trim();
  if (!message) return;

  // Clear input
  chatInput.value = '';

  // Add user message
  addMessage(message, 'user');

  // Show typing indicator
  typingIndicator.classList.add('active');

  try {
    let response: string;
    
    // Check if running in Electron with jarvisAPI available
    if (window.jarvisAPI && typeof window.jarvisAPI.sendQuery === 'function') {
      response = await window.jarvisAPI.sendQuery(message);
    } else {
      // Fallback stub for browser testing
      response = getStubResponse(message);
    }

    // Simulate typing delay for more natural feel
    await delay(500 + Math.random() * 500);

    // Hide typing indicator
    typingIndicator.classList.remove('active');

    // Add Jarvis response
    addMessage(response, 'jarvis');
  } catch (error) {
    console.error('Error sending message:', error);
    typingIndicator.classList.remove('active');
    addMessage('Sorry, I encountered an error. Please try again.', 'jarvis');
  }
}

// Stub response for browser testing (when not in Electron)
function getStubResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  const responses: Record<string, string> = {
    hello: "Hello! I'm Jarvis, your personal assistant. How can I help you today?",
    help: 'I can help you with various tasks. Try asking me about the weather, your tasks, or just have a chat!',
    time: `The current time is ${new Date().toLocaleTimeString()}.`,
    date: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
  };

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return `I received your message: "${message}". I'm still learning, but I'm here to assist you!`;
}

// Add message to chat
function addMessage(content: string, sender: 'user' | 'jarvis'): void {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;

  const avatarSvg =
    sender === 'jarvis'
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

  messageDiv.innerHTML = `
    <div class="message-avatar">
      ${avatarSvg}
    </div>
    <div class="message-content">
      <span class="message-sender">${sender === 'jarvis' ? 'Jarvis' : 'You'}</span>
      <p>${escapeHtml(content)}</p>
    </div>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Utility: Delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Utility: Escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
