let ft = require('node-fetch')

let handler = async ( m, { conn }) => {
let dan = 'Config'
let caption = `
╭─「 Config • Internet 」
│ • EDUKASI TRI [ ✓ ]
│    HC=https://sfile.mobi/3tDpuYNmdqS
│ EHIL=https://sfile.mobi/35ZO4itsE8H
│
│ • EDUKASI AXIS [ ✓ ]
│   HC=https://sfile.mobi/1twZzZaXDeu
│
│ • AXIS GAMMING [ ✓ ]
│   HC=https://sfile.mobi/64FPIXkuxGL
│
│ • AXIS OPOK [ 🤡 ]
│    HC==https://sfile.mobi/1s3ontt50M4
│
「 link • Aplikasi」
│ • HTTP CUSTOM  [ HC ]
│.  = https://bit.ly/2WuKrrn
│ • HTTP INJECTOR LITE  [ EHIL ]
│. = https://bit.ly/38YpJ5J
╰────────────────★᭄ꦿ᭄ꦿ

JIKA ADA CONFIG ERROR!! 
SILAHKAN HUBUNGIN CREATOR!!
`.trim()
conn.sendButtonLoc( m.chat, await ( await ft(fla + dan)).buffer(), caption,
`©Rlp27`, `Pemilik bot`, `.creator`, m) 
}
handler.help = ['Config']
handler.tags = ['internet']
handler.command = /^Config$/i

module.exports = handler
