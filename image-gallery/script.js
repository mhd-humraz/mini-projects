// Image data - in a real app, this might come from an API
const imageData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Mountain Landscape',
        category: 'nature',
        tags: ['mountain', 'landscape', 'nature']
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Northern Lights',
        category: 'nature',
        tags: ['aurora', 'night', 'nature']
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Japanese Temple',
        category: 'architecture',
        tags: ['temple', 'japan', 'architecture']
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Colosseum Rome',
        category: 'architecture',
        tags: ['colosseum', 'rome', 'architecture']
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Delicious Burger',
        category: 'food',
        tags: ['burger', 'fast food', 'food']
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Pancakes with Fruits',
        category: 'food',
        tags: ['pancakes', 'breakfast', 'food']
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Tropical Beach',
        category: 'travel',
        tags: ['beach', 'tropical', 'travel']
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Bali Rice Fields',
        category: 'travel',
        tags: ['bali', 'rice fields', 'travel']
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Snowy Mountains',
        category: 'nature',
        tags: ['snow', 'mountains', 'nature']
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        title: 'Modern House',
        category: 'architecture',
        tags: ['house', 'modern', 'architecture']
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// State variables
let currentFilter = 'all';
let currentSearch = '';
let displayedImages = 8;
let currentImageIndex = 0;
let filteredImages = [];

// Initialize the gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render gallery based on current filter and search
function renderGallery() {
    gallery.innerHTML = '';
    
    // Filter images based on current filter and search
    filteredImages = imageData.filter(image => {
        const matchesFilter = currentFilter === 'all' || image.category === currentFilter;
        const matchesSearch = currentSearch === '' || 
            image.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            image.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });
    
    // Show only the number of images based on displayedImages
    const imagesToShow = filteredImages.slice(0, displayedImages);
    
    if (imagesToShow.length === 0) {
        gallery.innerHTML = '<p class="no-results">No images found. Try a different search or filter.</p>';
        return;
    }
    
    // Create gallery items
    imagesToShow.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="gallery-img">
            <div class="image-info">
                <div class="image-title">${image.title}</div>
                <div class="image-category">${image.category}</div>
            </div>
        `;
        
        gallery.appendChild(galleryItem);
    });
    
    // Show/hide load more button
    if (displayedImages >= filteredImages.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and reset displayed images
            currentFilter = btn.dataset.filter;
            displayedImages = 8;
            renderGallery();
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        displayedImages += 4;
        renderGallery();
    });
    
    // Gallery item click (event delegation)
    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            openModal(parseInt(galleryItem.dataset.index));
        }
    });
    
    // Modal controls
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

// Search function
function performSearch() {
    currentSearch = searchInput.value.trim();
    displayedImages = 8;
    renderGallery();
}

// Modal functions
function openModal(index) {
    currentImageIndex = index;
    modalImage.src = filteredImages[index].src;
    modalCaption.textContent = filteredImages[index].title;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    modalImage.src = filteredImages[currentImageIndex].src;
    modalCaption.textContent = filteredImages[currentImageIndex].title;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    modalImage.src = filteredImages[currentImageIndex].src;
    modalCaption.textContent = filteredImages[currentImageIndex].title;
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);
