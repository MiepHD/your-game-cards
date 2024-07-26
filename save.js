autosave = true;
function saveInfo() {
  saveData = {};
  //Cover image
  if (document.getElementById('image').value != '')
    saveData['image'] = document.getElementById('image').value;

  //Description
  if (
    document.getElementById('description').innerHTML != '' &&
    document.getElementById('toggledescription').checked
  )
    saveData['description'] = document.getElementById('description').innerHTML;

  //Story
  document.getElementById('togglestory').checked
    ? (saveData['story'] = values['story'])
    : (saveData['story'] = 'hidden');

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
    saveData['multiplayer'] = document.getElementById('vmultiplayer').innerHTML;

  //Series
  if (
    document.getElementById('toggleseries').checked &&
    document.getElementById('vseries').innerHTML != ''
  )
    saveData['series'] = document.getElementById('vseries').innerHTML;

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
    saveData['achievements'] = {
      progress: parseInt(values['achievements']['progress'])
        ? values['achievements']['progress']
        : 0,
      total: parseInt(values['achievements']['total'])
        ? values['achievements']['total']
        : 0,
    };

  //Icon
  if (
    document.querySelector('.icon').src !=
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
  )
    saveData['icon'] = document.querySelector('.icon').src;

  //Add autosave tag
  saveData['autosave'] = autosave;

  //Save everything to localStorage
  currentdata = JSON.parse(localStorage.getItem('data'));
  if (params.id) {
    currentdata[parseInt(params.id)] = saveData;
  } else {
    if (currentdata) {
      if (
        autosave &&
        currentdata[params.new] &&
        currentdata[params.new]['autosave']
      ) {
        currentdata[params.new] = saveData;
      } else {
        currentdata.push(saveData);
      }
    } else {
      currentdata = [saveData];
    }
  }
  localStorage.setItem('data', JSON.stringify(currentdata));
  location.href = 'index.html';
}
