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