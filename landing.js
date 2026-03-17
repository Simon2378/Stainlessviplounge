document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.querySelector('.landing-page');
    const layerA = document.querySelector('.layer-a');
    const layerB = document.querySelector('.layer-b');

    if (!landingPage || !layerA || !layerB) {
        return;
    }

    const imageFiles = [
        'All type.png',
        'Stainless1.png',
        'Starting.png',
        'Boss Wallpapers.png',
    ];

    const withOverlay = (fileName) => {
        const encodedFileName = encodeURIComponent(fileName);
        return `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.68)), url("${encodedFileName}")`;
    };

    let currentIndex = 0;
    let showLayerA = true;

    layerA.style.backgroundImage = withOverlay(imageFiles[currentIndex]);
    layerA.classList.add('is-visible');

    if (imageFiles.length < 2) {
        return;
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageFiles.length;

        const nextLayer = showLayerA ? layerB : layerA;
        const previousLayer = showLayerA ? layerA : layerB;

        nextLayer.style.backgroundImage = withOverlay(imageFiles[currentIndex]);
        nextLayer.classList.add('is-visible');
        previousLayer.classList.remove('is-visible');

        showLayerA = !showLayerA;
    }, 3000);
});
