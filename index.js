//10h Rubin
//20h Smaragd
//40h Diamant
//80h Obsidian

//33% Bronze
//66% Silber
//99% Gold
plain = localStorage.getItem('data');
data = JSON.parse(plain);
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('export').href =
    'data:text/plain,' + encodeURIComponent(plain);

  document.querySelector('input[type=file]').addEventListener('change', () => {
    document.getElementById('dialogback').style.display = 'block';
  });
  document.getElementById('new').href += '?new=' + data.length;
  //Add cards
  let i = 0;
  for (card of data) {
    elem = $(`
      <div class="card">
        <a class="edit" href="add.html?id=${i}"><strong>&#9998;</strong></a>
        <div class="delete" data-pos="${i}"><strong>X</strong></div>
        ${generateBackground(
          card['time']
            ? card['time']['hours']
              ? card['time']['hours']
              : 0
            : 0,
          card.achievements
            ? card.achievements.total == 0
              ? 0
              : Math.round(
                  (card.achievements.progress * 100) / card.achievements.total
                )
            : 0
        )}
        ${card.icon ? generateIcons(card.icon) : ''}
        ${
          card.image
            ? `<img class="cover"
        src="${card.image}"
      />`
            : ''
        }
        <div class="space"></div>
          ${card.description ? `<p>${card.description}</p>` : ''}
          <div class="container">
            <span class="story"${
              Object.hasOwn(card, 'story') ? '' : ' style="display: none"'
            }>&#x1F56E; ${
      typeof card.story === 'number'
        ? card.story == 0
          ? 'X'
          : '&#x2713;'.repeat(card.story)
        : card.story
        ? '&#x2713;'
        : 'X'
    }</span>
            <span class="players">${'𐀪'.repeat(
              card.players - card.minplayers
            )}${'<span style="color: blue">𐀪</span>'.repeat(
      card.minplayers
    )}</span>
          </div>
          <table>
            ${
              card.published
                ? `<tr>
            <th>Veröffentlichung</th>
            <th>${card.published}</th>
          </tr>`
                : ''
            }
            <tr${card.lastplayed ? '' : ' style="display: none"'}>
              <th>Zuletzt gespielt</th>
              <th>${card.lastplayed}</th>
            </tr>
            <tr${card.multiplayer ? '' : ' style="display: none"'}>
              <th>Multiplayer Typ</th>
              <th>${card.multiplayer}</th>
            </tr>
            <tr${card.series ? '' : ' style="display: none"'}>
              <th>Spieleserie</th>
              <th>${card.series}</th>
            </tr>
          </table>
          <div class="space"></div>
          <div style="height: 1.5em">
            ${
              card.time
                ? `<span class="time">${card.time['hours']}h ${card.time['minutes']}min</span>`
                : ''
            }
            <span class="rating">${'<span class="fillstar" style="color: yellow">★<span class="outlinestar">☆</span></span>'.repeat(
              card.rating
            )}${'<span class="fillstar" style="color: grey">★<span class="outlinestar">☆</span></span>'.repeat(
      5 - card.rating
    )}</span>
          </div>
          <div class="bar" style="display: ${
            Object.hasOwn(card, 'achievements') ? 'block' : 'none'
          }">
            <div class="progress" style="clip-path: inset(0 ${
              card.achievements
                ? 100 -
                  (card.achievements.progress * 100) / card.achievements.total
                : 0
            }% 0 0)"></div>
            <div class="count">
            ${card.achievements ? card.achievements.progress : 0} von ${
      card.achievements ? card.achievements.total : 0
    }<span style="float: right">${
      card.achievements
        ? card.achievements.total == 0
          ? 0
          : Math.round(
              (card.achievements.progress * 100) / card.achievements.total
            )
        : 0
    }%</span>
            </div>
          </div>
        </div>
      `);
    elem.prependTo($('body'));
    i++;
  }

  for (elem of document.querySelectorAll('.delete')) {
    elem.addEventListener('click', (e) => {
      id = parseInt(e.currentTarget.getAttribute('data-pos'));
      currentData = JSON.parse(localStorage.getItem('data'));
      currentData.splice(id, 1);
      localStorage.setItem('data', JSON.stringify(currentData));
      location.reload();
    });
  }

  i = 0;
  for (elem of document.querySelectorAll('.space')) {
    if (elem.clientHeight == 0) i++;
  }
  if (i > 0)
    $(
      `<p style="color:red"">${i / 2} space elements are too small!</p>`
    ).appendTo($('body'));
  if (i > 0) console.log(`${i} space elements are too small!`);
});

generateIcons = (url) => {
  elements = '';
  for (let i = 1; i < 45; i++) {
    elements += `<img class="icon pos${i}" src="${url}" />`;
  }
  return elements;
};

generateBackground = (hours, percentage) => {
  backgroundelement = document.createElement('img');
  backgroundelement.setAttribute('class', 'background');
  foregroundelement = document.createElement('img');
  foregroundelement.setAttribute('class', 'foreground');
  const background = new BackgroundImage(backgroundelement, foregroundelement);
  background.setTime(hours);
  background.setAchievements(percentage);
  return backgroundelement.outerHTML + foregroundelement.outerHTML;
};

loadItems = (add) => {
  new FileHandler().getText((importedData) => {
    if (typeof JSON.parse(importedData) == 'object')
      add
        ? localStorage.setItem(
            'data',
            JSON.stringify(
              JSON.parse(importedData).concat(
                JSON.parse(localStorage.getItem('data'))
              )
            )
          )
        : localStorage.setItem('data', importedData);
    location.reload();
  });
};
