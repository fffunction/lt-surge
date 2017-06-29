import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = 'test/fixtures/mwl';
let s;

test.before(() => {
    return startServer(projectDir).then(server => {
        s = server;
        return server;
    });
});

test.after(() => {
    s.server.close();
});

test('/html loads', t => {
    return fetch(`http://localhost:${s.port}/html`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `html\n`);
        });
});

test('/html.html loads', t => {
    return fetch(`http://localhost:${s.port}/html.html`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `html\n`);
        });
});

test('/jade 404s', t => {
    return fetch(`http://localhost:${s.port}/jade`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});

test('/jade.jade 404s', t => {
    return fetch(`http://localhost:${s.port}/jade.jade`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});

test('/sass 404s', t => {
    return fetch(`http://localhost:${s.port}/sass`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});

test('/sass.sass 404s', t => {
    return fetch(`http://localhost:${s.port}/sass.sass`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});

test('/coffee 404s', t => {
    return fetch(`http://localhost:${s.port}/coffee`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});

test('/coffee.coffee 404s', t => {
    return fetch(`http://localhost:${s.port}/coffee.coffee`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'Page Not Found');
        });
});
