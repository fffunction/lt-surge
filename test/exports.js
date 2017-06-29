import test from 'ava';
import fnName from 'fn-name';
import middleware from '../index';

const expected = [
    'regProjectFinder',
    'underscore',
    'mwl',
    'static',
    'fallback',
    'all',
];

const expectedAll = [
    'projectFinder',
    'underscore',
    'mwl',
    'staticFiles',
    'fallback',
];

test('module has correct exports', t => {
    const exported = Object.keys(middleware);

    t.is(
        exported.length,
        expected.length,
        'the right number of modules are exported'
    );

    expected.forEach(m => {
        t.true(exported.indexOf(m) > -1, `${m} is exported`);
    });
});

test('module.all has correct exports', t => {
    const exported = middleware.all().map(m => fnName(m));

    t.is(
        exported.length,
        expectedAll.length,
        'the right number of modules are exported'
    );

    expectedAll.forEach(m => {
        t.true(exported.indexOf(m) > -1, `${m} is exported`);
    });
});
