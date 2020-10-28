export class DaysDTO {
    public id: number;
    public body: string;
    public rateDay: number;

    constructor(
        id: number,
        body: string,
        rateDay: number
      ) {
        this.id = id;
        this.body = body;
        this.rateDay = rateDay;
      }
}