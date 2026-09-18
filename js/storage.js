/**
 * LocalStorage Data Layer for School Management System
 * DEMO ONLY - Replace with real backend (Firebase/Supabase/MySQL) later
 */

const STORAGE_KEYS = {
  students: 'sms_students',
  teachers: 'sms_teachers',
  staff: 'sms_staff',
  parents: 'sms_parents',
  classes: 'sms_classes',
  sections: 'sms_sections',
  subjects: 'sms_subjects',
  attendance: 'sms_attendance',
  teacherAttendance: 'sms_teacher_attendance',
  timetable: 'sms_timetable',
  homework: 'sms_homework',
  exams: 'sms_exams',
  results: 'sms_results',
  fees: 'sms_fees',
  feePayments: 'sms_fee_payments',
  feeStructure: 'sms_fee_structure',
  admissions: 'sms_admissions',
  leaves: 'sms_leaves',
  notices: 'sms_notices',
  notifications: 'sms_notifications',
  users: 'sms_users',
  settings: 'sms_settings',
  currentUser: 'sms_current_user'
};

function generateId(prefix = 'ID') {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

function getData(key) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[key] || key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading data:', key, e);
    return [];
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(STORAGE_KEYS[key] || key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving data:', key, e);
    return false;
  }
}

function updateData(key, id, updates) {
  const data = getData(key);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return false;
  data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
  return saveData(key, data);
}

function deleteData(key, id) {
  const data = getData(key);
  const filtered = data.filter(item => item.id !== id);
  return saveData(key, filtered);
}

function getById(key, id) {
  const data = getData(key);
  return data.find(item => item.id === id) || null;
}

function getSettings() {
  const defaults = {
    schoolName: 'THE SMART MODERN PUBLIC SCHOOL QAMBER',
    schoolAddress: 'Qamber, Pakistan',
    schoolPhone: '+92-300-1234567',
    schoolEmail: 'info@smartmodernschool.edu.pk',
    schoolWebsite: 'www.smartmodernschool.edu.pk',
    principalName: 'Dr. Ahmed Khan',
    registrationNumber: 'SMS-QMB-2020-001',
    logo: '',
    academicSession: '2026-2027',
    currency: 'PKR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    passingPercentage: 50,
    grades: [
      { min: 90, max: 100, grade: 'A+', remark: 'Outstanding' },
      { min: 80, max: 89, grade: 'A', remark: 'Excellent' },
      { min: 70, max: 79, grade: 'B', remark: 'Very Good' },
      { min: 60, max: 69, grade: 'C', remark: 'Good' },
      { min: 50, max: 59, grade: 'D', remark: 'Satisfactory' },
      { min: 0, max: 49, grade: 'F', remark: 'Fail' }
    ]
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function initDemoData() {
  if (localStorage.getItem('sms_initialized')) return;

  // Users (DEMO ONLY - passwords are plain for demo; use hashing in production)
  const users = [
    { id: 'U001', username: 'admin', email: 'admin@smartmodern.edu.pk', password: 'admin123', role: 'admin', name: 'System Admin', status: 'active' },
    { id: 'U002', username: 'principal', email: 'principal@smartmodern.edu.pk', password: 'principal123', role: 'principal', name: 'Dr. Ahmed Khan', status: 'active' },
    { id: 'U003', username: 'teacher1', email: 'sara.ahmed@smartmodern.edu.pk', password: 'teacher123', role: 'teacher', name: 'Sara Ahmed', teacherId: 'T001', status: 'active' },
    { id: 'U004', username: 'accountant', email: 'accounts@smartmodern.edu.pk', password: 'account123', role: 'accountant', name: 'Ali Raza', status: 'active' },
    { id: 'U005', username: 'staff1', email: 'staff@smartmodern.edu.pk', password: 'staff123', role: 'staff', name: 'Fatima Bibi', status: 'active' }
  ];
  saveData('users', users);

  // Classes
  const classes = [
    { id: 'C01', name: 'Grade 1', sections: ['A', 'B'], capacity: 40 },
    { id: 'C02', name: 'Grade 2', sections: ['A', 'B'], capacity: 40 },
    { id: 'C03', name: 'Grade 3', sections: ['A', 'B', 'C'], capacity: 45 },
    { id: 'C04', name: 'Grade 4', sections: ['A', 'B'], capacity: 40 },
    { id: 'C05', name: 'Grade 5', sections: ['A', 'B'], capacity: 40 },
    { id: 'C06', name: 'Grade 6', sections: ['A', 'B'], capacity: 40 }
  ];
  saveData('classes', classes);

  // Subjects
  const subjects = [
    { id: 'SUB01', name: 'English', code: 'ENG', maxMarks: 100, passMarks: 40 },
    { id: 'SUB02', name: 'Urdu', code: 'URD', maxMarks: 100, passMarks: 40 },
    { id: 'SUB03', name: 'Mathematics', code: 'MATH', maxMarks: 100, passMarks: 40 },
    { id: 'SUB04', name: 'Science', code: 'SCI', maxMarks: 100, passMarks: 40 },
    { id: 'SUB05', name: 'Social Studies', code: 'SST', maxMarks: 100, passMarks: 40 },
    { id: 'SUB06', name: 'Computer', code: 'COMP', maxMarks: 50, passMarks: 20 },
    { id: 'SUB07', name: 'Islamiat', code: 'ISL', maxMarks: 50, passMarks: 20 },
    { id: 'SUB08', name: 'Art', code: 'ART', maxMarks: 50, passMarks: 20 }
  ];
  saveData('subjects', subjects);

  // Teachers
  const teachers = [
    { id: 'T001', name: 'Sara Ahmed', fatherName: 'Muhammad Ahmed', gender: 'Female', dob: '1988-05-12', employeeId: 'EMP-T001', phone: '03001234501', email: 'sara.ahmed@smartmodern.edu.pk', address: 'Qamber City', qualification: 'M.A English', experience: 8, joiningDate: '2018-08-01', designation: 'Senior Teacher', subjects: ['SUB01'], classes: ['C01', 'C02'], salary: 65000, status: 'active', photo: '' },
    { id: 'T002', name: 'Bilal Khan', fatherName: 'Asif Khan', gender: 'Male', dob: '1985-03-20', employeeId: 'EMP-T002', phone: '03001234502', email: 'bilal.khan@smartmodern.edu.pk', address: 'Qamber', qualification: 'M.Sc Mathematics', experience: 10, joiningDate: '2016-03-15', designation: 'HOD Math', subjects: ['SUB03'], classes: ['C04', 'C05', 'C06'], salary: 75000, status: 'active', photo: '' },
    { id: 'T003', name: 'Ayesha Malik', fatherName: 'Imran Malik', gender: 'Female', dob: '1990-11-08', employeeId: 'EMP-T003', phone: '03001234503', email: 'ayesha.malik@smartmodern.edu.pk', address: 'Near City Park', qualification: 'B.Ed, M.A Urdu', experience: 6, joiningDate: '2019-09-01', designation: 'Teacher', subjects: ['SUB02'], classes: ['C01', 'C03'], salary: 55000, status: 'active', photo: '' },
    { id: 'T004', name: 'Usman Ali', fatherName: 'Ghulam Ali', gender: 'Male', dob: '1987-07-25', employeeId: 'EMP-T004', phone: '03001234504', email: 'usman.ali@smartmodern.edu.pk', address: 'Qamber Town', qualification: 'M.Sc Physics', experience: 7, joiningDate: '2018-01-10', designation: 'Science Teacher', subjects: ['SUB04'], classes: ['C04', 'C05'], salary: 60000, status: 'active', photo: '' },
    { id: 'T005', name: 'Nadia Hussain', fatherName: 'Tariq Hussain', gender: 'Female', dob: '1992-01-15', employeeId: 'EMP-T005', phone: '03001234505', email: 'nadia.hussain@smartmodern.edu.pk', address: 'Model Town', qualification: 'M.A Education', experience: 5, joiningDate: '2020-04-01', designation: 'Teacher', subjects: ['SUB05'], classes: ['C02', 'C03'], salary: 52000, status: 'active', photo: '' },
    { id: 'T006', name: 'Kamran Shah', fatherName: 'Nawaz Shah', gender: 'Male', dob: '1989-09-30', employeeId: 'EMP-T006', phone: '03001234506', email: 'kamran.shah@smartmodern.edu.pk', address: 'Qamber', qualification: 'MCS', experience: 6, joiningDate: '2019-07-01', designation: 'Computer Teacher', subjects: ['SUB06'], classes: ['C03', 'C04', 'C05', 'C06'], salary: 58000, status: 'active', photo: '' },
    { id: 'T007', name: 'Zainab Fatima', fatherName: 'Syed Ali', gender: 'Female', dob: '1991-04-18', employeeId: 'EMP-T007', phone: '03001234507', email: 'zainab.fatima@smartmodern.edu.pk', address: 'New Colony', qualification: 'M.A Islamic Studies', experience: 4, joiningDate: '2021-02-15', designation: 'Teacher', subjects: ['SUB07'], classes: ['C01', 'C02', 'C03'], salary: 50000, status: 'active', photo: '' },
    { id: 'T008', name: 'Hassan Raza', fatherName: 'Javed Raza', gender: 'Male', dob: '1986-12-05', employeeId: 'EMP-T008', phone: '03001234508', email: 'hassan.raza@smartmodern.edu.pk', address: 'Qamber', qualification: 'B.Ed', experience: 9, joiningDate: '2017-08-20', designation: 'Class Teacher', subjects: ['SUB01', 'SUB05'], classes: ['C06'], salary: 62000, status: 'active', photo: '' },
    { id: 'T009', name: 'Sana Iqbal', fatherName: 'Iqbal Ahmed', gender: 'Female', dob: '1993-06-22', employeeId: 'EMP-T009', phone: '03001234509', email: 'sana.iqbal@smartmodern.edu.pk', address: 'Garden Town', qualification: 'Fine Arts', experience: 3, joiningDate: '2022-09-01', designation: 'Art Teacher', subjects: ['SUB08'], classes: ['C01', 'C02', 'C03', 'C04'], salary: 48000, status: 'active', photo: '' },
    { id: 'T010', name: 'Faisal Mehmood', fatherName: 'Mehmood Khan', gender: 'Male', dob: '1984-02-14', employeeId: 'EMP-T010', phone: '03001234510', email: 'faisal.mehmood@smartmodern.edu.pk', address: 'Qamber City', qualification: 'M.Phil Education', experience: 12, joiningDate: '2015-01-05', designation: 'Vice Principal', subjects: [], classes: [], salary: 90000, status: 'active', photo: '' }
  ];
  saveData('teachers', teachers);

  // Staff
  const staff = [
    { id: 'ST001', name: 'Ali Raza', position: 'Accountant', phone: '03009876501', email: 'accounts@smartmodern.edu.pk', joiningDate: '2019-03-01', salary: 45000, status: 'active', employeeId: 'EMP-S001' },
    { id: 'ST002', name: 'Fatima Bibi', position: 'Clerk', phone: '03009876502', email: 'clerk@smartmodern.edu.pk', joiningDate: '2020-06-15', salary: 35000, status: 'active', employeeId: 'EMP-S002' },
    { id: 'ST003', name: 'Imran Shah', position: 'Librarian', phone: '03009876503', email: 'library@smartmodern.edu.pk', joiningDate: '2018-09-01', salary: 38000, status: 'active', employeeId: 'EMP-S003' },
    { id: 'ST004', name: 'Naveed Ahmed', position: 'Receptionist', phone: '03009876504', email: 'reception@smartmodern.edu.pk', joiningDate: '2021-01-10', salary: 32000, status: 'active', employeeId: 'EMP-S004' },
    { id: 'ST005', name: 'Gulzar Khan', position: 'Security', phone: '03009876505', email: '', joiningDate: '2017-05-20', salary: 28000, status: 'active', employeeId: 'EMP-S005' }
  ];
  saveData('staff', staff);

  // Parents
  const parents = [
    { id: 'P001', fatherName: 'Muhammad Asif', motherName: 'Shazia Asif', phone: '03001111001', email: 'asif@email.com', address: 'House 12, Qamber', occupation: 'Businessman', children: ['S001', 'S002'] },
    { id: 'P002', fatherName: 'Tariq Mehmood', motherName: 'Nasreen Tariq', phone: '03001111002', email: 'tariq@email.com', address: 'Street 5, Model Town', occupation: 'Teacher', children: ['S003'] },
    { id: 'P003', fatherName: 'Shahid Ali', motherName: 'Saima Shahid', phone: '03001111003', email: 'shahid@email.com', address: 'Near Main Bazaar', occupation: 'Engineer', children: ['S004', 'S005'] },
    { id: 'P004', fatherName: 'Kashif Raza', motherName: 'Amina Kashif', phone: '03001111004', email: 'kashif@email.com', address: 'Garden Colony', occupation: 'Doctor', children: ['S006'] },
    { id: 'P005', fatherName: 'Nadeem Akhtar', motherName: 'Farah Nadeem', phone: '03001111005', email: 'nadeem@email.com', address: 'New Housing Society', occupation: 'Banker', children: ['S007'] },
    { id: 'P006', fatherName: 'Javed Iqbal', motherName: 'Rubina Javed', phone: '03001111006', email: 'javed@email.com', address: 'Qamber City', occupation: 'Shopkeeper', children: ['S008', 'S009'] },
    { id: 'P007', fatherName: 'Imtiaz Hussain', motherName: 'Saba Imtiaz', phone: '03001111007', email: 'imtiaz@email.com', address: 'Old Town', occupation: 'Lawyer', children: ['S010'] },
    { id: 'P008', fatherName: 'Waqas Ahmed', motherName: 'Hina Waqas', phone: '03001111008', email: 'waqas@email.com', address: 'Canal Road', occupation: 'Farmer', children: ['S011'] },
    { id: 'P009', fatherName: 'Sajid Khan', motherName: 'Nazia Sajid', phone: '03001111009', email: 'sajid@email.com', address: 'Phase 2', occupation: 'Government Employee', children: ['S012'] },
    { id: 'P010', fatherName: 'Rizwan Ali', motherName: 'Mehwish Rizwan', phone: '03001111010', email: 'rizwan@email.com', address: 'Civil Lines', occupation: 'Business', children: ['S013', 'S014'] }
  ];
  saveData('parents', parents);

  // Students (20+)
  const students = [
    { id: 'S001', admissionNo: 'ADM-2024-001', fullName: 'Ahmed Asif', fatherName: 'Muhammad Asif', motherName: 'Shazia Asif', dob: '2015-04-12', gender: 'Male', classId: 'C03', section: 'A', rollNo: 1, phone: '03001111001', email: '', address: 'House 12, Qamber', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: 'Bright Future School', bloodGroup: 'B+', emergencyContact: '03001111001', parentId: 'P001', status: 'active', photo: '' },
    { id: 'S002', admissionNo: 'ADM-2024-002', fullName: 'Ayesha Asif', fatherName: 'Muhammad Asif', motherName: 'Shazia Asif', dob: '2017-08-22', gender: 'Female', classId: 'C01', section: 'A', rollNo: 3, phone: '03001111001', email: '', address: 'House 12, Qamber', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03001111001', parentId: 'P001', status: 'active', photo: '' },
    { id: 'S003', admissionNo: 'ADM-2023-015', fullName: 'Hassan Tariq', fatherName: 'Tariq Mehmood', motherName: 'Nasreen Tariq', dob: '2014-01-30', gender: 'Male', classId: 'C04', section: 'B', rollNo: 5, phone: '03001111002', email: '', address: 'Street 5, Model Town', city: 'Qamber', admissionDate: '2023-04-05', previousSchool: 'City Public School', bloodGroup: 'O+', emergencyContact: '03001111002', parentId: 'P002', status: 'active', photo: '' },
    { id: 'S004', admissionNo: 'ADM-2024-003', fullName: 'Zainab Shahid', fatherName: 'Shahid Ali', motherName: 'Saima Shahid', dob: '2016-06-18', gender: 'Female', classId: 'C02', section: 'A', rollNo: 2, phone: '03001111003', email: '', address: 'Near Main Bazaar', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'AB+', emergencyContact: '03001111003', parentId: 'P003', status: 'active', photo: '' },
    { id: 'S005', admissionNo: 'ADM-2022-008', fullName: 'Ali Shahid', fatherName: 'Shahid Ali', motherName: 'Saima Shahid', dob: '2013-11-05', gender: 'Male', classId: 'C05', section: 'A', rollNo: 8, phone: '03001111003', email: '', address: 'Near Main Bazaar', city: 'Qamber', admissionDate: '2022-04-10', previousSchool: 'Little Stars Academy', bloodGroup: 'B+', emergencyContact: '03001111003', parentId: 'P003', status: 'active', photo: '' },
    { id: 'S006', admissionNo: 'ADM-2024-004', fullName: 'Fatima Kashif', fatherName: 'Kashif Raza', motherName: 'Amina Kashif', dob: '2015-09-14', gender: 'Female', classId: 'C03', section: 'B', rollNo: 4, phone: '03001111004', email: '', address: 'Garden Colony', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03001111004', parentId: 'P004', status: 'active', photo: '' },
    { id: 'S007', admissionNo: 'ADM-2023-022', fullName: 'Usman Nadeem', fatherName: 'Nadeem Akhtar', motherName: 'Farah Nadeem', dob: '2014-03-25', gender: 'Male', classId: 'C04', section: 'A', rollNo: 1, phone: '03001111005', email: '', address: 'New Housing Society', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Green Valley School', bloodGroup: 'O-', emergencyContact: '03001111005', parentId: 'P005', status: 'active', photo: '' },
    { id: 'S008', admissionNo: 'ADM-2024-005', fullName: 'Sana Javed', fatherName: 'Javed Iqbal', motherName: 'Rubina Javed', dob: '2017-12-01', gender: 'Female', classId: 'C01', section: 'B', rollNo: 7, phone: '03001111006', email: '', address: 'Qamber City', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'B+', emergencyContact: '03001111006', parentId: 'P006', status: 'active', photo: '' },
    { id: 'S009', admissionNo: 'ADM-2021-011', fullName: 'Hamza Javed', fatherName: 'Javed Iqbal', motherName: 'Rubina Javed', dob: '2012-07-19', gender: 'Male', classId: 'C06', section: 'A', rollNo: 3, phone: '03001111006', email: '', address: 'Qamber City', city: 'Qamber', admissionDate: '2021-04-05', previousSchool: 'Public High School', bloodGroup: 'A+', emergencyContact: '03001111006', parentId: 'P006', status: 'active', photo: '' },
    { id: 'S010', admissionNo: 'ADM-2024-006', fullName: 'Maryam Imtiaz', fatherName: 'Imtiaz Hussain', motherName: 'Saba Imtiaz', dob: '2016-02-28', gender: 'Female', classId: 'C02', section: 'B', rollNo: 5, phone: '03001111007', email: '', address: 'Old Town', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'O+', emergencyContact: '03001111007', parentId: 'P007', status: 'active', photo: '' },
    { id: 'S011', admissionNo: 'ADM-2023-030', fullName: 'Bilal Waqas', fatherName: 'Waqas Ahmed', motherName: 'Hina Waqas', dob: '2014-10-10', gender: 'Male', classId: 'C04', section: 'B', rollNo: 9, phone: '03001111008', email: '', address: 'Canal Road', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Village School', bloodGroup: 'AB+', emergencyContact: '03001111008', parentId: 'P008', status: 'active', photo: '' },
    { id: 'S012', admissionNo: 'ADM-2024-007', fullName: 'Noor Sajid', fatherName: 'Sajid Khan', motherName: 'Nazia Sajid', dob: '2015-05-07', gender: 'Female', classId: 'C03', section: 'A', rollNo: 12, phone: '03001111009', email: '', address: 'Phase 2', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'B+', emergencyContact: '03001111009', parentId: 'P009', status: 'active', photo: '' },
    { id: 'S013', admissionNo: 'ADM-2022-019', fullName: 'Omar Rizwan', fatherName: 'Rizwan Ali', motherName: 'Mehwish Rizwan', dob: '2013-08-16', gender: 'Male', classId: 'C05', section: 'B', rollNo: 2, phone: '03001111010', email: '', address: 'Civil Lines', city: 'Qamber', admissionDate: '2022-04-01', previousSchool: 'City Academy', bloodGroup: 'A+', emergencyContact: '03001111010', parentId: 'P010', status: 'active', photo: '' },
    { id: 'S014', admissionNo: 'ADM-2024-008', fullName: 'Hira Rizwan', fatherName: 'Rizwan Ali', motherName: 'Mehwish Rizwan', dob: '2017-01-23', gender: 'Female', classId: 'C01', section: 'A', rollNo: 8, phone: '03001111010', email: '', address: 'Civil Lines', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'O+', emergencyContact: '03001111010', parentId: 'P010', status: 'active', photo: '' },
    { id: 'S015', admissionNo: 'ADM-2023-041', fullName: 'Saad Malik', fatherName: 'Malik Akbar', motherName: 'Saima Akbar', dob: '2014-12-03', gender: 'Male', classId: 'C04', section: 'A', rollNo: 11, phone: '03002222001', email: '', address: 'New Scheme', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Al-Noor School', bloodGroup: 'B+', emergencyContact: '03002222001', parentId: '', status: 'active', photo: '' },
    { id: 'S016', admissionNo: 'ADM-2024-009', fullName: 'Iqra Bano', fatherName: 'Ghulam Mustafa', motherName: 'Rukhsana', dob: '2016-04-09', gender: 'Female', classId: 'C02', section: 'A', rollNo: 9, phone: '03002222002', email: '', address: 'Village Road', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03002222002', parentId: '', status: 'active', photo: '' },
    { id: 'S017', admissionNo: 'ADM-2021-025', fullName: 'Yousuf Khan', fatherName: 'Khan Bahadur', motherName: 'Parveen Khan', dob: '2012-09-27', gender: 'Male', classId: 'C06', section: 'B', rollNo: 6, phone: '03002222003', email: '', address: 'Main Road', city: 'Qamber', admissionDate: '2021-04-01', previousSchool: 'Govt School', bloodGroup: 'O+', emergencyContact: '03002222003', parentId: '', status: 'active', photo: '' },
    { id: 'S018', admissionNo: 'ADM-2024-010', fullName: 'Laiba Sheikh', fatherName: 'Sheikh Naeem', motherName: 'Bushra Naeem', dob: '2015-11-11', gender: 'Female', classId: 'C03', section: 'C', rollNo: 1, phone: '03002222004', email: '', address: 'Sheikh Colony', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'AB+', emergencyContact: '03002222004', parentId: '', status: 'active', photo: '' },
    { id: 'S019', admissionNo: 'ADM-2023-055', fullName: 'Daniyal Abbas', fatherName: 'Abbas Ali', motherName: 'Shaheen Abbas', dob: '2014-06-20', gender: 'Male', classId: 'C04', section: 'B', rollNo: 15, phone: '03002222005', email: '', address: 'Abbas Street', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Sunrise School', bloodGroup: 'B+', emergencyContact: '03002222005', parentId: '', status: 'active', photo: '' },
    { id: 'S020', admissionNo: 'ADM-2024-011', fullName: 'Mahnoor Fatima', fatherName: 'Syed Qasim', motherName: 'Fouzia Qasim', dob: '2017-03-15', gender: 'Female', classId: 'C01', section: 'B', rollNo: 4, phone: '03002222006', email: '', address: 'Syed House', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03002222006', parentId: '', status: 'active', photo: '' }
  ];
  saveData('students', students);

  // Fee Structure
  const feeStructure = [
    { id: 'FS01', classId: 'C01', admissionFee: 5000, tuitionFee: 3500, examFee: 500, computerFee: 300, transportFee: 1500, otherFee: 200 },
    { id: 'FS02', classId: 'C02', admissionFee: 5000, tuitionFee: 3800, examFee: 500, computerFee: 300, transportFee: 1500, otherFee: 200 },
    { id: 'FS03', classId: 'C03', admissionFee: 5500, tuitionFee: 4000, examFee: 600, computerFee: 400, transportFee: 1600, otherFee: 250 },
    { id: 'FS04', classId: 'C04', admissionFee: 5500, tuitionFee: 4200, examFee: 600, computerFee: 400, transportFee: 1600, otherFee: 250 },
    { id: 'FS05', classId: 'C05', admissionFee: 6000, tuitionFee: 4500, examFee: 700, computerFee: 500, transportFee: 1700, otherFee: 300 },
    { id: 'FS06', classId: 'C06', admissionFee: 6000, tuitionFee: 4800, examFee: 700, computerFee: 500, transportFee: 1700, otherFee: 300 }
  ];
  saveData('feeStructure', feeStructure);

  // Sample Fee Payments
  const feePayments = [
    { id: 'FP001', studentId: 'S001', invoiceNo: 'INV-2026-001', month: '2026-09', feeType: 'Tuition', amount: 4000, discount: 0, paidAmount: 4000, remaining: 0, method: 'Cash', paymentDate: '2026-09-05', status: 'paid' },
    { id: 'FP002', studentId: 'S002', invoiceNo: 'INV-2026-002', month: '2026-09', feeType: 'Tuition', amount: 3500, discount: 200, paidAmount: 3300, remaining: 0, method: 'Bank Transfer', paymentDate: '2026-09-04', status: 'paid' },
    { id: 'FP003', studentId: 'S003', invoiceNo: 'INV-2026-003', month: '2026-09', feeType: 'Tuition', amount: 4200, discount: 0, paidAmount: 2000, remaining: 2200, method: 'Cash', paymentDate: '2026-09-03', status: 'partial' },
    { id: 'FP004', studentId: 'S004', invoiceNo: 'INV-2026-004', month: '2026-09', feeType: 'Tuition', amount: 3800, discount: 0, paidAmount: 3800, remaining: 0, method: 'Online', paymentDate: '2026-09-06', status: 'paid' },
    { id: 'FP005', studentId: 'S005', invoiceNo: 'INV-2026-005', month: '2026-09', feeType: 'Tuition', amount: 4500, discount: 500, paidAmount: 4000, remaining: 0, method: 'Cash', paymentDate: '2026-09-02', status: 'paid' }
  ];
  saveData('feePayments', feePayments);

  // Notices
  const notices = [
    { id: 'N001', title: 'Welcome to New Academic Session 2026-2027', description: 'We are excited to welcome all students and parents to the new academic year. Classes will commence from 1st April 2026.', date: '2026-03-15', audience: 'Everyone', priority: 'high', status: 'active' },
    { id: 'N002', title: 'Mid-Term Exams Schedule', description: 'Mid-Term examinations will be held from 15th to 25th October 2026. Detailed schedule will be shared soon.', date: '2026-09-10', audience: 'Students', priority: 'high', status: 'active' },
    { id: 'N003', title: 'Parent-Teacher Meeting', description: 'PTM will be held on 20th September 2026 from 10:00 AM to 2:00 PM. All parents are requested to attend.', date: '2026-09-05', audience: 'Parents', priority: 'medium', status: 'active' },
    { id: 'N004', title: 'Fee Payment Reminder', description: 'Please clear pending fees by 10th of every month to avoid late fee charges.', date: '2026-09-01', audience: 'Parents', priority: 'medium', status: 'active' },
    { id: 'N005', title: 'Sports Day Announcement', description: 'Annual Sports Day will be celebrated on 15th November 2026. Students are encouraged to participate.', date: '2026-09-12', audience: 'Everyone', priority: 'low', status: 'active' }
  ];
  saveData('notices', notices);

  // Notifications
  const notifications = [
    { id: 'NT001', title: 'New Homework Assigned', message: 'Mathematics homework due on 20 Sep', type: 'homework', read: false, date: '2026-09-15', audience: 'Students' },
    { id: 'NT002', title: 'Fee Due Reminder', message: 'September fee pending for some students', type: 'fee', read: false, date: '2026-09-14', audience: 'Admin' },
    { id: 'NT003', title: 'Exam Schedule Published', message: 'Mid-term exam schedule is now available', type: 'exam', read: true, date: '2026-09-10', audience: 'Everyone' }
  ];
  saveData('notifications', notifications);

  // Homework
  const homework = [
    { id: 'HW001', subjectId: 'SUB03', classId: 'C04', section: 'A', teacherId: 'T002', title: 'Chapter 5 Exercises', description: 'Solve exercises 5.1 to 5.4 from textbook.', assignedDate: '2026-09-15', dueDate: '2026-09-20', status: 'active' },
    { id: 'HW002', subjectId: 'SUB01', classId: 'C03', section: 'A', teacherId: 'T001', title: 'Essay Writing', description: 'Write an essay on "My Favorite Season" (150 words).', assignedDate: '2026-09-14', dueDate: '2026-09-18', status: 'active' },
    { id: 'HW003', subjectId: 'SUB04', classId: 'C05', section: 'A', teacherId: 'T004', title: 'Science Project', description: 'Prepare a model on Water Cycle.', assignedDate: '2026-09-12', dueDate: '2026-09-25', status: 'active' }
  ];
  saveData('homework', homework);

  // Exams
  const exams = [
    { id: 'EX001', name: 'Monthly Test - September', type: 'Monthly Test', startDate: '2026-09-25', endDate: '2026-09-28', status: 'upcoming' },
    { id: 'EX002', name: 'Mid Term Examination', type: 'Mid Term', startDate: '2026-10-15', endDate: '2026-10-25', status: 'upcoming' },
    { id: 'EX003', name: 'Final Term', type: 'Final Term', startDate: '2027-03-01', endDate: '2027-03-15', status: 'upcoming' }
  ];
  saveData('exams', exams);

  // Sample Attendance (today)
  const today = new Date().toISOString().split('T')[0];
  const attendance = [
    { id: 'ATT001', date: today, classId: 'C03', section: 'A', records: [
      { studentId: 'S001', status: 'present' },
      { studentId: 'S012', status: 'present' },
      { studentId: 'S018', status: 'absent' }
    ]},
    { id: 'ATT002', date: today, classId: 'C01', section: 'A', records: [
      { studentId: 'S002', status: 'present' },
      { studentId: 'S014', status: 'present' }
    ]}
  ];
  saveData('attendance', attendance);

  // Admissions
  const admissions = [
    { id: 'AD001', applicationNo: 'APP-2026-001', studentName: 'Rayan Ali', fatherName: 'Ali Hassan', motherName: 'Sana Ali', dob: '2018-05-10', gender: 'Male', previousSchool: '', applyingClass: 'C01', phone: '03003333001', email: '', address: 'New Area', applicationDate: '2026-03-20', status: 'pending', documents: [] },
    { id: 'AD002', applicationNo: 'APP-2026-002', studentName: 'Areeba Khan', fatherName: 'Khan Sahib', motherName: 'Nida Khan', dob: '2016-08-22', gender: 'Female', previousSchool: 'Little Angels', applyingClass: 'C02', phone: '03003333002', email: 'areeba@email.com', address: 'Town', applicationDate: '2026-03-18', status: 'approved', documents: [] },
    { id: 'AD003', applicationNo: 'APP-2026-003', studentName: 'Zohaib Malik', fatherName: 'Malik Riaz', motherName: 'Sadia Malik', dob: '2015-01-15', gender: 'Male', previousSchool: '', applyingClass: 'C03', phone: '03003333003', email: '', address: 'Village', applicationDate: '2026-03-22', status: 'rejected', documents: [] }
  ];
  saveData('admissions', admissions);

  // Leaves
  const leaves = [
    { id: 'LV001', applicantType: 'student', applicantId: 'S001', leaveType: 'Sick', fromDate: '2026-09-10', toDate: '2026-09-11', reason: 'Fever', status: 'approved', approvedBy: 'T001' },
    { id: 'LV002', applicantType: 'teacher', applicantId: 'T003', leaveType: 'Personal', fromDate: '2026-09-18', toDate: '2026-09-18', reason: 'Family function', status: 'pending', approvedBy: null }
  ];
  saveData('leaves', leaves);

  // Timetable sample
  const timetable = [
    { id: 'TT001', classId: 'C03', section: 'A', day: 'Monday', period: 1, startTime: '08:00', endTime: '08:40', subjectId: 'SUB01', teacherId: 'T001', room: 'R101' },
    { id: 'TT002', classId: 'C03', section: 'A', day: 'Monday', period: 2, startTime: '08:45', endTime: '09:25', subjectId: 'SUB03', teacherId: 'T002', room: 'R101' },
    { id: 'TT003', classId: 'C03', section: 'A', day: 'Monday', period: 3, startTime: '09:30', endTime: '10:10', subjectId: 'SUB04', teacherId: 'T004', room: 'R101' },
    { id: 'TT004', classId: 'C04', section: 'A', day: 'Tuesday', period: 1, startTime: '08:00', endTime: '08:40', subjectId: 'SUB03', teacherId: 'T002', room: 'R102' }
  ];
  saveData('timetable', timetable);

  // Results sample
  const results = [
    { id: 'RS001', examId: 'EX001', studentId: 'S001', subjectId: 'SUB01', totalMarks: 100, obtainedMarks: 85, grade: 'A', remarks: 'Good' },
    { id: 'RS002', examId: 'EX001', studentId: 'S001', subjectId: 'SUB03', totalMarks: 100, obtainedMarks: 92, grade: 'A+', remarks: 'Excellent' }
  ];
  saveData('results', results);

  saveSettings(getSettings());
  localStorage.setItem('sms_initialized', 'true');
  console.log('Demo data initialized successfully.');
}

// Auto-init on first load
if (typeof window !== 'undefined') {
  initDemoData();
}
