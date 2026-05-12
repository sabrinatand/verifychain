// ── useAuth.js — drop in src/hooks/useAuth.js ──
// Simple localStorage auth hook shared by Login + Register

const USERS_KEY = "vc_users";
const SESSION_KEY = "vc_session";

export function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
    orgName: user.orgName || null,
  }));
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}