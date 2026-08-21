import { Operation } from './operation.class';

describe('Operation Piepser-Text', () => {
  it('starts empty so the form can show its placeholder', () => {
    expect(new Operation().piepserText).toBe('');
  });

  it('persists the Piepser-Text with the operation', () => {
    const operation = new Operation({ piepserText: 'POCSAG-Testmeldung' });
    expect(operation.toJSON().piepserText).toBe('POCSAG-Testmeldung');
  });
});
