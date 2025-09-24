// footer
let today = new Date();
let thisYear = today.getFullYear();

let footer = document.createElement("footer");
document.body.appendChild(footer);

let copyright = document.createElement("p");
copyright.innerHTML = `Jessica Lotto © ${thisYear}`;
footer.appendChild(copyright);

// skills
let skills = ["HTML", "CSS", "JavaScript", "GitHub", "Python"];

let skillsSection = document.querySelector("#skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}
