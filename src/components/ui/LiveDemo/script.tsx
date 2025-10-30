import React, { useRef, useEffect, useState } from 'react';
import styles from './style.module.css';

export interface LiveDemoProps {
  html: string;
  css: string;
  javascript?: string;
  title?: string;
  responsive?: boolean;
  className?: string;
}

type DeviceSize = 'mobile' | 'tablet' | 'desktop' | 'responsive';

const deviceSizes: Record<DeviceSize, { width: string; height: string; label: string }> = {
  mobile: { width: '375px', height: '667px', label: 'Mobile' },
  tablet: { width: '768px', height: '1024px', label: 'Tablet' },
  desktop: { width: '1440px', height: '900px', label: 'Desktop' },
  responsive: { width: '100%', height: '100%', label: 'Responsive' }
};

/**
 * LiveDemo Component
 *
 * Renders a live demo of UI components in an isolated iframe environment.
 * Supports responsive preview sizes and safely executes HTML/CSS/JS code.
 *
 * @param html - HTML code to render
 * @param css - CSS styles to apply
 * @param javascript - Optional JavaScript code to execute
 * @param title - Optional title for the demo
 * @param responsive - Show responsive size controls (default: true)
 * @param className - Optional CSS class to apply
 */
const LiveDemo: React.FC<LiveDemoProps> = ({
  html,
  css,
  javascript = '',
  title,
  responsive = true,
  className = ''
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('responsive');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) return;

    // Create the full HTML document for the iframe
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Component Demo'}</title>
  <style>
    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      background: #fff;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background: #1a1a1a;
        color: #e0e0e0;
      }
    }

    /* Component wrapper */
    .demo-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    /* User CSS */
    ${css}
  </style>
</head>
<body>
  <div class="demo-container">
    ${html}
  </div>
  ${javascript ? `<script>
    try {
      ${javascript}
    } catch(error) {
      console.error('Demo script error:', error);
    }
  </script>` : ''}
</body>
</html>
    `;

    // Write content to iframe
    iframeDoc.open();
    iframeDoc.write(fullHTML);
    iframeDoc.close();

    setIsLoading(false);
  }, [html, css, javascript, title]);

  const handleDeviceSizeChange = (size: DeviceSize) => {
    setDeviceSize(size);
  };

  const currentSize = deviceSizes[deviceSize];

  return (
    <div className={`${styles.liveDemo} ${className}`}>
      {responsive && (
        <div className={styles.toolbar}>
          <div className={styles.deviceSelector}>
            {Object.entries(deviceSizes).map(([key, config]) => (
              <button
                key={key}
                className={`${styles.deviceButton} ${deviceSize === key ? styles.active : ''}`}
                onClick={() => handleDeviceSizeChange(key as DeviceSize)}
                aria-label={`View in ${config.label} size`}
              >
                {config.label}
              </button>
            ))}
          </div>
          {deviceSize !== 'responsive' && (
            <div className={styles.deviceInfo}>
              {currentSize.width} × {currentSize.height}
            </div>
          )}
        </div>
      )}

      <div
        className={`${styles.demoWrapper} ${deviceSize !== 'responsive' ? styles.deviceFrame : ''}`}
        style={{
          width: currentSize.width,
          height: deviceSize === 'responsive' ? 'auto' : currentSize.height
        }}
      >
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner} />
            <span>Loading demo...</span>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className={styles.demoFrame}
          title={title || 'Live Demo'}
          sandbox="allow-scripts"
          style={{
            minHeight: deviceSize === 'responsive' ? '400px' : undefined
          }}
        />
      </div>
    </div>
  );
};

export default LiveDemo;