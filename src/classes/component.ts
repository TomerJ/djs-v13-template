import ComponentType from "@typings/component";

export class Component {
    constructor(componentOptions: ComponentType) {
        Object.assign(this, componentOptions);
    }
}
