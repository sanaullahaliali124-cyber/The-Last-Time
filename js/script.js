/**
 * THE SMART MODERN PUBLIC SCHOOL - Complete School Management System
 * HTML5 + CSS3 + Vanilla JS + Bootstrap 5 + Chart.js + LocalStorage
 * Structured for easy backend (Firebase/Supabase/MySQL) integration later.
 */

const APP = {
  name: 'THE SMART MODERN PUBLIC SCHOOL QAMBER',
  version: '1.0.0',
  storageKey: 'smps_qamber_v2',
  sessionKey: 'smps_qamber_session',
  sessionTimeout: 8 * 60 * 60 * 1000,
};

// ===================== DATA LAYER =====================
const DB = {
  get() {
    try {
      const raw = localStorage.getItem(APP.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },
  save(data) {
    localStorage.setItem(APP.storageKey, JSON.stringify(data));
  },
  init() {
    let data = this.get();
    if (!data) {
      data = this.seed();
      this.save(data);
    }
    return data;
  },
  seed() {
    const now = new Date().toISOString();
    return {
      settings: {
        schoolName: 'THE SMART MODERN PUBLIC SCHOOL QAMBER',
        address: 'Main Road, Qamber Sharif, District Qamber Shahdadkot, Sindh',
        phone: '+92-74-1234567',
        whatsapp: '923001234567',
        email: 'info@smartmodernqamber.edu.pk',
        website: 'www.smartmodernqamber.edu.pk',
        principal: 'Dr. Ayesha Khan',
        session: '2025-2026',
        currency: 'PKR',
        dateFormat: 'DD/MM/YYYY',
        logo: null,
        registrationNo: 'SE-QBR-2018-042',
      },
      users: [
        { id: 'u1', username: 'admin', email: 'admin@school.edu', password: 'admin123', role: 'admin', name: 'System Administrator', phone: '03001234567', status: 'active', createdAt: now },
        { id: 'u_prin', username: 'principal', email: 'principal@school.edu', password: 'prin123', role: 'principal', name: 'Dr. Ayesha Khan', phone: '03009876543', status: 'active', createdAt: now },
        { id: 'u_acc', username: 'accountant', email: 'accounts@school.edu', password: 'acc123', role: 'accountant', name: 'Kamran Iqbal', phone: '03101112222', status: 'active', createdAt: now },
        { id: 'u2', username: 'teacher1', email: 'ali@school.edu', password: 'teacher123', role: 'teacher', name: 'Ali Raza', phone: '03011112222', teacherId: 't1', status: 'active', createdAt: now },
        { id: 'u3', username: 'STU001', email: 'sara@student.edu', password: '1234', role: 'student', name: 'Sara Ahmed', phone: '03022223333', studentId: 's1', status: 'active', createdAt: now },
        { id: 'u4', username: 'parent1', email: 'parent@mail.com', password: 'parent123', role: 'parent', name: 'Mr. Ahmed', phone: '03033334444', parentId: 'p1', status: 'active', createdAt: now },
      ],
      students: [
        { id: 's1', admissionNo: 'ADM-2025-001', regNo: 'REG-001', rollNo: '01', name: 'Sara Ahmed', dob: '2012-05-15', gender: 'Female', bloodGroup: 'B+', phone: '03022223333', email: 'sara@student.edu', address: 'House 12, Street 5, Lahore', classId: 'c1', sectionId: 'sec1', session: '2025-2026', status: 'active', admissionDate: '2025-03-01', previousSchool: 'City Primary School', photo: null, parentId: 'p1', emergencyContact: '03033334444', createdAt: now },
        { id: 's2', admissionNo: 'ADM-2025-002', regNo: 'REG-002', rollNo: '02', name: 'Hassan Ali', dob: '2011-08-22', gender: 'Male', bloodGroup: 'A+', phone: '03044445555', email: 'hassan@student.edu', address: 'Flat 3, Model Town', classId: 'c1', sectionId: 'sec1', session: '2025-2026', status: 'active', admissionDate: '2025-03-05', previousSchool: '', photo: null, parentId: 'p2', emergencyContact: '03055556666', createdAt: now },
        { id: 's3', admissionNo: 'ADM-2025-003', regNo: 'REG-003', rollNo: '01', name: 'Fatima Noor', dob: '2010-11-10', gender: 'Female', bloodGroup: 'O+', phone: '03066667777', email: 'fatima@student.edu', address: 'Canal Road, Faisalabad', classId: 'c2', sectionId: 'sec3', session: '2025-2026', status: 'active', admissionDate: '2025-03-10', previousSchool: 'Beacon Light', photo: null, parentId: 'p3', emergencyContact: '03077778888', createdAt: now },
      ],
      teachers: [
        { id: 't1', teacherId: 'TCH-001', name: 'Ali Raza', qualification: 'M.Sc Mathematics', subjects: ['sub1'], classes: ['c1', 'c2'], phone: '03011112222', email: 'ali@school.edu', address: 'Johar Town, Lahore', joiningDate: '2020-08-15', salary: 65000, status: 'active', gender: 'Male', dob: '1985-03-12', createdAt: now },
        { id: 't2', teacherId: 'TCH-002', name: 'Sana Malik', qualification: 'M.A English', subjects: ['sub2'], classes: ['c1'], phone: '03088889999', email: 'sana@school.edu', address: 'Gulberg, Lahore', joiningDate: '2019-04-01', salary: 60000, status: 'active', gender: 'Female', dob: '1988-07-20', createdAt: now },
        { id: 't3', teacherId: 'TCH-003', name: 'Imran Shah', qualification: 'M.Sc Physics', subjects: ['sub3'], classes: ['c2'], phone: '03099990000', email: 'imran@school.edu', address: 'DHA Phase 5', joiningDate: '2021-01-10', salary: 70000, status: 'active', gender: 'Male', dob: '1982-12-05', createdAt: now },
      ],
      staff: [
        { id: 'st1', staffId: 'STF-001', name: 'Kamran Iqbal', department: 'Accounts', position: 'Accountant', phone: '03101112222', email: 'kamran@school.edu', salary: 45000, joiningDate: '2018-06-01', status: 'active', createdAt: now },
        { id: 'st2', staffId: 'STF-002', name: 'Nabeel Khan', department: 'Library', position: 'Librarian', phone: '03102223333', email: 'nabeel@school.edu', salary: 35000, joiningDate: '2019-09-15', status: 'active', createdAt: now },
        { id: 'st3', staffId: 'STF-003', name: 'Asif Driver', department: 'Transport', position: 'Driver', phone: '03103334444', email: '', salary: 25000, joiningDate: '2020-02-01', status: 'active', createdAt: now },
      ],
      parents: [
        { id: 'p1', name: 'Mr. Ahmed', phone: '03033334444', email: 'parent@mail.com', address: 'House 12, Street 5, Lahore', relation: 'Father', students: ['s1'], createdAt: now },
        { id: 'p2', name: 'Mrs. Fatima Ali', phone: '03055556666', email: 'fatima.p@mail.com', address: 'Flat 3, Model Town', relation: 'Mother', students: ['s2'], createdAt: now },
        { id: 'p3', name: 'Mr. Tariq Noor', phone: '03077778888', email: 'tariq@mail.com', address: 'Canal Road, Faisalabad', relation: 'Father', students: ['s3'], createdAt: now },
      ],
      classes: [
        { id: 'c1', name: 'Class 6', sections: ['sec1', 'sec2'], classTeacher: 't1', session: '2025-2026' },
        { id: 'c2', name: 'Class 7', sections: ['sec3'], classTeacher: 't3', session: '2025-2026' },
        { id: 'c3', name: 'Class 8', sections: ['sec4'], classTeacher: 't2', session: '2025-2026' },
      ],
      sections: [
        { id: 'sec1', name: 'A', classId: 'c1' },
        { id: 'sec2', name: 'B', classId: 'c1' },
        { id: 'sec3', name: 'A', classId: 'c2' },
        { id: 'sec4', name: 'A', classId: 'c3' },
      ],
      subjects: [
        { id: 'sub1', name: 'Mathematics', code: 'MATH', classId: 'c1', teacherId: 't1', type: 'Theory' },
        { id: 'sub2', name: 'English', code: 'ENG', classId: 'c1', teacherId: 't2', type: 'Theory' },
        { id: 'sub3', name: 'Physics', code: 'PHY', classId: 'c2', teacherId: 't3', type: 'Theory' },
        { id: 'sub4', name: 'Science', code: 'SCI', classId: 'c1', teacherId: 't3', type: 'Practical' },
      ],
      attendance: [],
      fees: {
        structures: [
          { id: 'fs1', name: 'Monthly Fee - Class 6', classId: 'c1', amount: 5000, type: 'Monthly', session: '2025-2026' },
          { id: 'fs2', name: 'Monthly Fee - Class 7', classId: 'c2', amount: 5500, type: 'Monthly', session: '2025-2026' },
          { id: 'fs3', name: 'Admission Fee', classId: null, amount: 15000, type: 'Admission', session: '2025-2026' },
          { id: 'fs4', name: 'Exam Fee', classId: null, amount: 2000, type: 'Exam', session: '2025-2026' },
        ],
        payments: [
          { id: 'fp1', studentId: 's1', amount: 5000, type: 'Monthly', month: '2025-09', status: 'paid', date: '2025-09-05', receiptNo: 'RCP-001', method: 'Cash', discount: 0, fine: 0 },
          { id: 'fp2', studentId: 's2', amount: 5000, type: 'Monthly', month: '2025-09', status: 'paid', date: '2025-09-08', receiptNo: 'RCP-002', method: 'Bank', discount: 0, fine: 0 },
          { id: 'fp3', studentId: 's3', amount: 5500, type: 'Monthly', month: '2025-09', status: 'pending', date: null, receiptNo: null, method: null, discount: 0, fine: 0 },
        ],
      },
      exams: [
        { id: 'e1', name: 'Mid Term Examination', type: 'Mid Term', startDate: '2025-10-15', endDate: '2025-10-25', classes: ['c1', 'c2'], status: 'upcoming' },
      ],
      marks: [],
      homework: [
        { id: 'hw1', title: 'Algebra Chapter 3 Exercises', description: 'Complete exercises 1-15 from page 45', classId: 'c1', subjectId: 'sub1', teacherId: 't1', dueDate: '2025-09-25', status: 'active', createdAt: now },
        { id: 'hw2', title: 'Essay Writing - My School', description: 'Write a 300 word essay', classId: 'c1', subjectId: 'sub2', teacherId: 't2', dueDate: '2025-09-22', status: 'active', createdAt: now },
      ],
      timetable: [
        { id: 'tt1', classId: 'c1', sectionId: 'sec1', day: 'Monday', period: 1, subjectId: 'sub1', teacherId: 't1', startTime: '08:00', endTime: '08:45', room: 'R-101' },
        { id: 'tt2', classId: 'c1', sectionId: 'sec1', day: 'Monday', period: 2, subjectId: 'sub2', teacherId: 't2', startTime: '08:45', endTime: '09:30', room: 'R-101' },
        { id: 'tt3', classId: 'c1', sectionId: 'sec1', day: 'Tuesday', period: 1, subjectId: 'sub4', teacherId: 't3', startTime: '08:00', endTime: '08:45', room: 'Lab-1' },
      ],
      notices: [
        { id: 'n1', title: 'Parent-Teacher Meeting', description: 'PTM will be held on 28th September 2025 from 10 AM to 1 PM.', date: '2025-09-15', audience: 'Everyone', published: true, createdAt: now },
        { id: 'n2', title: 'Sports Day Announcement', description: 'Annual Sports Day on 15th October. All students must participate.', date: '2025-09-18', audience: 'Students', published: true, createdAt: now },
      ],
      events: [
        { id: 'ev1', title: 'Independence Day Celebration', date: '2025-08-14', time: '09:00', location: 'School Ground', description: 'Flag hoisting and cultural program', image: null },
        { id: 'ev2', title: 'Science Fair', date: '2025-10-05', time: '10:00', location: 'Main Hall', description: 'Students showcase science projects', image: null },
      ],
      library: {
        books: [
          { id: 'b1', title: 'Introduction to Algebra', author: 'R.D. Sharma', isbn: '978-123456', category: 'Mathematics', publisher: 'Dhanpat Rai', quantity: 10, available: 8 },
          { id: 'b2', title: 'English Grammar', author: 'Wren & Martin', isbn: '978-654321', category: 'English', publisher: 'S. Chand', quantity: 15, available: 12 },
        ],
        issues: [],
      },
      transport: {
        vehicles: [
          { id: 'v1', number: 'LHR-1234', driver: 'Asif Driver', driverPhone: '03103334444', route: 'Route A - Model Town', capacity: 30, status: 'active' },
        ],
        routes: [
          { id: 'r1', name: 'Route A - Model Town', stops: ['Stop 1', 'Stop 2', 'Stop 3'], vehicleId: 'v1', fee: 2500 },
        ],
      },
      hostel: { enabled: true, rooms: [{ id: 'hr1', number: 'H-101', capacity: 4, occupied: 0, type: 'Boys' }] },
      leaves: [],
      accounting: {
        transactions: [
          { id: 'ac1', type: 'income', category: 'Fee Collection', amount: 10000, date: '2025-09-05', description: 'Monthly fees', ref: 'RCP-001' },
          { id: 'ac2', type: 'expense', category: 'Salary', amount: 195000, date: '2025-09-01', description: 'Staff salaries September', ref: 'SAL-SEP' },
          { id: 'ac3', type: 'expense', category: 'Utility', amount: 25000, date: '2025-09-10', description: 'Electricity bill', ref: 'UTL-001' },
        ],
      },
      payroll: [],
      messages: [],
      documents: [],
      certificates: [],
      admissions: [
        { id: 'ad1', studentName: 'Zainab Khan', dob: '2013-01-20', gender: 'Female', classId: 'c1', parentName: 'Mr. Khan', phone: '03112223333', status: 'pending', date: '2025-09-10', admissionNo: null },
      ],
      audit: [],
      notifications: [
        { id: 'nf1', title: 'New Admission Request', message: 'Zainab Khan applied for Class 6', type: 'admission', read: false, date: now },
        { id: 'nf2', title: 'Fee Pending', message: 'Fatima Noor has pending monthly fee', type: 'fee', read: false, date: now },
      ],
      roles: {
        admin: { modules: ['*'] },
        principal: { modules: ['dashboard', 'students', 'teachers', 'staff', 'parents', 'classes', 'subjects', 'attendance', 'timetable', 'homework', 'exams', 'fees', 'admissions', 'leave', 'notices', 'events', 'reports', 'settings', 'profile'] },
        teacher: { modules: ['dashboard', 'attendance', 'homework', 'exams', 'marks', 'students', 'timetable', 'notices', 'leave', 'profile'] },
        accountant: { modules: ['dashboard', 'fees', 'accounting', 'payroll', 'reports', 'students', 'profile'] },
        student: { modules: ['dashboard', 'attendance', 'timetable', 'homework', 'exams', 'results', 'fees', 'notices', 'events', 'profile'] },
        parent: { modules: ['dashboard', 'children', 'attendance', 'homework', 'results', 'fees', 'notices', 'events', 'profile'] },
      },
    };
  },
};

// ===================== UTILITIES =====================
const Utils = {
  uid(prefix = 'id') {
    return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },
  formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  },
  formatCurrency(n) {
    return 'PKR ' + Number(n || 0).toLocaleString('en-PK');
  },
  today() {
    return new Date().toISOString().slice(0, 10);
  },
  toast(title, body) {
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastBody').textContent = body;
    bootstrap.Toast.getOrCreateInstance(document.getElementById('appToast')).show();
  },
  confirm(msg) {
    return window.confirm(msg);
  },
  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  },
  waLink(num, text) {
    const n = String(num || '').replace(/\\D/g, '');
    const phone = n.startsWith('92') ? n : (n.startsWith('0') ? '92' + n.slice(1) : '92' + n);
    return 'https://wa.me/' + phone + (text ? '?text=' + encodeURIComponent(text) : '');
  },
  downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  },
  printElement(html, title = 'Print') {
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>body{padding:20px;font-family:Inter,sans-serif}</style></head>
      <body>${html}<script>window.onload=()=>window.print()<\/script></body></html>`);
    w.document.close();
  },
  grade(pct) {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B';
    if (pct >= 60) return 'C';
    if (pct >= 50) return 'D';
    return 'F';
  },
};

// ===================== AUTH =====================
const Auth = {
  current: null,
  loginAttempts: {},

  getSession() {
    try {
      const s = JSON.parse(sessionStorage.getItem(APP.sessionKey) || localStorage.getItem(APP.sessionKey));
      if (!s) return null;
      if (Date.now() - s.loginAt > APP.sessionTimeout) {
        this.logout();
        return null;
      }
      return s;
    } catch { return null; }
  },

  setSession(user, remember) {
    const session = { userId: user.id, role: user.role, name: user.name, username: user.username, loginAt: Date.now() };
    (remember ? localStorage : sessionStorage).setItem(APP.sessionKey, JSON.stringify(session));
    if (!remember) localStorage.removeItem(APP.sessionKey);
    this.current = session;
    this.audit('login', 'Auth', `User ${user.username} logged in`);
  },

  logout() {
    if (this.current) this.audit('logout', 'Auth', `User ${this.current.username} logged out`);
    sessionStorage.removeItem(APP.sessionKey);
    localStorage.removeItem(APP.sessionKey);
    this.current = null;
    showLogin();
  },

  canAccess(module) {
    if (!this.current) return false;
    const perms = data.roles[this.current.role];
    if (!perms) return false;
    return perms.modules.includes('*') || perms.modules.includes(module);
  },

  audit(action, module, detail) {
    data.audit.unshift({
      id: Utils.uid('aud'),
      user: this.current?.username || 'system',
      role: this.current?.role || 'system',
      action, module, detail,
      date: new Date().toISOString(),
    });
    if (data.audit.length > 500) data.audit = data.audit.slice(0, 500);
    DB.save(data);
  },

  attemptLogin(username, password, role) {
    const key = username.toLowerCase();
    if ((this.loginAttempts[key] || 0) >= 5) return { ok: false, msg: 'Too many attempts. Try later.' };
    const user = data.users.find(
      (u) =>
        (u.username.toLowerCase() === key || u.email?.toLowerCase() === key || u.phone === username) &&
        u.password === password &&
        u.role === role &&
        u.status === 'active'
    );
    if (!user) {
      this.loginAttempts[key] = (this.loginAttempts[key] || 0) + 1;
      return { ok: false, msg: 'Invalid credentials or role mismatch.' };
    }
    this.loginAttempts[key] = 0;
    return { ok: true, user };
  },

  changePassword(userId, oldPass, newPass) {
    const user = data.users.find((u) => u.id === userId);
    if (!user || user.password !== oldPass) return false;
    user.password = newPass;
    DB.save(data);
    this.audit('password_change', 'Auth', `Password changed for ${user.username}`);
    return true;
  },
};

// ===================== STATE =====================
let data = null;
let charts = {};
let currentPage = 'dashboard';
let modalInstance = null;

// ===================== MENUS =====================
const MENUS = {
  admin: [
    { section: 'Main' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Students' },
    { id: 'admissions', icon: 'fa-file-signature', label: 'Admissions' },
    { id: 'teachers', icon: 'fa-chalkboard-teacher', label: 'Teachers' },
    { id: 'staff', icon: 'fa-users-cog', label: 'Staff' },
    { id: 'parents', icon: 'fa-user-friends', label: 'Parents' },
    { section: 'Academics' },
    { id: 'classes', icon: 'fa-school', label: 'Classes & Sections' },
    { id: 'subjects', icon: 'fa-book', label: 'Subjects' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance' },
    { id: 'timetable', icon: 'fa-clock', label: 'Timetable' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Results' },
    { section: 'Finance' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees' },
    { id: 'accounting', icon: 'fa-calculator', label: 'Accounting' },
    { id: 'payroll', icon: 'fa-wallet', label: 'Payroll' },
    { section: 'Operations' },
    { id: 'library', icon: 'fa-book-open', label: 'Library' },
    { id: 'transport', icon: 'fa-bus', label: 'Transport' },
    { id: 'hostel', icon: 'fa-bed', label: 'Hostel' },
    { id: 'leave', icon: 'fa-calendar-minus', label: 'Leave' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
    { id: 'events', icon: 'fa-calendar-day', label: 'Events' },
    { id: 'messages', icon: 'fa-envelope', label: 'Messages' },
    { id: 'documents', icon: 'fa-folder', label: 'Documents' },
    { id: 'certificates', icon: 'fa-certificate', label: 'Certificates' },
    { section: 'System' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
    { id: 'users', icon: 'fa-user-shield', label: 'Users & Roles' },
    { id: 'audit', icon: 'fa-history', label: 'Audit Logs' },
    { id: 'backup', icon: 'fa-database', label: 'Backup & Restore' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ],
    principal: [
    { section: 'Main' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Students' },
    { id: 'teachers', icon: 'fa-chalkboard-teacher', label: 'Teachers' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Results' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ],
  accountant: [
    { section: 'Finance' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees' },
    { id: 'accounting', icon: 'fa-calculator', label: 'Accounting' },
    { id: 'payroll', icon: 'fa-wallet', label: 'Payroll' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Students' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
  ],
teacher: [
    { section: 'Main' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'students', icon: 'fa-user-graduate', label: 'My Students' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance' },
    { id: 'timetable', icon: 'fa-clock', label: 'Timetable' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Marks' },
    { id: 'leave', icon: 'fa-calendar-minus', label: 'Leave' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
  ],
  student: [
    { section: 'Main' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'profile', icon: 'fa-user', label: 'My Profile' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance' },
    { id: 'timetable', icon: 'fa-clock', label: 'Timetable' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Results' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
    { id: 'events', icon: 'fa-calendar-day', label: 'Events' },
  ],
  parent: [
    { section: 'Main' },
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { id: 'children', icon: 'fa-child', label: 'My Children' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Results' },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
    { id: 'events', icon: 'fa-calendar-day', label: 'Events' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
  ],
};

function buildSidebar() {
  const menu = MENUS[Auth.current.role] || MENUS.admin;
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = menu.map((item) => {
    if (item.section) return `<div class="nav-section">${item.section}</div>`;
    return `<a href="#" data-page="${item.id}" class="${currentPage === item.id ? 'active' : ''}"><i class="fas ${item.icon}"></i><span>${item.label}</span></a>`;
  }).join('');
  nav.querySelectorAll('a[data-page]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.dataset.page);
      if (window.innerWidth < 992) document.getElementById('sidebar').classList.remove('show');
    });
  });
}

function navigate(page) {
  if (!Auth.canAccess(page) && page !== 'profile' && page !== 'dashboard' && page !== 'children') {
    Utils.toast('Access Denied', 'You do not have permission for this module.');
    return;
  }
  currentPage = page;
  buildSidebar();
  renderPage(page);
}

function renderPage(page) {
  const container = document.getElementById('pageContent');
  Object.values(charts).forEach((c) => c?.destroy?.());
  charts = {};
  const pages = {
    dashboard: renderDashboard, students: renderStudents, admissions: renderAdmissions,
    teachers: renderTeachers, staff: renderStaff, parents: renderParents,
    classes: renderClasses, subjects: renderSubjects, attendance: renderAttendance,
    timetable: renderTimetable, homework: renderHomework, exams: renderExams,
    fees: renderFees, accounting: renderAccounting, payroll: renderPayroll,
    leave: renderLeave, library: renderLibrary, transport: renderTransport,
    hostel: renderHostel, notices: renderNotices, events: renderEvents,
    messages: renderMessages, documents: renderDocuments, certificates: renderCertificates,
    reports: renderReports, users: renderUsers, audit: renderAudit,
    backup: renderBackup, settings: renderSettings, profile: renderProfile,
    children: renderChildren,
  };
  container.innerHTML = (pages[page] || (() => '<div class="empty-state"><p>Page not found</p></div>'))();
  afterRender(page);
}

function afterRender(page) {
  document.querySelectorAll('[data-action]').forEach((btn) => btn.addEventListener('click', handleAction));
  if (page === 'dashboard') initDashboardCharts();
  if (page === 'fees') initFeeChart();
  if (page === 'attendance') initAttendanceUI();
}

// ===================== DASHBOARD =====================
function presentCount() {
  return data.attendance.filter((a) => a.date === Utils.today() && a.status === 'P').length;
}
function absentCount() {
  return data.attendance.filter((a) => a.date === Utils.today() && a.status === 'A').length;
}

function statCard(label, value, icon, bg, color, trend) {
  return `<div class="col-6 col-md-4 col-xl-3">
    <div class="stat-card">
      <div class="stat-icon" style="background:${bg};color:${color}"><i class="fas ${icon}"></i></div>
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
      ${trend ? `<div class="stat-trend">${trend}</div>` : ''}
    </div>
  </div>`;
}

function quickAction(label, icon, page) {
  return `<div class="col-4 col-md-3 col-lg">
    <div class="quick-action" data-action="navigate" data-page="${page}" role="button" tabindex="0">
      <i class="fas ${icon}"></i><span>${label}</span>
    </div>
  </div>`;
}

function renderDashboard() {
  const role = Auth.current.role;
  if (role === 'student') return renderStudentDashboard();
  if (role === 'teacher') return renderTeacherDashboard();
  if (role === 'parent') return renderParentDashboard();

  const today = Utils.today();
  const totalStudents = data.students.filter((s) => s.status === 'active').length;
  const totalTeachers = data.teachers.filter((t) => t.status === 'active').length;
  const totalStaff = data.staff.filter((s) => s.status === 'active').length;
  const paidFees = data.fees.payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pendingFees = data.fees.payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalFees = paidFees + pendingFees || 1;
  const feePct = Math.round((paidFees / totalFees) * 100);
  const present = presentCount();
  const absent = absentCount();
  const attTotal = present + absent || 1;
  const schoolName = data.settings?.schoolName || 'THE SMART MODERN PUBLIC SCHOOL QAMBER';
  const session = data.settings?.session || '2025-26';

  const recentLogs = (data.audit || []).slice(-6).reverse();

  return `
    <div class="dash-hero">
      <div class="dash-hero-content">
        <h1>Welcome back, ${Utils.sanitize(Auth.current.name)}</h1>
        <p>${Utils.sanitize(schoolName)} · Academic Session ${Utils.sanitize(session)}</p>
        <div class="dash-hero-meta">
          <span><i class="fas fa-calendar-day"></i>${Utils.formatDate(today)}</span>
          <span><i class="fas fa-user-shield"></i>${Utils.sanitize(Auth.current.role)}</span>
          <span><i class="fas fa-map-marker-alt"></i>Qamber</span>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      ${statCard('Students', totalStudents, 'fa-user-graduate', '#e8f0fe', '#1a73e8', 'Active enrolled')}
      ${statCard('Teachers', totalTeachers, 'fa-chalkboard-teacher', '#fef7e0', '#d4a017', 'Faculty')}
      ${statCard('Staff', totalStaff, 'fa-users-cog', '#ecfdf5', '#10b981', 'Non-teaching')}
      ${statCard('Classes', data.classes.length, 'fa-school', '#f3e8ff', '#8b5cf6', 'Running')}
      ${statCard('Present Today', present, 'fa-check-circle', '#d1fae5', '#059669', Math.round((present / attTotal) * 100) + '% attendance')}
      ${statCard('Absent Today', absent, 'fa-times-circle', '#fee2e2', '#dc2626', 'Needs follow-up')}
      ${statCard('Collected Fees', Utils.formatCurrency(paidFees), 'fa-money-bill-wave', '#ecfdf5', '#059669', feePct + '% of total')}
      ${statCard('Pending Fees', Utils.formatCurrency(pendingFees), 'fa-exclamation-triangle', '#fef3c7', '#d97706', 'Outstanding')}
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12">
        <div class="dash-panel">
          <div class="panel-head"><h5><i class="fas fa-bolt me-2 text-warning"></i>Quick Actions</h5></div>
          <div class="panel-body">
            <div class="row g-2">
              ${quickAction('Add Student', 'fa-user-plus', 'students')}
              ${quickAction('Add Teacher', 'fa-chalkboard-teacher', 'teachers')}
              ${quickAction('Attendance', 'fa-calendar-check', 'attendance')}
              ${quickAction('Collect Fee', 'fa-money-bill', 'fees')}
              ${quickAction('Notice', 'fa-bullhorn', 'notices')}
              ${quickAction('Homework', 'fa-tasks', 'homework')}
              ${quickAction('Exam', 'fa-file-alt', 'exams')}
              ${quickAction('Reports', 'fa-chart-bar', 'reports')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-8">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="dash-panel">
              <div class="panel-head"><h5>Student Growth</h5></div>
              <div class="panel-body chart-box"><canvas id="chartStudents"></canvas></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="dash-panel">
              <div class="panel-head"><h5>Fee Collection</h5></div>
              <div class="panel-body chart-box"><canvas id="chartFees"></canvas></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="dash-panel">
              <div class="panel-head"><h5>Class-wise Strength</h5></div>
              <div class="panel-body chart-box"><canvas id="chartClasses"></canvas></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="dash-panel">
              <div class="panel-head"><h5>Weekly Attendance</h5></div>
              <div class="panel-body chart-box"><canvas id="chartAtt"></canvas></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="dash-panel mb-3">
          <div class="panel-head"><h5>Fee Overview</h5></div>
          <div class="panel-body">
            <div class="fee-progress-wrap">
              <div class="fp-label"><span>Collected</span><strong>${Utils.formatCurrency(paidFees)}</strong></div>
              <div class="progress"><div class="progress-bar" style="width:${feePct}%"></div></div>
            </div>
            <div class="fee-progress-wrap">
              <div class="fp-label"><span>Pending</span><strong class="text-warning">${Utils.formatCurrency(pendingFees)}</strong></div>
              <div class="progress"><div class="progress-bar bg-warning" style="width:${100 - feePct}%"></div></div>
            </div>
            <div class="small text-muted mt-2">${feePct}% collection rate this period</div>
          </div>
        </div>
        <div class="dash-panel mb-3">
          <div class="panel-head"><h5>Today Attendance</h5></div>
          <div class="panel-body">
            <div class="att-summary-bar">
              <div class="seg-p" style="width:${(present / attTotal) * 100}%"></div>
              <div class="seg-a" style="width:${(absent / attTotal) * 100}%"></div>
            </div>
            <div class="d-flex justify-content-between small">
              <span class="text-success"><i class="fas fa-check-circle me-1"></i>Present ${present}</span>
              <span class="text-danger"><i class="fas fa-times-circle me-1"></i>Absent ${absent}</span>
            </div>
          </div>
        </div>
        <div class="dash-panel">
          <div class="panel-head"><h5>Recent Activity</h5></div>
          <div class="panel-body">
            ${recentLogs.length ? recentLogs.map((l) => `
              <div class="activity-item">
                <div class="activity-dot"></div>
                <div>
                  <div class="act-text">${Utils.sanitize(l.action || '')} · ${Utils.sanitize(l.module || '')}</div>
                  <div class="act-time">${Utils.sanitize(l.user || '')} · ${Utils.formatDate(l.date || l.time)}</div>
                </div>
              </div>`).join('') : '<p class="text-muted small mb-0">No recent activity</p>'}
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-lg-4">
        <div class="dash-panel">
          <div class="panel-head"><h5>Recent Admissions</h5>
            <button type="button" class="btn btn-sm btn-outline-primary" data-action="navigate" data-page="admissions">View all</button>
          </div>
          <div class="panel-body p-0">
            <div class="table-responsive"><table class="table table-hover mb-0">
              <thead><tr><th>Name</th><th>Class</th><th>Status</th></tr></thead>
              <tbody>${data.admissions.slice(0, 5).map((a) => {
                const cls = data.classes.find((c) => c.id === a.classId);
                return `<tr><td>${Utils.sanitize(a.studentName)}</td><td>${cls?.name || '—'}</td>
                  <td><span class="badge badge-status bg-${a.status === 'approved' ? 'success' : a.status === 'pending' ? 'warning' : 'secondary'}">${a.status}</span></td></tr>`;
              }).join('') || '<tr><td colspan="3" class="text-center text-muted py-3">No admissions</td></tr>'}</tbody>
            </table></div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="dash-panel">
          <div class="panel-head"><h5>Recent Payments</h5>
            <button type="button" class="btn btn-sm btn-outline-primary" data-action="navigate" data-page="fees">View all</button>
          </div>
          <div class="panel-body p-0">
            <div class="table-responsive"><table class="table table-hover mb-0">
              <thead><tr><th>Student</th><th>Amount</th><th>Date</th></tr></thead>
              <tbody>${data.fees.payments.filter((p) => p.status === 'paid').slice(0, 5).map((p) => {
                const st = data.students.find((s) => s.id === p.studentId);
                return `<tr><td>${Utils.sanitize(st?.name || '—')}</td><td>${Utils.formatCurrency(p.amount)}</td><td>${Utils.formatDate(p.date)}</td></tr>`;
              }).join('') || '<tr><td colspan="3" class="text-center text-muted py-3">No payments</td></tr>'}</tbody>
            </table></div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="dash-panel">
          <div class="panel-head"><h5>Notices & Events</h5>
            <button type="button" class="btn btn-sm btn-outline-primary" data-action="navigate" data-page="notices">View all</button>
          </div>
          <div class="panel-body">
            ${data.notices.slice(0, 3).map((n) => `<div class="mb-3 pb-2 border-bottom">
              <div class="fw-semibold">${Utils.sanitize(n.title)}</div>
              <div class="small text-muted">${Utils.formatDate(n.date)}</div>
            </div>`).join('') || '<p class="text-muted small">No notices</p>'}
            ${data.events.slice(0, 2).map((e) => `<div class="mb-2">
              <div class="fw-semibold text-primary"><i class="fas fa-calendar-alt me-1"></i>${Utils.sanitize(e.title)}</div>
              <div class="small text-muted">${Utils.formatDate(e.date)} · ${Utils.sanitize(e.location || '')}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function initDashboardCharts() {
  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } }, beginAtZero: true },
    },
  };
  const classCounts = data.classes.map((c) => ({
    name: c.name,
    count: data.students.filter((s) => s.classId === c.id && s.status === 'active').length,
  }));
  const studentEl = document.getElementById('chartStudents');
  if (!studentEl) return;

  charts.students = new Chart(studentEl, {
    type: 'line',
    data: {
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Students',
        data: [Math.max(1, data.students.length - 5), Math.max(1, data.students.length - 4), Math.max(2, data.students.length - 3), Math.max(2, data.students.length - 2), Math.max(3, data.students.length - 1), data.students.length],
        borderColor: '#1a73e8',
        backgroundColor: 'rgba(26,115,232,0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#1a73e8',
      }],
    },
    options: chartOpts,
  });

  const feeByMonth = {};
  data.fees.payments.filter((p) => p.status === 'paid').forEach((p) => {
    const m = (p.month || p.date || '').slice(0, 7);
    if (m) feeByMonth[m] = (feeByMonth[m] || 0) + p.amount;
  });
  const feeLabels = Object.keys(feeByMonth).length ? Object.keys(feeByMonth) : ['2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09'];
  const feeVals = Object.values(feeByMonth).length ? Object.values(feeByMonth) : [8000, 9500, 11000, 10500, 12000, 10000];

  charts.fees = new Chart(document.getElementById('chartFees'), {
    type: 'bar',
    data: {
      labels: feeLabels,
      datasets: [{
        label: 'Collection',
        data: feeVals,
        backgroundColor: '#d4a017',
        borderRadius: 8,
        maxBarThickness: 36,
      }],
    },
    options: chartOpts,
  });

  const palette = ['#1a73e8', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
  charts.classes = new Chart(document.getElementById('chartClasses'), {
    type: 'doughnut',
    data: {
      labels: classCounts.map((c) => c.name),
      datasets: [{
        data: classCounts.map((c) => c.count),
        backgroundColor: palette.slice(0, classCounts.length),
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 }, padding: 12 } },
      },
      cutout: '58%',
    },
  });

  charts.att = new Chart(document.getElementById('chartAtt'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Present',
          data: [28, 30, 27, 29, presentCount()],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 4,
        },
        {
          label: 'Absent',
          data: [2, 1, 3, 2, absentCount()],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.08)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, beginAtZero: true },
      },
    },
  });
}

function renderStudentDashboard() {
  const user = data.users.find((u) => u.id === Auth.current.userId);
  const st = data.students.find((s) => s.id === user?.studentId);
  if (!st) return '<p>Student profile not linked.</p>';
  const cls = data.classes.find((c) => c.id === st.classId);
  const hw = data.homework.filter((h) => h.classId === st.classId);
  const notices = data.notices.filter((n) => n.published && (n.audience === 'Everyone' || n.audience === 'Students'));
  return `<h1 class="page-title">Welcome, ${Utils.sanitize(st.name)}</h1>
    <p class="page-subtitle">${cls?.name || ''} · Roll ${st.rollNo}</p>
    <div class="row g-3 mb-4">
      ${statCard('Class', cls?.name || '—', 'fa-school', '#e8f0fe', '#1a73e8')}
      ${statCard('Homework', hw.length, 'fa-tasks', '#fef7e0', '#d4a017')}
      ${statCard('Notices', notices.length, 'fa-bullhorn', '#ecfdf5', '#10b981')}
    </div>
    <div class="row g-3">
      <div class="col-md-6"><div class="card-panel"><div class="card-header"><h5>Recent Homework</h5></div>
        <div class="card-body">${hw.map((h) => `<div class="mb-2"><strong>${Utils.sanitize(h.title)}</strong><br><small class="text-muted">Due: ${Utils.formatDate(h.dueDate)}</small></div>`).join('') || '<p class="text-muted">No homework</p>'}</div></div></div>
      <div class="col-md-6"><div class="card-panel"><div class="card-header"><h5>Notices</h5></div>
        <div class="card-body">${notices.map((n) => `<div class="mb-2"><strong>${Utils.sanitize(n.title)}</strong><br><small>${Utils.formatDate(n.date)}</small></div>`).join('') || '<p class="text-muted">No notices</p>'}</div></div></div>
    </div>`;
}

function renderTeacherDashboard() {
  const user = data.users.find((u) => u.id === Auth.current.userId);
  const t = data.teachers.find((x) => x.id === user?.teacherId);
  const myClasses = t ? data.classes.filter((c) => t.classes.includes(c.id)) : [];
  return `<h1 class="page-title">Teacher Dashboard</h1>
    <p class="page-subtitle">Welcome, ${Utils.sanitize(t?.name || Auth.current.name)}</p>
    <div class="row g-3 mb-4">
      ${statCard('My Classes', myClasses.length, 'fa-school', '#e8f0fe', '#1a73e8')}
      ${statCard('Homework', data.homework.filter((h) => h.teacherId === t?.id).length, 'fa-tasks', '#fef7e0', '#d4a017')}
      ${statCard('Students', data.students.filter((s) => t?.classes.includes(s.classId)).length, 'fa-user-graduate', '#ecfdf5', '#10b981')}
    </div>
    <div class="card-panel"><div class="card-header"><h5>Assigned Classes</h5></div>
      <div class="card-body"><ul class="list-group list-group-flush">${myClasses.map((c) => `<li class="list-group-item">${c.name}</li>`).join('') || '<li class="list-group-item text-muted">None</li>'}</ul></div></div>`;
}

function renderParentDashboard() {
  const user = data.users.find((u) => u.id === Auth.current.userId);
  const p = data.parents.find((x) => x.id === user?.parentId);
  const children = p ? data.students.filter((s) => p.students.includes(s.id)) : [];
  return `<h1 class="page-title">Parent Dashboard</h1>
    <p class="page-subtitle">Welcome, ${Utils.sanitize(p?.name || Auth.current.name)}</p>
    <div class="row g-3">${children.map((st) => {
      const cls = data.classes.find((c) => c.id === st.classId);
      return `<div class="col-md-6"><div class="card-panel"><div class="card-body">
        <h5>${Utils.sanitize(st.name)}</h5>
        <p class="mb-1 text-muted">${cls?.name || ''} · Roll ${st.rollNo}</p>
        <p class="mb-0 small">Admission: ${st.admissionNo}</p>
      </div></div></div>`;
    }).join('') || '<p class="text-muted">No children linked</p>'}</div>`;
}

// ===================== STUDENTS =====================
function renderStudents() {
  const role = Auth.current.role;
  let students = data.students;
  if (role === 'teacher') {
    const user = data.users.find((u) => u.id === Auth.current.userId);
    const t = data.teachers.find((x) => x.id === user?.teacherId);
    if (t) students = students.filter((s) => t.classes.includes(s.classId));
  }
  return `
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Student Management</h1><p class="page-subtitle mb-0">${students.length} students</p></div>
      ${role === 'admin' ? `<button class="btn btn-primary" data-action="student-add"><i class="fas fa-plus me-2"></i>New Admission</button>` : ''}
    </div>
    <div class="card-panel">
      <div class="card-header"><div class="d-flex gap-2 flex-wrap">
        <input type="text" class="form-control form-control-sm" style="width:200px" id="studentSearch" placeholder="Search..." />
        <select class="form-select form-select-sm" style="width:140px" id="studentClassFilter">
          <option value="">All Classes</option>
          ${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
        <select class="form-select form-select-sm" style="width:120px" id="studentStatusFilter">
          <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </div></div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-hover" id="studentsTable">
          <thead><tr><th>Adm No</th><th>Name</th><th>Class</th><th>Roll</th><th>Gender</th><th>Phone</th><th>Status</th><th class="no-print">Actions</th></tr></thead>
          <tbody>${students.map((s) => {
            const cls = data.classes.find((c) => c.id === s.classId);
            const sec = data.sections.find((x) => x.id === s.sectionId);
            return `<tr data-id="${s.id}" data-class="${s.classId}" data-status="${s.status}" data-name="${s.name.toLowerCase()}">
              <td>${s.admissionNo}</td>
              <td><a href="#" data-action="student-view" data-id="${s.id}">${Utils.sanitize(s.name)}</a></td>
              <td>${cls?.name || '—'} ${sec ? '-' + sec.name : ''}</td>
              <td>${s.rollNo}</td><td>${s.gender}</td><td>${s.phone || '—'}</td>
              <td><span class="badge badge-status bg-${s.status === 'active' ? 'success' : 'secondary'}">${s.status}</span></td>
              <td class="no-print">
                <button class="btn btn-sm btn-outline-primary btn-sm-icon" data-action="student-view" data-id="${s.id}"><i class="fas fa-eye"></i></button>
                ${role === 'admin' ? `<button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="student-edit" data-id="${s.id}"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="student-delete" data-id="${s.id}"><i class="fas fa-trash"></i></button>` : ''}
              </td></tr>`;
          }).join('') || '<tr><td colspan="8" class="text-center text-muted py-4">No students found</td></tr>'}</tbody>
        </table>
      </div></div>
    </div>`;
}

function studentForm(student = null) {
  const isEdit = !!student;
  return `<div class="modal-header"><h5 class="modal-title">${isEdit ? 'Edit Student' : 'New Student Admission'}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
    <form id="studentForm"><div class="modal-body"><div class="row g-3">
      <div class="col-md-6"><label class="form-label required">Full Name</label><input class="form-control" name="name" value="${student?.name || ''}" required /></div>
      <div class="col-md-3"><label class="form-label required">Gender</label>
        <select class="form-select" name="gender" required>
          <option value="Male" ${student?.gender === 'Male' ? 'selected' : ''}>Male</option>
          <option value="Female" ${student?.gender === 'Female' ? 'selected' : ''}>Female</option>
        </select></div>
      <div class="col-md-3"><label class="form-label required">Date of Birth</label><input type="date" class="form-control" name="dob" value="${student?.dob || ''}" required /></div>
      <div class="col-md-4"><label class="form-label">Blood Group</label>
        <select class="form-select" name="bloodGroup">${['A+','A-','B+','B-','O+','O-','AB+','AB-'].map((b) => `<option ${student?.bloodGroup === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      <div class="col-md-4"><label class="form-label">Phone</label><input class="form-control" name="phone" value="${student?.phone || ''}" /></div>
      <div class="col-md-4"><label class="form-label">Email</label><input type="email" class="form-control" name="email" value="${student?.email || ''}" /></div>
      <div class="col-12"><label class="form-label">Address</label><textarea class="form-control" name="address" rows="2">${student?.address || ''}</textarea></div>
      <div class="col-md-4"><label class="form-label required">Class</label>
        <select class="form-select" name="classId" required>${data.classes.map((c) => `<option value="${c.id}" ${student?.classId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
      <div class="col-md-4"><label class="form-label">Section</label>
        <select class="form-select" name="sectionId">${data.sections.map((s) => `<option value="${s.id}" ${student?.sectionId === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}</select></div>
      <div class="col-md-4"><label class="form-label">Roll Number</label><input class="form-control" name="rollNo" value="${student?.rollNo || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Previous School</label><input class="form-control" name="previousSchool" value="${student?.previousSchool || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Emergency Contact</label><input class="form-control" name="emergencyContact" value="${student?.emergencyContact || ''}" /></div>
    </div></div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Admit Student'}</button>
    </div></form>`;
}

function studentProfile(id) {
  const s = data.students.find((x) => x.id === id);
  if (!s) return '<p>Not found</p>';
  const cls = data.classes.find((c) => c.id === s.classId);
  const sec = data.sections.find((x) => x.id === s.sectionId);
  const parent = data.parents.find((p) => p.id === s.parentId);
  const att = data.attendance.filter((a) => a.studentId === id);
  const present = att.filter((a) => a.status === 'P').length;
  const fees = data.fees.payments.filter((p) => p.studentId === id);
  return `<div class="modal-header"><h5 class="modal-title">Student Profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
    <div class="modal-body">
      <div class="profile-header">
        <div class="profile-photo"><i class="fas fa-user-graduate"></i></div>
        <div><h3 class="mb-1">${Utils.sanitize(s.name)}</h3>
          <p class="mb-0 opacity-75">${s.admissionNo} · ${cls?.name || ''} ${sec ? '-' + sec.name : ''} · Roll ${s.rollNo}</p>
          <span class="badge bg-light text-dark mt-2">${s.status}</span></div>
      </div>
      <ul class="nav nav-tabs nav-tabs-custom mb-3">
        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tabPersonal">Personal</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabParent">Parent</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabAtt">Attendance</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabFees">Fees</button></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" id="tabPersonal"><div class="row g-3">
          <div class="col-md-4"><small class="text-muted">Date of Birth</small><div>${Utils.formatDate(s.dob)}</div></div>
          <div class="col-md-4"><small class="text-muted">Gender</small><div>${s.gender}</div></div>
          <div class="col-md-4"><small class="text-muted">Blood Group</small><div>${s.bloodGroup || '—'}</div></div>
          <div class="col-md-4"><small class="text-muted">Phone</small><div>${s.phone || '—'}</div></div>
          <div class="col-md-4"><small class="text-muted">Email</small><div>${s.email || '—'}</div></div>
          <div class="col-md-4"><small class="text-muted">Admission Date</small><div>${Utils.formatDate(s.admissionDate)}</div></div>
          <div class="col-12"><small class="text-muted">Address</small><div>${Utils.sanitize(s.address || '—')}</div></div>
        </div></div>
        <div class="tab-pane fade" id="tabParent">${parent ? `<div class="row g-3">
          <div class="col-md-6"><small class="text-muted">Name</small><div>${Utils.sanitize(parent.name)}</div></div>
          <div class="col-md-6"><small class="text-muted">Relation</small><div>${parent.relation}</div></div>
          <div class="col-md-6"><small class="text-muted">Phone</small><div>${parent.phone}</div></div>
          <div class="col-md-6"><small class="text-muted">Email</small><div>${parent.email || '—'}</div></div>
        </div>` : '<p class="text-muted">No parent linked</p>'}</div>
        <div class="tab-pane fade" id="tabAtt"><p>Present: ${present} / ${att.length} days recorded</p>
          <table class="table table-sm"><thead><tr><th>Date</th><th>Status</th></tr></thead>
          <tbody>${att.slice(0, 20).map((a) => `<tr><td>${Utils.formatDate(a.date)}</td><td><span class="badge bg-${a.status === 'P' ? 'success' : 'danger'}">${a.status}</span></td></tr>`).join('') || '<tr><td colspan="2">No records</td></tr>'}</tbody></table></div>
        <div class="tab-pane fade" id="tabFees">
          <table class="table table-sm"><thead><tr><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>${fees.map((f) => `<tr><td>${f.type}</td><td>${Utils.formatCurrency(f.amount)}</td><td><span class="badge bg-${f.status === 'paid' ? 'success' : 'warning'}">${f.status}</span></td><td>${Utils.formatDate(f.date)}</td></tr>`).join('') || '<tr><td colspan="4">No fee records</td></tr>'}</tbody></table></div>
      </div>
    </div>
    <div class="modal-footer no-print">
      <button class="btn btn-outline-secondary" data-action="print-student" data-id="${id}"><i class="fas fa-print me-1"></i>Print Profile</button>
      <button class="btn btn-outline-primary" data-action="print-idcard" data-id="${id}"><i class="fas fa-id-card me-1"></i>Print ID Card</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>`;
}

// ===================== TEACHERS / STAFF / CLASSES / SUBJECTS =====================
function renderTeachers() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Teacher Management</h1><p class="page-subtitle mb-0">${data.teachers.length} teachers</p></div>
      <button class="btn btn-primary" data-action="teacher-add"><i class="fas fa-plus me-2"></i>Add Teacher</button>
    </div>
    <div class="card-panel"><div class="card-body p-0"><div class="table-responsive">
      <table class="table table-hover"><thead><tr><th>ID</th><th>Name</th><th>Qualification</th><th>Phone</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${data.teachers.map((t) => `<tr>
          <td>${t.teacherId}</td><td><a href="#" data-action="teacher-view" data-id="${t.id}">${Utils.sanitize(t.name)}</a></td>
          <td>${Utils.sanitize(t.qualification)}</td><td>${t.phone}</td><td>${Utils.formatCurrency(t.salary)}</td>
          <td><span class="badge badge-status bg-${t.status === 'active' ? 'success' : 'secondary'}">${t.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary btn-sm-icon" data-action="teacher-view" data-id="${t.id}"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="teacher-edit" data-id="${t.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="teacher-delete" data-id="${t.id}"><i class="fas fa-trash"></i></button>
          </td></tr>`).join('')}</tbody>
      </table>
    </div></div></div>`;
}

function teacherForm(t = null) {
  return `<div class="modal-header"><h5 class="modal-title">${t ? 'Edit Teacher' : 'Add Teacher'}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
    <form id="teacherForm"><div class="modal-body"><div class="row g-3">
      <div class="col-md-6"><label class="form-label required">Full Name</label><input class="form-control" name="name" value="${t?.name || ''}" required /></div>
      <div class="col-md-6"><label class="form-label">Teacher ID</label><input class="form-control" name="teacherId" value="${t?.teacherId || 'TCH-' + String(data.teachers.length + 1).padStart(3, '0')}" /></div>
      <div class="col-md-6"><label class="form-label">Qualification</label><input class="form-control" name="qualification" value="${t?.qualification || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" name="phone" value="${t?.phone || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Email</label><input type="email" class="form-control" name="email" value="${t?.email || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Salary</label><input type="number" class="form-control" name="salary" value="${t?.salary || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Joining Date</label><input type="date" class="form-control" name="joiningDate" value="${t?.joiningDate || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Gender</label>
        <select class="form-select" name="gender"><option ${t?.gender === 'Male' ? 'selected' : ''}>Male</option><option ${t?.gender === 'Female' ? 'selected' : ''}>Female</option></select></div>
      <div class="col-12"><label class="form-label">Address</label><textarea class="form-control" name="address" rows="2">${t?.address || ''}</textarea></div>
    </div></div>
    <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">${t ? 'Update' : 'Add Teacher'}</button></div></form>`;
}

function renderStaff() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Staff Management</h1><p class="page-subtitle mb-0">${data.staff.length} staff members</p></div>
      <button class="btn btn-primary" data-action="staff-add"><i class="fas fa-plus me-2"></i>Add Staff</button>
    </div>
    <div class="card-panel"><div class="card-body p-0"><div class="table-responsive">
      <table class="table table-hover"><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Position</th><th>Phone</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${data.staff.map((s) => `<tr>
          <td>${s.staffId}</td><td>${Utils.sanitize(s.name)}</td><td>${s.department}</td><td>${s.position}</td>
          <td>${s.phone}</td><td>${Utils.formatCurrency(s.salary)}</td>
          <td><span class="badge bg-${s.status === 'active' ? 'success' : 'secondary'}">${s.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="staff-edit" data-id="${s.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="staff-delete" data-id="${s.id}"><i class="fas fa-trash"></i></button>
          </td></tr>`).join('')}</tbody>
      </table>
    </div></div></div>`;
}

function staffForm(s = null) {
  return `<div class="modal-header"><h5 class="modal-title">${s ? 'Edit Staff' : 'Add Staff'}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
    <form id="staffForm"><div class="modal-body"><div class="row g-3">
      <div class="col-md-6"><label class="form-label required">Name</label><input class="form-control" name="name" value="${s?.name || ''}" required /></div>
      <div class="col-md-6"><label class="form-label">Staff ID</label><input class="form-control" name="staffId" value="${s?.staffId || 'STF-' + String(data.staff.length + 1).padStart(3, '0')}" /></div>
      <div class="col-md-6"><label class="form-label">Department</label>
        <select class="form-select" name="department">${['Accounts','Library','Transport','Security','Administration','Other'].map((d) => `<option ${s?.department === d ? 'selected' : ''}>${d}</option>`).join('')}</select></div>
      <div class="col-md-6"><label class="form-label">Position</label><input class="form-control" name="position" value="${s?.position || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" name="phone" value="${s?.phone || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Salary</label><input type="number" class="form-control" name="salary" value="${s?.salary || ''}" /></div>
      <div class="col-md-6"><label class="form-label">Joining Date</label><input type="date" class="form-control" name="joiningDate" value="${s?.joiningDate || ''}" /></div>
    </div></div>
    <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">${s ? 'Update' : 'Add'}</button></div></form>`;
}

function renderClasses() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Classes & Sections</h1></div>
      <button class="btn btn-primary" data-action="class-add"><i class="fas fa-plus me-2"></i>Add Class</button>
    </div>
    <div class="row g-3">${data.classes.map((c) => {
      const secs = data.sections.filter((s) => s.classId === c.id);
      const teacher = data.teachers.find((t) => t.id === c.classTeacher);
      const count = data.students.filter((s) => s.classId === c.id && s.status === 'active').length;
      return `<div class="col-md-6 col-lg-4"><div class="card-panel">
        <div class="card-header"><h5>${Utils.sanitize(c.name)}</h5>
          <div><button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="class-edit" data-id="${c.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="class-delete" data-id="${c.id}"><i class="fas fa-trash"></i></button></div>
        </div>
        <div class="card-body">
          <p class="mb-1"><strong>Sections:</strong> ${secs.map((s) => s.name).join(', ') || 'None'}</p>
          <p class="mb-1"><strong>Class Teacher:</strong> ${teacher?.name || '—'}</p>
          <p class="mb-1"><strong>Students:</strong> ${count}</p>
          <p class="mb-0"><strong>Session:</strong> ${c.session}</p>
        </div></div></div>`;
    }).join('')}</div>`;
}

function renderSubjects() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Subjects</h1></div>
      <button class="btn btn-primary" data-action="subject-add"><i class="fas fa-plus me-2"></i>Add Subject</button>
    </div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Code</th><th>Name</th><th>Class</th><th>Teacher</th><th>Type</th><th>Actions</th></tr></thead>
        <tbody>${data.subjects.map((s) => {
          const cls = data.classes.find((c) => c.id === s.classId);
          const t = data.teachers.find((x) => x.id === s.teacherId);
          return `<tr><td>${s.code}</td><td>${Utils.sanitize(s.name)}</td><td>${cls?.name || '—'}</td>
            <td>${t?.name || '—'}</td><td>${s.type}</td>
            <td><button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="subject-edit" data-id="${s.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="subject-delete" data-id="${s.id}"><i class="fas fa-trash"></i></button></td></tr>`;
        }).join('')}</tbody>
      </table>
    </div></div>`;
}

// ===================== ATTENDANCE =====================
function renderAttendance() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Attendance Management</h1><p class="page-subtitle mb-0">Mark and track daily attendance</p></div>
    </div>
    <div class="card-panel mb-4"><div class="card-header"><h5>Take Attendance</h5></div>
      <div class="card-body"><div class="row g-3 align-items-end">
        <div class="col-md-3"><label class="form-label">Class</label>
          <select class="form-select" id="attClass">${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
        <div class="col-md-3"><label class="form-label">Section</label><select class="form-select" id="attSection"></select></div>
        <div class="col-md-3"><label class="form-label">Date</label><input type="date" class="form-control" id="attDate" value="${Utils.today()}" /></div>
        <div class="col-md-3"><button class="btn btn-primary w-100" data-action="att-load"><i class="fas fa-list me-2"></i>Load Students</button></div>
      </div></div>
    </div>
    <div class="card-panel" id="attPanel" style="display:none">
      <div class="card-header"><h5 id="attPanelTitle">Students</h5>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-success" data-action="att-all-p">All Present</button>
          <button class="btn btn-sm btn-primary" data-action="att-save"><i class="fas fa-save me-1"></i>Save</button>
        </div>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-hover mb-0" id="attTable">
          <thead><tr><th>Roll</th><th>Name</th><th>Present</th><th>Absent</th><th>Late</th><th>Leave</th><th>Half Day</th></tr></thead>
          <tbody></tbody>
        </table>
      </div></div>
    </div>
    <div class="card-panel mt-4"><div class="card-header"><h5>Today's Summary</h5></div>
      <div class="card-body"><div class="row g-3">
        ${statCard('Present', presentCount(), 'fa-check', '#d1fae5', '#059669')}
        ${statCard('Absent', absentCount(), 'fa-times', '#fee2e2', '#dc2626')}
        ${statCard('Records', data.attendance.filter((a) => a.date === Utils.today()).length, 'fa-list', '#e8f0fe', '#1a73e8')}
      </div></div>
    </div>`;
}

function initAttendanceUI() {
  const classSel = document.getElementById('attClass');
  const secSel = document.getElementById('attSection');
  function loadSections() {
    const secs = data.sections.filter((s) => s.classId === classSel.value);
    secSel.innerHTML = secs.map((s) => `<option value="${s.id}">${s.name}</option>`).join('') || '<option value="">—</option>';
  }
  classSel?.addEventListener('change', loadSections);
  loadSections();
}

// ===================== FEES =====================
function renderFees() {
  const payments = data.fees.payments;
  const paid = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Fee Management</h1></div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" data-action="fee-structure"><i class="fas fa-list me-1"></i>Fee Structure</button>
        <button class="btn btn-primary" data-action="fee-collect"><i class="fas fa-money-bill me-1"></i>Collect Fee</button>
      </div>
    </div>
    <div class="row g-3 mb-4">
      ${statCard('Total Collected', Utils.formatCurrency(paid), 'fa-check-circle', '#d1fae5', '#059669')}
      ${statCard('Pending', Utils.formatCurrency(pending), 'fa-clock', '#fef3c7', '#d97706')}
      ${statCard('Structures', data.fees.structures.length, 'fa-file-invoice', '#e8f0fe', '#1a73e8')}
    </div>
    <div class="card-panel mb-4"><div class="card-header"><h5>Monthly Collection</h5></div>
      <div class="card-body"><div class="chart-container"><canvas id="feeChart"></canvas></div></div></div>
    <div class="card-panel"><div class="card-header"><h5>Payment History</h5></div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-hover mb-0"><thead><tr><th>Receipt</th><th>Student</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>${payments.map((p) => {
            const st = data.students.find((s) => s.id === p.studentId);
            return `<tr><td>${p.receiptNo || '—'}</td><td>${st?.name || '—'}</td>
              <td>${p.type} ${p.month ? '(' + p.month + ')' : ''}</td>
              <td>${Utils.formatCurrency(p.amount)}</td>
              <td><span class="badge bg-${p.status === 'paid' ? 'success' : 'warning'}">${p.status}</span></td>
              <td>${Utils.formatDate(p.date)}</td>
              <td>${p.status === 'pending' ? `<button class="btn btn-sm btn-success btn-sm-icon" data-action="fee-pay" data-id="${p.id}"><i class="fas fa-check"></i></button>` : ''}
                <button class="btn btn-sm btn-outline-secondary btn-sm-icon" data-action="fee-receipt" data-id="${p.id}"><i class="fas fa-print"></i></button></td></tr>`;
          }).join('')}</tbody>
        </table>
      </div></div>
    </div>`;
}

function initFeeChart() {
  const canvas = document.getElementById('feeChart');
  if (!canvas) return;
  const feeByMonth = {};
  data.fees.payments.filter((p) => p.status === 'paid').forEach((p) => {
    const m = (p.month || p.date || '').slice(0, 7);
    if (m) feeByMonth[m] = (feeByMonth[m] || 0) + p.amount;
  });
  charts.feeChart = new Chart(canvas, {
    type: 'bar',
    data: { labels: Object.keys(feeByMonth).length ? Object.keys(feeByMonth) : ['2025-09'],
      datasets: [{ label: 'Collection (PKR)', data: Object.values(feeByMonth).length ? Object.values(feeByMonth) : [10000], backgroundColor: '#d4a017', borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

// ===================== REMAINING MODULES =====================
function renderAdmissions() {
  return `<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <div><h1 class="page-title">Admission Management</h1></div>
      <button class="btn btn-primary" data-action="admission-add"><i class="fas fa-plus me-2"></i>New Application</button>
    </div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Date</th><th>Student</th><th>Class</th><th>Parent</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${data.admissions.map((a) => {
          const cls = data.classes.find((c) => c.id === a.classId);
          return `<tr><td>${Utils.formatDate(a.date)}</td><td>${Utils.sanitize(a.studentName)}</td><td>${cls?.name || '—'}</td>
            <td>${Utils.sanitize(a.parentName)}</td><td>${a.phone}</td>
            <td><span class="badge bg-${a.status === 'approved' ? 'success' : a.status === 'pending' ? 'warning' : 'danger'}">${a.status}</span></td>
            <td>${a.status === 'pending' ? `<button class="btn btn-sm btn-success btn-sm-icon" data-action="admission-approve" data-id="${a.id}"><i class="fas fa-check"></i></button>
              <button class="btn btn-sm btn-danger btn-sm-icon" data-action="admission-reject" data-id="${a.id}"><i class="fas fa-times"></i></button>` : ''}</td></tr>`;
        }).join('') || '<tr><td colspan="7" class="text-center text-muted">No applications</td></tr>'}</tbody>
      </table>
    </div></div>`;
}

function renderParents() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Parents</h1><p class="page-subtitle mb-0">${data.parents.length} registered</p></div></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Children</th><th>Relation</th></tr></thead>
        <tbody>${data.parents.map((p) => {
          const kids = p.students.map((sid) => data.students.find((s) => s.id === sid)?.name).filter(Boolean).join(', ');
          return `<tr><td>${Utils.sanitize(p.name)}</td><td>${p.phone}</td><td>${p.email || '—'}</td><td>${kids || '—'}</td><td>${p.relation}</td></tr>`;
        }).join('')}</tbody>
      </table>
    </div></div>`;
}

function renderTimetable() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Timetable</h1></div>
      <button class="btn btn-primary" data-action="tt-add"><i class="fas fa-plus me-2"></i>Add Period</button></div>
    <div class="card-panel"><div class="card-body p-0"><div class="table-responsive">
      <table class="table table-bordered mb-0"><thead><tr><th>Day</th><th>Period</th><th>Time</th><th>Class</th><th>Subject</th><th>Teacher</th><th>Room</th><th>Actions</th></tr></thead>
        <tbody>${data.timetable.map((t) => {
          const cls = data.classes.find((c) => c.id === t.classId);
          const sub = data.subjects.find((s) => s.id === t.subjectId);
          const teacher = data.teachers.find((x) => x.id === t.teacherId);
          return `<tr><td>${t.day}</td><td>${t.period}</td><td>${t.startTime}-${t.endTime}</td>
            <td>${cls?.name || '—'}</td><td>${sub?.name || '—'}</td><td>${teacher?.name || '—'}</td><td>${t.room}</td>
            <td><button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="tt-delete" data-id="${t.id}"><i class="fas fa-trash"></i></button></td></tr>`;
        }).join('') || '<tr><td colspan="8" class="text-center">No timetable entries</td></tr>'}</tbody>
      </table>
    </div></div></div>`;
}

function renderHomework() {
  const role = Auth.current.role;
  let hw = data.homework;
  if (role === 'student') {
    const user = data.users.find((u) => u.id === Auth.current.userId);
    const st = data.students.find((s) => s.id === user?.studentId);
    if (st) hw = hw.filter((h) => h.classId === st.classId);
  }
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Homework</h1></div>
      ${(role === 'admin' || role === 'teacher') ? `<button class="btn btn-primary" data-action="hw-add"><i class="fas fa-plus me-2"></i>Assign Homework</button>` : ''}</div>
    <div class="row g-3">${hw.map((h) => {
      const cls = data.classes.find((c) => c.id === h.classId);
      const sub = data.subjects.find((s) => s.id === h.subjectId);
      return `<div class="col-md-6 col-lg-4"><div class="card-panel"><div class="card-body">
        <h6 class="fw-semibold">${Utils.sanitize(h.title)}</h6>
        <p class="small text-muted mb-2">${Utils.sanitize(h.description || '')}</p>
        <div class="small"><i class="fas fa-school me-1"></i>${cls?.name || '—'} · ${sub?.name || '—'}</div>
        <div class="small"><i class="fas fa-calendar me-1"></i>Due: ${Utils.formatDate(h.dueDate)}</div>
        ${(role === 'admin' || role === 'teacher') ? `<div class="mt-2"><button class="btn btn-sm btn-outline-danger" data-action="hw-delete" data-id="${h.id}"><i class="fas fa-trash"></i></button></div>` : ''}
      </div></div></div>`;
    }).join('') || '<div class="col-12"><p class="text-muted">No homework assigned</p></div>'}</div>`;
}

function renderExams() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Exams & Results</h1></div>
      <button class="btn btn-primary" data-action="exam-add"><i class="fas fa-plus me-2"></i>Create Exam</button></div>
    <div class="card-panel mb-4"><div class="card-header"><h5>Examinations</h5></div><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Name</th><th>Type</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${data.exams.map((e) => `<tr>
          <td>${Utils.sanitize(e.name)}</td><td>${e.type}</td>
          <td>${Utils.formatDate(e.startDate)} – ${Utils.formatDate(e.endDate)}</td>
          <td><span class="badge bg-info">${e.status}</span></td>
          <td><button class="btn btn-sm btn-outline-primary" data-action="marks-enter" data-id="${e.id}">Enter Marks</button></td>
        </tr>`).join('') || '<tr><td colspan="5" class="text-center">No exams</td></tr>'}</tbody>
      </table>
    </div></div>
    <div class="card-panel"><div class="card-header"><h5>Results / Marks</h5></div><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Student</th><th>Exam</th><th>Subject</th><th>Marks</th><th>%</th><th>Grade</th></tr></thead>
        <tbody>${data.marks.map((m) => {
          const st = data.students.find((s) => s.id === m.studentId);
          const ex = data.exams.find((e) => e.id === m.examId);
          const sub = data.subjects.find((s) => s.id === m.subjectId);
          const pct = m.total ? Math.round((m.obtained / m.total) * 100) : 0;
          return `<tr><td>${st?.name || '—'}</td><td>${ex?.name || '—'}</td><td>${sub?.name || '—'}</td>
            <td>${m.obtained}/${m.total}</td><td>${pct}%</td><td>${Utils.grade(pct)}</td></tr>`;
        }).join('') || '<tr><td colspan="6" class="text-center text-muted">No marks entered yet</td></tr>'}</tbody>
      </table>
    </div></div>`;
}

function renderAccounting() {
  const income = data.accounting.transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = data.accounting.transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Accounting</h1></div>
      <button class="btn btn-primary" data-action="txn-add"><i class="fas fa-plus me-2"></i>Add Transaction</button></div>
    <div class="row g-3 mb-4">
      ${statCard('Income', Utils.formatCurrency(income), 'fa-arrow-up', '#d1fae5', '#059669')}
      ${statCard('Expenses', Utils.formatCurrency(expense), 'fa-arrow-down', '#fee2e2', '#dc2626')}
      ${statCard('Balance', Utils.formatCurrency(income - expense), 'fa-balance-scale', '#e8f0fe', '#1a73e8')}
    </div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th>Amount</th><th>Ref</th></tr></thead>
        <tbody>${data.accounting.transactions.map((t) => `<tr>
          <td>${Utils.formatDate(t.date)}</td>
          <td><span class="badge bg-${t.type === 'income' ? 'success' : 'danger'}">${t.type}</span></td>
          <td>${t.category}</td><td>${Utils.sanitize(t.description)}</td>
          <td>${Utils.formatCurrency(t.amount)}</td><td>${t.ref || '—'}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div></div>`;
}

function renderPayroll() {
  const employees = [...data.teachers.map((t) => ({ ...t, type: 'Teacher' })), ...data.staff.map((s) => ({ ...s, type: 'Staff' }))];
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Payroll</h1></div>
      <button class="btn btn-primary" data-action="payroll-run"><i class="fas fa-money-check me-2"></i>Process Monthly Payroll</button></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Name</th><th>Type</th><th>Basic Salary</th><th>Net (est.)</th><th>Actions</th></tr></thead>
        <tbody>${employees.map((e) => `<tr>
          <td>${Utils.sanitize(e.name)}</td><td>${e.type}</td>
          <td>${Utils.formatCurrency(e.salary)}</td><td>${Utils.formatCurrency(e.salary)}</td>
          <td><button class="btn btn-sm btn-outline-secondary" data-action="salary-slip" data-id="${e.id}" data-type="${e.type}"><i class="fas fa-print me-1"></i>Slip</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div></div>`;
}

function renderLeave() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Leave Management</h1></div>
      <button class="btn btn-primary" data-action="leave-apply"><i class="fas fa-plus me-2"></i>Apply Leave</button></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${data.leaves.map((l) => `<tr>
          <td>${Utils.sanitize(l.name)}</td><td>${l.type}</td>
          <td>${Utils.formatDate(l.start)}</td><td>${Utils.formatDate(l.end)}</td>
          <td>${Utils.sanitize(l.reason)}</td>
          <td><span class="badge bg-${l.status === 'approved' ? 'success' : l.status === 'pending' ? 'warning' : 'danger'}">${l.status}</span></td>
          <td>${l.status === 'pending' && Auth.current.role === 'admin' ? `<button class="btn btn-sm btn-success btn-sm-icon" data-action="leave-approve" data-id="${l.id}"><i class="fas fa-check"></i></button>
            <button class="btn btn-sm btn-danger btn-sm-icon" data-action="leave-reject" data-id="${l.id}"><i class="fas fa-times"></i></button>` : '—'}</td>
        </tr>`).join('') || '<tr><td colspan="7" class="text-center text-muted">No leave applications</td></tr>'}</tbody>
      </table>
    </div></div>`;
}

function renderLibrary() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Library</h1></div>
      <button class="btn btn-primary" data-action="book-add"><i class="fas fa-plus me-2"></i>Add Book</button></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Category</th><th>Available</th><th>Actions</th></tr></thead>
        <tbody>${data.library.books.map((b) => `<tr>
          <td>${Utils.sanitize(b.title)}</td><td>${Utils.sanitize(b.author)}</td><td>${b.isbn}</td><td>${b.category}</td>
          <td>${b.available}/${b.quantity}</td>
          <td><button class="btn btn-sm btn-outline-primary" data-action="book-issue" data-id="${b.id}">Issue</button>
            <button class="btn btn-sm btn-outline-danger btn-sm-icon" data-action="book-delete" data-id="${b.id}"><i class="fas fa-trash"></i></button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div></div>`;
}

function renderTransport() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Transport</h1></div>
      <button class="btn btn-primary" data-action="vehicle-add"><i class="fas fa-plus me-2"></i>Add Vehicle</button></div>
    <div class="row g-3">${data.transport.vehicles.map((v) => `<div class="col-md-6"><div class="card-panel"><div class="card-body">
      <h5>${v.number}</h5>
      <p class="mb-1"><strong>Driver:</strong> ${Utils.sanitize(v.driver)} (${v.driverPhone})</p>
      <p class="mb-1"><strong>Route:</strong> ${Utils.sanitize(v.route)}</p>
      <p class="mb-0"><strong>Capacity:</strong> ${v.capacity} · <span class="badge bg-success">${v.status}</span></p>
    </div></div></div>`).join('') || '<p class="text-muted">No vehicles</p>'}</div>`;
}

function renderHostel() {
  return `<div class="mb-4"><h1 class="page-title">Hostel Management</h1></div>
    <div class="row g-3">${data.hostel.rooms.map((r) => `<div class="col-md-4"><div class="card-panel"><div class="card-body">
      <h5>Room ${r.number}</h5><p class="mb-1">Type: ${r.type}</p><p class="mb-0">Occupancy: ${r.occupied}/${r.capacity}</p>
    </div></div></div>`).join('')}</div>`;
}

function renderNotices() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Notices</h1></div>
      ${Auth.current.role === 'admin' ? `<button class="btn btn-primary" data-action="notice-add"><i class="fas fa-plus me-2"></i>Create Notice</button>` : ''}</div>
    <div class="row g-3">${data.notices.map((n) => `<div class="col-md-6"><div class="card-panel"><div class="card-body">
      <div class="d-flex justify-content-between"><h6 class="fw-semibold">${Utils.sanitize(n.title)}</h6><span class="badge bg-secondary">${n.audience}</span></div>
      <p class="small text-muted">${Utils.formatDate(n.date)}</p><p>${Utils.sanitize(n.description)}</p>
      ${Auth.current.role === 'admin' ? `<button class="btn btn-sm btn-outline-danger" data-action="notice-delete" data-id="${n.id}"><i class="fas fa-trash"></i></button>` : ''}
    </div></div></div>`).join('') || '<p class="text-muted">No notices</p>'}</div>`;
}

function renderEvents() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Events</h1></div>
      ${Auth.current.role === 'admin' ? `<button class="btn btn-primary" data-action="event-add"><i class="fas fa-plus me-2"></i>Add Event</button>` : ''}</div>
    <div class="row g-3">${data.events.map((e) => `<div class="col-md-6"><div class="card-panel"><div class="card-body">
      <h6 class="fw-semibold text-primary">${Utils.sanitize(e.title)}</h6>
      <p class="small mb-1"><i class="fas fa-calendar me-1"></i>${Utils.formatDate(e.date)} · ${e.time || ''}</p>
      <p class="small mb-1"><i class="fas fa-map-marker-alt me-1"></i>${Utils.sanitize(e.location || '')}</p>
      <p class="mb-0">${Utils.sanitize(e.description || '')}</p>
    </div></div></div>`).join('') || '<p class="text-muted">No events</p>'}</div>`;
}

function renderMessages() {
  return `<div class="mb-4"><h1 class="page-title">Messages</h1></div>
    <div class="card-panel"><div class="card-body">
      <p class="text-muted">Internal messaging. Use Notices for announcements. Message history appears when backend is connected.</p>
      <div class="list-group">${data.messages.map((m) => `<div class="list-group-item"><strong>${m.from}</strong> → ${m.to}: ${Utils.sanitize(m.body)} <small class="text-muted">${Utils.formatDate(m.date)}</small></div>`).join('') || '<div class="list-group-item text-muted">No messages</div>'}</div>
    </div></div>`;
}

function renderDocuments() {
  return `<div class="mb-4"><h1 class="page-title">Document Management</h1></div>
    <div class="card-panel"><div class="card-body">
      <p class="text-muted">Store student, teacher and staff documents. File uploads can be wired to cloud storage later.</p>
      <table class="table"><thead><tr><th>Name</th><th>Type</th><th>Related To</th><th>Date</th></tr></thead>
      <tbody>${data.documents.map((d) => `<tr><td>${Utils.sanitize(d.name)}</td><td>${d.type}</td><td>${d.related}</td><td>${Utils.formatDate(d.date)}</td></tr>`).join('') || '<tr><td colspan="4" class="text-muted">No documents uploaded</td></tr>'}</tbody></table>
    </div></div>`;
}

function renderCertificates() {
  return `<div class="mb-4"><h1 class="page-title">Certificates</h1></div>
    <div class="row g-3">${['Bonafide Certificate', 'Character Certificate', 'Transfer Certificate', 'School Leaving Certificate', 'Achievement Certificate'].map((c) => `
      <div class="col-md-4"><div class="card-panel"><div class="card-body text-center">
        <i class="fas fa-certificate fa-2x text-warning mb-3"></i><h6>${c}</h6>
        <button class="btn btn-sm btn-outline-primary mt-2" data-action="cert-generate" data-type="${c}">Generate</button>
      </div></div></div>`).join('')}</div>`;
}

function renderReports() {
  return `<div class="mb-4"><h1 class="page-title">Reports & Analytics</h1></div>
    <div class="row g-3">${[
      { id: 'students', label: 'Student Report', icon: 'fa-user-graduate' },
      { id: 'attendance', label: 'Attendance Report', icon: 'fa-calendar-check' },
      { id: 'fees', label: 'Fee Collection Report', icon: 'fa-money-bill' },
      { id: 'pending', label: 'Pending Fees Report', icon: 'fa-exclamation' },
      { id: 'teachers', label: 'Teacher Report', icon: 'fa-chalkboard-teacher' },
      { id: 'exams', label: 'Exam / Result Report', icon: 'fa-file-alt' },
      { id: 'expenses', label: 'Expense Report', icon: 'fa-receipt' },
      { id: 'library', label: 'Library Report', icon: 'fa-book' },
    ].map((r) => `<div class="col-md-4 col-lg-3"><div class="quick-action" data-action="report-run" data-report="${r.id}">
      <i class="fas ${r.icon}"></i><span>${r.label}</span></div></div>`).join('')}</div>
    <div class="card-panel mt-4" id="reportOutput" style="display:none">
      <div class="card-header d-flex justify-content-between"><h5 id="reportTitle">Report</h5>
        <button class="btn btn-sm btn-outline-secondary" onclick="window.print()"><i class="fas fa-print me-1"></i>Print</button></div>
      <div class="card-body" id="reportBody"></div>
    </div>`;
}

function renderUsers() {
  return `<div class="d-flex justify-content-between mb-4"><div><h1 class="page-title">Users & Roles</h1></div></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover mb-0"><thead><tr><th>Username</th><th>Name</th><th>Role</th><th>Email</th><th>Status</th></tr></thead>
        <tbody>${data.users.map((u) => `<tr>
          <td>${Utils.sanitize(u.username)}</td><td>${Utils.sanitize(u.name)}</td>
          <td><span class="badge bg-primary">${u.role}</span></td><td>${u.email || '—'}</td>
          <td><span class="badge bg-${u.status === 'active' ? 'success' : 'secondary'}">${u.status}</span></td>
        </tr>`).join('')}</tbody>
      </table>
    </div></div>
    <div class="card-panel mt-4"><div class="card-header"><h5>Role Permissions</h5></div><div class="card-body">
      <p class="small text-muted">Admin has full access. Other roles are restricted to their portal modules.</p>
      ${Object.entries(data.roles).map(([role, conf]) => `<div class="mb-2"><strong class="text-capitalize">${role}:</strong> ${conf.modules.includes('*') ? 'All modules' : conf.modules.join(', ')}</div>`).join('')}
    </div></div>`;
}

function renderAudit() {
  return `<div class="mb-4"><h1 class="page-title">Audit Logs</h1></div>
    <div class="card-panel"><div class="card-body p-0">
      <table class="table table-hover table-sm mb-0"><thead><tr><th>Date/Time</th><th>User</th><th>Role</th><th>Action</th><th>Module</th><th>Detail</th></tr></thead>
        <tbody>${data.audit.slice(0, 100).map((a) => `<tr>
          <td>${Utils.formatDate(a.date)} ${new Date(a.date).toLocaleTimeString()}</td>
          <td>${Utils.sanitize(a.user)}</td><td>${a.role}</td><td>${a.action}</td><td>${a.module}</td><td>${Utils.sanitize(a.detail)}</td>
        </tr>`).join('') || '<tr><td colspan="6" class="text-center text-muted">No activity yet</td></tr>'}</tbody>
      </table>
    </div></div>`;
}

function renderBackup() {
  return `<div class="mb-4"><h1 class="page-title">Backup & Restore</h1></div>
    <div class="row g-3">
      <div class="col-md-6"><div class="card-panel"><div class="card-body">
        <h5><i class="fas fa-download me-2"></i>Export Backup</h5>
        <p class="text-muted small">Download complete system data as JSON.</p>
        <button class="btn btn-primary" data-action="backup-export"><i class="fas fa-file-export me-2"></i>Download Backup</button>
      </div></div></div>
      <div class="col-md-6"><div class="card-panel"><div class="card-body">
        <h5><i class="fas fa-upload me-2"></i>Restore Backup</h5>
        <p class="text-muted small">Import a previously exported JSON backup.</p>
        <input type="file" class="form-control mb-2" id="backupFile" accept=".json" />
        <button class="btn btn-warning" data-action="backup-import"><i class="fas fa-file-import me-2"></i>Restore</button>
      </div></div></div>
      <div class="col-12"><div class="card-panel border-danger"><div class="card-body">
        <h5 class="text-danger"><i class="fas fa-exclamation-triangle me-2"></i>Danger Zone</h5>
        <p class="text-muted small">Clear all data and reset to factory seed. This cannot be undone.</p>
        <button class="btn btn-danger" data-action="backup-reset">Reset All Data</button>
      </div></div></div>
    </div>`;
}

function renderSettings() {
  const s = data.settings;
  const user = data.users.find((u) => u.id === Auth.current.userId);
  return `<div class="mb-4"><h1 class="page-title">Settings</h1></div>
    <div class="row g-4">
      <div class="col-lg-6"><div class="card-panel"><div class="card-header"><h5>School Settings</h5></div><div class="card-body">
        <form id="schoolSettingsForm">
          <div class="mb-3"><label class="form-label">School Name</label><input class="form-control" name="schoolName" value="${Utils.sanitize(s.schoolName)}" /></div>
          <div class="mb-3"><label class="form-label">Address</label><textarea class="form-control" name="address" rows="2">${Utils.sanitize(s.address)}</textarea></div>
          <div class="mb-3"><label class="form-label">Phone</label><input class="form-control" name="phone" value="${s.phone}" /></div>
              <div class="mb-3"><label class="form-label">WhatsApp Number</label><input class="form-control" name="whatsapp" value="${s.whatsapp || ''}" placeholder="923001234567" />
                <div class="form-text">Format without + (e.g. 923001234567)</div></div>
          <div class="mb-3"><label class="form-label">Email</label><input class="form-control" name="email" value="${s.email}" /></div>
          <div class="mb-3"><label class="form-label">Website</label><input class="form-control" name="website" value="${s.website}" /></div>
          <div class="mb-3"><label class="form-label">Principal Name</label><input class="form-control" name="principal" value="${Utils.sanitize(s.principal)}" /></div>
          <div class="mb-3"><label class="form-label">Academic Session</label><input class="form-control" name="session" value="${s.session}" /></div>
          <button type="submit" class="btn btn-primary">Save School Settings</button>
        </form>
      </div></div></div>
      <div class="col-lg-6">
        <div class="card-panel"><div class="card-header"><h5>Change Password</h5></div><div class="card-body">
          <form id="passwordForm">
            <div class="mb-3"><label class="form-label">Current Password</label><input type="password" class="form-control" name="oldPass" required /></div>
            <div class="mb-3"><label class="form-label">New Password</label><input type="password" class="form-control" name="newPass" required minlength="4" /></div>
            <div class="mb-3"><label class="form-label">Confirm Password</label><input type="password" class="form-control" name="confirmPass" required /></div>
            <button type="submit" class="btn btn-primary">Update Password</button>
          </form>
        </div></div>
        ${Auth.current.role === 'admin' ? `<div class="card-panel mt-4"><div class="card-header"><h5>Admin Account</h5></div><div class="card-body">
          <form id="adminAccountForm">
            <div class="mb-3"><label class="form-label">Username</label><input class="form-control" name="username" value="${user?.username || ''}" /></div>
            <div class="mb-3"><label class="form-label">Email</label><input class="form-control" name="email" value="${user?.email || ''}" /></div>
            <div class="mb-3"><label class="form-label">Display Name</label><input class="form-control" name="name" value="${user?.name || ''}" /></div>
            <button type="submit" class="btn btn-primary">Update Account</button>
          </form>
        </div></div>` : ''}
      </div>
    </div>`;
}

function renderProfile() { return renderSettings(); }
function renderChildren() { return renderParentDashboard(); }

// ===================== ACTION HANDLER (core CRUD) =====================
function handleAction(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === 'navigate') { navigate(btn.dataset.page); return; }

  // Students
  if (action === 'student-add') {
    openModal(studentForm());
    document.getElementById('studentForm').onsubmit = (ev) => { ev.preventDefault(); saveStudent(new FormData(ev.target)); };
  } else if (action === 'student-edit') {
    const s = data.students.find((x) => x.id === id);
    openModal(studentForm(s));
    document.getElementById('studentForm').onsubmit = (ev) => { ev.preventDefault(); saveStudent(new FormData(ev.target), id); };
  } else if (action === 'student-view') {
    openModal(studentProfile(id));
  } else if (action === 'student-delete') {
    if (Utils.confirm('Delete this student permanently?')) {
      data.students = data.students.filter((s) => s.id !== id);
      DB.save(data); Auth.audit('delete', 'Students', id); Utils.toast('Deleted', 'Student removed'); navigate('students');
    }
  } else if (action === 'print-student') {
    const s = data.students.find((x) => x.id === id);
    Utils.printElement(`<h2>${data.settings.schoolName}</h2><h3>Student Profile</h3>
      <p><strong>Name:</strong> ${s.name}<br><strong>Admission:</strong> ${s.admissionNo}<br>
      <strong>Class:</strong> ${data.classes.find((c) => c.id === s.classId)?.name}<br>
      <strong>DOB:</strong> ${s.dob}<br><strong>Phone:</strong> ${s.phone}</p>`, 'Student Profile');
  } else if (action === 'print-idcard') {
    const s = data.students.find((x) => x.id === id);
    Utils.printElement(`<div style="border:2px solid #0a2540;padding:20px;width:320px;text-align:center">
      <h4 style="color:#0a2540;margin:0">${data.settings.schoolName}</h4>
      <p style="margin:4px 0;font-size:12px">Student ID Card</p>
      <div style="width:80px;height:80px;background:#eee;margin:10px auto;border-radius:50%;line-height:80px">Photo</div>
      <h3 style="margin:8px 0">${s.name}</h3>
      <p style="margin:2px 0">${s.admissionNo}</p>
      <p style="margin:2px 0">${data.classes.find((c) => c.id === s.classId)?.name} · Roll ${s.rollNo}</p>
      <p style="margin:2px 0;font-size:12px">Session ${s.session}</p></div>`, 'ID Card');
  }

  // Teachers
  else if (action === 'teacher-add') {
    openModal(teacherForm());
    document.getElementById('teacherForm').onsubmit = (ev) => { ev.preventDefault(); saveTeacher(new FormData(ev.target)); };
  } else if (action === 'teacher-edit') {
    const t = data.teachers.find((x) => x.id === id);
    openModal(teacherForm(t));
    document.getElementById('teacherForm').onsubmit = (ev) => { ev.preventDefault(); saveTeacher(new FormData(ev.target), id); };
  } else if (action === 'teacher-view') {
    const t = data.teachers.find((x) => x.id === id);
    openModal(`<div class="modal-header"><h5>${Utils.sanitize(t.name)}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><p><strong>ID:</strong> ${t.teacherId}</p><p><strong>Qualification:</strong> ${t.qualification}</p>
      <p><strong>Phone:</strong> ${t.phone}</p><p><strong>Email:</strong> ${t.email}</p>
      <p><strong>Salary:</strong> ${Utils.formatCurrency(t.salary)}</p><p><strong>Joining:</strong> ${Utils.formatDate(t.joiningDate)}</p></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>`);
  } else if (action === 'teacher-delete') {
    if (Utils.confirm('Delete this teacher?')) {
      data.teachers = data.teachers.filter((t) => t.id !== id); DB.save(data); Utils.toast('Deleted', 'Teacher removed'); navigate('teachers');
    }
  }

  // Staff
  else if (action === 'staff-add') {
    openModal(staffForm());
    document.getElementById('staffForm').onsubmit = (ev) => { ev.preventDefault(); saveStaff(new FormData(ev.target)); };
  } else if (action === 'staff-edit') {
    const s = data.staff.find((x) => x.id === id);
    openModal(staffForm(s));
    document.getElementById('staffForm').onsubmit = (ev) => { ev.preventDefault(); saveStaff(new FormData(ev.target), id); };
  } else if (action === 'staff-delete') {
    if (Utils.confirm('Delete this staff member?')) {
      data.staff = data.staff.filter((s) => s.id !== id); DB.save(data); Utils.toast('Deleted', 'Staff removed'); navigate('staff');
    }
  }

  // Classes
  else if (action === 'class-add') {
    openModal(`<div class="modal-header"><h5>Add Class</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="classForm"><div class="modal-body">
        <div class="mb-3"><label class="form-label">Class Name</label><input class="form-control" name="name" required placeholder="e.g. Class 9" /></div>
        <div class="mb-3"><label class="form-label">Section</label><input class="form-control" name="section" value="A" /></div>
      </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Create</button></div></form>`);
    document.getElementById('classForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const cid = Utils.uid('c'); const sid = Utils.uid('sec');
      data.classes.push({ id: cid, name: fd.get('name'), sections: [sid], classTeacher: null, session: data.settings.session });
      data.sections.push({ id: sid, name: fd.get('section') || 'A', classId: cid });
      DB.save(data); closeModal(); Utils.toast('Created', 'Class added'); navigate('classes');
    };
  } else if (action === 'class-delete') {
    if (Utils.confirm('Delete class and its sections?')) {
      data.classes = data.classes.filter((c) => c.id !== id);
      data.sections = data.sections.filter((s) => s.classId !== id);
      DB.save(data); navigate('classes');
    }
  }

  // Subjects
  else if (action === 'subject-add') {
    openModal(`<div class="modal-header"><h5>Add Subject</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="subForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name</label><input class="form-control" name="name" required /></div>
        <div class="col-md-6"><label class="form-label">Code</label><input class="form-control" name="code" required /></div>
        <div class="col-md-6"><label class="form-label">Class</label>
          <select class="form-select" name="classId">${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Teacher</label>
          <select class="form-select" name="teacherId">${data.teachers.map((t) => `<option value="${t.id}">${t.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Type</label>
          <select class="form-select" name="type"><option>Theory</option><option>Practical</option></select></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Add</button></div></form>`);
    document.getElementById('subForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.subjects.push({ id: Utils.uid('sub'), name: fd.get('name'), code: fd.get('code'), classId: fd.get('classId'), teacherId: fd.get('teacherId'), type: fd.get('type') });
      DB.save(data); closeModal(); Utils.toast('Added', 'Subject created'); navigate('subjects');
    };
  } else if (action === 'subject-delete') {
    if (Utils.confirm('Delete subject?')) { data.subjects = data.subjects.filter((s) => s.id !== id); DB.save(data); navigate('subjects'); }
  }

  // Attendance
  else if (action === 'att-load') {
    const classId = document.getElementById('attClass').value;
    const sectionId = document.getElementById('attSection').value;
    const date = document.getElementById('attDate').value;
    const students = data.students.filter((s) => s.classId === classId && (!sectionId || s.sectionId === sectionId) && s.status === 'active');
    const tbody = document.querySelector('#attTable tbody');
    tbody.innerHTML = students.map((s) => {
      const existing = data.attendance.find((a) => a.studentId === s.id && a.date === date);
      const st = existing?.status || 'P';
      return `<tr data-sid="${s.id}"><td>${s.rollNo}</td><td>${Utils.sanitize(s.name)}</td>
        ${['P','A','L','E','H'].map((k) => `<td class="text-center"><button type="button" class="att-btn ${st === k ? k : ''}" data-status="${k}">${k}</button></td>`).join('')}
      </tr>`;
    }).join('');
    document.getElementById('attPanel').style.display = 'block';
    document.getElementById('attPanelTitle').textContent = `Attendance · ${date} · ${students.length} students`;
    tbody.querySelectorAll('.att-btn').forEach((b) => {
      b.onclick = () => {
        const row = b.closest('tr');
        row.querySelectorAll('.att-btn').forEach((x) => (x.className = 'att-btn'));
        b.className = 'att-btn ' + b.dataset.status;
      };
    });
  } else if (action === 'att-all-p') {
    document.querySelectorAll('#attTable tbody tr').forEach((row) => {
      row.querySelectorAll('.att-btn').forEach((x) => (x.className = 'att-btn'));
      const p = row.querySelector('[data-status="P"]');
      if (p) p.className = 'att-btn P';
    });
  } else if (action === 'att-save') {
    const date = document.getElementById('attDate').value;
    document.querySelectorAll('#attTable tbody tr').forEach((row) => {
      const sid = row.dataset.sid;
      const active = row.querySelector('.att-btn.P, .att-btn.A, .att-btn.L, .att-btn.E, .att-btn.H');
      const status = active ? active.dataset.status : 'P';
      const idx = data.attendance.findIndex((a) => a.studentId === sid && a.date === date);
      const rec = { id: Utils.uid('att'), studentId: sid, date, status, markedBy: Auth.current.userId };
      if (idx >= 0) data.attendance[idx] = rec; else data.attendance.push(rec);
    });
    DB.save(data); Auth.audit('attendance', 'Attendance', `Saved for ${date}`); Utils.toast('Saved', 'Attendance recorded'); navigate('attendance');
  }

  // Fees
  else if (action === 'fee-collect') {
    openModal(`<div class="modal-header"><h5>Collect Fee</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="feeForm"><div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">Student</label>
          <select class="form-select" name="studentId" required>${data.students.map((s) => `<option value="${s.id}">${s.name} (${s.admissionNo})</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Amount</label><input type="number" class="form-control" name="amount" required /></div>
        <div class="col-md-6"><label class="form-label">Type</label>
          <select class="form-select" name="type"><option>Monthly</option><option>Admission</option><option>Exam</option><option>Transport</option><option>Other</option></select></div>
        <div class="col-md-6"><label class="form-label">Month (YYYY-MM)</label><input class="form-control" name="month" value="${Utils.today().slice(0, 7)}" /></div>
        <div class="col-md-6"><label class="form-label">Method</label>
          <select class="form-select" name="method"><option>Cash</option><option>Bank</option><option>Online</option></select></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Collect</button></div></form>`);
    document.getElementById('feeForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const receiptNo = 'RCP-' + String(data.fees.payments.length + 1).padStart(3, '0');
      data.fees.payments.push({ id: Utils.uid('fp'), studentId: fd.get('studentId'), amount: Number(fd.get('amount')), type: fd.get('type'), month: fd.get('month'), status: 'paid', date: Utils.today(), receiptNo, method: fd.get('method'), discount: 0, fine: 0 });
      data.accounting.transactions.push({ id: Utils.uid('ac'), type: 'income', category: 'Fee Collection', amount: Number(fd.get('amount')), date: Utils.today(), description: `Fee ${fd.get('type')}`, ref: receiptNo });
      data.notifications.unshift({ id: Utils.uid('nf'), title: 'Fee Received', message: `Payment ${receiptNo} recorded`, type: 'fee', read: false, date: new Date().toISOString() });
      DB.save(data); Auth.audit('fee_collect', 'Fees', receiptNo); closeModal(); Utils.toast('Success', `Fee collected · ${receiptNo}`); navigate('fees');
    };
  } else if (action === 'fee-pay') {
    const p = data.fees.payments.find((x) => x.id === id);
    if (p) { p.status = 'paid'; p.date = Utils.today(); p.receiptNo = p.receiptNo || 'RCP-' + String(data.fees.payments.length + 1).padStart(3, '0'); p.method = p.method || 'Cash'; DB.save(data); Utils.toast('Paid', 'Fee marked as paid'); navigate('fees'); }
  } else if (action === 'fee-receipt') {
    const p = data.fees.payments.find((x) => x.id === id);
    const st = data.students.find((s) => s.id === p.studentId);
    Utils.printElement(`<div style="max-width:400px;margin:auto;border:1px solid #ccc;padding:24px">
      <h3 style="text-align:center;color:#0a2540">${data.settings.schoolName}</h3><h4 style="text-align:center">Fee Receipt</h4><hr>
      <p><strong>Receipt No:</strong> ${p.receiptNo}</p><p><strong>Student:</strong> ${st?.name}</p>
      <p><strong>Admission No:</strong> ${st?.admissionNo}</p><p><strong>Type:</strong> ${p.type} ${p.month || ''}</p>
      <p><strong>Amount:</strong> ${Utils.formatCurrency(p.amount)}</p><p><strong>Date:</strong> ${Utils.formatDate(p.date)}</p>
      <p><strong>Method:</strong> ${p.method || '—'}</p><hr><p style="text-align:center;font-size:12px">Thank you</p></div>`, 'Fee Receipt');
  } else if (action === 'fee-structure') {
    openModal(`<div class="modal-header"><h5>Fee Structures</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Amount</th></tr></thead>
      <tbody>${data.fees.structures.map((f) => `<tr><td>${f.name}</td><td>${f.type}</td><td>${Utils.formatCurrency(f.amount)}</td></tr>`).join('')}</tbody></table></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>`);
  }

  // Admissions
  else if (action === 'admission-add') {
    openModal(`<div class="modal-header"><h5>New Admission Application</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="admForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Student Name</label><input class="form-control" name="studentName" required /></div>
        <div class="col-md-6"><label class="form-label">DOB</label><input type="date" class="form-control" name="dob" /></div>
        <div class="col-md-6"><label class="form-label">Gender</label><select class="form-select" name="gender"><option>Male</option><option>Female</option></select></div>
        <div class="col-md-6"><label class="form-label">Class</label>
          <select class="form-select" name="classId">${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Parent Name</label><input class="form-control" name="parentName" required /></div>
        <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" name="phone" required /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button></div></form>`);
    document.getElementById('admForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.admissions.push({ id: Utils.uid('ad'), studentName: fd.get('studentName'), dob: fd.get('dob'), gender: fd.get('gender'), classId: fd.get('classId'), parentName: fd.get('parentName'), phone: fd.get('phone'), status: 'pending', date: Utils.today(), admissionNo: null });
      data.notifications.unshift({ id: Utils.uid('nf'), title: 'New Admission', message: `${fd.get('studentName')} applied`, type: 'admission', read: false, date: new Date().toISOString() });
      DB.save(data); closeModal(); Utils.toast('Submitted', 'Application received'); navigate('admissions');
    };
  } else if (action === 'admission-approve') {
    const a = data.admissions.find((x) => x.id === id);
    if (!a) return;
    a.status = 'approved';
    const admNo = 'ADM-2025-' + String(data.students.length + 1).padStart(3, '0');
    a.admissionNo = admNo;
    const sid = Utils.uid('s');
    const sec = data.sections.find((s) => s.classId === a.classId);
    data.students.push({ id: sid, admissionNo: admNo, regNo: 'REG-' + String(data.students.length + 1).padStart(3, '0'), rollNo: String(data.students.filter((s) => s.classId === a.classId).length + 1).padStart(2, '0'), name: a.studentName, dob: a.dob, gender: a.gender, bloodGroup: '', phone: a.phone, email: '', address: '', classId: a.classId, sectionId: sec?.id || null, session: data.settings.session, status: 'active', admissionDate: Utils.today(), previousSchool: '', photo: null, parentId: null, emergencyContact: a.phone, createdAt: new Date().toISOString() });
    DB.save(data); Auth.audit('approve', 'Admissions', a.studentName); Utils.toast('Approved', `${a.studentName} admitted as ${admNo}`); navigate('admissions');
  } else if (action === 'admission-reject') {
    const a = data.admissions.find((x) => x.id === id);
    if (a) { a.status = 'rejected'; DB.save(data); Utils.toast('Rejected', 'Application rejected'); navigate('admissions'); }
  }

  // Homework, Exams, Notices, Events, Leave, Library, Timetable, Accounting, Backup, Certificates, Reports
  else if (action === 'hw-add') {
    openModal(`<div class="modal-header"><h5>Assign Homework</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="hwForm"><div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">Title</label><input class="form-control" name="title" required /></div>
        <div class="col-12"><label class="form-label">Description</label><textarea class="form-control" name="description" rows="3"></textarea></div>
        <div class="col-md-6"><label class="form-label">Class</label>
          <select class="form-select" name="classId">${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Subject</label>
          <select class="form-select" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Due Date</label><input type="date" class="form-control" name="dueDate" required /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Assign</button></div></form>`);
    document.getElementById('hwForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const user = data.users.find((u) => u.id === Auth.current.userId);
      data.homework.push({ id: Utils.uid('hw'), title: fd.get('title'), description: fd.get('description'), classId: fd.get('classId'), subjectId: fd.get('subjectId'), teacherId: user?.teacherId || data.teachers[0]?.id, dueDate: fd.get('dueDate'), status: 'active', createdAt: new Date().toISOString() });
      DB.save(data); closeModal(); Utils.toast('Assigned', 'Homework created'); navigate('homework');
    };
  } else if (action === 'hw-delete') {
    if (Utils.confirm('Delete homework?')) { data.homework = data.homework.filter((h) => h.id !== id); DB.save(data); navigate('homework'); }
  } else if (action === 'exam-add') {
    openModal(`<div class="modal-header"><h5>Create Exam</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="examForm"><div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">Exam Name</label><input class="form-control" name="name" required /></div>
        <div class="col-md-6"><label class="form-label">Type</label>
          <select class="form-select" name="type"><option>Mid Term</option><option>Final</option><option>Unit Test</option><option>Quiz</option></select></div>
        <div class="col-md-6"><label class="form-label">Start Date</label><input type="date" class="form-control" name="startDate" required /></div>
        <div class="col-md-6"><label class="form-label">End Date</label><input type="date" class="form-control" name="endDate" required /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Create</button></div></form>`);
    document.getElementById('examForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.exams.push({ id: Utils.uid('e'), name: fd.get('name'), type: fd.get('type'), startDate: fd.get('startDate'), endDate: fd.get('endDate'), classes: data.classes.map((c) => c.id), status: 'upcoming' });
      DB.save(data); closeModal(); Utils.toast('Created', 'Exam scheduled'); navigate('exams');
    };
  } else if (action === 'marks-enter') {
    const exam = data.exams.find((e) => e.id === id);
    openModal(`<div class="modal-header"><h5>Enter Marks · ${exam?.name}</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="marksForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Student</label>
          <select class="form-select" name="studentId">${data.students.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Subject</label>
          <select class="form-select" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Obtained</label><input type="number" class="form-control" name="obtained" required /></div>
        <div class="col-md-6"><label class="form-label">Total</label><input type="number" class="form-control" name="total" value="100" required /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Save Marks</button></div></form>`);
    document.getElementById('marksForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.marks.push({ id: Utils.uid('mk'), examId: id, studentId: fd.get('studentId'), subjectId: fd.get('subjectId'), obtained: Number(fd.get('obtained')), total: Number(fd.get('total')) });
      DB.save(data); closeModal(); Utils.toast('Saved', 'Marks recorded'); navigate('exams');
    };
  } else if (action === 'notice-add') {
    openModal(`<div class="modal-header"><h5>Create Notice</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="noticeForm"><div class="modal-body">
        <div class="mb-3"><label class="form-label">Title</label><input class="form-control" name="title" required /></div>
        <div class="mb-3"><label class="form-label">Description</label><textarea class="form-control" name="description" rows="4" required></textarea></div>
        <div class="mb-3"><label class="form-label">Audience</label>
          <select class="form-select" name="audience"><option>Everyone</option><option>Teachers</option><option>Students</option><option>Parents</option><option>Staff</option></select></div>
      </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Publish</button></div></form>`);
    document.getElementById('noticeForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.notices.unshift({ id: Utils.uid('n'), title: fd.get('title'), description: fd.get('description'), date: Utils.today(), audience: fd.get('audience'), published: true, createdAt: new Date().toISOString() });
      DB.save(data); closeModal(); Utils.toast('Published', 'Notice created'); navigate('notices');
    };
  } else if (action === 'notice-delete') {
    if (Utils.confirm('Delete notice?')) { data.notices = data.notices.filter((n) => n.id !== id); DB.save(data); navigate('notices'); }
  } else if (action === 'event-add') {
    openModal(`<div class="modal-header"><h5>Add Event</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="eventForm"><div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">Title</label><input class="form-control" name="title" required /></div>
        <div class="col-md-6"><label class="form-label">Date</label><input type="date" class="form-control" name="date" required /></div>
        <div class="col-md-6"><label class="form-label">Time</label><input type="time" class="form-control" name="time" /></div>
        <div class="col-12"><label class="form-label">Location</label><input class="form-control" name="location" /></div>
        <div class="col-12"><label class="form-label">Description</label><textarea class="form-control" name="description" rows="3"></textarea></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Add</button></div></form>`);
    document.getElementById('eventForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.events.push({ id: Utils.uid('ev'), title: fd.get('title'), date: fd.get('date'), time: fd.get('time'), location: fd.get('location'), description: fd.get('description'), image: null });
      DB.save(data); closeModal(); Utils.toast('Added', 'Event created'); navigate('events');
    };
  } else if (action === 'leave-apply') {
    openModal(`<div class="modal-header"><h5>Apply Leave</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="leaveForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Type</label>
          <select class="form-select" name="type"><option>Casual</option><option>Sick</option><option>Annual</option><option>Emergency</option></select></div>
        <div class="col-md-6"><label class="form-label">From</label><input type="date" class="form-control" name="start" required /></div>
        <div class="col-md-6"><label class="form-label">To</label><input type="date" class="form-control" name="end" required /></div>
        <div class="col-12"><label class="form-label">Reason</label><textarea class="form-control" name="reason" rows="3" required></textarea></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button></div></form>`);
    document.getElementById('leaveForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.leaves.push({ id: Utils.uid('lv'), name: Auth.current.name, userId: Auth.current.userId, type: fd.get('type'), start: fd.get('start'), end: fd.get('end'), reason: fd.get('reason'), status: 'pending' });
      DB.save(data); closeModal(); Utils.toast('Submitted', 'Leave application sent'); navigate('leave');
    };
  } else if (action === 'leave-approve' || action === 'leave-reject') {
    const l = data.leaves.find((x) => x.id === id);
    if (l) { l.status = action === 'leave-approve' ? 'approved' : 'rejected'; DB.save(data); Utils.toast(l.status, `Leave ${l.status}`); navigate('leave'); }
  } else if (action === 'book-add') {
    openModal(`<div class="modal-header"><h5>Add Book</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="bookForm"><div class="modal-body"><div class="row g-3">
        <div class="col-12"><label class="form-label">Title</label><input class="form-control" name="title" required /></div>
        <div class="col-md-6"><label class="form-label">Author</label><input class="form-control" name="author" /></div>
        <div class="col-md-6"><label class="form-label">ISBN</label><input class="form-control" name="isbn" /></div>
        <div class="col-md-6"><label class="form-label">Category</label><input class="form-control" name="category" /></div>
        <div class="col-md-6"><label class="form-label">Quantity</label><input type="number" class="form-control" name="quantity" value="1" /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Add</button></div></form>`);
    document.getElementById('bookForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const qty = Number(fd.get('quantity')) || 1;
      data.library.books.push({ id: Utils.uid('b'), title: fd.get('title'), author: fd.get('author'), isbn: fd.get('isbn'), category: fd.get('category'), publisher: '', quantity: qty, available: qty });
      DB.save(data); closeModal(); Utils.toast('Added', 'Book added to library'); navigate('library');
    };
  } else if (action === 'book-delete') {
    if (Utils.confirm('Remove book?')) { data.library.books = data.library.books.filter((b) => b.id !== id); DB.save(data); navigate('library'); }
  } else if (action === 'book-issue') {
    const b = data.library.books.find((x) => x.id === id);
    if (b && b.available > 0) {
      b.available--;
      data.library.issues.push({ id: Utils.uid('iss'), bookId: id, studentId: data.students[0]?.id, issueDate: Utils.today(), dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10), returned: false });
      DB.save(data); Utils.toast('Issued', `${b.title} issued`); navigate('library');
    } else Utils.toast('Unavailable', 'No copies available');
  } else if (action === 'tt-add') {
    openModal(`<div class="modal-header"><h5>Add Period</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="ttForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Class</label>
          <select class="form-select" name="classId">${data.classes.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Day</label>
          <select class="form-select" name="day">${['Monday','Tuesday','Wednesday','Thursday','Friday'].map((d) => `<option>${d}</option>`).join('')}</select></div>
        <div class="col-md-4"><label class="form-label">Period</label><input type="number" class="form-control" name="period" value="1" /></div>
        <div class="col-md-4"><label class="form-label">Start</label><input type="time" class="form-control" name="startTime" value="08:00" /></div>
        <div class="col-md-4"><label class="form-label">End</label><input type="time" class="form-control" name="endTime" value="08:45" /></div>
        <div class="col-md-6"><label class="form-label">Subject</label>
          <select class="form-select" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Teacher</label>
          <select class="form-select" name="teacherId">${data.teachers.map((t) => `<option value="${t.id}">${t.name}</option>`).join('')}</select></div>
        <div class="col-md-6"><label class="form-label">Room</label><input class="form-control" name="room" value="R-101" /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Add</button></div></form>`);
    document.getElementById('ttForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.timetable.push({ id: Utils.uid('tt'), classId: fd.get('classId'), sectionId: data.sections.find((s) => s.classId === fd.get('classId'))?.id, day: fd.get('day'), period: Number(fd.get('period')), subjectId: fd.get('subjectId'), teacherId: fd.get('teacherId'), startTime: fd.get('startTime'), endTime: fd.get('endTime'), room: fd.get('room') });
      DB.save(data); closeModal(); Utils.toast('Added', 'Period scheduled'); navigate('timetable');
    };
  } else if (action === 'tt-delete') {
    if (Utils.confirm('Remove period?')) { data.timetable = data.timetable.filter((t) => t.id !== id); DB.save(data); navigate('timetable'); }
  } else if (action === 'txn-add') {
    openModal(`<div class="modal-header"><h5>Add Transaction</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="txnForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Type</label>
          <select class="form-select" name="type"><option value="income">Income</option><option value="expense">Expense</option></select></div>
        <div class="col-md-6"><label class="form-label">Category</label><input class="form-control" name="category" required /></div>
        <div class="col-md-6"><label class="form-label">Amount</label><input type="number" class="form-control" name="amount" required /></div>
        <div class="col-md-6"><label class="form-label">Date</label><input type="date" class="form-control" name="date" value="${Utils.today()}" /></div>
        <div class="col-12"><label class="form-label">Description</label><input class="form-control" name="description" /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Save</button></div></form>`);
    document.getElementById('txnForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.accounting.transactions.unshift({ id: Utils.uid('ac'), type: fd.get('type'), category: fd.get('category'), amount: Number(fd.get('amount')), date: fd.get('date'), description: fd.get('description'), ref: '' });
      DB.save(data); closeModal(); Utils.toast('Saved', 'Transaction recorded'); navigate('accounting');
    };
  } else if (action === 'salary-slip') {
    const type = btn.dataset.type;
    const emp = type === 'Teacher' ? data.teachers.find((t) => t.id === id) : data.staff.find((s) => s.id === id);
    if (!emp) return;
    Utils.printElement(`<div style="max-width:480px;margin:auto;padding:24px;border:1px solid #ccc">
      <h3 style="text-align:center">${data.settings.schoolName}</h3><h4 style="text-align:center">Salary Slip</h4><hr>
      <p><strong>Employee:</strong> ${emp.name}</p><p><strong>Month:</strong> ${Utils.today().slice(0, 7)}</p>
      <p><strong>Basic Salary:</strong> ${Utils.formatCurrency(emp.salary)}</p>
      <p><strong>Allowances:</strong> PKR 0</p><p><strong>Deductions:</strong> PKR 0</p><hr>
      <p><strong>Net Salary:</strong> ${Utils.formatCurrency(emp.salary)}</p></div>`, 'Salary Slip');
  } else if (action === 'payroll-run') {
    Utils.toast('Processed', 'Monthly payroll recorded'); Auth.audit('payroll', 'Payroll', 'Monthly payroll processed');
  } else if (action === 'cert-generate') {
    const type = btn.dataset.type;
    const st = data.students[0];
    if (!st) { Utils.toast('No students', 'Add a student first'); return; }
    Utils.printElement(`<div style="text-align:center;padding:40px;border:4px double #0a2540;max-width:600px;margin:auto">
      <h2 style="color:#0a2540">${data.settings.schoolName}</h2>
      <h3 style="margin:20px 0;color:#d4a017">${type}</h3>
      <p style="font-size:16px;line-height:1.8">This is to certify that <strong>${st.name}</strong>,
      Admission No. <strong>${st.admissionNo}</strong>, is a bona fide student of this school studying in
      <strong>${data.classes.find((c) => c.id === st.classId)?.name || ''}</strong>
      for the academic session <strong>${st.session}</strong>.</p>
      <p style="margin-top:40px">Date: ${Utils.formatDate(Utils.today())}</p>
      <p style="margin-top:60px"><strong>Principal</strong><br>${data.settings.principal}</p></div>`, type);
  } else if (action === 'report-run') {
    const report = btn.dataset.report;
    const out = document.getElementById('reportOutput');
    const title = document.getElementById('reportTitle');
    const body = document.getElementById('reportBody');
    out.style.display = 'block';
    let html = '';
    if (report === 'students') {
      title.textContent = 'Student Report';
      html = `<table class="table table-sm"><thead><tr><th>Adm No</th><th>Name</th><th>Class</th><th>Status</th></tr></thead><tbody>
        ${data.students.map((s) => `<tr><td>${s.admissionNo}</td><td>${s.name}</td><td>${data.classes.find((c) => c.id === s.classId)?.name}</td><td>${s.status}</td></tr>`).join('')}</tbody></table>`;
    } else if (report === 'fees') {
      title.textContent = 'Fee Collection Report';
      html = `<table class="table table-sm"><thead><tr><th>Receipt</th><th>Student</th><th>Amount</th><th>Date</th></tr></thead><tbody>
        ${data.fees.payments.filter((p) => p.status === 'paid').map((p) => {
          const st = data.students.find((s) => s.id === p.studentId);
          return `<tr><td>${p.receiptNo}</td><td>${st?.name}</td><td>${Utils.formatCurrency(p.amount)}</td><td>${Utils.formatDate(p.date)}</td></tr>`;
        }).join('')}</tbody></table>`;
    } else if (report === 'pending') {
      title.textContent = 'Pending Fees Report';
      html = `<table class="table table-sm"><thead><tr><th>Student</th><th>Type</th><th>Amount</th></tr></thead><tbody>
        ${data.fees.payments.filter((p) => p.status === 'pending').map((p) => {
          const st = data.students.find((s) => s.id === p.studentId);
          return `<tr><td>${st?.name}</td><td>${p.type}</td><td>${Utils.formatCurrency(p.amount)}</td></tr>`;
        }).join('') || '<tr><td colspan="3">No pending fees</td></tr>'}</tbody></table>`;
    } else if (report === 'attendance') {
      title.textContent = 'Attendance Report';
      html = `<p>Total records: ${data.attendance.length}</p>
        <table class="table table-sm"><thead><tr><th>Date</th><th>Student</th><th>Status</th></tr></thead><tbody>
        ${data.attendance.slice(0, 50).map((a) => {
          const st = data.students.find((s) => s.id === a.studentId);
          return `<tr><td>${a.date}</td><td>${st?.name}</td><td>${a.status}</td></tr>`;
        }).join('') || '<tr><td colspan="3">No attendance data</td></tr>'}</tbody></table>`;
    } else if (report === 'teachers') {
      title.textContent = 'Teacher Report';
      html = `<table class="table table-sm"><thead><tr><th>ID</th><th>Name</th><th>Qualification</th><th>Salary</th></tr></thead><tbody>
        ${data.teachers.map((t) => `<tr><td>${t.teacherId}</td><td>${t.name}</td><td>${t.qualification}</td><td>${Utils.formatCurrency(t.salary)}</td></tr>`).join('')}</tbody></table>`;
    } else {
      title.textContent = report.charAt(0).toUpperCase() + report.slice(1) + ' Report';
      html = `<p class="text-muted">Report generated from current system data.</p>`;
    }
    body.innerHTML = html;
  } else if (action === 'backup-export') {
    Utils.downloadJSON(data, `smps-backup-${Utils.today()}.json`);
    Utils.toast('Exported', 'Backup downloaded'); Auth.audit('backup', 'System', 'Data exported');
  } else if (action === 'backup-import') {
    const file = document.getElementById('backupFile').files[0];
    if (!file) { Utils.toast('No file', 'Select a JSON backup file'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported.students || !imported.settings) throw new Error('Invalid');
        if (Utils.confirm('This will replace all current data. Continue?')) {
          DB.save(imported); data = DB.get(); Utils.toast('Restored', 'Backup restored'); Auth.audit('restore', 'System', 'Data restored'); navigate('dashboard');
        }
      } catch { Utils.toast('Error', 'Invalid backup file'); }
    };
    reader.readAsText(file);
  } else if (action === 'backup-reset') {
    if (Utils.confirm('Reset ALL data to factory defaults? This cannot be undone.')) {
      localStorage.removeItem(APP.storageKey); data = DB.init(); Utils.toast('Reset', 'System restored to defaults'); navigate('dashboard');
    }
  } else if (action === 'vehicle-add') {
    openModal(`<div class="modal-header"><h5>Add Vehicle</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form id="vehForm"><div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Vehicle Number</label><input class="form-control" name="number" required /></div>
        <div class="col-md-6"><label class="form-label">Driver Name</label><input class="form-control" name="driver" /></div>
        <div class="col-md-6"><label class="form-label">Driver Phone</label><input class="form-control" name="driverPhone" /></div>
        <div class="col-md-6"><label class="form-label">Route</label><input class="form-control" name="route" /></div>
        <div class="col-md-6"><label class="form-label">Capacity</label><input type="number" class="form-control" name="capacity" value="30" /></div>
      </div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-primary">Add</button></div></form>`);
    document.getElementById('vehForm').onsubmit = (ev) => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      data.transport.vehicles.push({ id: Utils.uid('v'), number: fd.get('number'), driver: fd.get('driver'), driverPhone: fd.get('driverPhone'), route: fd.get('route'), capacity: Number(fd.get('capacity')), status: 'active' });
      DB.save(data); closeModal(); Utils.toast('Added', 'Vehicle registered'); navigate('transport');
    };
  }
}

// ===================== SAVE HELPERS =====================
function saveStudent(fd, editId = null) {
  const obj = { name: fd.get('name'), gender: fd.get('gender'), dob: fd.get('dob'), bloodGroup: fd.get('bloodGroup'), phone: fd.get('phone'), email: fd.get('email'), address: fd.get('address'), classId: fd.get('classId'), sectionId: fd.get('sectionId'), rollNo: fd.get('rollNo'), previousSchool: fd.get('previousSchool'), emergencyContact: fd.get('emergencyContact') };
  if (editId) {
    const idx = data.students.findIndex((s) => s.id === editId);
    if (idx >= 0) data.students[idx] = { ...data.students[idx], ...obj };
    Auth.audit('update', 'Students', obj.name);
  } else {
    const admNo = 'ADM-2025-' + String(data.students.length + 1).padStart(3, '0');
    data.students.push({ id: Utils.uid('s'), admissionNo: admNo, regNo: 'REG-' + String(data.students.length + 1).padStart(3, '0'), ...obj, session: data.settings.session, status: 'active', admissionDate: Utils.today(), photo: null, parentId: null, createdAt: new Date().toISOString() });
    Auth.audit('create', 'Students', obj.name);
  }
  DB.save(data); closeModal(); Utils.toast('Saved', 'Student information saved'); navigate('students');
}

function saveTeacher(fd, editId = null) {
  const obj = { name: fd.get('name'), teacherId: fd.get('teacherId'), qualification: fd.get('qualification'), phone: fd.get('phone'), email: fd.get('email'), salary: Number(fd.get('salary')) || 0, joiningDate: fd.get('joiningDate'), gender: fd.get('gender'), address: fd.get('address') };
  if (editId) {
    const idx = data.teachers.findIndex((t) => t.id === editId);
    if (idx >= 0) data.teachers[idx] = { ...data.teachers[idx], ...obj };
  } else {
    data.teachers.push({ id: Utils.uid('t'), ...obj, subjects: [], classes: [], status: 'active', dob: '', createdAt: new Date().toISOString() });
  }
  DB.save(data); closeModal(); Utils.toast('Saved', 'Teacher saved'); navigate('teachers');
}

function saveStaff(fd, editId = null) {
  const obj = { name: fd.get('name'), staffId: fd.get('staffId'), department: fd.get('department'), position: fd.get('position'), phone: fd.get('phone'), salary: Number(fd.get('salary')) || 0, joiningDate: fd.get('joiningDate') };
  if (editId) {
    const idx = data.staff.findIndex((s) => s.id === editId);
    if (idx >= 0) data.staff[idx] = { ...data.staff[idx], ...obj };
  } else {
    data.staff.push({ id: Utils.uid('st'), ...obj, email: '', status: 'active', createdAt: new Date().toISOString() });
  }
  DB.save(data); closeModal(); Utils.toast('Saved', 'Staff saved'); navigate('staff');
}

function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  modalInstance = bootstrap.Modal.getOrCreateInstance(document.getElementById('appModal'));
  modalInstance.show();
}

function closeModal() { modalInstance?.hide(); }

// ===================== SEARCH =====================
function initSearchFilters() {
  document.getElementById('globalSearch')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2 || currentPage !== 'students') return;
    document.querySelectorAll('#studentsTable tbody tr').forEach((tr) => {
      tr.style.display = tr.dataset.name?.includes(q) || tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
  document.addEventListener('input', (e) => {
    if (['studentSearch', 'studentClassFilter', 'studentStatusFilter'].includes(e.target.id)) {
      const q = (document.getElementById('studentSearch')?.value || '').toLowerCase();
      const cls = document.getElementById('studentClassFilter')?.value || '';
      const st = document.getElementById('studentStatusFilter')?.value || '';
      document.querySelectorAll('#studentsTable tbody tr').forEach((tr) => {
        const matchQ = !q || tr.dataset.name?.includes(q) || tr.textContent.toLowerCase().includes(q);
        const matchC = !cls || tr.dataset.class === cls;
        const matchS = !st || tr.dataset.status === st;
        tr.style.display = matchQ && matchC && matchS ? '' : 'none';
      });
    }
  });
}

function updateNotifications() {
  const unread = data.notifications.filter((n) => !n.read);
  const badge = document.getElementById('notifCount');
  const list = document.getElementById('notifList');
  if (unread.length) { badge.textContent = unread.length; badge.classList.remove('d-none'); }
  else badge.classList.add('d-none');
  list.innerHTML = data.notifications.slice(0, 8).map((n) =>
    `<li><a class="dropdown-item small" href="#"><strong>${Utils.sanitize(n.title)}</strong><br><span class="text-muted">${Utils.sanitize(n.message)}</span></a></li>`
  ).join('') || '<li><span class="dropdown-item text-muted">No notifications</span></li>';
}

// ===================== BOOT =====================

function updateWhatsAppLinks() {
  try {
    const wa = (data && data.settings && data.settings.whatsapp) || '923001234567';
    const link = Utils.waLink(wa, 'Assalam o Alaikum, ' + (data.settings.schoolName || 'School'));
    const el = document.getElementById('whatsappSchool');
    const el2 = document.getElementById('waQuick');
    if (el) el.href = link;
    if (el2) el2.href = link;
  } catch (e) {}
}

function showLogin() {
  document.getElementById('loginScreen').classList.remove('d-none');
  document.getElementById('app').classList.add('d-none');
}

function showApp() {
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('app').classList.remove('d-none');
  document.getElementById('userName').textContent = Auth.current.name;
  document.getElementById('userRole').textContent = Auth.current.role.charAt(0).toUpperCase() + Auth.current.role.slice(1);
  document.getElementById('userAvatar').textContent = Auth.current.name.charAt(0).toUpperCase();
  buildSidebar();
  updateNotifications();
  updateWhatsAppLinks();
  navigate('dashboard');
}

function initLogin() {
  let selectedRole = 'admin';
  document.querySelectorAll('#roleTabs .nav-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#roleTabs .nav-link').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
      const label = document.getElementById('loginLabel');
      if (selectedRole === 'student') label.textContent = 'Student ID / Username';
      else if (selectedRole === 'parent') label.textContent = 'Phone / Email';
      else label.textContent = 'Email / Username';
    });
  });
  document.getElementById('togglePass').addEventListener('click', () => {
    const inp = document.getElementById('loginPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const remember = document.getElementById('rememberMe').checked;
    const result = Auth.attemptLogin(user, pass, selectedRole);
    const err = document.getElementById('loginError');
    if (!result.ok) { err.textContent = result.msg; err.classList.remove('d-none'); return; }
    err.classList.add('d-none');
    Auth.setSession(result.user, remember);
    data = DB.get();
    showApp();
  });
  document.getElementById('forgotLink').addEventListener('click', (e) => {
    e.preventDefault();
    Utils.toast('Password Reset', 'Contact school admin. Default admin: admin / admin123');
  });
}

function initSidebarMobile() {
  document.getElementById('openSidebar')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('show'));
  document.getElementById('closeSidebar')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('show'));
  document.getElementById('logoutBtn')?.addEventListener('click', () => Auth.logout());
  document.getElementById('logoutBtn2')?.addEventListener('click', (e) => { e.preventDefault(); Auth.logout(); });
}

function initSettingsForms() {
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'schoolSettingsForm') {
      e.preventDefault();
      const fd = new FormData(e.target);
      Object.assign(data.settings, { schoolName: fd.get('schoolName'), address: fd.get('address'), phone: fd.get('phone'), email: fd.get('email'), website: fd.get('website'), principal: fd.get('principal'), session: fd.get('session') });
      DB.save(data); updateWhatsAppLinks();
      Utils.toast('Saved', 'School settings updated');
    }
    if (e.target.id === 'passwordForm') {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (fd.get('newPass') !== fd.get('confirmPass')) { Utils.toast('Error', 'Passwords do not match'); return; }
      if (Auth.changePassword(Auth.current.userId, fd.get('oldPass'), fd.get('newPass'))) {
        Utils.toast('Updated', 'Password changed successfully'); e.target.reset();
      } else Utils.toast('Error', 'Current password incorrect');
    }
    if (e.target.id === 'adminAccountForm') {
      e.preventDefault();
      const fd = new FormData(e.target);
      const user = data.users.find((u) => u.id === Auth.current.userId);
      if (user) {
        user.username = fd.get('username'); user.email = fd.get('email'); user.name = fd.get('name');
        DB.save(data); Auth.current.name = user.name; Auth.current.username = user.username;
        document.getElementById('userName').textContent = user.name;
        Utils.toast('Updated', 'Admin account updated');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  data = DB.init();
  initLogin();
  initSidebarMobile();
  initSearchFilters();
  initSettingsForms();
  const session = Auth.getSession();
  if (session) { Auth.current = session; showApp(); }
  else showLogin();
});
