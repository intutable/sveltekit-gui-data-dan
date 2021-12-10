import { PluginLoader } from "@intutable/core"

export async function init(plugins: PluginLoader) {
    await plugins.request({
        channel: "gui-es",
        method: "registerUi",
        plugin: "data-dan-gui",
        components: ["PluginComponent"],
    })
}
