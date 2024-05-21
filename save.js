const reader = new FileReader();

function resize(imagePath, callback) {
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

function save(callback) {
  file = document.querySelector('input[type=file]').files[0];
  reader.addEventListener('load', (res) => {
    const image = res.target.result;
    resize(image, callback);
  });
  reader.readAsDataURL(file);
}
