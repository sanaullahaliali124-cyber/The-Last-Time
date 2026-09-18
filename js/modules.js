/**
 * Generic module loaders for remaining pages
 * Provides functional list + CRUD patterns using LocalStorage
 */

function initModulePage(moduleKey, pageTitle, activeNav, options = {}) {
  document.addEventListener('DOMContentLoaded', () => {
    if (!requirePermission(moduleKey)) return;
    initLayout(pageTitle, activeNav);
    if (typeof options.loader === 'function') options.loader();
  });
}

// ========== STAFF ==========
function loadStaffModule() {
  const content = document.getElementById('moduleContent');
  const staff = getData('staff');
  content.innerHTML = `
    <div class="d-flex justify-content-between mb-3">
      <input type="text" class="form-control w-auto" id="staffSearch" placeholder="Search staff..." oninput="renderStaffTable()">
      <button class="btn btn-primary btn-sm" onclick="openStaffModal()"><i class="fas fa-plus me-1"></i>Add Staff</button>
    </div>
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>ID</th><th>Name</th><th>Position</th><th>Phone</th><th>Joining</th><th>Salary</th><th>Status</th><th>Actions</th>
    </tr></thead><tbody id="staffBody"></tbody></table></div>
    <div class="modal fade" id="staffModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Staff</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><form id="staffForm">
        <input type="hidden" id="stId">
        <div class="mb-2"><label class="form-label">Name *</label><input class="form-control" id="stName" required></div>
        <div class="mb-2"><label class="form-label">Position</label>
          <select class="form-select" id="stPos"><option>Accountant</option><option>Clerk</option><option>Librarian</option><option>Receptionist</option><option>Security</option><option>Other</option></select>
        </div>
        <div class="mb-2"><label class="form-label">Phone</label><input class="form-control" id="stPhone"></div>
        <div class="mb-2"><label class="form-label">Email</label><input class="form-control" id="stEmail" type="email"></div>
        <div class="mb-2"><label class="form-label">Joining Date</label><input class="form-control" id="stJoin" type="date"></div>
        <div class="mb-2"><label class="form-label">Salary</label><input class="form-control" id="stSalary" type="number"></div>
        <div class="mb-2"><label class="form-label">Status</label><select class="form-select" id="stStatus"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
      </form></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary" onclick="saveStaff()">Save</button></div>
    </div></div></div>`;
  renderStaffTable();
}

function renderStaffTable() {
  const q = (document.getElementById('staffSearch')?.value || '').toLowerCase();
  let list = getData('staff');
  if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || (s.position||'').toLowerCase().includes(q));
  document.getElementById('staffBody').innerHTML = list.map(s => `
    <tr>
      <td>${s.employeeId||s.id}</td><td>${sanitize(s.name)}</td><td>${sanitize(s.position)}</td>
      <td>${sanitize(s.phone)}</td><td>${formatDate(s.joiningDate)}</td><td>${formatCurrency(s.salary)}</td>
      <td><span class="badge badge-status badge-${s.status}">${s.status}</span></td>
      <td><button class="btn btn-sm btn-outline-secondary btn-icon" onclick="editStaff('${s.id}')"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-outline-danger btn-icon" onclick="delStaff('${s.id}')"><i class="fas fa-trash"></i></button></td>
    </tr>`).join('') || '<tr><td colspan="8"><div class="empty-state">No staff found</div></td></tr>';
}

function openStaffModal(id) {
  document.getElementById('staffForm').reset();
  document.getElementById('stId').value = '';
  if (id) {
    const s = getById('staff', id);
    if (s) {
      document.getElementById('stId').value = s.id;
      document.getElementById('stName').value = s.name || '';
      document.getElementById('stPos').value = s.position || 'Other';
      document.getElementById('stPhone').value = s.phone || '';
      document.getElementById('stEmail').value = s.email || '';
      document.getElementById('stJoin').value = s.joiningDate || '';
      document.getElementById('stSalary').value = s.salary || '';
      document.getElementById('stStatus').value = s.status || 'active';
    }
  }
  new bootstrap.Modal(document.getElementById('staffModal')).show();
}
function editStaff(id) { openStaffModal(id); }
function saveStaff() {
  const id = document.getElementById('stId').value;
  const data = {
    name: document.getElementById('stName').value.trim(),
    position: document.getElementById('stPos').value,
    phone: document.getElementById('stPhone').value.trim(),
    email: document.getElementById('stEmail').value.trim(),
    joiningDate: document.getElementById('stJoin').value,
    salary: parseInt(document.getElementById('stSalary').value) || 0,
    status: document.getElementById('stStatus').value,
    employeeId: id ? undefined : 'EMP-S' + Date.now().toString().slice(-4)
  };
  if (id) updateData('staff', id, data);
  else { data.id = generateId('ST'); const l = getData('staff'); l.push(data); saveData('staff', l); }
  bootstrap.Modal.getInstance(document.getElementById('staffModal')).hide();
  showToast('Saved');
  renderStaffTable();
}
function delStaff(id) {
  confirmAction('Delete', 'Delete this staff member?', () => { deleteData('staff', id); showToast('Deleted'); renderStaffTable(); });
}

// ========== PARENTS ==========
function loadParentsModule() {
  const content = document.getElementById('moduleContent');
  content.innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>ID</th><th>Father/Guardian</th><th>Mother</th><th>Phone</th><th>Email</th><th>Occupation</th><th>Children</th>
    </tr></thead><tbody id="parentsBody"></tbody></table></div>`;
  const parents = getData('parents');
  document.getElementById('parentsBody').innerHTML = parents.map(p => `
    <tr>
      <td>${p.id}</td><td>${sanitize(p.fatherName)}</td><td>${sanitize(p.motherName)}</td>
      <td>${sanitize(p.phone)}</td><td>${sanitize(p.email)}</td><td>${sanitize(p.occupation)}</td>
      <td>${(p.children||[]).map(c => getStudentName(c)).join(', ') || '-'}</td>
    </tr>`).join('') || '<tr><td colspan="7"><div class="empty-state">No parents</div></td></tr>';
}

// ========== CLASSES ==========
function loadClassesModule() {
  const content = document.getElementById('moduleContent');
  const classes = getData('classes');
  content.innerHTML = `
    <div class="row g-3">
      ${classes.map(c => `
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon blue"><i class="fas fa-school"></i></div>
            <div class="stat-value">${c.name}</div>
            <div class="stat-label">Sections: ${(c.sections||[]).join(', ')}</div>
            <div class="small text-muted mt-2">Capacity: ${c.capacity || 40}</div>
            <div class="small">Students: ${getData('students').filter(s => s.classId === c.id && s.status==='active').length}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

// ========== SUBJECTS ==========
function loadSubjectsModule() {
  const subjects = getData('subjects');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Code</th><th>Name</th><th>Max Marks</th><th>Pass Marks</th>
    </tr></thead><tbody>
      ${subjects.map(s => `<tr><td>${s.code}</td><td>${s.name}</td><td>${s.maxMarks}</td><td>${s.passMarks}</td></tr>`).join('')}
    </tbody></table></div>`;
}

// ========== TIMETABLE ==========
function loadTimetableModule() {
  const tt = getData('timetable');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Class</th><th>Section</th><th>Day</th><th>Period</th><th>Time</th><th>Subject</th><th>Teacher</th><th>Room</th>
    </tr></thead><tbody>
      ${tt.map(t => `<tr>
        <td>${getClassName(t.classId)}</td><td>${t.section}</td><td>${t.day}</td><td>${t.period}</td>
        <td>${t.startTime}-${t.endTime}</td><td>${getSubjectName(t.subjectId)}</td>
        <td>${getTeacherName(t.teacherId)}</td><td>${t.room}</td>
      </tr>`).join('') || '<tr><td colspan="8"><div class="empty-state">No timetable entries</div></td></tr>'}
    </tbody></table></div>`;
}

// ========== HOMEWORK ==========
function loadHomeworkModule() {
  const hw = getData('homework');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Title</th><th>Subject</th><th>Class</th><th>Teacher</th><th>Assigned</th><th>Due</th><th>Status</th>
    </tr></thead><tbody>
      ${hw.map(h => `<tr>
        <td class="fw-medium">${sanitize(h.title)}</td>
        <td>${getSubjectName(h.subjectId)}</td>
        <td>${getClassName(h.classId)}-${h.section}</td>
        <td>${getTeacherName(h.teacherId)}</td>
        <td>${formatDate(h.assignedDate)}</td>
        <td>${formatDate(h.dueDate)}</td>
        <td><span class="badge badge-status badge-active">${h.status}</span></td>
      </tr>`).join('') || '<tr><td colspan="7"><div class="empty-state">No homework</div></td></tr>'}
    </tbody></table></div>`;
}

// ========== EXAMS ==========
function loadExamsModule() {
  const exams = getData('exams');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Exam</th><th>Type</th><th>Start</th><th>End</th><th>Status</th>
    </tr></thead><tbody>
      ${exams.map(e => `<tr>
        <td class="fw-medium">${sanitize(e.name)}</td><td>${e.type}</td>
        <td>${formatDate(e.startDate)}</td><td>${formatDate(e.endDate)}</td>
        <td><span class="badge badge-status badge-pending">${e.status}</span></td>
      </tr>`).join('')}
    </tbody></table></div>`;
}

// ========== RESULTS ==========
function loadResultsModule() {
  const results = getData('results');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Student</th><th>Subject</th><th>Total</th><th>Obtained</th><th>Grade</th><th>Remarks</th>
    </tr></thead><tbody>
      ${results.map(r => `<tr>
        <td>${getStudentName(r.studentId)}</td>
        <td>${getSubjectName(r.subjectId)}</td>
        <td>${r.totalMarks}</td><td>${r.obtainedMarks}</td>
        <td><span class="badge bg-primary">${r.grade}</span></td>
        <td>${sanitize(r.remarks)}</td>
      </tr>`).join('') || '<tr><td colspan="6"><div class="empty-state">No results entered</div></td></tr>'}
    </tbody></table></div>`;
}

// ========== ADMISSIONS ==========
function loadAdmissionsModule() {
  const ads = getData('admissions');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>App No</th><th>Student</th><th>Father</th><th>Class</th><th>Date</th><th>Status</th><th>Actions</th>
    </tr></thead><tbody>
      ${ads.map(a => `<tr>
        <td>${a.applicationNo}</td><td>${sanitize(a.studentName)}</td><td>${sanitize(a.fatherName)}</td>
        <td>${getClassName(a.applyingClass)}</td><td>${formatDate(a.applicationDate)}</td>
        <td><span class="badge badge-status badge-${a.status === 'approved' ? 'approved' : a.status === 'rejected' ? 'rejected' : 'pending'}">${a.status}</span></td>
        <td>
          ${a.status === 'pending' ? `
            <button class="btn btn-sm btn-success" onclick="updateAdmission('${a.id}','approved')">Approve</button>
            <button class="btn btn-sm btn-danger" onclick="updateAdmission('${a.id}','rejected')">Reject</button>
          ` : '-'}
        </td>
      </tr>`).join('')}
    </tbody></table></div>`;
}

function updateAdmission(id, status) {
  updateData('admissions', id, { status });
  showToast('Application ' + status);
  loadAdmissionsModule();
}

// ========== LEAVES ==========
function loadLeavesModule() {
  const leaves = getData('leaves');
  document.getElementById('moduleContent').innerHTML = `
    <div class="table-responsive"><table class="table"><thead><tr>
      <th>Type</th><th>Applicant</th><th>Leave Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th>
    </tr></thead><tbody>
      ${leaves.map(l => `<tr>
        <td>${l.applicantType}</td>
        <td>${l.applicantType === 'student' ? getStudentName(l.applicantId) : getTeacherName(l.applicantId)}</td>
        <td>${l.leaveType}</td><td>${formatDate(l.fromDate)}</td><td>${formatDate(l.toDate)}</td>
        <td>${sanitize(l.reason)}</td>
        <td><span class="badge badge-status badge-${l.status === 'approved' ? 'approved' : l.status === 'rejected' ? 'rejected' : 'pending'}">${l.status}</span></td>
      </tr>`).join('') || '<tr><td colspan="7"><div class="empty-state">No leave records</div></td></tr>'}
    </tbody></table></div>`;
}

// ========== NOTICES ==========
function loadNoticesModule() {
  const notices = getData('notices');
  document.getElementById('moduleContent').innerHTML = `
    <div class="list-group">
      ${notices.map(n => `
        <div class="list-group-item">
          <div class="d-flex justify-content-between">
            <h6 class="mb-1">${sanitize(n.title)}</h6>
            <span class="badge bg-${n.priority === 'high' ? 'danger' : n.priority === 'medium' ? 'warning' : 'secondary'}">${n.priority}</span>
          </div>
          <p class="mb-1 small">${sanitize(n.description)}</p>
          <small class="text-muted">${formatDate(n.date)} · ${n.audience}</small>
        </div>`).join('') || '<div class="empty-state">No notices</div>'}
    </div>`;
}

// ========== NOTIFICATIONS ==========
function loadNotificationsModule() {
  const notes = getData('notifications');
  document.getElementById('moduleContent').innerHTML = `
    <div class="list-group">
      ${notes.map(n => `
        <div class="list-group-item ${n.read ? '' : 'bg-light'}">
          <div class="d-flex justify-content-between">
            <strong>${sanitize(n.title)}</strong>
            ${!n.read ? '<span class="badge bg-primary">New</span>' : ''}
          </div>
          <p class="mb-0 small">${sanitize(n.message)}</p>
          <small class="text-muted">${formatDate(n.date)}</small>
        </div>`).join('') || '<div class="empty-state">No notifications</div>'}
    </div>`;
}

// ========== REPORTS ==========
function loadReportsModule() {
  document.getElementById('moduleContent').innerHTML = `
    <div class="row g-3">
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='students.html'">
        <div class="stat-icon blue"><i class="fas fa-user-graduate"></i></div>
        <div class="stat-label">Student List Report</div>
      </div></div>
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='attendance.html'">
        <div class="stat-icon green"><i class="fas fa-calendar-check"></i></div>
        <div class="stat-label">Attendance Report</div>
      </div></div>
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='fees.html'">
        <div class="stat-icon orange"><i class="fas fa-money-bill"></i></div>
        <div class="stat-label">Fee Collection Report</div>
      </div></div>
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='exams.html'">
        <div class="stat-icon purple"><i class="fas fa-file-alt"></i></div>
        <div class="stat-label">Exam Results Report</div>
      </div></div>
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='teachers.html'">
        <div class="stat-icon teal"><i class="fas fa-chalkboard-teacher"></i></div>
        <div class="stat-label">Teacher Report</div>
      </div></div>
      <div class="col-md-4"><div class="stat-card" style="cursor:pointer" onclick="location.href='admissions.html'">
        <div class="stat-icon pink"><i class="fas fa-user-plus"></i></div>
        <div class="stat-label">Admission Report</div>
      </div></div>
    </div>
    <p class="text-muted mt-3 small">Click a report type to view detailed data. Use Export CSV on list pages.</p>`;
}

// ========== SETTINGS ==========
function loadSettingsModule() {
  const s = getSettings();
  document.getElementById('moduleContent').innerHTML = `
    <form id="settingsForm" class="row g-3">
      <div class="col-12"><h6>School Profile</h6></div>
      <div class="col-md-6"><label class="form-label">School Name</label><input class="form-control" id="setName" value="${sanitize(s.schoolName)}"></div>
      <div class="col-md-6"><label class="form-label">Principal</label><input class="form-control" id="setPrincipal" value="${sanitize(s.principalName)}"></div>
      <div class="col-md-6"><label class="form-label">Address</label><input class="form-control" id="setAddress" value="${sanitize(s.schoolAddress)}"></div>
      <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" id="setPhone" value="${sanitize(s.schoolPhone)}"></div>
      <div class="col-md-6"><label class="form-label">Email</label><input class="form-control" id="setEmail" value="${sanitize(s.schoolEmail)}"></div>
      <div class="col-md-6"><label class="form-label">Academic Session</label><input class="form-control" id="setSession" value="${sanitize(s.academicSession)}"></div>
      <div class="col-md-4"><label class="form-label">Currency</label><input class="form-control" id="setCurrency" value="${sanitize(s.currency)}"></div>
      <div class="col-md-4"><label class="form-label">Passing %</label><input class="form-control" type="number" id="setPass" value="${s.passingPercentage}"></div>
      <div class="col-12"><button type="button" class="btn btn-primary" onclick="saveSettingsForm()">Save Settings</button></div>
    </form>
    <hr>
    <div class="alert alert-info small"><strong>DEMO MODE:</strong> All data is stored in browser LocalStorage. Clear site data to reset demo.</div>`;
}

function saveSettingsForm() {
  const settings = getSettings();
  settings.schoolName = document.getElementById('setName').value;
  settings.principalName = document.getElementById('setPrincipal').value;
  settings.schoolAddress = document.getElementById('setAddress').value;
  settings.schoolPhone = document.getElementById('setPhone').value;
  settings.schoolEmail = document.getElementById('setEmail').value;
  settings.academicSession = document.getElementById('setSession').value;
  settings.currency = document.getElementById('setCurrency').value;
  settings.passingPercentage = parseInt(document.getElementById('setPass').value) || 50;
  saveSettings(settings);
  showToast('Settings saved');
}
