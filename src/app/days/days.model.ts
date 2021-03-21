export class Days {
  public id: number;
  public body: string;
  public rateDay: number;
  public postedOn: number;
  public startDate: number;
  
  constructor(
    id: number,
    body: string,
    rateDay: number,
    postedOn: number,
    startDate: number
  ) {
    this.id = id;
    this.body = body;
    this.rateDay = rateDay;
    this.postedOn = postedOn;
    this.startDate = startDate;
  }
}
