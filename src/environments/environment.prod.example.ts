export const environment = {
  production: true,

  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },

  apis: {
    wger: {
      url: 'https://wger.de/api/v2'
    },
    spoonacular: {
      url: 'https://api.spoonacular.com/recipes/complexSearch',
      key: ''
    },
    youtube: {
      url: 'https://www.googleapis.com/youtube/v3/search',
      key: ''
    }
  }
};
