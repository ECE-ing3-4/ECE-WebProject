import chai, { expect } from 'chai'
import { User, UserHandler } from './user'
import { LevelDB } from "./leveldb"

const dbPath: string = 'dbTEST/users'
var dbUsr: UserHandler

describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbUsr = new UserHandler(dbPath)
  })

  after(function () {
    dbUsr.db.close()
  })

  describe('#get USER', function () {
    it('should get empty array on non existing group', function () {
      dbUsr.get("neilTEST", (err: Error | null, result?: User) => {
        //LA PREMIERE LIGNE CAUSE L'ASSERTION ERROR
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
      })
    })
  })

  describe('#save', function () {
    it('should save data', function () {
      var usr = new User("neil", "a@gmail.com", "abc", false)
      dbUsr.save(usr, (err: Error | null) => {
        expect(err).to.be.null
        dbUsr.get("neil", (err: Error | null, result?: User) => {
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          if (result)
            expect(result[0].value).to.equal("a@gmail.com:abc")
        })
      })
    })
    it('should update data', function () {
      var usr = new User("neil", "a@gmail.com", "abcde", false)
      dbUsr.save(usr, (err: Error | null) => {
        expect(err).to.be.null
        dbUsr.get("neil", (err: Error | null, result?: User) => {
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          if (result)
            expect(result[0].value).to.equal("a@gmail.com:abcde")
        })
      })
    })
  })
  describe('#delete', function () {
    it('should delete data', function () {
      var usertest: any = { password: 'abcde', username: 'neil', email: 'a@gmail.com' }
      dbUsr.delete(usertest, (err: Error | null) => {
        expect(err).to.be.null
      })
      dbUsr.get("neil", (err: Error | null, result?: User) => {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        if (result)
          expect(result[0].value).to.equal("a@gmail.com:abcde")
      })
    })
  })
})