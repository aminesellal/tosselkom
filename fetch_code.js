const https = require('https');

const url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2EwY2I1MjhiNDJlNTRhOTg5ODUyYjE2MWI0MmZlMjgzEgsSBxDwzcbIzwIYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzk5NTgyMzQ4MjQzMzQ5MTM2OA&filename=&opi=96797242';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
