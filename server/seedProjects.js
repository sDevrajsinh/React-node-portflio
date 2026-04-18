require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const staticProjects = [
    {
        title: 'TravelWorld - MERN Stack',
        techDisplay: 'MERN Stack • Full Stack',
        description: 'A comprehensive travel platform allowing users to explore destinations, search for packages, and manage bookings. This project demonstrates full-stack capabilities and complex state management.',
        features: [
            'Dynamic Search & Filtering',
            'Secure User Authentication',
            'Responsive Design across all devices',
            'RESTful API Integration',
            'Interactive Destination Gallery'
        ],
        image: 'TravelCove.png',
        liveLink: 'https://react-nodejs-travelworld.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/react-nodejs-Travelworld',
        tags: ['react', 'javascript', 'mern'],
        featured: true
    },
    {
        title: 'Luxury Hotel Booking',
        techDisplay: 'React JS • Frontend',
        description: 'A premium hotel reservation interface featuring interactive booking components and high-end aesthetics.',
        features: [
            'Interactive UI Components',
            'Seamless Navigation',
            'Modern Material Design',
            'Optimized Performance'
        ],
        image: 'Hotel coverPage.png',
        liveLink: 'https://react-luxury-hotels.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/React-Luxury-Hotels',
        tags: ['react', 'javascript'],
        featured: false
    },
    {
        title: 'Travel Website UI',
        techDisplay: 'HTML • CSS • JS',
        description: 'A responsive travel website built using HTML, CSS, and JavaScript, showcasing destinations, packages, and interactive UI elements.',
        features: [
            'Responsive Layout Design',
            'Interactive Navigation Menu',
            'Image-Based Destination Sections',
            'Basic JavaScript Interactions'
        ],
        image: 'css coverPage.png',
        liveLink: 'https://css-travel-website-lake.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/CSS_travel_website',
        tags: ['html', 'css', 'javascript'],
        featured: false
    },
    {
        title: 'Bootstrap Multi-Section Website',
        techDisplay: 'Bootstrap • UI/UX',
        description: 'A modern multi-section website built using Bootstrap 5, featuring clean layout, responsive design, and structured content sections.',
        features: [
            'Bootstrap 5 Grid System',
            'Responsive Layout Design',
            'Reusable UI Components',
            'Clean and Structured Sections'
        ],
        image: 'Bootstrap coverPage.png',
        liveLink: 'https://bootstrap-layers-websit.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/Bootstrap-Layers-websit',
        tags: ['bootstrap', 'css'],
        featured: false
    },
    {
        title: 'JavaScript CRUD App',
        techDisplay: 'Vanilla JS • Web Storage',
        description: 'A multi-page CRUD application built with Vanilla JavaScript, allowing users to add, edit, and delete records with data stored in LocalStorage.',
        features: [
            'Add, Edit, and Delete Records',
            'LocalStorage Data Persistence',
            'Multi-Page Navigation',
            'Form Input Validation'
        ],
        image: 'jscove1.png',
        liveLink: 'https://js-multi-page.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/JS-MultiPage',
        tags: ['javascript'],
        featured: false
    },
    {
        title: 'JavaScript Expense Tracker',
        techDisplay: 'Vanilla JS • Web Storage',
        description: 'A simple and responsive expense tracker application built with JavaScript, allowing users to manage daily expenses with data stored in LocalStorage.',
        features: [
            'Add and Delete Expenses',
            'Track Income and Spending',
            'LocalStorage Data Persistence',
            'Simple and Clean UI'
        ],
        image: 'jscover2.png',
        liveLink: 'https://java-script-expense.vercel.app/',
        sourceLink: 'https://github.com/sDevrajsinh/JavaScript-Expense',
        tags: ['javascript', 'expense', 'tracker'],
        featured: false
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio');
        console.log('MongoDB connected.');
        
        // Wipe existing projects
        await Project.deleteMany();
        console.log('Existing projects cleared.');

        // Insert standard projects
        await Project.insertMany(staticProjects);
        console.log('Static projects seeded successfully!');

        process.exit();
    } catch (err) {
        console.error('Failed', err);
        process.exit(1);
    }
};

connectDB();
