import { FirestationRoster } from './firestation-roster';

describe('FirestationRoster', () => {
  it('uses the vehicle roster and arrangement shown in the fire-station overview', () => {
    expect(FirestationRoster.rows).toEqual([
      ['Lüfter', 'Kommando'],
      [null, 'Tank 1'],
      [null, 'Leiter'],
      ['Lösch', 'Tank 2'],
      ['Atem', 'Kleinrüst'],
      ['MTF 3', 'Rüst'],
      ['KTF 2', 'KTF 4'],
      ['MTF 2', 'MTF 1'],
      ['KTF 3', 'KTF 1'],
      ['GSF', 'Deko'],
      ['Last', 'Kleinlast'],
    ]);
  });

  it('removes retired vehicle names and adds every newly introduced vehicle once', () => {
    const legacyVehicles = [
      'Lüfter', 'Kommando', 'Fahrzeug 7', 'Strom', 'Leiter', 'Lösch',
      'Tank 1', 'Atem', 'Tank 3', 'Rüst', 'Voraus', 'Fahrzeug 1',
      'Tank 2', 'Fahrzeug 5', 'Fahrzeug 4', 'Fahrzeug 2', 'Fahrzeug 3',
      'GSF', 'Deko', 'Last 1', 'Last 2'
    ];

    expect(FirestationRoster.migrateAvailableVehicles(legacyVehicles)).toEqual([
      'Lüfter', 'Kommando', 'Leiter', 'Lösch', 'Tank 1', 'Atem', 'Tank 2',
      'Rüst', 'GSF', 'Deko', 'MTF 3', 'Kleinrüst', 'KTF 1', 'KTF 4',
      'MTF 2', 'MTF 1', 'KTF 3', 'KTF 2', 'Last', 'Kleinlast'
    ]);
  });

  it('does not return vehicles currently assigned to an operation as available', () => {
    const legacyVehicles = [
      'Lüfter', 'Kommando', 'Fahrzeug 7', 'Strom', 'Leiter', 'Lösch',
      'Tank 1', 'Atem', 'Tank 3', 'Rüst', 'Voraus', 'Fahrzeug 1',
      'Tank 2', 'Fahrzeug 5', 'Fahrzeug 4', 'Fahrzeug 2', 'Fahrzeug 3',
      'GSF', 'Deko', 'Last 1', 'Last 2'
    ];

    expect(FirestationRoster.migrateAvailableVehicles(legacyVehicles, ['Tank 1']))
      .toEqual(['Lüfter', 'Kommando', 'Leiter', 'Lösch', 'Atem', 'Tank 2',
        'Rüst', 'GSF', 'Deko', 'MTF 3', 'Kleinrüst', 'KTF 1', 'KTF 4',
        'MTF 2', 'MTF 1', 'KTF 3', 'KTF 2', 'Last', 'Kleinlast']);
  });
});
