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
                title: "DataDan Editor" ,
                dimensions: { minWidth: 20, minHeight: 12 }
            },
            {
                name: "HistoryComponent",
                title: "DataDan History" ,
                dimensions: { minWidth: 20, minHeight: 12 }
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
