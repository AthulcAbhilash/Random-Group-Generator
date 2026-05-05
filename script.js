const nameInput = document.getElementById("nameInput");
const groupCountInput = document.getElementById("groupCount");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("groupOutput");
const actions = document.getElementById("actions");
const shuffleBtn = document.getElementById("shuffleBtn");
const copyBtn = document.getElementById("copyBtn");
const totalCount = document.getElementById("totalCount");
const fileInput = document.getElementById("fileInput");

let lastNames = [];

// COUNT
nameInput.addEventListener("input", () => {
    const count = nameInput.value
        .split(/[\n,]+/)
        .map(n => n.trim())
        .filter(n => n !== "").length;

    totalCount.textContent = count;
});

// FILE UPLOAD
fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        nameInput.value = e.target.result;
        nameInput.dispatchEvent(new Event("input"));
    };

    reader.readAsText(file);
});

// SHUFFLE
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// GENERATE
function generateGroups() {
    let names = nameInput.value
        .split(/[\n,]+/)
        .map(n => n.trim())
        .filter(n => n !== "");

    if (names.length === 0) {
        alert("Enter names first!");
        return;
    }

    const groupCount = Number(groupCountInput.value);

    shuffle(names);
    lastNames = [...names];

    let groups = Array.from({ length: groupCount }, () => []);

    names.forEach((name, index) => {
        groups[index % groupCount].push(name);
    });

    render(groups);
    actions.classList.remove("hidden");
}

// RENDER
function render(groups) {
    output.innerHTML = "";

    groups.forEach((group, i) => {
        const div = document.createElement("div");
        div.className = "group-card";

        div.innerHTML = `
            <div class="group-title">Group ${i + 1}</div>
            ${group.map(n => `<div>${n}</div>`).join("")}
        `;

        output.appendChild(div);
    });
}

// REGENERATE
function regenerate() {
    if (!lastNames.length) return;

    shuffle(lastNames);

    const groupCount = Number(groupCountInput.value);
    let groups = Array.from({ length: groupCount }, () => []);

    lastNames.forEach((name, index) => {
        groups[index % groupCount].push(name);
    });

    render(groups);
}

// COPY
function copyGroups() {
    let text = "";

    document.querySelectorAll(".group-card").forEach(card => {
        text += card.innerText + "\n\n";
    });

    navigator.clipboard.writeText(text);
    alert("Copied!");
}

// EVENTS
generateBtn.onclick = generateGroups;
shuffleBtn.onclick = regenerate;
copyBtn.onclick = copyGroups;