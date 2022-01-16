export class Output {
    constructor(public type: OutputType, public message: string) {}
}

export enum OutputType {
    Info = "Info",
    Error = "Error"
}
