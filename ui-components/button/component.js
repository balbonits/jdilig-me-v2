// Button Component JavaScript

class ButtonComponent {
    constructor() {
        this.initializeButtons();
        this.setupKeyboardNavigation();
        this.setupLoadingStateDemo();
    }

    initializeButtons() {
        // Add ripple effect to all buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', this.createRipple.bind(this));
            }
        });

        // Add click handlers for demo purposes
        buttons.forEach(button => {
            if (!button.disabled && !button.classList.contains('btn-loading')) {
                button.addEventListener('click', (e) => {
                    console.log(`Button clicked: ${e.target.innerText || e.target.getAttribute('aria-label')}`);
                });
            }
        });
    }

    createRipple(event) {
        const button = event.currentTarget;

        // Remove existing ripple
        const existingRipple = button.querySelector('.btn-ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';

        // Calculate position
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupKeyboardNavigation() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            // Ensure buttons are keyboard accessible
            if (!button.hasAttribute('tabindex') && !button.disabled) {
                button.setAttribute('tabindex', '0');
            }

            // Handle Enter and Space key presses
            button.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !button.disabled) {
                    e.preventDefault();
                    button.click();
                }
            });

            // Enhance focus styles
            button.addEventListener('focus', () => {
                button.classList.add('btn-focused');
            });

            button.addEventListener('blur', () => {
                button.classList.remove('btn-focused');
            });
        });
    }

    setupLoadingStateDemo() {
        // Find loading button and simulate async operation
        const loadingButton = document.querySelector('.btn-loading');
        if (loadingButton) {
            // Simulate loading completion after 3 seconds for demo
            setTimeout(() => {
                this.setLoadingState(loadingButton, false);
            }, 3000);
        }
    }

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.setAttribute('aria-busy', 'true');
            button.disabled = true;

            // Store original content
            button.dataset.originalContent = button.innerHTML;

            // Add spinner and loading text
            button.innerHTML = `
                <span class="btn-spinner"></span>
                <span>Loading...</span>
            `;
        } else {
            button.classList.remove('btn-loading');
            button.setAttribute('aria-busy', 'false');
            button.disabled = false;

            // Restore original content or set success state
            if (button.dataset.originalContent) {
                button.innerHTML = button.dataset.originalContent;
            } else {
                button.innerHTML = 'Complete';
            }
        }
    }

    // Public API for external use
    static createButton(options = {}) {
        const {
            text = 'Button',
            type = 'primary',
            size = 'default',
            disabled = false,
            loading = false,
            icon = null,
            onClick = null,
            ariaLabel = null
        } = options;

        const button = document.createElement('button');
        button.className = `btn btn-${type}`;

        if (size !== 'default') {
            button.classList.add(`btn-${size}`);
        }

        if (disabled) {
            button.disabled = true;
            button.setAttribute('aria-disabled', 'true');
        }

        if (loading) {
            button.classList.add('btn-loading');
            button.setAttribute('aria-busy', 'true');
        }

        if (ariaLabel) {
            button.setAttribute('aria-label', ariaLabel);
        }

        if (icon) {
            button.classList.add('btn-icon');
            button.innerHTML = `${icon}<span>${text}</span>`;
        } else if (loading) {
            button.innerHTML = `
                <span class="btn-spinner"></span>
                <span>Loading...</span>
            `;
        } else {
            button.innerText = text;
        }

        if (onClick && !disabled && !loading) {
            button.addEventListener('click', onClick);
        }

        return button;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ButtonComponent();
    });
} else {
    new ButtonComponent();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ButtonComponent;
}