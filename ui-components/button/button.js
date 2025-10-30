// Button Component JavaScript

/**
 * Button component initialization and functionality
 */
class ButtonComponent {
  constructor() {
    this.initializeButtons();
    this.setupEventListeners();
  }

  /**
   * Initialize all buttons in the document
   */
  initializeButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      // Add ripple effect support
      if (!button.querySelector('.btn-ripple')) {
        this.addRippleEffect(button);
      }

      // Enhanced keyboard navigation
      this.enhanceKeyboardNavigation(button);
    });
  }

  /**
   * Add ripple effect to buttons
   */
  addRippleEffect(button) {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    button.addEventListener('click', (e) => {
      if (button.disabled || button.classList.contains('btn-loading')) return;

      const ripple = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - button.offsetLeft - radius}px`;
      ripple.style.top = `${e.clientY - button.offsetTop - radius}px`;
      ripple.classList.add('btn-ripple');

      // Add ripple styles dynamically
      if (!document.querySelector('#btn-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'btn-ripple-styles';
        style.textContent = `
          .btn-ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            background-color: rgba(255, 255, 255, 0.5);
            pointer-events: none;
          }
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  /**
   * Enhance keyboard navigation
   */
  enhanceKeyboardNavigation(button) {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!button.disabled && !button.classList.contains('btn-loading')) {
          button.click();
        }
      }
    });
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Example: Handle loading state
    document.addEventListener('button:startLoading', (e) => {
      const button = e.detail.button;
      this.setLoadingState(button, true);
    });

    document.addEventListener('button:stopLoading', (e) => {
      const button = e.detail.button;
      this.setLoadingState(button, false);
    });
  }

  /**
   * Set button loading state
   */
  setLoadingState(button, isLoading) {
    if (isLoading) {
      button.classList.add('btn-loading');
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;

      // Store original content
      button.dataset.originalContent = button.innerHTML;

      // Add spinner
      const spinner = document.createElement('span');
      spinner.className = 'btn-spinner';
      button.innerHTML = '';
      button.appendChild(spinner);

      // Add loading text
      const loadingText = document.createElement('span');
      loadingText.textContent = 'Loading...';
      loadingText.style.marginLeft = '0.5rem';
      button.appendChild(loadingText);
    } else {
      button.classList.remove('btn-loading');
      button.setAttribute('aria-busy', 'false');
      button.disabled = false;

      // Restore original content
      if (button.dataset.originalContent) {
        button.innerHTML = button.dataset.originalContent;
        delete button.dataset.originalContent;
      }
    }
  }

  /**
   * Programmatically trigger button click
   */
  triggerClick(button) {
    if (!button.disabled && !button.classList.contains('btn-loading')) {
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(event);
    }
  }

  /**
   * Enable/disable button
   */
  setEnabled(button, enabled) {
    button.disabled = !enabled;
    if (enabled) {
      button.removeAttribute('aria-disabled');
    } else {
      button.setAttribute('aria-disabled', 'true');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.buttonComponent = new ButtonComponent();
  });
} else {
  window.buttonComponent = new ButtonComponent();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ButtonComponent;
}