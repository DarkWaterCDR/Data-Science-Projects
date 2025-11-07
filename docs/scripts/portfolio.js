// Portfolio JavaScript - Simple project loading and view switching
// Loads projects from local markdown files and displays in grid/list views

// Load from local project directories (files copied to docs/)
const PROJECTS_BASE = './';

// Project configurations with local filenames
const PROJECT_CONFIGS = [
  { filename: 'Childcare-Affordability.md', title: 'Childcare Affordability Analysis' },
  { filename: 'Healthy-Habits.md', title: 'Healthy Habits Clustering' },
  { filename: 'Pure-Premium-GLM.md', title: 'Pure Premium GLM Modeling' },
  { filename: 'Estimating-MPG.md', title: 'MPG Estimation Analysis' },
  { filename: 'Framingham-Heart-Study.md', title: 'Framingham Heart Study' }
];

let currentView = 'grid'; // 'grid' or 'list'
let projects = [];

// Initialize showdown converter for markdown to HTML
const showdownConverter = new showdown.Converter({
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true
});

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

// Load projects from local markdown files
async function loadProjects() {
  console.log('[portfolio] Loading projects...');

  for (const config of PROJECT_CONFIGS) {
    try {
      console.log(`[portfolio] Fetching ${config.filename}`);

      const contentUrl = `${PROJECTS_BASE}${config.filename}`;
      const response = await fetch(contentUrl);

      if (!response.ok) {
        console.warn(`[portfolio] Failed to fetch ${config.filename}: ${response.status}`);
        continue;
      }

      const markdownContent = await response.text();
      const project = parseProjectMarkdown(markdownContent, config.filename);

      if (project) {
        // Override title if specified in config
        if (config.title) {
          project.title = config.title;
        }
        projects.push(project);
      }

    } catch (error) {
      console.warn(`[portfolio] Error loading ${config.filename}:`, error);
    }
  }

  console.log(`[portfolio] Loaded ${projects.length} projects`);
  renderProjects();
}

// Parse project markdown content (no YAML front-matter expected)
function parseProjectMarkdown(markdownContent, filename) {
  try {
    // Extract title from first heading
    const titleMatch = markdownContent.match(/^#\s*\*\*(.+?)\*\*/m);
    const title = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '').replace(/-/g, ' ');

    // Extract synopsis from Synopsis section
    const synopsisMatch = markdownContent.match(/## \*\*Synopsis\*\*\s*\n([\s\S]*?)(?=---|\n##)/);
    const synopsis = synopsisMatch ? synopsisMatch[1].trim() : '';

    // Extract skills from Skills section
    const skillsMatch = markdownContent.match(/## \*\*Skills Demonstrated[\s\S]*?\*\*\s*\n([\s\S]*?)(?=---|\n##)/);
    const skillsText = skillsMatch ? skillsMatch[1].trim() : '';
    const skills = skillsText ? skillsText.split('\n').map(line => line.replace(/^\*\s*/, '').trim()).filter(line => line) : [];

    // Create project object
    return {
      title,
      synopsis,
      skills,
      content: markdownContent,
      filename,
      // Default metadata since no YAML front-matter
      description: synopsis,
      image: 'images/project-placeholder.svg', // Default placeholder image
      tags: skills.slice(0, 3) // Use first 3 skills as tags
    };

  } catch (error) {
    console.warn(`[portfolio] Error parsing ${filename}:`, error);
    return null;
  }
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

// Create grid project card
function createGridProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.onclick = () => openProject(project);

  // Create excerpt from synopsis (first 100 characters)
  const excerpt = project.synopsis.length > 100
    ? project.synopsis.substring(0, 100) + '...'
    : project.synopsis;

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.style.display='none'">
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-excerpt">${excerpt}</p>
    </div>
  `;

  return card;
}

// Create list view project item
function createListProjectItem(project) {
  const item = document.createElement('div');
  item.className = 'list-item';
  item.onclick = () => openProject(project);

  // Convert markdown synopsis to HTML
  const synopsisHtml = showdownConverter.makeHtml(project.synopsis);

  // Format skills as a nice list
  const skillsHtml = project.skills.length > 0
    ? `<div class="skills-list">${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</div>`
    : '';

  item.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="list-image" loading="lazy" onerror="this.style.display='none'">
    <div class="list-content">
      <h3 class="list-title">${project.title}</h3>
      <div class="list-synopsis">${synopsisHtml}</div>
      ${skillsHtml ? `<div class="list-skills"><strong>Skills Demonstrated:</strong>${skillsHtml}</div>` : ''}
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