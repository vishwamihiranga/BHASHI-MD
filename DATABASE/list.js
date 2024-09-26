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



const commands ={
  "binance": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get current cryptocurrency prices from Binance."
  },
  "wa": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get your wa.me Link"
  },
    "apod": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get NASA's Astronomy Picture of the Day"
  },
      "carbonfootprint": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Calculate carbon footprint for a flight"
  },
  "iss": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Track the current location of the International Space Station"
  },
    "solve": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Solve Your Math Problems"
  },
    "jid": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get your Whatsapp JID"
  },
  "dnslookup": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Perform DNS lookup on a domain to retrieve its IP address."
  },
    "countdown": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Set a countdown timer by seconds for your events."
  },
  "checkpw": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Check the strength of a password."
  },
    "userinfo": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get You whatsapp User Informations"
  },
    "enc": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Encrypt code using an API"
  },
  "ipgeo": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get geolocation information for an IP address."
  },
  "whois": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Perform a WHOIS lookup on a domain or IP address."
  },
  "headers": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Fetch HTTP headers from a website."
  },
  "weather": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Fetch current weather information for any location."
  },
    "tempmail": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get Free Tempmail"
  },
      "checkmail": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get Check inbox of a temporary email address."
  },
    "gpass": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Generate strong and secure passwords."
  },
    "newpaste": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Paste Some Url or Text"
  },
    "getpaste": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get Pasted Content."
  },
  "wallpaper": {
    "category": "🔍 Search",
    "desc": "🔍 Get random wallpapers to personalize your screen."
  },
    "wiki": {
    "category": "🔍 Search",
    "desc": "🔍 Search and retrieve information from Wikipedia."
  },
  "tech": {
    "category": "🔍 Search",
    "desc": "🔍 Get the latest updates on technology."
  },
   "zip": {
    "category": "🔍 Search",
    "desc": "🔍 Search By Zip code"
  },
    "srepo": {
    "category": "🔍 Search",
    "desc": "🔍 Search for repository details on GitHub."
  },
      "srepo2": {
    "category": "🔍 Search",
    "desc": "🔍 Search for repository details on GitHub."
  },
    "wattpad": {
    "category": "🔍 Search",
    "desc": "🔍 Search for Wattpad storie"
  },
  "yts": {
    "category": "🔍 Search",
    "desc": "🔍 Search on YouTube."
  },
   "color": {
    "category": "🔍 Search",
    "desc": "🔍 Get color information or convert colors"
  },
    "githubstalk": {
    "category": "🔍 Search",
    "desc": "🔍 Retrieve detailed information from GitHub profiles."
  },
      "npm": {
    "category": "🔍 Search",
    "desc": "🔍 Serach NPM Package Details By package name"
  },
     "lyrics": {
    "category": "🔍 Search",
    "desc": "🔍 Serach Lyrics"
  },
    "define": {
    "category": "🔍 Search",
    "desc": "🔍 Look up definitions and meanings from the dictionary."
  },
    "cric": {
    "category": "🔍 Search",
    "desc": "🔍 Get Random Cricket Match Details"
  },
    "itunes": {
    "category": "🔍 Search",
    "desc": "🔍 Fetches song information from iTunes"
  },
      "tiktokstalk": {
    "category": "🔍 Search",
    "desc": "🔍 Fetches Tiktok User information"
  },
    "news": {
    "category": "📄News",
    "desc": "📄 Fetch the latest news articles."
  },
    "news2": {
    "category": "📄News",
    "desc": "📄 Get the latest news updates."
  },
    "sportnews": {
    "category": "📄News",
    "desc": "📄 Get the latest sport news updates."
  },
     "derananews": {
    "category": "📄News",
    "desc": "📄 Get the latest Derana News updates."
  },
    "esana": {
    "category": "📄News",
    "desc": "📄 Get the latest Esana news updates."
  },
    "esanalist": {
    "category": "📄News",
    "desc": "📄 Get the list of Esana news updates."
  },
    "iosnews": {
    "category": "📄News",
    "desc": "📄 Get the latest Ios news updates."
  },
    "listiosnews": {
    "category": "📄News",
    "desc": "📄 Get the list of Ios news updates."
  },
      "wabeta": {
    "category": "📄News",
    "desc": "📄 Get Whatsapp Beta Updates News."
  },
  "qr": {
    "category": "🔄 Converter",
    "desc": "🔄 Generate QR codes from text or URLs for quick access."
  },
  "shorturl": {
    "category": "🔄 Converter",
    "desc": "🔄 Shorten URLs using the TinyURL API for easier sharing."
  },
    "convert": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert currency from one type to another."
  },
    "morse": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert text to morse "
  },
  "trt": {
    "category": "🔄 Converter",
    "desc": "🔄 Translate text between different languages."
  },
    "ebinary": {
    "category": "🔄 Converter",
    "desc": "🔄 Encode text to binary"
  },
    "dbinary": {
    "category": "🔄 Converter",
    "desc": "🔄 Decode binary to text."
  },
        "ttp": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert text to Picture using an API"
  },
  "movie": {
    "category": "🎬 Movie",
    "desc": "🎬 Get comprehensive details about any movie."
  },
  "upcomingmovie": {
    "category": "🎬 Movie",
    "desc": "🎬 See upcoming movie releases."
  },
  "randommovie": {
    "category": "🎬 Movie",
    "desc": "🎬 Get a random movie recommendation."
  },
  "list": {
    "category": "🌟 Main",
    "desc": "🌟 Display all commands."
  },
    "ping": {
    "category": "🌟 Main",
    "desc": "🌟 Ping the bot to check its response time."
  },
  "support": {
    "category": "🌟 Main",
    "desc": "🌟 Get information about supporting or contributing to the bot's development."
  },
  "menu": {
    "category": "🌟 Main",
    "desc": "🌟 Display the bot's menu."
  },
  "alive": {
    "category": "🌟 Main",
    "desc": "🌟 Check if the bot is online and active."
  },
    "repo": {
    "category": "🌟 Main",
    "desc": "🌟 Check Our Official Github repo"
  },
    "channel": {
    "category": "🌟 Main",
    "desc": "🌟 Check Our Official Whatsapp Channel"
  },
      "session": {
    "category": "🌟 Main",
    "desc": "🌟 Get Your Session id "
  },
    "web": {
    "category": "🌟 Main",
    "desc": "🌟 Check Our Official Website"
  },
  "system": {
    "category": "🌟 Main",
    "desc": "🌟 Display detailed system information about the bot."
  },
    "live": {
    "category": "🌟 Main",
    "desc": "🌟 Display Time now and Date"
  },
    "gif": {
    "category": "🎮 Fun",
    "desc": "🎮 Get gifs "
  },
    "joke": {
    "category": "🎮 Fun",
    "desc": "🎮 Get a random joke to brighten your day."
  },
    "mysterybox": {
    "category": "🎮 Fun",
    "desc": "🎮 Open Your mysterybox."
  },
      "predict": {
    "category": "🎮 Fun",
    "desc": "🎮 Gives a random prediction about your future.."
  },
    "genderize": {
    "category": "🎮 Fun",
    "desc": "🎮 Get the most likely gender of a name..."
  },
      "nationalize": {
    "category": "🎮 Fun",
    "desc": "🎮 Get the most likely nationality of a name."
  },
  "fact": {
    "category": "🎮 Fun",
    "desc": "🎮 Get a random interesting fact."
  },
  "hack": {
    "category": "🎮 Fun",
    "desc": "🎮 Simulate a hack on your device for fun (not real hacking)."
  },
    "studyhelper": {
    "category": "🎮 Fun",
    "desc": "🎮 Get useful tips and tricks to enhance your study sessions."
  },
  "fb": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from Facebook."
  },
    "9gag": {
    "category": "🎥 Media",
    "desc": "📥 Get a random post from 9GAG.."
  },
    "tiktok": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from TikTok."
  },
      "tiktok2": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from TikTok."
  },
  "mediafire": {
    "category": "🎥 Media",
    "desc": "📥 Download files from Mediafire."
  },
  "gdrive": {
    "category": "🎥 Media",
    "desc": "📥 Download files from Google Drive."
  },
  "gitclone": {
    "category": "🎥 Media",
    "desc": "📥 Clone repositories from GitHub."
  },
    "threads": {
    "category": "🎥 Media",
    "desc": "📥 Download Threads Content using  url "
  },
    "img": {
    "category": "🎥 Media",
    "desc": "📥 Download 5 images From Google"
  },
  "song": {
    "category": "🎥 Media",
    "desc": "📥 Download your favorite songs."
  },
  "video": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from various sources."
  },
    "song2": {
    "category": "🎥 Media",
    "desc": "📥 Download your favorite songs."
  },
  "video2": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from various sources."
  },
    "play": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from various sources."
  },
    "igdl": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from various sources."
  },
  "autobio": {
    "category": "👑 Owner",
    "desc": "👑 Automatically update the bot's bio."
  },
    "update": {
    "category": "👑 Owner",
    "desc": "👑 Update Your ENVs : .update AUTO_VOICE:true"
  },
    "upgrade": {
    "category": "👑 Owner",
    "desc": "👑 Upgrade Your New Updates"
  },
    "restart": {
    "category": "👑 Owner",
    "desc": "👑 Restart Your Bot"
  },
    "ban": {
    "category": "👑 Owner",
    "desc": "👑  Ban a user from using the bot"
  },
    "unban": {
    "category": "👑 Owner",
    "desc": "👑  UnBan a user from using the bot"
  },
    "setbotname": {
    "category": "👑 Owner",
    "desc": "👑  Change the bot's name"
  },
    "setbotbio": {
    "category": "👑 Owner",
    "desc": "👑  Change the bot's bio"
  },
    "block": {
    "category": "👑 Owner",
    "desc": "👑 Block a user"
  },
    "setpp": {
    "category": "👑 Owner",
    "desc": "👑  Set bot's profile picture"
  },
    "setautobio": {
    "category": "👑 Owner",
    "desc": "👑 Enable or disable the AutoBIO feature."
  },
    "setautobio": {
    "category": "👑 Owner",
    "desc": "👑 Enable or disable the AutoBIO feature."
  },
      "unblock": {
    "category": "👑 Owner",
    "desc": "👑 unBlock a user"
  },  
    "setbotbio": {
    "category": "👑 Owner",
    "desc": "👑  Change the bot's bio"
  },
    "setbotbio": {
    "category": "👑 Owner",
    "desc": "👑  Change the bot's bio"
  },
    "broadcast": {
    "category": "👑 Owner",
    "desc": "👑 Broadcast a message to all chats"
  },
    "join": {
    "category": "👑 Owner",
    "desc": "👑 Join Using Invite LINk"
  },
    "left": {
    "category": "👑 Owner",
    "desc": "👑 Left From Group"
  },
  "anime": {
    "category": "🎭 Anime",
    "desc": "🎭 Get information about an anime."
  },
  "topanime": {
    "category": "🎭 Anime",
    "desc": "🎭 Get a list of top-rated anime."
  },
  "upcominganime": {
    "category": "🎭 Anime",
    "desc": "🎭 Fetch information about upcoming anime releases."
  },
  "ai": {
    "category": "🤖 AI ",
    "desc": "🤖 Chat with an AI for answers and conversations."
  },
    "genimg": {
    "category": "🤖 AI ",
    "desc": "🤖 Image Genarator By Prompt."
  },
  "nsfwloli": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW loli image."
  },
  "nsfwfoot": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW foot image."
  },
  "nsfwass": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW ass image."
  },
  "tetas": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW breasts image."
  },
  "booty": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW booty image."
  },
  "ecchi": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random ecchi image."
  },
  "furro": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random furro image."
  },
  "trapito": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random trap image."
  },
  "imagenlesbians": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW lesbian image."
  },
  "panties": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW panties image."
  },
  "pene": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW penis image."
  },
  "porno": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW porno image."
  },
  "randomxxx": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW image."
  },
  "yuri": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random yuri image."
  },
  "hentai2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai GIF."
  },
  "trap": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random trap GIF."
  },
  "hneko": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai neko image."
  },
  "belowjob": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW blowjob image."
  },
  "hentaivid": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai video."
  },
  "customnafw": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a custom NSFW image."
  },
    "xnxx": {
    "category": "🔞 NSFW",
    "desc": "🔞 Search XNXX Video From xnxx.com"
  },
    "xnxxdl": {
    "category": "🔞 NSFW",
    "desc": "🔞 Download XNXX Video By LInk"
  },
      "xnxx2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Search XNXX Video From xnxx.com"
  },
    "xnxxdl2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Download XNXX Video By LInk"
  },
  "promote": {
    "category": "👥 Group",
    "desc": "👥 Promote a member to admin."
  },
  "demote": {
    "category": "👥 Group",
    "desc": "👥 Demote an admin to a regular member."
  },
  "tagall": {
    "category": "👥 Group",
    "desc": "👥 Tag all members in the group."
  },
  "seticon": {
    "category": "👥 Group",
    "desc": "👥 Set the group icon."
  },
  "setsubject": {
    "category": "👥 Group",
    "desc": "👥 Set the group subject."
  },
  "removeall": {
    "category": "👥 Group",
    "desc": "👥 Remove all members from the group."
  },
  "setdecs": {
    "category": "👥 Group",
    "desc": "👥 Set the group description."
  },
    "Hidetag": {
    "category": "👥 Group",
    "desc": "👥 Hidden Tag "
  },
  "mute": {
    "category": "👥 Group",
    "desc": "👥 Mute a member."
  },
  "unmute": {
    "category": "👥 Group",
    "desc": "👥 Unmute a member."
  },
  "kick": {
    "category": "👥 Group",
    "desc": "👥 Kick a member from the group."
  },
  "groupinfo": {
    "category": "👥 Group",
    "desc": "👥 Get information about the group."
  },
  "getpic": {
    "category": "👥 Group",
    "desc": "👥 Retrieve the group profile picture."
  },
  "setgoodbye": {
    "category": "👥 Group",
    "desc": "👥 Set the goodbye message for the group."
  },
  "setwelcome": {
    "category": "👥 Group",
    "desc": "👥 Set the welcome message for the group."
  },
  "add": {
    "category": "👥 Group",
    "desc": "👥 Add a member to the group."
  },
    "virtext1": {
    "category": "💲premium",
    "desc": "💲 Send Spam"
  },
    "virtext2": {
    "category": "💲premium",
    "desc": "💲 Send Spam"
  },
    "virtext3": {
    "category": "💲premium",
    "desc": "💲 Send Spam"
  },
    "virtext4": {
    "category": "💲premium",
    "desc": "💲 Send Spam"
  },
    "bug": {
    "category": "💲premium",
    "desc": "💲 Send bug"
  },
    "bug1": {
    "category": "💲premium",
    "desc": "💲 Send bug"
  },
    "bug2": {
    "category": "💲premium",
    "desc": "💲 Send bug"
  },
    "binario": {
    "category": "💲premium",
    "desc": "💲 Set the welcome message for the group."
  },
    "alert": {
    "category": "📸 ImgGen",
    "desc": "📸 Fetches an alert image with custom text"
  },
    "unforgivable": {
    "category": "📸 ImgGen",
    "desc": "📸 Fetches an 'unforgivable' image with custom text"
  },
    "pikachu": {
    "category": "📸 ImgGen",
    "desc": "📸 Creates a surprised Pikachu meme with custom text."
  },
    "caution": {
    "category": "📸 ImgGen",
    "desc": "📸 Creates a caution sign with custom text."
  },
    "drake": {
    "category": "📸 ImgGen",
    "desc": "📸 Creates a Drake meme with custom text."
  },
    "pooh": {
    "category": "📸 ImgGen",
    "desc": "📸 Creates a Tuxedo Winnie the Pooh meme with custom text."
  },
      "ttp": {
    "category": "📸 ImgGen",
    "desc": "📸 Creates a Text to Picture"
  },
    "sadcat": {
    "category": "📸 ImgGen",
    "desc": "📸 Fetches a 'Sad Cat' image with custom text."
  },
    "oogway": {
    "category": "📸 ImgGen",
    "desc": "📸 Fetches an 'Oogway' image with custom text."
  },
    "dog": {
    "category": "🖥Random",
    "desc": "🖥 Get random cute dog pictures."
  },
    "rcolor": {
    "category": "🖥Random",
    "desc": "🖥 Get random color pictures."
  },
    "rcoffee": {
    "category": "🖥Random",
    "desc": "🖥 Get random coffee pictures."
  },
  "ranime": {
  "category": "🖥Random",
  "desc": "🖥 Get random Anime pictures."
  },
  "rcosplay": {
  "category": "🖥Random",
  "desc": "🖥 Get random cosplay pictures."
  },
  "rwaifu": {
  "category": "🖥Random",
  "desc": "🖥 Get random waifu pictures."
  },
  "rhusbu": {
  "category": "🖥Random",
  "desc": "🖥 Get random husbu pictures."
  },
    "rimgs": {
    "category": "🖥Random",
    "desc": "🖥 Get random Imgs pictures."
    },
      "cocktail": {
    "category": "🖥Random",
    "desc": "🖥 Get a random cocktail recipe"
    },
        "dogbreed": {
    "category": "🖥Random",
    "desc": "🖥 Get information about a random dog breed"
    },
    "rvideo": {
    "category": "🖥Random",
    "desc": "🖥 Get random videos to enjoy or share."
  }

};

module.exports = commands;