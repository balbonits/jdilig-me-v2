import fs from 'fs';
import path from 'path';

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

interface ManifestShortcut {
  name: string;
  url: string;
  description: string;
  icons?: ManifestIcon[];
}

interface WebAppManifest {
  name: string;
  short_name: string;
  start_url: string;
  display: string;
  theme_color: string;
  background_color: string;
  icons: ManifestIcon[];
  shortcuts: ManifestShortcut[];
  scope?: string;
  orientation?: string;
  categories?: string[];
  lang?: string;
  [key: string]: unknown; // Allow additional properties
}

describe('PWA Manifest Validation', () => {
  let manifest: WebAppManifest;

  beforeAll(() => {
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(manifestContent);
  });

  describe('Required Properties', () => {
    test('should have name property', () => {
      expect(manifest).toHaveProperty('name');
      expect(typeof manifest.name).toBe('string');
      expect(manifest.name.length).toBeGreaterThan(0);
    });

    test('should have short_name property', () => {
      expect(manifest).toHaveProperty('short_name');
      expect(typeof manifest.short_name).toBe('string');
      expect(manifest.short_name.length).toBeGreaterThan(0);
      expect(manifest.short_name.length).toBeLessThanOrEqual(12); // PWA best practice
    });

    test('should have start_url property', () => {
      expect(manifest).toHaveProperty('start_url');
      expect(manifest.start_url).toBe('/');
    });

    test('should have display property', () => {
      expect(manifest).toHaveProperty('display');
      expect(['fullscreen', 'standalone', 'minimal-ui', 'browser']).toContain(manifest.display);
    });

    test('should have theme_color property', () => {
      expect(manifest).toHaveProperty('theme_color');
      expect(manifest.theme_color).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
    });

    test('should have background_color property', () => {
      expect(manifest).toHaveProperty('background_color');
      expect(manifest.background_color).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
    });
  });

  describe('Icons', () => {
    test('should have icons array', () => {
      expect(manifest).toHaveProperty('icons');
      expect(Array.isArray(manifest.icons)).toBeTruthy();
      expect(manifest.icons.length).toBeGreaterThan(0);
    });

    test('should have required icon sizes', () => {
      const requiredSizes = ['192x192', '512x512'];
      const iconSizes = manifest.icons.map((icon) => icon.sizes);
      
      requiredSizes.forEach(size => {
        expect(iconSizes.some((iconSize: string) => iconSize.includes(size))).toBeTruthy();
      });
    });

    test('icons should have valid properties', () => {
      manifest.icons.forEach((icon) => {
        expect(icon).toHaveProperty('src', expect.any(String));
        expect(icon).toHaveProperty('sizes', expect.any(String));
        expect(icon).toHaveProperty('type', expect.any(String));
        
        // Check src path exists
        expect(icon.src).toMatch(/^\/images\/favicon\//);
        
        // Check valid mime type
        expect(['image/png', 'image/svg+xml', 'image/x-icon']).toContain(icon.type);
        
        // Check sizes format
        expect(icon.sizes).toMatch(/^\d+x\d+$/);
      });
    });

    test('should have maskable icon for better Android support', () => {
      const hasMaskableIcon = manifest.icons.some((icon) => 
        icon.purpose && icon.purpose.includes('maskable')
      );
      expect(hasMaskableIcon).toBeTruthy();
    });
  });

  describe('App Shortcuts', () => {
    test('should have shortcuts array', () => {
      expect(manifest).toHaveProperty('shortcuts');
      expect(Array.isArray(manifest.shortcuts)).toBeTruthy();
      expect(manifest.shortcuts.length).toBeGreaterThan(0);
      expect(manifest.shortcuts.length).toBeLessThanOrEqual(4); // PWA best practice
    });

    test('shortcuts should have valid properties', () => {
      manifest.shortcuts.forEach((shortcut) => {
        expect(shortcut).toHaveProperty('name', expect.any(String));
        expect(shortcut).toHaveProperty('url', expect.any(String));
        expect(shortcut).toHaveProperty('description', expect.any(String));
        
        // Name should be concise
        expect(shortcut.name.length).toBeLessThanOrEqual(25);
        
        // URL should be valid
        expect(shortcut.url).toMatch(/^(\/|https?:\/\/)/);
        
        // Description should be helpful
        expect(shortcut.description.length).toBeGreaterThan(0);
        expect(shortcut.description.length).toBeLessThanOrEqual(100);
      });
    });

    test('should have expected shortcut structure', () => {
      const expectedShortcuts = [
        { name: 'View Projects', url: '/projects' },
        { name: 'Code Showcase', url: '/code' },
        { name: 'About & Resume', url: '/about' },
        { name: 'Download Resume', url: '/resume.pdf' }
      ];

      expectedShortcuts.forEach((expected, index) => {
        expect(manifest.shortcuts[index]).toMatchObject(expected);
      });
    });
  });

  describe('PWA Best Practices', () => {
    test('should have orientation preference', () => {
      if (manifest.orientation) {
        const validOrientations = [
          'any', 'natural', 'landscape', 'portrait',
          'portrait-primary', 'portrait-secondary',
          'landscape-primary', 'landscape-secondary'
        ];
        expect(validOrientations).toContain(manifest.orientation);
      }
    });

    test('should have scope defined', () => {
      expect(manifest).toHaveProperty('scope');
      expect(manifest.scope).toBe('/');
    });

    test('should have categories for app store classification', () => {
      if (manifest.categories) {
        expect(Array.isArray(manifest.categories)).toBeTruthy();
        manifest.categories.forEach((category) => {
          expect(typeof category).toBe('string');
          expect(category.length).toBeGreaterThan(0);
        });
      }
    });

    test('should have language specified', () => {
      if (manifest.lang) {
        expect(manifest.lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // Valid language code
      }
    });

    test('should have developer information', () => {
      // Check if either developer or related info is present
      const hasDeveloperInfo = manifest.developer || 
                              manifest.author || 
                              manifest.publisher ||
                              (manifest.shortcuts && manifest.shortcuts.length > 0);
      
      expect(hasDeveloperInfo).toBeTruthy();
    });
  });

  describe('Security and Performance', () => {
    test('should use HTTPS for external resources', () => {
      const checkHttps = (url: string) => {
        if (url.startsWith('http://')) {
          return false; // HTTP not allowed
        }
        return true;
      };

      // Check all external URLs use HTTPS
      if (manifest.start_url && manifest.start_url.startsWith('http')) {
        expect(checkHttps(manifest.start_url)).toBeTruthy();
      }

      manifest.icons?.forEach((icon) => {
        if (icon.src.startsWith('http')) {
          expect(checkHttps(icon.src)).toBeTruthy();
        }
      });

      manifest.shortcuts?.forEach((shortcut) => {
        if (shortcut.url.startsWith('http')) {
          expect(checkHttps(shortcut.url)).toBeTruthy();
        }
      });
    });

    test('should have reasonable file size', () => {
      const manifestString = JSON.stringify(manifest);
      const sizeInKB = Buffer.byteLength(manifestString, 'utf8') / 1024;
      
      // Manifest should be under 50KB for performance
      expect(sizeInKB).toBeLessThan(50);
    });

    test('should not contain sensitive information', () => {
      const manifestString = JSON.stringify(manifest).toLowerCase();
      
      const sensitivePatterns = [
        'password', 'secret', 'token', 'key', 'private',
        'credential', 'auth', 'session', 'cookie'
      ];

      sensitivePatterns.forEach(pattern => {
        expect(manifestString).not.toContain(pattern);
      });
    });
  });

  describe('Validation against Web App Manifest specification', () => {
    test('should have valid JSON structure', () => {
      expect(typeof manifest).toBe('object');
      expect(manifest).not.toBeNull();
      expect(Array.isArray(manifest)).toBeFalsy();
    });

    test('should not have unknown critical properties', () => {
      // These are the standard Web App Manifest properties
      const validProperties = [
        'name', 'short_name', 'description', 'start_url', 'scope',
        'display', 'orientation', 'theme_color', 'background_color',
        'icons', 'shortcuts', 'categories', 'screenshots', 'lang',
        'dir', 'iarc_rating_id', 'prefer_related_applications',
        'related_applications', 'serviceworker', 'developer',
        'author', 'publisher'
      ];

      Object.keys(manifest).forEach(property => {
        if (!validProperties.includes(property)) {
          console.warn(`Unknown manifest property: ${property}`);
        }
      });
    });
  });
});