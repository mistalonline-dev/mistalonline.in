// ============================================================
// MISTALONLINE.IN - Complete JavaScript
// ============================================================

// ============================================================
// CONFIG
// ============================================================
const UPI_ID = '9250150041@ybl';
const MERCHANT_NAME = 'Gaurav Pandey';
const WEB3FORMS_KEY = '010b2958-2b53-4e7e-ad45-1f4dbe57ed52';
const QR_IMAGE = 'AccountQRCodeBank Of Baroda - 1530_LIGHT_THEME.webp';

// ============================================================
// FAKE DATA
// ============================================================
const fakeOrders = [
    '🎯 UID 1234567890 just ordered 5,000 Likes!',
    '🔥 UID 9876543210 ordered 10,000 Likes!',
    '⭐ UID 1122334455 ordered Instagram Followers!',
    '📸 UID 9988776655 ordered Video Growth package!',
    '💬 UID 5544332211 ordered Telegram Members!',
    '🚀 UID 7766554433 ordered 3,000 Likes!',
    '🎯 UID 6677889900 ordered YouTube Views!',
    '🔥 UID 4455667788 ordered 1,000 Likes!'
];

const fakeReviews = [
    { name: 'Rahul Sharma', stars: '⭐⭐⭐⭐⭐', text: 'Best service ever! Got 10K likes in 2 hours. Highly recommended!', service: 'Free Fire Likes' },
    { name: 'Priya Patel', stars: '⭐⭐⭐⭐⭐', text: 'Amazing service! My Instagram followers increased instantly.', service: 'Instagram Followers' },
    { name: 'Amit Kumar', stars: '⭐⭐⭐⭐', text: 'Good service. Delivery was fast and reliable. Will order again.', service: 'Telegram Members' },
    { name: 'Neha Singh', stars: '⭐⭐⭐⭐⭐', text: 'Very professional service. Got exactly what I paid for.', service: 'YouTube Views' },
    { name: 'Vikram Raj', stars: '⭐⭐⭐⭐⭐', text: 'Quick delivery and great support team. 5 stars!', service: 'Free Fire Likes' },
    { name: 'Sneha Reddy', stars: '⭐⭐⭐⭐', text: 'Good quality followers. Customer support is very responsive.', service: 'Instagram Followers' },
    { name: 'Arjun Mehta', stars: '⭐⭐⭐⭐⭐', text: 'Best price and fastest delivery. Will order again for sure!', service: 'Video Growth' },
    { name: 'Kavya Nair', stars: '⭐⭐⭐⭐⭐', text: 'Very satisfied with the service. Got my order within 30 minutes.', service: 'Telegram Members' }
];

// ============================================================
// STATE
// ============================================================
let currentOrder = {
    uid: '',
    country: '',
    service: '',
    amount: 0,
    orderId: '',
    screenshot: null
};

let orderTickerIndex = 0;
let totalOrders = 12847;
let liveUsers = 47;

// ============================================================
// DOM REFS
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const uidInput = document.getElementById('uid');
const countrySelect = document.getElementById('country');
const serviceSelect = document.getElementById('service');
const priceAmount = document.getElementById('priceAmount');
const regionDisplay = document.getElementById('regionDisplay');
const regionText = document.getElementById('regionText');
const statusMsg = document.getElementById('statusMsg');
const paymentSection = document.getElementById('paymentSection');
const orderIdDisplay = document.getElementById('orderIdDisplay');
const paymentAmountDisplay = document.getElementById('paymentAmountDisplay');
const screenshotInput = document.getElementById('screenshot');
const screenshotPreview = document.getElementById('screenshotPreview');
const successOverlay = document.getElementById('successOverlay');
const totalOrdersEl = document.getElementById('totalOrders');
const liveUsersEl = document.getElementById('liveUsers');
const orderTickerText = document.getElementById('orderTickerText');
const reviewsGrid = document.getElementById('reviewsGrid');

// ============================================================
// REGION MAPPING
// ============================================================
const countryRegionMap = {
    'India': 'Asia Pacific',
    'USA': 'North America',
    'UK': 'Europe',
    'Canada': 'North America',
    'Australia': 'Oceania',
    'Germany': 'Europe',
    'France': 'Europe',
    'Japan': 'Asia Pacific',
    'Brazil': 'Latin America',
    'UAE': 'Middle East',
    'Singapore': 'Asia Pacific',
    'Indonesia': 'Asia Pacific',
    'Malaysia': 'Asia Pacific',
    'Thailand': 'Asia Pacific',
    'Vietnam': 'Asia Pacific'
};

const uidRegionMap = {
    '1': 'Asia Pacific', '2': 'Asia Pacific', '3': 'Europe',
    '4': 'North America', '5': 'Latin America', '6': 'Middle East',
    '7': 'Africa', '8': 'Oceania', '9': 'Europe'
};

// ============================================================
// VOICE ASSISTANT
// ============================================================
const voiceMessages = {
    welcome: 'मिस्टल ऑनलाइन में आपका स्वागत है',
    uid: 'कृपया अपना फ्री फायर यूजर आईडी दर्ज करें',
    country: 'कृपया अपना देश चुनें',
    service: 'कृपया अपनी सेवा चुनें',
    order_placed: 'आपका ऑर्डर सफलतापूर्वक बन गया है, कृपया पेमेंट करें',
    payment_confirm: 'आपका पेमेंट कन्फर्म हो गया है',
    error: 'कृपया सभी फील्ड भरें',
    thank_you: 'धन्यवाद, आपका ऑर्डर कन्फर्म हो गया है'
};

let isVoiceSpeaking = false;
let selectedVoice = null;

function findHindiVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    let hindiVoice = voices.find(v => v.lang === 'hi-IN' && v.name.includes('Google'));
    if (!hindiVoice) hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (!hindiVoice) hindiVoice = voices.find(v => v.lang.startsWith('hi'));
    return hindiVoice || voices[0] || null;
}

function playVoice(type) {
    if (!('speechSynthesis' in window)) return;
    const message = voiceMessages[type];
    if (!message) return;
    if (isVoiceSpeaking) window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;

    if (!selectedVoice) selectedVoice = findHindiVoice();
    if (selectedVoice) utterance.voice = selectedVoice;

    const dot = document.getElementById('voiceDot');
    const status = document.getElementById('voiceStatus');

    utterance.onstart = function() {
        isVoiceSpeaking = true;
        if (dot) dot.className = 'voice-dot speaking';
        if (status) status.textContent = '🔊 ' + message;
    };
    utterance.onend = function() {
        isVoiceSpeaking = false;
        if (dot) dot.className = 'voice-dot';
        if (status) status.textContent = '🎤 Voice Active';
    };
    utterance.onerror = function() {
        isVoiceSpeaking = false;
        if (dot) dot.className = 'voice-dot';
        if (status) status.textContent = '🎤 Voice Active';
    };

    window.speechSynthesis.speak(utterance);
}

// ============================================================
// HAMBURGER MENU
// ============================================================
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('open');
});

document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================================
// REGION DETECTION
// ============================================================
function updateRegion() {
    const uid = uidInput.value.trim();
    const country = countrySelect.value;
    let region = '—';

    if (country && countryRegionMap[country]) {
        region = countryRegionMap[country];
    } else if (uid && uid.length > 0) {
        const firstDigit = uid.charAt(0);
        if (uidRegionMap[firstDigit]) {
            region = uidRegionMap[firstDigit];
        } else {
            region = 'Global';
        }
    }

    if (region !== '—') {
        regionDisplay.classList.add('show');
        regionText.textContent = region;
    } else {
        regionDisplay.classList.remove('show');
        regionText.textContent = '—';
    }
}

uidInput.addEventListener('input', updateRegion);
countrySelect.addEventListener('change', updateRegion);

// ============================================================
// PRICE UPDATE
// ============================================================
function updatePrice() {
    const selected = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selected.dataset.price || 0;
    priceAmount.textContent = '₹' + parseInt(price);
}

serviceSelect.addEventListener('change', updatePrice);

// ============================================================
// SERVICE BUTTONS
// ============================================================
function selectService(name, price) {
    const options = serviceSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].text.includes(name.replace('Followers', 'Likes')) ||
            options[i].text.includes(name.replace('Members', 'Likes'))) {
            serviceSelect.selectedIndex = i;
            updatePrice();
            break;
        }
    }
    document.getElementById('orderSection').scrollIntoView({ behavior: 'smooth' });
    statusMsg.textContent = '📦 ' + name + ' selected - ₹' + price;
    statusMsg.className = 'success';
}

// ============================================================
// FAKE ORDER FLOW
// ============================================================
function updateOrderTicker() {
    orderTickerText.textContent = fakeOrders[orderTickerIndex % fakeOrders.length];
    orderTickerIndex++;
    totalOrders += Math.floor(Math.random() * 3) + 1;
    liveUsers = 42 + Math.floor(Math.random() * 20);
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders.toLocaleString();
    if (liveUsersEl) liveUsersEl.textContent = liveUsers;
}

function initFakeFlow() {
    setInterval(updateOrderTicker, 4000);
    setInterval(() => {
        if (Math.random() > 0.7) {
            const review = fakeReviews[Math.floor(Math.random() * fakeReviews.length)];
            statusMsg.textContent = '⭐ New review: ' + review.name + ' - ' + review.text.slice(0, 30) + '...';
            statusMsg.className = 'success';
            setTimeout(() => {
                statusMsg.textContent = '💰 Select service & click Next';
                statusMsg.className = '';
            }, 4000);
        }
    }, 10000);
}

// ============================================================
// FAKE REVIEWS
// ============================================================
function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = fakeReviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${r.name}</span>
                <span class="review-stars">${r.stars}</span>
            </div>
            <div class="review-text">${r.text}</div>
            <span class="review-service">${r.service}</span>
        </div>
    `).join('');
}

// ============================================================
// 🔥 STEP 1: GO TO PAYMENT
// ============================================================
function goToPayment() {
    const uid = uidInput.value.trim();
    const country = countrySelect.value;
    const service = serviceSelect.value;
    const amount = parseInt(serviceSelect.options[serviceSelect.selectedIndex]?.dataset?.price || 0);

    if (!uid) {
        statusMsg.textContent = '⚠️ Please enter your Free Fire UID!';
        statusMsg.className = 'error';
        playVoice('error');
        return;
    }

    if (!country) {
        statusMsg.textContent = '⚠️ Please select your country!';
        statusMsg.className = 'error';
        playVoice('error');
        return;
    }

    if (!service || amount <= 0) {
        statusMsg.textContent = '⚠️ Please select a valid service!';
        statusMsg.className = 'error';
        playVoice('error');
        return;
    }

    const orderId = 'ORD' + Date.now().toString(36).toUpperCase();
    const region = regionText.textContent !== '—' ? regionText.textContent : 'Not detected';

    currentOrder = {
        uid: uid,
        country: country,
        service: service,
        amount: amount,
        orderId: orderId,
        region: region,
        screenshot: null
    };

    // Show Payment Section
    paymentSection.style.display = 'block';
    orderIdDisplay.textContent = orderId;
    paymentAmountDisplay.textContent = '₹' + amount;

    paymentSection.scrollIntoView({ behavior: 'smooth' });

    statusMsg.textContent = '✅ Order created! Scan QR to pay.';
    statusMsg.className = 'success';
    playVoice('order_placed');

    sendOrderEmail(currentOrder);
}

// ============================================================
// 📧 SEND ORDER EMAIL
// ============================================================
async function sendOrderEmail(order) {
    try {
        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: '🛒 New Order Placed! - ' + order.orderId,
                uid: order.uid,
                country: order.country,
                service: order.service,
                amount: '₹' + order.amount,
                order_id: order.orderId,
                region: order.region,
                message: `🛒 New Order!\n\nUID: ${order.uid}\nCountry: ${order.country}\nService: ${order.service}\nAmount: ₹${order.amount}\nOrder ID: ${order.orderId}\nRegion: ${order.region}`
            })
        });
        console.log('📧 Order email sent!');
    } catch (error) {
        console.error('Email error:', error);
    }
}

// ============================================================
// 🔥 STEP 2: SUBMIT ORDER (After Payment + Screenshot)
// ============================================================
async function submitOrder() {
    if (!currentOrder.orderId) {
        statusMsg.textContent = '⚠️ Please create an order first!';
        statusMsg.className = 'error';
        return;
    }

    if (!currentOrder.screenshot) {
        statusMsg.textContent = '📸 Please upload payment screenshot first!';
        statusMsg.className = 'error';
        return;
    }

    statusMsg.textContent = '🔄 Submitting order...';
    statusMsg.className = '';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: '✅ Order Submitted - ' + currentOrder.orderId,
                order_id: currentOrder.orderId,
                uid: currentOrder.uid,
                country: currentOrder.country,
                service: currentOrder.service,
                amount: '₹' + currentOrder.amount,
                region: currentOrder.region,
                screenshot: currentOrder.screenshot,
                message: `✅ Order Submitted!\n\nOrder ID: ${currentOrder.orderId}\nUID: ${currentOrder.uid}\nCountry: ${currentOrder.country}\nService: ${currentOrder.service}\nAmount: ₹${currentOrder.amount}\nRegion: ${currentOrder.region}\n\nScreenshot attached.`
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show success overlay
            document.getElementById('overlayOrderId').textContent = currentOrder.orderId;
            document.getElementById('overlayService').textContent = currentOrder.service;
            document.getElementById('overlayAmount').textContent = '₹' + currentOrder.amount;
            document.getElementById('overlayUid').textContent = currentOrder.uid;

            successOverlay.classList.add('show');
            playVoice('payment_confirm');

            setTimeout(() => {
                playVoice('thank_you');
            }, 1500);

            statusMsg.textContent = '✅ Order Submitted Successfully!';
            statusMsg.className = 'success';

            // Reset
            document.getElementById('orderForm').reset();
            paymentSection.style.display = 'none';
            screenshotPreview.innerHTML = '';
            currentOrder = {};
            priceAmount.textContent = '₹0';
            regionDisplay.classList.remove('show');

        } else {
            throw new Error('Submission failed');
        }

    } catch (error) {
        console.error('Submission error:', error);
        statusMsg.textContent = '❌ ' + (error.message || 'Something went wrong. Try again.');
        statusMsg.className = 'error';
    }
}

// ============================================================
// 🔥 GO BACK
// ============================================================
function goBack() {
    paymentSection.style.display = 'none';
    paymentSection.scrollIntoView({ behavior: 'smooth' });
    statusMsg.textContent = '💰 Select service & click Next';
    statusMsg.className = '';
}

// ============================================================
// SCREENSHOT UPLOAD
// ============================================================
screenshotInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        statusMsg.textContent = '⚠️ File too large! Max 5MB.';
        statusMsg.className = 'error';
        this.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentOrder.screenshot = e.target.result;
        screenshotPreview.innerHTML = `
            <div style="position:relative;display:inline-block;">
                <img src="${e.target.result}" alt="Screenshot" 
                     style="max-width:150px;border-radius:12px;border:2px solid rgba(255,215,0,0.1);" />
                <span style="position:absolute;top:-8px;right:-8px;background:#2ed573;color:#000;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;">✓</span>
            </div>
        `;
        statusMsg.textContent = '✅ Screenshot uploaded! Click "Submit Order".';
        statusMsg.className = 'success';
    };
    reader.readAsDataURL(file);
});

// ============================================================
// CLOSE OVERLAY
// ============================================================
function closeOverlay() {
    successOverlay.classList.remove('show');
    location.reload();
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (confirm('Reset page?')) location.reload();
    }
});

// ============================================================
// ON LOAD
// ============================================================
window.addEventListener('load', function() {
    updatePrice();
    updateRegion();
    renderReviews();
    initFakeFlow();
    setTimeout(() => {
        playVoice('welcome');
    }, 1500);

    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders.toLocaleString();
    if (liveUsersEl) liveUsersEl.textContent = liveUsers;

    console.log('🎮 MistalOnline.in Ready!');
    console.log('💳 UPI ID:', UPI_ID);
    console.log('📱 QR Code:', QR_IMAGE);
});
