import { UserAccount, AuthSession } from '@/types';

const STORAGE_USERS_KEY = 'sb_registered_users';
const STORAGE_SESSION_KEY = 'sb_auth_session';

/**
 * Robust SHA-256 hashing supporting both Browser (window.crypto) and Node.js environments
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const combined = `${salt}:${password}:skillbridge_ai_secret`;

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(combined);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Node.js fallback for test runner / SSR
  try {
    const crypto = await import('crypto');
    return crypto.createHash('sha256').update(combined).digest('hex');
  } catch {
    // Basic deterministic fallback if crypto is restricted
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }
}

export function generateSalt(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return (
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}

/**
 * Storage helpers
 */
function getAllUsers(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAllUsers(users: UserAccount[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to persist users to localStorage', err);
  }
}

/**
 * Register a new user account with secure validation and salted password hashing
 */
export function validateEmail(email: string): boolean {
  const cleanEmail = (email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleanEmail);
}

export function validatePassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 6;
}

export async function registerUser(params: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  targetRole?: string;
  institution?: string;
}): Promise<{ user: UserAccount; session: AuthSession }> {
  const { fullName, email, password, confirmPassword, targetRole, institution } = params;

  if (!fullName || fullName.trim().length < 2) {
    throw new Error('Please enter your full name (at least 2 characters).');
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  if (!validateEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    throw new Error('Passwords do not match. Please re-enter.');
  }

  const users = getAllUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const newUser: UserAccount = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: fullName.trim(),
    email: cleanEmail,
    passwordHash,
    salt,
    targetRole: targetRole?.trim() || 'Backend Developer',
    institution: institution?.trim() || 'Engineering Institute',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveAllUsers(users);

  // Automatically start an authenticated session
  const session = createSession(newUser);

  return { user: sanitizeUser(newUser), session };
}

/**
 * Login an existing user
 */
export async function loginUser(
  emailInput: string,
  passwordInput: string
): Promise<{ user: UserAccount; session: AuthSession }> {
  const cleanEmail = (emailInput || '').trim().toLowerCase();
  if (!cleanEmail || !passwordInput) {
    throw new Error('Please enter both email and password.');
  }

  const users = getAllUsers();
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    throw new Error('Invalid email or password. Please verify your credentials.');
  }

  const computedHash = await hashPassword(passwordInput, user.salt);
  if (computedHash !== user.passwordHash) {
    throw new Error('Invalid email or password. Please verify your credentials.');
  }

  const session = createSession(user);
  return { user: sanitizeUser(user), session };
}

/**
 * Create and persist an active session
 */
function createSession(user: UserAccount): AuthSession {
  const session: AuthSession = {
    token: `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }

  return session;
}

/**
 * Retrieve active session if valid
 */
export function getCurrentSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (session.expiresAt < Date.now()) {
      logoutUser();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Retrieve the current logged-in user object
 */
export function getCurrentUser(): UserAccount | null {
  const session = getCurrentSession();
  if (!session) return null;

  const users = getAllUsers();
  const found = users.find((u) => u.id === session.userId);
  return found ? sanitizeUser(found) : null;
}

/**
 * Log out user by clearing session
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch {
    // ignore
  }
}

/**
 * Password Reset (Development/Demo Fallback implementation)
 */
export async function resetPasswordDemo(
  emailInput: string,
  newPassword: string
): Promise<boolean> {
  const cleanEmail = (emailInput || '').trim().toLowerCase();
  if (!cleanEmail || !newPassword || newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const users = getAllUsers();
  const userIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (userIndex === -1) {
    throw new Error('No account found with this email address.');
  }

  const newSalt = generateSalt();
  const newHash = await hashPassword(newPassword, newSalt);

  users[userIndex].passwordHash = newHash;
  users[userIndex].salt = newSalt;
  users[userIndex].updatedAt = new Date().toISOString();

  saveAllUsers(users);
  return true;
}

/**
 * Update user profile
 */
export function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserAccount, 'fullName' | 'targetRole' | 'institution'>>
): UserAccount {
  const users = getAllUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found.');
  }

  const updated: UserAccount = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  users[userIndex] = updated;
  saveAllUsers(users);

  // Update session name if changed
  const session = getCurrentSession();
  if (session && session.userId === userId && updates.fullName) {
    session.fullName = updates.fullName;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  }

  return sanitizeUser(updated);
}

/**
 * Delete User Account & Cascade all private user data
 */
export function deleteUserAccount(userId: string): void {
  const users = getAllUsers();
  const remaining = users.filter((u) => u.id !== userId);
  saveAllUsers(remaining);

  // Cascade delete all scoped localStorage items for this user
  if (typeof window !== 'undefined') {
    try {
      const prefix = `sb_user_${userId}_`;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }

  logoutUser();
}

/**
 * Multi-tenant Scoped Key for User Data Isolation
 */
export function getScopedStorageKey(userId: string, keyName: string): string {
  return `sb_user_${userId}_${keyName}`;
}

/**
 * Strip password hash and salt before exposing user object
 */
function sanitizeUser(user: UserAccount): UserAccount {
  return {
    ...user,
    passwordHash: '***PROTECTED***',
    salt: '***PROTECTED***',
  };
}
