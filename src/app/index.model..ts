import { DaysDTO } from "./daysDTO.model";

export class Index {
  public daysDTO: DaysDTO;

  constructor(
    daysDTO: DaysDTO
  ) {
    this.daysDTO = daysDTO;
  }
}
