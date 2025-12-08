import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitization Configuration
 *
 * DOMPurify removes potentially dangerous HTML/JavaScript to prevent XSS attacks.
 * This is critical for user-generated content like blog posts.
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * Allows safe HTML tags for rich content (headings, lists, links, etc.)
 * while removing dangerous elements like scripts, iframes, and event handlers.
 *
 * @param dirty - Untrusted HTML content from user input
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    // Allow common HTML tags for rich text formatting
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Lists
      'ul', 'ol', 'li',
      // Links and images
      'a', 'img',
      // Tables
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // Quotes and divisions
      'blockquote', 'div', 'span',
      // Code blocks
      'pre', 'code',
    ],
    // Allow safe attributes
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'class', 'id',
      // For code syntax highlighting
      'data-language',
    ],
    // Allow specific URI schemes for links and images
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Remove elements that contain dangerous content
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
    // Remove dangerous attributes
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    // Keep HTML structure
    KEEP_CONTENT: true,
    // Return clean HTML
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}

/**
 * Sanitize plain text (strip all HTML)
 *
 * Use this for fields that should never contain HTML like titles, names, etc.
 *
 * @param dirty - Untrusted text from user input
 * @returns Plain text with all HTML removed
 */
export function sanitizeText(dirty: string): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    KEEP_CONTENT: true, // Keep the text content
  });
}

/**
 * Sanitize URL to prevent javascript: and data: URI attacks
 *
 * @param url - Untrusted URL from user input
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  // Remove leading/trailing whitespace
  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript):/i;
  if (dangerousProtocols.test(trimmed)) {
    return '';
  }

  return DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
}
