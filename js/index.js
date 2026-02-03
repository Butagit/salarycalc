// ===== МАСТЕР =====
function calcMaster() {
  const days = Number(document.getElementById("m_days").value);
  const years = Number(document.getElementById("m_years").value);
  const cash = Number(document.getElementById("m_cash").value);

  const art = document.getElementById("m_art").checked;
  const teacher = document.getElementById("m_teacher").checked;
  const internDays = Number(document.getElementById("m_intern_days").value);

  // ===== ОКЛАД =====
  const baseRate = teacher ? 60 : 50;

  let salary =
    days <= 15
      ? days * baseRate
      : 15 * baseRate + (days - 15) * 75;

  // ===== ДОПЛАТА ЗА СТАЖЁРОВ =====
  const internBonus = internDays * 20;
  salary += internBonus;

  // ===== ПРОЦЕНТ =====
  let percent = 5;
  if (years >= 1) percent += years;
  if (art) percent += 1;

  const percentMoney = cash * percent / 100;

  // ===== ИТОГ =====
  const total = salary + percentMoney;
  const tax = total * 0.14;
  const final = total - tax;

  document.getElementById("m_result").innerHTML =
`<span>Оклад (с доплатами): ${salary} ₽</span>
<span>Доплата за стажёров: ${internBonus} ₽</span>
<span>Процент: ${percent}%</span>
<span>Проценты с кассы: ${percentMoney.toFixed(2)} ₽</span>
<span>Начислено: ${total.toFixed(2)} ₽</span>
<span>Удержано 14%: ${tax.toFixed(2)} ₽</span>
<span>К выплате: ${final.toFixed(2)} ₽</span>`;
}


// ===== КОНСУЛЬТАНТ =====
let consultantDayCount = 0;

// Добавить новый день
function addConsultantDay() {
  consultantDayCount++;
  const tbody = document.querySelector("#consultantTable tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="num">${consultantDayCount}</td>
    <td><input type="number" class="c_cash" value="0"></td>
    <td><button onclick="removeConsultantDay(this)">❌</button></td>
  `;
  tbody.appendChild(tr);
}

// Удалить день
function removeConsultantDay(btn) {
  btn.closest("tr").remove();
  consultantDayCount = 0;
  document.querySelectorAll("#consultantTable tbody tr").forEach((row) => {
    consultantDayCount++;
    row.cells[0].innerText = consultantDayCount;
  });
}

// Рассчитать зарплату консультанта
function calcConsultant() {
  const p1 = Number(document.getElementById("p1").value);
  const p2 = Number(document.getElementById("p2").value);
  const p3 = Number(document.getElementById("p3").value);

  let totalIncome = 0;

  document.querySelectorAll(".c_cash").forEach(input => {
    const cash = Number(input.value);
    let percent = 0;

    if (cash <= 500) percent = p1;
    else if (cash <= 1000) percent = p2;
    else percent = p3;

    const deduction = cash * ((100 - percent) / 100);
    const dayIncome = cash - deduction;
    totalIncome += dayIncome;
  });

  const tax = totalIncome * 0.14;
  const final = totalIncome - tax;

  document.getElementById("c_result").innerHTML =
`<span>Начислено за все дни: ${totalIncome.toFixed(2)} ₽</span>
<span>Удержано 14%: ${tax.toFixed(2)} ₽</span>
<span>К выплате: ${final.toFixed(2)} ₽</span>`;
}



