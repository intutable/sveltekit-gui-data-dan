import { CoreRequest } from "@intutable/core"

export interface PluginUI {
    components?: Component[]
    menuItems?: MenuItem[]
}

export interface Component {
    name: string
    title: string
    dimensions?: Dimensions
}

export interface Dimensions {
    minWidth?: number,
    minHeight?: number
}

export interface MenuItem {
    name: string
    menu: string
}

export interface RegisterUiRequest extends CoreRequest, PluginUI {
    plugin: string
}
