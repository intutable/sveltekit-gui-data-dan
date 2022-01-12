import { CoreRequest, CoreResponse } from "@intutable/core"

export interface Component {
    name: string
    title: string
    dimensions?: Dimensions
}

export interface Dimensions {
    minWidth?: number,
    minHeight?: number
}

export interface RegisterUiRequest extends CoreRequest {
    plugin: string
    components: Component[]
}
