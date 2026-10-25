const form = document.getElementById("entry-form");
const list = document.getElementById("entry-list");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function showEntries() {
  list.innerHTML = "";
  entries.forEach(function (entry) {
    const li = document.createElement("li");
    li.textContent =
      entry.type + ": P" + entry.amount + " (" + entry.category + ")";
    list.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const entry = {
    amount: Number(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
  };
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
  form.reset();
  showEntries();
  showSafeAmount();
});

showEntries();
function showSafeAmount() {
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(function (entry) {
    if (entry.type === "income") {
      totalIncome += entry.amount;
    } else {
      totalExpense += entry.amount;
    }
  });

  const balance = totalIncome - totalExpense;
  document.getElementById("safe-amount").textContent =
    "Safe to spend: P" + balance;
}

showSafeAmount();
const rules = [
  { reason: "Asks for a fee", words: ["fee", "pay to receive", "deposit"] },
  {
    reason: "Creates urgency",
    words: ["urgent", "act now", "immediately", "expires", "last chance"],
  },
  {
    reason: "Asks for secret codes",
    words: ["pin", "otp", "password", "verification code"],
  },
  {
    reason: "Promises a prize",
    words: ["you won", "winner", "prize", "congratulations", "lottery"],
  },
  { reason: "Contains a suspicious link", words: ["http", "www", "bit.ly"] },
  {
    reason: "Threatens your account",
    words: ["account blocked", "account suspended"],
  },
];

function checkScam() {
  const message = document.getElementById("scam-text").value.toLowerCase();
  let score = 0;
  const reasons = [];

  rules.forEach(function (rule) {
    const found = rule.words.some(function (word) {
      return message.includes(word);
    });
    if (found) {
      score++;
      reasons.push(rule.reason);
    }
  });

  const result = document.getElementById("scam-result");
  if (score === 0) {
    result.textContent = "Looks okay";
    result.style.color = "green";
  } else if (score === 1) {
    result.textContent = "Be careful";
    result.style.color = "orange";
  } else {
    result.textContent = "Likely scam";
    result.style.color = "red";
  }

  const reasonList = document.getElementById("scam-reasons");
  reasonList.innerHTML = "";
  reasons.forEach(function (reason) {
    const li = document.createElement("li");
    li.textContent = reason;
    reasonList.appendChild(li);
  });
}

document.getElementById("scam-btn").addEventListener("click", checkScam);

const loginBox = document.getElementById("login-box");
const appBox = document.getElementById("app");

function showApp() {
  loginBox.classList.add("hidden");
  appBox.classList.remove("hidden");
}

document.getElementById("login-btn").addEventListener("click", function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "judge" && pass === "pulawise2026") {
    sessionStorage.setItem("loggedIn", "yes");
    showApp();
  } else {
    document.getElementById("login-error").textContent =
      "Wrong username or password";
  }
});

if (sessionStorage.getItem("loggedIn") === "yes") {
  showApp();
}
