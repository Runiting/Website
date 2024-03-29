export function get(endpoint, fn = fetch) {
    return fn(endpoint, {
        method: 'GET',
        credentials: 'include'
    }).then((r) => r.json()).then(r => {
        if (r.body.pass) {
            return r;
        } else {
            throw r;
        }
    });
}

export function post(endpoint, data, fn = fetch) {
    return fn(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    });
}