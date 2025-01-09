// Get the Unsplash access key from config
const UNSPLASH_ACCESS_KEY = CONFIG.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set up config.js with your UNSPLASH_ACCESS_KEY');
}

const SIX_HOURS_MS = 1 * 60 * 60 * 1000; // 6 hours in milliseconds

async function getRandomImage() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random?orientation=landscape&query=nature&topics=nature,landscape', {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        
        const data = await response.json();
        return {
            url: data.urls.regular,
            photographer: data.user.name,
            photographerUrl: data.user.links.html
        };
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

function setAttribution(photographer, photographerUrl) {
    const attribution = document.getElementById('attribution');
    attribution.innerHTML = `Photo by <a href="${photographerUrl}?utm_source=homepage&utm_medium=referral" target="_blank">${photographer}</a> on <a href="https://unsplash.com/?utm_source=homepage&utm_medium=referral" target="_blank">Unsplash</a>`;
}

async function setBackgroundImage() {
    const savedImage = localStorage.getItem('backgroundImage');
    const savedTimestamp = localStorage.getItem('backgroundTimestamp');
    const savedPhotographer = localStorage.getItem('photographer');
    const savedPhotographerUrl = localStorage.getItem('photographerUrl');
    const currentTime = new Date().getTime();

    if (savedImage && savedTimestamp && savedPhotographer && 
        (currentTime - parseInt(savedTimestamp) < SIX_HOURS_MS)) {
        // Use cached image if it's less than 6 hours old
        document.body.style.backgroundImage = `url(${savedImage})`;
        setAttribution(savedPhotographer, savedPhotographerUrl);
    } else {
        // Fetch new image if cache is expired or doesn't exist
        const imageData = await getRandomImage();
        if (imageData) {
            document.body.style.backgroundImage = `url(${imageData.url})`;
            setAttribution(imageData.photographer, imageData.photographerUrl);
            
            // Save all image data to localStorage
            localStorage.setItem('backgroundImage', imageData.url);
            localStorage.setItem('photographer', imageData.photographer);
            localStorage.setItem('photographerUrl', imageData.photographerUrl);
            localStorage.setItem('backgroundTimestamp', currentTime.toString());
        }
    }
}

function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 17) {
        return 'Good afternoon';
    } else if (hour < 22) {
        return 'Good evening';
    } else {
        return 'Good night';
    }
}

function greetUser() {
    const userName = localStorage.getItem('userName');
    const greetingElement = document.getElementById('greeting');
    const timeGreeting = getTimeBasedGreeting();

    if (userName) {
        greetingElement.textContent = `${timeGreeting}, ${userName}!`;
    } else {
        const newName = prompt('Please enter your name:');
        if (newName) {
            localStorage.setItem('userName', newName);
            greetingElement.textContent = `${timeGreeting}, ${newName}!`;
        } else {
            greetingElement.textContent = `${timeGreeting}, anonymous!`;
        }
    }
}

async function init() {
    await setBackgroundImage();
    greetUser();
}