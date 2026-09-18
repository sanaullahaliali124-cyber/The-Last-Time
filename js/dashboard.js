document.addEventListener('DOMContentLoaded', () => {
  initLayout('Dashboard', 'dashboard');
  loadDashboard();
});

function loadDashboard() {
  const students = getData('students').filter(s => s.status === 'active');
  const teachers = getData('teachers').filter(t => t.status === 'active');
  const staff = getData('staff').filter(s => s.status === 'active');
  const classes = getData('classes');
  const fees = getData('feePayments');
  const notices = getData('notices').filter(n => n.status === 'active').slice(0, 5);
  const exams = getData('exams').filter(e => e.status === 'upcoming').slice(0, 4);
  const attendance = getData('attendance');
  const today = new Date().toISOString().split('T')[0];

  // Today's attendance summary
  let present = 0, absent = 0, leave = 0;
  attendance.filter(a => a.date === today).forEach(a => {
    a.records.forEach(r => {
      if (r.status === 'present') present++;
      else if (r.status === 'absent') absent++;
      else if (r.status === 'leave') leave++;
    });
  });
  const totalAtt = present + absent + leave || 1;

  // Fee summary
  const paidTotal = fees.filter(f => f.status === 'paid').reduce((s, f) => s + (f.paidAmount || 0), 0);
  const pendingTotal = fees.filter(f => f.status !== 'paid').reduce((s, f) => s + (f.remaining || 0), 0);

  // Gender stats
  const boys = students.filter(s => s.gender === 'Male').length;
  const girls = students.filter(s => s.gender === 'Female').length;

  // Render stats cards
  const cards = [
    { icon: 'fa-user-graduate', color: 'blue', value: students.length, label: 'Total Students', change: '+5 this month', up: true },
    { icon: 'fa-chalkboard-teacher', color: 'green', value: teachers.length, label: 'Total Teachers', change: 'Active staff', up: true },
    { icon: 'fa-users', color: 'purple', value: staff.length, label: 'Total Staff', change: 'Support team', up: true },
    { icon: 'fa-school', color: 'orange', value: classes.length, label: 'Total Classes', change: 'Grades 1-6', up: true },
    { icon: 'fa-calendar-check', color: 'teal', value: present, label: "Today's Present", change: `${Math.round(present/totalAtt*100)}% attendance`, up: true },
    { icon: 'fa-user-times', color: 'red', value: absent, label: "Today's Absent", change: `${absent} students`, up: false },
    { icon: 'fa-money-bill-wave', color: 'indigo', value: formatCurrency(paidTotal), label: 'Fee Collected', change: 'This month', up: true },
    { icon: 'fa-exclamation-circle', color: 'pink', value: formatCurrency(pendingTotal), label: 'Pending Fees', change: 'Outstanding', up: false }
  ];

  document.getElementById('statsCards').innerHTML = cards.map(c => `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div class="stat-card">
        <div class="stat-icon ${c.color}"><i class="fas ${c.icon}"></i></div>
        <div class="stat-value">${c.value}</div>
        <div class="stat-label">${c.label}</div>
        <div class="stat-change ${c.up ? 'up' : 'down'}">
          <i class="fas fa-${c.up ? 'arrow-up' : 'arrow-down'} me-1"></i>${c.change}
        </div>
      </div>
    </div>
  `).join('');

  // Notices
  document.getElementById('noticesList').innerHTML = notices.length ? notices.map(n => `
    <div class="d-flex align-items-start gap-3 p-3 border-bottom">
      <div class="stat-icon blue" style="width:36px;height:36px;font-size:0.9rem;margin:0;flex-shrink:0">
        <i class="fas fa-bullhorn"></i>
      </div>
      <div>
        <div class="fw-semibold">${sanitize(n.title)}</div>
        <div class="small text-muted">${sanitize(n.description).substring(0, 80)}...</div>
        <div class="small text-muted mt-1"><i class="fas fa-calendar me-1"></i>${formatDate(n.date)} · ${n.audience}</div>
      </div>
    </div>
  `).join('') : '<div class="empty-state py-4"><p>No notices yet</p></div>';

  // Exams
  document.getElementById('examsList').innerHTML = exams.length ? exams.map(e => `
    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div>
        <div class="fw-semibold">${sanitize(e.name)}</div>
        <div class="small text-muted">${e.type}</div>
      </div>
      <div class="text-end">
        <div class="small fw-medium">${formatDate(e.startDate)}</div>
        <span class="badge badge-status badge-pending">${e.status}</span>
      </div>
    </div>
  `).join('') : '<div class="empty-state py-3"><p>No upcoming exams</p></div>';

  // Charts
  new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: ['Boys', 'Girls'],
      datasets: [{ data: [boys, girls], backgroundColor: ['#3b82f6', '#ec4899'], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  new Chart(document.getElementById('attendanceChart'), {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [{ data: [present || 1, absent, leave], backgroundColor: ['#16a34a', '#dc2626', '#0ea5e9'], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  new Chart(document.getElementById('feeChart'), {
    type: 'doughnut',
    data: {
      labels: ['Paid', 'Pending'],
      datasets: [{ data: [paidTotal || 1, pendingTotal || 0], backgroundColor: ['#16a34a', '#f59e0b'], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => formatCurrency(ctx.raw)
          }
        }
      }
    }
  });
}
