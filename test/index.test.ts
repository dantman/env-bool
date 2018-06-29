/**
 * Created by user on 2018/6/29/029.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import envBool, { envVal } from '../index';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

// @ts-ignore
describe(relative(__filename), () =>
{
	[

		['1', 1, 1],
		['0', 0, 0],
		[1, 1, 1],
		[0, 0, 0],

		[null, null, null],
		['null', null, null],

		[undefined, undefined, undefined],
		['undefined', undefined, undefined],
		[void(0), undefined, undefined],

		[true, true, true],
		['true', true, true],

		[false, false, false],
		['false', false, false],

		['yes', true, true],
		['no', false, false],

		['on', true, true],
		['off', false, false],

		['enabled', true, true],
		['disabled', false, false],

		['', false, ''],
		['\t', false, '\t'],
		[' ', false, ' '],
		['\n', false, '\n'],

		['a', false, 'a'],

		['099', false, '099'],
		['99', 99, 99],

		['099.9', false, '099.9'],
		['99.9', 99.9, 99.9],

		[-1, -1, -1],
		['-1', -1, -1],

		[-1.1, -1.1, -1.1],
		['-1.1', -1.1, -1.1],

		['0x11', false, '0x11'],
		['0b11', false, '0b11'],
		['0o11', false, '0o11'],
		['100a', false, '100a'],

		['\u0001', false, '\u0001'],

	].forEach(function ([input, expectedBool, expectedVal])
	{
		describe(`${util.inspect(input)}`, () =>
		{
			it(`envBool: ${util.inspect(expectedBool)}`, function ()
			{
				let actual = envBool(input);
				expect(actual).to.be.deep.equal(expectedBool);
			});

			it(`envVal: ${util.inspect(expectedVal)}`, function ()
			{
				let actual = envVal(input);
				expect(actual).to.be.deep.equal(expectedVal);
			});
		});
	});
});
