function createBlockingOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.fontSize = '24px';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.textAlign = 'center';

    const message = document.createElement('div');
    message.innerText = 'This site is blocked during the specified hours.';
    overlay.appendChild(message);

    document.body.appendChild(overlay);
}

createBlockingOverlay();