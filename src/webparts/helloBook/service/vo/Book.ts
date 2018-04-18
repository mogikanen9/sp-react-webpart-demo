export class Book {
    constructor(readonly isbn?: string, readonly name?: string, 
        readonly description?: string, readonly pubDate?: Date) { }
}