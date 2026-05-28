require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Staff = require('./models/Staff');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const Batch = require('./models/Batch');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Staff.deleteMany({}),
    Teacher.deleteMany({}),
    Student.deleteMany({}),
    Batch.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // Create batches
  const [commandoBatch, platoonBatch] = await Batch.insertMany([
    { name: 'Commando', description: 'Commando Training Program', status: 'Active', maxStudents: 50 },
    { name: 'Platoon Commander', description: 'Platoon Commander Training', status: 'Active', maxStudents: 40 },
  ]);
  console.log('✅ Batches created');

  // Create admin user
  const adminUser = await User.create({
    name: 'Super Admin',
    email: 'admin@jlw.gov.in',
    password: 'Admin@1234',
    role: 'admin',
    phone: '+91 98765 43210',
  });
  await Staff.create({
    user: adminUser._id,
    staffRole: 'Super Administrator',
    department: 'Administration',
    permissions: ['User Management', 'Content Management', 'Batch Management', 'Reports', 'System Settings'],
  });
  console.log('✅ Admin created: admin@jlw.gov.in / Admin@1234');

  // Create teacher users
  const teacher1User = await User.create({
    name: 'Col. Rajesh Kumar',
    email: 'rajesh.kumar@jlw.gov.in',
    password: 'Teacher@1234',
    role: 'teacher',
    phone: '+91 98765 12345',
  });
  const teacher1 = await Teacher.create({
    user: teacher1User._id,
    rank: 'Colonel',
    specialization: 'Military Strategy',
    experience: '15 years',
    assignedBatches: [commandoBatch._id, platoonBatch._id],
    courses: ['Strategy Basics', 'Advanced Tactics', 'Combat Planning'],
  });

  const teacher2User = await User.create({
    name: 'Maj. Priya Sharma',
    email: 'priya.sharma@jlw.gov.in',
    password: 'Teacher@1234',
    role: 'teacher',
    phone: '+91 98765 11111',
  });
  const teacher2 = await Teacher.create({
    user: teacher2User._id,
    rank: 'Major',
    specialization: 'Physical Training',
    experience: '10 years',
    assignedBatches: [commandoBatch._id],
    courses: ['Physical Fitness', 'Endurance Training'],
  });

  // Update batches with teachers
  await Batch.findByIdAndUpdate(commandoBatch._id, { teachers: [teacher1._id, teacher2._id] });
  await Batch.findByIdAndUpdate(platoonBatch._id, { teachers: [teacher1._id] });
  console.log('✅ Teachers created: rajesh.kumar@jlw.gov.in / Teacher@1234');

  // Create student users
  const studentsData = [
    { name: 'Rahul Sharma', email: 'rahul.sharma@student.jlw.gov.in', batch: commandoBatch._id },
    { name: 'Priya Singh', email: 'priya.singh@student.jlw.gov.in', batch: platoonBatch._id },
    { name: 'Raj Patel', email: 'raj.patel@student.jlw.gov.in', batch: commandoBatch._id },
  ];

  for (let i = 0; i < studentsData.length; i++) {
    const sUser = await User.create({
      name: studentsData[i].name,
      email: studentsData[i].email,
      password: 'Student@1234',
      role: 'student',
    });
    const student = await Student.create({
      user: sUser._id,
      assignedBatch: studentsData[i].batch,
      enrollmentId: `STU2024${String(i + 1).padStart(3, '0')}`,
      progress: Math.floor(Math.random() * 40) + 60,
    });
    await Batch.findByIdAndUpdate(studentsData[i].batch, { $push: { students: student._id } });
  }
  console.log('✅ Students created: rahul.sharma@student.jlw.gov.in / Student@1234');

  console.log('\n🎉 Seed complete! Login credentials:');
  console.log('   Admin:   admin@jlw.gov.in        / Admin@1234');
  console.log('   Teacher: rajesh.kumar@jlw.gov.in / Teacher@1234');
  console.log('   Student: rahul.sharma@student.jlw.gov.in / Student@1234');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
