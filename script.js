// Timeline Data: synced with showcase pages (showcase.html?gallery=<id>)
const timelineData = [
  { id: 'class-a', date: '2025–2026', title: 'Class A Memories', description: 'Moments and memories from Class A.', images: ['https://picsum.photos/seed/classa1/800/600', 'https://picsum.photos/seed/classa2/800/600', 'https://picsum.photos/seed/classa3/800/600'] },
  { id: 'class-b', date: '2025–2026', title: 'Class B Memories', description: 'Moments and memories from Class B.', images: ['https://picsum.photos/seed/classb1/800/600', 'https://picsum.photos/seed/classb2/800/600', 'https://picsum.photos/seed/classb3/800/600'] },
  { id: 'class-c', date: '2025–2026', title: 'Class C Memories', description: 'Moments and memories from Class C.', images: ['https://picsum.photos/seed/classc1/800/600', 'https://picsum.photos/seed/classc2/800/600', 'https://picsum.photos/seed/classc3/800/600'] },
  { id: 'class-d', date: '2025–2026', title: 'Class D Memories', description: 'Moments and memories from Class D.', images: ['https://picsum.photos/seed/classd1/800/600', 'https://picsum.photos/seed/classd2/800/600', 'https://picsum.photos/seed/classd3/800/600'] },
  { id: 'class-e', date: '2025–2026', title: 'Class E Memories', description: 'Moments and memories from Class E.', images: ['https://picsum.photos/seed/classe1/800/600', 'https://picsum.photos/seed/classe2/800/600', 'https://picsum.photos/seed/classe3/800/600'] },
  { id: 'class-f', date: '2025–2026', title: 'Class F Memories', description: 'Moments and memories from Class F.', images: ['https://picsum.photos/seed/classf1/800/600', 'https://picsum.photos/seed/classf2/800/600', 'https://picsum.photos/seed/classf3/800/600'] },
  { id: 'arthome-in-a-year', date: '2025–2026', title: 'Arthome in a Year', description: 'A year in the life of ArtHome.', images: ['https://picsum.photos/seed/arthome1/800/600', 'https://picsum.photos/seed/arthome2/800/600', 'https://picsum.photos/seed/arthome3/800/600'] },
  { id: 'life-at-arthome', date: '2025–2026', title: 'Life at Arthome', description: 'Daily life and spirit at ArtHome.', images: ['https://picsum.photos/seed/life1/800/600', 'https://picsum.photos/seed/life2/800/600', 'https://picsum.photos/seed/life3/800/600'] },
  { id: 'teachers-at-arthome', date: '2025–2026', title: 'Teachers at ArtHome', description: 'Our teachers and mentors at ArtHome.', images: ['https://picsum.photos/seed/teachers1/800/600', 'https://picsum.photos/seed/teachers2/800/600', 'https://picsum.photos/seed/teachers3/800/600'] },
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
const graduatesViewport = document.getElementById('graduates-viewport');
const graduatesTrack = document.getElementById('graduates-track');
const graduatesPrevBtn = document.getElementById('graduates-prev');
const graduatesNextBtn = document.getElementById('graduates-next');
const grade6Viewport = document.getElementById('grade6-viewport');
const grade6Track = document.getElementById('grade6-track');
const grade6PrevBtn = document.getElementById('grade6-prev');
const grade6NextBtn = document.getElementById('grade6-next');
const photoInput = document.getElementById('photoInput');
const uploadBtn = document.getElementById('uploadBtn');
const cameraIcon = document.getElementById('camera-icon');
const loaderIcon = document.getElementById('loader-icon');
const toast = document.getElementById('toast');

let currentEvent = null;
let currentIndex = 0;
let graduatesIndex = 0;
let graduatesAutoTimer = null;
let grade6Index = 0;
let grade6AutoTimer = null;

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

// Grade 6 Completers (name and Google Drive photo id)
const grade6Title = 'Grade 6 Completers';
const driveImageUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}=w1000`;
const grade6Data = [
  { name: 'Amores, Darielle Keisler B.', photoId: '1fEaV4uJlK5tCgOaX5dD4E8lM412PFbii' },
  { name: 'Caspillo, Kenth Victor D.', photoId: '1wRPGpRpqwbcnm10DCKrt3UaJsKfxvsZa' },
  { name: 'Estilo, Prince Genovie B.', photoId: '1q15vP7hyvddR29dXHQjBpnm69u7mJcpo' },
  { name: 'Flores, Mc Hene V.', photoId: '1pexk97MpEz3y1ZbWnWscN9X5QvdlWBnk' },
  { name: 'Narciso, Tala B.', photoId: '1jjHlwm_EjkHKeF6rghz0KrBO0PVSeMeD' },
  { name: 'Villa, Todd Ozwald G.', photoId: '1EUvhkml2RQ-w40IdD1FMsqqT0YtJp74i' },
].map(({ name, photoId }) => {
  const src = driveImageUrl(photoId);
  return { name, avatar: src, photos: [src] };
});

function buildGraduateTile(grad, sectionTitle) {
  const title = sectionTitle || graduatesTitle;
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'w-40 md:w-52 flex-shrink-0 flex flex-col gap-2';
  tile.setAttribute('title', grad.name);
  tile.innerHTML = `
    <div class="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
      <img src="${grad.avatar}" alt="${grad.name}" class="absolute inset-0 w-full h-full object-cover object-[center_25%]" loading="lazy" />
    </div>
    <p class="text-xs md:text-sm font-semibold text-gray-800 text-center leading-snug line-clamp-2">${grad.name}</p>
  `;
  tile.addEventListener('click', () => {
    openModal({ title: grad.name, date: title, images: grad.photos });
  });
  return tile;
}

function renderGraduatesCarousel() {
  if (!graduatesViewport || !graduatesTrack) return;
  graduatesTrack.innerHTML = '';
  graduatesIndex = 0;

  graduatesData.forEach((grad) => {
    graduatesTrack.appendChild(buildGraduateTile(grad, graduatesTitle));
  });

  updateGraduatesPosition();
  setupGraduatesControls();
  startGraduatesAutoSlide();
}

function getGraduateStep() {
  if (!graduatesTrack || !graduatesTrack.children.length) return 0;
  const first = graduatesTrack.children[0];
  const style = window.getComputedStyle(graduatesTrack);
  const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
  return first.offsetWidth + gap;
}

function updateGraduatesPosition() {
  if (!graduatesTrack || !graduatesViewport) return;
  const step = getGraduateStep();
  if (!step) return;

  const count = graduatesTrack.children.length;
  if (!count) return;

  // Wrap index so it always stays in [0, count)
  graduatesIndex = ((graduatesIndex % count) + count) % count;

  const translateX = -graduatesIndex * step;
  graduatesTrack.style.transform = `translateX(${translateX}px)`;
}

function moveGraduates(delta) {
  if (!graduatesTrack || !graduatesTrack.children.length) return;
  graduatesIndex += delta;
  updateGraduatesPosition();
}

function startGraduatesAutoSlide() {
  if (graduatesAutoTimer) {
    clearInterval(graduatesAutoTimer);
  }
  graduatesAutoTimer = setInterval(() => moveGraduates(1), 4000);
}

function setupGraduatesControls() {
  if (!graduatesPrevBtn || !graduatesNextBtn) return;

  graduatesPrevBtn.onclick = () => {
    moveGraduates(-1);
    startGraduatesAutoSlide();
  };
  graduatesNextBtn.onclick = () => {
    moveGraduates(1);
    startGraduatesAutoSlide();
  };
}

// Grade 6 Completers carousel
function renderGrade6Carousel() {
  if (!grade6Viewport || !grade6Track) return;
  grade6Track.innerHTML = '';
  grade6Index = 0;

  grade6Data.forEach((grad) => {
    grade6Track.appendChild(buildGraduateTile(grad, grade6Title));
  });

  updateGrade6Position();
  setupGrade6Controls();
  startGrade6AutoSlide();
}

function getGrade6Step() {
  if (!grade6Track || !grade6Track.children.length) return 0;
  const first = grade6Track.children[0];
  const style = window.getComputedStyle(grade6Track);
  const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
  return first.offsetWidth + gap;
}

function updateGrade6Position() {
  if (!grade6Track || !grade6Viewport) return;
  const step = getGrade6Step();
  if (!step) return;
  const count = grade6Track.children.length;
  if (!count) return;
  grade6Index = ((grade6Index % count) + count) % count;
  grade6Track.style.transform = `translateX(${-grade6Index * step}px)`;
}

function moveGrade6(delta) {
  if (!grade6Track || !grade6Track.children.length) return;
  grade6Index += delta;
  updateGrade6Position();
}

function startGrade6AutoSlide() {
  if (grade6AutoTimer) clearInterval(grade6AutoTimer);
  grade6AutoTimer = setInterval(() => moveGrade6(1), 4000);
}

function setupGrade6Controls() {
  if (!grade6PrevBtn || !grade6NextBtn) return;
  grade6PrevBtn.onclick = () => { moveGrade6(-1); startGrade6AutoSlide(); };
  grade6NextBtn.onclick = () => { moveGrade6(1); startGrade6AutoSlide(); };
}

// Timeline marker icons (varied per card)
const timelineIcons = [
  '<path d="M22 10L12 4 2 10l10 6 10-6Z"/><path d="M6 12v5c0 .6.4 1.1 1 1.3l5 1.7 5-1.7c.6-.2 1-.7 1-1.3v-5"/>',
  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6v6"/><path d="M9 9h6"/>',
  '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 10l5.813 1.912a2 2 0 0 1 1.275 1.275L12 18l1.912-5.813a2 2 0 0 1 1.275-1.275L21 10l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>',
  '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
];
function getTimelineIcon(index) {
  return timelineIcons[index % timelineIcons.length];
}

// Render the Timeline
function renderTimeline() {
  timelineData.forEach((event, index) => {
    const iconPath = getTimelineIcon(index);
    const card = document.createElement('div');
    card.className = "flex flex-col items-center cursor-pointer group opacity-0 translate-y-5 transition-all duration-700 ease-out flex-shrink-0";
    card.innerHTML = `
      <div class="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100 shadow-md shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>
      </div>
      <div class="flex-1 w-full mt-1 pt-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative timeline-card max-w-md">
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
    card.addEventListener('click', () => { window.location.href = `showcase.html?gallery=${encodeURIComponent(event.id)}`; });
    timelineContainer.appendChild(card);
    
    // Animation trigger
    setTimeout(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-5');
            const inner = entry.target.querySelector('.timeline-card');
            if (inner) {
              inner.classList.add('timeline-card-glow');
              setTimeout(() => inner.classList.remove('timeline-card-glow'), 900);
            }
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
  renderGraduatesCarousel();
  renderGrade6Carousel();
  renderTimeline();
};
