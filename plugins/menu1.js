let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┏ ┅ ━━━〔 %me 〕━━━ ┅ ━
┃❖ Halo, %name!
┃ 
┃❖ Tanggal: *%week %weton,*
┃                 *%date*
┃❖ Tanggal Islam: *%dateIslamic*
┃❖ Waktu: *%jam* WIB
┃
┃ ❖ Tersisa *%limit Limit*
┃ ❖ Role *%role*
┃ ❖ Level *%level (%exp / %maxexp)* 
┃[%xp4levelup]
┃ ❖ %totalexp XP secara Total
┃
┃ ❖ Uptime: *%uptime (%muptime)*
┃ ❖ Database: %rtotalreg dari %totalreg
┃
┗ ┅ ━━━━━━━━━━━ ┅ ━★᭄ꦿ᭄ꦿ

┏ ┅ ━〔 NOTE 〕┅ ━
┃ ❖ *DATA KAMU TIDAK AKAN* 
┃ *TERSIMPAN DI DATABASE BOT*
┃ ❖ *JADI GUNAKAN BOT*
┃  *DENGAN DENGAN BIJAK*
┃  *MELANGGAR ? BLOK🗿!*
┗ ┅ ━━━━━━━━━━ ┅ ━★᭄ꦿ᭄ꦿ
%readmore`.trimStart(),
  header: '┏ ┅ ━〔 %category 〕',
  body: '┃❖ %cmd %islimit %isPremium',
  footer: '┗ ┅ ━━★᭄ꦿ᭄ꦿ\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, text, command }) => {
  //let user = global.DATABASE.data.users[m.sender]
  //avtar = await conn.getProfilePicture(conn.user.jid)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'rpg', 'randomimage', 'kingdom', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'photooxy', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'rpg': 'Rpg',
    'kingdom': 'Kingdom',
    'sticker': 'Stiker',
    'randomimage': 'Random image',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'photooxy': 'Photooxy',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
  	 "description": "\nI Want To Use Game",
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'rpg') tags = {
  	'rpg': 'RpG'
  }
  if (teks == 'kingdom') tags = {
  	'kingdom': 'Kingdom'
  }
if (teks == 'randomimage') tags = {
  	'randomimage': 'Random image'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'photooxy') tags = {
  	'photooxy': 'Photooxy'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
  "description": "\nI Want To Use Jadibot",
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.DATABASE.data.users[m.sender].name : conn.getName(m.sender)
    //Module Jam
    let jam = moment.tz('Asia/Jakarta').format('HH:mm')
    let wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    let wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE.data.users).length
    let rtotalreg = Object.values(global.DATABASE.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `
┏ ┅ ━〔  ۩๖ۣۜℜLƤ27 〕┅ ━
┃
┃ ❖ ${ucapan()}
┃ _Halo_, *${name}*
┃ ❖ _Jam_ *${jam} WIB*
┃
┃ ❖ _Tanggal_ : *${dateIslamic}*
┗ ┅ ━━━━━━━━━━━━ ┅ ━★᭄ꦿ᭄ꦿ

┏ ┅〔 NOTE 〕┅ ━
┃ ❖ *JIKA BOT DELAY*
┃ ❖ *JANGAN SPAM!!*
┗ ┅ ━━━━━━━ ┅ ━★᭄ꦿ᭄ꦿ
`.trim(),
          "description": "_Perbaiki shalatmu maka tuhan akan perbaiki hidupmu_",
          "buttonText": "Klik Disini",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `Semua Perintah`,
                  "description": "*_Untuk Membuka Semua menu_*",
                  "rowId": ".? all"
                }, {
                  "title": "Game",
                  "description": "*_Untuk Membuka menu game_*",
                  "rowId": ".? game"
               }, {
                  "title": "Rpg",
                  "description": "*_Membangun Pertanian*_",
                  "rowId": ".? rpg"
                  }, {
                  "title": "Kingdom",
                  "description": "*_Membangun kerajaan_*",
                  "rowId": ".? kingdom"
                }, {
                  "title": "XP",
                  "description": "*_Untuk Menambahkan Level Mu di bot_*",
                  "rowId": ".? xp"
               }, {
                  "title": "photooxy",
                  "description": "*_Untuk membikin Teks Ber-Gambar_*",
                  "rowId": ".? photooxy"
                }, {
                  "title": "Stiker",
                  "description": "*_Untuk Mem-Bikin sticker WhatsApp_*",
                  "rowId": ".? stiker"
                }, {
                  "title": "Kerang Ajaib",
                  "description": "*_Apakah Kamu ada pertanyaan? tanyakan kpd saya:v_*",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "Quotes",
                  "description": "*_Kata-Kata Bulshit🗿_*",
                  "rowId": ".? quotes"
                }, {
                  "title": "Admin",
                  "description": "*_Menu untuk admin grup_*",
                  "rowId": ".? admin"
                }, {
                  "title": "Grup",
                  "description": "*_Menu untuk anggota grup_*",
                  "rowId": ".? grup"
                }, {
                  "title": "Premium",
                  "description": "*_Menu untuk pengguna premium_*",
                  "rowId": ".? premium"
                }, {
                  "title": "Internet",
                  "description": "*_Kamu nyari sesuatu? Klik saya:v_*",
                  "rowId": ".? internet"
                }, {
                  "title": "Anonymous",
                  "description": "*_Untuk chatan ,tapi tanpa identitas_*",
                  "rowId": ".? anonymous"
                }, {
                  "title": "Nulis & Logo",
                  "description": "*_Pembuat logo& tugas otomatis_*",
                  "rowId": ".? nulis"
                }, {
                  "title": "Downloader",
                  "description": "*_Menu download semua sosmed_*",
                  "rowId": ".? downloader"
                }, {
                  "title": "Tools",
                  "description": "*_Perintah Tersembunyi bot_*",
                  "rowId": ".? tools"
                }, {
                  "title": "Fun",
                  "description": "*_Fitur kesenangan ☺️_*",
                  "rowId": ".? fun"
                }, {
                  "title": "Database",
                  "description": "*_Mau nyimpen file? share ke saya_*",
                  "rowId": ".? database"
                }, {
                  "title": "Vote & Absen",
                  "description": "*_vote luring/daring?_*",
                  "rowId": ".? vote"
                }, {
                  "title": "Al-Qur\'an",
                  "description": "*أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ*",
                  "rowId": ".? quran"
                }, {
                  "title": "Pengubah Suara",
                  "description": "*_Mau ngubah suara apa?_*",
                  "rowId": ".? audio"
                }, {
                  "title": "Jadi Bot",
                  "description": "*_Kamu mau Jadi bot?_*",
                  "rowId": ".? jadibot"
                }, {
                  "title": "Info",
                  "description": "_*Info tentang bot_*",
                  "rowId": ".? info"
                }, {
                  "title": "Tanpa Kategori",
                  "description": "*_menu tersembunyi_*",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "Owner",
                  "description": "*_Menu khusus owner😏_*",
                  "rowId": ".? owner"
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, jam, wit, wita, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
   //conn.send2Button(m.chat, text.trim(), `•Laksmana.27•`, `Owner`,`.owner`, `Donasi`, `.donasi`, m)
    conn.send3ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), 'Laksmana.27', 'Pemilik Bot🤖', '.owner', 'Config Internet🌐', '.config', 'Donasi😏', '.donasi',m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari🌌"
  if (time >= 4) {
    res = "Selamat pagi🌄"
  }
  if (time > 10) {
    res = "Selamat siang☀️"
  }
  if (time >= 15) {
    res = "Selamat sore🌅"
  }
  if (time >= 18) {
    res = "Selamat malam🌆"
  }
  return res
}
