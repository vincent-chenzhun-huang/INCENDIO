import axios, { AxiosResponse } from 'axios'


interface UserProps {
    id?: number
    name?: string
    age?: number
}

type Callback = () => void


export class User {
    events: { [key: string]: Callback[] } = {}      


    constructor(private data: UserProps) {}

    get(propName: string): (number | string) {
        return this.data[propName]
    }

    set(update: UserProps): void {
        Object.assign(this.data, update)
    }

    on(eventName: string, callback: Callback):void {
        /*
        - first, get the handlers for this event, if there is no handler, set handler to []
        - add the callback function to the list of handlers
        - update the list of callback handlers for this event
        */ 
        const handlers = this.events[eventName] || []
        handlers.push(callback)
        this.events[eventName] = handlers
    }

    trigger(eventName: string): void {
        /*
        - get the list of handlers for this eventName
        - if it's empty, do nothing
        - if not, call the callback functions one by one
        */
        const handlers = this.events[eventName]

        if (!handlers || handlers.length === 0) {
            return
        }

        handlers.forEach(callback => {
            callback()
        })
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
          .then((response: AxiosResponse): void => {
              this.set(response.data)
          })
    }

}