# 📑 COMPONENT INDEX

Quick reference guide for all React components in this project.

---

## 🧩 Component Overview

| Component | File | Lines | Hooks Used | Purpose |
|-----------|------|-------|------------|---------|
| **Navbar** | `Navbar.jsx` | 68 | `useState`, `useEffect` | Navigation with mobile menu |
| **Hero** | `Hero.jsx` | 79 | `useState`, `useEffect` | Hero section with typing animation |
| **About** | `About.jsx` | 68 | None | About section with skills |
| **Services** | `Services.jsx` | 45 | None | Services cards |
| **Portfolio** | `Portfolio.jsx` | 180 | `useState` | Portfolio with filter |
| **Contact** | `Contact.jsx` | 145 | `useState` | Contact form |
| **Footer** | `Footer.jsx` | 42 | None | Footer with social links |
| **ScrollTop** | `ScrollTop.jsx` | 42 | `useState`, `useEffect` | Scroll-to-top button |
| **Particles** | `Particles.jsx` | 36 | `useRef`, `useEffect` | Floating particles |

---

## 📋 Component Details

### 1. Navbar.jsx
**Location:** `src/components/Navbar.jsx`

**Purpose:** Main navigation bar with mobile menu and scroll effect

**State:**
- `isMobileMenuOpen` - Controls mobile menu visibility
- `navBackground` - Controls navbar background opacity on scroll

**Effects:**
- Scroll listener for background change
- Cleanup on unmount

**Props:** None

**Key Features:**
- Mobile-responsive menu
- Smooth scroll navigation
- Background changes at 50px scroll
- Auto-close menu on link click

---

### 2. Hero.jsx
**Location:** `src/components/Hero.jsx`

**Purpose:** Hero section with animated typing effect

**State:**
- `displayText` - Current displayed text
- `phraseIndex` - Current phrase index
- `charIndex` - Current character index
- `isDeleting` - Typing or deleting mode

**Effects:**
- Typing animation loop
- Cleanup timeout on unmount

**Props:** None

**Key Features:**
- Multi-phrase rotation
- Realistic typing speed
- Pause at phrase end
- Smooth deletion

**Phrases:**
1. Full Stack Developer
2. Frontend Specialist
3. Backend Architect
4. Cloud Engineer
5. API Developer

---

### 3. About.jsx
**Location:** `src/components/About.jsx`

**Purpose:** About section with skills grid

**State:** None

**Effects:** None

**Props:** None

**Key Features:**
- Skills array with icons
- Responsive grid layout
- Resume download link
- Professional bio

**Skills Displayed:**
- HTML, CSS, JavaScript
- Bootstrap, React JS, Node.js
- Git & GitHub, DSA, Firebase

---

### 4. Services.jsx
**Location:** `src/components/Services.jsx`

**Purpose:** Services section with service cards

**State:** None

**Effects:** None

**Props:** None

**Key Features:**
- Service cards array
- Icon-based design
- Hover animations (CSS)

**Services:**
1. Frontend Development
2. Data Management
3. Responsive Design

---

### 5. Portfolio.jsx
**Location:** `src/components/Portfolio.jsx`

**Purpose:** Portfolio section with filtering

**State:**
- `activeFilter` - Currently active filter

**Effects:** None

**Props:** None

**Key Features:**
- Filter by technology
- Dynamic project count
- Project cards with images
- Live demo & source links

**Filters:**
- All Projects
- HTML, CSS, JavaScript
- Bootstrap, React JS

**Projects:** 6 total projects

---

### 6. Contact.jsx
**Location:** `src/components/Contact.jsx`

**Purpose:** Contact section with form

**State:**
- `formData` - Form field values
  - `name`
  - `email`
  - `subject`
  - `message`

**Effects:** None

**Props:** None

**Key Features:**
- Controlled form inputs
- Form validation
- Contact information display
- Success message

**Validation:**
- All fields required
- Email format (HTML5)
- Alert on submit

---

### 7. Footer.jsx
**Location:** `src/components/Footer.jsx`

**Purpose:** Footer with social links

**State:** None

**Effects:** None

**Props:** None

**Key Features:**
- Social media links
- Copyright notice
- Icon-based design

**Social Links:**
- LinkedIn
- GitHub
- Twitter

---

### 8. ScrollTop.jsx
**Location:** `src/components/ScrollTop.jsx`

**Purpose:** Scroll-to-top button

**State:**
- `isVisible` - Button visibility

**Effects:**
- Scroll listener
- Cleanup on unmount

**Props:** None

**Key Features:**
- Appears after 300px scroll
- Smooth scroll to top
- Fixed position
- Animated appearance

---

### 9. Particles.jsx
**Location:** `src/components/Particles.jsx`

**Purpose:** Floating particles animation

**State:** None

**Effects:**
- Create particles on mount

**Refs:**
- `particlesRef` - Container reference

**Props:** None

**Key Features:**
- 50 particles created
- Random positions
- Random animation delays
- Random durations

---

## 🎨 Styling

All components use classes from `style1.css`:
- No inline styles (except dynamic ones)
- No component-specific CSS files
- All animations in CSS
- Responsive breakpoints in CSS

---

## 🔗 Component Relationships

```
App.js
├── Particles (background)
├── Navbar (fixed top)
├── Hero (section)
├── About (section)
├── Services (section)
├── Portfolio (section)
├── Contact (section)
├── Footer (bottom)
└── ScrollTop (fixed bottom-right)
```

---

## 📊 Component Complexity

**Simple (No State/Effects):**
- About.jsx
- Services.jsx
- Footer.jsx

**Medium (State Only):**
- Portfolio.jsx
- Contact.jsx

**Complex (State + Effects):**
- Navbar.jsx
- Hero.jsx
- ScrollTop.jsx
- Particles.jsx

---

## 🛠️ Common Patterns

### **1. Conditional Rendering**
```jsx
<div className={`base ${isActive ? 'active' : ''}`}>
```

### **2. List Rendering**
```jsx
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
```

### **3. Event Handling**
```jsx
const handleClick = () => {
  setState(newValue);
};
<button onClick={handleClick}>Click</button>
```

### **4. Form Handling**
```jsx
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
<input name="field" value={formData.field} onChange={handleChange} />
```

### **5. Effect Cleanup**
```jsx
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('event', handler);
  return () => window.removeEventListener('event', handler);
}, []);
```

---

## 📝 Import Patterns

### **Standard Component:**
```jsx
import React from 'react';

const Component = () => {
  return <div>Content</div>;
};

export default Component;
```

### **With Hooks:**
```jsx
import React, { useState, useEffect } from 'react';

const Component = () => {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return <div>Content</div>;
};

export default Component;
```

### **With Ref:**
```jsx
import React, { useRef, useEffect } from 'react';

const Component = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    // Use element
  }, []);
  
  return <div ref={ref}>Content</div>;
};

export default Component;
```

---

## 🔍 Quick Find

**Need to modify:**
- **Navigation links?** → `Navbar.jsx`
- **Hero text?** → `Hero.jsx`
- **Skills?** → `About.jsx`
- **Services?** → `Services.jsx`
- **Projects?** → `Portfolio.jsx`
- **Contact info?** → `Contact.jsx`
- **Social links?** → `Footer.jsx`
- **Scroll threshold?** → `ScrollTop.jsx`
- **Particle count?** → `Particles.jsx`

**Need to modify:**
- **Colors?** → `style1.css` (CSS variables)
- **Animations?** → `style1.css` (keyframes)
- **Breakpoints?** → `style1.css` (media queries)
- **Fonts?** → `public/index.html` (Google Fonts)

---

## 📚 Additional Resources

- **Main Documentation:** `README.md`
- **Conversion Guide:** `CONVERSION_GUIDE.md`
- **Completion Summary:** `CONVERSION_COMPLETE.md`
- **This Index:** `COMPONENT_INDEX.md`

---

**Last Updated:** January 21, 2026
**Total Components:** 9
**Total Lines:** ~700 (JSX)
**Framework:** React 18
