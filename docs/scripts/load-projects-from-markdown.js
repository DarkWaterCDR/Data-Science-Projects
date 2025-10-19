// Load projects from GitHub repository markdown files with YAML front-matter
// Requires: js-yaml (loaded from CDN)

// Use raw.githubusercontent.com to bypass API rate limits completely
const RAW_GITHUB_BASE = 'https://raw.githubusercontent.com/DarkWaterCDR/Data-Science-Projects/main/docs/projects';

// Hardcode project filenames to avoid API calls for directory listing
// When you add new project files, add them to this array
const PROJECT_FILES = [
  'Childcare-Affordability.md',
  'Healthy-Habits-Clustering.md',
  'Project-GLM.md',
  'Estimating-MPG.md'
];

async function loadProjectsFromMarkdown() {
  console.log('[load-projects-markdown] Starting loadProjectsFromMarkdown() - Direct Raw Mode (No API Rate Limits!)');
  console.log('[load-projects-markdown] Loading', PROJECT_FILES.length, 'project files');
  console.log('[load-projects-markdown] Script version: 1.0.5');
  console.log('[load-projects-markdown] Timestamp:', new Date().toISOString());

  try {
    const cacheBuster = `?t=${Date.now()}`;
    const projects = [];

    for (const filename of PROJECT_FILES) {
      console.log('[load-projects-markdown] ========================================');
      console.log('[load-projects-markdown] Fetching content for:', filename);
      
      // Fetch directly from raw.githubusercontent.com - NO API rate limits!
      const contentUrl = `${RAW_GITHUB_BASE}/${filename}${cacheBuster}`;
      console.log('[load-projects-markdown] Full URL:', contentUrl);
      
      try {
        const contentResponse = await fetch(contentUrl);
        
        console.log('[load-projects-markdown] Response status:', contentResponse.status);
        console.log('[load-projects-markdown] Response ok:', contentResponse.ok);
        
        if (!contentResponse.ok) {
          console.warn(`[load-projects-markdown] Failed to fetch ${filename}: ${contentResponse.status}`);
          continue;
        }
        
        const markdownContent = await contentResponse.text();
        console.log(`[load-projects-markdown] Content length for ${filename}:`, markdownContent.length);
        console.log(`[load-projects-markdown] First 100 chars:`, markdownContent.substring(0, 100));

        // Parse YAML front-matter
        const metadata = parseYamlFrontMatter(markdownContent);
        if (metadata) {
          // Add filename for reference
          metadata.filename = filename;
          
          // Adjust image paths - convert ../images/ to images/ since we're serving from /docs/
          if (metadata.image && metadata.image.startsWith('../images/')) {
            metadata.image = metadata.image.replace('../images/', 'images/');
          }
          if (metadata.thumbnail && metadata.thumbnail.startsWith('../images/')) {
            metadata.thumbnail = metadata.thumbnail.replace('../images/', 'images/');
          }
          
          projects.push(metadata);
          console.log('[load-projects-markdown] Parsed metadata for:', metadata.title);
        } else {
          console.warn('[load-projects-markdown] No front-matter found in:', filename);
        }
      } catch (fetchError) {
        console.error(`[load-projects-markdown] Error fetching ${filename}:`, fetchError);
      }
    }

    console.log('[load-projects-markdown] Loaded projects:', projects.length, projects);

    // Sort by order if present, then by date
    projects.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

    console.log('[load-projects-markdown] After sorting:', projects);

    // Now populate the coverflow using the same logic as load-projects.js
    const coverflow = document.getElementById('coverflow');
    const dots = document.getElementById('dots');
    const title = document.getElementById('current-title');
    const desc = document.getElementById('current-description');

    if (!coverflow || !dots) {
      throw new Error('Required DOM elements not found!');
    }

    coverflow.innerHTML = '';
    dots.innerHTML = '';

    projects.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'coverflow-item';
      item.dataset.index = idx;
      // Provide metadata used by templatemo script
      if (p.title) item.dataset.title = p.title;
      if (p.excerpt) item.dataset.excerpt = p.excerpt;

      // Store additional metadata from YAML front-matter
      if (p.repo_url) item.dataset.repo = p.repo_url;
      if (p.live_url) item.dataset.live = p.live_url;
      if (p.tags && p.tags.length) item.dataset.tags = p.tags.join(', ');

      const cover = document.createElement('div');
      cover.className = 'cover image-loading';

      const img = document.createElement('img');
      img.alt = p.title || `Project ${idx+1}`;
      img.loading = 'lazy';
      // Use thumbnail for coverflow, fallback to image, then placeholder
      const imgSrc = p.thumbnail || p.image || 'images/placeholder.svg';
      img.src = imgSrc;

      cover.appendChild(img);
      const reflection = document.createElement('div');
      reflection.className = 'reflection';

      item.appendChild(cover);
      item.appendChild(reflection);
      coverflow.appendChild(item);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.dataset.index = idx;
      dot.addEventListener('click', () => gotoIndex(idx));
      dots.appendChild(dot);
    });

    // Initialize coverflow to first item
    if (projects.length > 0) {
      updateCurrent(0, projects);
    }

    // If the templatemo script exposes initCoverflow, call it
    if (typeof window.initCoverflow === 'function') {
      console.log('[load-projects-markdown] Calling initCoverflow()');
      window.initCoverflow();
    } else {
      console.error('[load-projects-markdown] initCoverflow not found on window!');
    }

    // expose projects for other scripts
    window.__projects = projects;
    console.log('[load-projects-markdown] Initialization complete');

  } catch (err) {
    console.error('[load-projects-markdown] ERROR:', err);
    console.error('[load-projects-markdown] Error stack:', err.stack);
    
    // Show detailed error to user
    const title = document.getElementById('current-title');
    const desc = document.getElementById('current-description');
    if (title) title.textContent = 'Error Loading Projects';
    if (desc) {
      let errorMsg = err.message || 'Unknown error occurred';
      
      // Check if it's a network error
      if (err.message && err.message.includes('Failed to fetch')) {
        errorMsg = 'Network error: Unable to load projects. Please check your internet connection or try again later.';
      }
      
      desc.textContent = errorMsg;
      desc.style.color = '#ff6b6b';
      desc.style.fontSize = '14px';
    }
    
    // Show a helpful message in the coverflow area
    const coverflow = document.getElementById('coverflow');
    if (coverflow) {
      coverflow.innerHTML = `
        <div style="text-align: center; padding: 40px; color: white;">
          <p style="font-size: 18px; margin-bottom: 10px;">⚠️ Unable to load projects</p>
          <p style="font-size: 14px; opacity: 0.8;">Please check the browser console (F12) for details</p>
          <p style="font-size: 12px; opacity: 0.6; margin-top: 20px;">Try: Ctrl+Shift+R to hard refresh</p>
        </div>
      `;
    }
  }
}

function parseYamlFrontMatter(markdownContent) {
  console.log('[load-projects-markdown] Parsing front-matter from content length:', markdownContent.length);
  console.log('[load-projects-markdown] Content starts with:', JSON.stringify(markdownContent.substring(0, 10)));
  
  // Normalize line endings to \n
  const normalizedContent = markdownContent.replace(/\r\n/g, '\n');
  
  // Check for front-matter delimiters
  if (!normalizedContent.startsWith('---\n')) {
    console.log('[load-projects-markdown] No front-matter delimiter found');
    return null;
  }

  const endDelimiter = '\n---\n';
  const endIndex = normalizedContent.indexOf(endDelimiter, 4);
  if (endIndex === -1) {
    console.log('[load-projects-markdown] No closing front-matter delimiter found');
    return null;
  }

  const frontMatter = normalizedContent.substring(4, endIndex);
  console.log('[load-projects-markdown] Extracted front-matter:', frontMatter.substring(0, 200) + '...');

  try {
    // Check if jsyaml is available
    let yamlParser = jsyaml;
    if (typeof jsyaml === 'undefined') {
      if (typeof YAML !== 'undefined') {
        yamlParser = YAML;
      } else if (typeof window.jsyaml !== 'undefined') {
        yamlParser = window.jsyaml;
      } else if (typeof window.YAML !== 'undefined') {
        yamlParser = window.YAML;
      } else {
        console.error('[load-projects-markdown] No YAML parser found');
        return null;
      }
    }
    // Parse YAML using js-yaml
    const metadata = yamlParser.load(frontMatter);
    console.log('[load-projects-markdown] Parsed metadata:', metadata);
    return metadata;
  } catch (err) {
    console.error('[load-projects-markdown] YAML parse error:', err);
    return null;
  }
}

function updateCurrent(index, projects) {
  const title = document.getElementById('current-title');
  const desc = document.getElementById('current-description');
  const dots = document.getElementById('dots');

  const p = projects[index] || {};
  title.textContent = p.title || '';
  desc.textContent = p.excerpt || '';

  // update active dot
  Array.from(dots.children).forEach((d) => d.classList.toggle('active', Number(d.dataset.index) === index));
}

function gotoIndex(i) {
  const coverflow = document.getElementById('coverflow');
  const items = Array.from(coverflow.children);
  const total = items.length;
  if (total === 0) return;

  const idx = ((i % total) + total) % total;
  items.forEach((it, j) => {
    it.classList.toggle('center', j === idx);
  });

  if (window.__projects) updateCurrent(idx, window.__projects);
}

// Simple navigate used by existing buttons
function navigate(delta) {
  const coverflow = document.getElementById('coverflow');
  const items = Array.from(coverflow.children);
  if (items.length === 0) return;
  const current = items.findIndex((it) => it.classList.contains('center'));
  const next = current === -1 ? 0 : (current + delta + items.length) % items.length;
  gotoIndex(next);
}

// Execute immediately
(async () => {
  await loadProjectsFromMarkdown();
})();