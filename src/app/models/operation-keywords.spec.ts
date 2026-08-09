import { OperationKeywords } from './operation-keywords';

describe('OperationKeywords', () => {
  it('uses the renamed decision keyword', () => {
    expect(OperationKeywords.values).toContain('ENTSCHEIDUNG EINSATZ LNZ ANRUFEN');
    expect(OperationKeywords.values).not.toContain('ENTSCHEIDUNG EINSATZ');
  });

  it('replaces the former uninjured-vehicle-accident keyword with both new options', () => {
    expect(OperationKeywords.values).toContain('VU OHNE VERLETZTE PERSONEN');
    expect(OperationKeywords.values).toContain('VU MIT VERLETZTEN PERSONEN');
    expect(OperationKeywords.values).not.toContain('VU OHNE EINGEKLEMMTE PERSON');
  });
});
