let ft = require('node-fetch')

let handler = async ( m, { conn }) => {
let dan = 'Donasi'
let caption = `
╭─「 Donasi • Pulsa 」
│ • Telkomsel [ nothing ]
│ • OVO [ 0895372305081 ]
│   • Dana [ 0895372305081 ]
│   • Paypal [ 62895372305081 ]
╰────

DONASI SEIKLASNYA SAJA YA!
`.trim()
conn.sendButtonLoc( m.chat, await ( await ft(fla + dan)).buffer(), caption,
`©Rlp27`, `Pemilik bot`, `.creator`, m) 
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
