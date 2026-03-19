
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    link.addEventListener("click", function() {
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Message sent 🚀");
});