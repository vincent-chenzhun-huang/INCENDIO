import { User } from "./models/User"

const user = new User({ 
    name: "another name",
    age: 1234
 })

user.events.on('change', () => {
    console.log('Hi')
})

user.events.trigger('change')

user.save()