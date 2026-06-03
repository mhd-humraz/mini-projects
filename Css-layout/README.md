# CSS Layout Fundamentals - README

## 📋 Project Overview

This project demonstrates fundamental CSS layout techniques through a responsive webpage that showcases Flexbox, CSS Grid, positioning, and responsive design principles.

## 🎯 Learning Objectives

- Master CSS Flexbox for one-dimensional layouts
- Implement CSS Grid for complex two-dimensional layouts
- Apply CSS positioning techniques (static, relative, absolute, fixed, sticky)
- Create responsive designs using media queries
- Understand modern CSS layout best practices

## 🛠 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Styling and layout
- **Flexbox** - For flexible component layouts
- **CSS Grid** - For complex section layouts
- **CSS Variables** - For consistent theming
- **Media Queries** - For responsive design

## 📁 Project Structure

```
css-layout-fundamentals/
│
├── index.html              # Main HTML file
├── README.md               # Project documentation
└── (optional CSS file)     # External styles (currently embedded)
```

## 🎨 Layout Techniques Demonstrated

### 1. **Flexbox Layout**
- Header navigation menu
- Hero section content alignment
- About section content arrangement
- Contact section layout
- Social media icons

### 2. **CSS Grid Layout**
- Features section card grid
- Pricing section card arrangement
- Footer column layout
- Responsive grid with `auto-fit` and `minmax()`

### 3. **CSS Positioning**
- **Sticky Header** - Navigation stays visible while scrolling
- **Absolute Positioning** - "Most Popular" badge on pricing card
- **Relative Positioning** - Component positioning context

### 4. **Responsive Design**
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Adaptive typography and spacing

### 5. **Modern CSS Features**
- CSS Custom Properties (Variables)
- CSS Box Model manipulation
- Transform and transition effects
- Scroll-snap for testimonials

## 🚀 How to Use

### Option 1: Direct File Access
1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Resize the browser window to see responsive behavior

### Option 2: Live Server (Recommended)
1. Install a local server (like Live Server extension in VSCode)
2. Serve the project directory
3. Access via localhost (usually `http://127.0.0.1:5500`)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adjusted layouts)
- **Mobile**: 480px - 767px (Stacked layouts)
- **Small Mobile**: < 480px (Optimized for small screens)

## 🎯 Key Sections

1. **Header** - Sticky navigation with Flexbox
2. **Hero** - Centered content with call-to-action
3. **Features** - CSS Grid card layout
4. **About** - Flexbox content with image
5. **Testimonials** - Horizontal scroll with snap
6. **Pricing** - CSS Grid with featured card
7. **Contact** - Flexbox form layout
8. **Footer** - CSS Grid column layout

## 💡 Learning Highlights

### Flexbox Examples:
```css
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

### CSS Grid Examples:
```css
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

### Positioning Examples:
```css
header {
    position: sticky;
    top: 0;
}
```

### Responsive Design:
```css
@media (max-width: 768px) {
    .header-container {
        flex-direction: column;
    }
}
```

## 🎨 Color Scheme

- **Primary**: `#3498db` (Blue)
- **Secondary**: `#2c3e50` (Dark Blue)
- **Accent**: `#e74c3c` (Red)
- **Light**: `#ecf0f1` (Light Gray)
- **Dark**: `#34495e` (Dark Gray)

## 🔧 Customization

You can easily customize the design by modifying the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other variables */
}
```

## 📚 Further Learning Resources

- [MDN CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [CSS-Tricks Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Google Web Fundamentals - Responsive Design](https://developers.google.com/web/fundamentals/design-and-ux/responsive)

## 🤝 Contributing

Feel free to fork this project and experiment with different layout techniques. Some ideas:
- Add more complex grid layouts
- Implement CSS Subgrid
- Try different positioning scenarios
- Add animation and micro-interactions
