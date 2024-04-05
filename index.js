//10h Rubin
//20h Smaragd
//40h Diamant
//80h Obsidian

//33% Bronze
//66% Silber
//99% Gold
document.addEventListener('DOMContentLoaded', () => {
  for (card of data) {
    elem = $(`
        <div class="card" style="background-image: url(assets/${
          card.background
        })">
          <img
            src="${card.image}"
          />
          <div style="flex: 1"></div>
          <p>${card.description}</p>
          <div class="container">
            <span class="story"${
              Object.hasOwn(card, 'story') ? '' : ' style="display: none"'
            }>🕮 ${card.story ? '✓' : 'X'}</span>
            <span class="players">${'𐀪'.repeat(
              card.players - card.minplayers
            )}${'<span style="color: blue">𐀪</span>'.repeat(
      card.minplayers
    )}</span>
          </div>
          <table>
            <tr>
              <th>Veröffentlichung</th>
              <th>${card.published}</th>
            </tr>
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
          <div style="flex: 1"></div>
          <div style="height: 1.5em">
            <span class="time" style="visibility: ${
              card.time ? 'visible' : 'hidden'
            }">${card.time}</span>
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
        ? Math.round(
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
});
