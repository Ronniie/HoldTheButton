// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// DOM elements
const holdButton = document.getElementById('holdButton');
const timer = document.getElementById('timer');
const message = document.getElementById('message');
const resultContainer = document.getElementById('resultContainer');
const result = document.getElementById('result');

// Variables
let startTime;
let timerInterval;
let isHolding = false;
let buttonText = holdButton.querySelector('span');
let messageInterval;
let lastMessageTime = 0;
const MESSAGE_UPDATE_INTERVAL = 3000; // 3 seconds between messages

// Random messages while holding
const holdingMessages = [
    "Time is just a construct, right?",
    "You're transcending reality.",
    "The universe is watching you.",
    "Is your arm okay?",
    "Do you do this for sport?",
    "You're redefining persistence.",
    "You're officially holding reality together.",
    "Just you and the void now.",
    "What are you trying to prove?",
    "I hope you're charging rent for your dedication.",
    "This is borderline mythological.",
    "Even statues blink eventually.",
    "Are you trying to summon something?",
    "You're writing history with your finger.",
    "Blink twice if you're stuck.",
    "You might be stuck in a time loop.",
    "Legends start just like this.",
    "Have you considered letting go... just kidding!",
    "Still? I'm out of things to say!",
    "I should be charging for this show.",
    "You're more committed than some relationships.",
    "Your screen is going to imprint your fingerprint.",
    "Can we get a slow clap going?",
    "You're raising the bar and then some.",
    "I'm starting to believe you're a machine.",
    "Even the code is impressed.",
    "Reality might bend soon.",
    "You're a digital monk now.",
    "Still holding? Your screen says hi.",
    "This is what dedication smells like... probably.",
    "If effort was money, you'd be a billionaire.",
    "Time is melting around you.",
    "Every second, you enter deeper legend.",
    "You may be achieving enlightenment.",
    "This is your legacy now.",
    "You clearly don't fear cramps.",
    "Heroes don't always wear capes.",
    "I'm speechless... you're not.",
    "You're holding like the Wi-Fi signal depends on it.",
    "I think you unlocked ultra-hold mode.",
    "Even gravity is impressed.",
    "You're ignoring the laws of boredom.",
    "This isn't even your final form.",
    "The simulation is glitching just watching you.",
    "You're becoming folklore.",
    "You've reached the point of no return.",
    "You broke the give-up meter.",
    "You outlasted my motivational quotes.",
    "Are you aiming for the Guinness World Record?",
    "At this point, I'm emotionally invested.",
    "You're becoming legend in real time.",
    "All of this for what? Oh right—immortality.",
    "Hold level: Ascended.",
    "You're now an honorary statue.",
    "Existential crises start here.",
    "You're challenging the laws of patience.",
    "Your willpower could power a small town.",
    "You're so deep in, I can't let you stop.",
    "This is how digital devotion looks.",
    "You'll need a recovery arc after this.",
    "Even I'm nervous for you.",
    "You've reached 'overachiever' mode.",
    "You're passing into the mythos now.",
    "The button might be scared of you.",
    "I think you just invented a new sport.",
    "This is your endurance saga.",
    "Still holding. The stars are aligning.",
    "You're one hold away from godhood.",
    "Your thumb deserves its own biography.",
    "There are monks less dedicated than this.",
    "You're holding onto greatness—literally.",
    "You've entered the Matrix hold level.",
    "Reality checks in... still holding.",
    "Are your bones okay?",
    "You're breaking records in another dimension.",
    "You're now holding the universe together.",
    "Your phone might evolve from this.",
    "NASA might want to study you.",
    "You're showing the world what's possible.",
    "The screen is probably sweating now.",
    "Who needs sleep when you have this?",
    "I bet the device is questioning its purpose.",
    "You're entering final form: Hold God.",
    "Still? I'm writing a song about you.",
    "This isn't holding—it's art.",
    "I can feel the strain through the code.",
    "You're distorting time with your will.",
    "You're holding like a black hole grips light.",
    "You may have just glitched reality.",
    "You're now part of the code.",
    "A statue couldn't keep up with you.",
    "You're outperforming machines.",
    "Your name shall echo through holding halls.",
    "Still here? You're writing digital lore.",
    "This is holdvana. Welcome.",
    "If there was a throne, you'd sit on it.",
    "You've held longer than most people dream.",
    "Reality salutes your grip.",
    "You're in another timeline now.",
    "I hope this gets written in history books.",
    "You're unshakable. Literally.",
    "I stopped counting. You're still holding.",
    "A galaxy was born during this hold."
];

// Snarky result messages
const resultMessages = [
    "You should screenshot this as no one will believe you",
    "That's... actually pretty impressive",
    "Did you use tape or something?",
    "Your finger must be numb by now",
    "That's a new world record... probably",
    "Are you okay? That's a long time",
    "Your patience is... concerning",
    "Did you fall asleep?",
    "That's dedication right there",
    "Your finger deserves a medal",
    "You have a new identity now: The Holder.",
    "Statues have nothing on you.",
    "I'm 99% sure you transcended reality.",
    "Was this a dare? A quest? A destiny?",
    "You're a holding deity now.",
    "I ran out of congratulations halfway through.",
    "You need a cape and a trophy.",
    "You've been upgraded to Ultra User.",
    "Is it over? Or is it just the beginning?",
    "That wasn't holding, that was history-making.",
    "The universe blinked. You didn't.",
    "You just changed the definition of patience.",
    "You shattered the digital fourth wall.",
    "You deserve a monument in an app store.",
    "I hope your battery held as well as you.",
    "My circuits can't process that level of commitment.",
    "I'm rethinking reality after that.",
    "That wasn't a test. That was a declaration.",
    "Did your soul temporarily exit your body?",
    "You unlocked the ancient holding technique.",
    "Reality bent. You didn't.",
    "This is beyond mortal comprehension.",
    "Are you part machine?",
    "The screen now fears you.",
    "That was pure digital sorcery.",
    "You've crossed into myth.",
    "People will whisper your time in awe.",
    "This achievement deserves music.",
    "That was uncharted excellence.",
    "You deserve a cinematic universe.",
    "You're now part of the lore.",
    "You outlasted reason itself.",
    "I need to lie down from watching.",
    "The internet will remember this.",
    "That was a digital exorcism of limits.",
    "Legends say you're still glowing.",
    "I got emotional. Well done.",
    "You made the impossible... look held.",
    "I'm impressed. And I'm code.",
    "This moment will echo through apps forever."
];

// Format time
function formatTime(ms) {
    return (ms / 1000).toFixed(2) + 's';
}

// Update timer display
function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    timer.textContent = formatTime(elapsedTime);
}

// Get random message from array
function getRandomMessage(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Change message with animation
function changeMessage(newMessage) {
    message.classList.remove('changed');
    void message.offsetWidth; // Trigger reflow
    message.textContent = newMessage;
    message.classList.add('changed');
}

// Stop the hold
function stopHold() {
    if (isHolding) {
        isHolding = false;
        clearInterval(timerInterval);
        clearInterval(messageInterval);
        const finalTime = Date.now() - startTime;
        
        // Show result
        result.textContent = `${formatTime(finalTime)} - ${getRandomMessage(resultMessages)}`;
        resultContainer.classList.add('show');
        
        // Reset message and button text
        message.textContent = "Ready to try again?";
        buttonText.textContent = "Hold Me";
    }
}

// Start holding
holdButton.addEventListener('mousedown', () => {
    if (!isHolding) {
        isHolding = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10);
        resultContainer.classList.remove('show');
        buttonText.textContent = "Holding...";
        lastMessageTime = Date.now();
        
        // Start random messages
        messageInterval = setInterval(() => {
            if (isHolding) {
                const currentTime = Date.now();
                if (currentTime - lastMessageTime >= MESSAGE_UPDATE_INTERVAL) {
                    changeMessage(getRandomMessage(holdingMessages));
                    lastMessageTime = currentTime;
                }
            } else {
                clearInterval(messageInterval);
            }
        }, MESSAGE_UPDATE_INTERVAL);
    }
});

// Stop holding
holdButton.addEventListener('mouseup', stopHold);

// Stop when mouse leaves the button
holdButton.addEventListener('mouseleave', stopHold);

// Stop when window loses focus
window.addEventListener('blur', stopHold);

// Prevent context menu on long press
holdButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle touch events for mobile
holdButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    holdButton.dispatchEvent(new MouseEvent('mousedown'));
});

holdButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    holdButton.dispatchEvent(new MouseEvent('mouseup'));
});

// Stop when touch moves away from button
holdButton.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    stopHold();
}); 