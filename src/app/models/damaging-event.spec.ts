import { DamagingEvent } from './damaging-event.class';

describe('DamagingEvent', () => {
  it('marks a newly created event as open so incoming POCSAG alarms are assigned immediately', () => {
    expect(new DamagingEvent().areOpenOperations).toBeTrue();
  });

  it('preserves the stored open-operation state for an existing event', () => {
    expect(new DamagingEvent({ areOpenOperations: false }).areOpenOperations).toBeFalse();
  });
});
