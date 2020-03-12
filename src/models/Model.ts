import { AxiosPromise, AxiosResponse } from 'axios'


interface ModelAttributes<T> {
    set(value: T): void
    getAll(): T
    get<K extends keyof T>(key: K): T[K]
    /*
        Look at the Interface T(UserProps): return the value at the key: K
        K can only be the keys of T (name, age, id)
        this will always == the instance of the property
    */ 
}


interface Sync<T> {
    fetch(id: number): AxiosPromise
    save(data: T): AxiosPromise
}

interface Events {
    on(eventName: string, callback: () => void): void
    trigger(eventName: string): void
}

interface HasId {
    id?: number
}


export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ){}
    /* If initialized inside the brackets of the constructor, the compilation will be in order,
        if not, the snippet below will be before the initialization of attributes, events and sync, therefore
        raising an error.
    */

    on = this.events.on
    trigger = this.events.trigger
    get = this.attributes.get

    set(update: T): void {
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