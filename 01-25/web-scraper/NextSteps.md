# ✅ WebPage HTML Parsing Plan (DFS-based)

Convert a raw HTML string into a `WebPage` with a tree of `DOMNode`s using depth-first search.

---

## 🔧 Setup

- [ ] Receive HTML string from `HandleLoadPage()`
- [ ] Use `DOMParser` to convert HTML string to a `Document` object

---

## 🌿 Start from <body>

- [ ] Access `document.body`
- [ ] Get its direct children (`document.body.children`)
- [ ] For each child element:
  - [ ] Call the DFS function to build a `DOMNode`
  - [ ] Add it to `WebPage` using `.addRootNode()`

---

## 🧭 DFS Function Logic

- [ ] Take an `Element` as input
- [ ] Create a new `DOMNode` with:
  - [ ] `.text`: element’s `textContent` (trimmed)
  - [ ] `.htmlclass`: value from `class` attribute
  - [ ] `.link`: if the element has an `href`
  - [ ] `.image`: set to `true` if tag is `<img>`
  - [ ] `.imageLink`: if `<img>`, use `src` attribute
- [ ] Loop over `element.children`
  - [ ] For each child:
    - [ ] Call DFS recursively
    - [ ] Add the result as a child using `.addChild()`

---

## 🧠 Optional Enhancements

- [ ] Skip tags like `<script>`, `<style>`, `<noscript>` if not needed
- [ ] Add `tagName` or `id` as part of `DOMNode` if useful
- [ ] Limit depth or node count if you're processing large pages
- [ ] Normalize whitespace and remove invisible elements

---

## 🎯 Result

- [ ] Return the `WebPage` instance
- [ ] Now ready to store in your `Cake.pageTree` cache

---
