// MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});


// SMOOTH SCROLL REVEAL ANIMATIONS

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});


// PREVENT SELECTING A PAST APPOINTMENT DATE

const dateInput = document.getElementById("preferredDate");

const today = new Date();

const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// APPOINTMENT ENQUIRY FORM

document.getElementById("bookingForm").addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    const name = data.get("name").trim();
    const phone = data.get("phone").trim();
    const treatment = data.get("treatment");
    const date = data.get("date") || "Flexible";

    const message =
      data.get("message")?.trim() || "No additional details";

    const whatsappMessage =
      `Hello Integrated Dental Care! I would like to enquire about an appointment.

Name: ${name}
Phone: ${phone}
Service: ${treatment}
Preferred date: ${date}
Notes: ${message}

Please let me know an available time.`;

    const whatsappURL =
      "https://wa.me/?text=" +
      encodeURIComponent(whatsappMessage);

    document.getElementById("formNote").textContent =
      "Opening WhatsApp... Please choose the clinic/contact to send your enquiry.";

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

  }
);