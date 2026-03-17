const translations = {
    en: {
        landing: {
            title: "Let's Eat",
            description: "Stainless VIP Lounge serves quality food and drinks in a relaxed, premium atmosphere. Visit our menu and place your order quickly.",
            viewMenu: "View Menu",
            callUs: "Or call us: +237686588985",
            copyright: "&copy; 2026 Stainless VIP Lounge."
        },
        menu: {
            location: "📍 Edea Cameroon, Face Hopital Delangue",
            phone: "📞 +237686588985",
            backToMenu: "← Back to menu",
            filterFood: "Food",
            filterSoftDrinks: "Soft Drinks",
            filterBeer: "Beer",
            filterWhisky: "Whisky",
            filterChampagne: "Champagne/Wine",
            filterAll: "All",
            searchPlaceholder: "Search any menu item...",
            welcome: "Welcome to Stainless",
            scanQr: "Scan this QR code to open this website menu.",
            categoryFood: "Food",
            categorySoftDrinks: "Soft Drinks",
            categoryBeer: "Beer",
            categoryWhisky: "Whisky",
            categoryChampagne: "Champagne/Wine",
            orderNow: "Order Now",
            orderFloating: "Order Food on WhatsApp",
            orderMessage: "Hello Stainless, I want to order {item} ({price}).",
            orderMessageNoPrice: "Hello Stainless, I want to order {item}.",
            orderFloatingMessage: "Hello Stainless, I want to place an order."
        }
    },
    fr: {
        landing: {
            title: "Mangeons",
            description: "Stainless VIP Lounge propose une nourriture et des boissons de qualite dans une atmosphere detendue et premium. Consultez notre menu et passez votre commande rapidement.",
            viewMenu: "Voir le menu",
            callUs: "Ou appelez-nous: +237686588985",
            copyright: "&copy; 2026 Stainless VIP Lounge."
        },
        menu: {
            location: "📍 Edea Cameroun, Face Hopital Delangue",
            phone: "📞 +237686588985",
            backToMenu: "← Retour au menu",
            filterFood: "Plats",
            filterSoftDrinks: "Boissons",
            filterBeer: "Biere",
            filterWhisky: "Whisky",
            filterChampagne: "Champagne/Vin",
            filterAll: "Tout",
            searchPlaceholder: "Rechercher un element du menu...",
            welcome: "Bienvenue chez Stainless",
            scanQr: "Scannez ce code QR pour ouvrir le menu du site.",
            categoryFood: "Plats",
            categorySoftDrinks: "Boissons",
            categoryBeer: "Biere",
            categoryWhisky: "Whisky",
            categoryChampagne: "Champagne/Vin",
            orderNow: "Commander",
            orderFloating: "Commander sur WhatsApp",
            orderMessage: "Bonjour Stainless, je veux commander {item} ({price}).",
            orderMessageNoPrice: "Bonjour Stainless, je veux commander {item}.",
            orderFloatingMessage: "Bonjour Stainless, je souhaite passer une commande."
        }
    }
};

function getTranslation(lang, keyPath) {
    const data = translations[lang] || translations.en;
    return keyPath.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), data);
}

function applyTranslationsForPage(lang) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        const message = getTranslation(lang, key);
        if (typeof message === 'string') {
            element.textContent = message;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        const key = element.getAttribute('data-i18n-placeholder');
        const message = getTranslation(lang, key);
        if (typeof message === 'string') {
            element.setAttribute('placeholder', message);
        }
    });

    const landingCopy = translations[lang]?.landing || translations.en.landing;
    const landingTitle = document.querySelector('.landing-title');
    const landingDescription = document.querySelector('.landing-description');
    const landingCta = document.querySelector('.landing-cta');
    const landingCall = document.querySelector('.landing-call');
    const landingFooter = document.querySelector('.landing-footer');

    if (landingTitle) {
        landingTitle.textContent = landingCopy.title;
    }
    if (landingDescription) {
        landingDescription.textContent = landingCopy.description;
    }
    if (landingCta) {
        landingCta.textContent = landingCopy.viewMenu;
    }
    if (landingCall) {
        landingCall.textContent = landingCopy.callUs;
    }
    if (landingFooter) {
        landingFooter.innerHTML = landingCopy.copyright;
    }

    const menuCopy = translations[lang]?.menu || translations.en.menu;
    document.querySelectorAll('.order-now').forEach((button) => {
        button.textContent = menuCopy.orderNow;
    });

    document.documentElement.lang = lang;
}

function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function setLanguage(lang) {
    const selectedLang = translations[lang] ? lang : 'en';
    localStorage.setItem('stainless_language', selectedLang);
    applyTranslationsForPage(selectedLang);
    updateLanguageButtons(selectedLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('stainless_language') || 'en';
    setLanguage(savedLang);
});
