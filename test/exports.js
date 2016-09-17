import test from 'ava';
import middleware from '../index';

const expected = [
    'regProjectFinder',
    'setup',
    'underscore',
    'mwl',
    'static',
    'fallback',
    'all',
];

test('module has correct exports', (t) => {
    const exported = Object.keys(middleware);

    t.is(exported.length, expected.length, 'the right number of modules are exported');

    expected.forEach((m) => {
        t.truthy(exported.indexOf(m) > -1, `${m} is exported`);
    });

});
