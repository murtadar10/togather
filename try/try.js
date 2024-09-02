
let playerdata = document.querySelectorAll(".team1players");
let playerdata2 = document.querySelectorAll(".team1players2");
let arryOfPlayerData = [];
let arryOfPlayerData2 = [];

for (let i = 1; i <= 11; i++) {
  arryOfPlayerData.push(`<tr>
            <td>${i}</td>
            <td><input class="name" type="text" placeholder="اسم اللاعب " /></td>
            <td>
              <select>
                <option value="Starting">اساسي</option>
                <option value="Entered">دخول</option>
                <option value="Exited">خروج</option>
              </select>
            </td>
            <td>
              <input type="button" class="addyellow" value="Add" />
            </td>
            <td>
              <input type="button" class="addred" value="Add" />
            </td>
            <td>
              <input type="button" class="addgoal" value="Add goal" />
            </td>

            
          </tr>`);
}
for (let i = 1; i <= 5; i++) {
  arryOfPlayerData2.push(`<tr>
            <td>${i}</td>
            <td><input class="name" type="text" placeholder="اسم اللاعب " /></td>
            <td>
              <select>
                <option value="Starting">اساسي</option>
                <option value="Entered">دخول</option>
                <option value="Exited">خروج</option>
              </select>
            </td>
            <td>
              <input type="button" class="addyellow" value="Add" />
            </td>
            <td>
              <input type="button" class="addred" value="Add" />
            </td>
            <td>
              <input type="button" class="addgoal" value="Add goal" />
            </td>

            
          </tr>`);
}
/// اضافة اللاعبين الى الهيكل 
let n = arryOfPlayerData.join(" ");
playerdata[0].innerHTML = `${n}`;
playerdata[1].innerHTML = `${n}`;
let n2 = arryOfPlayerData2.join(" ");
playerdata2[0].innerHTML = `${n2}`;
playerdata2[1].innerHTML = `${n2}`;


// دالة الوقت 
function updateDateTime() {
  const dateElement = document.getElementById("current-date");
  const now = new Date();

  // استخراج تاريخ اليوم والوقت
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // الأشهر تبدأ من 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dayweak = String(now.toLocaleDateString("ar-EG", { weekday: "long" }));

  // تنسيق التاريخ والوقت بالأرقام فقط
  const formattedDateTime = `${year}-${month}-${day} 
  ${hours}:${minutes}:${seconds}     ${dayweak}`;

  // تعيين النص في العنصر
  dateElement.innerHTML = ` <p> التاريخ :${year}-${month}-${day} </p> <span> ${dayweak}     </span> <span> /  الوقت : ${hours}:${minutes}:${seconds} </span>`;
}
/////////////////////////////////////////////////////


let start = false;
      let timerInterval;
      let timerSeconds = 0;

      function startTimer() {
        if (start) return;
        start = true;
        timerInterval = setInterval(() => {
          timerSeconds++;
          let minutes = Math.floor(timerSeconds / 60);
          let seconds = timerSeconds % 60;
          document.getElementById("timer").textContent = `${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }, 1000);
      }



// تحديث التاريخ والوقت عند تحميل الصفحة
window.onload = updateDateTime;



function getTeamPlayersData(teamId) {
  const playersData = [];
  const rows = document.querySelectorAll(`#${teamId} tr`);
  rows.forEach((row) => {
    const name = row.cells[0].querySelector("input").value;
    const status = row.cells[1].querySelector("select").value;
    const yellowCards = row.cells[2].querySelector("input").value;
    const redCards = row.cells[3].querySelector("input").value;
    const goals = row.cells[4].querySelector("input").value;
    playersData.push(`${name},${status},${yellowCards},${redCards},${goals}`);
  });
  return playersData;
}

function saveMatchSummary() {
  // الحصول على بيانات المباراة
  const team1Name = document.getElementById("team1").value;
  const team1Score = document.getElementById("score1").value;
  const team2Name = document.getElementById("team2").value;
  const team2Score = document.getElementById("score2").value;

  // حفظ قسم النتيجة والأزرار للتأكد من استرجاعها لاحقًا
  const scoreSectionHTML = document.querySelectorAll(".button").innerHTML; // يحتفظ بالنتيجة والأزرار
  // إزالة النتيجة والأزرار من الواجهة
  document.querySelectorAll(".button").innerHTML = "<button >يبووووووووووووووووووووووووووووووووووو</button>";

  //  الحصول على هيكلية الواجهة بعد إزالة العناصر 
  const matchDetailsHTML = document.querySelector(".container").innerHTML;

  // استرجاع قسم النتيجة والأزرار
  document.querySelectorAll(".button").innerHTML = scoreSectionHTML;

  // إنشاء ملخص المباراة
  const matchSummary = `${team1Name},${team1Score},${team2Name},${team2Score},${matchDetailsHTML}`;

  // تخزين ملخص المباراة في Local Storage
  let matchSummaries = localStorage.getItem("matchSummaries") || "";
  matchSummaries += matchSummary + ";";
  localStorage.setItem("matchSummaries", matchSummaries);

  // إظهار رسالة تأكيد وتفريغ الحقول
  alert("Match summary saved successfully!");
  document.querySelectorAll("input, select").forEach((el) => (el.value = ""));
}

function displayMatchSummaries() {
  const matchSummaries = localStorage.getItem("matchSummaries") || "";
  const summaryList = document.getElementById("match-summary-list");
  summaryList.innerHTML = "";

  if (!matchSummaries) {
    summaryList.innerHTML = "<p>No match summaries available.</p>";
    return;
  }

  matchSummaries.split(";").forEach((summary, index) => {
    if (summary.trim()) {
      const [team1Name, team1Score, team2Name, team2Score, matchDetailsHTML] =
        summary.split(",");

      const matchBrief = document.createElement("div");
      matchBrief.innerHTML = `
        <p>Match ${index + 1}:</p>
        <p> ${team1Name} ${team1Score} -  ${team2Name} ${team2Score}</p>
        <button onclick="toggleDetails(${index})">Show Details</button>
        <div id="match-details-${index}" style="display:none;">
        
          <div>${matchDetailsHTML}</div>
        </div>
        <hr />
      `;
      summaryList.appendChild(matchBrief);
    }
  });
}

// ////////////////////////////////////////////////////////////==================================



// ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toggleDetails(index) {
  const detailsDiv = document.getElementById(`match-details-${index}`);
  if (detailsDiv.style.display === "none") {
    detailsDiv.style.display = "block";
  } else {
    detailsDiv.style.display = "none";
  }
}


 let timerDisplay = document.getElementById("timer");

document.addEventListener("DOMContentLoaded", function () {
  let i = 0 ;
  // إضافة مستمع للأزرار ذات الكلاس addyellow
  document.querySelectorAll(".addyellow").forEach((button) => {
    button.addEventListener("click", function () {
      const cell = this.closest("td");
      const span = document.createElement("span");
      const currentTime = timerDisplay.textContent; // الحصول على وقت المؤقت

      span.innerHTML = ` <span class="yellow" > <img src="y.png" alt=""> </span> </span> ${currentTime}`;; // النص مع الوقت

      // إضافة العنصر <span> بجانب الزر
      cell.appendChild(span);
    i++
    if(i==2){
      button.style.display="none";
    }
    



    });
  });

  // إضافة مستمع للاحمر
  document.querySelectorAll(".addred").forEach((button) => {
    button.addEventListener("click", function () {
      const cell = this.closest("td");
      const span = document.createElement("span");
      const currentTime = timerDisplay.textContent; // الحصول على وقت المؤقت
button.style.display="none";
span.innerHTML = ` <span class="red" > <img src="red.png" alt=""> ${currentTime}`; // النص مع الوقت

      // إضافة العنصر <span> بجانب الزر
      cell.appendChild(span);
    });
  });

  // إضافة مستمع للاهداف
  document.querySelectorAll(".addgoal").forEach((button) => {
    button.addEventListener("click", function () {
      const cell = this.closest("td");
      const p = document.createElement("span");
      const currentTime = timerDisplay.textContent; // الحصول على وقت المؤقت

      span.innerHTML = ` <span class="goal" >  <img class="go" src="go.png" alt=""> </span> </span> ${currentTime}`; // النص مع الوقت

      // إضافة العنصر <p> بجانب الزر
      cell.appendChild(span);
    });
  });
});
////////////////////////////// دالة للحفظ والتخزين 
function saveAndAbdate() {
  updateScores() ;
saveMatchSummary(); 
}

