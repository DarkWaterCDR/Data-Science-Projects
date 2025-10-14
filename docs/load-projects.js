// Fetch projects.json and populate the coverflow
async function loadProjects() {
  console.log('[load-projects] Starting loadProjects()');
  console.log('[load-projects] DOM ready state:', document.readyState);
  try {
    console.log('[load-projects] Fetching projects.json...');
    console.log('[load-projects] Current location:', window.location.href);
    console.log('[load-projects] Fetch URL:', new URL('projects.json', window.location.href).href);
    const res = await fetch('projects.json');
    console.log('[load-projects] Fetch response status:', res.status);
    if (!res.ok) throw new Error(`Failed to load projects.json: ${res.status} ${res.statusText}`);
    const projects = await res.json();
    console.log('[load-projects] Loaded projects:', projects.length, projects);

    const coverflow = document.getElementById('coverflow');
    const dots = document.getElementById('dots');
    const title = document.getElementById('current-title');
    const desc = document.getElementById('current-description');

    console.log('[load-projects] Found DOM elements:', {
      coverflow: !!coverflow,
      dots: !!dots,
      title: !!title,
      desc: !!desc
    });

    if (!coverflow || !dots) {
      throw new Error('Required DOM elements not found!');
    }

    coverflow.innerHTML = '';
    dots.innerHTML = '';
    console.log('[load-projects] Cleared existing content');

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

    // Initialize coverflow to first item and call the template initializer
    console.log('[load-projects] Injected', projects.length, 'items into DOM');
    if (projects.length > 0) {
      updateCurrent(0, projects);
    }

    // If the templatemo script exposes initCoverflow, call it to wire interactions
    if (typeof window.initCoverflow === 'function') {
      console.log('[load-projects] Calling initCoverflow()');
      window.initCoverflow();
    } else {
      console.error('[load-projects] initCoverflow not found on window!');
    }

    // expose projects for other scripts
    window.__projects = projects;
    console.log('[load-projects] Initialization complete');
    console.log('[load-projects] Final state check:');
    console.log('  - Coverflow children:', document.getElementById('coverflow').children.length);
    console.log('  - Dots children:', document.getElementById('dots').children.length);
    console.log('  - Title text:', document.getElementById('current-title').textContent);
  } catch (err) {
    console.error('[load-projects] ERROR:', err);
    console.error('[load-projects] Stack:', err.stack);
    // Show error to user
    const title = document.getElementById('current-title');
    const desc = document.getElementById('current-description');
    if (title) title.textContent = 'Error loading projects';
    if (desc) desc.textContent = err.message;
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

  // simple transform: set tabindex focus to the chosen item
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

// Note: toggleAutoplay is now handled by templatemo script after initCoverflow()
// The HTML onclick="toggleAutoplay()" will call window.toggleAutoplay directly

// Execute immediately - scripts are at end of body so DOM is ready
// This ensures we inject items BEFORE templatemo script tries to initialize
(async () => {
  await loadProjects();
})();
