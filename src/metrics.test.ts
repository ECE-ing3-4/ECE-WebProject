import chai, { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db-tests-metrics'
var dbMet: MetricsHandler// = new MetricsHandler(dbPath)

describe('Metrics', function () {
  before(function () {
    console.log("ON LANCE LES TESTS !!!")
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  after(function () {
    dbMet.db.close()
  })

  describe('#get metric', function () {
    it('should get empty array on non existing group', function () {
      dbMet.getOne(0, (err: Error | null, result?: Metric[]) => {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        //expect(result).to.be.empty
      })
    })
  })

  describe('#save metric', function () {
    it('should save data', function () {
      var metrics: Metric[] = []
      var n
      metrics.push(new Metric("123456789", 15,"neil"))
      dbMet.save(0, metrics, (err: Error | null) => {
        expect(metrics).to.not.be.empty
        dbMet.getOne(0, function (err: Error | null, result?: Metric[]) {
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          if (result)
          n=result[0].value
          //console.log("VALEUR1 ",n)
          expect(n).to.equal(15)
        })
      })
    })
    it('should update data', function () {
      var metrics: Metric[] = []
      var n
      metrics.push(new Metric("123456789", 16,"neil"))
      dbMet.save(0, metrics, (err: Error | null) => {
        expect(metrics).to.not.be.empty
        dbMet.getOne(0, function (err: Error | null, result?: Metric[]) {
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          if (result)
            n=result[0].value
            //console.log("VALEUR2 ",n)
            expect(n).to.equal(16)
        })
      })
    })
  })

  describe('#delete metric', function () {
    it('should delete data', function () {
      var time: any = "123456789"
      dbMet.deleteOne(0, time,"neil")
      dbMet.getOne(0, function (err: Error | null, result?: Metric[]) {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        console.log("RESULT",result)
        expect(result).to.be.empty
      })
    })
    it('should not fail if data does not exist', function () {
      var time: any = "123456789"
      dbMet.deleteOne(0, time,"neil")
    })
  })
})