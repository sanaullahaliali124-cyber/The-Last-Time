let currentStudents = [];
let attendanceMap = {};

document.addEventListener('DOMContentLoaded', () => {
  if (!requirePermission('attendance')) return;
  initLayout('Attendance', 'attendance');
  document.getElementById('attDate').value = new Date().toISOString().split('T')[0];
  const classes = getData('classes');
  const sel = document.getElementById('attClass');
  classes.forEach(c => sel.innerHTML += `<option value="${c.id}">${c.name}</option>`);
  sel.addEventListener('change', function() {
    const sec = document.getElementById('attSection');
    sec.innerHTML = '<option value="">Select</option>';
    const cls = getById('classes', this.value);
    if (cls?.sections) cls.sections.forEach(s => sec.innerHTML += `<option value="${s}">${s}</option>`);
  });
});

function loadAttendanceStudents() {
  const date = document.getElementById('attDate').value;
  const classId = document.getElementById('attClass').value;
  const section = document.getElementById('attSection').value;
  if (!date || !classId || !section) {
    showToast('Please select date, class and section', 'warning');
    return;
  }

  currentStudents = getData('students').filter(s => s.classId === classId && s.section === section && s.status === 'active')
    .sort((a, b) => a.rollNo - b.rollNo);

  // Load existing attendance if any
  const allAtt = getData('attendance');
  const existing = allAtt.find(a => a.date === date && a.classId === classId && a.section === section);
  attendanceMap = {};
  if (existing) {
    existing.records.forEach(r => attendanceMap[r.studentId] = r.status);
  }

  const tbody = document.getElementById('attBody');
  if (!currentStudents.length) {
    tbody.innerHTML = '<tr><td colspan="3"><div class="empty-state"><p>No students in this class/section</p></div></td></tr>';
    document.getElementById('bulkActions').style.display = 'none';
    return;
  }

  document.getElementById('bulkActions').style.display = 'flex';
  tbody.innerHTML = currentStudents.map(s => {
    const st = attendanceMap[s.id] || '';
    return `
      <tr>
        <td>${s.rollNo}</td>
        <td class="fw-medium">${sanitize(s.fullName)}</td>
        <td>
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-success att-btn ${st==='present'?'active-present':''}" data-id="${s.id}" data-status="present" onclick="setStatus(this)">Present</button>
            <button type="button" class="btn btn-outline-danger att-btn ${st==='absent'?'active-absent':''}" data-id="${s.id}" data-status="absent" onclick="setStatus(this)">Absent</button>
            <button type="button" class="btn btn-outline-info att-btn ${st==='leave'?'active-leave':''}" data-id="${s.id}" data-status="leave" onclick="setStatus(this)">Leave</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function setStatus(btn) {
  const id = btn.dataset.id;
  const status = btn.dataset.status;
  attendanceMap[id] = status;
  const group = btn.closest('.btn-group');
  group.querySelectorAll('.att-btn').forEach(b => {
    b.classList.remove('active-present', 'active-absent', 'active-leave');
  });
  btn.classList.add(`active-${status}`);
}

function markAll(status) {
  currentStudents.forEach(s => {
    attendanceMap[s.id] = status;
  });
  document.querySelectorAll('#attBody .btn-group').forEach(group => {
    group.querySelectorAll('.att-btn').forEach(b => {
      b.classList.remove('active-present', 'active-absent', 'active-leave');
      if (b.dataset.status === status) b.classList.add(`active-${status}`);
    });
  });
}

function saveAttendance() {
  if (!hasPermission('attendance', 'manage') && !hasPermission('attendance', 'full')) {
    showToast('Permission denied', 'error');
    return;
  }
  const date = document.getElementById('attDate').value;
  const classId = document.getElementById('attClass').value;
  const section = document.getElementById('attSection').value;
  if (!currentStudents.length) return;

  const records = currentStudents.map(s => ({
    studentId: s.id,
    status: attendanceMap[s.id] || 'absent'
  }));

  let allAtt = getData('attendance');
  const idx = allAtt.findIndex(a => a.date === date && a.classId === classId && a.section === section);
  const entry = { id: idx >= 0 ? allAtt[idx].id : generateId('ATT'), date, classId, section, records };
  if (idx >= 0) allAtt[idx] = entry;
  else allAtt.push(entry);
  saveData('attendance', allAtt);
  showToast('Attendance saved successfully');
}
