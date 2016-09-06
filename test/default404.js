import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = './fixtures/default404';
let s;

test.before(async t => {
    s = await startServer(projectDir);
});

test.after(t => {
    s.server.close();
});

test(`root returns default 404`, t => {
    return fetch(`http://localhost:${s.port}`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `Page Not Found`);
    });
});

test(`unknown path returns default 404`, t => {
    return fetch(`http://localhost:${s.port}/unknown`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `Page Not Found`);
    });
});
