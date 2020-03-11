import { User } from "./models/User"

const user = new User({ 
    id: 1,
    name: "another name"
 })

user.events.on('save', () => {
    console.log(user)
    console.log('user has been saved')
})

user.save()
