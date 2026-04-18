# 📚 CONVERSION GUIDE - HTML/CSS/JS to React

## Complete Component Breakdown

This document explains how each part of the original portfolio was converted to React.

---

## 🧩 Component 1: Navbar.jsx

### Original Code (HTML + JS):
```html
<nav id="navbar">
  <div class="nav-container">
    <a href="#home" class="logo">DevSolanki</a>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <!-- more links -->
    </ul>
    <div class="mobile-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</nav>
```

```javascript
// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Navbar Background
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50 
    ? 'rgba(26,26,26,0.98)' 
    : 'rgba(26,26,26,0.95)';
});
```

### React Conversion:
```jsx
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // State replaces classList.toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState('rgba(26,26,26,0.95)');

  // useEffect replaces addEventListener
  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50 
        ? 'rgba(26,26,26,0.98)' 
        : 'rgba(26,26,26,0.95)');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" style={{ background: navBackground }}>
      <div className="nav-container">
        <a href="#home" className="logo">DevSolanki</a>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* links */}
        </ul>
        <div 
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};
```

### Key Conversions:
- `document.querySelector` → `useState` for state management
- `addEventListener` → `useEffect` hook
- `classList.toggle` → Conditional className
- Event cleanup in `useEffect` return function

---

## 🧩 Component 2: Hero.jsx

### Original Code (JS):
```javascript
const heroTypingText = document.querySelector('.hero-subtitle');
const phrases = ['Full Stack Developer', 'Frontend Specialist', ...];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeHero() {
  const currentPhrase = phrases[phraseIndex];
  heroTypingText.textContent = currentPhrase.substring(0, charIndex);
  let typingSpeed = isDeleting ? Math.random() * 50 + 50 : Math.random() * 100 + 50;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  charIndex += isDeleting ? -1 : 1;
  setTimeout(typeHero, typingSpeed);
}
```

### React Conversion:
```jsx
const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = ['Full Stack Developer', 'Frontend Specialist', ...];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? Math.random() * 50 + 50 : Math.random() * 100 + 50;

    const typeTimeout = setTimeout(() => {
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        typingSpeed = 500;
      } else {
        setCharIndex(charIndex + (isDeleting ? -1 : 1));
      }
    }, typingSpeed);

    setDisplayText(currentPhrase.substring(0, charIndex));
    return () => clearTimeout(typeTimeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Solanki Devrajsinh</h1>
        <p className="hero-subtitle">{displayText}</p>
        {/* rest of content */}
      </div>
    </section>
  );
};
```

### Key Conversions:
- Global variables → `useState` hooks
- `setTimeout` → `useEffect` with cleanup
- `textContent` → State variable in JSX
- Function recursion → useEffect dependency array

---

## 🧩 Component 3: Portfolio.jsx

### Original Code (JS):
```javascript
const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
const projectCards = document.querySelectorAll('.portfolio-project-card');
const projectCount = document.getElementById('portfolioProjectCount');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('portfolio-active'));
    btn.classList.add('portfolio-active');

    const filter = btn.getAttribute('data-filter');
    let visibleCount = 0;

    projectCards.forEach(card => {
      const tech = card.getAttribute('data-tech');
      if (filter === 'all' || tech.includes(filter)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    projectCount.textContent = visibleCount;
  });
});
```

### React Conversion:
```jsx
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    { id: 1, title: 'HTML Wireframe', tags: ['html'], ... },
    { id: 2, title: 'Chess Board', tags: ['html', 'css', 'javascript'], ... },
    // more projects
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <section id="portfolio-projects">
      <h2 className="portfolio-section-title">Featured Projects</h2>
      
      <div className="portfolio-filter-container">
        <button 
          className={`portfolio-filter-btn ${activeFilter === 'all' ? 'portfolio-active' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          All Projects
        </button>
        {/* more filter buttons */}
      </div>

      <div className="portfolio-project-count">
        <span>{filteredProjects.length}</span> projects found
      </div>

      <div className="portfolio-projects-grid">
        {filteredProjects.map((project) => (
          <div className="portfolio-project-card" key={project.id}>
            {/* project content */}
          </div>
        ))}
      </div>
    </section>
  );
};
```

### Key Conversions:
- `querySelectorAll` + `forEach` → Array + `.map()`
- `addEventListener` → `onClick` handler
- `style.display` manipulation → Conditional rendering with `.filter()`
- `classList` manipulation → Conditional className
- Static HTML → Data-driven rendering

---

## 🧩 Component 4: Contact.jsx

### Original Code (JS):
```javascript
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }

  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});
```

### React Conversion:
```jsx
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required 
        />
        {/* more inputs */}
      </form>
    </section>
  );
};
```

### Key Conversions:
- `FormData` → Controlled components with `useState`
- `addEventListener('submit')` → `onSubmit` prop
- `this.reset()` → `setState` with empty values
- Uncontrolled inputs → Controlled inputs with `value` and `onChange`

---

## 🧩 Component 5: Particles.jsx

### Original Code (JS):
```javascript
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}
window.addEventListener('load', createParticles);
```

### React Conversion:
```jsx
const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = particlesRef.current;
      if (!particlesContainer) return;

      particlesContainer.innerHTML = '';

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return <div className="particles" id="particles" ref={particlesRef}></div>;
};
```

### Key Conversions:
- `document.getElementById` → `useRef` hook
- `window.addEventListener('load')` → `useEffect` with empty dependency array
- Direct DOM manipulation kept (necessary for dynamic particle creation)

---

## 🧩 Component 6: ScrollTop.jsx

### Original Code (JS):
```javascript
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

### React Conversion:
```jsx
const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      className="scroll-top"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};
```

### Key Conversions:
- `style.display` manipulation → State-driven inline style
- `addEventListener('click')` → `onClick` prop
- Separate event listeners → Single component with hooks

---

## 📋 General Conversion Patterns

### 1. Event Listeners
**Before:**
```javascript
element.addEventListener('click', handler);
```
**After:**
```jsx
<element onClick={handler} />
```

### 2. Class Manipulation
**Before:**
```javascript
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
```
**After:**
```jsx
const [isActive, setIsActive] = useState(false);
<element className={`base-class ${isActive ? 'active' : ''}`} />
```

### 3. DOM Queries
**Before:**
```javascript
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');
```
**After:**
```jsx
const elementRef = useRef(null);
<element ref={elementRef} />
// Or use state and map for multiple elements
```

### 4. Dynamic Content
**Before:**
```javascript
element.textContent = 'New text';
element.innerHTML = '<span>HTML</span>';
```
**After:**
```jsx
const [text, setText] = useState('New text');
<element>{text}</element>
```

### 5. Form Handling
**Before:**
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
});
```
**After:**
```jsx
const [formData, setFormData] = useState({});
const handleSubmit = (e) => {
  e.preventDefault();
  // use formData state
};
<form onSubmit={handleSubmit}>
  <input value={formData.field} onChange={handleChange} />
</form>
```

---

## ✅ Checklist for Conversion

- [ ] Replace `class` with `className`
- [ ] Replace `for` with `htmlFor`
- [ ] Self-close tags (`<img />`, `<input />`)
- [ ] Convert event listeners to React event handlers
- [ ] Replace DOM queries with `useRef` or state
- [ ] Convert class toggles to conditional classNames
- [ ] Use controlled components for forms
- [ ] Clean up event listeners in `useEffect`
- [ ] Use `.map()` for rendering lists
- [ ] Add `key` prop to list items
- [ ] Convert inline event handlers to functions
- [ ] Use state for dynamic content

---

**This guide demonstrates the complete conversion methodology used in this project.**
