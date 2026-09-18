/**
 * Authentication & Role-Based Access Control
 * DEMO ONLY - Passwords stored in plain text for demo purposes.
 * In production: use proper hashing (bcrypt/argon2) on server + JWT/sessions.
 */

const ROLE_PERMISSIONS = {
  admin: {
    dashboard: 'full', students: 'full', teachers: 'full', staff: 'full', parents: 'full',
    classes: 'full', subjects: 'full', attendance: 'full', timetable: 'full', homework: 'full',
    exams: 'full', results: 'full', fees: 'full', admissions: 'full', leaves: 'full',
    notices: 'full', notifications: 'full', reports: 'full', settings: 'full', users: 'full'
  },
  principal: {
    dashboard: 'full', students: 'full', teachers: 'full', staff: 'full', parents: 'full',
    classes: 'full', subjects: 'full', attendance: 'full', timetable: 'full', homework: 'full',
    exams: 'full', results: 'full', fees: 'view', admissions: 'full', leaves: 'full',
    notices: 'full', notifications: 'full', reports: 'full', settings: 'limited', users: 'view'
  },
  teacher: {
    dashboard: 'limited', students: 'assigned', teachers: 'view', staff: 'none', parents: 'view',
    classes: 'view', subjects: 'view', attendance: 'manage', timetable: 'view', homework: 'manage',
    exams: 'manage', results: 'manage', fees: 'view', admissions: 'none', leaves: 'limited',
    notices: 'view', notifications: 'view', reports: 'limited', settings: 'none', users: 'none'
  },
  accountant: {
    dashboard: 'limited', students: 'view', teachers: 'view', staff: 'view', parents: 'view',
    classes: 'view', subjects: 'none', attendance: 'view', timetable: 'none', homework: 'none',
    exams: 'view', results: 'view', fees: 'full', admissions: 'view', leaves: 'none',
    notices: 'view', notifications: 'view', reports: 'fee', settings: 'none', users: 'none'
  },
  staff: {
    dashboard: 'limited', students: 'view', teachers: 'limited', staff: 'view', parents: 'view',
    classes: 'view', subjects: 'none', attendance: 'view', timetable: 'none', homework: 'none',
    exams: 'view', results: 'view', fees: 'limited', admissions: 'view', leaves: 'limited',
    notices: 'view', notifications: 'view', reports: 'limited', settings: 'none', users: 'none'
  }
};

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    const safe = { ...user };
    delete safe.password; // never keep password in session
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(safe));
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

function login(username, password, remember = false) {
  const users = getData('users');
  const user = users.find(u =>
    (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()) &&
    u.password === password &&
    u.status === 'active'
  );
  if (!user) {
    return { success: false, message: 'Invalid username or password' };
  }
  setCurrentUser(user);
  if (remember) {
    localStorage.setItem('sms_remember', username);
  } else {
    localStorage.removeItem('sms_remember');
  }
  return { success: true, user: { ...user, password: undefined } };
}

function logout() {
  setCurrentUser(null);
  window.location.href = 'login.html';
}

function isAuthenticated() {
  return !!getCurrentUser();
}

function hasPermission(module, action = 'view') {
  const user = getCurrentUser();
  if (!user) return false;
  const perms = ROLE_PERMISSIONS[user.role] || {};
  const level = perms[module] || 'none';
  if (level === 'full' || level === 'manage') return true;
  if (level === 'view' && (action === 'view' || action === 'read')) return true;
  if (level === 'limited' && action === 'view') return true;
  if (level === 'assigned' && action === 'view') return true;
  if (level === 'fee' && module === 'reports') return true;
  return false;
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function requirePermission(module, action = 'view') {
  if (!requireAuth()) return false;
  if (!hasPermission(module, action)) {
    showToast('You do not have permission to access this section.', 'error');
    return false;
  }
  return true;
}

function getRoleLabel(role) {
  const labels = {
    admin: 'Administrator',
    principal: 'Principal',
    teacher: 'Teacher',
    accountant: 'Accountant',
    staff: 'Staff'
  };
  return labels[role] || role;
}

// Demo credentials helper
function getDemoAccounts() {
  return [
    { role: 'Admin', username: 'admin', password: 'admin123' },
    { role: 'Principal', username: 'principal', password: 'principal123' },
    { role: 'Teacher', username: 'teacher1', password: 'teacher123' },
    { role: 'Accountant', username: 'accountant', password: 'account123' },
    { role: 'Staff', username: 'staff1', password: 'staff123' }
  ];
}
