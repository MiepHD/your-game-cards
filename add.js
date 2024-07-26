values = {
  currentRating: 3,
  story: 1,
  minplayers: 1,
  achievements: {
    progress: 0,
    total: 0,
  },
};
unload = () => {
  saveInfo();
};
window.addEventListener('beforeunload', unload);

document.addEventListener('DOMContentLoaded', () => {
  //Create background
  background = new BackgroundImage(
    document.querySelector('.background'),
    document.querySelector('.foreground')
  );

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
      background.setAchievements(percentage);
    });
  }

  //Input story completed
  document.getElementById('story').addEventListener('input', (e) => {
    const input = e.currentTarget.innerHTML;
    const checkbox = document.getElementById('togglestory');
    if (input == 'hidden') {
      checkbox.click();
    }
    count = parseInt(input);
    if (input.includes('y') || input.includes('j')) count = 1;
    values['story'] = count ? count : 0;
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
    image.src = input.includes('http')
      ? input
      : `https://cdn.cloudflare.steamstatic.com/steam/apps/${input}/header.jpg`;
  });

  //Adaptive background for time
  document.getElementById('hours').addEventListener('input', (e) => {
    hours = parseInt(e.currentTarget.innerHTML);
    background.setTime(hours ? hours : 0);
  });

  //Icon
  document.querySelector('input[type=file]').addEventListener('change', () => {
    new FileHandler().getImage((url) => {
      for (icon of document.querySelectorAll('.icon')) {
        icon.src = url;
      }
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
