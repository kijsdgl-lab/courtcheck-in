option > `;
    }
    const joinBtn = document.createElement('button');
    joinBtn.textContent = '입장';
    joinBtn.onclick = () => joinCourt(p, parseInt(courtSelect.value));

    li.appendChild(courtSelect);
    li.appendChild(joinBtn);
    waitingList.appendChild(li);
  });
}

function updateWaitingTimes() {
  waitingPlayers.forEach(p => {
    p.waitingMinutes = Math.floor((Date.now() - p.startTime) / 60000);
  });
  renderWaiting();
}

setInterval(updateWaitingTimes, 60000);

checkInBtn.onclick = () => {
  const name = document.getElementById('name').value.trim();
  const gender = document.getElementById('gender').value;
  const career = parseInt(document.getElementById('career').value);

  if (!name || isNaN(career)) return alert('이름과 구력을 입력해주세요.');

  waitingPlayers.push({
    name, gender, career,
    startTime: Date.now(),
    waitingMinutes: 0,
    games: 0
  });
  renderWaiting();
};

function joinCourt(player, courtId) {
  courts[courtId - 1].players.push(player);
  waitingPlayers = waitingPlayers.filter(p => p !== player);
  renderCourts();
  renderWaiting();
}

function finishGame(courtId, player) {
  player.games += 1;
  player.startTime = Date.now();
  player.waitingMinutes = 0;

  courts[courtId - 1].players = courts[courtId - 1].players.filter(p => p !== player);
  waitingPlayers.push(player);

  renderCourts();
  renderWaiting();
}

renderCourts();`;
