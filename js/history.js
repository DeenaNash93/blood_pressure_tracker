async function MainPage() {
    let url = "/";
    let response = await fetch(url);

    if (response.ok) {
        window.location.href = url;
    } else {
        console.error("ERROR LOADING PAGE");
    }
}
// פונקציה לשליפת פרמטר מה-URL
function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// שליפת הערך שנשלח מהדף הקודם
let selectedValue = getQueryParam("selected");

if (selectedValue) {
    console.log("הערך שנבחר:", selectedValue);

    localStorage.setItem("selectedUser", selectedValue);

}


async function ShowTableValues() {

    let user_id=localStorage.getItem("selectedUser");
    console.log(user_id,  selectedValue);
    document.getElementById("historyTable").style.display="block";
    let min_date=(document.getElementById("first_date").value===undefined)?"00-00-0000":document.getElementById("first_date").value;
    let max_date=(document.getElementById("last_date").value===undefined)?"00-00-0000":document.getElementById("last_date").value;
    let url = "/H-VAL/";

    try {
        let response = await fetch(url,{
            method: "POST", // POST לשליחת נתונים בגוף הבקשה
            headers: {
                "Content-Type": "application/json" // הגדרת תוכן JSON
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
                s += `    <td>${rows[idx].high_val}</td>`;
                s += `    <td>${rows[idx].low_val}</td>`;
                s += `    <td>${rows[idx].pulse}</td>`;
                s += "</tr>";
            }
        }
        document.getElementById("mainTableData").innerHTML=s;
    } catch (error) {
        console.error("שגיאה:", error);
    }
}


