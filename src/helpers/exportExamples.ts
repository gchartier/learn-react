// Individual exported members
export const foo = 'foo';

// Direct import/export from another module (single member)
// This is often done for organizational purposes, 
//  such as the root import of a library module.
export { map } from 'lodash';

// Direct import/export from another module (all members)
export * from '@chakra-ui/react';

// default export
const defaultExport = { foo, bar: 'bar' };
export default defaultExport;
