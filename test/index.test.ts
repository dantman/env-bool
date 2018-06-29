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

	const tests = [
		['1', 1, 1, 1],
		['0', 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],

		[null, null, null, false],
		['null', null, null, false],

		[undefined, undefined, undefined, false],
		['undefined', undefined, undefined, false],
		[void(0), undefined, undefined, false],

		[true, true, true, true],
		['true', true, true, true],

		[false, false, false, false],
		['false', false, false, false],

		['yes', true, true, true],
		['no', false, false, false],

		['on', true, true, true],
		['off', false, false, false],

		['enabled', true, true, true],
		['disabled', false, false, false],

		['', false, '', false],
		['\t', false, '\t', false],
		[' ', false, ' ', false],
		['\n', false, '\n', false],

		['a', false, 'a', false],

		['099', false, '099', false],
		['99', 99, 99, 99],

		['099.9', false, '099.9', false],
		['99.9', 99.9, 99.9, 99.9],

		[-1, -1, -1, -1],
		['-1', -1, -1, -1],

		[-1.1, -1.1, -1.1, -1.1],
		['-1.1', -1.1, -1.1, -1.1],

		['0x11', false, '0x11', false],
		['0b11', false, '0b11', false],
		['0o11', false, '0o11', false],
		['100a', false, '100a', false],

		['\u0001', false, '\u0001', false],

		[{}, {}, {}, false],
		[[], [], [], false],
	];

	tests.forEach(function ([input, expectedBool, expectedVal, expectedBool2])
	{
		describe(`${util.inspect(input)}`, () =>
		{
			it(`envBool: ${util.inspect(expectedBool)}, mode2 = false`, function ()
			{
				let actual = envBool(input, false);
				expect(actual).to.be.deep.equal(expectedBool);
			});

			it(`envVal: ${util.inspect(expectedVal)}`, function ()
			{
				let actual = envVal(input);
				expect(actual).to.be.deep.equal(expectedVal);
			});

			if (typeof expectedBool2 !== 'undefined')
			{
				it(`envBool: ${util.inspect(expectedBool2)}, mode2 = true`, function ()
				{
					let actual = envBool(input, true);
					expect(actual).to.be.deep.equal(expectedBool2);

					// ---------------

					let actual2 = envBool(input);
					expect(actual2).to.be.deep.equal(expectedBool2);
				});
			}
		});
	});
});
