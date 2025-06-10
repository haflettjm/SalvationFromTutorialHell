# 🕷️ Extremely Complicated Deno Web Scraper

A lightweight web scraper built with [Deno](https://deno.land/), designed to fetch and parse content from websites using modern JavaScript and native web APIs.

---

## 🚀 Features

- Written in TypeScript using Deno
- Fetches and parses HTML using DOM APIs
- Outputs structured data (JSON/CSV/etc.)
- CLI support for quick scraping tasks
- Simple, modular architecture
- Cache Implementation
- Storage of scraped items to zip folders
- MetaData stored with pages in .meta files for Sorting

---

## 🛠 Requirements

- [Deno](https://deno.land) v1.40 or later

---

## 📦 Installation

```bash
deno install --allow-net --allow-read --allow-write -n scraper ./scraper.ts
```
---
## Site
 - https://web-scraping.dev/

---
## Brainstorm goals

- Have list of sites
- Build out navigation web to cache of each site
- Pull full content into Cache
- Dump cache of each domain to seperate file
- Put file into zip folder
- delete original folder
- Then archive total haul for the scrape
- Push to blob storage(long term goal)
---
## Notes

I don't think this will have a serious use but I want to try and keep flow as professional as I can at the moment

It's unlikely this data will be useful but I will at least have some solid fundamentals down for future projects I plan on building.
