export class Extraordinary {
  public id: number;
  public title: string;
  public body: string;
  public postedOn: number;
  public startDate: number;

  constructor(
    id: number,
    title: string,
    body: string,
    postedOn: number,
    startDate: number
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.postedOn = postedOn;
    this.startDate = startDate;
  }
}
