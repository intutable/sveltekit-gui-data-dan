import { Core, CoreRequest, EventSystem } from "@intutable/core"
import * as path from "path"

let events: EventSystem
let requestObject: GuiRequest | undefined
let requestHandler: jest.Mock

export interface GuiRequest extends CoreRequest {
    plugin: string
    components: string[]
}

beforeAll(async () => {
    events = new EventSystem()
    requestObject = undefined
    requestHandler = jest.fn(request => {
        requestObject = request
        return Promise.resolve({ success: true })
    })
})

describe("plugin registration", () => {
    test("sends registerUi request", async () => {
        events.listenForRequests("gui-es", "registerUi", requestHandler)
        await createCore()

        expect(requestHandler).toHaveBeenCalled()
    })

    test("registers plugin name", async () => {
        events.listenForRequests("gui-es", "registerUi", requestHandler)
        await createCore()

        expect(requestObject?.plugin).toBe("data-dan-gui")
    })

    test("registers gui components", async () => {
        events.listenForRequests("gui-es", "registerUi", requestHandler)
        await createCore()

        expect(requestObject?.components).toEqual(["PluginComponent"])
    })
})

async function createCore() {
    await Core.create([path.join(__dirname, "../../")], events)
}
