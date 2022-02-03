import { Core, EventSystem } from "@intutable/core"
import * as path from "path"
import { RegisterUiRequest } from "../../src/plugin/types"

let events: EventSystem
let requestObject: RegisterUiRequest | undefined
let requestHandler: jest.Mock

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

        expect(requestObject?.components).toEqual(
            [
                {
                    name: "EditorComponent",
                    title: "DataDan Editor",
                    dimensions: { minWidth: 20, minHeight: 12 }
                },
                {
                    name: "HistoryComponent",
                    title: "DataDan History",
                    dimensions: { minWidth: 20, minHeight: 12 }
                }
            ]
        )
    })
})

async function createCore() {
    await Core.create([path.join(__dirname, "../../")], events)
}
