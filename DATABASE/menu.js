/*

 ██████╗ ██╗  ██╗ █████╗ ███████╗██╗  ██╗██╗    ███╗   ███╗██████╗       ██████╗  ██████╗ ██████╗ ██╗  ██╗ 
 ██╔══██╗██║  ██║██╔══██╗██╔════╝██║  ██║██║    ████╗ ████║██╔══██╗      ╚════██╗██╔═████╗╚════██╗██║  ██║
 ██████╔╝███████║███████║███████╗███████║██║    ██╔████╔██║██║  ██║       █████╔╝██║██╔██║ █████╔╝███████║  
 ██╔══██╗██╔══██║██╔══██║╚════██║██╔══██║██║    ██║╚██╔╝██║██║  ██║      ██╔═══╝ ████╔╝██║██╔═══╝ ╚════██║
 ██████╔╝██║  ██║██║  ██║███████║██║  ██║██║    ██║ ╚═╝ ██║██████╔╝      ███████╗╚██████╔╝███████╗     ██║ 
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝    ╚═╝     ╚═╝╚═════╝       ╚══════╝ ╚═════╝ ╚══════╝     ╚═╝ 
                                                                   
    Project Name : Bhashi Multi Device Whatsapp Bot
    Version : 1.0
    Year : 2024
    Author : Vishwa Mihiranga & Bhashitha
    This File Last Update Date : 2024.09.27

*/



// Main Menu
const MAIN_MSG = `*乂  M A I N   M E N U*

╭────────────────┈
│  ◦  Menu
│  ◦  Alive
│  ◦  Ping
│  ◦  System
│  ◦  Live
│  ◦  Support
│  ◦  Repo
╰────────────────┈`;

// Download Menu
const DL_MSG = `*乂  D O W N L O A D   M E N U*

╭────────────────┈
│  ◦  Song
│  ◦  Video
│  ◦  Fb
│  ◦  Tiktok
│  ◦  Img
│  ◦  Gdrive
│  ◦  Mfire
│  ◦  Apk
│  ◦  Gitclone
│  ◦  Wallpaper
╰────────────────┈`;

// Converter Menu
const CONVERTER_MSG = `*乂  C O N V E R T   M E N U*

╭────────────────┈
│  ◦  Qr
│  ◦  Shorturl
│  ◦  Trt
│  ◦  Morse
│  ◦  Convert
│  ◦  Ebinary
│  ◦  Dbinary
│  ◦  Gitclone
╰────────────────┈`;

// AI Menu
const AI_MSG = `*乂  A I   M E N U*

╭────────────────┈
│  ◦  Ai
╰────────────────┈`;

// Search Menu
const SEARCH_MSG = `*乂  S E A R C H   M E N U*

╭────────────────┈
│  ◦  Yts
│  ◦  Wiki
│  ◦  Tech
│  ◦  Zip
│  ◦  Srepo
│  ◦  Lyrics
│  ◦  Itune
│  ◦  Npm
│  ◦  Define
│  ◦  Cric
│  ◦  Colour
│  ◦  Githubstalk
╰────────────────┈`;

// Fun Menu
const FUN_MSG = `*乂  F U N   M E N U*

╭────────────────┈
│  ◦  Gif
│  ◦  Joke
│  ◦  Mysterybox
│  ◦  Predict
│  ◦  Genderize
│  ◦  Nationalize
│  ◦  Fact
│  ◦  Hack
│  ◦  Studyhelper
│  ◦  Dog
│  ◦  Rcolor
│  ◦  Rcoffee
│  ◦  Ranime
│  ◦  Rcosplay
│  ◦  Rwaifu
│  ◦  Rhusbu
│  ◦  Rimg
│  ◦  Rvideo
╰────────────────┈`;

// NSFW Menu
const NSFW_MSG = `*乂  1 8 +   M E N U*

╭────────────────┈
│  ◦  Xnxx
│  ◦  Xnxxdl
│  ◦  Hentaivid
│  ◦  Nsfwloli
│  ◦  Nsfwfoot
│  ◦  Nsfwass
│  ◦  Nsfwbdsm
│  ◦  Nsfwero
│  ◦  Nsfwfemdom
│  ◦  Nsfwglass
│  ◦  Hentai
│  ◦  Tetas
│  ◦  Booty
│  ◦  Ecchi
│  ◦  Furro
│  ◦  Trapito
│  ◦  Imagenlesbians
│  ◦  Panties
│  ◦  Pene
│  ◦  Prono
│  ◦  Rendomxxx
│  ◦  Pechos
│  ◦  Yaoi2
│  ◦  Yuri2
│  ◦  Hentai2
│  ◦  Trap
│  ◦  Hneko
│  ◦  Belowjob
│  ◦  Coustomnafw
╰────────────────┈`;

// Useful Menu
const USEFUL_MSG = `*乂  U S E F U L   M E N U*

╭────────────────┈
│  ◦  Binance
│  ◦  Wa
│  ◦  Slove
│  ◦  Jid
│  ◦  Dnslookup
│  ◦  Countdown
│  ◦  Checkpw
│  ◦  Userinfo
│  ◦  Ipgeo
│  ◦  Whois
│  ◦  Header
│  ◦  Weather
│  ◦  Gpass
│  ◦  Newpaste
│  ◦  Getpaste
╰────────────────┈`;

// Logo Menu
const LOGO_MSG = `*乂  L O G O   M E N U*

╭────────────────┈
│  ◦  Alert
│  ◦  Unforgivable
│  ◦  Pikachu
│  ◦  Caution
│  ◦  Drake
│  ◦  Pooh
│  ◦  Sadcat
│  ◦  Oogway
╰────────────────┈`;

// Movie Menu
const MOVIE_MSG = `*乂  M O V I E   M E N U*

╭────────────────┈
│  ◦  Movie
│  ◦  Upcomingmovie
│  ◦  Rendommovie
│  ◦  Topmovie
│  ◦  Anime
│  ◦  Topanime
│  ◦  Upcominganime
╰────────────────┈`;

// News Menu
const NEWS_MSG = `*乂  N E W S   M E N U*

╭────────────────┈
│  ◦  News
│  ◦  News2
│  ◦  Esana
│  ◦  Esanalist
│  ◦  Iosnews
│  ◦  Listiosnews
╰────────────────┈`;

// Placeholder Menus (currently empty)
const GROUP_MSG = ` *乂  G R O U P   M E N U*

╭────────────────┈
│  ◦  Promote
│  ◦  Demote
│  ◦  add
│  ◦  Tagall
│  ◦  Seticon
│  ◦  Setsubject
│  ◦  Removeall
│  ◦  Setdesc
│  ◦  Hidetag
│  ◦  Mute
│  ◦  Unmute
│  ◦  Kick
│  ◦  Groupinfo
│  ◦  Getpic
│  ◦  Setgoodbye
│  ◦  Setwelcome
╰────────────────┈ `;
const PREMIUM_MSG = ` *乂  V I P  B U G   M E N U*

╭────────────────┈
│  ◦  Virtext1
│  ◦  Virtext2
│  ◦  Virtext3
│  ◦  Virtext4
│  ◦  Bug
│  ◦  Bug1
│  ◦  Bug2
│  ◦  Binario
╰────────────────┈ `;
const OWNER_MSG = ` *乂  O W N E R   M E N U*

╭────────────────┈
│  ◦  Autobio
│  ◦  Restart
│  ◦  Update
│  ◦  Upgrade
│  ◦  Setowner
│  ◦  Removeowner
│  ◦  Antilink
│  ◦  Ban
│  ◦  Unban
│  ◦  Setbotname
│  ◦  Setbotbio
│  ◦  Block
│  ◦  Unblock
│  ◦  Setpp
│  ◦  Setautobio
│  ◦  Broadcast
│  ◦  Join
│  ◦  Left
╰────────────────┈ `;

// Exporting all menu constants
module.exports = {
  MAIN_MSG,
  DL_MSG,
  CONVERTER_MSG,
  AI_MSG,
  SEARCH_MSG,
  FUN_MSG,
  NSFW_MSG,
  USEFUL_MSG,
  LOGO_MSG,
  MOVIE_MSG,
  NEWS_MSG,
  GROUP_MSG,
  PREMIUM_MSG,
  OWNER_MSG
};
