# Peter Damian — DJ & Producer

A responsive artist showcase built with plain HTML, CSS and JavaScript. No build step, package installation, API keys or backend required.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `peter-damian`.
2. Add this folder's contents to its `main` branch. Include the `.github` directory.
3. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. Open **Actions → Deploy to GitHub Pages → Run workflow** (or push a new commit).
5. The deployment reports your Pages URL. Relative asset paths also work under a repository subdirectory.

You can also publish only the contents of `dist/` to the root of a repository and use Pages' branch deployment. The supplied workflow expects the original `dist/` layout.

## Preview locally

Run `python3 -m http.server 8080 --directory dist` and open `http://localhost:8080`.

## Edit

- `dist/index.html`: content, release links, booking email and audio source.
- `dist/styles.css`: colours, type, responsive layout and animation.
- `dist/script.js`: motion toggle and click-to-load SoundCloud player.
- `dist/assets/`: downloaded artist portrait, release art and the new favicon.

The design uses Google Fonts with system fallbacks. SoundCloud loads only after the visitor clicks the player button. The Apple Music preview is externally hosted and can become unavailable; visitors can always follow the release link. Audio does not autoplay. Motion respects the operating system's reduced-motion preference.

## Sources and content

Retrieved October 6, 2026. Artist and release imagery belong to their respective rights holders. The PD monogram and Vertigo graphic are website treatments, not supplied official logos or release artwork.

- Supplied artist hub: https://beacons.ai/peterdam1an
- Featured release and cover: https://too.fm/4aypp1r
- Artist catalogue: https://www.beatport.com/artist/peter-damian/591401
- Biography and booking contact: https://soundcloud.com/peterdamian
- Featured mix: https://soundcloud.com/peterdamian/live-from-vertigo-20240223
- Events: https://ra.co/dj/peterdamian
- Instagram: https://instagram.com/peterdam1an
- Apple Music: https://music.apple.com/us/artist/peter-damian/1469663119

“Are You Sure” is a featured title from the supplied Beacons page; its link opens the artist's Beatport tracks. The Spotify link opens the release's verified smart-link platform selector. No upcoming events, release dates or artist statistics have been invented.

## Verification

JavaScript syntax and local assets/anchors were checked. Browser layout and external player playback were not tested in this environment.
