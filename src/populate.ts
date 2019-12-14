import { Metric, MetricsHandler } from '../src/metrics'
import { User,UserHandler } from '../src/user'

const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 1,"neil"),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 2,"neil"),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 3,"neil"),
  new Metric(`${new Date('2013-11-04 14:45 UTC').getTime()}`, 4,"neil2"),
  new Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 5,"neil2")
]
const usr = [
  new User("neil","a@gmail.com","dev",false),
  new User("neil2","b@gmail.com","ops",false)
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
  dbUsr.deleteUsr(u,(err: Error | null) => {
    if (err) throw err
    console.log('User deleted, rip')
  })
})