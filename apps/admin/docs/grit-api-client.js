/**
 * Grit Digital Performance API Client Library
 * For integration with client organization sites
 */

class GritAPIClient {
  constructor(baseURL = 'https://admin.gritdp.com/api') {
    this.baseURL = baseURL;
    this.organizationSlug = null;
  }

  /**
   * Set the organization slug for subsequent requests
   * @param {string} slug - Organization slug (e.g., 'tuguegaraoleague')
   */
  setOrganization(slug) {
    this.organizationSlug = slug;
  }

  /**
   * Make API request with proper headers and error handling
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Register a participant for an event
   * @param {Object} registrationData - Registration information
   * @returns {Promise} Registration result
   */
  async registerForEvent(registrationData) {
    const payload = {
      organization_slug: this.organizationSlug,
      ...registrationData,
    };

    return this.request('/events/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get events for the current organization
   * @returns {Promise} List of events
   */
  async getEvents() {
    if (!this.organizationSlug) {
      throw new Error('Organization slug must be set first');
    }

    return this.request(`/events?organization_slug=${this.organizationSlug}`);
  }

  /**
   * Get details for a specific event
   * @param {string} eventId - Event ID
   * @returns {Promise} Event details
   */
  async getEvent(eventId) {
    return this.request(`/events/${eventId}`);
  }

  /**
   * Get organization information
   * @param {string} slug - Organization slug (optional, uses current if not provided)
   * @returns {Promise} Organization details
   */
  async getOrganization(slug = this.organizationSlug) {
    if (!slug) {
      throw new Error('Organization slug must be set or provided');
    }

    return this.request(`/organizations/${slug}`);
  }

  /**
   * Create a registration form handler
   * @param {HTMLFormElement} form - Form element
   * @param {Object} options - Form options
   * @returns {Object} Form handler with submit method
   */
  createFormHandler(form, options = {}) {
    const {
      onSuccess = (data) => console.log('Registration successful:', data),
      onError = (error) => console.error('Registration failed:', error),
      onSubmit = () => {},
      onComplete = () => {},
    } = options;

    const handleSubmit = async (e) => {
      e.preventDefault();
      onSubmit();

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const result = await this.registerForEvent(data);
        onSuccess(result);
        form.reset();
      } catch (error) {
        onError(error);
      } finally {
        onComplete();
      }
    };

    form.addEventListener('submit', handleSubmit);

    return {
      submit: () => form.dispatchEvent(new Event('submit')),
      destroy: () => form.removeEventListener('submit', handleSubmit),
    };
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GritAPIClient;
} else if (typeof window !== 'undefined') {
  window.GritAPIClient = GritAPIClient;
}

// Usage example:
/*
// Initialize client
const api = new GritAPIClient();
api.setOrganization('tuguegaraoleague');

// Register for event
api.registerForEvent({
  event_id: 'evt_123',
  name: 'Juan Dela Cruz',
  email: 'juan@email.com',
  phone: '09123456789',
  team: 'Tuguegarao Warriors'
})
.then(result => console.log('Success:', result))
.catch(error => console.error('Error:', error));

// Handle form submission
const form = document.getElementById('registrationForm');
const handler = api.createFormHandler(form, {
  onSuccess: (data) => alert('Registration successful!'),
  onError: (error) => alert('Registration failed: ' + error.message),
});
*/
