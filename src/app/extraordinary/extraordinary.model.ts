export class Extraordinary {
  public id: number;
  public title: string;
  public body: string;
  public postedOn: number;
  public startDate: number;
  public userProfileId: string;

  constructor(
    id: number,
    title: string,
    body: string,
    postedOn: number,
    startDate: number,
    userProfileId: string
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.postedOn = postedOn;
    this.startDate = startDate;
    this.userProfileId = userProfileId;
  }
}
