import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = './fixtures/underscore';
let s;

test.before(async t => {
    s = await startServer(projectDir);
});

test.after(t => {
    s.server.close();
});

test(`/_file1 should 404`, t => {
    return fetch(`http://localhost:${s.port}/_file1`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `Page Not Found`);
    });
});

test(`/file2 returns file2.html`, t => {
    return fetch(`http://localhost:${s.port}/file2`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `file2\n`);
    });
});

test(`/_files/file3 should 404`, t => {
    return fetch(`http://localhost:${s.port}/_files/file3`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `Page Not Found`);
    });
});
