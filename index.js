// let currentDay = document.querySelector("#day").innerText;
// let currentMonth = document.querySelector("#month").innerText;
// let currentYear = document.querySelector("#year").innerText;


document.querySelector(".btn").addEventListener("click", function () {
    //This changes the color of the button on click
    this.classList.remove("bg-purple1");
    this.classList.add("bg-off-black");

    let  currentDay = parseInt(document.querySelector("#day").value);
    let  currentMonth = parseInt(document.querySelector("#month").value) - 1;
    let  currentYear = parseInt(document.querySelector("#year").value);


    let birthDate = new Date(currentYear, currentMonth, currentDay);
    let today = new Date();

    if (isNaN(birthDate.getTime())) {
        alert("Please enter a valid date");
        return;
    }
    if (birthDate > today) {
        alert("Please enter a date in the past");
        return;
    }
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust days if negative
    if (ageDays < 0) {
        // Get total days in previous month
        let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += prevMonth.getDate();
        ageMonths--;
    }

    // Adjust months if negative
    if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
    }

    // Display the result
    let values = [ageYears, ageMonths, ageDays];
    let result = document.querySelectorAll(".result");

    result.forEach((item, index) => {
        item.textContent = values[index];
    });
    
    console.log("Age: " + ageYears + " years, " + ageMonths + " months, " + ageDays + " days");

















    // Code to check if we were getting the values from the input fields
    // currentDay = document.querySelector("#day").value;
    // currentMonth = document.querySelector("#month").value;
    // currentYear = document.querySelector("#year").value;
    
    // console.log(currentDay + " " + currentMonth + " " + currentYear);
})