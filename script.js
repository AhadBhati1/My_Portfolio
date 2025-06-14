// Projects data - MODIFY THIS ARRAY TO ADD NEW PROJECTS
const projects = [
    {
        id: '1',
        title: 'Binary Clock',
        description: 'A unique timepiece that displays time in binary format using LEDs, perfect for tech enthusiasts.',
        longDescription: 'An innovative digital clock that represents time in binary format using a grid of LEDs. Each column represents different time units (hours, minutes, seconds) in binary notation. The project features a sleek design with customizable LED colors and brightness levels. Built with Arduino and real-time clock module, it includes features like automatic time synchronization and multiple display modes. Perfect for learning binary number systems while having a functional and conversation-starting timepiece.',
        githubUrl: 'https://github.com/AhadBhati1/Binary_Clock',
        imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
        icon: 'clock'
    },
    {
        id: '2',
        title: 'Gesture to Speech Gloves',
        description: 'Smart gloves that convert hand gestures into speech, enabling communication for the hearing impaired.',
        longDescription: 'Revolutionary wearable technology that translates sign language gestures into audible speech in real-time. The gloves are equipped with flex sensors, accelerometers, and gyroscopes to capture precise hand movements and finger positions. Using machine learning algorithms, the system recognizes various sign language gestures and converts them to corresponding words or phrases through a built-in speaker. The project includes a mobile app for customization and learning new gestures. This assistive technology aims to bridge communication gaps and promote inclusivity for the deaf and hard-of-hearing community.',
        githubUrl: 'https://github.com/ahadbhati/gesture-speech-gloves',
        imageUrl: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg',
        icon: 'hand'
    },
    {
        id: '3',
        title: 'A_EYE: Smart AI Assistant',
        description: 'A hardware-based AI assistant that can see and describe the environment using computer vision.',
        longDescription: 'An intelligent hardware device that combines computer vision with natural language processing to understand and describe the surrounding environment. A_EYE uses a high-resolution camera module paired with edge AI processing to identify objects, read text, recognize faces, and describe scenes in real-time. The device features voice interaction capabilities, allowing users to ask questions about their environment and receive detailed audio responses. Built with Raspberry Pi and optimized AI models, it includes features like obstacle detection for navigation assistance, text-to-speech for reading documents, and scene analysis for enhanced environmental awareness. Designed as an assistive technology for visually impaired individuals and a smart companion for everyday tasks.',
        githubUrl: 'https://github.com/AhadBhati1/A_EYE',
        imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
        icon: 'eye'
    }
];

// Starfield animation with comets
class StarField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.comets = [];
        this.starCount = 200;
        this.maxComets = 3;
        
        this.resizeCanvas();
        this.initStars();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initStars() {
        this.stars = [];
        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.2 + 0.3,
                opacity: Math.random(),
                delta: (Math.random() * 0.02) + 0.005,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4
            });
        }
    }
    
    createComet() {
        const activeComets = this.comets.filter(c => c.active).length;
        
        if (activeComets < this.maxComets && Math.random() < 0.0008) { // Very low probability
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let x, y, speedX, speedY;
            
            switch (side) {
                case 0: // From top
                    x = Math.random() * this.canvas.width;
                    y = -50;
                    speedX = (Math.random() - 0.5) * 4;
                    speedY = Math.random() * 3 + 2;
                    break;
                case 1: // From right
                    x = this.canvas.width + 50;
                    y = Math.random() * this.canvas.height;
                    speedX = -(Math.random() * 3 + 2);
                    speedY = (Math.random() - 0.5) * 4;
                    break;
                case 2: // From bottom
                    x = Math.random() * this.canvas.width;
                    y = this.canvas.height + 50;
                    speedX = (Math.random() - 0.5) * 4;
                    speedY = -(Math.random() * 3 + 2);
                    break;
                default: // From left
                    x = -50;
                    y = Math.random() * this.canvas.height;
                    speedX = Math.random() * 3 + 2;
                    speedY = (Math.random() - 0.5) * 4;
                    break;
            }

            this.comets.push({
                x,
                y,
                speedX,
                speedY,
                length: Math.random() * 80 + 40,
                opacity: Math.random() * 0.8 + 0.2,
                active: true
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.stars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;
            
            // Wrap around edges
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            this.ctx.beginPath();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            
            star.opacity += star.delta;
            if (star.opacity > 1 || star.opacity < 0.1) {
                star.delta *= -1;
            }
        });

        // Create new comets occasionally
        this.createComet();

        // Draw comets
        this.comets.forEach((comet, index) => {
            if (!comet.active) return;

            comet.x += comet.speedX;
            comet.y += comet.speedY;

            // Remove comet if it's off screen
            if (comet.x < -100 || comet.x > this.canvas.width + 100 || 
                comet.y < -100 || comet.y > this.canvas.height + 100) {
                comet.active = false;
                return;
            }

            // Draw comet trail
            const gradient = this.ctx.createLinearGradient(
                comet.x, comet.y,
                comet.x - comet.speedX * comet.length / 5,
                comet.y - comet.speedY * comet.length / 5
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
            gradient.addColorStop(0.5, `rgba(135, 206, 250, ${comet.opacity * 0.6})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.ctx.beginPath();
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.moveTo(comet.x, comet.y);
            this.ctx.lineTo(
                comet.x - comet.speedX * comet.length / 5,
                comet.y - comet.speedY * comet.length / 5
            );
            this.ctx.stroke();

            // Draw comet head
            this.ctx.beginPath();
            this.ctx.globalAlpha = comet.opacity;
            this.ctx.arc(comet.x, comet.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = "white";
            this.ctx.fill();

            // Fade out comet over time
            comet.opacity *= 0.998;
            if (comet.opacity < 0.1) {
                comet.active = false;
            }
        });

        // Clean up inactive comets
        this.comets = this.comets.filter(c => c.active);
        
        this.ctx.globalAlpha = 1.0;
        requestAnimationFrame(() => this.animate());
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.onclick = () => openModal(project);
        
        projectCard.innerHTML = `
            <div class="project-glow"></div>
            <div class="project-content">
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <div class="project-overlay"></div>
                </div>
                <div class="project-info">
                    <div class="project-header">
                        <div class="project-icon">
                            <i data-lucide="${project.icon}"></i>
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Modal functions
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="${project.icon}"></i>
                </div>
                <div>
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.description}</p>
                </div>
            </div>
            
            <div class="modal-image">
                <img src="${project.imageUrl}" alt="${project.title}">
                <div class="project-overlay"></div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title">Project Overview</h3>
                <p class="modal-text">${project.longDescription}</p>
            </div>
            
            <div class="modal-actions">
                ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-github">
                        <i data-lucide="github"></i>
                        GitHub
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize Lucide icons for the modal content
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize starfield with comets
    const starfieldCanvas = document.getElementById('starfield');
    new StarField(starfieldCanvas);
    
    // Render projects
    renderProjects();
    
    // Re-initialize Lucide icons after rendering projects
    lucide.createIcons();
    
    // Close modal when clicking outside
    document.getElementById('projectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

/*
===========================================
HOW TO ADD NEW PROJECTS - STEP BY STEP GUIDE
===========================================

To add a new project to your portfolio, follow these simple steps:

STEP 1: Add your project to the projects array
------------------------------------------
Find the 'projects' array at the top of this file (around line 2-50).
Add a new project object with the following structure:

{
    id: '4', // Increment the number
    title: 'Your Project Name',
    description: 'A brief one-line description of your project',
    longDescription: 'A detailed description that will appear in the modal popup. Explain what the project does, technologies used, features, and impact.',
    githubUrl: 'https://github.com/yourusername/your-repo', // Optional
    imageUrl: 'https://your-image-url.com/image.jpg', // Use Pexels or Unsplash for free images
    icon: 'icon-name' // Choose from Lucide icons: https://lucide.dev/icons/
}

STEP 2: Choose an appropriate icon
--------------------------------
Visit https://lucide.dev/icons/ to browse available icons.
Popular choices for hardware projects:
- 'cpu' for processors/computing
- 'zap' for electrical/power
- 'wifi' for wireless/IoT
- 'camera' for vision/imaging
- 'thermometer' for sensors
- 'radio' for communication
- 'layers' for PCB/hardware
- 'clock' for timing projects
- 'hand' for gesture/interaction
- 'eye' for vision/AI

STEP 3: Find a good project image
-------------------------------
Use free stock photo websites:
- Pexels.com (recommended)
- Unsplash.com
- Pixabay.com

Search for terms like:
- "circuit board"
- "electronics"
- "microcontroller"
- "sensors"
- "technology"

Copy the direct image URL (right-click → Copy image address)

STEP 4: Test your addition
------------------------
1. Save this file
2. Refresh your webpage
3. Check that the new project appears in the grid
4. Click on it to test the modal popup
5. Verify the GitHub link works (if provided)

EXAMPLE: Adding a "Smart Home Controller" project
-----------------------------------------------

Add this to the projects array:

{
    id: '4',
    title: 'Smart Home Controller',
    description: 'Centralized IoT hub for controlling all smart home devices with voice commands.',
    longDescription: 'A comprehensive smart home automation system built with Raspberry Pi that serves as a central hub for controlling lights, temperature, security cameras, and appliances. Features include voice recognition, mobile app control, automated scheduling, and integration with popular smart home platforms. The system uses MQTT for device communication and includes a custom web dashboard for monitoring and control.',
    githubUrl: 'https://github.com/ahadbhati/smart-home-controller',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    icon: 'home'
}

TIPS:
- Keep descriptions concise but informative
- Use high-quality, relevant images
- Make sure GitHub URLs are correct
- Test on mobile devices too
- Icons should relate to your project's main function

That's it! Your new project will automatically appear on the website.
*/