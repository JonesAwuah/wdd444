document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Grab required fields
  const first = params.get("first") || "N/A";
  const last = params.get("last") || "N/A";
  const email = params.get("email") || "N/A";
  const phone = params.get("phone") || "N/A";
  const organization = params.get("organization") || "N/A";
  const timestamp = params.get("timestamp") || "N/A";

  // Insert values into thankyou box
  const detailsBox = document.getElementById("thankyouDetails");
  detailsBox.innerHTML = `
    <p><strong>First Name:</strong> ${first}</p>
    <p><strong>Last Name:</strong> ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Submitted On:</strong> ${timestamp}</p>
  `;
});
