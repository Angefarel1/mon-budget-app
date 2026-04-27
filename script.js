function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");

  // ✅ FIX UNIQUEMENT ICI (évite le crash si overlay n'existe pas)
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.toggle("active");
  }
}

function showSection(id) {
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    section.style.display = "none";
  });

  const active = document.getElementById(id);
  if (active) {
    active.style.display = "block";
  }
}

let balance = 0;
let totalIncome = 0;
let totalExpense = 0;

function updateDashboard() {
  document.getElementById("balance").innerText = balance + " FCFA";
  document.getElementById("incomeTotal").innerText = totalIncome + " FCFA";
  document.getElementById("expenseTotal").innerText = totalExpense + " FCFA";
}

function addIncome() {
  let income = Number(document.getElementById("income").value);

  if (income > 0) {
    totalIncome += income;
    balance += income;
    updateDashboard();
  }

  document.getElementById("income").value = "";
}

function addExpense() {
  let expense = Number(document.getElementById("expense").value);

  if (expense > 0) {
    totalExpense += expense;
    balance -= expense;
    updateDashboard();
  }

  document.getElementById("expense").value = "";
}

let transactions = [];

function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  if (desc === "" || amount <= 0) return;

  let transaction = { desc, amount, type };
  transactions.push(transaction);

  renderTable();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function renderTable() {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  transactions.forEach(t => {
    let row = `
      <tr>
        <td>${t.desc}</td>
        <td>${t.amount} FCFA</td>
        <td>${t.type}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}


// ==================== TABLEAU DE BUDGET ====================

let budgetData = [];

function renderBudgetTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  budgetData.forEach((row, index) => {
    let tr = document.createElement("tr");

    if (row.cat === "REVENUS" || row.cat === "TOTAL REVENUS") tr.classList.add("revenu-row");
    else if (row.cat.includes("DÉPENSES FIXES") || row.cat === "Sous-total Dépenses fixes") tr.classList.add("section-row");
    else if (row.cat.includes("DÉPENSES VARIABLES") || row.cat === "Sous-total Dépenses variables") tr.classList.add("section-row");
    else if (row.cat.includes("ÉPARGNE") || row.cat.includes("TOTAL DÉPENSES + ÉPARGNE") || row.cat.includes("SOLDE FINAL")) tr.classList.add("total-row");

    let ecartHTML = "";
    if (row.prevu !== "" && row.reel !== "") {
      let ecart = row.prevu - row.reel;
      ecartHTML = `<span class="${ecart >= 0 ? 'ecart-pos' : 'ecart-neg'}">${ecart.toLocaleString('fr-FR')}</span>`;
    }

    tr.innerHTML = `
  <td><input type="text" value="${row.cat || ''}" oninput="budgetData[${index}].cat = this.value"></td>
  <td><input type="number" value="${row.prevu || ''}" oninput="budgetData[${index}].prevu = this.value"></td>
  <td><input type="number" value="${row.reel || ''}" oninput="updateReel(${index}, this.value)"></td>
  <td></td>
  <td><input type="text" value="${row.comment || ''}" oninput="updateComment(${index}, this.value)"></td>

  <td>
    <button onclick="deleteRow(${index})" style="background:red;color:white;border:none;padding:5px;border-radius:5px;">
      🗑️
    </button>
  </td>
`;
   tr.classList.add("add-row");
tbody.appendChild(tr);
  });

  updateBudgetSummary();
  
}

function updateReel(index, value) {
  budgetData[index].reel = value === "" ? 0 : parseFloat(value);

  updateBudgetSummary();
  updateChart();
}

function updateComment(index, value) {
  budgetData[index].comment = value;
}

function updateBudgetSummary() {
  let totalRevenus = 0;
  let totalDepenses = 0;
  let totalEpargne = 0;

  budgetData.forEach(row => {
    let cat = (row.cat || "").toLowerCase();
    let prevu = Number(row.reel || 0);

    if (cat.includes("revenu") || cat.includes("salaire")) {
      totalRevenus += prevu;
    }
    else if (cat.includes("épargne") || cat.includes("epargne")) {
      totalEpargne += prevu;
    }
    else if (cat !== "" && !cat.includes("total") && !cat.includes("revenu")) {
      totalDepenses += prevu;
    }

    updateCharts();
    updateStats();
    renderGoals();
  });

  let solde = totalRevenus - totalDepenses - totalEpargne;

  document.getElementById("totalRevenus").textContent = totalRevenus.toLocaleString('fr-FR');
  document.getElementById("totalDepenses").textContent = (totalDepenses + totalEpargne).toLocaleString('fr-FR');
  document.getElementById("soldeFinal").textContent = solde.toLocaleString('fr-FR');
}

function resetToPlanned() {
  if (confirm("Réinitialiser toutes les dépenses réelles aux valeurs prévues ?")) {
    budgetData.forEach(row => {
      if (row.prevu !== "" && !row.cat.includes("TOTAL")) {
        row.reel = row.prevu;
      }
    });
    renderBudgetTable();
  }
}

function exportData() {
  const jsonStr = JSON.stringify(budgetData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "budget_avril_2026.json";
  a.click();
  URL.revokeObjectURL(url);
  alert("✅ Budget exporté avec succès !");
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        budgetData = JSON.parse(ev.target.result);
        renderBudgetTable();
        alert("✅ Budget importé avec succès !");
      } catch (err) {
        alert("❌ Erreur : Le fichier JSON n'est pas valide.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

document.addEventListener("DOMContentLoaded", () => {
  renderBudgetTable();
});

function addEmptyRow() {
  budgetData.push({
    cat: "",
    prevu: "",
    reel: "",
    comment: ""
  });

  renderBudgetTable();
}

function deleteRow(index) {
  const table = document.getElementById("tableBody");
  const row = table.children[index];

  if (!row) return;

  // 🔥 animation avant suppression
  row.classList.add("fade-out");

  setTimeout(() => {
    budgetData.splice(index, 1);
    renderBudgetTable();

    // 🔥 mise à jour globale
    updateBudgetSummary();
    updateCharts();
    updateStats();
    renderGoals();

  }, 300); // durée = animation CSS
}

let chart;

let depenseChart, epargneChart, resteChart;

function updateCharts() {

  let totalRevenus = 0;
  let totalDepenses = 0;
  let totalEpargne = 0;

  budgetData.forEach(row => {
    let cat = (row.cat || "").toLowerCase();
    let value = Number(row.reel || 0);

    if (cat.includes("revenu")) {
      totalRevenus += value;
    }
    else if (cat.includes("epargne") || cat.includes("épargne")) {
      totalEpargne += value;
    }
    else if (cat !== "") {
      totalDepenses += value;
    }
  });

  let reste = totalRevenus - totalDepenses - totalEpargne;
  if (reste < 0) reste = 0;

  let totalGlobal = totalRevenus || (totalDepenses + totalEpargne + reste);
  if (totalGlobal === 0) totalGlobal = 1;

  if (depenseChart) depenseChart.destroy();
  if (epargneChart) epargneChart.destroy();
  if (resteChart) resteChart.destroy();

  depenseChart = new Chart(document.getElementById("depenseChart"), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [totalDepenses, totalGlobal - totalDepenses],
        backgroundColor: ["#ff4d4d", "#eee"]
      }]
    },
    options: { maintainAspectRatio: false }
  });

  epargneChart = new Chart(document.getElementById("epargneChart"), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [totalEpargne, totalGlobal - totalEpargne],
        backgroundColor: ["#ffe97a", "#eee"]
      }]
    },
    options: { maintainAspectRatio: false }
  });

  resteChart = new Chart(document.getElementById("resteChart"), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [reste, totalGlobal - reste],
        backgroundColor: ["#4dabf7", "#eee"]
      }]
    },
    options: { maintainAspectRatio: false }
  });
}

function updateStats() {

  let totalPrevus = 0;
  let totalDepenses = 0;
  let totalEpargne = 0;

  budgetData.forEach(row => {
    let cat = (row.cat || "").toLowerCase();
    let prevu = Number(row.prevu || 0);
    let reel = Number(row.reel || 0);

    totalPrevus += prevu;
    totalDepenses += reel;

    if (cat.includes("épargne") || cat.includes("epargne")) {
      totalEpargne += reel;
    }
  });

  let taux = totalPrevus > 0 ? (totalDepenses / totalPrevus) * 100 : 0;
  let ecart = totalPrevus - totalDepenses;

  document.getElementById("statBudget").textContent = totalPrevus.toLocaleString('fr-FR') + " FCFA";
  document.getElementById("statDepenses").textContent = totalDepenses.toLocaleString('fr-FR') + " FCFA";
  document.getElementById("statEpargne").textContent = totalEpargne.toLocaleString('fr-FR') + " FCFA";
  document.getElementById("statTaux").textContent = taux.toFixed(1) + "%";
  document.getElementById("statEcart").textContent = ecart.toLocaleString('fr-FR') + " FCFA";
}

let goals = [];

function createGoal() {
  let name = document.getElementById("goalName").value;
  let amount = Number(document.getElementById("goalAmount").value);

  if (!name || amount <= 0) return;

  goals.push({
    name,
    target: amount,
    saved: 0
  });

  renderGoals();

  document.getElementById("goalName").value = "";
  document.getElementById("goalAmount").value = "";
}

function addSavings(index) {
  let value = Number(prompt("Montant à ajouter :"));

  if (value > 0) {
    goals[index].saved += value;
    renderGoals();
  }
}

function renderGoals() {
  let container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  let autoSaved = getTotalEpargne();

  goals.forEach((goal) => {

    let percent = (autoSaved / goal.target) * 100;
    if (percent > 100) percent = 100;

    container.innerHTML += `
      <div class="goal-card">
        <h3>${goal.name}</h3>
        <p>${autoSaved} / ${goal.target} FCFA</p>

        <div class="progress-bar">
          <div class="progress" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  });
}

function getTotalEpargne() {
  let total = 0;

  budgetData.forEach(row => {
    let cat = (row.cat || "").toLowerCase();
    let value = Number(row.reel || 0);

    if (cat.includes("épargne") || cat.includes("epargne")) {
      total += value;
    }
  });

  return total;
}



// ==================== PARAMÈTRES ====================

function setCurrency() {
  let val = document.getElementById("currencySelect").value;
  localStorage.setItem("currency", val);
  applySettings();
}

function setCharts() {
  let val = document.getElementById("chartsToggle").checked;
  localStorage.setItem("charts", val);
  applySettings();
}

function setCalcMode() {
  let val = document.getElementById("calcMode").value;
  localStorage.setItem("calcMode", val);
}

function setAlert() {
  let val = document.getElementById("budgetAlert").checked;
  localStorage.setItem("alert", val);
}

// ==================== APPLIQUER LES PARAMÈTRES ====================

function applySettings() {

  const currency = localStorage.getItem("currency") || "FCFA";

  document.querySelectorAll("#statBudget, #statDepenses, #statEpargne, #statEcart, #totalRevenus, #totalDepenses, #soldeFinal").forEach(el => {
    if (el) {
      el.textContent = el.textContent.replace(/FCFA|USD|EUR/g, currency);
    }
  });

  document.querySelectorAll(".budget-table th, .summary-box").forEach(el => {
    el.innerHTML = el.innerHTML.replace(/FCFA|USD|EUR/g, currency);
  });

  const charts = localStorage.getItem("charts");

  document.querySelectorAll(".charts").forEach(el => {
    el.style.display = (charts === "false") ? "none" : "block";
  });

  const currencyNow = localStorage.getItem("currency") || "FCFA";
  document.getElementById("currentCurrency").textContent = currencyNow;
}

document.getElementById("currencySelect").value =
  localStorage.getItem("currency") || "FCFA";

document.getElementById("chartsToggle").checked =
  localStorage.getItem("charts") === "true";

document.getElementById("calcMode").value =
  localStorage.getItem("calcMode") || "simple";

document.getElementById("budgetAlert").checked =
  localStorage.getItem("alert") === "true";

window.addEventListener("DOMContentLoaded", applySettings);

document.addEventListener("DOMContentLoaded", () => {
  renderBudgetTable();
  showSection("landing"); // 👈 ajoute juste ça
});

