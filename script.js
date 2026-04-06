function formatXOF(valeur) {
    return valeur.toLocaleString("fr-FR") + " XOF";
}

// 🎯 CANVAS
const canvas = document.getElementById("graphique");
const ctx = canvas.getContext("2d");

// 🎯 DESSIN GRAPHIQUE

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function dessinerGraphique() {

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let lignes = document.querySelectorAll("#budget-body tr");

    let depenses = [];

    // 🔍 récupérer les données
    lignes.forEach(ligne => {

        let nom = ligne.querySelector("input[type='text']");
        let reel = ligne.querySelector(".reel");

        if (nom && reel) {
            let valeur = parseFloat(reel.value) || 0;

            if (valeur > 0) {
                depenses.push({
                    nom: nom.value || "Dépense",
                    valeur: valeur
                });
            }
        }
    });

    if (depenses.length === 0) return;

    let max = Math.max(...depenses.map(d => d.valeur));

creerAxe(max);

// 📏 GRILLE + AXE (style Excel)
let steps = 5;
let baseY = 180;

ctx.strokeStyle = "#ccc";
ctx.fillStyle = "black";
ctx.font = "10px Arial";

for (let i = 0; i <= steps; i++) {

    let valeur = (max / steps) * i;
    let y = baseY - (valeur / max) * 120;

    // ligne horizontale
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(canvas.width - 10, y);
    ctx.stroke();

    // texte (montant)
    ctx.fillText(Math.round(valeur) + " XOF", 0, y + 3);
}

    let largeurBarre = 40;
    let espace = 20;
    

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";

    depenses.forEach((depense, index) => {

        let hauteur = (depense.valeur / max) * 120;

        let x = 30 + index * (largeurBarre + espace);

        // 🔵 barre
        ctx.fillStyle = "green";
        ctx.fillRect(x, baseY - hauteur, largeurBarre, hauteur);

        // 📝 nom
        ctx.fillStyle = "black";
        ctx.fillText(depense.nom, x, baseY + 15);

        // 💰 valeur
        ctx.fillText(depense.valeur, x, baseY - hauteur - 5);
    });

    
}

// 🎯 CALCUL
function calculer() {

    let totalPrevu = 0;
    let totalReel = 0;

    document.querySelectorAll("#budget-body .prevu").forEach((input, index) => {

        let prevu = parseFloat(input.value) || 0;
        let reel = parseFloat(document.querySelectorAll("#budget-body .reel")[index]?.value) || 0;

        let ecart = reel - prevu;

        let ecartCell = document.querySelectorAll("#budget-body .ecart")[index];
        if (ecartCell) {
            ecartCell.textContent = formatXOF(ecart);
        }

        totalPrevu += prevu;
        totalReel += reel;

let alerte = document.getElementById("alerte-budget");

// reset animation
alerte.classList.remove("animate-alert");
void alerte.offsetWidth; // force refresh

if (totalReel > totalPrevu) {
    alerte.textContent = "⚠️ Attention : tu dépasses ton budget !";
    alerte.className = "alert-danger animate-alert";
    playSound("danger");
}
else if (totalReel === totalPrevu) {
    alerte.textContent = "⚠️ Tu es exactement à ton budget.";
    alerte.className = "alert-warning animate-alert";
    playSound("warning");
}
else {
    alerte.textContent = "✅ Bravo : tu gères bien ton budget !";
    alerte.className = "alert-ok animate-alert";
    playSound("success");
}

let conseil = "";

if (totalReel > totalPrevu) {
    conseil = "(💡 Réduis certaines dépenses non essentielles.)";
}
else if (totalReel === totalPrevu) {
    conseil = "(💡 Tu es à la limite, fais attention aux prochaines dépenses.)";
}
else {
    conseil = "(💡 Continue comme ça et pense à épargner.)";
}

alerte.textContent += " " + conseil;

    });


    // 🔥 SOLDE
    document.getElementById("solde-final").textContent = formatXOF(totalReel - totalPrevu);

    // 🔥 GRAPH
   dessinerGraphique();
function dessinerGraphique() {

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let lignes = document.querySelectorAll("#budget-body tr");

    let depenses = [];

    lignes.forEach(ligne => {

        let nom = ligne.querySelector("input[type='text']");
        let reel = ligne.querySelector(".reel");

        if (nom && reel) {
            let valeur = parseFloat(reel.value) || 0;

            if (valeur > 0) {
                depenses.push({
                    nom: nom.value || "Dépense",
                    valeur: valeur
                });
            }
        }
    });

    if (depenses.length === 0) return;

    let max = Math.max(...depenses.map(d => d.valeur));

    let largeurBarre = 40;
    let espace = 20;
    let baseY = 180;

    let progress = 0;

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        progress += 0.02;

        if (progress > 1) progress = 1;

        ctx.font = "12px Arial";

        depenses.forEach((depense, index) => {

            let hauteurFinale = (depense.valeur / max) * 120;

            let hauteur = hauteurFinale * progress;

            let x = 30 + index * (largeurBarre + espace);

            // 🎨 couleur différente
            ctx.fillStyle = `hsl(${index * 60}, 70%, 50%)`;

            drawRoundedRect(ctx, x, baseY - hauteur, largeurBarre, hauteur, 8);

            // 📝 texte
            ctx.fillStyle = "black";
            ctx.fillText(depense.nom, x, baseY + 15);
            ctx.fillText(Math.floor(depense.valeur * progress) + " XOF", x, baseY - hauteur - 5);
        });

        // 📏 axe
        ctx.beginPath();
        ctx.moveTo(20, baseY);
        ctx.lineTo(canvas.width - 20, baseY);
        ctx.stroke();

let legendY = baseY + 40;

depenses.forEach((depense, index) => {

    let x = 30 + index * 120;

    ctx.fillStyle = `hsl(${index * 60}, 70%, 60%)`;
    ctx.fillRect(x, legendY, 15, 15);

    ctx.fillStyle = "black";
    ctx.fillText(depense.nom, x + 20, legendY + 12);
});

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}


    sauvegarder();
}

// 🎯 SAUVEGARDE
function sauvegarder() {

    let donnees = [];

    document.querySelectorAll("#budget-body tr").forEach(ligne => {

        let nom = ligne.querySelector("input[type='text']");
        let prevu = ligne.querySelector(".prevu");
        let reel = ligne.querySelector(".reel");

        if (nom && prevu && reel) {
            donnees.push({
                nom: nom.value,
                prevu: prevu.value,
                reel: reel.value
            });
        }
    });

    localStorage.setItem("budget", JSON.stringify(donnees));
}

// 🎯 CHARGEMENT
function charger() {

    let donnees = JSON.parse(localStorage.getItem("budget")) || [];

    let tbody = document.getElementById("budget-body");

    donnees.forEach(item => {

        let ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td>
                <input type="text" value="${item.nom}">
                <button class="supprimer">❌</button>
            </td>
            <td><input type="number" class="prevu" value="${item.prevu}"></td>
            <td><input type="number" class="reel" value="${item.reel}"></td>
            <td class="ecart">0</td>
        `;

        tbody.appendChild(ligne);

        ligne.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculer);
        });

        ligne.querySelector(".supprimer").addEventListener("click", function () {
            ligne.remove();
            calculer();
        });
    });

    calculer();
}

// ➕ AJOUT DÉPENSE
document.getElementById("ajouter-depense").addEventListener("click", function () {

    let tbody = document.getElementById("budget-body");

    let ligne = document.createElement("tr");

    ligne.classList.add("nouvelle-ligne"); // 👈 animation

    ligne.innerHTML = `
        <td>
            <input type="text" placeholder="Dépense">
            <button class="supprimer">❌</button>
        </td>
        <td><input type="number" class="prevu" value="0"></td>
        <td><input type="number" class="reel" value="0"></td>
        <td class="ecart">0 XOF</td>
    `;

    let solde = document.getElementById("solde-final").closest("tr");
    tbody.insertBefore(ligne, solde);

    // 🔥 animation déclenchée après insertion
    setTimeout(() => {
        ligne.classList.add("visible");
    }, 10);

    ligne.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", calculer);
    });

    ligne.querySelector(".supprimer").addEventListener("click", function () {

        // animation suppression
        ligne.style.transition = "all 0.3s ease";
        ligne.style.opacity = "0";
        ligne.style.transform = "translateX(50px)";

        setTimeout(() => {
            ligne.remove();
            calculer();
        }, 300);
    });

    calculer();
});

// 👇 INIT
charger();

// 🎯 PREMIER DESSIN
dessinerGraphique(0, 0);

function ajouterBarre(montant) {
    const graphique = document.getElementById("graphique");

    const barre = document.createElement("div");
    barre.classList.add("barre");

    // hauteur = montant (à adapter si trop grand)
    barre.style.height = montant + "px";

    // couleur aléatoire 🎨
    barre.style.backgroundColor = getRandomColor();

    graphique.appendChild(barre);
}

function getRandomColor() {
    const couleurs = ["red", "blue", "green", "orange", "purple", "yellow"];
    return couleurs[Math.floor(Math.random() * couleurs.length)];
}


function creerAxe(max) {
    const axe = document.getElementById("axe");
    axe.innerHTML = "";

    const steps = 5;

    for (let i = steps; i >= 0; i--) {
        const valeur = Math.round((max / steps) * i);

        const label = document.createElement("div");
        label.textContent = valeur + " CFA";

        axe.appendChild(label);
    }
}

// TEST direct au chargement



function playSound(type) {
    let audio;

    if (type === "danger") {
        audio = new Audio("https://www.soundjay.com/buttons/beep-10.mp3");
    } else if (type === "warning") {
        audio = new Audio("https://www.soundjay.com/buttons/beep-07.mp3");
    } else {
        audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
    }

    audio.play();
}

let currency = "XOF";

const currencySelect = document.getElementById("currency");

if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
        currency = e.target.value;
        calculer();
    });
}

window.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btn-aide");
    const banniere = document.getElementById("banniere-aide");
    const close = document.getElementById("close-aide");

    btn.addEventListener("click", () => {
        banniere.style.display = "flex";
        setTimeout(() => {
            banniere.classList.add("active");
        }, 10);
    });

    function fermer() {
        banniere.classList.remove("active");
        setTimeout(() => {
            banniere.style.display = "none";
        }, 300);
    }

    close.addEventListener("click", fermer);

    banniere.addEventListener("click", (e) => {
        if (e.target === banniere) {
            fermer();
        }
    });

});

const auth = document.getElementById("auth");
const msg = document.getElementById("auth-msg");

