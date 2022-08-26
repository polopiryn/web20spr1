var zadania = [
    {
      header: 'Prosta aplikacja wykorzystująca trasowanie (rooting), podział na moduły',
      body: `Cztery trasy i cztery moduły.`
    },
    {
      header: 'Wykorzystanie silnika szablonów',
      body: 'Wykorzystany został pug.'
    },
    {
      header: 'Przygotowanie prostego REST API',
      body: 'Wykonane zostało proste api dla samochodów.',
      links: ['/api']
    },
    {
      header: 'Wykorzystanie sesji i logowania za pomocą passport',
      body: 'Tylko zalogowany użytkownik ma dostęp do:',
      links: ['/users/token', '/users', '/logged', '/logout']
    },
    {
      header: 'Wykorzystanie JSON Web Token',
      body: 'Aby móc wykorzystywać api należy się zalogować i wygenerować sobie token, który trzeba wpisać w haderze zapytania REST API.',
      links: ['/users/token', '/api']
    },
    {
      header: 'Rejestracja z potwierdzeniem aktywacji konta przez e-mail',
      body: 'Po pomyślnej rejstracji automatycznie wysyłany jest mail',
      links: ['/register', '/mail/activation-email/:id', ]
    },
    {
      header: 'Wykorzystanie Bootstrapa',
      body: 'Jak widać jest wykorzystany',
    },
    {
      header: 'Aplikacja działająca online',
      body: 'Aplikacja działa online pod adresem: ',
      links: ['']
    },
  ]
  
  module.exports = {
    zadania : zadania
  }