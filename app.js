import {
    db,
    doc,
    getDoc,
    setDoc
} from "./firebase.js";


console.log("Southern Operations Portal Loaded");

// Load saved schedule
window.onload = function(){

    const savedTable =
    localStorage.getItem("scheduleTable");

    if(savedTable){

        document.getElementById("scheduleBody").innerHTML =
        savedTable;

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

    try{

        saveStatus.textContent =
        "Status: Saving...";

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
