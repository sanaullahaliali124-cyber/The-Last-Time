let currentPage = 1;
const perPage = 10;
let filteredTeachers = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!requirePermission('teachers')) return;
  initLayout('Teachers', 'teachers');
  loadTeachers();
  document.getElementById('searchInput')?.addEventListener('input', () => { currentPage = 1; loadTeachers(); });
  document.getElementById('filterStatus')?.addEventListener('change', () => { currentPage = 1; loadTeachers(); });
});

function loadTeachers() {
  let teachers = getData('teachers');
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const status = document.getElementById('filterStatus')?.value || '';

  filteredTeachers = teachers.filter(t => {
    if (search && !(t.name.toLowerCase().includes(search) || (t.employeeId||'').toLowerCase().includes(search) || (t.email||'').toLowerCase().includes(search))) return false;
    if (status && t.status !== status) return false;
    return true;
  });

  const total = filteredTeachers.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const start = (currentPage - 1) * perPage;
  const pageData = filteredTeachers.slice(start, start + perPage);
  const tbody = document.getElementById('teachersBody');

  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-chalkboard-teacher"></i><h5>No teachers found</h5><button class="btn btn-primary btn-sm mt-2" onclick="openTeacherModal()"><i class="fas fa-plus me-1"></i>Add Teacher</button></div></td></tr>`;
  } else {
    tbody.innerHTML = pageData.map(t => `
      <tr>
        <td><div class="avatar-sm">${(t.name||'?').charAt(0)}</div></td>
        <td>${sanitize(t.employeeId)}</td>
        <td class="fw-medium">${sanitize(t.name)}</td>
        <td>${sanitize(t.designation)}</td>
        <td>${sanitize(t.phone)}</td>
        <td>${sanitize(t.email)}</td>
        <td><span class="badge badge-status badge-${t.status}">${t.status}</span></td>
        <td class="no-print">
          <div class="action-btns">
            <button class="btn btn-sm btn-outline-secondary btn-icon" onclick="editTeacher('${t.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-icon" onclick="deleteTeacher('${t.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>`).join('');
  }
  document.getElementById('tableInfo').textContent = `Showing ${Math.min(start+1,total)}-${Math.min(start+perPage,total)} of ${total}`;
}

function openTeacherModal(id = null) {
  if (!hasPermission('teachers', 'full')) { showToast('Permission denied', 'error'); return; }
  const form = document.getElementById('teacherForm');
  form.reset();
  document.getElementById('teacherId').value = '';
  document.getElementById('teacherModalTitle').textContent = 'Add Teacher';
  if (id) {
    const t = getById('teachers', id);
    if (!t) return;
    document.getElementById('teacherModalTitle').textContent = 'Edit Teacher';
    document.getElementById('teacherId').value = t.id;
    document.getElementById('tName').value = t.name || '';
    document.getElementById('tFather').value = t.fatherName || '';
    document.getElementById('tGender').value = t.gender || '';
    document.getElementById('tDob').value = t.dob || '';
    document.getElementById('tEmpId').value = t.employeeId || '';
    document.getElementById('tPhone').value = t.phone || '';
    document.getElementById('tEmail').value = t.email || '';
    document.getElementById('tAddress').value = t.address || '';
    document.getElementById('tQualification').value = t.qualification || '';
    document.getElementById('tExperience').value = t.experience || '';
    document.getElementById('tJoining').value = t.joiningDate || '';
    document.getElementById('tDesignation').value = t.designation || '';
    document.getElementById('tSalary').value = t.salary || '';
    document.getElementById('tStatus').value = t.status || 'active';
  }
  new bootstrap.Modal(document.getElementById('teacherModal')).show();
}

function editTeacher(id) { openTeacherModal(id); }

function saveTeacher() {
  const form = document.getElementById('teacherForm');
  if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
  const id = document.getElementById('teacherId').value;
  const data = {
    name: document.getElementById('tName').value.trim(),
    fatherName: document.getElementById('tFather').value.trim(),
    gender: document.getElementById('tGender').value,
    dob: document.getElementById('tDob').value,
    employeeId: document.getElementById('tEmpId').value.trim(),
    phone: document.getElementById('tPhone').value.trim(),
    email: document.getElementById('tEmail').value.trim(),
    address: document.getElementById('tAddress').value.trim(),
    qualification: document.getElementById('tQualification').value.trim(),
    experience: parseInt(document.getElementById('tExperience').value) || 0,
    joiningDate: document.getElementById('tJoining').value,
    designation: document.getElementById('tDesignation').value.trim(),
    salary: parseInt(document.getElementById('tSalary').value) || 0,
    status: document.getElementById('tStatus').value,
    subjects: [], classes: [], photo: ''
  };
  if (id) {
    updateData('teachers', id, data);
    showToast('Teacher updated');
  } else {
    data.id = generateId('T');
    const list = getData('teachers');
    list.push(data);
    saveData('teachers', list);
    showToast('Teacher added');
  }
  bootstrap.Modal.getInstance(document.getElementById('teacherModal')).hide();
  loadTeachers();
}

function deleteTeacher(id) {
  if (!hasPermission('teachers', 'full')) { showToast('Permission denied', 'error'); return; }
  confirmAction('Delete Teacher', 'Are you sure?', () => {
    deleteData('teachers', id);
    showToast('Teacher deleted');
    loadTeachers();
  });
}
