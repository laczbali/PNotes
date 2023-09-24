import { ModelBase } from "./ModelBase";

export class Log extends ModelBase {

    constructor(level: 'debug' | 'info' | 'warn' | 'error', message: string, error: Error = null) {
        super();

        this.CreatedAt = Date.now();
        this.Level = level;
        this.Message = message;
        this.Error = error ? error.stack : null;
    }

    CreatedAt: number;
    Level: 'debug' | 'info' | 'warn' | 'error';
    Message: string;
    Error: string;
}
