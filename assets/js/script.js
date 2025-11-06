'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalText = document.querySelector("[data-modal-text]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // =================================================================
    // FINAL FIX: This logic correctly deactivates all other links/pages
    // before activating the new one.
    // =================================================================

    const targetPage = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      // Remove 'active' from all pages and all navigation links
      pages[j].classList.remove("active");
      navigationLinks[j].classList.remove("active");
    }

    // Add 'active' to the clicked link
    this.classList.add("active");

    // Add 'active' to the corresponding page
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === targetPage) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
        break; // Stop looping once we find the matching page
      }
    }

  });
}



// AI Chat Widget Functionality
const aiChatWidget = {
  // Configuration
  // =================================================================
  // BUG: This URL is an expired test link.
  // FIX: You must replace this with your own live server URL.
  // =================================================================
  webhookUrl: 'https://detractive-nonsectionally-salma.ngrok-free.dev/webhook/portfolio-to-response',

  // DOM Elements
  elements: {
    toggle: document.getElementById('ai-chat-toggle'),
    modal: document.getElementById('ai-chat-modal'),
    close: document.getElementById('ai-chat-close'),
    messages: document.getElementById('ai-chat-messages'),
    input: document.getElementById('ai-message-input'),
    sendBtn: document.getElementById('ai-send-btn'),
    typing: document.getElementById('ai-typing')
  },

  // State
  isOpen: false,
  isTyping: false,

  // Initialize the chat widget
  init() {
    this.bindEvents();
    console.log('AI Chat Widget initialized');
  },

  // Bind event listeners
  bindEvents() {
    // Toggle modal
    this.elements.toggle.addEventListener('click', () => {
      this.toggleModal();
    });

    // Close modal
    this.elements.close.addEventListener('click', () => {
      this.closeModal();
    });

    // Send message
    this.elements.sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send message on Enter key (but allow Shift+Enter for new lines)
    this.elements.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    this.elements.input.addEventListener('input', () => {
      this.autoResizeTextarea();
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.elements.modal.contains(e.target) && !this.elements.toggle.contains(e.target)) {
        this.closeModal();
      }
    });
  },

  // Toggle modal visibility
  toggleModal() {
    if (this.isOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  },

  // Open modal
  openModal() {
    this.elements.modal.classList.add('active');
    this.isOpen = true;
    this.elements.input.focus();
  },

  // Close modal
  closeModal() {
    this.elements.modal.classList.remove('active');
    this.isOpen = false;
    this.elements.input.blur();
  },

  // Auto-resize textarea based on content
  autoResizeTextarea() {
    const textarea = this.elements.input;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  },

  // Send message to AI
  async sendMessage() {
    const message = this.elements.input.value.trim();

    if (!message || this.isTyping) {
      return;
    }

    // Add user message to chat
    this.addMessage(message, 'user');

    // Clear input and reset textarea height
    this.elements.input.value = '';
    this.elements.input.style.height = 'auto';

    // Show typing indicator
    this.showTyping();

    // Disable send button
    this.elements.sendBtn.disabled = true;

    try {
      // Make API call to webhook
      const response = await this.callAIAPI(message);

      // Hide typing indicator
      this.hideTyping();

      // Add AI response to chat
      this.addMessage(response, 'ai');

    } catch (error) {
      console.error('AI Chat Error:', error);

      // Hide typing indicator
      this.hideTyping();

      // Add error message with brief diagnostic
      const friendly = error && error.message ? error.message : 'Error: Could not get response';
      this.addMessage(friendly, 'ai');
    } finally {
      // Re-enable send button
      this.elements.sendBtn.disabled = false;
      this.elements.input.focus();
    }
  },

  // Make API call to AI webhook
  async callAIAPI(message) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ message }),
        signal: controller.signal,
        mode: 'cors'
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        let bodySnippet = '';
        try {
          bodySnippet = await response.text();
        } catch (_) { /* ignore */ }
        const snippet = bodySnippet ? ` - ${bodySnippet.substring(0, 200)}` : '';
        throw new Error(`HTTP ${response.status} ${response.statusText}${snippet}`);
      }

      if (contentType.includes('application/json')) {
        const data = await response.json();
        return this.extractAIResponse(data);
      }

      const text = await response.text();
      return this.extractAIResponse(text);
    } catch (err) {
      if (err && err.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      // TypeError is commonly thrown by fetch on network/CORS issues
      if (err instanceof TypeError) {
        throw new Error('Network or CORS error. Ensure the webhook allows browser requests.');
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  // Extract AI response from API response data
  extractAIResponse(data) {
    // Try different possible response formats
    if (data && data.reply) {
      return data.reply;
    } else if (data && data.response) {
      return data.response;
    } else if (data && data.message) {
      return data.message;
    } else if (data && data.text) {
      return data.text;
    } else if (data && data.content) {
      return data.content;
    } else if (data && typeof data === 'object') {
      // Check common nested shapes
      const nested = data.data || data.result || data.output || {};
      if (nested.reply || nested.response || nested.message || nested.text || nested.content) {
        return nested.reply || nested.response || nested.message || nested.text || nested.content;
      }
      // If it's an array, try first element
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        if (typeof first === 'string') return first;
        if (first && (first.reply || first.response || first.message || first.text || first.content)) {
          return first.reply || first.response || first.message || first.text || first.content;
        }
      }
    } else if (typeof data === 'string') {
      return data;
    } else {
      // If we can't find a specific field, try to extract text from the response
      const textContent = JSON.stringify(data);
      return textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;
    }
  },

  // Add message to chat
  addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = sender === 'user' ? 'user-avatar' : 'ai-avatar';
    avatarDiv.textContent = sender === 'user' ? 'You' : 'AI';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${this.escapeHtml(content)}</p>`;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    this.elements.messages.appendChild(messageDiv);
    this.scrollToBottom();
  },

  // Show typing indicator
  showTyping() {
    this.isTyping = true;
    this.elements.typing.style.display = 'flex';
    this.elements.toggle.classList.add('processing');
    this.scrollToBottom();
  },

  // Hide typing indicator
  hideTyping() {
    this.isTyping = false;
    this.elements.typing.style.display = 'none';
    this.elements.toggle.classList.remove('processing');
  },

  // Scroll chat to bottom
  scrollToBottom() {
    setTimeout(() => {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }, 100);
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Show notification badge
  showNotification() {
    this.elements.toggle.classList.add('unread');
  },

  // Hide notification badge
  hideNotification() {
    this.elements.toggle.classList.remove('unread');
  }
};

// Initialize AI Chat Widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for other scripts to load
  setTimeout(() => {
    aiChatWidget.init();
  }, 500);
});

// Sign In Button scroll behavior
const signinBtn = document.getElementById('signin-btn');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 50) {
    signinBtn.classList.add('hidden');
  } else {
    signinBtn.classList.remove('hidden');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);


// =================================================================
// SCRIPT.JS FIX: Added click listener for the Sign In button
// =================================================================
if (signinBtn) {
  signinBtn.addEventListener('click', function () {
    // You can change this action to whatever you want.
    // e.g., window.location.href = '/signin.html';
    alert('Sign In button clicked!');
  });
}