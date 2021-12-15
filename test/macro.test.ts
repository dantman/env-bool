import plugin from "babel-plugin-macros";
import pluginTester from "babel-plugin-tester";
import { expect } from "chai";
import { inspect } from "util";

// Make pluginTester work with mocha
(global as any).expect = expect;

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

const success: [
	source: string,
	expectedBool: number | null | undefined | boolean,
	expectedVal: number | null | undefined | boolean | string,
	expectedBool2: number | null | undefined | boolean
][] = [
	[`"1"`, 1, 1, 1],
	[`"0"`, 0, 0, 0],
	[`1`, 1, 1, 1],
	[`0`, 0, 0, 0],

	[`null`, null, null, false],
	[`"null"`, null, null, false],

	[`undefined`, undefined, undefined, false],
	[`"undefined"`, undefined, undefined, false],
	[`void 0`, undefined, undefined, false],

	[`true`, true, true, true],
	[`"true"`, true, true, true],

	[`false`, false, false, false],
	[`"false"`, false, false, false],

	[`"yes"`, true, true, true],
	[`"no"`, false, false, false],

	[`"on"`, true, true, true],
	[`"off"`, false, false, false],

	[`"enabled"`, true, true, true],
	[`"disabled"`, false, false, false],

	[`"NULL"`, null, null, false],
	[`"UNDEFINED"`, undefined, undefined, false],
	[`"TRUE"`, true, true, true],
	[`"FALSE"`, false, false, false],
	[`"YES"`, true, true, true],
	[`"NO"`, false, false, false],
	[`"ON"`, true, true, true],
	[`"OFF"`, false, false, false],
	[`"ENABLED"`, true, true, true],
	[`"DISABLED"`, false, false, false],

	[`""`, false, "", false],
	[`"\\t"`, false, "\t", false],
	[`" "`, false, " ", false],
	[`"\\n"`, false, "\n", false],

	[`"a"`, false, "a", false],

	[`"099"`, false, "099", false],
	[`"99"`, 99, 99, 99],

	[`"099.9"`, false, "099.9", false],
	[`"99.9"`, 99.9, 99.9, 99.9],

	[`-1`, -1, -1, -1],
	[`"-1"`, -1, -1, -1],

	[`-1.1`, -1.1, -1.1, -1.1],
	[`"-1.1"`, -1.1, -1.1, -1.1],

	[`"0x11"`, false, "0x11", false],
	[`"0b11"`, false, "0b11", false],
	[`"0o11"`, false, "0o11", false],
	[`"100a"`, false, "100a", false],

	[`"\\u0001"`, false, "\u0001", false],

	// WebPack generates code like this for process.env.*
	[`({"REACT_APP_VAR":"on"}).REACT_APP_VAR`, true, true, true],
	[`({"REACT_APP_VAR":true}).REACT_APP_VAR`, true, true, true],
	[`({"REACT_APP_VAR":"on"}).UNUSED_VAR`, undefined, undefined, false],
	[`({"REACT_APP_VAR":true}).UNUSED_VAR`, undefined, undefined, false],
];

pluginTester({
	plugin,
	babelOptions: { filename: __filename },
	title: "envBool/macro",
	tests: success.map(([source, expectedBool, expectedVal, expectedBool2]) => ({
		title: `envBool(${source})`,
		code: `import envBool from '../macro'; envBool(${source});`,
		output: inspect(expectedBool2) + ";",
	})),
});

pluginTester({
	plugin,
	babelOptions: { filename: __filename },
	title: "envBool/macro (mode2)",
	tests: success.map(([source, expectedBool, expectedVal, expectedBool2]) => ({
		title: `envBool(${source}, false)`,
		code: `import envBool from '../macro'; envBool(${source}, true);`,
		output: inspect(expectedBool2) + ";",
	})),
});

pluginTester({
	plugin,
	babelOptions: { filename: __filename },
	title: "envBool/macro (mode1)",
	tests: success.map(([source, expectedBool, expectedVal, expectedBool2]) => ({
		title: `envBool(${source}, false)`,
		code: `import envBool from '../macro'; envBool(${source}, false);`,
		output: inspect(expectedBool) + ";",
	})),
});

pluginTester({
	plugin,
	babelOptions: { filename: __filename },
	title: "envBool/macro (named)",
	tests: success.map(([source, expectedBool, expectedVal, expectedBool2]) => ({
		title: `envBool(${source})`,
		code: `import { envBool } from '../macro'; envBool(${source});`,
		output: inspect(expectedBool2) + ";",
	})),
});
