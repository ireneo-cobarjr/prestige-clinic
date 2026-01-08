/**
 * Normalizes any PH number (Mobile or Landline) to E.164 format (+63...)
 */
export const normalizePHPhone = (phone: string): string => {
  // 1. Remove all non-numeric characters except the plus sign
  const clean = phone.replace(/[^\d+]/g, '');

  // 2. Handle "0" prefix (Local format)
  // e.g., 0917... -> +63917... OR 028123... -> +6328123...
  if (clean.startsWith('0')) {
    return '+63' + clean.slice(1);
  }

  // 3. Handle "63" prefix (No plus)
  if (clean.startsWith('63')) {
    return '+' + clean;
  }

  // 4. If it already starts with +63, return as is
  if (clean.startsWith('+63')) {
    return clean;
  }

  // Return original if it doesn't match expected PH patterns
  return clean;
};

/**
 * Sanitizes text to be safe for display or database storage.
 * Escapes < and > and removes null bytes.
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';

  return text
    .trim()
    .replace(/\0/g, '') // Remove null bytes (common in injection)
    .replace(/</g, '&lt;') // Escape opening tags
    .replace(/>/g, '&gt;') // Escape closing tags
    .replace(/"/g, '&quot;') // Escape double quotes
    .replace(/'/g, '&#39;'); // Escape single quotes
};
