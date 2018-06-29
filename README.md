# env-bool README

    env value to JS value, check env val is boolean or others

```ts
import envBool, { envVal } from 'env-bool';
```

```ts
  test\index.test.ts
    '1'
      √ envBool: 1
      √ envVal: 1
    '0'
      √ envBool: 0
      √ envVal: 0
    1
      √ envBool: 1
      √ envVal: 1
    0
      √ envBool: 0
      √ envVal: 0
    null
      √ envBool: null
      √ envVal: null
    'null'
      √ envBool: null
      √ envVal: null
    undefined
      √ envBool: undefined
      √ envVal: undefined
    'undefined'
      √ envBool: undefined
      √ envVal: undefined
    undefined
      √ envBool: undefined
      √ envVal: undefined
    true
      √ envBool: true
      √ envVal: true
    'true'
      √ envBool: true
      √ envVal: true
    false
      √ envBool: false
      √ envVal: false
    'false'
      √ envBool: false
      √ envVal: false
    'yes'
      √ envBool: true
      √ envVal: true
    'no'
      √ envBool: false
      √ envVal: false
    'on'
      √ envBool: true
      √ envVal: true
    'off'
      √ envBool: false
      √ envVal: false
    'enabled'
      √ envBool: true
      √ envVal: true
    'disabled'
      √ envBool: false
      √ envVal: false
    ''
      √ envBool: false
      √ envVal: ''
    '\t'
      √ envBool: false
      √ envVal: '\t'
    ' '
      √ envBool: false
      √ envVal: ' '
    '\n'
      √ envBool: false
      √ envVal: '\n'
    'a'
      √ envBool: false
      √ envVal: 'a'
    '099'
      √ envBool: false
      √ envVal: '099'
    '99'
      √ envBool: 99
      √ envVal: 99
    '099.9'
      √ envBool: false
      √ envVal: '099.9'
    '99.9'
      √ envBool: 99.9
      √ envVal: 99.9
    -1
      √ envBool: -1
      √ envVal: -1
    '-1'
      √ envBool: -1
      √ envVal: -1
    -1.1
      √ envBool: -1.1
      √ envVal: -1.1
    '-1.1'
      √ envBool: -1.1
      √ envVal: -1.1
    '0x11'
      √ envBool: false
      √ envVal: '0x11'
    '0b11'
      √ envBool: false
      √ envVal: '0b11'
    '0o11'
      √ envBool: false
      √ envVal: '0o11'
    '100a'
      √ envBool: false
      √ envVal: '100a'
    '\u0001'
      √ envBool: false
      √ envVal: '\u0001'
```
