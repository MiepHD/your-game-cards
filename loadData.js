const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (params.id) {
  inputData = JSON.parse(localStorage.getItem('data'))[parseInt(params.id)];

  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelector('title')
      .setAttribute('data-translation-id', 'editor.title.editCard');
    if (inputData['icon'])
      for (elem of document.querySelectorAll('.icon')) {
        elem.src = inputData.icon;
      }
    if (inputData['image']) {
      document.getElementById('image').value = inputData.image;
      document.querySelector('.cover').src = inputData.image;
    }
    if (inputData['description']) {
      document.getElementById('description').innerHTML = inputData.description;
    } else {
      document.getElementById(`toggledescription`).click();
    }

    if (inputData['story'] != undefined) {
      const story = document.getElementById('story');
      story.innerHTML = inputData.story;
      story.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (
      inputData['players'] != undefined &&
      inputData['minplayers'] != undefined
    ) {
      values['minplayers'] = inputData['minplayers'];
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
    for (field of ['published', 'lastplayed', 'multiplayer', 'series']) {
      if (inputData[field]) {
        document.getElementById(`v${field}`).innerHTML = inputData[field];
      } else {
        document.getElementById(`toggle${field}`).click();
      }
    }

    if (inputData['rating'] != undefined) {
      document.querySelectorAll('.outlinestar')[inputData.rating - 1].click();
    } else {
      document.getElementById(`togglerating`).click();
    }

    if (inputData['time'] != undefined) {
      if (inputData['time']['hours'] != undefined) {
        const hours = document.getElementById('hours');
        hours.innerHTML = inputData['time']['hours'];
        hours.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (inputData['time']['minutes'] != undefined) {
        document.getElementById('minutes').innerHTML =
          inputData['time']['minutes'];
      }
    } else {
      document.getElementById(`toggletime`).click();
    }
    if (inputData['achievements'] != undefined) {
      if (inputData['achievements']['total'] != undefined) {
        const total = document.getElementById('total');
        total.innerHTML = inputData['achievements']['total'];
        total.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (inputData['achievements']['progress'] != undefined) {
        const progress = document.getElementById('progress');
        progress.innerHTML = inputData['achievements']['progress'];
        progress.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else {
      document.getElementById(`toggleachievements`).click();
    }
  });
}
