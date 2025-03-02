let users_by_id=[];
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

async function GetUsers()
{
    let url="/U/";
    let response=await fetch(url);
    let reply=await response.json();
    users_by_id = reply.users_by_id;
    all_users= reply.data;
    console.log("users=> ",all_users);
}
async function ShowTableAllUsers() {
    document.getElementById("usersTable").style.display="block";
    await GetUsers();
    let select_year = document.getElementById("yearSelect");
    let selectedYear = select_year.value;
    let select_month = document.getElementById("monthSelect");
    let selectedMonth = select_month.value;
    let url = "/ALL-U/";

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                month: selectedMonth,
               year: selectedYear
            })
        });
        if (!response.ok) throw new Error("req problem");
        let data = await response.json();
        let rows = data.all_users_data;
        let insertedUserId = [];
        console.log(rows)
        let s = "";
        console.log(all_users);
        if (rows.length > 0) {
            // אתחול המערך ושיוך נתונים לכל משתמש
            for (let idx = 0; idx < all_users.length; idx++) {
                insertedUserId[idx] = [];
                insertedUserId[idx][1] = all_users[idx].name;
                insertedUserId[idx][2] = {}; // אובייקט ריק כברירת מחדל

                for (let j = 0; j < rows.length; j++) {
                    if (all_users[idx].id == rows[j].id_user) {
                        insertedUserId[idx][2] = rows[j]; // משייך את הנתונים למשתמש
                        break; // ברגע שמצאנו התאמה, אפשר לצאת מהלולאה
                    }
                }
            }

            console.log(insertedUserId);

            // יצירת שורות הטבלה **רק לאחר שהמערך מלא**
            let s = "";
            for (let j = 0; j < insertedUserId.length; j++) {
                s += `<tr>`;
                s += `<td>${insertedUserId[j][1]}</td>`; // שם המשתמש
                s += `<td>${insertedUserId[j][2].high_val ?? 0}</td>`; // לחץ דם גבוה
                s += `<td>${insertedUserId[j][2].cnt_high ?? 0}</td>`; // מספר חריגות בלחץ דם גבוה
                s += `<td>${insertedUserId[j][2].low_val ?? 0}</td>`; // לחץ דם נמוך
                s += `<td>${insertedUserId[j][2].cnt_low ?? 0}</td>`; // מספר חריגות בלחץ דם נמוך
                s += `<td>${insertedUserId[j][2].pulse ?? 0}</td>`; // דופק
                s += `<td>${insertedUserId[j][2].cnt_pulse ?? 0}</td>`; // מספר חריגות בדופק
                s += "</tr>";
            }

            // הוספת השורות לטבלה לאחר שהן נוצרו במלואן
            document.getElementById("usersBody").innerHTML = s;
        }
    }
    catch(error)
        {
        {
            console.error("שגיאה:", error);
        }
    }

}