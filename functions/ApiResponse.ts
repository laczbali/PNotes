export class ApiResponse extends Response {

    constructor(body: any = null, status: number = 200) {
        super(JSON.stringify(body), { status: status });

        this.AddCorsHeaders();
    }

    private AddCorsHeaders() {
        // TODO: if we are in development mode, allow all origins
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        this.headers.set('Access-Control-Allow-Headers', '*');
    }
}
