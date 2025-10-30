// Toggle Switch Component JavaScript

/**
 * Toggle Switch component with async support and animations
 */
class ToggleSwitchComponent {
  constructor() {
    this.toggles = new Map();
    this.initializeToggles();
    this.setupEventListeners();
  }

  /**
   * Initialize all toggle switches in the document
   */
  initializeToggles() {
    const toggleInputs = document.querySelectorAll('.toggle-input');

    toggleInputs.forEach(input => {
      const wrapper = input.closest('.toggle-wrapper');
      const switchElement = wrapper.querySelector('.toggle-switch');

      const toggle = {
        input,
        wrapper,
        switch: switchElement,
        isAsync: input.dataset.async === 'true',
        isLoading: false,
        originalState: input.checked
      };

      this.toggles.set(input.id, toggle);

      // Setup toggle behavior
      this.setupToggle(toggle);

      // Initialize ARIA attributes
      this.updateAriaAttributes(toggle);
    });
  }

  /**
   * Setup individual toggle behavior
   */
  setupToggle(toggle) {
    const { input, wrapper } = toggle;

    // Handle toggle change
    input.addEventListener('change', async (e) => {
      e.preventDefault();

      // Update ARIA attributes
      this.updateAriaAttributes(toggle);

      // Handle async toggles
      if (toggle.isAsync && !toggle.isLoading) {
        await this.handleAsyncToggle(toggle);
      } else if (!toggle.isAsync) {
        // Dispatch change event for regular toggles
        this.dispatchToggleEvent(toggle, 'change');
      }

      // Update state labels if present
      this.updateStateLabels(toggle);
    });

    // Keyboard support
    input.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change'));
      }
    });

    // Prevent clicks on disabled toggles
    wrapper.addEventListener('click', (e) => {
      if (input.disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  /**
   * Handle async toggle operations
   */
  async handleAsyncToggle(toggle) {
    const { input, wrapper } = toggle;
    const newState = input.checked;

    // Start loading
    this.setLoadingState(toggle, true);

    try {
      // Dispatch before-change event
      const beforeEvent = this.dispatchToggleEvent(toggle, 'beforeChange', {
        cancelable: true,
        newState
      });

      if (beforeEvent.defaultPrevented) {
        // Revert state if prevented
        input.checked = !newState;
        this.setLoadingState(toggle, false);
        return;
      }

      // Simulate async operation (replace with actual API call)
      const success = await this.simulateAsyncOperation(newState);

      if (success) {
        // Success - keep new state
        this.dispatchToggleEvent(toggle, 'change', { newState });
        this.showFeedback(toggle, 'success');
      } else {
        // Failed - revert state
        input.checked = !newState;
        this.dispatchToggleEvent(toggle, 'error', {
          message: 'Failed to update setting'
        });
        this.showFeedback(toggle, 'error');
      }
    } catch (error) {
      // Error - revert state
      input.checked = !newState;
      this.dispatchToggleEvent(toggle, 'error', { error });
      this.showFeedback(toggle, 'error');
    } finally {
      this.setLoadingState(toggle, false);
      this.updateAriaAttributes(toggle);
    }
  }

  /**
   * Simulate async operation (replace with actual implementation)
   */
  simulateAsyncOperation(state) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        resolve(Math.random() > 0.1);
      }, 1000);
    });
  }

  /**
   * Set loading state for toggle
   */
  setLoadingState(toggle, isLoading) {
    const { wrapper, input } = toggle;

    toggle.isLoading = isLoading;

    if (isLoading) {
      wrapper.classList.add('is-loading');
      input.setAttribute('aria-busy', 'true');
      input.disabled = true;
    } else {
      wrapper.classList.remove('is-loading');
      input.setAttribute('aria-busy', 'false');
      input.disabled = false;
    }
  }

  /**
   * Show feedback animation
   */
  showFeedback(toggle, type) {
    const { switch: switchElement } = toggle;

    // Add feedback class
    switchElement.classList.add(`toggle-feedback-${type}`);

    // Remove after animation
    setTimeout(() => {
      switchElement.classList.remove(`toggle-feedback-${type}`);
    }, 500);

    // Add feedback styles if not present
    if (!document.querySelector('#toggle-feedback-styles')) {
      const style = document.createElement('style');
      style.id = 'toggle-feedback-styles';
      style.textContent = `
        .toggle-feedback-success {
          animation: feedbackSuccess 0.5s ease;
        }
        .toggle-feedback-error {
          animation: feedbackError 0.5s ease;
        }
        @keyframes feedbackSuccess {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); background-color: #10b981 !important; }
        }
        @keyframes feedbackError {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Update ARIA attributes
   */
  updateAriaAttributes(toggle) {
    const { input } = toggle;
    input.setAttribute('aria-checked', input.checked ? 'true' : 'false');

    // Update label if exists
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      const labelText = label.querySelector('.toggle-label');
      if (labelText) {
        const state = input.checked ? 'on' : 'off';
        input.setAttribute('aria-label', `${labelText.textContent} - ${state}`);
      }
    }
  }

  /**
   * Update state labels
   */
  updateStateLabels(toggle) {
    const { input } = toggle;
    const stateWrapper = input.closest('.toggle-state-wrapper');

    if (stateWrapper) {
      const offLabel = stateWrapper.querySelector('[data-state="off"]');
      const onLabel = stateWrapper.querySelector('[data-state="on"]');

      if (input.checked) {
        offLabel?.classList.add('inactive');
        onLabel?.classList.remove('inactive');
      } else {
        offLabel?.classList.remove('inactive');
        onLabel?.classList.add('inactive');
      }
    }
  }

  /**
   * Dispatch toggle event
   */
  dispatchToggleEvent(toggle, type, detail = {}) {
    const event = new CustomEvent(`toggle:${type}`, {
      detail: {
        toggleId: toggle.input.id,
        checked: toggle.input.checked,
        ...detail
      },
      bubbles: true,
      cancelable: detail.cancelable || false
    });
    return toggle.input.dispatchEvent(event);
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // API: Set toggle state
    document.addEventListener('toggle:set', (e) => {
      const { toggleId, checked } = e.detail;
      this.setToggleState(toggleId, checked);
    });

    // API: Toggle state
    document.addEventListener('toggle:toggle', (e) => {
      const { toggleId } = e.detail;
      this.toggleState(toggleId);
    });

    // API: Enable/disable
    document.addEventListener('toggle:enable', (e) => {
      const { toggleId, enabled = true } = e.detail;
      this.setEnabled(toggleId, enabled);
    });

    // Handle group toggles
    this.setupGroupToggles();
  }

  /**
   * Setup group toggle behavior
   */
  setupGroupToggles() {
    // Find toggle groups (like settings panels)
    const toggleLists = document.querySelectorAll('.toggle-list');

    toggleLists.forEach(list => {
      // Master toggle for airplane mode
      const airplaneToggle = list.querySelector('#toggle-airplane');
      if (airplaneToggle) {
        airplaneToggle.addEventListener('change', () => {
          const otherToggles = list.querySelectorAll('.toggle-input:not(#toggle-airplane)');

          otherToggles.forEach(toggle => {
            if (airplaneToggle.checked) {
              // Disable other toggles when airplane mode is on
              toggle.disabled = true;
              toggle.checked = false;
              toggle.dispatchEvent(new Event('change'));
            } else {
              // Re-enable toggles
              toggle.disabled = false;
            }
          });
        });
      }
    });
  }

  /**
   * Set toggle state programmatically
   */
  setToggleState(toggleId, checked) {
    const toggle = this.toggles.get(toggleId);
    if (!toggle) return;

    toggle.input.checked = checked;
    this.updateAriaAttributes(toggle);
    this.updateStateLabels(toggle);
    this.dispatchToggleEvent(toggle, 'change');
  }

  /**
   * Toggle state programmatically
   */
  toggleState(toggleId) {
    const toggle = this.toggles.get(toggleId);
    if (!toggle) return;

    toggle.input.checked = !toggle.input.checked;
    toggle.input.dispatchEvent(new Event('change'));
  }

  /**
   * Enable/disable toggle
   */
  setEnabled(toggleId, enabled) {
    const toggle = this.toggles.get(toggleId);
    if (!toggle) return;

    toggle.input.disabled = !enabled;
    toggle.wrapper.classList.toggle('toggle-disabled', !enabled);
  }

  /**
   * Get toggle state
   */
  getState(toggleId) {
    const toggle = this.toggles.get(toggleId);
    return toggle ? toggle.input.checked : null;
  }

  /**
   * Get all toggle states
   */
  getAllStates() {
    const states = {};
    this.toggles.forEach((toggle, id) => {
      states[id] = toggle.input.checked;
    });
    return states;
  }

  /**
   * Reset toggle to original state
   */
  resetToggle(toggleId) {
    const toggle = this.toggles.get(toggleId);
    if (!toggle) return;

    toggle.input.checked = toggle.originalState;
    this.updateAriaAttributes(toggle);
    this.updateStateLabels(toggle);
    this.dispatchToggleEvent(toggle, 'reset');
  }

  /**
   * Reset all toggles
   */
  resetAll() {
    this.toggles.forEach((toggle, id) => {
      this.resetToggle(id);
    });
  }

  /**
   * Create toggle programmatically
   */
  createToggle(options = {}) {
    const {
      id = `toggle-${Date.now()}`,
      label = 'Toggle',
      description = '',
      checked = false,
      size = 'default',
      colored = false,
      withIcons = false,
      async = false
    } = options;

    // Create wrapper element
    const wrapper = document.createElement('label');
    wrapper.className = `toggle-wrapper ${size ? `toggle-${size}` : ''}`;
    wrapper.setAttribute('for', id);

    // Build HTML
    wrapper.innerHTML = `
      ${description ? `
        <div class="toggle-content">
          <span class="toggle-label">${label}</span>
          <span class="toggle-description">${description}</span>
        </div>
      ` : `
        <span class="toggle-label">${label}</span>
      `}
      <input type="checkbox"
        id="${id}"
        class="toggle-input"
        role="switch"
        aria-checked="${checked}"
        ${checked ? 'checked' : ''}
        ${async ? 'data-async="true"' : ''}>
      <span class="toggle-switch ${colored ? 'toggle-switch-colored' : ''} ${withIcons ? 'toggle-switch-icons' : ''}">
        ${withIcons ? `
          <span class="toggle-icon toggle-icon-off">OFF</span>
          <span class="toggle-icon toggle-icon-on">ON</span>
        ` : ''}
        ${async ? '<span class="toggle-spinner"></span>' : ''}
      </span>
    `;

    // Initialize the new toggle
    const input = wrapper.querySelector('.toggle-input');
    const switchElement = wrapper.querySelector('.toggle-switch');

    const toggle = {
      input,
      wrapper,
      switch: switchElement,
      isAsync: async,
      isLoading: false,
      originalState: checked
    };

    this.toggles.set(id, toggle);
    this.setupToggle(toggle);
    this.updateAriaAttributes(toggle);

    return wrapper;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.toggleSwitchComponent = new ToggleSwitchComponent();
  });
} else {
  window.toggleSwitchComponent = new ToggleSwitchComponent();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToggleSwitchComponent;
}