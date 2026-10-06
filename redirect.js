// Keep older profile.html bookmarks, including their section anchor, working.
window.location.replace(
  `./index.html${window.location.search}${window.location.hash}`,
);
