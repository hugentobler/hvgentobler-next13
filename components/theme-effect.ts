export const themeEffect = function() {
  // check if there's a prior theme stored
  // if not, system theme is implied
  const pref = localStorage.getItem('theme')
  if (null === pref) {
    document.documentElement.classList.add('system')
  } else {
    document.documentElement.classList.remove('system')
  }

  // return 'dark' theme if the stored preference is dark
  // or if there's no stored preference and the client preferes dark
  // otherwise return 'light' theme
  if (pref === 'dark' ||
    (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('pause-transitions')
    document.documentElement.classList.add('dark')
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#171717')

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    })
    return 'dark';
  } else {
    document.documentElement.classList.add('pause-transitions')
    document.documentElement.classList.remove('dark')
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#f5f5f5')
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions')
    });
    return 'light'
  }
}
