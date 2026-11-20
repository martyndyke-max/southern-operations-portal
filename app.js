import {
    db,
    doc,
    getDoc,
    setDoc
} from "./firebase.js";

console.log("getDoc =", getDoc);
console.log("setDoc =", setDoc);

console.log("Southern Operations Portal Loaded");

const saveBtn =
document.getElementById("saveBtn");

const clearAssignments =
document.getElementById("clearAssignments");

const saveStatus =
document.getElementById("saveStatus");

const lastUpdatedTime =
document.getElementById("lastUpdatedTime");

const lastUpdated =
document.getElementById("lastUpdated");

const rosterBackground =
document.getElementById("rosterBackground");

const overlaySelector =
document.getElementById("overlaySelector");

const moveLeft =
document.getElementById("moveLeft");

const moveRight =
document.getElementById("moveRight");

const moveUp =
document.getElementById("moveUp");

const moveDown =
document.getElementById("moveDown");

const resetOverlay =
document.getElementById("resetOverlay");

let overlayX = 50;
let overlayY = 50;


const toggleBackground =
document.getElementById("toggleBackground");

const toggleRows =
document.getElementById("toggleRows");

const toggleControls =
document.getElementById("toggleControls");

let rowsHidden = false;

window.onload = async function(){

    try{
        
console.log("Loading roster from Firebase...");
        
        const rosterDoc =
        await getDoc(
            doc(db,"Schedule","roster")
        );

if(rosterDoc.exists()){

    console.log(rosterDoc.data());

    document.getElementById(
        "scheduleBody"
    ).innerHTML =
    rosterDoc.data().tableData;

if(rosterDoc.data().overlay){

    overlaySelector.value =
    rosterDoc.data().overlay;

    rosterBackground.style.backgroundImage =
    `url("images/${rosterDoc.data().overlay}")`;

    rosterBackground.style.display =
    "block";

    backgroundVisible = true;

    toggleBackground.textContent =
    "Hide Background";

}

    lastUpdated.textContent =
    "Last Updated By: " +
    (rosterDoc.data().updatedBy || "System");

    lastUpdatedTime.textContent =
    "Last Updated: " +
    (rosterDoc.data().updated || "Never");

}

    }

    catch(error){

        console.error(error);

    }

    enableEditing();

};

// Enable editing and saving
function enableEditing(){

    const cells =
    document.querySelectorAll(
        '#scheduleBody td[contenteditable="true"]'
    );

    cells.forEach(cell => {

        cell.addEventListener("input", saveTable);

    });

}

// Save table
function saveTable(){

    localStorage.setItem(
        "scheduleTable",
        document.getElementById("scheduleBody").innerHTML
    );

}


saveBtn.addEventListener("click", async () => {

    console.log("Save button clicked");

    try{

        saveStatus.textContent =
        "Status: Saving...";

        console.log("Writing to Firestore...");
        
await setDoc(
    doc(db,"Schedule","roster"),
    {
        tableData:
        document.getElementById(
            "scheduleBody"
        ).innerHTML,

        updated:
        new Date().toLocaleString(),

        updatedBy:
        localStorage.getItem("managerName")
        || "Unknown",

        overlay:
        overlaySelector.value
    }
);
        console.log("Firestore write complete");

        saveStatus.textContent =
        "Status: Saved";

        lastUpdatedTime.textContent =
        "Last Updated: " +
        new Date().toLocaleString();

        lastUpdated.textContent =
"Last Updated By: " +
(localStorage.getItem("managerName")
|| "Unknown");

    }

    catch(error){

        console.error(error);

        saveStatus.textContent =
        "Status: Save Failed";

    }

});

let selectedRow = null;

document.addEventListener("click", (e) => {

    if(
        !e.target.closest("tr") &&
        !e.target.closest("#colourPalettePopup")
    ){

        document.querySelectorAll("#scheduleBody tr")
            .forEach(r => r.classList.remove("selected-row"));

        selectedRow = null;

        colourPalettePopup.style.display =
        "none";

        return;

    }

    const row = e.target.closest("tr");

    if(!row) return;

    if(row.parentElement.tagName === "THEAD") return;

    document.querySelectorAll("#scheduleBody tr")
        .forEach(r => r.classList.remove("selected-row"));

    row.classList.add("selected-row");

    selectedRow = row;

    colourPalettePopup.style.display =
    "block";

});

const colourPalettePopup =
document.getElementById("colourPalettePopup");

document.querySelectorAll(".colourCircle")
.forEach(circle => {

    circle.addEventListener("click", () => {

        if(!selectedRow) return;

        const colour =
        circle.dataset.colour;

        if(colour === "#000000"){
            selectedRow.style.backgroundColor =
            "rgba(0,0,0,0.15)";
        }

        else if(colour === "#555555"){
            selectedRow.style.backgroundColor =
            "rgba(85,85,85,0.15)";
        }

        else if(colour === "#999999"){
            selectedRow.style.backgroundColor =
            "rgba(153,153,153,0.15)";
        }

        else if(colour === "#CCCCCC"){
            selectedRow.style.backgroundColor =
            "rgba(204,204,204,0.15)";
        }

        else if(colour === "#B8DE7C"){
            selectedRow.style.backgroundColor =
            "rgba(184,222,124,0.15)";
        }

        else if(colour === "#006B3F"){
            selectedRow.style.backgroundColor =
            "rgba(0,107,63,0.15)";
        }

        else if(colour === "#FFD447"){
            selectedRow.style.backgroundColor =
            "rgba(255,212,71,0.15)";
        }

        else if(colour === "#4EA5D9"){
            selectedRow.style.backgroundColor =
            "rgba(78,165,217,0.15)";
        }

        else if(colour === "#D9534F"){
            selectedRow.style.backgroundColor =
            "rgba(217,83,79,0.15)";
        }

        else if(colour === "#A45EE5"){
            selectedRow.style.backgroundColor =
            "rgba(164,94,229,0.15)";
        }

        else if(colour === "#FF944D"){
            selectedRow.style.backgroundColor =
            "rgba(255,148,77,0.15)";
        }

        else if(colour === "#194f38"){
            selectedRow.style.backgroundColor =
            "rgba(25, 79, 56, 0.15)";
        }

    });

});

const customColourButton =
document.querySelector(".customColour");

const customColourPicker =
document.getElementById("customColourPicker");

customColourButton.addEventListener("click", () => {

    customColourPicker.click();

});

customColourPicker.addEventListener("input", () => {

    if(!selectedRow) return;

    const hex =
    customColourPicker.value;

    const r =
    parseInt(hex.substring(1,3),16);

    const g =
    parseInt(hex.substring(3,5),16);

    const b =
    parseInt(hex.substring(5,7),16);

    selectedRow.style.backgroundColor =
    `rgba(${r},${g},${b},0.15)`;

});

const closePalette =
document.getElementById("closePalette");

closePalette.addEventListener("click", () => {

    colourPalettePopup.style.display =
    "none";

});

let backgroundVisible = false;

toggleBackground.addEventListener("click", () => {

    backgroundVisible = !backgroundVisible;

    if(backgroundVisible){

        rosterBackground.style.display =
        "block";

        toggleBackground.textContent =
        "Hide Background";

    }

    else{

        rosterBackground.style.display =
        "none";

        toggleBackground.textContent =
        "Show Background";

    }

});

const managerNameInput =
document.getElementById("managerName");

const saveManagerNameBtn =
document.getElementById("saveManagerName");

const savedManager =
localStorage.getItem("managerName");

if(savedManager){

    managerNameInput.value =
    savedManager;

}
saveManagerNameBtn.addEventListener("click", () => {

    localStorage.setItem(

        "managerName",

        managerNameInput.value

    );

saveStatus.textContent =
"Status: Manager Name Saved";
});

overlaySelector.addEventListener("change", () => {

    rosterBackground.style.backgroundImage =
    `url("images/${overlaySelector.value}")`;

});

moveLeft.addEventListener("click", () => {

    overlayX -= 5;

    rosterBackground.style.backgroundPosition =
    `${overlayX}% ${overlayY}%`;

});

moveRight.addEventListener("click", () => {

    overlayX += 5;

    rosterBackground.style.backgroundPosition =
    `${overlayX}% ${overlayY}%`;

});

moveUp.addEventListener("click", () => {

    overlayY -= 5;

    rosterBackground.style.backgroundPosition =
    `${overlayX}% ${overlayY}%`;

});

moveDown.addEventListener("click", () => {

    overlayY += 5;

    rosterBackground.style.backgroundPosition =
    `${overlayX}% ${overlayY}%`;
    

});

resetOverlay.addEventListener("click", () => {

    overlayX = 50;
    overlayY = 50;

    rosterBackground.style.backgroundPosition =
    `${overlayX}% ${overlayY}%`;

});

toggleRows.addEventListener("click", () => {

    const rows =
    document.querySelectorAll("#scheduleBody tr");

    rows.forEach(row => {

        const driverName =
row.cells[0].textContent.trim();

        if(driverName === ""){


            row.style.display =
            rowsHidden ? "" : "none";

        }

    });

    rowsHidden = !rowsHidden;

toggleRows.textContent =
rowsHidden
    ? "Show All Rows"
    : "Hide Unassigned Duties";

});

let controlsHidden = false;

toggleControls.addEventListener("click", () => {

    const toolbar =
    document.querySelector(".toolbar");

    if(controlsHidden){

        toolbar.style.display =
        "flex";

        toggleControls.textContent =
        "⚙ Controls";

    }

    else{

        toolbar.style.display =
        "none";

        toggleControls.textContent =
        "⚙ Show Controls";

    }

    controlsHidden = !controlsHidden;

});

clearAssignments.addEventListener("click", () => {

const rows =
    document.querySelectorAll(
        "#scheduleBody tr"
    );

    rows.forEach(row => {

        row.cells[0].innerHTML = "";

        row.cells[4].innerHTML = "";

        row.cells[5].innerHTML = "";

    });

});

saveStatus.textContent =
"Status: Assignments Cleared";
