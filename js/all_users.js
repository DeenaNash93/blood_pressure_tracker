let all_users=[];
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
async function GetUsers()
{
    let url="/U/";
    let response=await fetch(url);
    let reply=await response.json();
    all_users = reply.users_data;
    console.log("users=> ",all_users);
}
/*async function ShowTableAllUsers() {
    await GetUsers();
    let select_year = document.getElementById("yearSelect");
    let selectedYear = select_year.value;
    let select_month = document.getElementById("monthSelect");
    let selectedMonth = select_month.value;
    let url = "/ALL-U/";

    try {
        let response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                month: selectedMonth,
                year: selectedYear,
                user_id:
            })
        });
        if (!response.ok) throw new Error("req problem");
        let data = await response.json();
        let rows=data.data;
        let is_bold=data.is_bold;
        console.log(rows)
        let s="";
        if((rows!==undefined)&&(is_bold!==undefined))
        {
            for(let idx in rows)
            {
                s += `<tr>`;
                s += (is_bold[idx][0])? `<td><b>${rows[idx].high_val}</td></b>` :`<td>${rows[idx].high_val}</td>`;
                s += (is_bold[idx][1])?`    <td><b>${rows[idx].low_val}</b></td>`:`<td>${rows[idx].low_val}</td>`;
                s += (is_bold[idx][2])?`    <td><b>${rows[idx].pulse}</b></td>`:`<td>${rows[idx].pulse}</td>`;
                s+=`<td>${rows[idx].date}</td>`
                s += "</tr>";
            }
        }
        document.getElementById("mainTableData").innerHTML=s;
    } catch (error) {
        console.error("שגיאה:", error);
    }

    console.log(selectedValue);
    let s = "";
    console.log(all_values);
    for(let row of all_values)
    {

        if(parseInt(selectedValue)===row.id_user)
        {

            s += `<tr id="${row.id}">`;
            s += `    <td><input type="checkbox" class="option" value="${row.id}" ></td>`;
            s += `    <td>${row.high_val}</td>`;
            s += `    <td>${row.low_val}</td>`;
            s += `    <td>${row.pulse}</td>`;
            s += `    <td>${row.date}</td>`;
            s += "</tr>";
        }


    }
    document.getElementById("mainTableData").innerHTML = s;
}
}*/