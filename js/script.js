function setMinHeights() {
  const containers = {
    ".carousel-container": 200, // Reduced from 250
  }

  for (const [selector, height] of Object.entries(containers)) {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      // Only set min-height if the element is empty or has placeholder content
      if (el.children.length === 0 || el.querySelector(".placeholder-slide")) {
        el.style.minHeight = `${height}px`
      } else {
        el.style.minHeight = "auto"
      }
    })
  }
}

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Set minimum heights for containers
  setMinHeights()

  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Add logo error handling
  const logoImg = document.querySelector(".logo-img")
  if (logoImg) {
    logoImg.addEventListener("error", function () {
      console.warn("Logo image failed to load. Using text-only logo.")
      this.style.display = "none"
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#fff"
    navbar.style.backdropFilter = "none"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .focus-card, .activity-card, .upcoming-card, .stat, .faq-item",
  )

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Image error handling only
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Replace broken images with placeholder
      this.src = "https://via.placeholder.com/300x200/f0f0f0/666666?text=Image+Not+Found"
      this.alt = "Image placeholder"
    })
  })
})

// Statistics counter animation
function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + "+"
  }, 20)
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".mission-stats")
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat h3")
          counters.forEach((counter) => {
            const target = Number.parseInt(counter.textContent)
            animateCounter(counter, target)
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(statsSection)
}

// Add hover effects to cards
document.querySelectorAll(".service-card, .focus-card, .activity-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Console welcome message
console.log("%c🏠 Aanandba Vruddhashram", "color: #4A90E2; font-size: 20px; font-weight: bold;")
console.log("%cEmpowering Elderly Lives with Care, Dignity, and Love", "color: #666; font-size: 14px;")
console.log("%cWebsite loaded successfully! 🎉", "color: #27AE60; font-size: 12px;")

// Photo Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.getElementById("carousel-track")
  const prevBtn = document.getElementById("carousel-prev")
  const nextBtn = document.getElementById("carousel-next")

  if (carouselTrack && prevBtn && nextBtn) {
    let currentPosition = 0
    const slideWidth = 320 // 300px + 20px margin
    const visibleSlides = Math.floor(carouselTrack.parentElement.offsetWidth / slideWidth)
    const totalSlides = carouselTrack.children.length
    const maxPosition = Math.max(0, (totalSlides - visibleSlides) * slideWidth)

    // Auto-scroll functionality
    let autoScrollInterval

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (currentPosition >= maxPosition) {
          currentPosition = 0
        } else {
          currentPosition += slideWidth
        }
        updateCarouselPosition()
      }, 3000)
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval)
    }

    function updateCarouselPosition() {
      carouselTrack.style.transform = `translateX(-${currentPosition}px)`
    }

    nextBtn.addEventListener("click", () => {
      stopAutoScroll()
      if (currentPosition < maxPosition) {
        currentPosition += slideWidth
      } else {
        currentPosition = 0
      }
      updateCarouselPosition()
      startAutoScroll()
    })

    prevBtn.addEventListener("click", () => {
      stopAutoScroll()
      if (currentPosition > 0) {
        currentPosition -= slideWidth
      } else {
        currentPosition = maxPosition
      }
      updateCarouselPosition()
      startAutoScroll()
    })

    // Pause auto-scroll on hover
    carouselTrack.addEventListener("mouseenter", stopAutoScroll)
    carouselTrack.addEventListener("mouseleave", startAutoScroll)

    // Start auto-scroll
    startAutoScroll()

    // Handle window resize
    window.addEventListener("resize", () => {
      const newVisibleSlides = Math.floor(carouselTrack.parentElement.offsetWidth / slideWidth)
      const newMaxPosition = Math.max(0, (totalSlides - newVisibleSlides) * slideWidth)

      if (currentPosition > newMaxPosition) {
        currentPosition = newMaxPosition
        updateCarouselPosition()
      }
    })
  }
})

// Add this to the window resize event
window.addEventListener("resize", () => {
  // Update minimum heights on window resize
  setMinHeights()
})
