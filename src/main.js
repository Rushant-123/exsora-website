import './style.css'
import { Application } from '@splinetool/runtime'

// Background canvas animation
const initBackgroundAnimation = () => {
  const canvas = document.getElementById('bg-canvas')
  const ctx = canvas.getContext('2d')
  
  // Set canvas size
  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)

  // Particle system
  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 2 - 1
      this.speedY = Math.random() * 2 - 1
      this.opacity = Math.random() * 0.5
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > canvas.width || 
          this.y < 0 || this.y > canvas.height) {
        this.reset()
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`
      ctx.fill()
    }
  }

  const particles = Array(50).fill().map(() => new Particle())

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })
    requestAnimationFrame(animate)
  }

  animate()
}

// Loading screen handler
const handleLoading = () => {
  const loadingScreen = document.getElementById('loading-screen')
  
  // Hide loading screen immediately if page is already loaded
  if (document.readyState === 'complete') {
    loadingScreen.classList.add('hidden')
  } else {
    // Hide loading screen when page loads
    window.addEventListener('load', () => {
      loadingScreen.classList.add('hidden')
    })
  }
}

// Magnetic button effect
const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('.magnetic')
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0px, 0px)'
    })
  })
}

// Initialize Spline
const initSpline = async () => {
  try {
    const canvas = new Application('#spline-container')
    await canvas.load('https://prod.spline.design/your-scene-url')
  } catch (error) {
    console.error('Error loading Spline scene:', error)
  }
}

// Handle waitlist form
const handleWaitlistForm = () => {
  const form = document.getElementById('waitlist-form')
  const successMessage = document.getElementById('success-message')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // Get the email value
    const email = form.querySelector('input[type="email"]').value

    // Here you would typically send this to your backend
    console.log('Email submitted:', email)

    // Add submitted class to form
    form.classList.add('submitted')

    // Show success message
    successMessage.classList.add('show')

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.classList.remove('show')
      // Reset form
      form.reset()
      form.classList.remove('submitted')
    }, 3000)
  })
}

// Initialize everything
const init = () => {
  initBackgroundAnimation()
  handleLoading()
  initMagneticButtons()
  initSpline()
  handleWaitlistForm()
}

init() 