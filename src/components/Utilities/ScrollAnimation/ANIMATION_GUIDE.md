# Retro Arcade Scroll Animations - Implementation Guide

## 🎮 Overview
Modern, premium scroll animations designed for a retro arcade tech fest website. Features subtle fade-in with slide-up motion and soft elastic easing for a nostalgic yet professional feel.

---

## 🚀 Quick Start

### Option 1: Using the AnimateOnScroll Component (Recommended)

```jsx
import AnimateOnScroll from './components/Utilities/ScrollAnimation/AnimateOnScroll';

function MyComponent() {
  return (
    <AnimateOnScroll animation="fade-slide-up">
      <h2>This will fade in and slide up on scroll</h2>
    </AnimateOnScroll>
  );
}
```

### Option 2: Using the Hook Directly

```jsx
import useScrollAnimation from './components/Utilities/ScrollAnimation/useScrollAnimation';

function MyComponent() {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div ref={ref} className={`fade-slide-up ${isVisible ? 'is-visible' : ''}`}>
      <h2>Custom implementation</h2>
    </div>
  );
}
```

---

## 🎨 Available Animations

### Primary Animations

#### `fade-slide-up` (Default)
Subtle upward motion (20px) with fade-in. Perfect for most content.
```jsx
<AnimateOnScroll animation="fade-slide-up">
  <div className="content">Your content</div>
</AnimateOnScroll>
```

#### `fade-slide-up-subtle`
Minimal upward motion (10px) with fade-in. For delicate elements.
```jsx
<AnimateOnScroll animation="fade-slide-up-subtle">
  <p>Subtle text reveal</p>
</AnimateOnScroll>
```

#### `fade-in`
Pure opacity transition. Ideal for section headers.
```jsx
<AnimateOnScroll animation="fade-in">
  <h1>Section Title</h1>
</AnimateOnScroll>
```

#### `fade-scale`
Gentle scale (0.95 → 1.0) with fade. Great for cards and posters.
```jsx
<AnimateOnScroll animation="fade-scale">
  <div className="event-card">Event Card</div>
</AnimateOnScroll>
```

### Directional Animations

#### `slide-in-left` / `slide-in-right`
Horizontal motion (15px) with fade. For alternating content.
```jsx
<AnimateOnScroll animation="slide-in-left">
  <div>Content from left</div>
</AnimateOnScroll>

<AnimateOnScroll animation="slide-in-right">
  <div>Content from right</div>
</AnimateOnScroll>
```

### Specialty Animations

#### `pixel-reveal`
Retro-inspired with slight blur effect. Subtle arcade touch.
```jsx
<AnimateOnScroll animation="pixel-reveal">
  <div className="retro-element">Pixel Perfect</div>
</AnimateOnScroll>
```

---

## ⏱️ Staggered Animations

Add sequential delays for cascading effects:

```jsx
// Cards appearing one after another
<AnimateOnScroll animation="fade-scale" delay={0}>
  <div>Card 1</div>
</AnimateOnScroll>

<AnimateOnScroll animation="fade-scale" delay={100}>
  <div>Card 2</div>
</AnimateOnScroll>

<AnimateOnScroll animation="fade-scale" delay={200}>
  <div>Card 3</div>
</AnimateOnScroll>

<AnimateOnScroll animation="fade-scale" delay={300}>
  <div>Card 4</div>
</AnimateOnScroll>
```

Available delays: `0, 100, 200, 300, 400, 500, 600` (in ms)

---

## 🎯 Component Props

### AnimateOnScroll Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | string | `'fade-slide-up'` | Animation class name |
| `delay` | number | `0` | Delay in ms (0, 100, 200, 300, 400, 500, 600) |
| `threshold` | number | `0.1` | Visibility % before trigger (0-1) |
| `triggerOnce` | boolean | `true` | Animate only once or on every scroll |
| `className` | string | `''` | Additional CSS classes |

---

## 📱 Example Implementations

### Hero Section
```jsx
import AnimateOnScroll from './components/Utilities/ScrollAnimation/AnimateOnScroll';

function HeroSection() {
  return (
    <section className="hero">
      <AnimateOnScroll animation="hero-title">
        <h1>TECH FEST 2026</h1>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="hero-subtitle">
        <p>The Ultimate Gaming Experience</p>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="hero-cta">
        <button className="cta-button">Register Now</button>
      </AnimateOnScroll>
    </section>
  );
}
```

### Event Cards Grid
```jsx
function EventsGrid({ events }) {
  return (
    <div className="events-grid">
      {events.map((event, index) => (
        <AnimateOnScroll 
          key={event.id}
          animation="event-card"
          delay={index * 100}
        >
          <div className="event-card">
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
```

### Section Header
```jsx
function SectionHeader({ title, subtitle }) {
  return (
    <AnimateOnScroll animation="section-title-wrapper">
      <div className="section-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </AnimateOnScroll>
  );
}
```

### Alternating Content Layout
```jsx
function AlternatingContent() {
  return (
    <div className="alternating-section">
      <AnimateOnScroll animation="slide-in-left">
        <div className="content-block left">
          <h3>First Feature</h3>
          <p>Description...</p>
        </div>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slide-in-right">
        <div className="content-block right">
          <h3>Second Feature</h3>
          <p>Description...</p>
        </div>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slide-in-left">
        <div className="content-block left">
          <h3>Third Feature</h3>
          <p>Description...</p>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
```

### Gallery/Poster Grid
```jsx
function GalleryGrid({ images }) {
  return (
    <div className="gallery-grid">
      {images.map((img, index) => (
        <AnimateOnScroll 
          key={img.id}
          animation="fade-scale"
          delay={(index % 3) * 100}
        >
          <div className="gallery-item">
            <img src={img.src} alt={img.alt} />
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
```

---

## ⚙️ Advanced Configuration

### Custom Threshold (When to Trigger)
```jsx
// Trigger when 50% of element is visible
<AnimateOnScroll animation="fade-slide-up" threshold={0.5}>
  <div>Content</div>
</AnimateOnScroll>

// Trigger as soon as element enters viewport
<AnimateOnScroll animation="fade-slide-up" threshold={0}>
  <div>Content</div>
</AnimateOnScroll>
```

### Repeat Animations on Scroll
```jsx
// Animate every time user scrolls to element
<AnimateOnScroll animation="fade-slide-up" triggerOnce={false}>
  <div>Repeating animation</div>
</AnimateOnScroll>
```

### Combining Classes
```jsx
<AnimateOnScroll 
  animation="fade-slide-up" 
  className="my-custom-class another-class"
>
  <div>Content with additional classes</div>
</AnimateOnScroll>
```

---

## 🎬 Animation Timing Details

### Easing Curves
- **Soft Elastic**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Main animations
- **Subtle Elastic**: `cubic-bezier(0.34, 1.3, 0.64, 1)` - Delicate elements
- **Smooth Ease**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Pure fades

### Duration
- Standard: `0.7s - 0.8s`
- Hero elements: `0.9s - 1s`
- Mobile: `0.5s` (auto-adjusted)

### Movement Distance
- Standard: `15-20px`
- Subtle: `10px`
- Hero: `30px`

---

## ♿ Accessibility

The animations automatically respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

Users with motion sensitivity see instant content without animation.

---

## 📱 Responsive Behavior

- **Desktop**: Full animation effects
- **Tablet**: Standard animations
- **Mobile**: Reduced duration (0.5s) for better performance
- **Low-end devices**: Graceful fallback with Intersection Observer check

---

## 🔧 Browser Support

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+
- ✅ Graceful degradation for older browsers (shows content immediately)

---

## 💡 Best Practices

### DO ✅
- Use `fade-slide-up` for most content
- Add delays (100-600ms) for staggered reveals
- Keep animations subtle (10-20px movement)
- Use `fade-scale` for cards and interactive elements
- Respect the `triggerOnce={true}` default for better performance

### DON'T ❌
- Don't animate everything - reserve for key content
- Don't chain more than 6 staggered items without grouping
- Don't use delays over 600ms
- Don't set threshold too high (above 0.7) for below-fold content
- Don't disable reduced motion support

---

## 🎯 Performance Tips

1. **Use `triggerOnce={true}`** (default) to prevent re-animations
2. **Limit staggered items** to groups of 4-6 max
3. **Use appropriate threshold** - lower values (0.1-0.2) for smoother experience
4. **Avoid animating large images** without proper optimization
5. **Test on mobile devices** for performance validation

---

## 🐛 Troubleshooting

### Animation not triggering?
- Check if element has enough scroll distance
- Adjust `threshold` prop to lower value (e.g., 0.05)
- Verify scroll-animations.css is imported in index.js

### Animation feels too fast/slow?
- Edit duration in scroll-animations.css
- Customize easing curves for different feel

### Stagger not working?
- Verify delay values: 100, 200, 300, etc.
- Check that elements are properly separated in DOM

---

## 📦 Files Created

```
src/
├── assets/
│   └── css/
│       └── scroll-animations.css          # All animation styles
├── components/
│   └── Utilities/
│       └── ScrollAnimation/
│           ├── AnimateOnScroll.js         # Wrapper component
│           ├── useScrollAnimation.js      # Custom hook
│           └── ANIMATION_GUIDE.md         # This file
└── index.js                                # Updated with CSS import
```

---

## 🚀 Ready to Use!

The animation system is fully set up and ready to enhance your retro arcade tech fest website. Start by wrapping key elements with `<AnimateOnScroll>` and watch your site come to life with smooth, professional animations!

**Questions or customizations needed?** The code is well-commented and easy to modify. Happy animating! 🎮✨
