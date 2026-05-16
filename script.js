// Filter logic
const filterMap = {
  all: () => true,
  "Consumer Festival": (e) => e.tags.includes("Consumer Festival"),
  "Executive Summit": (e) => e.tags.includes("Executive Summit") || e.type === "Executive Dinner" || e.type === "Executive Meeting",
  "Food Festival": (e) => e.tags.includes("Food Festival") || e.type === "Food & Beverage",
  "Pop-up Event": (e) => e.tags.includes("Pop-up Event"),
  "Benefit Gala": (e) => e.tags.includes("Benefit Gala"),
  "Conference": (e) => e.tags.includes("Conference"),
  "Community": (e) => e.tags.includes("Community") || e.type === "Community"
};

// Render event grid
function renderEvents(eventsToShow) {
  const grid = document.getElementById("eventGrid");
  grid.innerHTML = "";

  eventsToShow.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-year">${event.year}</div>
      <h3>${event.name}</h3>
      <div class="event-company">${event.client}</div>
      <div class="event-type">${event.type}</div>
      
      <div class="event-detail"><strong>Role:</strong> ${event.role}</div>
      <div class="event-detail"><strong>Location:</strong> ${event.location}</div>
      ${event.attendance ? `<div class="event-detail"><strong>Attendance:</strong> ${event.attendance}</div>` : ""}
      ${event.budget ? `<div class="event-detail"><strong>Budget:</strong> ${event.budget}</div>` : ""}
      
      <div class="event-highlight">"${event.keyAchievement}"</div>
    `;
    grid.appendChild(card);
  });
}

// Filter button click handler
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Remove active class from all buttons
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    
    // Add active class to clicked button
    e.target.classList.add("active");
    
    // Get filter type
    const filterType = e.target.dataset.filter;
    
    // Filter events
    const filteredEvents = events.filter(filterMap[filterType]);
    
    // Render filtered events
    renderEvents(filteredEvents);
  });
});

// Initial render - show all events
renderEvents(events);