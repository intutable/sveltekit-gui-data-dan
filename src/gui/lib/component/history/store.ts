import { writable } from "svelte/store"

export const historyStore = creatHistoryStore()

function creatHistoryStore() {
    const { subscribe, update } = writable(0)

    return {
        subscribe,
        refresh: () => update(value => value + 1)
    }
}
