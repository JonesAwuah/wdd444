const readMoreButtons = document.querySelectorAll(".read-more");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

// Extended details for each card
const details = {
  purpose: {
    title: "Our Purpose",
    text: "Our purpose is to create equal opportunities for job seekers across the world. We provide access to essential tools, training, and mentorship that enable people to build successful and sustainable careers."
  },
  mission: {
    title: "Our Mission",
    text: "Our mission is to empower individuals by offering practical career guidance, modern skill development resources, and real-world examples. We aim to make every learner confident and ready to thrive in the job market."
  },
  vision: {
    title: "Our Vision",
    text: "Our vision is to build a strong, inclusive community where all individuals — regardless of their background or experience — can access meaningful employment and develop professionally with lifelong support."
  }
};

// Handle Read More button clicks
readMoreButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");
    modalTitle.textContent = details[target].title;
    modalText.textContent = details[target].text;
    modal.style.display = "block";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});






/// Responsive nav toggle
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

hamburger.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Dropdown toggle
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownToggle.addEventListener("click", (e) => {
  e.preventDefault(); // prevent jump
  dropdownContent.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});
