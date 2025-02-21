var users=[];
var all_values=[];


async function GetUsers(){
    let url="/U/";
    let response=await fetch(url);
    let reply=await response.json();
    console.log("reply=",reply);
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

async function GetValues()
{
    let url="/VAL/";
    let response=await fetch(url);
    let reply=await response.json();
    console.log("reply=",reply);
    all_values = reply.data;
    console.log("reply=",all_values);
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
        console.log(row);
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

