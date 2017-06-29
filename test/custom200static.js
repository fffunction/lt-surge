import test from 'ava';
import fetch from 'node-fetch';
import startServer from './helpers';

const projectDir = 'test/fixtures/custom200static';
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

test('root returns 200.html', t => {
    return fetch(`http://localhost:${s.port}`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'hello world\n');
        });
});

test('unknown path returns 200.html', t => {
    return fetch(`http://localhost:${s.port}/unknown`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'hello world\n');
        });
});

test("200.html doesn't clobber otherpage.html", t => {
    return fetch(`http://localhost:${s.port}/otherpage`)
        .then(res => res.text())
        .then(body => {
            t.is(body, 'other page\n');
        });
});

test('404.html acts like a normal page', t => {
    return fetch(`http://localhost:${s.port}/404`)
        .then(res => res.text())
        .then(body => {
            t.is(body, '404\n');
        });
});
