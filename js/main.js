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
  document.getElementById('info-title').innerHTML = content.infoSection.title;
  document.getElementById('info-text').innerHTML = content.infoSection.text;
  if (document.getElementById('info-text-2')) {
    document.getElementById('info-text-2').innerHTML = content.infoSection.text2 || '';
  }
  
  // Add reservation button if it exists
  if (content.infoSection.button && document.getElementById('info-text-2')) {
    const button = document.createElement('a');
    button.href = content.infoSection.button.href;
    button.textContent = content.infoSection.button.text;
    button.className = 'reservation-button';
    document.getElementById('info-text-2').appendChild(button);
  }
  
  const infoImage = document.getElementById('info-image');
  infoImage.src = content.infoSection.imageSrc;
  infoImage.alt = content.infoSection.imageAlt;

  // Description Section
  if (content.description) {
    document.getElementById('description-title').textContent = content.description.title;
    document.getElementById('description-text').innerHTML = content.description.text;
  }

  // Reviews Section
  if (content.reviews) {
    const reviewsSlider = document.querySelector('.reviews-slider');
    content.reviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      
      // Create star rating
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      
      reviewCard.innerHTML = `
        <div class="review-header">
          <span class="review-name">${review.name}</span>
          <span class="review-rating">${stars}</span>
        </div>
        <p class="review-text">"${review.text}"</p>
        <div class="review-date">${review.date}</div>
      `;
      
      reviewsSlider.appendChild(reviewCard);
    });
  }

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
