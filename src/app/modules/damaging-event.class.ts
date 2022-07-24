export class DamagingEvent {
  description: string;
  timestamp: number;


  constructor(obj?: any) {
    this.description = obj ? obj.description : '';
    this.timestamp = obj ? obj.timestamp  : new Date().getTime();
  }

  public toJSON() : any {
    return {
      description: this.description,
      timestamp: this.timestamp,
    }
  }

}
