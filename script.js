// ============================================================
// MISTALONLINE.IN - COMPLETE SCRIPT
// ============================================================

// ============================================================
// VOICE ASSISTANT
// ============================================================
const voiceMessages = {
    welcome: 'मिस्टल ऑनलाइन में आपका स्वागत है',
    uid: 'कृपया अपना फ्री फायर यूजर आईडी दर्ज करें',
    likes: 'कृपया लाइक्स चुनें',
    country: 'कृपया अपना देश चुनें',
    next: 'अगले चरण पर जाएं',
    error: 'कृपया सभी फील्ड भरें'
};

let isVoiceSpeaking = false;
let selectedVoice = null;
let voiceSupported = false;

function checkVoiceSupport() {
    voiceSupported = 'speechSynthesis' in window;
    if (!voiceSupported) {
        document.getElementById('voiceStatus').textContent = 'Voice Not Supported';
    }
    return voiceSupported;
}

function findHindiVoice() {
    if (!voiceSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    let hindiVoice = voices.find(v => v.lang === 'hi-IN' && v.name.includes('Google'));
    if (!hindiVoice) hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (!hindiVoice) hindiVoice = voices.find(v => v.lang.startsWith('hi'));
    return hindiVoice || voices[0] || null;
}

function playVoice(type) {
    if (!voiceSupported) return;
    const message = voiceMessages[type];
    if (!message) return;
    if (isVoiceSpeaking) window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = function() { playVoice(type); };
        return;
    }

    if (!selectedVoice) selectedVoice = findHindiVoice();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;
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
        if (status) status.textContent = 'Voice Active';
    };
    utterance.onerror = function() {
        isVoiceSpeaking = false;
        if (dot) dot.className = 'voice-dot';
        if (status) status.textContent = 'Voice Active';
    };

    window.speechSynthesis.speak(utterance);
}

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

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

// ============================================================
// LIKES SELECTOR - UPDATE PRICE
// ============================================================
const likesSelect = document.getElementById('likesSelect');
const priceAmount = document.getElementById('priceAmount');

likesSelect.addEventListener('change', function() {
    const price = this.options[this.selectedIndex].dataset.price;
    priceAmount.textContent = '₹' + price;
});

// ============================================================
// FAKE ORDERS - GREEN FLOATING
// ============================================================
function createFakeOrder() {
    const container = document.getElementById('fakeOrdersContainer');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'fakeOrdersContainer';
        document.body.appendChild(newContainer);
    }

    const cont = document.getElementById('fakeOrdersContainer');
    const uid = Math.floor(Math.random() * 9000000000) + 1000000000;
    const qty = [1, 3, 5, 7, 10, 15][Math.floor(Math.random() * 6)];
    const amount = qty * 139;

    const order = document.createElement('div');
    order.className = 'fake-order-float';
    order.innerHTML = `
        <div class="order-text">🎯 <span class="order-uid">${uid}</span></div>
        <div class="order-text">Ordered <span class="order-amount">${qty}K Likes</span></div>
        <div class="order-text" style="font-size:12px;color:rgba(255,255,255,0.3);">₹${amount}</div>
        <span class="order-badge">✅ Order Placed</span>
    `;
    cont.appendChild(order);

    setTimeout(() => {
        if (order.parentNode) order.remove();
    }, 8000);
}

// ============================================================
// STATE
// ============================================================
let totalOrders = 12847;
let liveUsers = 47;

// ============================================================
// DOM REFS
// ============================================================
const uidInput = document.getElementById('uid');
const countrySelect = document.getElementById('country');
const statusMsg = document.getElementById('statusMsg');
const totalOrdersEl = document.getElementById('totalOrders');
const liveUsersEl = document.getElementById('liveUsers');
const reviewsGrid = document.getElementById('reviewsGrid');

// ============================================================
// FAKE REVIEWS - 200+ with DUMMY DATA
// ============================================================
const reviewNames = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Neha Singh', 'Vikram Raj',
    'Sneha Reddy', 'Arjun Mehta', 'Kavya Nair', 'Rohan Verma', 'Pooja Jain',
    'Ankit Gupta', 'Meera Iyer', 'Suresh Babu', 'Divya Menon', 'Gaurav Singh',
    'Aditi Rao', 'Manish Shah', 'Swati Desai', 'Rajesh Khanna', 'Deepika Padukone',
    'Ranveer Singh', 'Alia Bhatt', 'Shah Rukh Khan', 'Salman Khan', 'Akshay Kumar',
    'Varun Dhawan', 'Samantha Ruth', 'Nayanthara', 'Vijay Deverakonda', 'Allu Arjun',
    'Ram Charan', 'Jr NTR', 'Mahesh Babu', 'Pawan Kalyan', 'Naga Chaitanya',
    'Sai Pallavi', 'Keerthy Suresh', 'Anushka Shetty', 'Rashmika Mandanna', 'Pooja Hegde',
    'Kriti Sanon', 'Shraddha Kapoor', 'Katrina Kaif', 'Kareena Kapoor', 'Priyanka Chopra',
    'Deepak Kumar', 'Sunil Sharma', 'Vikram Singh', 'Ravi Patel', 'Manoj Tiwari',
    'Sachin Tendulkar', 'Virat Kohli', 'MS Dhoni', 'Rohit Sharma', 'KL Rahul'
];

const reviewTexts = [
    'Best service ever! Got my likes in 2 hours. Highly recommend!',
    'Amazing service! 100% satisfied with the delivery.',
    'Good service. Fast delivery and great support.',
    'Very professional. Got exactly what I paid for.',
    'Quick delivery and great support team!',
    'Excellent service! Will order again for sure.',
    'Nice experience. Smooth process from start to finish.',
    'Perfect! Exactly as promised. No issues at all.',
    'Great quality and fast delivery. Loved it!',
    'Highly satisfied with the service. Keep it up!',
    'Good value for money. Best price in the market.',
    'Reliable and trustworthy service. 5 stars!',
    'Best in the market! Super fast delivery.',
    'Super fast delivery, loved the experience!',
    'Professional team, great support throughout.',
    '100% satisfied with the order. Will recommend.',
    'Fastest delivery I have ever seen!',
    'Quality is top notch. Very happy with the service.',
    'Great service, will recommend to all my friends.',
    'Nice platform for free fire likes. Very reliable.',
    'वाह! बहुत बढ़िया सर्विस है। 5 स्टार!',
    'सबसे अच्छी सर्विस! 2 घंटे में मिल गए।',
    'शानदार सर्विस! बहुत अच्छा लगा।',
    'काफी अच्छा काम करते हैं। भरोसा है।',
    'नंबर 1 सर्विस! जबरदस्त काम करते हैं।',
    'फास्ट डिलीवरी और बढ़िया सपोर्ट।',
    '100% संतुष्ट हूं। बहुत अच्छा लगा।',
    'बहुत ही प्रोफेशनल टीम है। शानदार।',
    'दोस्तों को भी बताऊंगा। बहुत अच्छा।',
    'बढ़िया क्वालिटी और फास्ट सर्विस।',
    'Ek number! Best service ever in India.',
    'Maza aa gaya. Super fast delivery. Thanks!',
    'Best price and best quality. Highly recommended.',
    'Trusted service. Will order again for sure.',
    'Awesome! Got 10K likes instantly. Amazing!',
    'Fast and reliable. Thanks for the great service.',
    'Good experience. Keep up the good work.',
    'Perfect service. No issues at all. 5 stars!',
    'Love the service! Highly recommended to all.',
    'Best service for Free Fire likes in India.',
    'भाई ने पक्का किया! 1 घंटे में मिल गए।',
    'जबरदस्त सर्विस है। सबको बताऊंगा।',
    'मस्त माल मिलता है यहाँ। बहुत अच्छा।',
    'फटाफट डिलीवरी। बहुत अच्छा लगा।',
    'पैसा वसूल सर्विस है। शानदार।',
    'Great support and fast delivery. Loved it!',
    'Superb! Best service in India. 5 stars!',
    '100% reliable. Go for it without any doubt.',
    'Nice experience. Will order again for sure.',
    'Fast and trustworthy service. Highly recommended.'
];

const reviewServices = [
    'Free Fire Likes', 'Free Fire Followers', 'Free Fire Diamond', 'Free Fire Booyah'
];

function generateFakeReviews(count) {
    const reviews = [];
    const usedNames = new Set();
    for (let i = 0; i < count; i++) {
        let name;
        do {
            name = reviewNames[Math.floor(Math.random() * reviewNames.length)];
        } while (usedNames.has(name) && usedNames.size < reviewNames.length);
        usedNames.add(name);

        const text = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
        const service = reviewServices[Math.floor(Math.random() * reviewServices.length)];
        const stars = Math.random() > 0.8 ? '⭐' : (Math.random() > 0.5 ? '⭐⭐' : '⭐⭐⭐⭐⭐');
        const amount = Math.floor(Math.random() * 2000) + 100;

        reviews.push({
            name: name,
            stars: stars,
            text: text,
            service: service,
            amount: amount
        });
    }
    return reviews;
}

const fakeReviews = generateFakeReviews(210);

// ============================================================
// VOICE ON FIELDS
// ============================================================
uidInput.addEventListener('focus', function() {
    playVoice('uid');
});

likesSelect.addEventListener('focus', function() {
    playVoice('likes');
});

countrySelect.addEventListener('focus', function() {
    playVoice('country');
});

// ============================================================
// FAKE REVIEWS RENDER
// ============================================================
function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = fakeReviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${r.name}</span>
                <span class="review-stars">${r.stars}</span>
            </div>
            <div class="review-text">${r.text} <span class="review-amount">(₹${r.amount})</span></div>
            <span class="review-service">${r.service}</span>
        </div>
    `).join('');
}

// ============================================================
// NEXT BUTTON - GO TO PAYMENT
// ============================================================
function goToPayment() {
    const uid = uidInput.value.trim();
    const country = countrySelect.value;
    const selectedOption = likesSelect.options[likesSelect.selectedIndex];
    const qty = parseInt(selectedOption.value);
    const amount = parseInt(selectedOption.dataset.price);
    const serviceName = qty + 'K Free Fire Likes';

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

    const orderId = 'ORD' + Date.now().toString(36).toUpperCase();

    const orderData = {
        uid: uid,
        country: country,
        service: serviceName,
        amount: amount,
        qty: qty,
        orderId: orderId
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));

    playVoice('next');
    window.location.href = 'payment.html';
}

// ============================================================
// ON LOAD
// ============================================================
window.addEventListener('load', function() {
    renderReviews();
    checkVoiceSupport();

    // Create container for fake orders
    if (!document.getElementById('fakeOrdersContainer')) {
        const container = document.createElement('div');
        container.id = 'fakeOrdersContainer';
        document.body.appendChild(container);
    }

    setTimeout(() => {
        playVoice('welcome');
    }, 1500);

    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders.toLocaleString();
    if (liveUsersEl) liveUsersEl.textContent = liveUsers;

    // Fake orders every 3-5 seconds
    setInterval(() => {
        createFakeOrder();
    }, 3000 + Math.random() * 2000);

    // Initial orders
    setTimeout(createFakeOrder, 1000);
    setTimeout(createFakeOrder, 2500);
    setTimeout(createFakeOrder, 4000);

    console.log('MistalOnline.in Ready!');
});

// ============================================================
// EVENT LISTENERS
// ============================================================
document.getElementById('nextBtn').addEventListener('click', function(e) {
    e.preventDefault();
    goToPayment();
});

// ============================================================
// MAKE FUNCTIONS GLOBAL
// ============================================================
window.playVoice = playVoice;
window.goToPayment = goToPayment;
