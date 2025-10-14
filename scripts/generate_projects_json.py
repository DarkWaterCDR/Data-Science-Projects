#!/usr/bin/env python3
"""
Generate a projects.json file from markdown files under ../projects.

This script parses YAML front-matter from markdown files (if present),
falling back to regex extraction for files without front-matter.

Supported front-matter fields:
- title: Project title
- date: ISO date (for ordering/display)
- image: Main image path
- thumbnail: Thumbnail image path
- excerpt: Short summary
- tags: Array of category tags
- repo_url: GitHub/source repository URL
- live_url: Live demo URL
- order: Custom numeric ordering

Output: ../temp/projects.json
"""
import os
import re
import json
from glob import glob


def parse_front_matter(text):
    """
    Parse YAML front-matter from markdown text.
    Returns (metadata_dict, body_text) or (None, original_text).
    """
    # Check for front-matter delimiters
    if not text.startswith('---\n'):
        return None, text
    
    # Find the closing delimiter
    end_match = re.search(r'\n---\n', text[4:])
    if not end_match:
        return None, text
    
    end_pos = end_match.start() + 4  # +4 for initial '---\n'
    front_matter = text[4:end_pos]
    body = text[end_pos + 5:]  # +5 for '\n---\n'
    
    # Simple YAML parser for our needs (handles strings, lists, comments)
    metadata = {}
    current_key = None
    in_list = False
    
    for line in front_matter.split('\n'):
        # Skip comments and empty lines
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue
        
        # Check for list items
        if stripped.startswith('- ') and current_key:
            if not in_list:
                metadata[current_key] = []
                in_list = True
            metadata[current_key].append(stripped[2:].strip())
            continue
        
        # Check for key: value pairs
        if ':' in line and not line.startswith(' '):
            in_list = False
            key, _, value = line.partition(':')
            current_key = key.strip()
            value = value.strip()
            
            # Remove quotes if present
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            
            # Convert to appropriate type
            if value.lower() == 'true':
                metadata[current_key] = True
            elif value.lower() == 'false':
                metadata[current_key] = False
            elif value.isdigit():
                metadata[current_key] = int(value)
            elif value:
                metadata[current_key] = value
            else:
                metadata[current_key] = None
    
    return metadata, body


def extract_from_markdown(path):
    """Extract project metadata from markdown file."""
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Try to parse front-matter first
    front_matter, body = parse_front_matter(text)
    
    if front_matter:
        # Use front-matter data with fallbacks
        title = front_matter.get('title')
        if not title:
            # Fall back to H1 in body
            title_match = re.search(r'^#\s+(.+)', body, flags=re.MULTILINE)
            title = (title_match.group(1).strip() if title_match 
                    else os.path.splitext(os.path.basename(path))[0])
        
        return {
            'filename': os.path.basename(path),
            'title': title,
            'excerpt': front_matter.get('excerpt', ''),
            'image': front_matter.get('image'),
            'thumbnail': front_matter.get('thumbnail'),
            'date': front_matter.get('date'),
            'tags': front_matter.get('tags', []),
            'repo_url': front_matter.get('repo_url'),
            'live_url': front_matter.get('live_url'),
            'order': front_matter.get('order')
        }
    
    # No front-matter: fall back to regex extraction
    # Title: first line starting with '# '
    title_match = re.search(r'^#\s+(.+)', text, flags=re.MULTILINE)
    title = (title_match.group(1).strip() if title_match 
            else os.path.splitext(os.path.basename(path))[0])

    # First image: markdown image syntax ![alt](url)
    img_match = re.search(r'!\[[^\]]*\]\(([^)]+)\)', text)
    image = img_match.group(1).strip() if img_match else None

    # Excerpt: first paragraph that is not a header or image or list
    excerpt = None
    for block in re.split(r'\n\s*\n', text):
        s = block.strip()
        if not s:
            continue
        # Skip headers, images, lists, quotes, code blocks
        if (s.startswith('#') or s.startswith('![') or 
            s.startswith('- ') or s.startswith('>') or 
            s.startswith('```')):
            continue
        # Clean markdown inline links/images/code
        s_clean = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', s)
        s_clean = re.sub(
            r'\[[^\]]*\]\([^)]*\)', 
            lambda m: m.group(0).split('](')[0].lstrip('[').rstrip(']'), 
            s_clean
        )
        s_clean = re.sub(r'[`*_>#-]', '', s_clean)
        s_clean = re.sub(r'\s+', ' ', s_clean).strip()
        if s_clean:
            excerpt = s_clean
            break

    return {
        'filename': os.path.basename(path),
        'title': title,
        'excerpt': excerpt or '',
        'image': image,
        'thumbnail': None,
        'date': None,
        'tags': [],
        'repo_url': None,
        'live_url': None,
        'order': None
    }


def main():
    """Generate projects.json from markdown files in projects/ directory."""
    repo_root = os.path.dirname(os.path.dirname(__file__))
    projects_dir = os.path.join(repo_root, 'projects')
    out_dir = os.path.join(repo_root, 'temp')
    os.makedirs(out_dir, exist_ok=True)

    md_files = sorted(glob(os.path.join(projects_dir, '*.md')))
    projects = []
    for md in md_files:
        data = extract_from_markdown(md)
        # If no image, we'll leave image as None; client uses placeholders
        projects.append(data)

    # Sort by order field (if present), then by filename
    projects.sort(key=lambda p: (
        p['order'] if p['order'] is not None else 9999,
        p['filename']
    ))

    out_path = os.path.join(out_dir, 'projects.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)

    print(f'Wrote {len(projects)} projects to {out_path}')
    
    # Print summary of parsed projects
    for proj in projects:
        tags_str = ', '.join(proj['tags']) if proj['tags'] else 'none'
        print(f"  - {proj['title']} (order: {proj['order']}, "
              f"tags: {tags_str})")


if __name__ == '__main__':
    main()
