langdata = null;
contentLoaded = false;
document.addEventListener('DOMContentLoaded', () => {
  contentLoaded = true;
  translate();
});
langpos = 0;
switchLanguage = () => {
  langcodes = ['en', 'de'];
  langpos += 1;
  if (langpos == langcodes.length) langpos = 0;
  changeLanguage(langcodes[langpos]);
};

changeLanguage = (lang) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      langdata = JSON.parse(xhr.responseText);
      translate();
    }
  };
  xhr.open('GET', `assets/lang/${lang}.json`, true);
  xhr.send();
};
changeLanguage(params.lang ? params.lang : 'en');

translate = () => {
  if (langdata == null || !contentLoaded) return;
  for (elem of document.querySelectorAll('[data-translation-id]')) {
    const translation = langdata[elem.getAttribute('data-translation-id')];
    if (translation) elem.innerHTML = translation;
  }
  for (elem of document.querySelectorAll('[data-translation-placeholder-id]')) {
    const translation =
      langdata[elem.getAttribute('data-translation-placeholder-id')];
    if (translation) elem.setAttribute('placeholder', translation);
  }
};
