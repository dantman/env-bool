const { inspect } = require("util");
const { createMacro, MacroError } = require("babel-plugin-macros");
const envBool = require("..").default;

const describe = (node, depth = 0) => {
	const indent = new Array(depth * 2).fill(" ").join("");

	if (depth >= 5) return `${indent}${node.type} { ... depth exceeded ... }`;

	return (
		`${indent}${node.type} {\n` +
		Object.entries(node)
			.filter(
				([key]) =>
					![
						"type",
						"start",
						"end",
						"loc",
						"leadingComments",
						"innerComments",
						"trailingComments",
					].includes(key)
			)
			.map(([key, value]) => {
				if (typeof value === "object") {
					value = describe(value, depth + 1);
				}

				return `${indent}  ${key} = ${value}`;
			})
			.join("\n") +
		`\n${indent}}`
	);
};

module.exports = createMacro(
	({
		babel: { types: t },
		references: { default: defaultPaths, envBool: boolPaths, envVal: valPaths },
	}) => {
		const getValue = (node) => {
			if (t.isNullLiteral(node)) return null;
			if (t.isIdentifier(node) && node.name === "undefined") return undefined;
			if (t.isBooleanLiteral(node)) return node.value;
			if (t.isStringLiteral(node)) return node.value;
			if (t.isNumericLiteral(node)) return node.value;
			if (t.isUnaryExpression(node)) {
				if (node.operator === "-" && t.isNumericLiteral(node.argument))
					return -getValue(node.argument);
				if (node.operator === "void") return void getValue(node.argument);
			}

			// Member expressions with static objects outputted by bundlers
			if (
				t.isMemberExpression(node) &&
				t.isObjectExpression(node.object) &&
				t.isIdentifier(node.property)
			) {
				const properties = node.object.properties;
				let hasDynamic = false;
				// Iterate backwards since later keys override earlier ones
				for (let i = properties.length - 1; i >= 0; i--) {
					const property = properties[i];
					if (
						!t.isObjectProperty(property) ||
						!t.isStringLiteral(property.key)
					) {
						// We can't statically analyze anything before spread or computed property
						hasDynamic = true;
						break;
					}

					if (property.key.value === node.property.name) {
						return getValue(property.value);
					}
				}

				if (!hasDynamic) {
					// Object has no matching properties so the result is undefined
					return undefined;
				}
			}

			const { line } = node.loc.start;
			throw new MacroError(
				`Unable to get static value of ${node.type} for envBool/macro at line ${line}\n\n` +
					describe(node)
			);
		};

		const toNode = (value) => {
			if (value === null) return t.nullLiteral();
			if (typeof value === "undefined") return t.identifier("undefined");
			if (typeof value === "boolean") return t.booleanLiteral(value);
			if (typeof value === "number") return t.numericLiteral(value);
			throw new Error(`Unexpected envBool return type ${typeof value}`);
		};

		function envBoolNode({ parentPath, node }) {
			if (t.isCallExpression(parentPath)) {
				const mode2 =
					parentPath.node.arguments.length > 1
						? getValue(parentPath.node.arguments[1])
						: true;
				const val = envBool(getValue(parentPath.node.arguments[0]), mode2);
				parentPath.replaceWith(toNode(val));
			} else {
				const { line } = parentPath.node.loc.start;
				throw new MacroError(`Invalid usage of envBool/macro at line ${line}`);
			}
		}

		if (defaultPaths) defaultPaths.forEach(envBoolNode);
		if (boolPaths) boolPaths.forEach(envBoolNode);
	}
);
