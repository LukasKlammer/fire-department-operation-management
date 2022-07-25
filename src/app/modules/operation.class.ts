export class Operation {

  timestamp: number;
  operationNumber: Number;
  address: string;
  city: string;
  keyword: string; // keyword ist das Einsatz-Stichwort: z. B. Wasserschaden
  caller: string;
  phone: string;
  comments: string;
  calltaker: string;
  priority: string[] = ['hoch', 'mittel', 'niedrig'];
  status: string[] = ['offen', 'läuft', 'abgeschlossen'];
  chief: string;
  personal: string;
  vehicles: string[];
  externalVehicles: string;
  notes: string;


  constructor(obj?: any) {
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.operationNumber = obj ? obj.operationNumber : '';
    this.address = obj ? obj.address : '';
    this.city = obj ? obj.city : '';
    this.keyword = obj ? obj.keyword : '';
    this.caller = obj ? obj.caller : '';
    this.phone = obj ? obj.phone : '';
    this.comments = obj ? obj.comments : '';
    this.calltaker = obj ? obj.calltaker : '';
    this.priority = obj ? obj.priority : '';
    this.status = obj ? obj.status : 'Offen';
    this.chief = obj ? obj.chief : '';
    this.personal = obj ? obj.personal : '';
    this.vehicles = obj ? obj.vehicles : '';
    this.externalVehicles = obj ? obj.externalVehicles : '';
    this.notes = obj ? obj.notes : '';
  }


  public toJSON() : any {
    return {
      timestamp: this.timestamp,
      operationNumber: this.operationNumber,
      address: this.address,
      city: this.city,
      keyword: this.keyword,
      caller: this.caller,
      phone: this.phone,
      comments: this.comments,
      calltaker: this.calltaker,
      priority: this.priority,
      status: this.status,
      chief: this.chief,
      personal: this.personal,
      vehicles: this.vehicles,
      externalVehicles: this.externalVehicles,
      notes: this.notes,
    }
  }
}
