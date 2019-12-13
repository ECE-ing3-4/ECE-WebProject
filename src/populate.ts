import { Metric, MetricsHandler } from '../src/metrics'
import { User,UserHandler } from '../src/user'

const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12,"neil"),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10,"neil"),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8,"neil")
]
const usr = [
  new User("neil","a@gmail.com","abc",false),
  new User("neil2","a@gmail.com","abc",false)
]

const db = new MetricsHandler('./db/metrics')
const dbUsr = new UserHandler('./db/users')

db.save(0, met, (err: Error | null) => {
  if (err) throw err
  console.log('Metrics populated')
})

usr.forEach((u: User) => {
  dbUsr.save(u, (err: Error | null) => {
    if (err) throw err
    console.log('User populated')
  })
})