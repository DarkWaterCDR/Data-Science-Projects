// Load projects from GitHub repository markdown files with YAML front-matter
// Requires: js-yaml (loaded from CDN)

const GITHUB_API_BASE = 'https://api.github.com/repos/DarkWaterCDR/Data-Science-Projects';
const PROJECTS_PATH = 'contents/docs/projects';

async function loadProjectsFromMarkdown() {
  console.log('[load-projects-markdown] Starting loadProjectsFromMarkdown() - GitHub mode');

  try {
    // Fetch list of files in the projects directory from GitHub
    const listUrl = `${GITHUB_API_BASE}/${PROJECTS_PATH}`;
    console.log('[load-projects-markdown] Fetching project list from:', listUrl);
    
    const listResponse = await fetch(listUrl);
    if (!listResponse.ok) {
      throw new Error(`Failed to fetch project list: ${listResponse.status}`);
    }
    
    const files = await listResponse.json();
    console.log('[load-projects-markdown] Found files:', files.length);
    
    // Filter markdown files only
    const markdownFiles = files.filter(file => 
      file.name.endsWith('.md') && file.type === 'file'
    );
    console.log('[load-projects-markdown] Markdown files found:', markdownFiles.length);

    const projects = [];

    for (const file of markdownFiles) {
      console.log('[load-projects-markdown] Fetching content for:', file.name);
      
      // Fetch the raw content using download_url
      const contentResponse = await fetch(file.download_url);
      if (!contentResponse.ok) {
        console.warn(`[load-projects-markdown] Failed to fetch ${file.name}: ${contentResponse.status}`);
        continue;
      }
      
      const markdownContent = await contentResponse.text();
      console.log(`[load-projects-markdown] Content length for ${file.name}:`, markdownContent.length);

      // Parse YAML front-matter
      const metadata = parseYamlFrontMatter(markdownContent);
      if (metadata) {
        // Add filename for reference
        metadata.filename = file.name;
        
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
        console.warn('[load-projects-markdown] No front-matter found in:', file.name);
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
    // Show error to user
    const title = document.getElementById('current-title');
    const desc = document.getElementById('current-description');
    if (title) title.textContent = 'Error loading projects';
    if (desc) desc.textContent = err.message;
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