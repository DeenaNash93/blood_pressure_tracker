
function showMonths()
{
    let selectElement=document.getElementById("monthSelect");
    if (selectElement.options.length === 1)
    {
        for (let i = 2; i <= 12; i++)
        {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            selectElement.appendChild(option);
        }
    }
}

function showYears()
{
    let selectElement=document.getElementById("yearSelect");
    if (selectElement.options.length === 1)
    {
        let currentYear = new Date().getFullYear();
        for (let year = 1994; year <= currentYear; year++)
        {
            let option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            selectElement.appendChild(option);
        }
    }
}

function ShowTable()
{
    document.getElementById("usersTable").style.display="block";
}