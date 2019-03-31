export class Important {
  public id: number;
  public title: string;
  public body: string;
  public made: number;
  public postedOn: number;
  public startDate: number;
  public userProfileId: string;

  constructor(
    id: number,
    title: string,
    body: string,
    made: number,
    postedOn: number,
    startDate: number,
    userProfileId: string
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.made = made;
    this.postedOn = postedOn;
    this.startDate = startDate;
    this.userProfileId = userProfileId;
  }
}
