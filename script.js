let config = {
  currency: localStorage.getItem("currency") || "FCFA",
  calcMode: localStorage.getItem("calcMode") || "simple",
  alert: localStorage.getItem("alert") === "true"
};

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

function showSection(id) {
  let sections = document.querySelectorAll("section");

  sections.forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  document.getElementById("sidebar").classList.remove("active");
}

// page par défaut
document.addEventListener("DOMContentLoaded", () => {
  showSection("home");
});
let balance = 0;
let incomeTotal = 0;
let expenseTotal = 0;
let transactions = [];

function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  if (!desc || amount <= 0) return;

  transactions.push({ desc, amount, type });

  if (type === "income") {
    incomeTotal += amount;
    balance += amount;
  } else {
    expenseTotal += amount;
    balance -= amount;
  }

  updateUI();
  renderTable();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function updateUI() {
  document.getElementById("incomeTotal").innerText = incomeTotal;
  document.getElementById("expenseTotal").innerText = expenseTotal;
  document.getElementById("balance").innerText = balance;
  updateStats();
}

function renderTable() {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  transactions.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.desc}</td>
        <td>${t.amount}</td>
        <td>${t.type}</td>
      </tr>
    `;
  });
}

function updateStats() {

  let t = calculateTotals();

  document.getElementById("statBudget").innerText = applyCurrency(t.budget);
  document.getElementById("statDepenses").innerText = applyCurrency(t.depenses);
  document.getElementById("statEpargne").innerText = applyCurrency(t.epargne || 0);
  document.getElementById("statEcart").innerText = applyCurrency(t.solde);
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

function renderGoals() {
  let container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  goals.forEach(goal => {

    let percent = (incomeTotal / goal.target) * 100;
    if (percent > 100) percent = 100;

    container.innerHTML += `
      <div class="card">
        <h3>${goal.name}</h3>
        <p>${incomeTotal} / ${goal.target} FCFA</p>

        <div class="progress">
          <div class="progress-bar" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  });
}

let budgetData = [];
function renderBudgetTable() {

  let table = document.getElementById("budgetTableBody");
  table.innerHTML = "";

  budgetData.forEach((row, index) => {

    let prevu = Number(row.prevu || 0);
    let reel = Number(row.reel || 0);
    let ecart = prevu - reel;

   table.innerHTML += `
  <tr>
    <td><input value="${row.cat}" oninput="budgetData[${index}].cat=this.value"></td>

    <td><input type="number" value="${row.prevu}"
      oninput="budgetData[${index}].prevu=this.value; syncAll()"></td>

    <td><input type="number" value="${row.reel}"
      oninput="budgetData[${index}].reel=this.value; syncAll()"></td>

    <td>${(Number(row.prevu || 0) - Number(row.reel || 0))}</td>

    <td><input value="${row.comment || ''}"
      oninput="budgetData[${index}].comment=this.value"></td>

    <td>
      <button onclick="deleteRow(${index})" class="delete-btn">🗑️</button>
    </td>
  </tr>

`;`
      <tr>
        
        <td>
          <input value="${row.cat}" 
            oninput="budgetData[${index}].cat = this.value; syncAll()"
        </td>

        <td>
          <input type="number" value="${applyCurrency(row.prevu)}"
            oninput="budgetData[${index}].prevu = this.value; syncAll()"
        </td>

        <td>
          <input type="number" value="${row.reel}"
            oninput="budgetData[${index}].reel=this.value; syncAll()"
        </td>

        <td class="ecart">${ecart}</td>

        <td>
          <input value="${row.comment || ''}"
            oninput="budgetData[${index}].comment = this.value; syncAll()"
        </td>

      </tr>
    `;
  });
}

updateBudgetSummary();

function addRow() {
  budgetData.push({
    cat: "",
    prevu: "",
    reel: "",
    comment: ""
  });

  renderBudgetTable(); // IMPORTANT
  syncAll();           // ensuite seulement
}

function resetAll() {
  if (confirm("⚠️ Tu es sûr de vouloir tout supprimer ?")) {

    localStorage.clear();

    budgetData = [];
    goals = [];
    transactions = [];

    renderBudgetTable();
    renderGoals();
    renderTable();

    alert("✅ Application réinitialisée !");
  }
}

function deleteRow(index) {
  if (confirm("Supprimer cette ligne ?")) {
    budgetData.splice(index, 1);
    renderBudgetTable();
  }
}


function calculateTotals() {

  let revenus = 0;
  let depenses = 0;
  let epargne = 0;

  budgetData.forEach(row => {

    let cat = (row.cat || "").toLowerCase();
    let val = Number(row.reel || 0);

    if (cat.includes("revenu")) {
      revenus += val;
    }
    else if (cat.includes("épargne") || cat.includes("epargne")) {
      epargne += val;
    }
    else {
      depenses += val;
    }
  });

  if (config.calcMode === "simple") {
    return {
      budget: revenus,
      depenses: depenses + epargne,
      solde: revenus - depenses - epargne
    };
  }

  // MODE DÉTAILLÉ
  return {
    budget: revenus,
    depenses,
    epargne,
    solde: revenus - depenses - epargne
  };
}


function updateBudgetSummary() {
  let totalPrevus = 0;
  let totalReels = 0;

  budgetData.forEach(row => {
    totalPrevus += Number(row.prevu || 0);
    totalReels += Number(row.reel || 0);
  });

  let ecart = totalPrevus - totalReels;
  let taux = totalPrevus > 0 ? (totalReels / totalPrevus) * 100 : 0;

  document.getElementById("statBudget").innerText = totalPrevus;
  document.getElementById("statDepenses").innerText = totalReels;
  document.getElementById("statEcart").innerText = ecart;
  document.getElementById("statTaux").innerText = taux.toFixed(1) + "%";
}

function syncAll() {
  updateBudgetSummary();
  updateStats();
  renderGoals();
  saveData(); // si tu as déjà l’auto-save
}

function deleteRow(index) {
  budgetData.splice(index, 1);
  syncAll();
}

function applyCurrency(value) {
  return value + " " + config.currency;
}

function checkBudgetAlert() {

  if (!config.alert) return;

  let t = calculateTotals();

  if (t.depenses > t.budget) {
    alert("⚠️ Attention : tu as dépassé ton budget !");
  }
}
function setCurrency() {
  config.currency = document.getElementById("currencySelect").value;
  localStorage.setItem("currency", config.currency);
  syncAll();
} 
function setCalcMode() {
  config.calcMode = document.getElementById("calcMode").value;
  localStorage.setItem("calcMode", config.calcMode);
  syncAll();
}
function setAlert() {
  config.alert = document.getElementById("budgetAlert").checked;
  localStorage.setItem("alert", config.alert);
}

function syncAll() {
  updateStats();
  updateBudgetSummary();
  renderGoals();
  checkBudgetAlert();
}

function deleteRow(index) {
  budgetData.splice(index, 1);

  renderBudgetTable(); // 🔥 obligatoire
  syncAll();           // 🔥 met à jour stats
}