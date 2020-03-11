export class Attributes<T> {
    constructor(private data: T) {

    }

    get = <K extends keyof T>(key: K): T[K] => {
        /*
        Look at the Interface T(UserProps): return the value at the key: K
        K can only be the keys of T (name, age, id)
        this will always == the instance of the property
        */ 
        return this.data[key]
    }

    set(update: T): void {
        Object.assign(this.data, update)
    }

    getAll(): T {
        return this.data
    }
}
