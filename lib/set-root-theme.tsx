export function setRootTheme(theme: 'light' | 'dark') {
  const body = document.body;
//   const root = document.documentElement || document.querySelector('.root');
  if (theme === 'dark') {
    body.style.background = '#0b0b0b';
    body.style.color = '#fafafa';
  } else {
    body.style.background = '#fafafa';
    body.style.color = '#0b0b0b';
  }
}