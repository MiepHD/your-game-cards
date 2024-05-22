# Your Game Cards

Want to show off the games you play? Then Your Game Cards is for you. It allows you to easily turn the information about your computer games into attractive cards. You can then print these cards.

(Du willst zeigen welche Spiele du spielst und das in schöner und übersichtlicher Art und Weise? Dann ist Your Game Cards genau das Richtige. Damit kannst du aus den Informationen über deine Computerspiele ganz einfach ansprechende Karten machen. Diese Karten kannst du dann auch ausdrucken.)

Example (Beispielkarte):

![Screenshot 2024-04-28 092602](https://github.com/MiepHD/game-cards/assets/63968466/0919aa20-b443-4e34-8ec9-fd95d77999b4)

Example webpage: https://miep-hd.froxot.com/cards/

(Beispielwebseite mit einem Teil meiner Spiele)

Saving structure (Speicherstruktur):

```
[
  {
      icon: '', //Icon as base64 string
      image:
        'https://cdn.cloudflare.steamstatic.com/steam/apps/996770/header.jpg', //Enter image header (steamdb.info) (Titelbild)
      description: "In <b>Moving Out</b> arbeitet man in einem Umzugsunternehmen. Man ",
      series: 'Moving Out',
      story: true, //InputType: number or boolean (Eingabe Zahl oder Wahrheitswert)
      players: 4,
      minplayers: 1,
      published: '27.4.2020',
      lastPlayed: '5.10.2023',
      multiplayer: 'Lokal',
      rating: 5, //Number/Zahl 1-5
      time: {
        "hours": 40,
        "minutes": 58
      },
      achievements: {
        progress: 196, 
        total: 205
      }
  },
  ... //Add more cards here (Hier kannst du deine weiteren Spiele einfügen)
];
```

Note: All attributes are optional (Alle Attribute sind optional)
