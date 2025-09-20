document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.querySelector('.about-stars');
    if (starContainer) {
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'about-star';
            star.style.top = Math.random() * 90 + '%';
            star.style.left = Math.random() * 98 + '%';
            star.style.animationDelay = (Math.random() * 12) + 's';
            starContainer.appendChild(star);
        }
    }
});

const card = document.querySelector('.about-card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;   

  // update gradient center to follow cursor
  card.style.setProperty('--glow-x', `${x}px`);
  card.style.setProperty('--glow-y', `${y}px`);

  card.style.setProperty(
    '--glow-gradient',
    `radial-gradient(circle at ${x}px ${y}px, #00ffe0, #ff00d4, transparent 70%)`
  );

  card.style.setProperty("background", "rgba(255,255,255,0.05)");
  card.style.setProperty("backdrop-filter", "blur(12px)");

  card.style.setProperty("--glow-active", 1);
});

card.addEventListener('mouseleave', () => {
  card.style.setProperty('--glow-gradient',
    'radial-gradient(circle at center, #00ffe0, #ff00d4, transparent 70%)'
  );
});

// Select the container where stars will appear
const aboutSection = document.querySelector("#about");
const starContainer = document.createElement("div");
starContainer.classList.add("about-stars");
aboutSection.appendChild(starContainer);

// Count of stars
const starCount = 100;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("about-star");

  // Random position inside section
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  // Random animation duration (faster movement)
  const duration = 5 + Math.random() * 5; // between 5s–10s
  star.style.animationDuration = `${duration}s`;

  starContainer.appendChild(star);
}

// Simple looping typing animation

const text = `I am a dedicated and passionate developer with a strong focus on modern design, high-quality applications, and
creative solutions using the latest technology and various stacks. My goal is to create innovative and efficient software that meets user needs and exceeds expectations.
With a keen eye for detail and a commitment to excellence, I strive to deliver projects that are not only functional but also visually appealing.
I believe in continuous learning and staying updated with the latest trends in technology to ensure that my skills remain relevant and cutting-edge.`;

const typingElement = document.getElementById("typing-text");

let i = 0;
const typingSpeed = 10; 
const pauseAfterComplete = 5000; 
const eraseSpeed = 5;
let isErasing = false;

function typeWriter() {
  if (!isErasing && i < text.length) {
    // Typing forward
    typingElement.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, typingSpeed);
  } else if (!isErasing && i >= text.length) {
    // Finished typing, pause then start erasing
    isErasing = true;
    setTimeout(typeWriter, pauseAfterComplete);
  } else if (isErasing && i > 0) {
    // Erasing backward
    typingElement.textContent = text.substring(0, i - 1);
    i--;
    setTimeout(typeWriter, eraseSpeed);
  } else if (isErasing && i === 0) {
    // Finished erasing, start typing again
    isErasing = false;
    setTimeout(typeWriter, 300);
  }
}

// Start typing once page loads
window.addEventListener('DOMContentLoaded', typeWriter);

// 3D flip animation 
document.addEventListener('DOMContentLoaded', function() {
  const flipCard = document.getElementById('flipCard');
  
  if (flipCard) {
    let isAnimating = false;
    let isFlipped = false;
    
    flipCard.addEventListener('click', function() {
      if (isAnimating) return;
      
      isAnimating = true;
      isFlipped = !isFlipped;
      
      // Create realistic 3D flip
      if (isFlipped) {
        // Flip to back 
        this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.transform = 'rotateY(90deg) scale(0.95) rotateX(5deg)';
        
        setTimeout(() => {
          this.classList.add('flipped');
          this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          this.style.transform = 'rotateY(180deg) scale(1) rotateX(0deg)';
        }, 300);
        
      } else {
        // Flip to front 
        this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.transform = 'rotateY(90deg) scale(0.95) rotateX(5deg)';
        
        setTimeout(() => {
          this.classList.remove('flipped');
          this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          this.style.transform = 'rotateY(0deg) scale(1) rotateX(0deg)';
        }, 300);
      }
      
      // Reset animation
      setTimeout(() => {
        isAnimating = false;
        this.style.transform = '';
        this.style.transition = '';
      }, 700);
    });
    
    // Enhanced 3D hover with depth
    flipCard.addEventListener('mouseenter', function() {
      if (isAnimating) return;
      
      this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease';
      this.style.transform = 'translateY(-8px) rotateX(10deg) scale(1.03)';
      this.style.boxShadow = '0 20px 40px rgba(0, 255, 128, 0.4)';
    });
    
    flipCard.addEventListener('mouseleave', function() {
      if (isAnimating) return;
      
      this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease';
      this.style.transform = '';
      this.style.boxShadow = '';
    });
    
    // Smooth 3D tilt following mouse
    flipCard.addEventListener('mousemove', function(e) {
      if (isAnimating) return;
      
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / rect.height) * -20;
      const rotateY = (mouseX / rect.width) * 20;
      
      const baseRotateY = isFlipped ? 180 : 0;
      
      this.style.transition = 'transform 0.1s ease-out';
      this.style.transform = `
        rotateY(${baseRotateY + rotateY}deg) 
        rotateX(${rotateX + 5}deg) 
        translateY(-8px) 
        scale(1.03)
        translateZ(${Math.abs(rotateX) + Math.abs(rotateY)}px)
      `;
    });
    
    // Add visual feedback on click
    flipCard.addEventListener('mousedown', function() {
      if (isAnimating) return;
      
      this.style.transform += ' scale(0.98)';
      this.style.transition = 'transform 0.1s ease';
    });
    
    flipCard.addEventListener('mouseup', function() {
      if (isAnimating) return;
      
      this.style.transition = 'transform 0.2s ease';
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
                const laceHolder = document.querySelector("#lace-falling");

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                laceHolder.classList.remove("animate"); 
                                void laceHolder.offsetWidth; 
                                laceHolder.classList.add("animate");
                            }
                        });
                    },
                    { threshold: 0.6 }
                );

                observer.observe(laceHolder);
            });
            




            // Scroll ANimation FADE IN
         
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("#about");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  sections.forEach(section => observer.observe(section));
});




// Fade-in (LEFT) animation for about section
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about-me");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("visible");
        // If you only want the animation once:
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // 20% visible triggers

  observer.observe(aboutSection);
});


// Fade-in (RIGHT) animation for flip card
document.addEventListener("DOMContentLoaded", () => {
  const flipCard = document.querySelector(".flip-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // If you only want it once:
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // triggers at 20% visible

  observer.observe(flipCard);
});


// Staggered fade-in for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`; // 0.2s stagger
    observer.observe(card);
  });
});


// Staggered fade-in for tech stack cards
document.addEventListener("DOMContentLoaded", () => {
  const stackCards = document.querySelectorAll(".stack-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
       
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

 
  stackCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// Fade-in for contact section
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".contact-info, .contact-form");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  elems.forEach(el => observer.observe(el));
});

