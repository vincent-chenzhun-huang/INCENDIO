import { User } from "./models/User"

const user = new User({ 
    name: "another name",
    age: 1234
 })

user.set({
    name: "NAME",
    age: 100
})

user.save()