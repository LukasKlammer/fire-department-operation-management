export class FirestationRoster {
  /**
   * Physical arrangement of the vehicles in the fire-station overview.
   * A null cell deliberately leaves an empty position in the two-column grid.
   */
  public static readonly rows: ReadonlyArray<ReadonlyArray<string | null>> = [
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
  ];

  public static readonly vehicles: ReadonlyArray<string> = [
    'Lüfter', 'Kommando', 'Leiter', 'Lösch', 'Tank 1', 'Atem', 'Tank 2',
    'Rüst', 'GSF', 'Deko', 'MTF 3', 'Kleinrüst', 'KTF 1', 'KTF 4',
    'MTF 2', 'MTF 1', 'KTF 3', 'KTF 2', 'Last', 'Kleinlast',
  ];

  /**
   * Replaces retired vehicle names with the current roster. Vehicles assigned
   * to an ongoing operation remain unavailable after the migration.
   */
  public static migrateAvailableVehicles(
    availableVehicles: readonly string[] | null | undefined,
    assignedVehicles: readonly string[] = [],
  ): string[] {
    const available = new Set(availableVehicles || []);
    const assigned = new Set(assignedVehicles);

    return this.vehicles.filter((vehicle) => !assigned.has(vehicle) &&
      (available.has(vehicle) || !this.isCurrentRoster(availableVehicles)));
  }

  public static isCurrentRoster(vehicles: readonly string[] | null | undefined): boolean {
    return (vehicles || []).every((vehicle) => this.vehicles.includes(vehicle));
  }
}
