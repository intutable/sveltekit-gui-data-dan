import { writable } from "svelte/store"
import type { History } from "./types"

export const historyStore = writable<History>()
