// Portfolio JavaScript - Simple project loading and view switching
// Loads projects from GitHub markdown files and displays in grid/list views

// Use raw.githubusercontent.com to bypass API rate limits
const RAW_GITHUB_BASE = 'https://raw.githubusercontent.com/DarkWaterCDR/Data-Science-Projects/main/docs/projects';

// Hardcode project filenames to avoid API calls for directory listing
const PROJECT_FILES = [
  'Childcare-Affordability.md',
  'Healthy-Habits-Clustering.md',
  'Project-GLM.md',
  'Estimating-MPG.md',
  'Framingham-Study.md'
];

let currentView = 'grid'; // 'grid' or 'list'
let projects = [];

// Initialize the portfolio
async function initPortfolio() {
  console.log('[portfolio] Initializing portfolio...');

  try {
    // Load projects from markdown
    await loadProjects();

    // Set up view switching
    setupViewToggle();

    // Set up scroll to top
    setupScrollToTop();

    // Set up mobile menu
    setupMobileMenu();

    console.log('[portfolio] Portfolio initialized successfully');
  } catch (error) {
    console.error('[portfolio] Failed to initialize portfolio:', error);
    showError('Failed to load portfolio. Please try refreshing the page.');
  }
}

// Load projects from GitHub markdown files
async function loadProjects() {
  console.log('[portfolio] Loading projects...');

  const cacheBuster = `?t=${Date.now()}`;

  for (const filename of PROJECT_FILES) {
    try {
      console.log(`[portfolio] Fetching ${filename}`);

      const contentUrl = `${RAW_GITHUB_BASE}/${filename}${cacheBuster}`;
      const response = await fetch(contentUrl);

      if (!response.ok) {
        console.warn(`[portfolio] Failed to fetch ${filename}: ${response.status}`);
        continue;
      }

      const markdownContent = await response.text();
      const project = parseProjectMarkdown(markdownContent, filename);

      if (project) {
        projects.push(project);
      }

    } catch (error) {
      console.warn(`[portfolio] Error loading ${filename}:`, error);
    }
  }

  console.log(`[portfolio] Loaded ${projects.length} projects`);
  renderProjects();
}

// Parse project markdown with YAML front-matter
function parseProjectMarkdown(markdownContent, filename) {
  try {
    // Split front-matter and content
    const parts = markdownContent.split('---');
    if (parts.length < 3) return null;

    const frontMatter = parts[1];
    const content = parts.slice(2).join('---');

    // Parse YAML front-matter
    const metadata = jsyaml.load(frontMatter);

    // Extract synopsis and skills from content
    const synopsis = extractSynopsis(content);
    const skills = extractSkills(content);

    return {
      ...metadata,
      filename,
      synopsis,
      skills,
      content
    };
  } catch (error) {
    console.warn(`[portfolio] Error parsing ${filename}:`, error);
    return null;
  }
}

// Extract synopsis from markdown content
function extractSynopsis(content) {
  const synopsisMatch = content.match(/\*\*Synopsis:\*\*(.*?)(?=\n\n|\*\*Skills|\*\*Purpose|\n\n---)/s);
  return synopsisMatch ? synopsisMatch[1].trim() : '';
}

// Extract skills from markdown content
function extractSkills(content) {
  const skillsMatch = content.match(/\*\*Skills Demonstrated.*?:(.*?)(?=\n\n|\*\*Technical|\*\*Key|\n\n---)/s);
  return skillsMatch ? skillsMatch[1].trim() : '';
}

// Render projects based on current view
function renderProjects() {
  const container = document.getElementById('projectsContent');
  if (!container) return;

  // Clear loading message
  container.innerHTML = '';

  if (projects.length === 0) {
    container.innerHTML = '<div class="loading">No projects found.</div>';
    return;
  }

  // Create view container
  const viewContainer = document.createElement('div');
  viewContainer.className = currentView === 'grid' ? 'grid-view' : 'list-view';

  // Render each project
  projects.forEach(project => {
    const projectElement = createProjectElement(project);
    viewContainer.appendChild(projectElement);
  });

  container.appendChild(viewContainer);
}

// Create project element based on current view
function createProjectElement(project) {
  if (currentView === 'grid') {
    return createGridProjectCard(project);
  } else {
    return createListProjectItem(project);
  }
}

// Create grid view project card
function createGridProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.onclick = () => openProject(project);

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-excerpt">${project.excerpt}</p>
    </div>
  `;

  return card;
}

// Create list view project item
function createListProjectItem(project) {
  const item = document.createElement('div');
  item.className = 'list-item';
  item.onclick = () => openProject(project);

  item.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="list-image" loading="lazy">
    <div class="list-content">
      <h3 class="list-title">${project.title}</h3>
      <p class="list-synopsis">${project.synopsis}</p>
      <p class="list-skills"><strong>Skills:</strong> ${project.skills}</p>
    </div>
  `;

  return item;
}

// Open project in new tab
function openProject(project) {
  if (project.live_url) {
    window.open(project.live_url, '_blank');
  } else if (project.repo_url) {
    window.open(project.repo_url, '_blank');
  }
}

// Set up view toggle buttons
function setupViewToggle() {
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));
  }
}

// Switch between grid and list views
function setView(view) {
  if (view === currentView) return;

  currentView = view;

  // Update button states
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  if (gridBtn && listBtn) {
    gridBtn.classList.toggle('active', view === 'grid');
    listBtn.classList.toggle('active', view === 'list');
  }

  // Re-render projects
  renderProjects();
}

// Set up scroll to top functionality
function setupScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Set up mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Show error message
function showError(message) {
  const container = document.getElementById('projectsContent');
  if (container) {
    container.innerHTML = `<div class="loading" style="color: #ff6b6b;">${message}</div>`;
  }
}

// Smooth scroll for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Header scroll effect
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  setupSmoothScrolling();
  setupHeaderScroll();
});

// Export functions for potential external use
window.Portfolio = {
  setView,
  currentView: () => currentView
};