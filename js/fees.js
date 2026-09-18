document.addEventListener('DOMContentLoaded', () => {
  if (!requirePermission('fees')) return;
  initLayout('Fees', 'fees');
  document.getElementById('feeMonth').value = new Date().toISOString().slice(0, 7);

  const students = getData('students').filter(s => s.status === 'active');
  const sel = document.getElementById('feeStudent');
  students.forEach(s => {
    sel.innerHTML += `<option value="${s.id}">${s.fullName} (${s.admissionNo}) - ${getClassName(s.classId)}</option>`;
  });

  loadHistory();
  loadPending();
  loadStructure();
});

function collectFee() {
  if (!hasPermission('fees', 'full') && !hasPermission('fees', 'manage')) {
    showToast('Permission denied', 'error');
    return;
  }
  const studentId = document.getElementById('feeStudent').value;
  const month = document.getElementById('feeMonth').value;
  const feeType = document.getElementById('feeType').value;
  const amount = parseFloat(document.getElementById('feeAmount').value) || 0;
  const discount = parseFloat(document.getElementById('feeDiscount').value) || 0;
  const paid = parseFloat(document.getElementById('feePaid').value) || 0;
  const method = document.getElementById('feeMethod').value;

  if (!studentId || !month || amount <= 0) {
    showToast('Please fill required fields', 'warning');
    return;
  }

  const remaining = Math.max(0, amount - discount - paid);
  const status = remaining === 0 ? 'paid' : (paid > 0 ? 'partial' : 'pending');
  const invoiceNo = 'INV-' + Date.now().toString().slice(-8);

  const payment = {
    id: generateId('FP'),
    studentId,
    invoiceNo,
    month,
    feeType,
    amount,
    discount,
    paidAmount: paid,
    remaining,
    method,
    paymentDate: new Date().toISOString().split('T')[0],
    status
  };

  const list = getData('feePayments');
  list.push(payment);
  saveData('feePayments', list);
  showToast('Fee collected successfully');
  document.getElementById('feeForm').reset();
  document.getElementById('feeMonth').value = new Date().toISOString().slice(0, 7);
  loadHistory();
  loadPending();

  // Open receipt
  window.open(`fee-receipt.html?id=${payment.id}`, '_blank');
}

function loadHistory() {
  const payments = getData('feePayments').slice().reverse();
  const tbody = document.getElementById('historyBody');
  if (!payments.length) {
    tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state py-3">No payments yet</div></td></tr>';
    return;
  }
  tbody.innerHTML = payments.map(p => `
    <tr>
      <td><a href="fee-receipt.html?id=${p.id}" target="_blank">${p.invoiceNo}</a></td>
      <td>${getStudentName(p.studentId)}</td>
      <td>${p.month}</td>
      <td>${formatCurrency(p.amount)}</td>
      <td>${formatCurrency(p.paidAmount)}</td>
      <td>${p.method}</td>
      <td>${formatDate(p.paymentDate)}</td>
      <td><span class="badge badge-status badge-${p.status === 'paid' ? 'paid' : p.status === 'partial' ? 'partial' : 'pending'}">${p.status}</span></td>
    </tr>`).join('');
}

function loadPending() {
  const payments = getData('feePayments').filter(p => p.status !== 'paid');
  const tbody = document.getElementById('pendingBody');
  if (!payments.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state py-3">No pending fees</div></td></tr>';
    return;
  }
  tbody.innerHTML = payments.map(p => {
    const s = getById('students', p.studentId);
    return `
      <tr>
        <td>${getStudentName(p.studentId)}</td>
        <td>${s ? getClassName(s.classId) : '-'}</td>
        <td>${p.month}</td>
        <td>${formatCurrency(p.amount)}</td>
        <td>${formatCurrency(p.paidAmount)}</td>
        <td class="text-danger fw-medium">${formatCurrency(p.remaining)}</td>
        <td><span class="badge badge-status badge-pending">${p.status}</span></td>
      </tr>`;
  }).join('');
}

function loadStructure() {
  const structure = getData('feeStructure');
  const tbody = document.getElementById('structureBody');
  tbody.innerHTML = structure.map(f => `
    <tr>
      <td class="fw-medium">${getClassName(f.classId)}</td>
      <td>${formatCurrency(f.admissionFee)}</td>
      <td>${formatCurrency(f.tuitionFee)}</td>
      <td>${formatCurrency(f.examFee)}</td>
      <td>${formatCurrency(f.computerFee)}</td>
      <td>${formatCurrency(f.transportFee)}</td>
      <td>${formatCurrency(f.otherFee)}</td>
    </tr>`).join('');
}
