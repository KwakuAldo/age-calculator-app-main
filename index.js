document.querySelector(".btn").addEventListener("click", function () {
    //This changes the color of the button on click
    this.classList.remove("bg-purple1");
    this.classList.add("bg-off-black");

    //input elements
    const dayInput = document.querySelector("#day");
    const monthInput = document.querySelector("#month");
    const yearInput = document.querySelector("#year");


    // Get the values from the input fields
    let  currentDay = parseInt(dayInput.value);
    let  currentMonth = parseInt(monthInput.value) - 1;
    let  currentYear = parseInt(yearInput.value);

    // error message elements
    const dayError = document.getElementById("day-error");
    const monthError = document.getElementById("month-error");
    const yearError = document.getElementById("error-year");

    // label text and input border color change on error
    function applyErrorStyle(id) {
        const label = document.querySelector(`label[for="${id}"]`);
        const input = document.querySelector(`#${id}`);

        if (label) {
            label.classList.remove("text-smokey-grey");
            label.classList.add("text-light-red");
        }

        if (input) {
            input.classList.remove("border-light-gray");
            input.classList.add("border-light-red");
        }
    }

    // reset label text and input border color to default on success
    function resetStyle(id) {
        const label = document.querySelector(`label[for="${id}"]`);
        const input = document.querySelector(`#${id}`);

        if (label) {
            label.classList.remove("text-light-red");
            label.classList.add("text-smokey-grey");
        }

        if (input) {
            input.classList.remove("border-light-red");
            input.classList.add("border-light-gray");
        }
    }

    // CLear previous error messages
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    // Validate the input values
    let hasError = false;

    // check if the input fields are empty
    if (!dayInput.value.trim()) {
        dayError.textContent = "This field is required";
        applyErrorStyle("day");
        hasError = true;
    }

    if (!monthInput.value.trim()) {
        monthError.textContent = "This field is required";
        applyErrorStyle("month");
        hasError = true;
    }
    if (!yearInput.value.trim()) {
        yearError.textContent = "This field is required";
        applyErrorStyle("year");
        hasError = true;
    }

    if (hasError)
        return;

    // check range of the input values
    if (!hasError) {
        if (currentDay < 1 || currentDay > 31) {
            dayError.textContent = "Must be a valid day";
            applyErrorStyle("day");
            hasError = true;
        }
        if (currentMonth < 0 || currentMonth > 11) {
            monthError.textContent = "Must be a valid month";
            applyErrorStyle("month");
            hasError = true;
        }
        if (currentYear < 1500 || currentYear > new Date().getFullYear()) {
            yearError.textContent = "Must be a valid year";
            applyErrorStyle("year");
        }
    }

    // invalid input for month
    let birthDate = new Date(currentYear, currentMonth, currentDay);
    if (
        birthDate.getFullYear() !== currentYear ||
        birthDate.getMonth() !== currentMonth ||
        birthDate.getDate() !== currentDay
    ) {
        monthError.textContent = "Invalid month";
        applyErrorStyle("month");
        hasError = true;
    }

    if (birthDate > new Date()) {
        yearError.textContent = "Must be in the past";
        applyErrorStyle("year");
        hasError = true;
    }

    if (hasError)
        return;
    
    const today = new Date();

    // Calculate age
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

    // Loop through the result elements and update their text content
    result.forEach((element, index) => {
        element.textContent = values[index];
    });
    // Reset the button color
    this.classList.remove("bg-off-black");
    this.classList.add("bg-purple1");
    // Reset the input fields
    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    // Reset the label text and input border color
    ["day", "month", "year"].forEach(resetStyle);
    });

// This code is to check if the enter key is pressed
// and trigger the button click event
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.querySelector(".btn").click();
    }
})