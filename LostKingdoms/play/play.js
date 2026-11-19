(() => {
  const config = window.LK_CHAPTER || { number: 1, title: 'CHAPTER 01', name: 'The Beginning · Whispering Woods' };
  const stage = document.getElementById('game-stage');
  const status = document.getElementById('game-status');
  const fullscreenButton = document.getElementById('fullscreen-button');
  const rotateButton = document.getElementById('rotate-button');
  const rotateEnter = document.getElementById('rotate-enter');
  let gameFrame = null;

  document.title = `Lost Kingdoms | ${config.title}`;
  document.getElementById('chapter-title').textContent = config.title;
  document.getElementById('chapter-name').textContent = config.name;

  function showPortal() {
    status.textContent = 'WEBGL BUILD NOT UPLOADED';
    stage.innerHTML = `<div class="portal-state"><div class="portal-icon">♜</div><h2>THE PORTAL IS ALMOST OPEN</h2><p>The dedicated ${config.title.toLowerCase()} game page is ready. Add the compiled Unity WebGL build to <code>/public/game/</code> to enable gameplay.</p><div class="hint">UNITY WEBGL BUILD REQUIRED</div></div>`;
  }

  function enterFullscreen() {
    const target = stage;
    const request = target.requestFullscreen || target.webkitRequestFullscreen;
    if (request) { const result = request.call(target); if (result && result.catch) result.catch(() => {}); }
    // Orientation locking is optional and not supported by every mobile browser.
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }
  }

  fullscreenButton.addEventListener('click', enterFullscreen);
  rotateButton.addEventListener('click', () => {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {
        alert('Please rotate your device to landscape for the best gameplay view.');
      });
    } else {
      alert('Please rotate your device to landscape for the best gameplay view.');
    }
  });

  if (rotateEnter) rotateEnter.addEventListener('click', () => {
    const root = document.documentElement;
    const request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (request) { const result = request.call(root); if (result && result.catch) result.catch(() => {}); }
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => alert('Please rotate your phone horizontally. Some mobile browsers do not allow automatic orientation locking.'));
    } else {
      alert('Please rotate your phone horizontally. Then use the Fullscreen button to expand the game.');
    }
  });

  fetch('/game/index.html', { method: 'HEAD', cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Unity build not found');
      document.body.classList.add('game-ready');
      const touchDevice = (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || navigator.maxTouchPoints > 0;
      const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);
      if (touchDevice || isSafari) {
        status.textContent = 'READY · MOBILE FULL-PAGE MODE';
        stage.innerHTML = `<div class="portal-state"><div class="portal-icon">♜</div><h2>YOUR REALM AWAITS</h2><p>For the best mobile experience, the game opens as its own page with landscape touch controls.</p><button class="launch-game" id="launch-game" type="button">ENTER CHAPTER ${String(config.number).padStart(2,'0')} ⟶</button></div>`;
        document.getElementById('launch-game').addEventListener('click', () => {
          window.location.assign(`/game/index.html?chapter=${config.number}&standalone=1`);
        });
      } else {
        status.textContent = 'GAME BUILD FOUND · READY TO LAUNCH';
        stage.innerHTML = '';
        gameFrame = document.createElement('iframe');
        gameFrame.title = `Lost Kingdoms ${config.title} gameplay`;
        gameFrame.src = `/game/index.html?chapter=${config.number}`;
        gameFrame.allow = 'fullscreen; autoplay; gamepad; accelerometer; gyroscope';
        gameFrame.allowFullscreen = true;
        stage.appendChild(gameFrame);
        gameFrame.addEventListener('load', () => { status.textContent = 'GAME PLAYER LOADED · INITIALIZING'; });
      }
      // Fullscreen remains user-initiated to comply with browser restrictions.
    })
    .catch(showPortal);
})();
