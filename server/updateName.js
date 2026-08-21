const mongoose = require('mongoose');
require('dotenv').config();

const updateName = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
    
    // Dynamically find the User model or use a generic update if path is unknown
    // Let's check the models directory first to be sure of the name
    const User = require('./models/User'); 
    
    const result = await User.findOneAndUpdate({}, { name: 'Devraj Solanki' }, { new: true });
    console.log('Update Result:', result);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateName();
