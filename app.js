window.onload = async function(){

    try{

        const rosterDoc =
        await getDoc(
            doc(db,"Schedule","roster")
        );

        if(rosterDoc.exists()){

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
