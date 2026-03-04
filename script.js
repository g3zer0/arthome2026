// Timeline Data: Edit this array to add or change events
const timelineData = [
  {
    id: '1',
    date: 'September 2023',
    title: 'Senior Year Begins',
    description: 'The first day of our final year. Reunited with friends and ready for the journey ahead.',
    images: [
      'https://picsum.photos/seed/senior1/800/1200',
      'https://picsum.photos/seed/senior2/1200/800',
    ],
  },
  {
    id: '2',
    date: 'October 2023',
    title: 'Homecoming Week',
    description: 'Spirit week, the big game, and dancing the night away.',
    images: [
      'https://picsum.photos/seed/hoco1/1000/1000',
      'https://picsum.photos/seed/hoco2/1200/800',
      'https://picsum.photos/seed/hoco3/800/1200',
    ],
  },
  {
    id: '3',
    date: 'December 2023',
    title: 'Winter Formal',
    description: 'A magical night celebrating the end of the semester.',
    images: [
      'https://picsum.photos/seed/formal1/1000/1200',
      'https://picsum.photos/seed/formal2/1200/900',
      'https://picsum.photos/seed/formal3/800/800',
    ],
  },
  {
    id: '4',
    date: 'April 2024',
    title: 'Senior Trip',
    description: 'Unforgettable memories made on our final class trip together.',
    images: [
      'https://picsum.photos/seed/trip1/800/1200',
      'https://picsum.photos/seed/trip2/1200/800',
    ],
  },
  {
    id: '5',
    date: 'June 2024',
    title: 'Graduation Day',
    description: 'We did it! Tossing our caps and saying our goodbyes as we step into the future.',
    images: [
      'https://picsum.photos/seed/grad1/1200/800',
      'https://picsum.photos/seed/grad2/800/1200',
      'https://picsum.photos/seed/grad3/1000/1000',
    ],
  }
];

// Select DOM Elements
const timelineContainer = document.getElementById('timeline-container');
const scrollBtn = document.getElementById('scrollBtn');
const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const closeModalBtn = document.getElementById('close-modal');
const carouselContainer = document.getElementById('carousel-container');
const carouselDots = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const graduatesFaces = document.getElementById('graduates-faces');
const photoInput = document.getElementById('photoInput');
const uploadBtn = document.getElementById('uploadBtn');
const cameraIcon = document.getElementById('camera-icon');
const loaderIcon = document.getElementById('loader-icon');
const toast = document.getElementById('toast');

let currentEvent = null;
let currentIndex = 0;

// Graduates Data (replace photos with real URLs anytime)
const graduatesTitle = 'Kindergarten Completers';
const graduatesData = [
  'Alquizar, Braxton Quinn B.',
  'Camarista, Lia Isabelle L.',
  'Dela Cruz, Mervin Jr. D.',
  'Denila, Ashiana Ysabelle Y.',
  'Dulaugon, Elisha Faith H.',
  'Evangelista, Tara Kaisley S.',
  'Gabo, Zheanne Nathanielle T.',
  'Gamueta, Carisza Maureen M.',
  'Gialon, Eonah Iris Saoirse R.',
  'Lopez, Nathania Erised F.',
  'Maghamil, Jen Myrrh L.',
  'Mahinay, Astrid Nathania T.',
  'Mallorca, Bren Christoffe A.',
  'Manlupig, Andrea Jurez C.',
  'Mansueto, Denise Zephora A.',
  'Marilla, Pat Destiny P.',
  'Masong, Aiah B.',
  'Miralles, Arthemis Thoby N.',
  'Pahoyo, Zhea May T.',
  'Panla-an, Jan Mars L.',
  'Pañer, Krysthea Hera',
  'Potoy, Magnus Gaven M.',
  'Potoy, Theophilus M.',
  'Quijote, Kelly Thaddia M.',
  'Redito, Rigel Moon Aries K.',
  'Salarda, Teomasio Joeleb',
  'Silagan, Adih Feign C.',
  'Vicente, Kristiana J.',
].map((name) => {
  const seed = encodeURIComponent(name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, ''));
  return {
    name,
    avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`,
    photos: [
      `https://picsum.photos/seed/grad-${seed}-1/1200/800`,
      `https://picsum.photos/seed/grad-${seed}-2/800/1200`,
      `https://picsum.photos/seed/grad-${seed}-3/1000/1000`,
    ],
  };
});

function renderGraduates() {
  if (!graduatesFaces) return;
  graduatesFaces.innerHTML = '';

  graduatesData.forEach((grad) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'relative flex-shrink-0 w-12 h-12 rounded-full ring-2 ring-white/30 hover:ring-white/70 transition-all overflow-hidden bg-white/10';
    btn.setAttribute('aria-label', `Open photos for ${grad.name}`);
    btn.innerHTML = `
      <img src="${grad.avatar}" alt="${grad.name}" class="w-full h-full object-cover" loading="lazy" />
    `;
    btn.addEventListener('click', () => {
      openModal({ title: grad.name, date: graduatesTitle, images: grad.photos });
    });
    graduatesFaces.appendChild(btn);
  });
}

// Render the Timeline
function renderTimeline() {
  timelineData.forEach((event, index) => {
    const card = document.createElement('div');
    card.className = "flex items-start gap-5 cursor-pointer group opacity-0 translate-y-5 transition-all duration-700 ease-out";
    card.innerHTML = `
      <div class="relative z-10 mt-1.5">
        <div class="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-gray-50 group-hover:ring-blue-100 transition-all duration-300"></div>
      </div>
      <div class="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
        <div class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1.5">${event.date}</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">${event.title}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${event.description}</p>
        <div class="relative rounded-xl overflow-hidden h-32 bg-gray-100">
          <img src="${event.images[0]}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
            ${event.images.length} Photos
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(event));
    timelineContainer.appendChild(card);
    
    // Animation trigger
    setTimeout(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-5');
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(card);
    }, 100 + index * 100);
  });
}

// Modal and Carousel Logic
function openModal(event) {
  currentEvent = event;
  currentIndex = 0;
  modalTitle.textContent = event.title;
  modalDate.textContent = event.date;
  
  carouselContainer.innerHTML = '';
  carouselDots.innerHTML = '';

  event.images.forEach((imgSrc, i) => {
    const imgDiv = document.createElement('div');
    imgDiv.className = "w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4 pt-20 pb-24";
    imgDiv.innerHTML = `<img src="${imgSrc}" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />`;
    carouselContainer.appendChild(imgDiv);

    const dot = document.createElement('div');
    dot.className = `h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === 0 ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`;
    dot.onclick = () => scrollToImage(i);
    carouselDots.appendChild(dot);
  });

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('opacity-0'), 10);
  document.body.style.overflow = 'hidden';
  updateArrows();
}

function closeModal() {
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function scrollToImage(index) {
  carouselContainer.scrollTo({ left: index * carouselContainer.clientWidth, behavior: 'smooth' });
  updateCurrentIndex(index);
}

function updateCurrentIndex(index) {
  currentIndex = index;
  Array.from(carouselDots.children).forEach((dot, i) => {
    dot.className = i === index ? 'h-1.5 rounded-full transition-all duration-300 cursor-pointer w-6 bg-white' : 'h-1.5 rounded-full transition-all duration-300 cursor-pointer w-1.5 bg-white/30';
  });
  updateArrows();
}

function updateArrows() {
  // These buttons already use Tailwind `hidden md:block` (display-based).
  // Keep our runtime control display-based too to avoid mixing mechanisms.
  if (!currentEvent) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  const atStart = currentIndex <= 0;
  const atEnd = currentIndex >= currentEvent.images.length - 1;

  // Use inline display only to force-hide; otherwise let CSS (`hidden md:block`)
  // determine whether buttons are shown for the current breakpoint.
  prevBtn.style.display = atStart ? 'none' : '';
  nextBtn.style.display = atEnd ? 'none' : '';
  prevBtn.setAttribute('aria-disabled', atStart ? 'true' : 'false');
  nextBtn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
}

// Event Listeners
scrollBtn.onclick = () => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
closeModalBtn.onclick = closeModal;
prevBtn.onclick = () => {
  if (!currentEvent) return;
  if (currentIndex > 0) {
    scrollToImage(currentIndex - 1);
  }
};
nextBtn.onclick = () => {
  if (!currentEvent) return;
  if (currentIndex < currentEvent.images.length - 1) {
    scrollToImage(currentIndex + 1);
  }
};

carouselContainer.onscroll = () => {
  const newIndex = Math.round(carouselContainer.scrollLeft / carouselContainer.clientWidth);
  if (newIndex !== currentIndex) updateCurrentIndex(newIndex);
};

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
  // Only handle keys when modal is visible and an event is active
  if (!currentEvent || modal.classList.contains('hidden')) return;

  if (e.key === 'ArrowRight') {
    if (currentIndex < currentEvent.images.length - 1) {
      e.preventDefault();
      scrollToImage(currentIndex + 1);
    }
  } else if (e.key === 'ArrowLeft') {
    if (currentIndex > 0) {
      e.preventDefault();
      scrollToImage(currentIndex - 1);
    }
  }
});

// Upload Functionality
uploadBtn.onclick = () => photoInput.click();

photoInput.onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  uploadBtn.disabled = true;
  cameraIcon.classList.add('hidden');
  loaderIcon.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = async () => {
    const base64Data = reader.result.split(',')[1];
    const formData = new URLSearchParams();
    formData.append('data', base64Data);
    formData.append('mimetype', file.type);
    formData.append('filename', file.name);

    try {
      // Sending to your Google Apps Script
      await fetch('https://script.google.com/macros/s/AKfycby4iWYlJM4DZG-_W7HVKqDJGifr7QxJhXseJcwSlwlFVepyG4vjOUkiAKX9tZIVEIUH/exec', {
        method: 'POST',
        body: formData
      });
      showToast('Photo uploaded!');
    } catch (err) {
      showToast('Upload finished!');
    }
    resetUploadBtn();
  };
  reader.readAsDataURL(file);
};

function resetUploadBtn() {
  uploadBtn.disabled = false;
  cameraIcon.classList.remove('hidden');
  loaderIcon.classList.add('hidden');
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

// Initial Run
window.onload = () => {
  renderGraduates();
  renderTimeline();
};
