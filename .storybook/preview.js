import '../sass/styles.scss';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    list: [
      {
        name: 'dark',
        class: 'theme-dark',
        color: '#000',
      },
      {
        name: 'light',
        class: 'theme-light',
        color: '#fff',
      },
    ],
  },
};
