values = {
  currentRating: 3,
  story: 1,
  minplayers: 1,
  achievements: {
    progress: 0,
    total: 0,
  },
};
document.addEventListener('DOMContentLoaded', () => {
  //Create background
  background = new BackgroundImage();

  //Editable stars
  for (star of document.querySelectorAll('.outlinestar')) {
    star.addEventListener('click', (e) => {
      rating = parseInt(e.currentTarget.getAttribute('data-value'));
      values.currentRating = rating;
      for (star of document.querySelectorAll('.fillstar')) {
        rating > 0
          ? star.style.setProperty('color', 'yellow')
          : star.style.setProperty('color', 'grey');
        rating--;
      }
    });
  }

  //Adaptive progress bar
  for (type of ['total', 'progress']) {
    document.getElementById(type).addEventListener('input', () => {
      total = parseInt(document.getElementById('total').innerHTML);
      progress = parseInt(document.getElementById('progress').innerHTML);
      values['achievements'] = {
        total: total,
        progress: progress,
      };
      percentage = Math.round((progress / total) * 100);
      if (
        percentage < 0 ||
        percentage > 100 ||
        percentage == undefined ||
        percentage == null ||
        isNaN(percentage)
      )
        percentage = 0;
      document.getElementById('percentage').innerHTML = percentage + '%';
      document
        .querySelector('.progress')
        .style.setProperty('clip-path', `inset(0 ${100 - percentage}% 0 0)`);
      if (percentage < 33) {
        background.setAchievements('');
      } else if (percentage >= 33 && percentage < 66) {
        background.setAchievements('bronze');
      } else if (percentage >= 66 && percentage < 99) {
        background.setAchievements('silver');
      } else if (percentage >= 99) {
        background.setAchievements('gold');
      }
    });
  }

  //Input story completed
  document.getElementById('story').addEventListener('input', (e) => {
    input = e.currentTarget.innerHTML;
    count = parseInt(input);
    if (input.includes('y') || input.includes('j')) count = 1;
    values['story'] = count;
    e.currentTarget.innerHTML = count > 0 ? '&#x2713'.repeat(count) : 'X';
  });

  //Add players
  document.getElementById('addplayer').addEventListener('click', () => {
    players = document.querySelector('.players');
    player = document.createElement('span');
    player.setAttribute('data-value', players.children.length + 1);
    player.innerHTML = '𐀪';
    player.addEventListener('click', changeMinPlayerCount);
    players.insertBefore(player, players.children[0]);
  });

  //Remove players
  document.getElementById('removeplayer').addEventListener('click', () => {
    people = document.querySelector('.players');
    people.removeChild(people.children[0]);
  });

  //Editable min player count
  for (player of document.querySelectorAll('.players > span')) {
    player.addEventListener('click', changeMinPlayerCount);
  }

  //Show/Hide elements
  for (checkbox of document.querySelectorAll('input[type=checkbox]')) {
    checkbox.addEventListener('click', (e) => {
      dest = document.querySelector(e.currentTarget.getAttribute('data-dest'));
      dest.style.getPropertyValue('display') == 'none'
        ? dest.style.setProperty('display', '')
        : dest.style.setProperty('display', 'none');
    });
  }

  //Edit cover image
  document.getElementById('image').addEventListener('input', (e) => {
    input = e.currentTarget.value;
    image = document.querySelector('.cover');
    image.style.display = input == '' ? 'none' : '';
    image.src = input;
  });

  //Adaptive background for time
  document.getElementById('hours').addEventListener('input', (e) => {
    hours = parseInt(e.currentTarget.innerHTML);
    if (hours < 10) {
      background.setTime('');
    } else if (hours >= 10 && hours < 20) {
      background.setTime('ruby');
    } else if (hours >= 20 && hours < 40) {
      background.setTime('emerald');
    } else if (hours >= 40 && hours < 80) {
      background.setTime('diamond');
    } else if (hours >= 80) {
      background.setTime('obsidian');
    }
  });

  //Save to localStorage
  document.getElementById('save').addEventListener('click', () => {
    saveData = {};
    //Cover image
    if (document.getElementById('image').value != '')
      saveData['image'] = document.getElementById('image').value;

    //Description
    if (
      document.getElementById('description').innerHTML != '' &&
      document.getElementById('toggledescription').checked
    )
      saveData['description'] =
        document.getElementById('description').innerHTML;

    //Story
    if (document.getElementById('togglestory').checked)
      saveData['story'] = values['story'];

    //Players
    players = document.querySelector('.players').children;
    players.length < values['minplayers']
      ? (saveData['minplayers'] = players.length)
      : (saveData['minplayers'] = values['minplayers']);
    saveData['players'] = players.length;

    //Published
    if (
      document.getElementById('togglepublished').checked &&
      document.getElementById('vpublished').innerHTML != ''
    )
      saveData['published'] = document.getElementById('vpublished').innerHTML;

    //LastPlayed
    if (
      document.getElementById('togglelastplayed').checked &&
      document.getElementById('vlastplayed').innerHTML != ''
    )
      saveData['lastplayed'] = document.getElementById('vlastplayed').innerHTML;

    //Multiplayer
    if (
      document.getElementById('togglemultiplayer').checked &&
      document.getElementById('vmultiplayer').innerHTML != ''
    )
      saveData['multiplayer'] =
        document.getElementById('vmultiplayer').innerHTML;

    //Series
    if (
      document.getElementById('toggleseries').checked &&
      document.getElementById('vseries').innerHTML != ''
    )
      saveData['multiplayer'] = document.getElementById('vseries').innerHTML;

    //Time
    if (document.getElementById('toggletime').checked) {
      hours = document.getElementById('hours').innerHTML;
      minutes = document.getElementById('minutes').innerHTML;
      saveData['time'] = {
        hours: hours == '' ? 0 : parseInt(hours),
        minutes: minutes == '' ? 0 : parseInt(minutes),
      };
    }

    //Rating
    if (document.getElementById('togglerating').checked)
      saveData['rating'] = values['currentRating'];

    //Achievements
    if (document.getElementById('toggleachievements').checked)
      saveData['achievements'] = values['achievements'];

    //Get image
    save((icon) => {
      saveData['icon'] = icon;

      //Save everything to localStorage
      currentdata = JSON.parse(localStorage.getItem('data'));
      currentdata ? currentdata.push(saveData) : (currentdata = [saveData]);
      localStorage.setItem('data', JSON.stringify(currentdata));
      location.href = '/index.html';
    });
  });
});

//Sets min player count
changeMinPlayerCount = (e) => {
  count = parseInt(e.currentTarget.getAttribute('data-value'));
  values.minplayers = count;
  players = document.querySelectorAll('.players > span');
  count = players.length - count;
  for (player of players) {
    count > 0
      ? player.style.setProperty('color', 'black')
      : player.style.setProperty('color', 'blue');
    count--;
  }
};
