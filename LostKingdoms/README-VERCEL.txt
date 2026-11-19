LOST KINGDOMS WEBSITE - VERCEL DEPLOYMENT

DEPLOY / UPDATE
1. Extract this ZIP.
2. Upload the website files to the root of your connected GitHub repository.
3. In Vercel use Framework Preset: Other; Root Directory: ./; Build Command: empty; Install Command: empty; Output Directory: . (a single dot).
4. Commit/push. Vercel automatically creates a new deployment.

CHAPTER PAGES
- Chapter 1: /play/chapter-1/
- Chapter 2: /play/chapter-2/
Desktop browsers load the Unity player inside the dedicated chapter page. Touch devices and Safari browsers get a launch button that opens Unity as a top-level page at /game/index.html?chapter=1&standalone=1 or ?chapter=2&standalone=1. This avoids relying on browser storage inside a Unity iframe on Safari.

UNITY WEBGL BUILD REQUIRED
The website does not contain a compiled Unity game yet. Build the Unity project with the included WebGL build helper, then copy the CONTENTS of Builds/WebGL/ into this website's public/game/ folder. Do not add an extra WebGL folder level.
The final website paths must include:
  public/game/index.html
  public/game/Build/...
  public/game/TemplateData/... (if generated)

MOBILE
The website provides a landscape prompt and a full-page mobile launch. The Unity project source package includes touch controls and a responsive WebGL template. Browser fullscreen/orientation APIs vary by device. Actual mobile compatibility must be tested on real iOS Safari and Android Chrome devices; see the Unity project guide for Unity 2022.3's mobile WebGL limitations.
