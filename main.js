function applyCSS() {
    const cssInput = document.getElementById('cssInput').value
    const sandboxBox = document.getElementById('sandboxBox')

    try {
        // Remove any existing style element
        const existingStyle = document.getElementById('sandboxStyle')
        if (existingStyle) {
            existingStyle.remove()
        }

        // Create new style element
        const style = document.createElement('style')
        style.id = 'sandboxStyle'
        style.textContent = `#sandboxBox { ${cssInput} }`
        document.head.appendChild(style)
    } catch (e) {
        alert('CSS Error: ' + e.message)
    }
}

// Generate table of contents
document.addEventListener('DOMContentLoaded', function () {
    const chapters = document.querySelectorAll('.chapter')
    const tocList = document.getElementById('tocList')

    chapters.forEach((chapter) => {
        const id = chapter.id
        const title = chapter.querySelector('h2').textContent

        const li = document.createElement('li')
        li.className = 'toc-item'

        const a = document.createElement('a')
        a.href = `#${id}`
        a.className = 'toc-link'
        a.textContent = title

        li.appendChild(a)
        tocList.appendChild(li)
    })

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle')
    darkModeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', this.checked)
        // Save preference to localStorage
        localStorage.setItem('darkMode', this.checked)
    })

    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true
        document.body.classList.add('dark-mode')
    }

    // Reading progress tracker
    const progressBar = document.getElementById('progressBar')
    const progressText = document.getElementById('progressText')
    const mainContent = document.getElementById('mainContent')

    function updateProgress() {
        const contentHeight = mainContent.offsetHeight
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight

        // Calculate how much of the content has been scrolled through
        const scrolled = scrollPosition + windowHeight
        const progress = Math.min(
            (scrolled / (contentHeight + windowHeight)) * 100,
            100
        )

        progressBar.style.width = `${progress}%`
        progressText.textContent = `${Math.round(progress)}%`
    }

    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)
    updateProgress() // Initial call
})

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement.nextElementSibling
    const range = document.createRange()
    range.selectNode(codeBlock)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()

    // Visual feedback
    const originalText = button.textContent
    button.textContent = 'Copied!'
    setTimeout(() => {
        button.textContent = originalText
    }, 2000)
}

// Show/hide exercise solutions
function showSolution(id) {
    const solution = document.getElementById(id)
    if (solution.style.display === 'none') {
        solution.style.display = 'block'
    } else {
        solution.style.display = 'none'
    }
}

// Interactive code editor (simplified)
function runCode() {
    const code = document.getElementById('interactiveCode').value
    const output = document.getElementById('codeOutput')

    try {
        // Note: In a real implementation, you'd want to sanitize this
        output.innerHTML = eval(code)
    } catch (e) {
        output.textContent = 'Error: ' + e.message
    }
}
