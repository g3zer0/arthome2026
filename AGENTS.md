## Cursor Cloud specific instructions

This is a static website (HTML/CSS/JS) with no build tools, package manager, or backend. All dependencies are loaded via CDN.

### Running the dev server

Serve the files from the repository root with any static HTTP server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

### Key notes

- **No linting/testing/build step**: There is no `package.json`, no test framework, and no build pipeline. The site is pure vanilla HTML/CSS/JS.
- **CDN dependencies**: Tailwind CSS is loaded from `cdn.tailwindcss.com`, avatars from `api.dicebear.com`, and placeholder images from `picsum.photos`. Internet access is required.
- **Photo upload**: The upload button POSTs to an external Google Apps Script endpoint. This is a third-party service and is not controllable locally.
- **Hot reload**: The Python HTTP server does not support hot reload. After editing files, refresh the browser manually.
