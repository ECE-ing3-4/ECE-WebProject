import { LevelDB } from "./leveldb"
import WriteStream from 'level-ws'

export class User {
  public username: string
  public email: string
  private password: string = ""

  constructor(username: string, email: string, password: string, passwordHashed: boolean = false) {
    this.username = username
    this.email = email

    if (!passwordHashed) {
      this.setPassword(password)
    } else this.password = password
  }

  static fromDb(username: string, value: any): User {
    const [password, email] = value.split(":")
    console.log(new User(username, email, password))
    return new User(username, email, password)
  }

  public setPassword(toSet: string): void {
    // Hash and set password
    this.password = toSet
    //this.db.put(`user:${this.username}`, `${this.password}:${this.email}`, (err: Error | null) => {})
  }

  public getPassword(): string {
    return this.password
  }

  public validatePassword(toValidate: String): boolean {
    // return comparison with hashed password
    return this.password === toValidate
  }
}


export class UserHandler {
  public db: any

  public get(username: string, callback: (err: Error | null, result?: User) => void) {
    this.db.get(`user:${username}`, function (err: Error, data: any) {
      //console.log("data: ",data)
      if (err) callback(err)
      else if (data == undefined) callback(null, data)
      else callback(null, User.fromDb(username, data))
    })
  }

  public save(bodyReq: any, callback: (err: Error | null) => void) {
    var user = new User(bodyReq.username,bodyReq.email,bodyReq.password,false)
    this.db.put(`user:${user.username}`, `${user.getPassword()}:${user.email}`, (err: Error | null) => {
      callback(err)
    })
  }

  public delete(bodyReq: any, callback: (err: Error | null) => void) {
    var user = new User(bodyReq.username,bodyReq.email,bodyReq.password,false)
    console.log(bodyReq.username, " will be deleted")
    this.db.del(`user:${user.username}`, `${user.getPassword()}:${user.email}`, (err: Error | null) => {
      callback(err)
    })
  }

  constructor(path: string) {
    this.db = LevelDB.open(path)
  }
}