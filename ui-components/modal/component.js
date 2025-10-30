// Modal Component JavaScript

/**
 * Modal component with accessibility and keyboard navigation
 */
class ModalComponent {
  constructor() {
    this.activeModal = null;
    this.focusableElements = [];
    this.previousFocus = null;
    this.initializeModals();
    this.setupEventListeners();
  }

  /**
   * Initialize all modals in the document
   */
  initializeModals() {
    // Find all modal triggers
    const triggers = document.querySelectorAll('[data-modal]');

    triggers.forEach(trigger => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);

      if (modal) {
        // Setup trigger click handler
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.openModal(modalId);
        });

        // Setup close button
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => this.closeModal(modalId));
        }

        // Setup dismiss buttons
        const dismissButtons = modal.querySelectorAll('[data-modal-dismiss]');
        dismissButtons.forEach(button => {
          button.addEventListener('click', () => this.closeModal(modalId));
        });

        // Setup backdrop click
        const backdrop = modal.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.addEventListener('click', () => this.closeModal(modalId));
        }
      }
    });
  }

  /**
   * Open modal by ID
   */
  openModal(modalId, options = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Store previous focus
    this.previousFocus = document.activeElement;

    // Close any active modal
    if (this.activeModal) {
      this.closeModal(this.activeModal.id, { immediate: true });
    }

    // Set active modal
    this.activeModal = modal;

    // Add open class
    modal.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');

    // Lock body scroll
    document.body.classList.add('modal-body-lock');

    // Find focusable elements
    this.updateFocusableElements();

    // Focus first focusable element or modal itself
    setTimeout(() => {
      if (this.focusableElements.length > 0) {
        this.focusableElements[0].focus();
      } else {
        modal.focus();
      }
    }, 100);

    // Dispatch open event
    const event = new CustomEvent('modal:opened', {
      detail: { modalId, modal },
      bubbles: true
    });
    document.dispatchEvent(event);

    // Handle options
    if (options.onOpen) {
      options.onOpen(modal);
    }
  }

  /**
   * Close modal by ID
   */
  closeModal(modalId, options = {}) {
    const modal = modalId ? document.getElementById(modalId) : this.activeModal;
    if (!modal) return;

    // Check if can close (for form validation, etc.)
    if (!options.force && !this.canCloseModal(modal)) {
      return;
    }

    // Remove open class
    modal.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');

    // Clear active modal
    if (this.activeModal === modal) {
      this.activeModal = null;
    }

    // Unlock body scroll if no other modals
    if (!document.querySelector('.modal.modal-open')) {
      document.body.classList.remove('modal-body-lock');
    }

    // Restore focus
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }

    // Dispatch close event
    const event = new CustomEvent('modal:closed', {
      detail: { modalId: modal.id, modal },
      bubbles: true
    });
    document.dispatchEvent(event);

    // Handle options
    if (options.onClose) {
      options.onClose(modal);
    }
  }

  /**
   * Check if modal can be closed
   */
  canCloseModal(modal) {
    // Check for unsaved form data
    const form = modal.querySelector('form');
    if (form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      for (const input of inputs) {
        if (input.value && input.getAttribute('data-pristine') !== 'true') {
          const confirmClose = confirm('You have unsaved changes. Are you sure you want to close?');
          return confirmClose;
        }
      }
    }
    return true;
  }

  /**
   * Update list of focusable elements
   */
  updateFocusableElements() {
    if (!this.activeModal) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this.focusableElements = Array.from(
      this.activeModal.querySelectorAll(focusableSelectors.join(', '))
    ).filter(el => {
      // Filter out hidden elements
      return el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';
    });
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.activeModal) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.closeModal(this.activeModal.id);
          break;

        case 'Tab':
          this.handleTabKey(e);
          break;
      }
    });

    // Handle focus trap
    document.addEventListener('focus', (e) => {
      if (this.activeModal && !this.activeModal.contains(e.target)) {
        e.preventDefault();
        this.focusableElements[0]?.focus();
      }
    }, true);

    // API Events
    document.addEventListener('modal:open', (e) => {
      this.openModal(e.detail.modalId, e.detail.options);
    });

    document.addEventListener('modal:close', (e) => {
      this.closeModal(e.detail.modalId, e.detail.options);
    });

    document.addEventListener('modal:toggle', (e) => {
      this.toggleModal(e.detail.modalId);
    });
  }

  /**
   * Handle Tab key for focus trap
   */
  handleTabKey(e) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Toggle modal open/close
   */
  toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (modal.classList.contains('modal-open')) {
      this.closeModal(modalId);
    } else {
      this.openModal(modalId);
    }
  }

  /**
   * Create modal programmatically
   */
  createModal(options = {}) {
    const {
      id = `modal-${Date.now()}`,
      title = 'Modal Title',
      content = '',
      size = 'default',
      showClose = true,
      showFooter = true,
      buttons = [
        { text: 'Cancel', variant: 'secondary', action: 'dismiss' },
        { text: 'OK', variant: 'primary' }
      ]
    } = options;

    // Create modal element
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = `modal ${size ? `modal-${size}` : ''}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', `${id}-title`);
    modal.setAttribute('aria-hidden', 'true');

    // Build modal HTML
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-content">
          <header class="modal-header">
            <h2 id="${id}-title" class="modal-title">${title}</h2>
            ${showClose ? `
              <button class="modal-close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            ` : ''}
          </header>
          <div class="modal-body">
            ${content}
          </div>
          ${showFooter ? `
            <footer class="modal-footer">
              ${buttons.map(button => `
                <button class="modal-button modal-button-${button.variant || 'primary'}"
                  ${button.action === 'dismiss' ? 'data-modal-dismiss' : ''}
                  ${button.id ? `id="${button.id}"` : ''}>
                  ${button.text}
                </button>
              `).join('')}
            </footer>
          ` : ''}
        </div>
      </div>
    `;

    // Add to document
    document.body.appendChild(modal);

    // Initialize the new modal
    this.initializeModal(modal);

    return modal;
  }

  /**
   * Initialize a single modal element
   */
  initializeModal(modal) {
    // Setup close button
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.closeModal(modal.id));
    }

    // Setup dismiss buttons
    const dismissButtons = modal.querySelectorAll('[data-modal-dismiss]');
    dismissButtons.forEach(button => {
      button.addEventListener('click', () => this.closeModal(modal.id));
    });

    // Setup backdrop click
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeModal(modal.id));
    }
  }

  /**
   * Show alert modal
   */
  alert(message, title = 'Alert') {
    const modal = this.createModal({
      title,
      content: `<p>${message}</p>`,
      size: 'small',
      buttons: [{ text: 'OK', variant: 'primary', action: 'dismiss' }]
    });

    this.openModal(modal.id);
    return modal;
  }

  /**
   * Show confirm modal
   */
  confirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
      const modal = this.createModal({
        title,
        content: `<p>${message}</p>`,
        size: 'small',
        buttons: [
          { text: 'Cancel', variant: 'secondary', id: 'confirm-cancel' },
          { text: 'Confirm', variant: 'primary', id: 'confirm-ok' }
        ]
      });

      // Handle button clicks
      modal.querySelector('#confirm-cancel').addEventListener('click', () => {
        this.closeModal(modal.id);
        resolve(false);
      });

      modal.querySelector('#confirm-ok').addEventListener('click', () => {
        this.closeModal(modal.id);
        resolve(true);
      });

      this.openModal(modal.id);
    });
  }

  /**
   * Show prompt modal
   */
  prompt(message, title = 'Input', defaultValue = '') {
    return new Promise((resolve) => {
      const inputId = `prompt-input-${Date.now()}`;
      const modal = this.createModal({
        title,
        content: `
          <p>${message}</p>
          <input type="text" id="${inputId}" class="form-input" value="${defaultValue}">
        `,
        size: 'small',
        buttons: [
          { text: 'Cancel', variant: 'secondary', id: 'prompt-cancel' },
          { text: 'OK', variant: 'primary', id: 'prompt-ok' }
        ]
      });

      const input = modal.querySelector(`#${inputId}`);

      // Handle button clicks
      modal.querySelector('#prompt-cancel').addEventListener('click', () => {
        this.closeModal(modal.id);
        resolve(null);
      });

      modal.querySelector('#prompt-ok').addEventListener('click', () => {
        this.closeModal(modal.id);
        resolve(input.value);
      });

      // Focus input when opened
      this.openModal(modal.id, {
        onOpen: () => {
          input.focus();
          input.select();
        }
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.modalComponent = new ModalComponent();
  });
} else {
  window.modalComponent = new ModalComponent();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModalComponent;
}