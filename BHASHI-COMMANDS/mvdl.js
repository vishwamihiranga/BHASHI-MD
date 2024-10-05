const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../DATABASE/functions');
const prabathApi = "6467ad0b29"; // api key
const api = "https://prabath-md-api.up.railway.app/api/"; // base api link


cmd({
    pattern: "cmv",
    desc: "movie",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://cine")) {
            return reply("Please provide the link of the movie.");
        }

        function input(put, from) {
            let [movie, quality = "480p", jid] = put.split(/\s*\|\s*/);

            if (!movie) {
                return reply("Please provide a movie name.\n\nExample: cinesub avatar | 480p | 2715171516151658@g.us");
            }

            const validQualities = ["360p", "480p", "720p", "1080p", "360", "480", "720", "1080"];
            if (!validQualities.includes(quality.toLowerCase())) {
                return reply(`Invalid quality provided.\n\nUse: .cinesub avatar | 360p | 2715171516151658@g.us`);
            }

            if (!jid || (!jid.endsWith("@s.whatsapp.net") && !jid.endsWith("@g.us"))) {
                jid = from;
            }

            return { movie, quality, jid };
        }

        let link;
        const info = input(q, from);

        if (info.movie.startsWith("https://cine")) {
            link = info.movie;
        } else {
            let ddd = await fetchJson(`${api}cinesearch?q=${info.movie}&apikey=${prabathApi}`);
            link = ddd.data.data[0].link;
        }

        let desc = await fetchJson(`${api}cinemovie?url=${link}&apikey=${prabathApi}`);

        let movieTitle = desc.data.mainDetails.maintitle;
        let releaseDate = desc.data.mainDetails.dateCreated;
        let directorName = desc.data.moviedata.director;
        let country = desc.data.mainDetails.country;
        let duration = desc.data.mainDetails.runtime;
        let imdbRating = desc.data.moviedata.imdbRating;
        let qualities = desc.data.dllinks.directDownloadLinks.map(link => `> ${link.quality} (${link.size})`).join("\n");

        let template = `*☘️ ${movieTitle}*\n\n> 📆 *Released* : ${releaseDate}\n> 🎬 *Director* : ${directorName}\n> 🪩 *Country* : ${country}\n> 📻 *Subtitles* : Sinhala HC\n> ⏰ *Duration* : ${duration}\n> 🌟 *Rating* : ${imdbRating}\n\nʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`;

        await conn.sendMessage(info.jid, { image: { url: desc.data.mainDetails.imageUrl }, caption: template });

        function parseSize(sizeStr) {
            let sizeMatch = sizeStr.match(/^([\d.]+)\s*GB$/);
            return sizeMatch ? parseFloat(sizeMatch[1]) : 0;
        }

        function findLinkByInputQuality(inputQuality) {
            let jsonQuality = info.quality;

            if (!jsonQuality) {
                return reply(`❗️ *No data available for quality:* ${inputQuality}`);
            }

            let linkData = desc.data.dllinks.directDownloadLinks.find(link => link.quality.includes(jsonQuality));

            if (linkData) {
                if (parseSize(linkData.size) > 2) {
                    return reply("*❗️ Max size 2GB, cannot send via WhatsApp 😢*( ");
                } else {
                    return linkData;
                }
            } else {
                return reply(`*❗️ No link found for the quality: ${inputQuality}*`);
            }
        }

        let inputQuality = info.quality;
        let result = findLinkByInputQuality(inputQuality);

        let down = await fetchJson(`${api}cinedownload?url=${result.link}&apikey=${prabathApi}`);

        let senddoc = await conn.sendMessage(info.jid, { document: { url: down.data.direct }, mimetype: down.data.mimeType, fileName: down.data.fileName, caption: "ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛" });
        return await conn.sendMessage(info.jid, { react: { text: '🎬', key: senddoc.key } });

    } catch (e) {
        console.log(e);
    }
});

//movie search
cmd({
    pattern: "cs",
    desc: "search movies",
    category: "search",
    react: "🔎",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide the name of the movie");
        }

        let data = await fetchJson(`${api}cinesearch?q=${q}&apikey=${prabathApi}`);
        const allMovies = data.data.data.map((app, index) => {
            return `\`${index + 1}\`\n🎬 *${app.title}*\n🔗 ${app.link}\n\n`;
        });

        const message = `\`[ 🎬 CINESUBZ MOVIE DATABASE 🎬 ]\`\n\n` + allMovies.join('');
        return await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
    }
});

cmd({
    pattern: "cs2",
    desc: "search movies",
    category: "search",
    react: "🔎",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide the name of the movie");
        }

        let data = await fetchJson(`${api}cinesearch?q=${q}&apikey=${prabathApi}`);
        const allMovies = data.data.data.map((app, index) => {
            return `\`${index + 1}\`\n🎬 *${app.title}*\n🔗 ${app.link}\n📅 *Uploaded on:* ${app.uploadedDate || 'N/A'}\n📝 *Type:* ${app.type || 'N/A'}\n⭐ *Rating:* ${app.rating || 'N/A'}\n📅 *Year:* ${app.year || 'N/A'}\n📄 *Description:* ${app.description || 'No description'}\n\n`;
        });

        const message = `\`[ 🎬 CINESUBZ MOVIE DATABASE 🎬 ]\`\n\n` + allMovies.join('');
        return await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return reply("Sorry, there was an error fetching movie data.");
    }
});

cmd({
    pattern: "cs3",
    desc: "search movies",
    category: "search",
    react: "🔎",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide the name of the movie");
        }

        // Search for the movie
        let data = await fetchJson(`${api}cinesearch?q=${q}&apikey=${prabathApi}`);
        const allMovies = await Promise.all(data.data.data.map(async (app, index) => {
            // Fetch movie details (including qualities)
            let desc = await fetchJson(`${api}cinemovie?url=${app.link}&apikey=${prabathApi}`);
            let qualities = desc.data.dllinks.directDownloadLinks.map(link => `> ${link.quality} (${link.size})`).join("\n");

            return `\`${index + 1}\`\n🎬 *${app.title}*\n🔗 ${app.link}\n📅 *Uploaded on:* ${app.uploadedDate || 'N/A'}\n📝 *Type:* ${app.type || 'N/A'}\n⭐ *Rating:* ${app.rating || 'N/A'}\n📅 *Year:* ${app.year || 'N/A'}\n🎞 *Qualities:*\n${qualities}\n\n`;
        }));

        const message = `\`[ 🎬 CINESUBZ MOVIE DATABASE 🎬 ]\`\n\n` + allMovies.join('');
        return await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return reply("Sorry, there was an error fetching movie data.");
    }
});
