export class NoAvailableDataError extends Error {
    constructor(data: string) {
        super(`Could not get ${data}`)
    }
}