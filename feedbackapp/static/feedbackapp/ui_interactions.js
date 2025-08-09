function toggleDropdown() {
  const dropdown = document.getElementById("dateDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Optional: Close dropdown if clicked outside
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    document.querySelectorAll('.dropdown-content').forEach(dd => dd.style.display = 'none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboard()
  setup()
})
function setup() {
  document.querySelectorAll(".btn-outline-primary").forEach((button) => {
    button.addEventListener("click", () => {
      button.toggle("active");
    });
  });
  document.querySelectorAll('.filter-pill').forEach((pill)=>{
    pill.addEventListener("click",()=>{
      pill.classList.toggle("active")
      console.log(pill.classList)
    })
    console.log("hello")
  })
}
function applyFilters(){
  
}
