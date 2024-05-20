class BackgroundImage {
  achievements = '';
  time = '';
  background = document.querySelector('.background');
  foreground = document.querySelector('.foreground');
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
  setAchievements(type) {
    this.achievements = type;
    this.updateBackground();
  }
  setTime(type) {
    this.time = type;
    this.updateBackground();
  }
}
