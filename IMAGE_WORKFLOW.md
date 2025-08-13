# 📸 Image Processing Workflow

## 🎯 **Super Simple Process**

### **What You Do:**
1. Create project folder: `/projects/{project-name}/`
2. Drop raw images in `/projects/{project-name}/images/`
3. Create/edit project data: `/projects/{project-name}.ts`
4. Run `npm run process-images {project-name}`

### **What The Script Does:**
- ✅ Auto-resizes to perfect dimensions
- ✅ Optimizes file sizes (typically 60-80% reduction)
- ✅ Generates WebP + PNG formats
- ✅ Creates thumbnails automatically
- ✅ Detects device type from filename

## 📋 **Quick Example**

### **Project Structure** (Your Organization)
```
projects/
└── my-awesome-app/
    ├── my-awesome-app.ts             (Project data & metadata)
    └── images/                       (Raw images - PNG/JPG only)
        ├── 01-desktop-homepage.png   (2560x1440, 2.3MB)
        ├── 02-mobile-login.jpg       (750x1334, 1.8MB)
        └── 03-feature-dashboard.png  (1920x1080, 1.5MB)
```

### **Output** (Auto-Generated)
```
public/images/projects/my-awesome-app/
├── 01-desktop-homepage-desktop.webp     (1200x800, 180KB)
├── 01-desktop-homepage-desktop.png      (1200x800, 420KB)
├── 01-desktop-homepage-thumb.webp       (400x300, 45KB)
├── 02-mobile-login-mobile.webp          (375x667, 95KB)
├── 02-mobile-login-mobile.png           (375x667, 210KB)
├── 02-mobile-login-thumb.webp           (400x300, 38KB)
├── 03-feature-dashboard-feature.webp    (800x600, 125KB)
├── 03-feature-dashboard-feature.png     (800x600, 285KB)
└── 03-feature-dashboard-thumb.webp      (400x300, 42KB)
```

### **Screenshot Data** (You Add to projects.ts)
```typescript
screenshots: [
  {
    src: '/images/projects/my-awesome-app/01-desktop-homepage-desktop.webp',
    alt: 'Main dashboard showing user analytics and real-time data',
    caption: 'Dashboard Overview',
    category: 'desktop'
  },
  {
    src: '/images/projects/my-awesome-app/02-mobile-login-mobile.webp',
    alt: 'Mobile login screen with clean, accessible form design',
    caption: 'Mobile Experience', 
    category: 'mobile'
  },
  {
    src: '/images/projects/my-awesome-app/03-feature-dashboard-feature.webp',
    alt: 'Interactive dashboard feature with drag-and-drop widgets',
    caption: 'Customizable Dashboard',
    category: 'feature'
  }
]
```

## 📝 **Naming Convention Rules**

### **Required Format**: `[number]-[category]-[description].[ext]`

| Category | Output Size | Use Case | Example |
|----------|-------------|----------|---------|
| `desktop` | 1200×800 | Main views, homepage, dashboard | `01-desktop-homepage.png` |
| `mobile` | 375×667 | Mobile screenshots | `02-mobile-login.jpg` |
| `tablet` | 768×1024 | Tablet/iPad views | `03-tablet-settings.png` |
| `feature` | 800×600 | Feature demos, components | `04-feature-search.jpg` |

### **Format Support**
- **Input**: PNG, JPG/JPEG only (as requested)
- **Output**: WebP (best compression) + PNG (compatibility)
- **Quality**: 85% for desktop/mobile, 90% for features

## 🚀 **Commands Reference**

```bash
# One-time setup (install ImageMagick)
brew install imagemagick

# Process single project
npm run process-images my-awesome-app

# Process all projects at once  
npm run process-images all

# Get help and setup instructions
npm run process-images help
```

## 💡 **Pro Tips**

### **File Naming Best Practices**
```
✅ Perfect Examples:
- 01-desktop-homepage.png       → desktop category, clear purpose
- 02-mobile-login.jpg           → mobile category, numbered  
- 03-feature-search.png         → feature category, descriptive
- 04-tablet-dashboard.png       → tablet category, specific

❌ Wrong Format:
- homepage.png                  → missing number and category
- mobile-login.jpg              → missing number
- 03-screenshot.png             → missing category
- feature-search.png            → missing number
```

### **Image Quality Guidelines**
- **Screenshots**: Use PNG for crisp UI elements
- **Photos**: Use JPG for realistic images
- **High DPI**: 2x resolution is fine (script will resize)
- **Don't worry about optimization** - script handles it!

### **Accessibility**
- Script output includes proper alt text placeholders
- You provide meaningful captions and descriptions
- Multiple formats ensure broad compatibility

## 🎯 **Integration with Project Data**

Your project data file contains both metadata and processed image paths:

```typescript
// In projects/my-awesome-app/my-awesome-app.ts
import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'my-awesome-app',
  title: 'My Awesome App',
  description: 'Amazing project description',
  // ... other metadata
  screenshots: [
    {
      src: '/images/projects/my-awesome-app/01-desktop-homepage-desktop.webp',
      alt: 'Detailed description for screen readers',
      caption: 'Homepage Dashboard',
      category: 'desktop' // matches processing output
    },
    {
      src: '/images/projects/my-awesome-app/02-mobile-login-mobile.webp',
      alt: 'Mobile login interface with clean design',
      caption: 'Mobile Experience',
      category: 'mobile'
    }
    // Add more screenshots...
  ]
};

export default project;
```

**Result**: Beautiful, fast-loading project showcase with responsive images and modal interactions! 🎉

## 🎯 **Prototype Implementation**

The **personal-website-v2** project has been migrated to the new consolidated structure and serves as the prototype:

```
projects/personal-website-v2/
├── personal-website-v2.ts         # ✅ Project data & metadata  
├── images/                        # ✅ Raw images location
│   └── (ready for screenshots)
└── PROJECT.md                     # ✅ Complete documentation
```

This structure demonstrates:
- ✅ **Co-located data and images** for better organization
- ✅ **TypeScript project modules** with full type safety
- ✅ **Optional documentation** in PROJECT.md files
- ✅ **Clear naming conventions** for consistency

All future projects should follow this consolidated pattern!