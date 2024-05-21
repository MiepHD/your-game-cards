class BackgroundImage {
  achievements = '';
  time = '';
  background;
  foreground;
  constructor(background, foreground) {
    this.background = background;
    this.foreground = foreground;
  }
  updateBackground() {
    let timeApplied = false;

    //Background
    if (this.achievements != '') {
      this.background.src = 'assets/generic/' + this.achievements + '.png';
    } else if (this.time != '') {
      this.background.src = 'assets/generic/' + this.time + '.png';
      timeApplied = true;
    } else {
      this.background.src = 'assets/generic/default.png';
    }

    //Foreground
    !timeApplied && this.time
      ? (this.foreground.src = 'assets/generic/part_' + this.time + '.png')
      : (this.foreground.src = '');
  }
  setAchievements(percentage) {
    if (percentage < 33) {
      this.achievements = '';
    } else if (percentage >= 33 && percentage < 66) {
      this.achievements = 'bronze';
    } else if (percentage >= 66 && percentage < 99) {
      this.achievements = 'silver';
    } else if (percentage >= 99) {
      this.achievements = 'gold';
    }
    this.updateBackground();
  }
  setTime(hours) {
    if (hours < 10) {
      this.time = '';
    } else if (hours >= 10 && hours < 20) {
      this.time = 'ruby';
    } else if (hours >= 20 && hours < 40) {
      this.time = 'emerald';
    } else if (hours >= 40 && hours < 80) {
      this.time = 'diamond';
    } else if (hours >= 80) {
      this.time = 'obsidian';
    }
    this.updateBackground();
  }
}
