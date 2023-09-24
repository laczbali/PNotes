export class ModelBase {
    tableName(): string {
        return `${this.constructor.name}s`;
    }
}
