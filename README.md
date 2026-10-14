# TechHaus — Tech Product Showcase

A responsive, interactive tech product storefront made with **HTML, CSS, JavaScript, and jQuery**. Designed as a clean, modern showcase for a web-design / jQuery practical.

## Features
- Responsive layout for desktop, tablet, and mobile.
- Product showcase cards with images, pricing, ratings, and hover effects.
- jQuery category filters, live search, and price sorting.
- Wishlist toggle with feedback toast.
- Quick-look product modal.
- Interactive shopping bag with quantities, remove action, and subtotal.
- Newsletter form interaction (demo only).
- Mobile navigation menu.
- Smooth scrolling and reduced-motion support.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a browser. For best results, use VS Code with the Live Server extension.
3. An internet connection is needed for the hosted product images, Google Fonts, and jQuery CDN.

## Project files
- `index.html` — page structure and product content.
- `style.css` — visual styling and responsive breakpoints.
- `script.js` — jQuery interactions.

## jQuery actions demonstrated
- `$(document).ready(...)`
- `.on("click", ...)` and `.on("input", ...)`
- `.toggleClass()`, `.addClass()`, `.removeClass()`
- `.val()`, `.text()`, `.html()`
- `.filter()`, `.each()`, `.append()`, `.toggle()`
- `.trigger("focus")`
- `preventDefault()` for the newsletter form

## Note
This is a showcase/demo storefront. Cart state is held in memory and is reset when the page reloads. Checkout does not collect payments, and the newsletter form does not send emails. Product images are loaded from Unsplash URLs.
