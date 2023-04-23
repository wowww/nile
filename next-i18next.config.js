module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeDetection: true,
    debug: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development' && true,
  },
};
