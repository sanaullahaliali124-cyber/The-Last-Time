let currentPage = 1;
const perPage = 10;
let filteredStudents = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!requirePermission('students')) return;
  initLayout('Students', 'students');
  populateClassFilter();
  loadStudents();

  document.getElementById('searchInput').addEventListener('input', () => { currentPage = 1; loadStudents(); });
  document.getElementById('filterClass').addEventListener('change', onClassFilterChange);
  document.getElementById('filterSection').addEventListener('change', () => { currentPage = 1; loadStudents(); });
  document.getElementById('filterGender').addEventListener('change', () => { currentPage = 1; loadStudents(); });
  document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; loadStudents(); });

  // Handle ?action=add
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'add') openStudentModal();
  if (params.get('search')) {
    document.getElementById('searchInput').value = params.get('search');
    loadStudents();
  }

  // Class change in modal
  document.getElementById('classId').addEventListener('change', function() {
    populateSections(this.value, 'section');
  });
});

function populateClassFilter() {
  const classes = getData('classes');
  const sel = document.getElementById('filterClass');
  const modalSel = document.getElementById('classId');
  classes.forEach(c => {
    sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    modalSel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });
}

function onClassFilterChange() {
  const classId = document.getElementById('filterClass').value;
  const secSel = document.getElementById('filterSection');
  secSel.innerHTML = '<option value="">All</option>';
  if (classId) {
    const cls = getById('classes', classId);
    if (cls && cls.sections) {
      cls.sections.forEach(s => secSel.innerHTML += `<option value="${s}">${s}</option>`);
    }
  }
  currentPage = 1;
  loadStudents();
}

function populateSections(classId, selectId) {
  const sel = document.getElementById(selectId);
  sel.innerHTML = '<option value="">Select</option>';
  const cls = getById('classes', classId);
  if (cls && cls.sections) {
    cls.sections.forEach(s => sel.innerHTML += `<option value="${s}">${s}</option>`);
  }
}

function loadStudents() {
  let students = getData('students');
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const classId = document.getElementById('filterClass').value;
  const section = document.getElementById('filterSection').value;
  const gender = document.getElementById('filterGender').value;
  const status = document.getElementById('filterStatus').value;

  filteredStudents = students.filter(s => {
    if (search && !(
      s.fullName.toLowerCase().includes(search) ||
      (s.admissionNo || '').toLowerCase().includes(search) ||
      String(s.rollNo).includes(search) ||
      (s.fatherName || '').toLowerCase().includes(search)
    )) return false;
    if (classId && s.classId !== classId) return false;
    if (section && s.section !== section) return false;
    if (gender && s.gender !== gender) return false;
    if (status && s.status !== status) return false;
    return true;
  });

  const total = filteredStudents.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * perPage;
  const pageData = filteredStudents.slice(start, start + perPage);

  const tbody = document.getElementById('studentsBody');
  if (!pageData.length) {
    tbody.innerHTML = `
      <tr><td colspan="10">
        <div class="empty-state">
          <i class="fas fa-user-graduate"></i>
          <h5>No students found</h5>
          <p class="text-muted">Try adjusting filters or add a new student.</p>
          <button class="btn btn-primary btn-sm mt-2" onclick="openStudentModal()"><i class="fas fa-plus me-1"></i>Add Student</button>
        </div>
      </td></tr>`;
  } else {
    tbody.innerHTML = pageData.map(s => `
      <tr>
        <td><div class="avatar-sm" style="background:#64748b">${(s.fullName||'?').charAt(0)}</div></td>
        <td>${sanitize(s.admissionNo)}</td>
        <td><a href="student-profile.html?id=${s.id}" class="fw-medium text-primary">${sanitize(s.fullName)}</a></td>
        <td>${getClassName(s.classId)}</td>
        <td>${sanitize(s.section)}</td>
        <td>${s.rollNo}</td>
        <td>${s.gender}</td>
        <td>${sanitize(s.phone) || '-'}</td>
        <td><span class="badge badge-status badge-${s.status}">${s.status}</span></td>
        <td class="no-print">
          <div class="action-btns">
            <a href="student-profile.html?id=${s.id}" class="btn btn-sm btn-outline-primary btn-icon" title="View"><i class="fas fa-eye"></i></a>
            <button class="btn btn-sm btn-outline-secondary btn-icon" title="Edit" onclick="editStudent('${s.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-icon" title="Delete" onclick="deleteStudent('${s.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('tableInfo').textContent = `Showing ${start + 1}-${Math.min(start + perPage, total)} of ${total} students`;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const ul = document.getElementById('pagination');
  if (totalPages <= 1) { ul.innerHTML = ''; return; }
  let html = '';
  html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="goPage(${currentPage - 1});return false;">Prev</a></li>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" onclick="goPage(${i});return false;">${i}</a></li>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }
  html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="goPage(${currentPage + 1});return false;">Next</a></li>`;
  ul.innerHTML = html;
}

function goPage(p) {
  currentPage = p;
  loadStudents();
}

function openStudentModal(id = null) {
  if (!hasPermission('students', 'full') && !hasPermission('students', 'manage')) {
    showToast('You do not have permission to add/edit students', 'error');
    return;
  }
  const form = document.getElementById('studentForm');
  form.reset();
  form.classList.remove('was-validated');
  document.getElementById('studentId').value = '';
  document.getElementById('studentModalTitle').textContent = 'Add Student';
  document.getElementById('admissionDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('city').value = 'Qamber';
  document.getElementById('status').value = 'active';

  if (id) {
    const s = getById('students', id);
    if (!s) return;
    document.getElementById('studentModalTitle').textContent = 'Edit Student';
    document.getElementById('studentId').value = s.id;
    document.getElementById('fullName').value = s.fullName || '';
    document.getElementById('admissionNo').value = s.admissionNo || '';
    document.getElementById('fatherName').value = s.fatherName || '';
    document.getElementById('motherName').value = s.motherName || '';
    document.getElementById('dob').value = s.dob || '';
    document.getElementById('gender').value = s.gender || '';
    document.getElementById('bloodGroup').value = s.bloodGroup || '';
    document.getElementById('classId').value = s.classId || '';
    populateSections(s.classId, 'section');
    document.getElementById('section').value = s.section || '';
    document.getElementById('rollNo').value = s.rollNo || '';
    document.getElementById('phone').value = s.phone || '';
    document.getElementById('email').value = s.email || '';
    document.getElementById('address').value = s.address || '';
    document.getElementById('city').value = s.city || '';
    document.getElementById('admissionDate').value = s.admissionDate || '';
    document.getElementById('previousSchool').value = s.previousSchool || '';
    document.getElementById('emergencyContact').value = s.emergencyContact || '';
    document.getElementById('status').value = s.status || 'active';
  }
  new bootstrap.Modal(document.getElementById('studentModal')).show();
}

function editStudent(id) {
  openStudentModal(id);
}

function saveStudent() {
  const form = document.getElementById('studentForm');
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const id = document.getElementById('studentId').value;
  const admissionNo = document.getElementById('admissionNo').value.trim();
  const students = getData('students');

  // Duplicate check
  const dup = students.find(s => s.admissionNo === admissionNo && s.id !== id);
  if (dup) {
    showToast('Admission number already exists', 'error');
    return;
  }

  const data = {
    fullName: document.getElementById('fullName').value.trim(),
    admissionNo,
    fatherName: document.getElementById('fatherName').value.trim(),
    motherName: document.getElementById('motherName').value.trim(),
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    bloodGroup: document.getElementById('bloodGroup').value,
    classId: document.getElementById('classId').value,
    section: document.getElementById('section').value,
    rollNo: parseInt(document.getElementById('rollNo').value),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    city: document.getElementById('city').value.trim(),
    admissionDate: document.getElementById('admissionDate').value,
    previousSchool: document.getElementById('previousSchool').value.trim(),
    emergencyContact: document.getElementById('emergencyContact').value.trim(),
    status: document.getElementById('status').value,
    photo: ''
  };

  if (id) {
    updateData('students', id, data);
    showToast('Student updated successfully');
  } else {
    data.id = generateId('S');
    students.push(data);
    saveData('students', students);
    showToast('Student added successfully');
  }

  bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
  loadStudents();
}

function deleteStudent(id) {
  if (!hasPermission('students', 'full')) {
    showToast('You do not have permission to delete', 'error');
    return;
  }
  confirmAction('Delete Student', 'Are you sure you want to delete this student? This action cannot be undone.', () => {
    deleteData('students', id);
    showToast('Student deleted');
    loadStudents();
  });
}

function exportStudents() {
  const data = filteredStudents.map(s => ({
    AdmissionNo: s.admissionNo,
    Name: s.fullName,
    Father: s.fatherName,
    Class: getClassName(s.classId),
    Section: s.section,
    Roll: s.rollNo,
    Gender: s.gender,
    Phone: s.phone,
    Status: s.status
  }));
  exportToCSV(data, 'students_export.csv');
}
