'use strict';

document.getElementById("submit").addEventListener("click", function() {
    if(document.getElementById("username").value === "") {
        alert('Please enter a valid username');
    } else {
        calc(document.getElementById("username").value);
    }
});
var totalLines = 0;

function calc(userName) {
fetch('https://api.github.com/users/' + userName + '/repos?client_id=5c198d87bf1396233db3&client_secret=6a17404d965bfe175c7675d605147def3b1032d7')
  .then(res => {
    return res.json()
  })
  .then(data => {
    for (var i = 0; i < data.length; i++) {
      fetch('https://api.github.com/repos/' + data[i].full_name + '/stats/contributors?client_id=5c198d87bf1396233db3&client_secret=6a17404d965bfe175c7675d605147def3b1032d7')
        .then(response => response.json())
        .then(contributors => contributors
          .map(contributor => contributor.weeks
            .reduce((lineCount, week) => lineCount + week.a - week.d, 0)))
        .then(lineCounts => lineCounts.reduce((lineTotal, lineCount) => lineTotal + lineCount))
        .then(lines => totalLines = totalLines + lines)
    }
  })
  .then(function() {
      alert(totalLines);
      totalLines = 0;
  });

}
