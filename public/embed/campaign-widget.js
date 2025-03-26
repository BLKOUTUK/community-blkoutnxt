/**
 * BLKOUTNXT Campaign Widget Embed Script
 * 
 * This script allows embedding BLKOUTNXT campaign widgets on any website.
 * 
 * Usage:
 * 1. Add this script to your page:
 *    <script src="https://blkoutnxt.org/embed/campaign-widget.js" async></script>
 * 
 * 2. Add a container element with the blkoutnxt-campaign-widget class:
 *    <div class="blkoutnxt-campaign-widget" 
 *         data-campaign-id="1" 
 *         data-variant="full" 
 *         data-theme="light"
 *         data-primary-color="#7c3aed"
 *         data-secondary-color="#e5e7eb"
 *         data-show-branding="true"></div>
 */

(function() {
  // Configuration
  const WIDGET_URL = 'https://blkoutnxt.org/embed/campaign-widget.html';
  const WIDGET_CLASS = 'blkoutnxt-campaign-widget';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
  
  // Find and initialize all widgets on the page
  function initWidgets() {
    const widgetContainers = document.getElementsByClassName(WIDGET_CLASS);
    
    for (let i = 0; i < widgetContainers.length; i++) {
      createWidget(widgetContainers[i]);
    }
    
    // Also set up a mutation observer to catch dynamically added widgets
    setupMutationObserver();
  }
  
  // Create an iframe for each widget container
  function createWidget(container) {
    // Skip if already initialized
    if (container.dataset.initialized === 'true') return;
    
    // Get configuration from data attributes
    const campaignId = container.dataset.campaignId || '1';
    const variant = container.dataset.variant || 'full';
    const theme = container.dataset.theme || 'light';
    const primaryColor = container.dataset.primaryColor || '#7c3aed';
    const secondaryColor = container.dataset.secondaryColor || '#e5e7eb';
    const showBranding = container.dataset.showBranding !== 'false';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    
    // Set default height based on variant
    iframe.style.height = variant === 'compact' ? '120px' : '450px';
    
    // Build URL with query parameters
    const url = new URL(WIDGET_URL);
    url.searchParams.append('campaignId', campaignId);
    url.searchParams.append('variant', variant);
    url.searchParams.append('theme', theme);
    url.searchParams.append('primaryColor', encodeURIComponent(primaryColor));
    url.searchParams.append('secondaryColor', encodeURIComponent(secondaryColor));
    url.searchParams.append('showBranding', showBranding);
    
    iframe.src = url.toString();
    
    // Add resize message listener
    window.addEventListener('message', function(event) {
      // Verify origin for security
      if (event.origin !== new URL(WIDGET_URL).origin) return;
      
      // Handle resize message from iframe
      if (event.data && event.data.type === 'blkoutnxt-widget-resize' && 
          event.data.height && event.data.widgetId === campaignId) {
        iframe.style.height = event.data.height + 'px';
      }
    });
    
    // Add iframe to container
    container.appendChild(iframe);
    
    // Mark as initialized
    container.dataset.initialized = 'true';
  }
  
  // Set up mutation observer to catch dynamically added widgets
  function setupMutationObserver() {
    if (!window.MutationObserver) return;
    
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            // Check if the added node is an element and has the widget class
            if (node.nodeType === 1 && node.classList && 
                node.classList.contains(WIDGET_CLASS)) {
              createWidget(node);
            }
            
            // Also check children of added nodes
            if (node.nodeType === 1 && node.getElementsByClassName) {
              const childWidgets = node.getElementsByClassName(WIDGET_CLASS);
              for (let i = 0; i < childWidgets.length; i++) {
                createWidget(childWidgets[i]);
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();