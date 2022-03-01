import { v4 as uuidv4 } from 'uuid';

export class Task {
  private readonly id: string;
  private title: string;

  constructor(taskTitle: string) {
    this.id = uuidv4();
    this.title = taskTitle;
  }

  getIdentifier() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }
}
