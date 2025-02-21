var users=[];
var workers=[];
var mStones=[];
var all_tasks=[];
var mStoneStatus=[];

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
}
/*
function CreateTableBody() {
    let s = "";
    for(let row of all_tasks) {
        let is_arsal = Number(row.is_arsal);
        let smart_due=(row.nice_due === "00-00-0000")?"":row.nice_due;
        s += (is_arsal === 1)?
            "<tr class='arsal'>" :
            "<tr>";
        s += `    <td class="lvl${row.Lvl}">${row.description}</td>`;
        s += `    <td>${workers[row.worker_id]}</td>`;
        s += `    <td>${smart_due}</td>`;
        s += `    <td>${row.progress_prcnt}</td>`;
        s += `    <td>${categs[row.categ_id]}</td>`;
        for (let stone of mStones) {
            let sValue="";
            let sCls="";
            // console.log("row.id,stone.id = ",row.id,stone.id);
            if((mStoneStatus[row.id] !== null)&&
                (mStoneStatus[row.id][stone.id] !== null)){
                switch (parseInt(mStoneStatus[row.id][stone.id])) {
                    case 1: sValue="כן";    sCls="green";   break;
                    case 2: sValue="לא";    sCls="red";     break;
                    case 3: sValue="חלקי";  sCls="yellow";  break;
                }
            }
            s += `<td class="${sCls}">`;
            s += `${sValue}`;
            s += "</td>";
        }
        s += "</tr>";
    }
    document.getElementById("mainTableData").innerHTML = s;
}
async function BuildPage() {
    await GetCateg();
    await GetStatus();
    await GetWorkers();
    await GetMileStones();
    await GetTasks();
}*/
