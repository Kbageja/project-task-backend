// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create User
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await User.create({
      name: 'John',
      email: 'john@example.com',
      password: hashedPassword
    });
    console.log(`✅ Created user: ${user.email}`);

    // Create Projects
    const project1 = await Project.create({
      name: 'E-Commerce Website',
      userId: user._id
    });

    const project2 = await Project.create({
      name: 'Mobile App Development',
      userId: user._id
    });
    console.log(`✅ Created 2 projects`);

    // Create Tasks for Project 1
    await Task.insertMany([
      {
        title: 'Design homepage mockup',
        description: 'Create initial design mockups for the e-commerce homepage',
        status: 'completed',
        projectId: project1._id,
        userId: user._id
      },
      {
        title: 'Implement shopping cart',
        description: 'Build shopping cart functionality with add, remove features',
        status: 'pending',
        projectId: project1._id,
        userId: user._id
      },
      {
        title: 'Setup payment gateway',
        description: 'Integrate Stripe payment gateway for secure transactions',
        status: 'pending',
        projectId: project1._id,
        userId: user._id
      }
    ]);

    // Create Tasks for Project 2
    await Task.insertMany([
      {
        title: 'Setup React Native project',
        description: 'Initialize React Native project with necessary dependencies',
        status: 'completed',
        projectId: project2._id,
        userId: user._id
      },
      {
        title: 'Design app UI/UX',
        description: 'Create wireframes and designs for all app screens',
        status: 'pending',
        projectId: project2._id,
        userId: user._id
      },
      {
        title: 'Implement authentication',
        description: 'Build login, signup, and password reset functionality',
        status: 'pending',
        projectId: project2._id,
        userId: user._id
      }
    ]);
    console.log(`✅ Created 6 tasks (3 per project)`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();