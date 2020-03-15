import { Model } from './../models/Model'

export abstract class View<T extends Model<K>, K> {

    regions: { [key: string]: Element } = {}

    constructor(public parent: Element, public model: T) {
        this.bindModel()
    }

    eventsMap(): { [key: string]: () => void } {
        return {}
    }

    onRender(): void {

    }

    abstract template(): string

    regionsMap(): {[ key: string]: string} {
        /* */
        return {}
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render()
        })
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap()

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':')

            fragment.querySelectorAll(selector).forEach( (element) => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap()

        for (let key in regionsMap) {
            const selector = regionsMap[key]
            const element = fragment.querySelector(selector) // extract the element of the desired region
            if (element) {
                this.regions[key] = element // 
            }
        }
    }


    render(): void {
    /* 
        Call 'render' method
            |
        Render calls 'template', gets HTML string 
            |
        Render inserts HTML string into a template element
            |
        Bind event handlers to the HTML in the template element
            |
        Call 'regionMap' for list of regions that need to be created
            |
        Render method populates values in 'regions'
            |
        Insert new 'child' views in those regions
            |
        Render inserts content of template into DOM
    */
        this.parent.innerHTML = ''

        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template()
        this.bindEvents(templateElement.content)
        this.mapRegions(templateElement.content)

        this.onRender()

        this.parent.append(templateElement.content)
    }
}