# MeridianDigital Website

A modern, futuristic website for MeridianDigital - a digital marketing agency specializing in local business growth.

## 🚀 Features

- **Futuristic Design**: Glassmorphism effects, neon accents, and smooth animations
- **Interactive Elements**: Directional shine effects, expandable service cards, hover animations
- **Contact Form**: Comprehensive form with validation, spam prevention, and international phone support
- **Responsive Design**: Optimized for all device sizes
- **Performance Optimized**: Efficient animations and smooth scrolling
- **SEO Optimized**: Comprehensive metadata, sitemap, and structured data

## 📁 Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # Contact form submission
│   │   │   └── test-env/      # Environment testing
│   │   ├── globals.css        # Global styles and animations
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Main homepage component
│   ├── components/            # Reusable React components
│   │   ├── BackgroundGlows.tsx
│   │   ├── ClientShell.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── StructuredData.tsx
│   │   └── TestimonialCarousel.tsx
│   ├── constants/             # Application constants
│   │   └── countryCodes.ts    # International country codes
│   ├── types/                 # TypeScript type definitions
│   │   └── forms.ts           # Form-related interfaces
│   └── utils/                 # Utility functions
│       ├── accentStyles.ts    # Accent style generation
│       ├── shineDirection.ts  # Shine effect direction logic
│       └── validation.ts      # Form validation utilities
│   └── lib/                   # Library and configuration files
│       └── metadata.ts        # Centralized metadata configuration
├── public/                    # Static assets
├── package.json
└── README.md

## 🔍 SEO Implementation

### Metadata Management
- **Centralized Configuration**: All metadata managed in `src/lib/metadata.ts`
- **Page-Specific Metadata**: Each page has optimized titles, descriptions, and keywords
- **Social Media Tags**: Open Graph and Twitter Card support
- **Canonical URLs**: Proper canonical URL implementation

### SEO Files
- **sitemap.ts**: Dynamic sitemap generation for search engine indexing
- **robots.ts**: Crawling instructions for search engine bots
- **StructuredData.tsx**: JSON-LD structured data for rich snippets

### Metadata Features
- **Homepage**: Optimized for "digital marketing agency" and "local business growth"
- **Privacy Policy**: Focused on data protection and GDPR compliance
- **Terms of Service**: Legal terms and service agreements
- **Keywords**: Comprehensive keyword targeting for local business marketing
```

## 🛠️ Key Components

### Main Page (`src/app/page.tsx`)
- **Hero Section**: Parallax background with CTA buttons
- **About Section**: "Why Meridian?" with interactive cycle cards
- **Services Section**: Expandable service cards with detailed information
- **Case Studies**: Real business results showcase
- **Testimonials**: Client feedback carousel
- **Contact Form**: Free digital health check form

### Contact Form (`src/components/ContactForm.tsx`)
- Client-side validation with real-time error display
- International phone number support
- Honeypot spam prevention
- Loading states and success/error feedback

### Complex Logic Documentation

#### Directional Shine Effects
The shine effect on cycle cards uses sophisticated mouse tracking to determine entry/exit points:
- Calculates distances from all four edges
- Determines closest edge for entry/exit
- Applies appropriate CSS animation class
- Located in `src/utils/shineDirection.ts`

#### Accent Style Generation
Service cards use deterministic pseudo-random generation for unique visual patterns:
- Uses sine function with large multiplier for distribution
- Generates three overlapping radial gradients
- Ensures consistent, unique patterns per card
- Located in `src/utils/accentStyles.ts`

#### Form Validation
Comprehensive validation system with reusable utilities:
- Email validation with regex patterns
- International phone number validation
- Honeypot spam detection
- Located in `src/utils/validation.ts`

## 🎨 Design System

### Colors
- **Primary Accent**: `#5ee7ff` (Electric Cyan)
- **Secondary Accent**: `#8a5cff` (Violet)
- **Background**: `#070a0f` (Dark Blue-Black)
- **Text**: `#e6f1ff` (Light Blue-White)

### Animations
- **Glassmorphism**: Backdrop blur effects with transparency
- **Shine Effects**: Directional light sweeps on hover
- **Parallax**: Subtle background movement on scroll
- **Hover States**: Scale and glow effects

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` with:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📝 Code Standards

### Comments
- All complex logic is documented with JSDoc comments
- Tricky algorithms include step-by-step explanations
- Future developers can understand the reasoning behind implementation choices

### File Organization
- **Constants**: Reusable data in `/constants`
- **Types**: TypeScript interfaces in `/types`
- **Utilities**: Helper functions in `/utils`
- **Components**: Reusable UI components in `/components`

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE
- **Types**: PascalCase with descriptive names

## 🔧 Technical Notes

### Performance Optimizations
- Removed scroll-triggered animations for better performance
- Used `transform` and `opacity` for smooth animations
- Implemented proper z-index layering for visual effects

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper semantic HTML structure
- Screen reader friendly content

### Browser Compatibility
- Modern CSS features with fallbacks
- Progressive enhancement approach
- Tested on Chrome, Firefox, Safari, Edge

## 🤝 Contributing

1. Follow the established file structure
2. Add comprehensive comments for complex logic
3. Use TypeScript interfaces for type safety
4. Test on multiple devices and browsers
5. Update documentation for new features

## 📄 License

This project is proprietary to MeridianDigital.
