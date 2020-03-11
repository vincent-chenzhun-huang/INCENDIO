import { Sync } from './Sync';
import { Eventing } from "./Eventings"
import { Attributes } from './Attributes'
import { AxiosResponse } from 'axios';


export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    public events: Eventing = new Eventing()
    public sync: Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users')
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

    set(update: UserProps): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.get('id')
        
        if (typeof id!=='number') {
            throw new Error('Cannot fetch without an id')
        }

        this.sync.fetch(id).then((response: AxiosResponse) => {
            this.set(response.data)
        })
    }

    save(): void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save')
            })
            .catch(() => {
                this.trigger('error')
            })
    }
}