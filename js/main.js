document.addEventListener('DOMContentLoaded', () => {
  fetch('content/content.json')
    .then(response => response.json())
    .then(content => populateContent(content));
});

function populateContent(content) {
  // Header
  const logo = document.getElementById('logo');
  logo.src = content.header.logoSrc;
  logo.alt = content.header.logoAlt;

  // Hero
  const heroImage = document.getElementById('hero-image');
  heroImage.src = content.hero.imageSrc;
  heroImage.alt = content.hero.imageAlt;

  // Info Section
  document.getElementById('info-title').textContent = content.infoSection.title;
  document.getElementById('info-text').textContent = content.infoSection.text;
  if (document.getElementById('info-text-2')) {
    document.getElementById('info-text-2').textContent = content.infoSection.text2 || '';
  }
  const infoImage = document.getElementById('info-image');
  infoImage.src = content.infoSection.imageSrc;
  infoImage.alt = content.infoSection.imageAlt;

  // Gallery
  const gallery = document.getElementById('gallery');
  content.gallery.forEach((img, idx) => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    if (idx === 3) image.classList.add('portrait');
    gallery.appendChild(image);
  });

  // Menu
  const menuSection = document.getElementById('menu');
  content.menu.forEach(menu => {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'menu-item';
    const img = document.createElement('img');
    img.src = menu.imageSrc;
    img.alt = menu.imageAlt;
    const title = document.createElement('h2');
    title.textContent = menu.title;
    menuDiv.appendChild(img);
    menuDiv.appendChild(title);
    menuSection.appendChild(menuDiv);
  });

  // Location
  const mapImage = document.getElementById('map-image');
  mapImage.src = content.location.mapSrc;
  mapImage.alt = content.location.mapAlt;
  document.getElementById('address').textContent = content.location.address;
  document.getElementById('contact-phone').textContent = `Téléphone : ${content.location.contact.phone}`;
  document.getElementById('contact-email').textContent = `Email : ${content.location.contact.email}`;

  // Footer nav
  const footerNav = document.getElementById('footer-nav');
  content.footer.nav.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    footerNav.appendChild(a);
  });
  document.getElementById('copyright').textContent = content.footer.copyright;
}
