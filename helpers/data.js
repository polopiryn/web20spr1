var zadania = [
    {
      header: 'Opis sprawozdania w pliku PDF',
      body: `Zrobione.`
    },
    {
      header: 'Przygotowanie prostego REST API, np. za pomocą pakietu mongoose',
      body: `Zrobione.`,
      links: ['/api']
    },
    {
      header: 'Wykorzystanie JSON Web Token',
      body: 'Aby móc wykorzystywać api należy się zalogować i wygenerować sobie token, który trzeba wpisać w haderze zapytania REST API.',
      links: ['/users/token', '/api']
    },
    {
      header: 'Wykorzystanie silnika szablonów',
      body: 'Wykorzystany został pug.'
    },
    {
      header: 'Rejestracja użytkownika',
      body: 'passport - tylko zalogowany użytkownik ma dostęp do:',
      links: ['/users/token', '/users', '/logged', '/logout']
    },
    {
      header: 'Zrobienie prostego panelu administratora',
      body: 'zrobiono częściowo - reset uzytkowników w bazie'
    }, 
    {
      header: 'Rejestracja z potwierdzeniem aktywacji konta przez e-mail',
      body: 'Po pomyślnej rejstracji automatycznie wysyłany jest mail',
      links: ['/register', '/mail/activation-email/:id', ]
    }, 
    {
      header: 'Wykorzystanie Bootstrapa lub innego frameworka CSS, coś z RWD',
      body: 'zrobiono - Bootstrap'
    },
    {
      header: 'Aplikacja działająca online',
      body: 'Aplikacja działa online pod adresem: ',
      links: ['https://homenode.herokuapp.com']
    },
    {
      header: 'Uwierzytelnienie za pomocą konta Google czy innego portalu',
      body: 'pominięto całkowicie'
    }
   
  ]
  
  module.exports = {
    zadania : zadania
  }