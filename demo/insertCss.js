const insertCss = (...styles) => {
  const removeCSS = styles.map((style) => style._insertCss());
  return () => removeCSS.forEach((dispose) => dispose());
};

const style = {
  css: '.theme{color: red}',
  _insertCss() {
    let styleEle = document.createElement('style');
    styleEle.innerHTML = style.css;
    document.head.appendChild(styleEle);
    return () => {
      styleEle.remove();
    };
  },
};

insertCss(style);
