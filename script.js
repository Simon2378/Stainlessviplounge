let currentCategory = 'all';
function getWhatsAppNumber() {
    const rawNumber = (document.body.dataset.whatsappNumber || '237686588985').trim();
    return rawNumber.replace(/\D/g, '');
}

function openWhatsAppOrder(message) {
    const whatsappNumber = getWhatsAppNumber();
    if (!whatsappNumber) {
        return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function setupFoodOrderWhatsApp() {
    const foodOrderButtons = document.querySelectorAll('.menu .card.food .order-now');

    foodOrderButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            const card = button.closest('.card');
            if (!card) {
                return;
            }

            const itemName = card.querySelector('h3')?.textContent?.trim() || 'Food item';
            const itemPrice = card.querySelector('.price')?.textContent?.trim() || card.dataset.price || '';
            const message = itemPrice
                ? `Hello Stainless, I want to order ${itemName} (${itemPrice}).`
                : `Hello Stainless, I want to order ${itemName}.`;

            openWhatsAppOrder(message);
        });
    });
}

function setupFloatingOrderButton() {
    const floatingButton = document.getElementById('floating-order-button');
    if (!floatingButton) {
        return;
    }

    floatingButton.addEventListener('click', () => {
        openWhatsAppOrder('Hello Stainless, I want to place an order.');
    });
}

function setupAdminView() {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');

    if (adminParam === '1') {
        localStorage.setItem('stainless_admin_view', '1');
    }

    if (adminParam === '0') {
        localStorage.removeItem('stainless_admin_view');
    }

    const isAdminView = localStorage.getItem('stainless_admin_view') === '1';
    document.body.classList.toggle('admin-view', isAdminView);
}

function setupQrCode() {
    const qrImage = document.getElementById('qr-image');
    const qrTarget = document.getElementById('qr-target');

    if (!qrImage) {
        return;
    }

    const configuredUrl = (document.body.dataset.siteUrl || '').trim();
    const pageUrl = window.location.protocol.startsWith('http') ? window.location.href : '';
    const websiteUrl = configuredUrl || pageUrl;

    if (!websiteUrl) {
        qrImage.alt = 'QR code unavailable';
        if (qrTarget) {
            qrTarget.textContent = 'Set a live URL in body data-site-url to generate a printable QR code.';
        }
        return;
    }

    const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=900x900&margin=20&ecc=H&data=${encodeURIComponent(websiteUrl)}`;
    qrImage.src = qrServiceUrl;
    if (qrTarget) {
        qrTarget.textContent = websiteUrl;
    }
}

function applyFilters() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.menu .card');
    const normalize = (text) => text.toLowerCase().replace(/-/g, ' ');

    cards.forEach((card) => {
        const itemName = (card.dataset.name || '').trim();
        const itemTitle = (card.querySelector('h3')?.textContent || '').trim();
        const itemCategory = (card.dataset.category || '').trim();
        const searchableText = normalize(`${itemName} ${itemTitle} ${itemCategory}`);
        const matchCategory = currentCategory === 'all' || card.classList.contains(currentCategory);
        const matchSearch = !query || searchableText.includes(normalize(query));

        card.style.display = matchCategory && matchSearch ? '' : 'none';
    });

    const sections = document.querySelectorAll('.menu .menu-grid');
    sections.forEach((section) => {
        const sectionCards = section.querySelectorAll('.card');
        const visibleCardsCount = Array.from(sectionCards).filter((card) => card.style.display !== 'none').length;
        section.style.display = visibleCardsCount ? 'grid' : 'none';

        const title = section.previousElementSibling;
        if (title && title.classList.contains('category-title')) {
            title.style.display = visibleCardsCount ? 'block' : 'none';
        }
    });
}

function setupCardPreview() {
    const previewSection = document.getElementById('selected-item');
    const previewContent = document.getElementById('selected-item-content');
    const backButton = document.getElementById('selected-item-back');
    const menu = document.getElementById('menu');

    if (!previewSection || !previewContent || !backButton || !menu) {
        return;
    }

    const openPreview = (card) => {
        const selectedCard = card.cloneNode(true);
        selectedCard.style.display = 'flex';

        previewContent.innerHTML = '';
        previewContent.appendChild(selectedCard);

        previewSection.hidden = false;
        document.body.classList.add('modal-open');
    };

    const closePreview = () => {
        previewSection.hidden = true;
        previewContent.innerHTML = '';
        document.body.classList.remove('modal-open');
    };

    menu.addEventListener('click', (event) => {
        if (event.target.closest('.order-now')) {
            return;
        }

        const clickedCard = event.target.closest('.card');
        if (!clickedCard || !menu.contains(clickedCard)) {
            return;
        }

        openPreview(clickedCard);
    });

    backButton.addEventListener('click', closePreview);

    previewSection.addEventListener('click', (event) => {
        if (event.target === previewSection) {
            closePreview();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !previewSection.hidden) {
            closePreview();
        }
    });
}

function filterMenu(category) {
    currentCategory = category;
    applyFilters();
}

function searchMenu() {
    applyFilters();
}

setupAdminView();
setupQrCode();
setupFoodOrderWhatsApp();
setupFloatingOrderButton();
setupCardPreview();
filterMenu('all');