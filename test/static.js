import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = './fixtures/static';
let s;

test.before(async t => {
    s = await startServer(projectDir);
});

test.after(t => {
    s.server.close();
});

test(`/textfile.txt loads`, t => {
    return fetch(`http://localhost:${s.port}/textfile.txt`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `this is a text file\n`);
    });
});

test(`/htmlfile.html loads`, t => {
    return fetch(`http://localhost:${s.port}/htmlfile.html`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `this is a html file\n`);
    });
});

test(`/htmlfile loads with implicit .html`, t => {
    return fetch(`http://localhost:${s.port}/htmlfile`)
    .then((res) => res.text())
    .then((body) => {
        t.is(body, `this is a html file\n`);
    });
});
