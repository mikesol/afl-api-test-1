# Test for AFL

First, package the repo, ie:

```bash
npm install -g pkg
pkg . --target node10-linux-x64
```

Then build AFL with QEMU support. Requires hacking QEMU c files on some systems (like mine). But it works.

Then generate a few test cases based on the JSON schema or something sensible. ie

```json
{"requests":[],:state::0}
{"requests":[{"method": "POST", "headers":{}, "path": "/"}], "state": 0}
```

Then fuzz the shit out of the executable!