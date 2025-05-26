export default class Alert {
  constructor(alertsUrl = "../public/json/alerts.json") {
    this.alertsUrl = alertsUrl;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.alertsUrl);
      const alerts = await response.json();

      if (alerts.length > 0) {
        const section = document.createElement("section");
        section.classList.add("alert-list");

        alerts.forEach((alert) => {
          const p = document.createElement("p");
          p.textContent = alert.message;
          p.style.backgroundColor = alert.background || "gray";
          p.style.color = alert.color || "white";
          p.style.padding = "10px";
          p.style.margin = "5px 0";
          section.appendChild(p);
        });

        const main = document.querySelector("main");
        if (main) {
          main.parentNode.insertBefore(section, main);
        }
      }

    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }
}