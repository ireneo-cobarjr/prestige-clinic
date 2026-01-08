/**
 * Standard Filipino/Western Name Validation
 * Allows: A-Z, a-z, Ñ, ñ, spaces, hyphens, and apostrophes
 */
export const isValidName = (name: string): boolean => {
  // We explicitly include \u00d1 (Ñ) and \u00f1 (ñ)
  const pattern = /^[a-zA-Z\u00d1\u00f1\s\-\']+$/;

  const trimmedName = name.trim();

  // Ensure it's not empty and matches the pattern
  return trimmedName.length >= 2 && pattern.test(trimmedName);
};

/**
 * Validates an email address.
 * Matches most real-world emails while remaining performant.
 */
export const isValidEmail = (email: string): boolean => {
  // Pattern breakdown:
  // 1. ^[^\s@]+       -> At least one character that isn't a space or @
  // 2. @              -> A literal @ symbol
  // 3. [^\s@]+        -> The domain name (no spaces or @)
  // 4. \.             -> A literal dot
  // 5. [^\s@]{2,}$    -> At least 2 characters for the TLD (com, net, ph, etc.)
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return pattern.test(email.trim());
};

/**
 * Validates Philippine Mobile Numbers
 * Matches: 09171234567, +639171234567, 639171234567
 */
export const isValidPHMobile = (phone: string): boolean => {
  // Remove spaces, hyphens, or parentheses for easier validation
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // Regex Breakdown:
  // ^(\+63|63|0) -> Starts with +63, 63, or 0
  // 9            -> The next digit must be 9
  // \d{9}$       -> Followed by exactly 9 more digits
  const pattern = /^(\+63|63|0)9\d{9}$/;

  return pattern.test(cleanPhone);
};

/**
 * Validates Philippine Landline Numbers
 * Supports 8-digit (Manila) and standard 7-digit (Provinces)
 */
export const isValidPHLandline = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // Pattern Breakdown:
  // ^(\+63|63|0) -> Prefix
  // (2|3[2-9]|4[2-9]|5[2-9]|6[2-9]|7[2-9]|8[2-9]) -> Area code
  // \d{7,8}$     -> 7 or 8 digits depending on the area
  const pattern = /^(\+63|63|0)(2|3[2-8]|4[2-9]|5[2-9]|6[2-9]|7[2-9]|8[2-9])\d{7,8}$/;

  return pattern.test(cleanPhone);
};

export const validatePHPhone = (val: string): boolean => {
  // Check if it's either a valid mobile OR a valid landline
  return isValidPHMobile(val) || isValidPHLandline(val);
};

export const isValidAddressBroad = (address: string, allowEmpty: boolean = false): boolean => {
  if (allowEmpty && address.trim() === '') return true;
  // Added support for () and :
  const pattern = /^[a-zA-Z0-9\u00d1\u00f1\s,.#\-\/\(\):]+$/;
  const trimmed = address.trim();

  // Basic check for at least one letter and one number
  // (to prevent addresses like "12345678" or ".......")
  const hasLetters = /[a-zA-Z\u00d1\u00f1]/.test(trimmed);

  return trimmed.length >= 5 && pattern.test(trimmed) && hasLetters;
};

/**
 * Validates 'Additional Info' to ensure it is safe and non-malicious.
 * Allows: Letters, Numbers, Punctuation, Newlines, and common symbols.
 * Rejects: HTML tags, Script tags, and suspicious code patterns.
 */
export const isSafeText = (text: string): boolean => {
  if (!text) return true; // Empty info is usually fine for "additional info"

  // 1. Basic HTML/Script tag detection
  // This blocks things like <script>, <img> with onerror, <iframe>, etc.
  const htmlPattern = /<[^>]*>/;
  if (htmlPattern.test(text)) return false;

  // 2. Allowed Character Set (Printable characters only)
  // Allows letters (including Ñ/ñ), numbers, basic punctuation, spaces, and newlines (\n \r)
  // We exclude symbols like < > to prevent HTML injection.
  const safePattern = /^[a-zA-Z0-9\u00d1\u00f1\s.,!?"'()#&@:;\-\+\=\%\/\*\n\r]*$/;

  return safePattern.test(text);
};
