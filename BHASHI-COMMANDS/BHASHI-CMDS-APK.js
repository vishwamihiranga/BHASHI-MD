const sai = "6467ad0b29"
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const { checkAccess, isPremiumUser, blacklistedJIDs, premiumJIDs, dataLoaded } = require('../DATABASE/accessControl');
const fetch = require('node-fetch');
const { exec } = require('child_process');

  



cmd({
  pattern: "hackernews",
  alias: ["hn"],
  desc: "Search for the latest articles on The Hacker News and get details.",
  react: "📰",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const apiKey = "key1"; // Your provided API key
    const apiUrl = `https://vishwa-api-production.up.railway.app/misc/the-hacker-news-list?apikey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const articlesData = response.data;

    if (!articlesData.data || articlesData.data.length === 0) {
      return reply("❌ No articles found.");
    }

    let resultMessage = `*[ 📰 THE HACKER NEWS ARTICLES ]*:\n`;
    resultMessage += `\n> Reply with the number of the article you want to read in detail.\n\n`;
    articlesData.data.forEach((article, index) => {
      resultMessage += `📰 *${index + 1}.* ${article.title}\n`;
      resultMessage += `   🕒 Published: ${article.date}\n\n`;
    });

    resultMessage += `> Type 'done' when you're finished.\n`;
    resultMessage += `> BHASHI • MULTI DEVICE-WA-BOT 😊`;

    const sentMessage = await conn.sendMessage(from, { text: resultMessage }, { quoted: mek });

    // Function to handle user replies for article selection
    const handleUserReply = async (messageUpsert) => {
      const msg = messageUpsert.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
      const messageContext = msg.message.extendedTextMessage.contextInfo;

      // React to user reply
      await conn.sendMessage(from, { react: { text: '👍', key: msg.key } });

      if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
        if (userReply === 'done') {
          conn.ev.off("messages.upsert", handleUserReply);
          return reply("Thank you for using The Hacker News search. Search ended.");
        }

        const articleIndex = parseInt(userReply) - 1;

        if (articleIndex >= 0 && articleIndex < articlesData.data.length) {
          const selectedArticle = articlesData.data[articleIndex];

          // Check if URL exists before making the detailed API call
          if (!selectedArticle.link) {
            return reply("❌ This article has no valid URL.");
          }

          // Fetch detailed article information
          const detailsApiUrl = `https://vishwa-api-production.up.railway.app/misc/the-hacker-news-info?url=${selectedArticle.link}&apikey=${apiKey}`;

          try {
            const detailsResponse = await axios.get(detailsApiUrl);
            const articleDetails = detailsResponse.data;

            let detailsMessage = `📰 *${articleDetails.data.title}*\n\n`;
            detailsMessage += `🕒 *Published:* ${articleDetails.data.date}\n`;
            detailsMessage += `👤 *Author:* ${articleDetails.author}\n`;
            detailsMessage += `🔗 *Link:* ${articleDetails.data.link}\n\n`;
            detailsMessage += `📝 *Description:* ${articleDetails.data.content.replace(/Found this article interesting\? Follow us on Twitter  and LinkedIn to read more exclusive content we post\./, '')}\n\n`;
            detailsMessage += `🖼️ *Tags:* ${articleDetails.data.tags}\n\n`;

            // If an image exists, send it with the article details
            if (articleDetails.data.image && articleDetails.data.image.link) {
              await conn.sendMessage(from, {
                caption: detailsMessage, // Article details as caption
                image: { url: articleDetails.data.image.link }, // Sending image
                quoted: msg
              });
            } else {
              // Send only text if no image
              await conn.sendMessage(from, { text: detailsMessage }, { quoted: msg });
            }

          } catch (detailsError) {
            console.error(`Error fetching detailed article info: ${detailsError.message}`);
            return reply("🚨 An error occurred while fetching article details.");
          }

        } else {
          reply(`❌ Invalid article number. Please choose a number between 1 and ${articlesData.data.length}.`);
        }
      }
    };

    // Add listener to capture user reply for article selection
    conn.ev.on("messages.upsert", handleUserReply);

  } catch (error) {
    console.error(`Error in The Hacker News search: ${error.response ? error.response.data : error.message}`);
    reply(`🚨 An error occurred while fetching articles: ${error.message}`);
  }
});


cmd({
  pattern: "ytsmovie",
  alias: ["ym"],
  desc: "Search for movies on YTS, get details, and download.",
  react: "🎥",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const query = args.join(' ') || "avatar"; // Default search query if none is provided
    const apiKey = "key1"; // Your provided API key
    const apiUrl = `https://vishwa-api-production.up.railway.app/misc/ytsmx?search=${encodeURIComponent(query)}&apikey=${apiKey}`;

    console.log(`API URL: ${apiUrl}`);

    const response = await axios.get(apiUrl);
    const searchData = response.data;

    if (!searchData.data || searchData.data.length === 0) {
      return reply("❌ No movies found for the query.");
    }

    let resultMessage = `*[ 🎬 YTS MOVIE SEARCH RESULT '${query}' 🎉 ]*:\n\n`;
    searchData.data.forEach((movie, index) => {
      resultMessage += `🎥 *${index + 1}.* ${movie.title} (${movie.year})\n`;
      resultMessage += `   Rating: ${movie.rating || 'N/A'} | Genres: ${movie.genres.join(', ')}\n\n`;
    });

    resultMessage += `\n> Reply with the number of the movie you want details for.\n`;
    resultMessage += `> Type 'done' when you're finished.\n`;
    resultMessage += `> BHASHI • MULTI DEVICE-WA-BOT 😊`;

    const sentMessage = await conn.sendMessage(from, { text: resultMessage }, { quoted: mek });

    const handleUserReply = async (messageUpsert) => {
      const msg = messageUpsert.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
      const messageContext = msg.message.extendedTextMessage.contextInfo;

      if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
        if (userReply === 'done') {
          conn.ev.off("messages.upsert", handleUserReply);
          return reply("Thank you for using YTS movie search. Search ended.");
        }

        const movieIndex = parseInt(userReply) - 1;

        if (movieIndex >= 0 && movieIndex < searchData.data.length) {
          const selectedMovie = searchData.data[movieIndex];

          let detailsMessage = `🌟 *${selectedMovie.title}*\n\n`;
          detailsMessage += `📅 *Year:* ${selectedMovie.year}\n`;
          detailsMessage += `🎭 *Genres:* ${selectedMovie.genres.join(', ')}\n`;
          detailsMessage += `⭐ *Rating:* ${selectedMovie.rating}\n\n`;
          detailsMessage += `📝 *Summary:* ${selectedMovie.summary}\n\n`;
          detailsMessage += `🔽 *Download Options:*\n`;

          selectedMovie.torrents.forEach((torrent, index) => {
            detailsMessage += `   ${index + 1}. ${torrent.quality} (${torrent.size})\n`;
          });

          detailsMessage += `\n> Reply with the number of the torrent you want to download.`;

          const detailsMessageSent = await conn.sendMessage(from, {
            text: detailsMessage // Change to text if you want only text
          }, { quoted: msg });

          const handleQualitySelection = async (qualityMsgUpsert) => {
            const qualityMsg = qualityMsgUpsert.messages[0];
            if (!qualityMsg.message || !qualityMsg.message.extendedTextMessage) return;

            const qualityReply = qualityMsg.message.extendedTextMessage.text.trim();
            const qualityContext = qualityMsg.message.extendedTextMessage.contextInfo;

            if (qualityContext && qualityContext.stanzaId === detailsMessageSent.key.id) {
              const qualityIndex = parseInt(qualityReply) - 1;

              if (qualityIndex >= 0 && qualityIndex < selectedMovie.torrents.length) {
                const selectedTorrent = selectedMovie.torrents[qualityIndex];
                const magnetLink = selectedTorrent.magnet_url;

                reply(`🎬 *Selected ${selectedTorrent.quality} version*\n\nHere's the magnet link:\n\n${magnetLink}`);

                // Send the movie file (you need to specify the file path)
                const fileUrl = selectedTorrent.url; // Assuming the torrent URL is the direct file link
                await conn.sendMessage(from, { 
                  document: { url: fileUrl }, 
                  caption: `Here is your movie: ${selectedMovie.title} (${selectedTorrent.quality})` 
                });

                conn.ev.off("messages.upsert", handleQualitySelection);
              } else {
                reply(`❌ Invalid quality number. Please choose a number between 1 and ${selectedMovie.torrents.length}.`);
              }
            }
          };

          conn.ev.on("messages.upsert", handleQualitySelection);
        } else {
          reply(`❌ Invalid movie number. Please choose a number between 1 and ${searchData.data.length}.`);
        }
      }
    };

    conn.ev.on("messages.upsert", handleUserReply);

  } catch (error) {
    console.error(`Error in YTS movie search: ${error.response ? error.response.data : error.message}`);
    reply(`🚨 An error occurred while searching YTS: ${error.message}`);
  }
});
cmd({
  pattern: "sinhalasub",
  alias: ["ss"],
  desc: "Search for movies on SinhalaSubLK, get details, and download.",
  react: "🎬",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const query = args.join(' ') || "harry potter";
    const apiKey = "key1"; // Replace with your actual API key
    const searchUrl = `https://vishwa-api-production.up.railway.app/misc/smovie-search?query=${encodeURIComponent(query)}&apikey=${apiKey}`;

    const searchResponse = await axios.get(searchUrl);
    const searchData = searchResponse.data;

    if (!searchData.data || searchData.data.length === 0) {
      return reply("❌ No movies found for the query.");
    }

    let resultMessage = `*[ 🎊 SINHALASUB.LK SEARCH RESULT '${query}'🎉 ]*:\n\n`;
    searchData.data.forEach((movie, index) => {
      resultMessage += `🎬 *${index + 1}.* ${movie.title}\n`;
      resultMessage += `   Year: ${movie.year || 'N/A'} | Rating: ${movie.rating || 'N/A'}\n\n`;
    });

    resultMessage += `\n> Reply with the number of the movie you want details for.\n`;
    resultMessage += `> Type 'done' when you're finished.\n`;
    resultMessage += `> ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`;

    const thumbnailUrl = 'https://i.ibb.co/2jNJs5q/94d829c1-de36-4b7f-9d4d-f0566c361b61-1.jpg';
    const sentMessage = await conn.sendMessage(from, {
      text: resultMessage,
      contextInfo: {
        externalAdReply: {
          title: "BHASHI-MD SinhalaSubLK Search",
          body: "Your Ultimate Bot Assistant",
          thumbnail: { url: thumbnailUrl },
          mediaType: 2,
          mediaUrl: "https://sinhalasub.lk/"
        }
      }
    }, { quoted: mek });

    const handleUserReply = async (messageUpsert) => {
      const msg = messageUpsert.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
      const messageContext = msg.message.extendedTextMessage.contextInfo;

      if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
        // React to the user's reply
        await conn.sendMessage(from, { react: { text: "🔄", key: msg.key } });

        if (userReply === 'done') {
          conn.ev.off("messages.upsert", handleUserReply);
          await conn.sendMessage(from, { react: { text: "✅", key: msg.key } });
          return reply("Thank you for using SinhalaSubLK search. Search ended.");
        }

        const movieIndex = parseInt(userReply) - 1;

        if (movieIndex >= 0 && movieIndex < searchData.data.length) {
          const selectedMovie = searchData.data[movieIndex];
          const movieDetailsUrl = `https://vishwa-api-production.up.railway.app/misc/smovie-details?url=${encodeURIComponent(selectedMovie.link)}&apikey=${apiKey}`;

          try {
            const detailsResponse = await axios.get(movieDetailsUrl);
            const movieDetails = detailsResponse.data.data;

            let detailsMessage = `🌟 *${movieDetails.title}*\n\n`;
            detailsMessage += `📅 *Release Date:* ${movieDetails.metadata.releaseDate || 'N/A'}\n`;
            detailsMessage += `🌍 *Country:* ${movieDetails.metadata.country || 'N/A'}\n`;
            detailsMessage += `⏱️ *Runtime:* ${movieDetails.metadata.runtime || 'N/A'}\n`;
            detailsMessage += `🎭 *Genres:* ${movieDetails.metadata.genres.join(', ') || 'N/A'}\n`;
            detailsMessage += `⭐ *Rating:* ${movieDetails.rating.value} (${movieDetails.rating.count} votes)\n\n`;
            detailsMessage += `🔽 *Download Options:*\n`;

            movieDetails.downloadLinks.forEach((link, index) => {
              detailsMessage += `   ${index + 1}. ${link.quality} (${link.size})\n`;
            });

            detailsMessage += `\n> Reply with the number of the quality you want to download.`;

            const detailsMessageSent = await conn.sendMessage(from, {
              image: { url: movieDetails.thumbnail },
              caption: detailsMessage,
              contextInfo: {
                externalAdReply: {
                  title: movieDetails.title,
                  body: "Movie Information",
                  thumbnail: { url: movieDetails.thumbnail },
                  mediaType: 2,
                  mediaUrl: movieDetails.fullUrl
                }
              }
            }, { quoted: msg });

            const handleQualitySelection = async (qualityMsgUpsert) => {
              const qualityMsg = qualityMsgUpsert.messages[0];
              if (!qualityMsg.message || !qualityMsg.message.extendedTextMessage) return;

              const qualityReply = qualityMsg.message.extendedTextMessage.text.trim();
              const qualityContext = qualityMsg.message.extendedTextMessage.contextInfo;

              if (qualityContext && qualityContext.stanzaId === detailsMessageSent.key.id) {
                const qualityIndex = parseInt(qualityReply) - 1;

                // React to quality selection
                await conn.sendMessage(from, { react: { text: "🔍", key: qualityMsg.key } });

                if (qualityIndex >= 0 && qualityIndex < movieDetails.downloadLinks.length) {
                  const selectedQuality = movieDetails.downloadLinks[qualityIndex];
                  const downloadLinkUrl = `https://vishwa-api-production.up.railway.app/misc/sdownload-link?url=${encodeURIComponent(selectedQuality.link)}&apikey=${apiKey}`;

                  try {
                    const downloadLinkResponse = await axios.get(downloadLinkUrl);
                    const downloadLink = downloadLinkResponse.data.data.downloadLink;

                    reply(`📥 *Downloading ${selectedQuality.quality}...*`);

                    const fileResponse = await axios.get(downloadLink, { 
                      responseType: 'arraybuffer',
                      headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                      }
                    });

                    // Send the file directly without saving to disk
                    await conn.sendMessage(from, {
                      document: { url: downloadLink },
                      mimetype: 'video/mp4',
                      fileName: `${movieDetails.title.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedQuality.quality}.mp4`
                    }, { quoted: qualityMsg });

                    reply("✅ Download completed.");
                  } catch (error) {
                    console.error(`Error downloading/sending file: ${error.message}`);
                    reply(`❌ Error downloading/sending file: ${error.message}`);
                  }

                  conn.ev.off("messages.upsert", handleQualitySelection);
                } else {
                  reply(`❌ Invalid quality number. Please choose a number between 1 and ${movieDetails.downloadLinks.length}.`);
                }
              }
            };

            conn.ev.on("messages.upsert", handleQualitySelection);
          } catch (error) {
            console.error(`Error fetching movie details: ${error.message}`);
            reply(`❌ Error fetching details for the selected movie: ${error.message}`);
          }
        } else {
          reply(`❌ Invalid movie number. Please choose a number between 1 and ${searchData.data.length}.`);
        }
      }
    };

    conn.ev.on("messages.upsert", handleUserReply);

  } catch (error) {
    console.error(error);
    reply(`🚨 An error occurred while searching SinhalaSubLK: ${error.message}`);
  }
});

cmd({
  pattern: "subdl",
  alias: ["bs"],
  desc: "Search for Baiscope movies related to a query.",
  react: "🎬",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const query = args.join(' ') || "deadpool";
    const apiKey = "key1"; // Replace with your actual API key
    const apiUrl = `https://vishwa-api-production.up.railway.app/misc/baiscope-search?query=${encodeURIComponent(query)}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return reply("❌ No movies found for the query.");
    }

    let resultMessage = `*[ 🎊 BAISCOPE.LK SEARCH RESULT '${query}'🎉 ]*:\n\n`;
    const movieData = data.data;

    movieData.forEach((movie, index) => {
      resultMessage += `🎬 *${index + 1}.* ${movie.title}\n\n`;
    });

    resultMessage += `\n> Reply with the number(s) of the movie(s) you want details for.\n`;
    resultMessage += `> You can request multiple movies by separating numbers with commas.\n`;
    resultMessage += `> Example: 1,3,5\n`;
    resultMessage += `> Type 'done' when you're finished.\n`;
    resultMessage += `> ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`;

    const sentMessage = await conn.sendMessage(from, {
      text: resultMessage,
      contextInfo: {
        externalAdReply: {
          title: "BHASHI-MD Baiscope Search",
          body: "Your Ultimate Bot Assistant",
          sourceUrl: "https://www.baiscope.lk/"
        }
      }
    }, { quoted: mek });

    const handleUserReply = async (messageUpsert) => {
      const msg = messageUpsert.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
      const messageContext = msg.message.extendedTextMessage.contextInfo;

      if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
        if (userReply === 'done') {
          conn.ev.off("messages.upsert", handleUserReply);
          await conn.sendMessage(from, { react: { text: "✅", key: msg.key } });
          return reply("Thank you for using Baiscope search. Search ended.");
        }

        const selectedIndices = userReply.split(',').map(num => parseInt(num.trim()) - 1);

        // React to user's number input
        await conn.sendMessage(from, { react: { text: "🔢", key: msg.key } });

        for (const index of selectedIndices) {
          if (index >= 0 && index < movieData.length) {
            const movie = movieData[index];
            let movieLink = movie.link;

            if (!movieLink.startsWith('http')) {
              movieLink = 'https://www.baiscope.lk' + movieLink;
            }

            const movieDetailsUrl = `https://vishwa-api-production.up.railway.app/misc/baiscope-movie-details?url=${encodeURIComponent(movieLink)}&apikey=${apiKey}`;

            try {
              const detailsResponse = await fetch(movieDetailsUrl);

              if (!detailsResponse.ok) {
                throw new Error(`Failed to fetch movie details: ${detailsResponse.status} ${detailsResponse.statusText}`);
              }

              const detailsData = await detailsResponse.json();

              if (detailsData && detailsData.data) {
                const details = detailsData.data;
                const movieInfoMessage = `🌟 *${details.title || 'N/A'}*\n\n` +
                  `📝 *Summary >* ${details.summary || 'N/A'}\n\n` +
                  `🔗 *Link >* ${details.pageUrl || 'N/A'}\n\n` +
                  `🏷️ *Categories >* ${details.categories ? details.categories.join(', ') : 'N/A'}\n`;

                const sentMovieMessage = await conn.sendMessage(from, {
                  text: movieInfoMessage,
                  contextInfo: {
                    externalAdReply: {
                      title: details.title || 'Movie Information',
                      body: "Movie Information",
                      sourceUrl: details.pageUrl || 'https://www.baiscope.lk/'
                    }
                  }
                }, { quoted: msg });

                if (details.downloadLinks && Array.isArray(details.downloadLinks) && details.downloadLinks.length > 0) {
                  for (const link of details.downloadLinks) {
                    if (link && link.text && link.url) {
                      try {
                        const subtitlesMessage = `🗒️ *Downloading Subtitles* - ${link.text}`;
                        await conn.sendMessage(from, { text: subtitlesMessage }, { quoted: sentMovieMessage });

                        // Directly send subtitle file from the URL
                        const subtitleResponse = await fetch(link.url);
                        if (!subtitleResponse.ok) {
                          throw new Error(`Failed to download subtitle: ${subtitleResponse.status} ${subtitleResponse.statusText}`);
                        }

                        // Send subtitle file directly
                        const subtitleBuffer = await subtitleResponse.buffer();
                        const subtitleFileName = `subtitle_${Date.now()}.srt`;

                        await conn.sendMessage(from, {
                          document: {
                            url: link.url
                          },
                          mimetype: 'text/plain',
                          fileName: subtitleFileName
                        }, { quoted: sentMovieMessage });

                        await conn.sendMessage(from, { text: "✅ Subtitle file sent successfully!" }, { quoted: sentMovieMessage });
                      } catch (error) {
                        console.error(`Error downloading/sending subtitle: ${error.message}`);
                        await conn.sendMessage(from, { text: `❌ Failed to download/send subtitle: ${error.message}` }, { quoted: sentMovieMessage });
                      }
                    }
                  }
                }
              } else {
                reply(`❌ Unable to fetch detailed information for movie number ${index + 1}.`);
              }
            } catch (error) {
              console.error(`Error fetching movie details: ${error.message}`);
              reply(`❌ Error fetching details for movie number ${index + 1}: ${error.message}`);
            }
          } else {
            reply(`❌ Invalid movie number: ${index + 1}`);
          }
        }
      }
    };

    // Add the event listener
    conn.ev.on("messages.upsert", handleUserReply);

  } catch (e) {
    console.error(e);
    reply(`🚨 An error occurred while fetching Baiscope movies: ${e.message}`);
  }
});


cmd({
    pattern: 'ssave',
    desc: 'Saves media from a status or message to your device.',
    category: 'media',
    react: '💾',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Check if a message is quoted
        if (!m.quoted) {
            return reply("Please reply to a status or message with media that you want to save.");
        }

        // Get the quoted message
        const quotedMsg = m.quoted;

        // Check for different types of media
        const mediaType = quotedMsg.type || quotedMsg.mtype;
        let mediaData;
        let fileExtension = '';
        let mimeType = '';

        switch (mediaType) {
            case 'imageMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'jpg';
                mimeType = 'image/jpeg';
                break;
            case 'videoMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'mp4';
                mimeType = 'video/mp4';
                break;
            case 'audioMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'ogg';
                mimeType = 'audio/ogg';
                break;
            case 'documentMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = quotedMsg.fileName ? quotedMsg.fileName.split('.').pop() : 'bin';
                mimeType = quotedMsg.mimetype || 'application/octet-stream';
                break;
            default:
                return reply("The replied message does not contain supported media. Please reply to an image, video, audio, or document.");
        }

        if (!mediaData) {
            return reply("Failed to download the media.");
        }

        // Ensure media directory exists
        const mediaDir = path.join(__dirname, 'media');
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir);
        }

        // Generate a unique filename
        const filename = `ʙʜᴀꜱʜɪ-ᴍᴅ | ${Date.now()}.${fileExtension}`;

        // Save the media to a file
        const filePath = path.join(mediaDir, filename);
        fs.writeFileSync(filePath, mediaData);

        // Send the saved file back to the user
        await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: mimeType, fileName: filename }, { quoted: m });

        reply(`*✅ Status Saved* ${filename}\n\nʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛$`);
        console.log('Media saved successfully');
    } catch (e) {
        console.error('Error executing media saver command:', e);
        reply('⚠️ An error occurred while saving the media.');
    }
});


cmd({
    pattern: "rvideo",
    alias: ["randomvideo"],
    desc: "Fetch and send a random video from Pexels.",
    category: "fun",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
           const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Notify the user that the video is being downloaded
        await conn.sendMessage(from, { text: '⏳ *Please wait, your video is downloading...* ⏳' }, { quoted: mek });

        // Pexels API request to fetch a random video
        const apiUrl = `https://api.pexels.com/videos/search?query=random&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });

        // Check if video data exists
        const video = response.data.videos[0];
        if (!video || !video.video_files || video.video_files.length === 0) {
            return reply("❌ No video files found.");
        }

        // Get the video file link
        const videoUrl = video.video_files[0].link;
        const videoTitle = video.title || 'Random Video';

        // Download the video
        const videoPath = path.join(__dirname, 'tempVideo.mp4'); // Temporary path for the video
        const writer = fs.createWriteStream(videoPath);

        const responseVideo = await axios.get(videoUrl, { responseType: 'stream' });
        responseVideo.data.pipe(writer);

        // Await the completion of file download
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve); // Resolve when writing finishes
            writer.on('error', reject); // Reject if an error occurs
        });

        // Notify the user and send the video after download
        await conn.sendMessage(from, { video: { url: videoPath }, caption: `🎥 *Random Pexels Video* 🎥\n\nTitle: ${videoTitle}\n\n> ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ㋛` }, { quoted: mek });

        // Clean up the downloaded video file
        fs.unlinkSync(videoPath);

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

//======================================================================================================================

//======================================================================================================================

cmd({
    pattern: "wabeta",
    desc: "Get latest WhatsApp beta information",
    category: "utility",
    react: "📱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, isGroup, sender, senderNumber, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }
        const response = await axios.get('https://deliriusapi-official.vercel.app/tools/wabetainfo');
        const betaInfo = response.data.data;

        if (betaInfo && betaInfo.length > 0) {
            let replyMessage = "📢 *Latest WhatsApp Beta Information* 📢\n\n";
            betaInfo.forEach((info, index) => {
                if (index < 5) { // Limit to 5 entries to avoid excessively long messages
                    replyMessage += `*${index + 1}. ${info.title}*\n`;
                    replyMessage += `> 📅*Date*: ${info.date}\n`;
                    replyMessage += `> 🌍*Category*: ${info.category}\n`;
                    replyMessage += `> 💬*Description*: ${info.description}\n`;
                    replyMessage += `> 🌟*More info*: ${info.url}\n\n`;
                }
            });

            await reply(replyMessage);
        } else {
            await reply("No WhatsApp beta information available at the moment.");
        }
    } catch (error) {
        console.error('Error fetching WhatsApp beta information:', error);
        await reply("An error occurred while fetching WhatsApp beta information. Please try again later.");
    }
});

//======================================================================================================================
cmd({
    pattern: "tiktokstalk",
    desc: "Stalk TikTok user details.",
    react: "🎵",
    category: "stalk",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Check if the TikTok username is provided
        if (!q) return reply("🪄 Please provide a TikTok username ✨");

        // Construct the API URL for fetching TikTok user details
        const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/tiktokstalk?username=${q}&apikey=ibrahimtech_ai`;

        // Fetch TikTok user details from the API
        let response = await fetch(apiUrl);
        let result = await response.json();

        // Check if the API response is successful
        if (result.success) {
            const user = result.result.user;
            const stats = result.result.stats;

            let desc = `[ 🏷️ *TIKTOK STALK* 👤 ]\n
> 🏷️ *Username*: ${user.uniqueId}
> 👤 *Nickname*: ${user.nickname}
> 🌍 *Region*: ${user.region}
> 💬 *Bio*: ${user.signature}
> 🌐 *Bio Link*: ${user.bioLink ? user.bioLink.link : "N/A"}
> ✅ *Verified*: ${user.verified ? "Yes" : "No"}
> 📅 *Account Created*: ${new Date(user.createTime * 1000).toLocaleDateString()}

> 👥 *Followers*: ${stats.followerCount}
> 👤 *Following*: ${stats.followingCount}
> ❤️ *Hearts*: ${stats.heartCount}
> 🎥 *Videos*: ${stats.videoCount}
> 🌟 *Friends*: ${stats.friendCount}

*🐱‍💻 Here are the details of the requested TikTok user.*
`;

            // Send the user details with their avatar
            await conn.sendMessage(from, {
                text: desc,
                contextInfo: {
                    externalAdReply: {
                        title: user.nickname,
                        body: `TikTok User Info`,
                        thumbnailUrl: user.avatarLarger, // User's larger avatar
                        sourceUrl: `https://www.tiktok.com/@${user.uniqueId}`, // Link to TikTok profile
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the TikTok user details. Please check the username and try again!");
        }
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
/*cmd({
    pattern: "srepo2",
    desc: "Stalk GitHub repository.",
    react: "🐱‍💻",
    category: "stalk",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Check if the GitHub repository URL is provided
        if (!q) return reply("🪄 Please provide a GitHub repository URL ✨");

        // Construct the API URL for fetching repository details
        const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/repostalk?url=${q}&apikey=ibrahimtech_ai`;

        // Fetch repository details from the API
        let response = await fetch(apiUrl);
        let result = await response.json();

        // Check if the API response is successful and contains the necessary data
        if (result.success && result.repo) {
            const repoDetails = result.repo;  // Assuming 'repo' contains the details

            // Check if the expected properties exist in the response
            if (repoDetails) {
                let desc = `> 🏷️ *Repository*: ${repoDetails.full_name || "N/A"}
> 📄 *Description*: ${repoDetails.description || "N/A"}
> 🌟 *Stars*: ${repoDetails.stars || "N/A"}
> 🍴 *Forks*: ${repoDetails.forks || "N/A"}
> 📅 *Created At*: ${repoDetails.created_at || "N/A"}
> 👨‍💻 *Owner*: ${repoDetails.owner_name || "N/A"}
> 🔗 *URL*: ${repoDetails.repo_url || "N/A"}

*🐱‍💻 Here are the details of the requested repository.*
`;

                // Send the repository details as a message
                await conn.sendMessage(from, {
                    text: desc,
                    contextInfo: {
                        externalAdReply: {
                            title: repoDetails.full_name || "N/A",
                            body: `GitHub Repository Info`,
                            thumbnailUrl: repoDetails.owner_avatar || '', // Assuming API provides the avatar URL
                            sourceUrl: repoDetails.repo_url || '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                });
            } else {
                return reply("❌ Repository details not found. Please check the URL and try again!");
            }
        } else {
            // If the API response fails or does not contain repo details, send an error message
            return reply("❌ Failed to fetch the repository details. Please check the URL and try again!");
        }
    } catch (e) {
        console.log(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});

*/
//=====================================================================================================================

cmd({
    pattern: "igdl",
    desc: "Download Instagram Reels.",
    react: "📥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }
        // Check if the Instagram URL is provided
        if (!q) return reply("🪄 Please provide an Instagram reel URL ✨");

        // Construct the API URL for downloading the Instagram reel
        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(q)}`;

        // Fetch reel details from the API
        let response = await axios.get(apiUrl);
        let result = response.data;

        // Check if the API response contains data
        if (result && result.data && result.data.length > 0) {
            const reelData = result.data[0]; // Assuming the first item is the reel data

            if (reelData) {
                let desc = `*Downloading the Instagram reel for you...*`;

                // Send the reel details as a message
                await conn.sendMessage(from, { text: desc }, { quoted: mek });

                // Check if it's a video and send it
                if (reelData.type === 'video' && reelData.url) {
                    await conn.sendMessage(from, {
                        video: { url: reelData.url },
                        caption: 'Here is your Instagram reel!',
                        contextInfo: {
                            externalAdReply: {
                                title: "Instagram Reel Download",
                                body: `Download your requested Instagram reel`,
                                thumbnailUrl: reelData.thumbnail || '', // Thumbnail URL
                                sourceUrl: reelData.url || '',
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    });
                } else {
                    reply("❌ The requested content is not a video or could not be retrieved.");
                }
            } else {
                return reply("❌ Failed to fetch the reel details. Please try again later!");
            }
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the reel details. Please check the URL and try again!");
        }
    } catch (e) {
        console.error(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "apk",
    desc: "Fetch APK details and send APK file.",
    category: "apk",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, pushname }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        if (!q) {
            return reply("Please provide a package name to search for. Example: `.apk com.whatsapp`");
        }

        const apkurl = `https://prabath-md-api.up.railway.app/api/apkdl?q=${q}&apikey=${sai}`;
        const response = await axios.get(apkurl);
        const data = response.data;

        if (!data || !data.data) {
            return reply("Error: Unable to fetch APK details.");
        }

        const apkData = data.data;
        const apkIcon = apkData.icon;
        const apkName = apkData.name;
        const apkPackage = apkData.package;
        const apkLastUpdate = apkData.lastup;
        const apkSize = apkData.size;
        const apkDownloadLink = apkData.dllink;

        await conn.sendMessage(from, {
            image: { url: apkIcon },
            caption: `乂  𝖡 𝖧 𝖠 𝖲 𝖧 𝖨  𝖠 𝖯 𝖪  𝖣 𝖫

‎  *📥 𝖠𝗉𝗄 𝖭𝖺𝗆𝖾 :* ${apkName}
‎  *🛍️ 𝖯𝖺𝖼𝗄𝖺𝗀𝖾 :* ${apkPackage} 
‎  *📆 𝖫𝖺𝗌𝗍 𝖴𝗉𝖽𝖺𝗍𝖾 :* ${apkLastUpdate} 
‎  *⚙️ 𝖲𝗂𝗓𝖾 :* ${apkSize} MB`,
            footer: 'ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        const filePath = path.join(__dirname, `${apkPackage}.apk`);

        const apkResponse = await axios({
            url: apkDownloadLink,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);

        apkResponse.data.pipe(writer);

        writer.on('error', (err) => {
            console.error(`File write error: ${err.message}`);
            reply(`Error: ${err.message}`);
        });

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: { url: filePath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${apkName}.apk`,
            caption: `ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`,
            footer: 'ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
