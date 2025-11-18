// Portfolio JavaScript - Simple project loading and view switching
// Loads projects from local markdown files and displays in grid/list views

// Load from projects directory with metadata
// Use GitHub raw content URL for GitHub Pages, local path for local development
const isLocalDevelopment = window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.startsWith('192.168.') ||
                          window.location.hostname.startsWith('10.') ||
                          window.location.hostname.startsWith('172.');

const PROJECTS_BASE = isLocalDevelopment
  ? './projects/'
  : 'https://raw.githubusercontent.com/DarkWaterCDR/Data-Science-Projects/main/docs/projects/';

// Project configurations with filenames in projects directory
const PROJECT_FILES = [
  'Childcare-Affordability.md',
  'Healthy-Habits-Clustering.md',
  'Project-GLM.md',
  'Estimating-MPG.md',
  'Framingham-Study.md',
  'Weather-CLI.md',
  'Galactic-Data-Collector.md'
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

  for (const filename of PROJECT_FILES) {
    try {
      console.log(`[portfolio] Fetching ${filename}`);

      const contentUrl = `${PROJECTS_BASE}${filename}`;
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
    if (parts.length < 3) {
      console.warn(`[portfolio] No YAML front-matter found in ${filename}`);
      return null;
    }

    const frontMatter = parts[1];
    const content = parts.slice(2).join('---');

    // Parse YAML front-matter
    const metadata = jsyaml.load(frontMatter);

    // Convert relative image paths to absolute URLs for GitHub Pages
    if (!isLocalDevelopment && metadata.image && !metadata.image.startsWith('http')) {
      metadata.image = `https://darkwatercdr.github.io/Data-Science-Projects/images/${metadata.image.replace('images/', '')}`;
    }
    if (!isLocalDevelopment && metadata.thumbnail && !metadata.thumbnail.startsWith('http')) {
      metadata.thumbnail = `https://darkwatercdr.github.io/Data-Science-Projects/images/${metadata.thumbnail.replace('images/', '')}`;
    }

    // Extract synopsis from content
    const synopsisMatch = content.match(/## \*\*Synopsis\*\*\s*\n([\s\S]*?)(?=---|\n##)/);
    const synopsis = synopsisMatch ? synopsisMatch[1].trim() : '';

    // Extract skills from Skills section and convert markdown to HTML
    const skillsMatch = content.match(/## \*\*Skills Demonstrated[\s\S]*?\*\*\s*\n([\s\S]*?)(?=---|\n##|\n\[)/);
    const skillsMarkdown = skillsMatch ? skillsMatch[1].trim() : '';
    const skillsHtml = skillsMarkdown ? showdownConverter.makeHtml(skillsMarkdown) : '';

    // Create project object with metadata from YAML
    return {
      ...metadata,
      synopsis,
      skills: skillsHtml,
      content: markdownContent,
      filename
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

  // Use excerpt from YAML metadata, fallback to truncated synopsis
  const excerpt = project.excerpt || (project.synopsis.length > 150
    ? project.synopsis.substring(0, 150) + '...'
    : project.synopsis);

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

  item.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="list-image" loading="lazy" onerror="this.style.display='none'">
    <div class="list-content">
      <h3 class="list-title">${project.title}</h3>
      <div class="list-synopsis">${synopsisHtml}</div>
      ${project.skills ? `<div class="list-skills"><strong>Skills Demonstrated:</strong><div class="skills-content">${project.skills}</div></div>` : ''}
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

      const href = this.getAttribute('href');
      let target = document.querySelector(href);

      if (target) {
        // Close mobile menu if open
        const mainMenu = document.getElementById('mainMenu');
        const menuToggle = document.getElementById('menuToggle');
        if (mainMenu && mainMenu.classList.contains('active')) {
          mainMenu.classList.remove('active');
          menuToggle.classList.remove('active');
        }

        // Special handling for sections - scroll to section instead of header for better positioning
        if (href === '#projects') {
          const projectsSection = document.querySelector('.projects-section');
          if (projectsSection) {
            target = projectsSection;
          }
        } else if (href === '#about') {
          const aboutSection = document.querySelector('.about-content')?.parentElement;
          if (aboutSection) {
            target = aboutSection;
          }
        } else if (href === '#contact') {
          const contactSection = document.querySelector('.contact-content')?.parentElement;
          if (contactSection) {
            target = contactSection;
          }
        }

        // Calculate header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Get target position and scroll with offset
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
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

// Active menu highlighting functionality
let menuItems = [];
let sections = [];
let currentActiveMenuItem = null;

// Initialize active menu highlighting
function setupActiveMenuHighlighting() {
  // Get all menu items that link to sections (exclude external links)
  const mainMenu = document.getElementById('mainMenu');
  if (!mainMenu) return;

  menuItems = Array.from(mainMenu.querySelectorAll('a.menu-item:not(.external)'));

  // Get corresponding sections
  sections = menuItems.map(item => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      return document.querySelector(href);
    }
    return null;
  }).filter(section => section !== null);

  // Set up scroll event listener with throttling
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateActiveMenuItem();
        scrollTimeout = null;
      }, 50); // Throttle to ~20fps
    }
  });

  // Set up click event listeners for menu items
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      // Immediately update active state on click
      setActiveMenuItem(item);
    });
  });

  // Initial update
  updateActiveMenuItem();
}

// Update which menu item should be active based on scroll position
function updateActiveMenuItem() {
  const scrollY = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const viewportCenter = scrollY + windowHeight / 2;

  let activeItem = null;
  let maxVisibility = 0;

  // Check each section to see which one is most visible
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollY; // Absolute position from top of document
    const sectionBottom = rect.bottom + scrollY; // Absolute position from top of document
    const sectionHeight = rect.height;

    // Calculate how much of the section is visible in the viewport
    const visibleTop = Math.max(scrollY, sectionTop);
    const visibleBottom = Math.min(scrollY + windowHeight, sectionBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibilityRatio = visibleHeight / sectionHeight;

    // Also check if the section center is closest to viewport center
    const sectionCenter = sectionTop + sectionHeight / 2;
    const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

    // Prioritize sections that are more visible and closer to center
    const score = visibilityRatio * 100 - distanceFromCenter * 0.01;

    if (score > maxVisibility) {
      maxVisibility = score;
      activeItem = menuItems[index];
    }
  });

  // Special case: if we're at the very top, activate Home
  if (scrollY < 100 && menuItems.length > 0) {
    activeItem = menuItems[0]; // First item is Home
  }

  // Special case: if we're at the very bottom, activate last section
  const documentHeight = document.documentElement.scrollHeight;
  if (scrollY + windowHeight > documentHeight - 100 && menuItems.length > 0) {
    activeItem = menuItems[menuItems.length - 1]; // Last item
  }

  if (activeItem) {
    setActiveMenuItem(activeItem);
  }
}

// Set the active menu item
function setActiveMenuItem(activeItem) {
  if (currentActiveMenuItem === activeItem) return;

  // Remove active class from all menu items
  menuItems.forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to the new active item
  if (activeItem) {
    activeItem.classList.add('active');
    currentActiveMenuItem = activeItem;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  setupSmoothScrolling();
  setupHeaderScroll();
  setupActiveMenuHighlighting(); // Add this line
});

// Export functions for potential external use
window.Portfolio = {
  setView,
  currentView: () => currentView
};