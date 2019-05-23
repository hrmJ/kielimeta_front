import { PrepopulationAction } from './formSelectPrepopulation';

describe('prepopulationAction', () => {
  it('should set the valueName property on construction', () => {
    const testAction = new PrepopulationAction('test_values');
    expect(testAction.valueName).toBe('TESTVALUES');
  });
});
