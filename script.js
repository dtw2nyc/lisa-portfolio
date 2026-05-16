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

  eventsToShow.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.setAttribute("data-event-index", index);
    
    card.innerHTML = `
      <div class="event-image-wrapper">
        <img src="${event.image}" alt="${event.name}" class="event-image">
      </div>
      
      <div class="event-content" contenteditable="true" data-field="highlights">
        <div class="event-year">${event.year}</div>
        <h3 class="event-name" contenteditable="true" data-field="name">${event.name}</h3>
        <div class="event-company" contenteditable="true" data-field="client">${event.client}</div>
        <div class="event-type">${event.type}</div>
        
        <div class="event-detail"><strong>Role:</strong> <span contenteditable="true" data-field="role">${event.role}</span></div>
        <div class="event-detail"><strong>Location:</strong> <span contenteditable="true" data-field="location">${event.location}</span></div>
        ${event.attendance ? `<div class="event-detail"><strong>Attendance:</strong> <span contenteditable="true" data-field="attendance">${event.attendance}</span></div>` : ""}
        ${event.budget ? `<div class="event-detail"><strong>Budget:</strong> <span contenteditable="true" data-field="budget">${event.budget}</span></div>` : ""}
        
        <div class="event-highlight" contenteditable="true" data-field="keyAchievement">"${event.keyAchievement}"</div>
      </div>
      
      <div class="edit-hint">Click to edit</div>
    `;
    
    grid.appendChild(card);
  });
  
  // Add edit functionality
  addEditListeners();
}

// Add listeners for editable content
function addEditListeners() {
  const editableElements = document.querySelectorAll("[contenteditable='true']");
  
  editableElements.forEach((el) => {
    el.addEventListener("focus", function() {
      this.parentElement.classList.add("editing");
    });
    
    el.addEventListener("blur", function() {
      this.parentElement.classList.remove("editing");
      // You can save changes here to localStorage if desired
    });
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

// Initial render - show all events (already in chronological order in data.js)
renderEvents(events);
