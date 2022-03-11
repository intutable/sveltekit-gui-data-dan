import { CoreRequest } from "@intutable/core"

export interface RegisterComponentsRequest extends CoreRequest {
    plugin: string
    components: Component[]
}

export interface Component {
    name: string
    title: string
    dimensions?: Dimensions
}

export interface Dimensions {
    minWidth?: number
    minHeight?: number
}
