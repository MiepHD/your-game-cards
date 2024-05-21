const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (params.id) {
  inputData = JSON.parse(localStorage.getItem('data'))[parseInt(params.id)];

  document.addEventListener('DOMContentLoaded', () => {
    if (inputData['icon'])
      for (elem of document.querySelectorAll('.icon')) {
        elem.src = inputData.icon;
      }
    if (inputData['image']) {
      document.getElementById('image').value = inputData.image;
      document.querySelector('.cover').src = inputData.image;
    }
    if (inputData['description'])
      document.getElementById('description').innerHTML = inputData.description;
    if (inputData['story']) {
      const story = document.getElementById('story');
      story.innerHTML = inputData.story;
      story.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (inputData['players'] && inputData['minplayers']) {
      document.querySelector('.players').innerHTML =
        `<span>𐀪</span>`.repeat(inputData.players - inputData.minplayers) +
        `<span style="color: blue">𐀪</span>`.repeat(inputData.minplayers);
      let i = inputData.players;
      for (elem of document.querySelector('.players').children) {
        elem.setAttribute('data-value', i);
        elem.addEventListener('click', changeMinPlayerCount);
        i--;
      }
    }
    if (inputData['published'])
      document.getElementById('vpublished').innerHTML = inputData.published;
    if (inputData['lastplayed'])
      document.getElementById('vlastplayed').innerHTML = inputData.lastplayed;
    if (inputData['multiplayer'])
      document.getElementById('vmultiplayer').innerHTML = inputData.multiplayer;
    if (inputData['series'])
      document.getElementById('vseries').innerHTML = inputData.series;

    if (inputData['rating'])
      document.querySelectorAll('.outlinestar')[inputData.rating - 1].click();

    if (inputData['time']) {
      if (inputData['time']['hours']) {
        const hours = document.getElementById('hours');
        hours.innerHTML = inputData['time']['hours'];
        hours.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (inputData['time']['minutes']) {
        document.getElementById('minutes').innerHTML =
          inputData['time']['minutes'];
      }
    }
    if (inputData['achievements']) {
      if (inputData['achievements']['total']) {
        const total = document.getElementById('total');
        total.innerHTML = inputData['achievements']['total'];
        total.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (inputData['achievements']['progress']) {
        const progress = document.getElementById('progress');
        progress.innerHTML = inputData['achievements']['progress'];
        progress.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });
}
