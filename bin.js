const Ajv = require("ajv");
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
const USELESS_ERROR = 0;
if (!input) {
    console.log("No input");
    process.exit(USELESS_ERROR);
}
try {
    input = JSON.parse(input);
} catch {
    console.log("can't parse "+input);
    process.exit(USELESS_ERROR);
}
const schema = {
    type: "object",
    required: ["requests", "state"],
    properties: {
        requests: {
            type: "array",
            items: {
                type: "object",
                required: ["path", "headers", "method"],
                properties: {
                    path: { type: "string" },
                    headers: {
                        type: "object",
                        additionalProperties: { type: "string" }
                    },
                    method: {
                        type: "string",
                        enum: ["GET", "POST"]
                    },
                    body: {
                        type: "object",
                        additionalProperties: true
                    }
                }
            }
        },
        state: {
            type: "integer"
        }
    }
}
try {
    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    var validate = ajv.compile(schema);
    var valid = validate(input);
    if (!valid) {
        console.log(validate.errors);
        process.exit(USELESS_ERROR);
    }
} catch {
    console.log("can't use error");
    process.exit(USELESS_ERROR);
}

// We simulate a bug where the state does not increment
// for any value above 42.

const posts = input.requests.map(i => i.method == "POST").length;

if ((posts + input.state) > 42) {
    process.abort();
}