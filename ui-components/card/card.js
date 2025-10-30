// Card Component JavaScript

/**
 * Card component initialization and functionality
 */
class CardComponent {
  constructor() {
    this.cards = [];
    this.initializeCards();
    this.setupEventListeners();
  }

  /**
   * Initialize all cards in the document
   */
  initializeCards() {
    const cardElements = document.querySelectorAll('.card');

    cardElements.forEach(card => {
      const cardInstance = {
        element: card,
        isInteractive: card.classList.contains('card-interactive'),
        isExpanded: false,
        originalHeight: null
      };

      this.cards.push(cardInstance);

      // Setup interactive cards
      if (cardInstance.isInteractive) {
        this.setupInteractiveCard(cardInstance);
      }

      // Setup card actions
      this.setupCardActions(card);

      // Setup lazy loading for images
      this.setupLazyLoading(card);
    });
  }

  /**
   * Setup interactive card behavior
   */
  setupInteractiveCard(cardInstance) {
    const { element } = cardInstance;

    // Keyboard navigation
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleCardClick(cardInstance);
      }
    });

    // Click handling
    element.addEventListener('click', (e) => {
      // Prevent triggering if clicking on buttons
      if (e.target.closest('button')) return;
      this.handleCardClick(cardInstance);
    });

    // Add hover effect programmatically
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-2px)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
    });
  }

  /**
   * Handle card click event
   */
  handleCardClick(cardInstance) {
    const event = new CustomEvent('card:click', {
      detail: { card: cardInstance.element },
      bubbles: true
    });
    cardInstance.element.dispatchEvent(event);

    // Example: Toggle expand state
    if (cardInstance.element.classList.contains('card-expandable')) {
      this.toggleExpand(cardInstance);
    }
  }

  /**
   * Toggle card expansion
   */
  toggleExpand(cardInstance) {
    const cardBody = cardInstance.element.querySelector('.card-body');
    if (!cardBody) return;

    if (cardInstance.isExpanded) {
      // Collapse
      cardBody.style.maxHeight = '100px';
      cardInstance.isExpanded = false;
      cardInstance.element.setAttribute('aria-expanded', 'false');
    } else {
      // Expand
      const scrollHeight = cardBody.scrollHeight;
      cardBody.style.maxHeight = `${scrollHeight}px`;
      cardInstance.isExpanded = true;
      cardInstance.element.setAttribute('aria-expanded', 'true');
    }
  }

  /**
   * Setup card action buttons
   */
  setupCardActions(card) {
    const actionButtons = card.querySelectorAll('.card-action-button, .card-icon-button');

    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = button.getAttribute('aria-label')?.toLowerCase();
        this.handleCardAction(card, action, button);
      });
    });
  }

  /**
   * Handle card actions
   */
  handleCardAction(card, action, button) {
    const event = new CustomEvent('card:action', {
      detail: { card, action, button },
      bubbles: true
    });
    document.dispatchEvent(event);

    // Handle specific actions
    switch (action) {
      case 'favorite':
        this.toggleFavorite(button);
        break;
      case 'delete':
        this.deleteCard(card);
        break;
      case 'edit':
        this.editCard(card);
        break;
      default:
        console.log(`Card action: ${action}`);
    }
  }

  /**
   * Toggle favorite state
   */
  toggleFavorite(button) {
    const isFavorited = button.getAttribute('data-favorited') === 'true';

    if (isFavorited) {
      button.setAttribute('data-favorited', 'false');
      button.querySelector('svg').style.fill = 'none';
      button.setAttribute('aria-label', 'Add to favorites');
    } else {
      button.setAttribute('data-favorited', 'true');
      button.querySelector('svg').style.fill = 'currentColor';
      button.setAttribute('aria-label', 'Remove from favorites');
    }

    // Animate
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 200);
  }

  /**
   * Delete card with animation
   */
  deleteCard(card) {
    // Confirm deletion
    const confirmed = confirm('Are you sure you want to delete this card?');
    if (!confirmed) return;

    // Animate out
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';

    setTimeout(() => {
      card.remove();
      // Update cards array
      this.cards = this.cards.filter(c => c.element !== card);
    }, 300);
  }

  /**
   * Edit card content
   */
  editCard(card) {
    const title = card.querySelector('.card-title');
    const text = card.querySelector('.card-text');

    if (title && title.contentEditable !== 'true') {
      // Enable editing
      title.contentEditable = 'true';
      title.focus();
      title.style.outline = '2px solid #3b82f6';

      if (text) {
        text.contentEditable = 'true';
        text.style.outline = '2px solid #3b82f6';
      }

      // Save on blur
      const saveEdit = () => {
        title.contentEditable = 'false';
        title.style.outline = 'none';

        if (text) {
          text.contentEditable = 'false';
          text.style.outline = 'none';
        }

        // Dispatch save event
        const event = new CustomEvent('card:edited', {
          detail: {
            card,
            title: title.textContent,
            text: text?.textContent
          },
          bubbles: true
        });
        document.dispatchEvent(event);
      };

      title.addEventListener('blur', saveEdit, { once: true });
      if (text) {
        text.addEventListener('blur', saveEdit, { once: true });
      }
    }
  }

  /**
   * Setup lazy loading for images
   */
  setupLazyLoading(card) {
    const images = card.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Load actual image if using placeholder
            if (img.dataset.src) {
              img.src = img.dataset.src;
              delete img.dataset.src;
            }
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Handle card filtering
    document.addEventListener('card:filter', (e) => {
      const { tag, category } = e.detail;
      this.filterCards(tag, category);
    });

    // Handle card sorting
    document.addEventListener('card:sort', (e) => {
      const { sortBy } = e.detail;
      this.sortCards(sortBy);
    });
  }

  /**
   * Filter cards by tag or category
   */
  filterCards(tag, category) {
    this.cards.forEach(({ element }) => {
      const cardTags = Array.from(element.querySelectorAll('.card-tag')).map(t => t.textContent);
      const cardCategory = element.dataset.category;

      const matchesTag = !tag || cardTags.includes(tag);
      const matchesCategory = !category || cardCategory === category;

      if (matchesTag && matchesCategory) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });
  }

  /**
   * Sort cards
   */
  sortCards(sortBy) {
    const container = document.querySelector('.card-showcase');
    if (!container) return;

    const sorted = [...this.cards].sort((a, b) => {
      const aTitle = a.element.querySelector('.card-title')?.textContent || '';
      const bTitle = b.element.querySelector('.card-title')?.textContent || '';

      switch (sortBy) {
        case 'title':
          return aTitle.localeCompare(bTitle);
        case 'date':
          const aDate = new Date(a.element.dataset.date || 0);
          const bDate = new Date(b.element.dataset.date || 0);
          return bDate - aDate;
        default:
          return 0;
      }
    });

    // Reorder DOM elements
    sorted.forEach(({ element }) => {
      container.appendChild(element);
    });
  }

  /**
   * Create a new card programmatically
   */
  createCard(options = {}) {
    const {
      title = 'New Card',
      text = 'Card content',
      image = null,
      tags = [],
      variant = 'default'
    } = options;

    const card = document.createElement('article');
    card.className = `card ${variant ? `card-${variant}` : ''}`;
    card.setAttribute('role', 'article');

    // Build card HTML
    card.innerHTML = `
      ${image ? `
        <div class="card-image-wrapper">
          <img src="${image}" alt="${title}" class="card-image" loading="lazy">
        </div>
      ` : ''}
      <header class="card-header">
        <h3 class="card-title">${title}</h3>
      </header>
      <div class="card-body">
        <p class="card-text">${text}</p>
        ${tags.length ? `
          <div class="card-tags">
            ${tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      <footer class="card-footer">
        <button class="card-button">Learn More</button>
      </footer>
    `;

    return card;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cardComponent = new CardComponent();
  });
} else {
  window.cardComponent = new CardComponent();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardComponent;
}