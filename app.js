import {
    db,
    doc,
    getDoc,
    setDoc
} from "./firebase.js";

console.log("getDoc =", getDoc);
console.log("setDoc =", setDoc);

console.log("Southern Operations Portal Loaded");

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

const saveBtn =
document.getElementById("saveBtn");

const saveStatus =
document.getElementById("saveStatus");

const lastUpdatedTime =
document.getElementById("lastUpdatedTime");

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
                new Date().toLocaleString()
            }
        );

        console.log("Firestore write complete");

        saveStatus.textContent =
        "Status: Saved";

        lastUpdatedTime.textContent =
        "Last Updated: " +
        new Date().toLocaleString();

    }

    catch(error){

        console.error(error);

        saveStatus.textContent =
        "Status: Save Failed";

    }

});

let selectedRow = null;

document.addEventListener("click", (e) => {

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


const rosterBackground =
document.getElementById("rosterBackground");

const toggleBackground =
document.getElementById("toggleBackground");

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
