import { User } from './models/User'

const user = new User({ name: 'myname', age: 20})

user.on("change", ()=>{
    console.log('hello')
})

user.on('change', ()=>{
    console.log('hello2')
})

user.trigger('change')
