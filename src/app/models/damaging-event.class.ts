export class DamagingEvent {
  description: string;
  timestamp: number;
  customIdName: string;


  constructor(obj?: any) {
    this.description = obj ? obj.description : '';
    this.timestamp = obj ? obj.timestamp  : new Date().getTime();
    this.customIdName = obj ? obj.customIdName  : '';
  }

  public toJSON() : any {
    return {
      description: this.description,
      timestamp: this.timestamp,
      customIdName: this.customIdName,
    }
  }

}
