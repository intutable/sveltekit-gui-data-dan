import { CoreRequest, CoreResponse } from "@intutable/core"

export interface Component {
    name: string
    title: string
}

export interface RegisterUiRequest extends CoreRequest {
    plugin: string
    components: Component[]
}
