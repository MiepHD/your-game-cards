# Your Game Cards

Du willst zeigen welche Spiele du spielst und das in schöner und übersichtlicher Art und Weise? Dann ist Your Game Cards genau das Richtige. Damit kannst du aus den Informationen über deine Computerspiele ganz einfach ansprechende Karten machen. Diese Karten kannst du dann auch ausdrucken.

Beispielkarte:

![Screenshot 2024-04-28 092602](https://github.com/MiepHD/game-cards/assets/63968466/0919aa20-b443-4e34-8ec9-fd95d77999b4)

Beispielwebseite mit einem Teil meiner Spiele: https://miep-hd.froxot.com/cards/

Um deine Karten zu generieren, trage deine Daten in Form eines JSON-Objektes in `/data.js` ein. Der Inhalt sollte wie folgt aussehen:

```
data = [
  {
      background: 'moving_out.jpg', //Optional: Trage hier deinen Bildpfad relativ zu /assets ein
      image:
        'https://cdn.cloudflare.steamstatic.com/steam/apps/996770/header.jpg', //Trage hier das Bild zu dem Steam Header ein oder einen anderen Bildpfad. Den Steam Header bekommt man am einfachsten, indem man den Eintrag des Spiels auf steamdb.info öffnet
      description: `
        In <b>Moving Out</b> arbeitet man in einem Umzugsunternehmen. Man 
        räumt verschiedenste Gebäude aus und ein. Dazu gibt es noch eine 
        unterhaltsame Geschichte, die sich hauptsächlich abspielt während der 
        Chef gerade im Urlaub ist...
      `, //Trage heir deine Beschreibung des Spiels ein
      series: 'Moving Out', //Optional: Trage hier ein zu welcher Serie das Spiel gehört
      story: true,
      /* Optional: Indikator, ob die Story abgeschlossen wurde.
       * true: ein Haken neben dem Buch Symbol
       * false: ein Kreuz neben dem Buch Symbol
       * Zahl: Fügt n-Mal einen Haken hinzu
       */
      players: 4, //Optional: Wie viele Personen das Spiel gemeinsam spielen können
      minplayers: 1, //Optional: Wie viele Personen es mindestens braucht
      published: '27.4.2020', //Trage hier ein wann das Spiel veröffentlicht wurde
      lastPlayed: '5.10.2023', //Optional: Trage hier ein wann du das letzte Mal gespielt hast
      multiplayer: 'Lokal', //Optional: Trage hier ein in welchen Multiplayer-Modi man spielen kann
      rating: 5, //Optional: Trage hier deine Bewertung in einer Ganzzahl von 0 bis 5 ein
      time: '40h 58min', //Optional: Trage hier ein wie lange du das Spiel gespielt hast
      achievements: { //Optional
        progress: 196, //Trage hier die Zahl der abgeschlossenen Errungenschaften ein
        total: 205, //Trage hier ein wie veile Errungenschaften es insgesamt gibt
      },
  },
  ... //Hier kannst du deine weiteren Spiele einfügen
];
```
