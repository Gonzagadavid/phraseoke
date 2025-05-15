document.addEventListener("DOMContentLoaded", () => {
  const lyricsInput = document.getElementById("lyrics")
  const durationInput = document.getElementById("duration")
  const startBtn = document.getElementById("startBtn")
  const resetBtn = document.getElementById("resetBtn")
  const display = document.getElementById("display")
  const progressBar = document.getElementById("progress-bar")

  let animationId = null
  let startTime = null
  let isPlaying = false

  startBtn.addEventListener("click", () => {
    if (isPlaying) return

    const lyrics = lyricsInput.value.trim()
    if (!lyrics) {
      alert("Please enter some lyrics first!")
      return
    }

    const duration = Number.parseInt(durationInput.value)
    if (isNaN(duration) || duration <= 0) {
      alert("Please enter a valid duration!")
      return
    }

    startVideoke(lyrics, duration)
  })

  resetBtn.addEventListener("click", () => {
    stopVideoke()
    display.innerHTML = "<p>Your lyrics will appear here...</p>"
    progressBar.style.width = "0%"
  })

  function startVideoke(lyrics, durationInSeconds) {
    isPlaying = true
    startBtn.disabled = true
    lyricsInput.disabled = true
    durationInput.disabled = true

    const characters = lyrics.split("")
    display.innerHTML = characters
      .map((char) => (char === " " ? "<span>&nbsp;</span>" : `<span>${char}</span>`))
      .join("")

    const spans = display.querySelectorAll("span")
    const totalChars = spans.length
    const durationMs = durationInSeconds * 1000
    const charDuration = durationMs / totalChars

    startTime = Date.now()

    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      progressBar.style.width = `${progress * 100}%`

      const charsToHighlight = Math.floor(progress * totalChars)

      spans.forEach((span, index) => {
        if (index < charsToHighlight) {
          span.classList.add("highlighted")
        } else {
          span.classList.remove("highlighted")
        }
      })

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          resetVideoke()
        }, 2000)
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  function stopVideoke() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    resetVideoke()
  }

  function resetVideoke() {
    isPlaying = false
    startBtn.disabled = false
    lyricsInput.disabled = false
    durationInput.disabled = false
  }
})
