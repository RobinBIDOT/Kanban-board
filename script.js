/**
 * Initialise Dragula pour permettre le glisser-déposer des tâches entre les colonnes.
 * Les tâches peuvent être déplacées entre 'to-do', 'doing', 'done' et 'trash'.
 */
dragula([
  document.getElementById("to-do"),
  document.getElementById("doing"),
  document.getElementById("done"),
  document.getElementById("trash"),
])
  .removeOnSpill(false)
  .on("drag", function (el) {
    el.classList.remove("ex-moved");
  })
  .on("drop", function (el) {
    el.classList.add("ex-moved");
  })
  .on("over", function (el, container) {
    container.classList.add("ex-over");
  })
  .on("out", function (el, container) {
    container.classList.remove("ex-over");
  });

function getBadgeClass(value) {
  switch (value) {
    case "Très élevée":
      return "badge-danger"; // Rouge
    case "Élevée":
      return "badge-warning"; // Orange
    case "Moyenne":
      return "badge-secondary"; // Gris
    case "Basse":
      return "badge-primary"; // Bleu foncé
    case "Très basse":
      return "badge-info"; // Bleu clair
    default:
      return "badge-light"; // Par défaut, si aucune correspondance
  }
}

/**
 * Ajoute une nouvelle tâche à la colonne 'To Do' avec une description structurée.
 */
function addTask() {
  // Collecte des informations du formulaire
  var taskTitle = document.getElementById("taskTitle").value;
  var taskRole = document.getElementById("taskRole").value;
  var taskObjective = document.getElementById("taskObjective").value;
  var taskPurpose = document.getElementById("taskPurpose").value;
  var taskValue = document.getElementById("taskValue").value;
  var taskDifficulty = document.getElementById("taskDifficulty").value;
  var taskValueClass = getBadgeClass(
    document.getElementById("taskValue").value
  );
  var taskDifficultyClass = getBadgeClass(
    document.getElementById("taskDifficulty").value
  );
  var taskDoD = document.getElementById("taskDoD").value;
  var taskAssignee = Array.from(
    document.getElementById("taskAssignee").selectedOptions
  )
    .map((option) => option.text)
    .join(", ");
  var today = new Date().toLocaleDateString("fr-FR");

  // Création de la tâche si le titre est fourni
  if (taskTitle.trim() !== "") {
    var taskHtml = `
        <li class="list-group-item task">
        <h5 class="mb-2">${taskTitle}</h5>
        <p class="mb-1"><strong>En tant que:</strong> ${taskRole}</p>
        <p class="mb-1"><strong>Je veux que:</strong> ${taskObjective}</p>
        <p class="mb-1"><strong>Afin de:</strong> ${taskPurpose}</p>
        <p class="mb-1"><strong>Valeur:</strong> <span class="badge ${taskValueClass}">${taskValue}</span></p>
        <p class="mb-1"><strong>Difficulté:</strong> <span class="badge ${taskDifficultyClass}">${taskDifficulty}</span></p>
        <p class="mb-1"><strong>DoD:</strong> ${taskDoD}</p>
        <small class="d-block mb-2">Créé le: ${today}</small>
        <div class="badge-container">
            ${taskAssignee
              .split(", ")
              .map(
                (assignee) =>
                  `<span class="badge badge-info mr-1">${assignee}</span>`
              )
              .join("")}
        </div>
    </li>
        `;
    document.getElementById("to-do").innerHTML += taskHtml;
    $("#taskModal").modal("hide");
  }
}

/**
 * Vide toutes les tâches de la colonne 'Trash' et sauvegarde l'état.
 */
function emptyTrash() {
  document.getElementById("trash").innerHTML = "";
}

/**
 * Gère l'affichage du formulaire d'ajout de tâche.
 */
document.getElementById("toggleForm").addEventListener("click", function () {
  var form = document.querySelector(".add-task-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
});
