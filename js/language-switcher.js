// Language Switcher JavaScript

// Store language preference in local storage
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}

// Get language preference from local storage
function getLanguagePreference() {
    return localStorage.getItem('language') || 'en'; // Default to English
}

// Toggle between English and Arabic languages
function toggleLanguage() {
    const currentLang = getLanguagePreference();
    const newLang = currentLang === 'en' ? 'ar' : 'en';

    applyLanguage(newLang);
    setLanguagePreference(newLang);
}

// Apply selected language to the page
function applyLanguage(lang) {
    const body = document.body;
    const langButton = document.querySelector('.language-btn');

    // Toggle RTL class on body for Arabic
    if (lang === 'ar') {
        body.classList.add('rtl');
        document.documentElement.setAttribute('lang', 'ar');
        if (langButton) langButton.textContent = 'English';
    } else {
        body.classList.remove('rtl');
        document.documentElement.setAttribute('lang', 'en');
        if (langButton) langButton.textContent = 'العربية';
    }

    // Update all elements with data-en and data-ar attributes
    const elementsWithLang = document.querySelectorAll('[data-en][data-ar]');
    elementsWithLang.forEach(element => {
        // If element contains HTML, use innerHTML, otherwise use textContent
        if (element.getAttribute(`data-${lang}`).includes('<')) {
            element.innerHTML = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });

    // Update page title if translations are available
    const titleElement = document.querySelector('title');
    if (titleElement) {
        if (lang === 'ar') {
            // Map English titles to Arabic
            const titleMap = {
                'Oshdod - Holding for Entrepreneurship': 'أشدود - الشركة القابضة لريادة الأعمال',
                'About Us - Oshdod Holdings': 'عن الشركة - أشدود القابضة',
                'Our Projects - Oshdod Holdings': 'مشاريعنا - أشدود القابضة',
                'Contact Us - Oshdod Holdings': 'اتصل بنا - أشدود القابضة',
                'Our Partners - Oshdod Holdings': 'شركاؤنا - أشدود القابضة'
            };

            const currentTitle = titleElement.textContent;
            if (titleMap[currentTitle]) {
                titleElement.textContent = titleMap[currentTitle];
            }
        } else {
            // Map Arabic titles back to English
            const titleMap = {
                'أشدود - الشركة القابضة لريادة الأعمال': 'Oshdod - Holding for Entrepreneurship',
                'عن الشركة - أشدود القابضة': 'About Us - Oshdod Holdings',
                'مشاريعنا - أشدود القابضة': 'Our Projects - Oshdod Holdings',
                'اتصل بنا - أشدود القابضة': 'Contact Us - Oshdod Holdings',
                'شركاؤنا - أشدود القابضة': 'Our Partners - Oshdod Holdings'
            };

            const currentTitle = titleElement.textContent;
            if (titleMap[currentTitle]) {
                titleElement.textContent = titleMap[currentTitle];
            }
        }
    }
}

// Apply language when page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = getLanguagePreference();
    applyLanguage(savedLang);

    // Initialize language switching button
    const langButton = document.querySelector('.language-btn');
    if (langButton) {
        langButton.textContent = savedLang === 'en' ? 'العربية' : 'English';
    }
});
