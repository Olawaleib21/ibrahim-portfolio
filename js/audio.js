/* No broken media request before the student's recording is supplied. */
'use strict';
const introduction = document.getElementById('intro-audio');
if (
  introduction &&
  (introduction.hasAttribute('src') || introduction.querySelector('source[src]'))
) {
  introduction.hidden = false;
  document.getElementById('audio-pending').hidden = true;
}
