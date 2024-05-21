class FileHandler {
  reader = new FileReader();

  resize(imagePath, callback) {
    const originalImage = new Image();
    originalImage.src = imagePath;
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    originalImage.addEventListener('load', () => {
      const originalWidth = originalImage.naturalWidth;
      const originalHeight = originalImage.naturalHeight;
      const ratio = originalWidth / originalHeight;
      if (ratio != 1) {
        document.getElementById('error').style.setProperty('display', '');
        return;
      }
      canvas.width = 48;
      canvas.height = 48;
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
      callback(document.querySelector('canvas').toDataURL('image/jpeg', 0.3));
    });
  }

  getImage(callback) {
    const file = document.querySelector('input[type=file]').files[0];
    this.reader.addEventListener('load', (res) => {
      const image = res.target.result;
      this.resize(image, callback);
    });
    if (typeof file == 'object') {
      this.reader.readAsDataURL(file);
    } else {
      callback(null);
    }
  }

  getText(callback) {
    const file = document.querySelector('input[type=file]').files[0];
    this.reader.addEventListener('load', (res) => {
      callback(res.target.result);
    });
    if (typeof file == 'object') {
      this.reader.readAsText(file);
    } else {
      callback(null);
    }
  }
}
