// footer
let today = new Date();
let thisYear = today.getFullYear();

let footer = document.createElement("footer");
document.body.appendChild(footer);

let copyright = document.createElement("p");
copyright.innerHTML = `Jessica Lotto © ${thisYear}`;
footer.appendChild(copyright);

// skills
let skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "CLI",
  "File Management",
  "CRUD Operations",
  "Operating Systems",
  "Shell Scripting",
  "SSH",
  "Git/GitHub"
];

let skillsSection = document.querySelector("#skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

// message form
let messageForm = document.forms["leave_message"];

if (messageForm) {
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let usersName = event.target.usersName.value;
    let usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    let messageSection = document.querySelector("#messages");
    let messageList = messageSection.querySelector("ul");

    let newMessage = document.createElement("li");
    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span> — ${usersMessage}</span>
    `;

    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.innerText = "remove";

    removeButton.addEventListener("click", function () {
      let entry = this.parentNode;
      entry.remove();
      if (messageList.children.length === 0) {
        messageSection.hidden = true;
      }
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageSection.hidden = false;

    messageForm.reset();
  });
}

// --------- Projects (GitHub repos) – keep what you already had or this minimal fetch ---------
// If you already implemented the Lesson-13 repos list, keep your version.
// Example minimal (comment out if you don't need):
/*
fetch("https://api.github.com/users/jlotto8/repos")
  .then(r => r.json())
  .then(repos => {
    const projectSection = document.querySelector("#projects");
    const projectList = projectSection.querySelector("ul");
    repos.forEach(repo => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = repo.html_url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = repo.name;
      li.appendChild(a);
      projectList.appendChild(li);
    });
  })
  .catch(err => {
    const projectList = document.querySelector("#projects ul");
    const li = document.createElement("li");
    li.textContent = "Unable to load repositories.";
    projectList.appendChild(li);
  });
*/

/*
// ================== Imgflip Memes (random selection from popular templates) ==================
(function () {
  const API = "https://api.imgflip.com/get_memes";
  const grid = document.getElementById("memes-grid");
  const status = document.getElementById("memes-status");
  const refreshBtn = document.getElementById("memes-refresh");

  function pickRandom(arr, n) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  function render(memes) {
    grid.innerHTML = "";
    memes.forEach(m => {
      const card = document.createElement("div");
      card.className = "meme-card";
      card.innerHTML = `
        <img src="${m.url}" alt="${m.name}">
        <div class="title">${m.name}</div>
      `;
      grid.appendChild(card);
    });
  }

  function loadMemes() {
    if (status) status.hidden = false;
    fetch(API)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch memes");
        return res.json();
      })
      .then(data => {
        if (status) status.hidden = true;
        const list = (data && data.data && data.data.memes) ? data.data.memes : [];

        // filter out tiny images to avoid awkward cards
        const decent = list.filter(m => m.width >= 300 && m.height >= 300);

        // pick 1–2 at random
        const chosen = pickRandom(decent.length ? decent : list, 2);

        render(chosen);
      })
      .catch(err => {
        console.error("Memes fetch error:", err);
        if (status) {
          status.hidden = false;
          status.textContent = "Unable to load memes right now.";
        }
      });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadMemes);
  }

  loadMemes();
})();
*/
(async function loadRepos() {
  const projectSection = document.querySelector("#projects");
  const projectList = projectSection?.querySelector("ul");
  if (!projectList) return;

  try {
    const res = await fetch("https://api.github.com/users/jlotto8/repos?per_page=100&sort=updated");
    if (!res.ok) throw new Error("GitHub API error");
    const repos = await res.json();

    projectList.innerHTML = ""; // clear any placeholder
    repos.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>`;
      projectList.appendChild(li);
    });
  } catch (e) {
    console.error(e);
    const li = document.createElement("li");
    li.textContent = "Unable to load repositories right now.";
    projectList.appendChild(li);
  }
})();
