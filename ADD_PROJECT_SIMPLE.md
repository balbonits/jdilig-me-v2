# 🚀 How to Add a Project - Super Simple

## 📋 **You Only Do 2 Things:**

### **1. Upload Images** 📸
```
📁 raw-images/[project-slug]/
├── 01-desktop-homepage.png     # Main desktop view  
├── 02-mobile-app.jpg           # Mobile screenshot
└── 03-feature-dashboard.png    # Feature demo
```

**Naming**: `[number]-[category]-[description].[png|jpg]`
- **Categories**: `desktop`, `mobile`, `tablet`, `feature`
- **Examples**: `01-desktop-homepage.png`, `02-mobile-login.jpg`

### **2. Write PROJECT.md** 📝
```
📁 [project-folder]/PROJECT.md
```

**Use AI to write it!** Give Grok/ChatGPT this prompt:
```
Create a PROJECT.md file for [project description]. 
Use this template: [copy from current PROJECT.md]
Include the complete JSON data structure with realistic details
for a [type] project that [what it does].
```

**Claude will**: Read your PROJECT.md → Extract JSON → Add to showcase system

## ⚡ **Commands**

```bash
# Process images
npm run process-images my-project

# Generate project data (includes your new project)  
npm run generate:projects

# Build site with new project
npm run build
```

## 🎯 **That's It!**

Your project will automatically appear at:
- **Index**: `/projects` (if featured: true)
- **Detail**: `/projects/my-project`

**With**:
- ✅ Optimized images (WebP + PNG)
- ✅ Responsive design
- ✅ Modal interactions
- ✅ SEO metadata
- ✅ Type safety

---

**Quick Reference:**
- Images go in: `raw-images/[slug]/`
- JSON goes in: `projects/[slug].json` 
- Run: `npm run process-images [slug]` + `npm run generate:projects`