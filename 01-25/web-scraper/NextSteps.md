
# Web Crawler CLI: Completion Checklist

## 📦 Core Functionality
- [x] Crawl a given URL and parse HTML into a `DOMNode` tree
- [x] Track and store unique node IDs (`node-{id}` style)
- [ ] Maintain reverse lookup maps by tag and link
- [x] Avoid duplicate links and DOM nodes
- [ ] Support deep link crawling across multiple pages
- [x] Handle invalid/malformed HTML gracefully (and log it)
- [x] Add a `--force` flag to force rebuilds from the same HTML
- [x] Track `sitemap`, `pages`, `pageTree`, and `rawResponses` cleanly in cache
- [ ] Assign a unique crawl ID or timestamp for storage purposes
- [ ] Add concurrency for crawling multiple links in parallel

## 🧪 Testing & Validation
- [x] Unit tests for `buildWebPage`, `DfsWalk`, and cache behavior
- [ ] Integration tests for full crawl pipeline with dummy HTML
- [x] Tests that validate `pageTree` structure and content
- [x] Tests that ensure proper skipping of redundant work
- [ ] Tests for error handling on invalid/missing body

## 🗂️ Data Storage & Archival
- [ ] Write cache contents (including `sitemap`, DOM trees, and metadata) to JSON file
- [ ] Save a human-readable log/report alongside each crawl (e.g., `crawl-log.txt`)
- [ ] Zip the resulting folder per crawl (e.g., `crawl-2025-06-10.zip`)
- [ ] Create `./archives/` directory structure and index
- [ ] Compression with checksum validation

## ⚙️ CLI Interface (e.g. `crawl.ts`)
- [ ] Accept target URLs as input from .env variable
- [ ] Optional flags:
  - [ ] `--force`
  - [ ] `--output=PATH`
  - [ ] `--depth=N`
  - [ ] `--verbose` for debug output
- [ ] Output status/progress to console
- [ ] Write crawl summary to stdout and file

## 🕒 Scheduling & Automation
- [ ] Write a cron-friendly shell script wrapper
- [ ] Store last crawl metadata (timestamp, site, pages)
- [ ] Detect duplicate runs (avoid crawling unchanged sites unless forced)
- [ ] Add cron logs or stdout capture

## 📘 Documentation
- [x] Project README:
  - [ ] Install instructions
  - [ ] CLI usage
  - [ ] Example output
  - [ ] Dev setup
- [ ] Inline code comments for complex logic
- [ ] TypeDocs or JSDoc-style annotations for major types (like `DOMNode`, `WebPage`, `Cake`)
- [ ] Document how to add new parsers or crawling rules

## 🚀 Stretch Goals / Advanced
- [ ] Support robots.txt parsing
- [ ] Integrate with SQLite or key-value store for large-scale archival
- [ ] Web dashboard to browse archived crawls
- [ ] Plugin system for post-processing DOM data (e.g., extracting articles or metadata)
