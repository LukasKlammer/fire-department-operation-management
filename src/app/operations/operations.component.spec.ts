import { OperationsComponent } from './operations.component';

describe('OperationsComponent display text', () => {
  let component: OperationsComponent;
  beforeEach(() => { component = Object.create(OperationsComponent.prototype); });
  it('uses Piepser-Text when both address and city are empty', () => {
    expect(component.getOperationLocation({ address: '', city: '', piepserText: 'LNZ FW TEST' } as any))
      .toBe('LNZ FW TEST');
  });

  it('uses the address and city when location data is present', () => {
    expect(component.getOperationLocation({ address: 'Hauptstraße 1', city: 'Bruneck', piepserText: 'LNZ FW TEST' } as any))
      .toBe('Hauptstraße 1, Bruneck');
  });
});
