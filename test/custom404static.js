import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = 'test/fixtures/custom404static';
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

test('existing files are served', t => {
    return fetch(`http://localhost:${s.port}/found`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `found\n`);
        });
});

test('root is not found', t => {
    return fetch(`http://localhost:${s.port}`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `not found\n`);
        });
});

test('unknown path returns 404.html', t => {
    return fetch(`http://localhost:${s.port}/unknown`)
        .then(res => res.text())
        .then(body => {
            t.is(body, `not found\n`);
        });
});
