import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = 'test/fixtures/static';
let s;

test.before(() => {
    return startServer(projectDir)
        .then(server => {
            s = server;
            return server;
        })
        .catch(console.log);
});

test.after(() => {
    s.server.close();
});

test('/textfile.txt loads', t => {
    return fetch(`http://localhost:${s.port}/textfile.txt`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `this is a text file\n`);
        });
});

test('/htmlfile.html loads', t => {
    return fetch(`http://localhost:${s.port}/htmlfile.html`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `this is a html file\n`);
        });
});

test('/htmlfile loads with implicit .html', t => {
    return fetch(`http://localhost:${s.port}/htmlfile`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `this is a html file\n`);
        });
});

test('/dir loads redirects to /dir/ and loads /dir/index.html', t => {
    return fetch(`http://localhost:${s.port}/dir`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `index.html\n`);
        });
});
