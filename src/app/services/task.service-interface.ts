export interface TaskServiceInterface {
  month: number;
  year: number;

  getTaskIndexData(username: string, target: string, year: number, month: number);

}
