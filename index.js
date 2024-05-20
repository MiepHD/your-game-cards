//10h Rubin
//20h Smaragd
//40h Diamant
//80h Obsidian

//33% Bronze
//66% Silber
//99% Gold
data = JSON.parse(localStorage.getItem('data'));
document.addEventListener('DOMContentLoaded', () => {
  for (card of data) {
    elem = $(`
      <div class="card">
        <img class="background" src="assets/generic/default.png" />
        <img class="foreground" src="" />
        ${generateIcons(card.icon)}
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
            <tr${card.lastPlayed ? '' : ' style="display: none"'}>
              <th>Zuletzt gespielt</th>
              <th>${card.lastPlayed}</th>
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
    elem.appendTo($('body'));
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
