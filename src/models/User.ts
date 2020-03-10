import { Sync } from './Sync';
import { Eventing } from "./Eventings"
import { Attributes } from './Attributes'


export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    public events: Eventing = new Eventing()
    public sync: Sync<UserProps> = new Sync<UserProps>('')
    public attributes: Attributes<UserProps>
    constructor(attrs: UserProps) {
        /* 
        Because we need input to construct an object, we do it in the constructor
        */
        this.attributes = new Attributes<UserProps>(attrs)
    }

    get on() {
        /* return a function and redirect to the on function in Sync */
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    get get() {
        return this.attributes.get
    }
}