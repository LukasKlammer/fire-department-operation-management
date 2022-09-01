export class DamagingEvent {
  description: string;
  timestamp: number;
  customIdName: string;
  areOpenOperations: boolean;


  constructor(obj?: any) {
    this.description = obj ? obj.description : '';
    this.timestamp = obj ? obj.timestamp  : new Date().getTime();
    this.customIdName = obj ? obj.customIdName  : '';
    this.areOpenOperations = obj ? obj.areOpenOperations : false;
  }

  public toJSON() : any {
    return {
      description: this.description,
      timestamp: this.timestamp,
      customIdName: this.customIdName,
      areOpenOperations: this.areOpenOperations,
    }
  }

}
