import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'
import del = require('del')
import fs = require('fs')

export class LevelDB {
  static open(path: string) {
    const encoded = encoding(leveldown(path), { valueEncoding: 'json' })
    return levelup(encoded)
  }

  static clear(path: string) {
    if (fs.existsSync(path)) {
      del.sync(path, { force: true })
    }
  }
}


/*
const db = levelup(encoding(
  leveldown("path"),
  { valueEncoding: 'json' })
)

// Write
import WriteStream from 'level-ws'
const ws = WriteStream(db);

ws.on('error', function (err) {
  console.log('Oh my!', err)
})
ws.on('close', function () {
  console.log('Stream closed')
})
ws.write({ key: 'occupation', value: 'Clown' })
ws.end()

// Read
const rs = db.createReadStream()
  .on('data', function (data) {
    console.log(data.key, '=', data.value)
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream ended')
  })
*/