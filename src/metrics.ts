import LevelDB = require('./leveldb')
import WriteStream from 'level-ws'

export class Metric {
  public timestamp: string
  public value: number
  public username: string

  constructor(ts: string, v: number, u: string) {
    this.timestamp = ts
    this.value = v
    this.username = u
  }
}

export class MetricsHandler {
  public db: any

  constructor(dbPath: string) {
    this.db = LevelDB.LevelDB.open(dbPath)
  }

  public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
    const stream = WriteStream(this.db)
    stream.on('error', callback)
    stream.on('close', callback)
    metrics.forEach((m: Metric) => {
      stream.write({ key: `metric:${key}:${m.timestamp}:${m.username}`, value: m.value })
    })
    stream.end()
  }

  /*
  public get(callback: (error: Error | null, result?: Metric[]) => void) {
    const result = [
      new Metric('2013-11-04 14:00 UTC', 12),
      new Metric('2013-11-04 14:30 UTC', 15)
    ]
    callback(null, result)
  }
  */

  public getOne(key: number, callback: (error: Error | null, result: any) => void) {
    let metrics: Metric[] = []
    this.db.createReadStream()
      .on('data', function (data) {
        //console.log(data.key, '=', data.value)

        let key2: number = data.key.split(":")[1]
        if (key == key2) {
          let timestamp: string = data.key.split(':')[2]
          let username: string = data.key.split(':')[3]
          let metric: Metric = new Metric(timestamp, data.value, username)
          metrics.push(metric)
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        callback(err, null)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, metrics)
      })
  }

  public getAllWithUsername(usrname: string, callback: (error: Error | null, result: any) => void) {
    let metrics: Metric[] = []
    this.db.createReadStream()
      .on('data', function (data) {
        //console.log(data.key, '=', data.value)

        let timestamp: string = data.key.split(':')[2]
        let username: string = data.key.split(':')[3]
        if (usrname === username) {
          let metric: Metric = new Metric(timestamp, data.value, username)
          metrics.push(metric)
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        callback(err, null)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, metrics)
      })
  }
/*
  public getAll(callback: (error: Error | null, result: any) => void) {
    let metrics: Metric[] = []
    this.db.createReadStream()
      .on('data', function (data) {
        console.log(data.key, '=', data.value)

        let timestamp: string = data.key.split(':')[2]
        let username: string = data.key.split(':')[3]
        let metric: Metric = new Metric(timestamp, data.value, username)

        metrics.push(metric)
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        callback(err, null)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, metrics)
      })
  }*/

  public deleteOne(key: number, timestamp: any, username: string) {
    this.db.del(`metric:${key}:${timestamp}:${username}`)
  }

  public deleteTimeStamp(timestamp: any, data: any, username: string) {
    //console.log("delete time stamp", timestamp," ",data," ",username)
    for (let t = 0; t < data.length; t++) {
      this.db.del(`metric:${data[t].key}:${timestamp}:${username}`)
    }
  }

  public deleteId(key: number, data: any, username: string) {
    for (let t = 0; t < data.length; t++) {
      this.db.del(`metric:${key}:${data[t].timestamp}:${username}`)
    }
  }
}
