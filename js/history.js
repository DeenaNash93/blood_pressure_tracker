async function MainPage() {
    let url = "/";
    let response = await fetch(url);

    if (response.ok) {
        window.location.href = url;
    } else {
        console.error("ERROR LOADING PAGE");
    }
}

function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param);
}


let selectedValue = getQueryParam("selected");

if (selectedValue) {
    console.log("הערך שנבחר:", selectedValue);

    localStorage.setItem("selectedUser", selectedValue);

}

async function GetUser()
{
    let url="/U/";
    let response=await fetch(url);
    let reply=await response.json();
    users_by_id = reply.users_by_id;
    console.log("users_by_id=> ",users_by_id);
    document.getElementById("user_name").innerHTML=` היסטוריית משתמש של  ${users_by_id[selectedValue]} - בחר תאריכים:  `;
}
async function ShowTableValues() {

    let user_id=localStorage.getItem("selectedUser");
    console.log(user_id,  selectedValue);
    document.getElementById("historyTable").style.display="block";
    let min_date=(document.getElementById("first_date").value===undefined)?"":document.getElementById("first_date").value;
    let max_date=(document.getElementById("last_date").value===undefined)?"":document.getElementById("last_date").value;
    let url = "/H-VAL/";

    try {
        let response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user_id,
                min_date: min_date,
                max_date:max_date
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
        document.getElementById("mainTableDataHistory").innerHTML=s;
    } catch (error) {
        console.error("שגיאה:", error);
    }

}


