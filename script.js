// ==========================================
// CONFIGURACIÓN DE TU TIENDA loveCode
// ==========================================

const WHATSAPP_PHONE = "51918272033"; // Tu número de WhatsApp para recibir pedidos

let currentSelectedModel = "1. Carta Clásica";

// Selección de modelo
function selectModel(modelName, price) {
    currentSelectedModel = modelName;
    const modelSelect = document.getElementById('modelSelect');
    if (modelSelect) {
        modelSelect.value = modelName;
        updatePriceDisplay();
    }
}

// Actualiza el precio según el selector
function updatePriceDisplay() {
    const modelSelect = document.getElementById('modelSelect');
    const priceTag = document.getElementById('priceTag');
    if (modelSelect && priceTag) {
        const selectedOption = modelSelect.options[modelSelect.selectedIndex];
        const price = selectedOption.getAttribute('data-price') || '15.00';
        priceTag.innerText = `S/ ${price}`;
    }
}

// Abrir el simulador de demo
function openDemo(id) {
    const modal = document.getElementById('demoModal');
    const content = document.getElementById('demoContent');
    
    modal.classList.remove('hidden');

    content.innerHTML = `
        <iframe 
            src="./demos/plantilla${id}/index.html" 
            class="w-full h-full border-0" 
            title="Vista previa loveCode demo ${id}">
        </iframe>
    `;
}

// Cerrar simulador
function closeDemo() {
    const modal = document.getElementById('demoModal');
    const content = document.getElementById('demoContent');
    
    modal.classList.add('hidden');
    content.innerHTML = '';
}

// Alternar Preguntas Frecuentes (FAQ)
function toggleFaq(id) {
    const content = document.getElementById(`faqContent${id}`);
    const icon = document.getElementById(`faqIcon${id}`);

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Enviar formulario formateado por WhatsApp
async function sendWhatsAppOrder(event) {
    if (event) event.preventDefault();

    // 1. Obtener valores del formulario
    const clientName = document.getElementById('clientName')?.value || 'Cliente';
    const coupleNames = document.getElementById('coupleNamesInput')?.value || '';
    const songInput = document.getElementById('songInput')?.value || '';
    const loveNoteInput = document.getElementById('loveNoteInput')?.value || '';
    
    const modelSelect = document.getElementById('modelSelect');
    const chosenModel = modelSelect ? modelSelect.value : '1. Carta Clásica';
    const priceTag = document.getElementById('priceTag')?.innerText || '';

    // Generar un ID local inmediato en caso de falla de red (Ej. LC-829381)
    const localId = "LC-" + Math.floor(100000 + Math.random() * 900000);

    // Reemplaza por la URL de tu Google Apps Script
    const SCRIPT_URL = "https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec";

    // 2. Preparar los datos a enviar
    const formData = new FormData();
    formData.append("id", localId);
    formData.append("cliente", clientName);
    formData.append("pareja", coupleNames);
    formData.append("cancion", songInput);
    formData.append("nota", loveNoteInput);

    // 3. Enviar a Google Sheets en segundo plano
    try {
        fetch(SCRIPT_URL, {
            method: "POST",
            body: formData,
            mode: "no-cors" // Evita que el navegador bloquee la petición
        });
    } catch (error) {
        console.log("Enviando petición...", error);
    }

    // 4. Mapear qué carpeta de plantilla le corresponde
    let modelFolder = "plantilla1";
    if (chosenModel.includes("2.")) modelFolder = "plantilla2";
    else if (chosenModel.includes("3.")) modelFolder = "plantilla3";
    else if (chosenModel.includes("4.")) modelFolder = "plantilla4";
    else if (chosenModel.includes("5.")) modelFolder = "plantilla5";
    else if (chosenModel.includes("6.")) modelFolder = "plantilla6";
    else if (chosenModel.includes("7.")) modelFolder = "plantilla7";
    else if (chosenModel.includes("8.")) modelFolder = "plantilla8";
    else if (chosenModel.includes("9.")) modelFolder = "plantilla9";
    else if (chosenModel.includes("10.")) modelFolder = "plantilla10";
    else if (chosenModel.includes("11.")) modelFolder = "plantilla11";
    else if (chosenModel.includes("12.")) modelFolder = "plantilla12";

    // 5. Construir la URL completa que recibirá el cliente
    // Reemplaza 'tu-sitio.netlify.app' por tu enlace real de Netlify o dominio
    const finalLink = `https://tu-sitio.netlify.app/demos/${modelFolder}/index.html?id=${localId}`;

    // 6. Enviar mensaje ordenado a WhatsApp
    const whatsappMessage = `¡Hola! 👋 Acabo de realizar un pedido en *loveCode* %0A%0A` +
        `🆔 *Código de Pedido:* ${localId}%0A` +
        `📌 *Modelo:* ${encodeURIComponent(chosenModel)}%0A` +
        `💰 *Precio:* ${encodeURIComponent(priceTag)}%0A` +
        `👤 *Cliente:* ${encodeURIComponent(clientName)}%0A` +
        `❤️ *Nombres:* ${encodeURIComponent(coupleNames)}%0A` +
        `🎵 *Música:* ${encodeURIComponent(songInput)}%0A` +
        `📝 *Nota de Amor:* ${encodeURIComponent(loveNoteInput)}%0A%0A` +
        `🔗 *Link a activar:* ${encodeURIComponent(finalLink)}`;

    window.open(`https://wa.me/51918272033?text=${whatsappMessage}`, '_blank');
}

// Partículas de Corazones en el fondo Morado
function generateHeartParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const hearts = ['❤️', '💖', '💕', '✨', '💜', '🌸'];

    for (let i = 0; i < 22; i++) {
        const h = document.createElement('span');
        h.className = 'heart-particle';
        h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = Math.random() * 100 + 'vw';
        h.style.animationDuration = (Math.random() * 5 + 5) + 's';
        h.style.animationDelay = (Math.random() * 4) + 's';
        h.style.fontSize = (Math.random() * 14 + 10) + 'px';
        container.appendChild(h);
    }
}

window.onload = () => {
    generateHeartParticles();
    updatePriceDisplay();
};