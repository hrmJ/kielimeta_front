import { updateField } from './datasetform';

test('updatefield returns an object with a type property', () => {
  expect(updateField('testname', 'testval')).toHaveProperty('type');
});
