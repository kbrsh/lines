'use strict';

document.getElementById("submit").addEventListener("click", function() {
  if (document.getElementById("username").value === "") {
    alert('Please enter a valid username');
  } else {
    calc(document.getElementById("username").value);
  }
});
var totalLines = 0;

function calc(userName) {
  fetch('https://api.github.com/users/' + userName + '/repos?per_page=100&client_id=5c198d87bf1396233db3&client_secret=6a17404d965bfe175c7675d605147def3b1032d7')
    .then(res => {
      return res.json()
    })
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].fork !== true) {
          console.log(data[i].name)
          fetch('https://api.github.com/repos/' + data[i].full_name + '/stats/contributors?per_page=100&client_id=5c198d87bf1396233db3&client_secret=6a17404d965bfe175c7675d605147def3b1032d7')
            .then(response => response.json())
            .then(contributors => contributors
              .map(contributor => contributor.weeks
                .reduce((lineCount, week) => lineCount + week.a - week.d, 0)))
            .then(lineCounts => lineCounts.reduce((lineTotal, lineCount) => lineTotal + lineCount))
            .then(lines => totalLines = totalLines + lines);
        }
      }
    })
    .then(function() {
      document.getElementById("header").style.display = 'none';
      document.getElementById("desc").style.display = 'none';
      document.getElementById("message").innerHTML = "YOU HAVE WRITTEN <span id='lines'>" + totalLines + "</span> LINES OF CODE."
      totalLines = 0;
    });

}
