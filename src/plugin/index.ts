import { PluginLoader } from "@intutable/core"
import { RegisterUiRequest } from "./types"

export async function init(plugins: PluginLoader) {
    const request: RegisterUiRequest = {
        channel: "gui-es",
        method: "registerUi",
        plugin: "data-dan-gui",
        components: [
            {
                name: "PluginComponent",
                title: "DataDan" ,
                dimensions: { minWidth: 20, minHeight: 10 }
            }
        ]
    }

    await plugins.request(request)
}
