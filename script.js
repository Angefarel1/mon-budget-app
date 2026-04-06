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

            ctx.fillStyle = `hsl(${index * 60}, 70%, 50%)`;

            drawRoundedRect(ctx, x, baseY - hauteur, largeurBarre, hauteur, 8);

            ctx.fillStyle = "black";
            ctx.fillText(depense.nom, x, baseY + 15);
            ctx.fillText(Math.floor(depense.valeur * progress) + " XOF", x, baseY - hauteur - 5);
        });

        ctx.beginPath();
        ctx.moveTo(20, baseY);
        ctx.lineTo(canvas.width - 20, baseY);
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// 🎯 CALCUL
function calculer() {

    let totalPrevu = 0;
    let totalReel = 0;

    document.querySelectorAll("#budget-body tr").forEach(ligne => {

        let prevuInput = ligne.querySelector(".prevu");
        let reelInput = ligne.querySelector(".reel");
        let ecartCell = ligne.querySelector(".ecart");

        if (!prevuInput || !reelInput || !ecartCell) return;

        let prevu = parseFloat(prevuInput.value) || 0;
        let reel = parseFloat(reelInput.value) || 0;

        let ecart = reel - prevu;

        ecartCell.textContent = formatXOF(ecart);

        totalPrevu += prevu;
        totalReel += reel;
    });

    document.getElementById("solde-final").textContent = formatXOF(totalReel - totalPrevu);

    mettreAJourDashboard();
    dessinerGraphique();
    sauvegarder();
}

// 🔥 DASHBOARD
function mettreAJourDashboard() {

    let totalPrevu = 0;
    let totalReel = 0;

    document.querySelectorAll("#budget-body tr").forEach(ligne => {

    let prevuInput = ligne.querySelector(".prevu");
    let reelInput = ligne.querySelector(".reel");

    if (!prevuInput || !reelInput) return;

    let prevu = parseFloat(prevuInput.value) || 0;
    let reel = parseFloat(reelInput.value) || 0;

    totalPrevu += prevu;
    totalReel += reel;
});

    let ecart = totalPrevu - totalReel;

    let elPrevu = document.getElementById("totalPrevu");
    let elReel = document.getElementById("totalDepense");
    let elEcart = document.getElementById("ecart");

   if (elPrevu) animerChiffre(elPrevu, totalPrevu);
if (elReel) animerChiffre(elReel, totalReel);
if (elEcart) animerChiffre(elEcart, ecart);
}

// 🎯 OBJECTIF
let objectif = 0;

function definirObjectif() {
    objectif = parseFloat(document.getElementById("objectifInput").value) || 0;

    let el = document.getElementById("objectif");
    if (el) {
        el.innerText = objectif + " FCFA";
    }
}

// 🎯 SAUVEGARDE
function sauvegarder() {

    let mois = document.getElementById("mois").value;

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

    // 💡 clé différente par mois
    localStorage.setItem("budget_" + mois, JSON.stringify(donnees));
}

// 🎯 CHARGEMENT
function charger() {

    let mois = document.getElementById("mois").value;

    let donnees = JSON.parse(localStorage.getItem("budget_" + mois)) || [];

    let tbody = document.getElementById("budget-body");

    // ❗ vider le tableau (sauf structure)
    let lignes = tbody.querySelectorAll("tr:not(.section):not(.subsection):not(.total)");
    lignes.forEach(l => l.remove());

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
// ➕ AJOUT
document.getElementById("ajouter-depense").addEventListener("click", function () {

    let tbody = document.getElementById("budget-body");

    let ligne = document.createElement("tr");

    ligne.classList.add("ligne-animation"); // 👈 animation

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

    // 👇 activation de l’animation (petit délai)
    setTimeout(() => {
        ligne.classList.add("visible");
    }, 10);

    ligne.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", calculer);
    });

    ligne.querySelector(".supprimer").addEventListener("click", function () {
        ligne.remove();
        calculer();
    });

    calculer();
});


// ⭐ AJOUT BOUTON AIDE (INTÉGRÉ)
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btn-aide");
    const banniere = document.getElementById("banniere-aide");
    const close = document.getElementById("close-aide");

    if (!btn || !banniere || !close) {
        console.log("Erreur : élément aide introuvable");
        return;
    }

    btn.onclick = () => {
        banniere.style.display = "flex";
    };

    close.onclick = (e) => {
        e.stopPropagation();
        banniere.style.display = "none";
    };

    banniere.onclick = (e) => {
        if (e.target === banniere) {
            banniere.style.display = "none";
        }
    };

});


// 👇 INIT
charger();
dessinerGraphique();


function animerChiffre(element, valeurFinale) {

    let debut = 0;
    let duree = 600; // durée en ms
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        let valeurActuelle = Math.min(
            Math.floor((progress / duree) * valeurFinale),
            valeurFinale
        );

        element.innerText = valeurActuelle + " FCFA";

        if (progress < duree) {
            requestAnimationFrame(step);
        } else {
            element.innerText = valeurFinale + " FCFA";
        }
    }

    requestAnimationFrame(step);
}
document.getElementById("mois").addEventListener("change", function () {

    let tableau = document.getElementById("budget");

    // animation sortie
    tableau.classList.add("fade-out");

    setTimeout(() => {
        charger(); // recharge les données

        tableau.classList.remove("fade-out");
        tableau.classList.add("fade-in");

        setTimeout(() => {
            tableau.classList.remove("fade-in");
        }, 300);

    }, 300);
});
const selectMois = document.getElementById("mois");

if (selectMois) {
    selectMois.addEventListener("change", function () {
        charger();
    });
}

