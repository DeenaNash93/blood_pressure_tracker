var users=[];
var all_values=[];


async function GetUsers(){
    let url="/U/";
    let response=await fetch(url);
    let reply=await response.json();
    users = reply.data;
    console.log("reply=",users);
}

async function CreateUserSelector()
{
   await GetUsers();

    let s = "";

    for(let user of users)
    {
    s += `<option`;
    s += ` value=${user.id}>`
    s += ` ${user.name}`;
    s += `</option>` ;
    }

    document.getElementById("userSelect").innerHTML = s;

}
 function ShowTable()
{
    let table = document.getElementById("userTable");
    // מציג את הטבלה אם זו הפעם הראשונה שמוסיפים נתון
    if (table.style.display === "none")
    {
        table.style.display = "table";
    }
     CreateTableBody();
}
async function CreateTableBody()
{
    await GetValues();
    let select = document.getElementById("userSelect");
    let selectedValue = select.value;
    console.log(selectedValue);
    //let selectedText = select.options[select.selectedIndex].text;
    let s = "";
    console.log(all_values);
    for(let row of all_values)
    {

        if(parseInt(selectedValue)===row.id_user)
        {
            s += "<tr>";
            s += `    <td>${row.high_val}</td>`;
            s += `    <td>${row.low_val}</td>`;
            s += `    <td>${row.pulse}</td>`;
            s += `    <td>${row.date}</td>`;
            s += "</td>";
            s += "</tr>";
        }


    }
    document.getElementById("mainTableData").innerHTML = s;
}

async function GetValues()
{
    let url="/VAL/";
    let response=await fetch(url);
    let reply=await response.json();
    console.log("reply=",reply);
    all_values = reply.data;
    console.log("reply=",all_values);
}



    async function AddValue() {
        let select = document.getElementById("userSelect");
        let user_id = parseInt(select.value);
        let highVal = parseInt(document.getElementById("high_val").value);
        let lowVal = parseInt(document.getElementById("low_val").value);
        let pulse = parseInt(document.getElementById("pulse").value);
        let dateInput = document.getElementById("date").value;
        let reply;
        /*if (!user_id || !highVal || !lowVal || !pulse || !dateInput) {
            alert("נא למלא את כל השדות!");
            return;
        }*/

        // המרת תאריך לפורמט yyyy-mm-dd
        // let dateObj = new Date(dateInput);
        //let formattedDate = dateObj.toISOString().split("T")[0];
        console.log("נשלח לשרת:", {
            user_id: user_id,
            high_Val: highVal,
            low_Val: lowVal,
            pulse: pulse,
            date: dateInput
        });

        let url = "/VAL/";

        try
        {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    high_Val: highVal,
                    low_Val: lowVal,
                    pulse: pulse,
                    date: dateInput
                })
            });

            if(response.ok)
            {
                reply=await response.json();
            }

            await GetValues();
        } catch (error) {
            console.error("שגיאה בשליחת הבקשה לשרת:", error);
            alert("אירעה שגיאה בעת שליחת הנתונים לשרת.");
        }

        console.log("all_values + last_id + all_values[last]",all_values,reply.Last_Id, all_values[(all_values.length)-1]);

        if(all_values[(all_values.length)-1].id===reply.Last_Id)
        {
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td>${all_values[(all_values.length)-1].high_val}</td>
            <td>${all_values[(all_values.length)-1].low_val}</td>
            <td>${all_values[(all_values.length)-1].pulse}</td>
            <td>${all_values[(all_values.length)-1].date}</td>
        `;
            // הוספת השורה לטבלה
            document.getElementById("mainTableData").appendChild(newRow);
        }



        // איפוס השדות אחרי ההוספה
        document.getElementById("high_val").value = "";
        document.getElementById("low_val").value = "";
        document.getElementById("pulse").value = "";
        document.getElementById("date").value = "";
    }

