// الفرق وتواريخ البداية
const teams = [
  "شباب الحسين",
  "شباب الامير",
  "الأنيق",
  "الهوات",
  "الحرية",
  "الليث الأبيض",
  "المنار",
  "شباب المهناوية",
  "أنصار الميناء",
  "النصر",
  "شباب الناصرية",
  "النظال",
  "الرسالة",
  "الصداقة",
  "السلام",
  "شباب البركة",
  "التحدي",
  "الطلبة",
  "الزوراء",
  
];

// إعداد الجدول
const tableBody = document.querySelector("#footballTable tbody");
const teamData = JSON.parse(localStorage.getItem("teamData")) || {};
const team1Select = document.getElementById("team1");
const team2Select = document.getElementById("team2");

teams.forEach((team) => {
  if (!teamData[team]) {
    teamData[team] = {
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      gamesDrawn: 0,
    };
  }
  // إضافة الفرق للقوائم المنسدلة
  const option1 = document.createElement("option");
  option1.value = team;
  option1.textContent = team;
  team1Select.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = team;
  option2.textContent = team;
  team2Select.appendChild(option2);
});

// تحديث النقاط بناءً على نتائج المباراة
function updateScores() {
  const team1 = team1Select.value;
  const score1 = parseInt(document.getElementById("score1").value, 10);
  const team2 = team2Select.value;
  const score2 = parseInt(document.getElementById("score2").value, 10);

  if (!teamData[team1] || !teamData[team2]) {
    alert("أحد الفرق غير موجود.");
    return;
  }

  // تحديث النقاط والأهداف
  teamData[team1].gamesPlayed += 1;
  teamData[team2].gamesPlayed += 1;

  if (score1 > score2) {
    teamData[team1].points += 3;
    teamData[team1].gamesWon += 1;
    teamData[team2].gamesLost += 1;
  } else if (score2 > score1) {
    teamData[team2].points += 3;
    teamData[team2].gamesWon += 1;
    teamData[team1].gamesLost += 1;
  } else {
    teamData[team1].points += 1;
    teamData[team2].points += 1;
    teamData[team1].gamesDrawn += 1;
    teamData[team2].gamesDrawn += 1;
  }

  teamData[team1].goalsFor += score1;
  teamData[team1].goalsAgainst += score2;
  teamData[team2].goalsFor += score2;
  teamData[team2].goalsAgainst += score1;

  localStorage.setItem("teamData", JSON.stringify(teamData));
  updateTable();
}

// تحديث الجدول بناءً على البيانات الجديدة
function updateTable() {
  // تحويل البيانات إلى مصفوفة لترتيبها
  const sortedTeams = Object.keys(teamData).sort((a, b) => {
    return teamData[b].points - teamData[a].points;
  });

  //مصفوفة شعارات الاندية
  let teamlogos = [
    "logos/alhusain.jpg",
    "logos/alameer.jpg",
    "logos/aneeq.jpg",
    "logos/howat.jpg",
    "logos/hurya.jpg",
    "logos/lion.jpg",
    "logos/manar.jpg",
    "logos/mhanawea.jpg",
    "logos/minaa.jpg",
    "logos/nasr.jpg",
    "logos/nasria.jpg",
    "logos/nidal.jpg",
    "logos/risala.jpg",
    "logos/sadaka.jpg",
    "logos/tahady.jpg",
    "logos/talaba.jpg",
    "logos/zawraa.jpg",
    "logos/salam.jpg",
    "logos/shbarka.jpg",
  ];

  // إعادة بناء الجدول
  tableBody.innerHTML = "";
  sortedTeams.forEach((team, index) => {
    const row = document.createElement("tr");
    const goalDifference =
      teamData[team].goalsFor - teamData[team].goalsAgainst;
    row.innerHTML = ` 
            <td><img src="${teamlogos[index]}" alt="شعار الفريق"> ${team}</td>
            <td>${teamData[team].gamesPlayed}</td>
            <td>${teamData[team].gamesWon}</td>
            <td>${teamData[team].gamesDrawn}</td>
            <td>${teamData[team].gamesLost}</td>
            <td>${goalDifference}</td>
            <td>${teamData[team].goalsFor}</td>
            <td>${teamData[team].goalsAgainst}</td>
            <td>${teamData[team].points}</td>
        `;
    // تحديد لون الخلفية بناءً على المراكز
    if (index < 4) {
      row.classList.add("top-4"); // الفرق في المراكز الأربعة الأولى
    } else if (index >= sortedTeams.length - 2) {
      row.classList.add("bottom-2"); // الفرق في المركزين الأخيرين
    }
    tableBody.appendChild(row);
  });
}

// تحديث الجدول عند تحميل الصفحة
updateTable();

//اضهار واخفاء الجدول
const modal = document.getElementById("myModal");
const btn = document.getElementById("showLega");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
