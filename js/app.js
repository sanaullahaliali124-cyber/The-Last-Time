/**
 * Common App Utilities - Sidebar, Topbar, Toasts, Modals, Helpers
 */

function formatDate(dateStr, format = 'DD/MM/YYYY') {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
  if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
  return d.toLocaleDateString();
}

function formatCurrency(amount) {
  const settings = getSettings();
  return `${settings.currency || 'PKR'} ${Number(amount || 0).toLocaleString()}`;
}

function calculateGrade(percentage) {
  const settings = getSettings();
  const grades = settings.grades || [];
  for (const g of grades) {
    if (percentage >= g.min && percentage <= g.max) return g;
  }
  return { grade: 'F', remark: 'Fail' };
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  const id = 'toast-' + Date.now();
  const bg = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : type === 'warning' ? 'bg-warning text-dark' : 'bg-info';
  const html = `
    <div id="${id}" class="toast align-items-center text-white ${bg} border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
  const toastEl = document.getElementById(id);
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function confirmAction(title, message, onConfirm) {
  const modalId = 'confirmModal';
  let modal = document.getElementById(modalId);
  if (!modal) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="${modalId}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="confirmTitle"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="confirmMessage"></div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmBtn">Confirm</button>
            </div>
          </div>
        </div>
      </div>`);
    modal = document.getElementById(modalId);
  }
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  const btn = document.getElementById('confirmBtn');
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', () => {
    bootstrap.Modal.getInstance(modal).hide();
    onConfirm();
  });
  new bootstrap.Modal(modal).show();
}

function exportToCSV(data, filename) {
  if (!data || !data.length) {
    showToast('No data to export', 'warning');
    return;
  }
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => {
    let val = row[h] ?? '';
    if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
      val = `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Exported successfully');
}

function printPage(selector = 'body') {
  window.print();
}

function getClassName(classId) {
  const cls = getById('classes', classId);
  return cls ? cls.name : classId || '-';
}

function getSubjectName(subjectId) {
  const sub = getById('subjects', subjectId);
  return sub ? sub.name : subjectId || '-';
}

function getTeacherName(teacherId) {
  const t = getById('teachers', teacherId);
  return t ? t.name : teacherId || '-';
}

function getStudentName(studentId) {
  const s = getById('students', studentId);
  return s ? s.fullName : studentId || '-';
}

function renderSidebar(activePage = 'dashboard') {
  const user = getCurrentUser();
  if (!user) return;

  const menuItems = [
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard', href: 'dashboard.html', module: 'dashboard' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Students', href: 'students.html', module: 'students', children: [
      { label: 'All Students', href: 'students.html' },
      { label: 'Add Student', href: 'students.html?action=add' }
    ]},
    { id: 'teachers', icon: 'fa-chalkboard-teacher', label: 'Teachers', href: 'teachers.html', module: 'teachers' },
    { id: 'staff', icon: 'fa-users', label: 'Staff', href: 'staff.html', module: 'staff' },
    { id: 'parents', icon: 'fa-user-friends', label: 'Parents', href: 'parents.html', module: 'parents' },
    { id: 'classes', icon: 'fa-school', label: 'Classes & Sections', href: 'classes.html', module: 'classes' },
    { id: 'subjects', icon: 'fa-book', label: 'Subjects', href: 'subjects.html', module: 'subjects' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance', href: 'attendance.html', module: 'attendance' },
    { id: 'timetable', icon: 'fa-calendar-alt', label: 'Timetable', href: 'timetable.html', module: 'timetable' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework', href: 'homework.html', module: 'homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Results', href: 'exams.html', module: 'exams' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees', href: 'fees.html', module: 'fees' },
    { id: 'admissions', icon: 'fa-user-plus', label: 'Admissions', href: 'admissions.html', module: 'admissions' },
    { id: 'leaves', icon: 'fa-calendar-minus', label: 'Leave Management', href: 'leaves.html', module: 'leaves' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices', href: 'notices.html', module: 'notices' },
    { id: 'notifications', icon: 'fa-bell', label: 'Notifications', href: 'notifications.html', module: 'notifications' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports', href: 'reports.html', module: 'reports' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings', href: 'settings.html', module: 'settings' }
  ];

  let html = `
    <div class="sidebar-header">
      <div class="school-logo">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="school-info">
        <h6 class="mb-0">Smart Modern Public</h6>
        <small>School Qamber</small>
      </div>
      <button class="btn-close-sidebar d-lg-none" onclick="toggleSidebar()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="sidebar-user">
      <div class="avatar">${(user.name || 'U').charAt(0).toUpperCase()}</div>
      <div>
        <div class="user-name">${user.name || user.username}</div>
        <div class="user-role">${getRoleLabel(user.role)}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav flex-column">`;

  menuItems.forEach(item => {
    if (!hasPermission(item.module, 'view')) return;
    const isActive = activePage === item.id ? 'active' : '';
    html += `
      <li class="nav-item">
        <a class="nav-link ${isActive}" href="${item.href}">
          <i class="fas ${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      </li>`;
  });

  html += `
      </ul>
    </nav>
    <div class="sidebar-footer">
      <a href="#" onclick="logout(); return false;" class="nav-link text-danger">
        <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
      </a>
    </div>`;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;
}

function renderTopbar(pageTitle = 'Dashboard') {
  const user = getCurrentUser();
  const notifications = getData('notifications').filter(n => !n.read).slice(0, 5);
  const unreadCount = getData('notifications').filter(n => !n.read).length;

  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  topbar.innerHTML = `
    <div class="topbar-left">
      <button class="btn btn-link sidebar-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
      </button>
      <div class="page-title">
        <h4 class="mb-0">${pageTitle}</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
            <li class="breadcrumb-item active">${pageTitle}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="topbar-right">
      <div class="search-box d-none d-md-block">
        <i class="fas fa-search"></i>
        <input type="text" id="globalSearch" placeholder="Search students, teachers..." onkeyup="handleGlobalSearch(event)">
      </div>
      <div class="dropdown notification-dropdown">
        <button class="btn btn-link position-relative" data-bs-toggle="dropdown">
          <i class="fas fa-bell"></i>
          ${unreadCount > 0 ? `<span class="badge bg-danger">${unreadCount > 9 ? '9+' : unreadCount}</span>` : ''}
        </button>
        <ul class="dropdown-menu dropdown-menu-end notification-menu">
          <li class="dropdown-header">Notifications</li>
          ${notifications.length ? notifications.map(n => `
            <li><a class="dropdown-item" href="notifications.html">
              <strong>${n.title}</strong><br>
              <small class="text-muted">${n.message}</small>
            </a></li>`).join('') : '<li><span class="dropdown-item text-muted">No new notifications</span></li>'}
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-center" href="notifications.html">View All</a></li>
        </ul>
      </div>
      <div class="dropdown user-dropdown">
        <button class="btn btn-link d-flex align-items-center" data-bs-toggle="dropdown">
          <div class="avatar-sm">${(user?.name || 'U').charAt(0)}</div>
          <span class="d-none d-md-inline ms-2">${user?.name || 'User'}</span>
          <i class="fas fa-chevron-down ms-1"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="settings.html"><i class="fas fa-user me-2"></i>Profile</a></li>
          <li><a class="dropdown-item" href="settings.html"><i class="fas fa-cog me-2"></i>Settings</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="logout(); return false;"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
        </ul>
      </div>
    </div>`;
}

function toggleSidebar() {
  document.body.classList.toggle('sidebar-open');
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('show');
}

function handleGlobalSearch(e) {
  if (e.key === 'Enter') {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    // Simple search across students
    const students = getData('students').filter(s =>
      s.fullName.toLowerCase().includes(q) ||
      s.admissionNo.toLowerCase().includes(q) ||
      (s.rollNo + '').includes(q)
    );
    if (students.length === 1) {
      window.location.href = `student-profile.html?id=${students[0].id}`;
    } else if (students.length > 0) {
      window.location.href = `students.html?search=${encodeURIComponent(q)}`;
    } else {
      showToast('No results found', 'warning');
    }
  }
}

function initLayout(pageTitle, activePage) {
  if (!requireAuth()) return;
  renderSidebar(activePage);
  renderTopbar(pageTitle);
  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
      if (!e.target.closest('#sidebar') && !e.target.closest('.sidebar-toggle')) {
        toggleSidebar();
      }
    }
  });
}

// Validation helpers
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(\+92|0)?[0-9]{10}$/.test(phone.replace(/[\s-]/g, ''));
}

function sanitize(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
