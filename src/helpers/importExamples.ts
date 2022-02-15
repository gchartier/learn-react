// Named imports
// Often the most effective at optimizing
//  (only importing the things you need)
import { foo, map, Box } from './exportExamples';

// Importing the default export
// If you're only using some members of the module (eg. lodash),
//  you probably want to avoid this for production code.
import defaultExport from './exportExamples';

// Aliased imported member
// Useful if the named import is vague
// Example: date-fns "format" could be renamed "dateFormat"
import { foo as foo2 } from './exportExamples';

// All members imported (except default)
// If you're only using some members of the module (eg. lodash),
//  you probably want to avoid this for production code.
import * as exportedMembers from './exportExamples';

// Effect import
// If you just need the code in the module to run once.
import './exportExamples';

// Named imports
console.log(foo); // 'foo'
console.log(map); // fn
console.log(Box); // component object

// Importing the default export
console.log(defaultExport); // { foo: 'foo', bar: 'bar' }

// Aliased imported member
console.log(foo2); // 'foo'

// All members imported (except default)
console.log(exportedMembers.foo); // 'foo'
console.log(exportedMembers.map); // fn
console.log(exportedMembers.Box); // component object

// At least one export is required
export const requiredExport = null;
