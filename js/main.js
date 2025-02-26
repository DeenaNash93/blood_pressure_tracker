var users=[];
var all_values=[];
var index_to_delete=[];

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
        console.log("נשלח לשרת:",
            {
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
            newRow.id = `${all_values[(all_values.length) - 1].id}`;
            newRow.innerHTML = `
            <td><input type="checkbox" class="option" value="${all_values[(all_values.length) - 1].id}>"</td>
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
async function DeleteRow()
{
   index_to_delete = Array.from(document.querySelectorAll(".option:checked"))
        .map(checkbox => checkbox.value);
   console.log("רשימת הערכים המסומנים ",index_to_delete);
   if(index_to_delete.length>0)
   {
       for (let idx of index_to_delete)
       {
           await Delete(idx);
       }
       await CreateTableBody();
       index_to_delete.length=0;
   }


}
async function Delete(idx)
{
    let url="/VAL/";
    let response=await fetch(url,
        {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({values_id:idx})
        }
    );
    let data=await response.json();
    console.log("deleted?",data);

}