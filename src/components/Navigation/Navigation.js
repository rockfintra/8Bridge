const currentUrl = window.location.href;

// Get all the links in the navigation
const navLinks = document.querySelectorAll('.navlink');

// Loop through each link and check if the href matches the current URL
navLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active'); // Add the "active" class to the matching link
  } else {
    link.classList.remove('active'); // Remove the "active" class from non-matching links
  }
});