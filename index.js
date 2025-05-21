// let currentDay = document.querySelector("#day").innerText;
// let currentMonth = document.querySelector("#month").innerText;
// let currentYear = document.querySelector("#year").innerText;


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

    // label text color change on error
    function labelColorChangeWithError(inputId, removeClass, addClass) {
        const label = document.querySelector(`label[for="${inputId}"]`);
        if (!label)
            return;

        label.classList.remove(removeClass);
        label.classList.add(addClass);
    }

    // input element color change to alert error
    function inputElementColorChangeWithError(inputId, removeClass, addClass) {
        const input = document.querySelector(`#${inputId}`);
        if (!input)
            return;

        input.classList.remove(removeClass);
        input.classList.add(addClass);
    }

    // CLear previous error messages
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    // Validate the input values
    let hasError = false;

    // check if the input fields are empty
    if (!dayInput.value) {
        dayError.textContent = "This field is required";
        labelColorChangeWithError("day", "text-smokey-grey", "text-light-red");
        inputElementColorChangeWithError("day", "border-smokey-grey", "border-light-red");
        hasError = true;
    }

    if (!monthInput.value) {
        monthError.textContent = "This field is required";
        labelColorChangeWithError("month", "text-smokey-grey", "text-light-red");
        inputElementColorChangeWithError("month", "border-smokey-grey", "border-light-red");
        hasError = true;
    }
    if (!yearInput.value) {
        yearError.textContent = "This field is required";
        labelColorChangeWithError("year", "text-smokey-grey", "text-light-red");
        inputElementColorChangeWithError("year", "border-smokey-grey", "border-light-red");
        hasError = true;
    }

    if (hasError)
        return;

    // check range of the input values
    if (!hasError) {
        if (currentDay < 1 || currentDay > 31) {
            dayError.textContent = "Must be a valid day";
            labelColorChangeWithError("day", "text-smokey-grey", "text-light-red");
            inputElementColorChangeWithError("day", "border-smokey-grey", "border-light-red");
            hasError = true;
        }
        if (currentMonth < 0 || currentMonth > 11) {
            monthError.textContent = "Must be a valid month";
            labelColorChangeWithError("month", "text-smokey-grey", "text-light-red");
            inputElementColorChangeWithError("month", "border-smokey-grey", "border-light-red");
            hasError = true;
        }
        if (currentYear < 1900 || currentYear > new Date().getFullYear()) {
            yearError.textContent = "Must be a valid year";
            labelColorChangeWithError("year", "text-smokey-grey", "text-light-red");
            inputElementColorChangeWithError("year", "border-smokey-grey", "border-light-red");
            hasError = true;
        }
    }

    // invalid input for month
    let birthDate = new Date(currentYear, currentMonth, currentDay);
    if (
        birthDate.getFullYear() !== currentYear ||
        birthDate.getMonth() !== currentMonth ||
        birthDate.getDate() !== currentDay
    ) {
        monthError.textContent = "Invalid date";
        hasError = true;
    }

    if (birthDate > new Date()) {
        yearError.textContent = "Must be in the past";
        labelColorChangeWithError("year", "text-smokey-grey", "text-light-red");
        inputElementColorChangeWithError("year", "border-smokey-grey", "border-light-red");
        hasError = true;
    }

    if (hasError)
        return;
    
    let today = new Date();

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

    result.forEach((item, index) => {
        item.textContent = values[index];

        // change element color to default
        labelColorChangeWithError("day", "text-light-red", "text-smokey-grey");
        inputElementColorChangeWithError("day", "border-light-red", "text-smokey-grey",);

        labelColorChangeWithError("month", "text-light-red", "text-smokey-grey");
        inputElementColorChangeWithError("month", "border-light-red", "text-smokey-grey");

        labelColorChangeWithError("year", "text-light-red", "text-smokey-grey");
        inputElementColorChangeWithError("year", "border-light-red", "text-smokey-grey");
    });
    
    console.log("Age: " + ageYears + " years, " + ageMonths + " months, " + ageDays + " days");

















    // Code to check if we were getting the values from the input fields
    // currentDay = document.querySelector("#day").value;
    // currentMonth = document.querySelector("#month").value;
    // currentYear = document.querySelector("#year").value;
    
    // console.log(currentDay + " " + currentMonth + " " + currentYear);
})