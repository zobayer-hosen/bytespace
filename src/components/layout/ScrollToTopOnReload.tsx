/**
 * On a reload, Chrome restores the old scroll position while the page loads, and with `scroll-behavior: smooth`
 * it animates there, which a scrollTo after hydration can't reliably stop. So this runs while the HTML is still
 * parsing: it makes the restore instant, undoes it on the next scroll event (before that frame is painted) and
 * drops any #hash. It stops once the page has loaded, or as soon as the user scrolls or presses a key.
 * `history.scrollRestoration` stays "auto", so Back/Forward still return to where the user was.
 */
const reloadScript = `(() => {
  if (performance.getEntriesByType("navigation")[0]?.type !== "reload") return;
  const instant = document.createElement("style");
  instant.textContent = "html{scroll-behavior:auto!important}";
  document.head.append(instant);
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  const toTop = () => { if (scrollY !== 0) scrollTo(0, 0); };
  const userInput = ["wheel", "touchstart", "keydown", "pointerdown"];
  const stop = () => {
    removeEventListener("scroll", toTop);
    userInput.forEach((type) => removeEventListener(type, stop, true));
    instant.remove();
  };
  addEventListener("scroll", toTop);
  userInput.forEach((type) => addEventListener(type, stop, { capture: true, passive: true }));
  addEventListener("load", () => setTimeout(() => { toTop(); stop(); }), { once: true });
})();`;

/** On a browser reload, start at the top of the page instead of the restored position. */
export function ScrollToTopOnReload() {
  return <script dangerouslySetInnerHTML={{ __html: reloadScript }} />;
}
