import { PluginLoader } from "@intutable/core"
import { RegisterComponentsRequest } from "./types"

/**
 * Registers the data-dan-gui UI components in the gui-es plugin in Core.
 * @param {PluginLoader} plugins Plugin loader object from Core
 */
export async function init(plugins: PluginLoader): Promise<void> {
    const request: RegisterComponentsRequest = {
        channel: "gui-es",
        method: "registerComponents",
        plugin: "data-dan-gui",
        components: [
            {
                name: "EditorComponent",
                title: "DataDan Editor",
                dimensions: { minWidth: 20, minHeight: 12 },
            },
            {
                name: "HistoryComponent",
                title: "DataDan History",
                dimensions: { minWidth: 20, minHeight: 12 },
            },
        ],
    }

    await plugins.request(request)
}
