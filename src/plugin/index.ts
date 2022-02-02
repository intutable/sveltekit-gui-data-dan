import { PluginLoader } from "@intutable/core"
import { RegisterUiRequest } from "./types"

export async function init(plugins: PluginLoader) {
    const request: RegisterUiRequest = {
        channel: "gui-es",
        method: "registerUi",
        plugin: "data-dan-gui",
        components: [
            {
                name: "EditorComponent",
                title: "DataDan" ,
                dimensions: { minWidth: 20, minHeight: 10 }
            }
        ],
        menuItems: [
            {
                name: "SortColumn",
                menu: "column"
            }
        ]
    }

    await plugins.request(request)
}
