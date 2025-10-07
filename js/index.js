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


// -------------------------------
// GITHUB API FETCH (Portfolio)
// -------------------------------
fetch("https://api.github.com/users/jlotto8/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((repositories) => {
    console.log(repositories); // verify what the API returns

    let projectSection = document.querySelector("#projects");
    let projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement("li");

      // Make each repo name clickable to its GitHub page
      let link = document.createElement("a");
      link.href = repositories[i].html_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = repositories[i].name;

      project.appendChild(link);
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    console.error("Error fetching repositories:", error);

    let projectSection = document.querySelector("#projects");
    let projectList = projectSection.querySelector("ul");
    let errorItem = document.createElement("li");
    errorItem.textContent = "Unable to load repositories. Please try again later.";
    projectList.appendChild(errorItem);
  });
