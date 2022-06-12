import { v4 as uuidv4 } from 'uuid';

export type SerializedTask = {
  id: string;
  title: string;
};

export class Task {
  static serialize = (task: Task): SerializedTask => {
    return {
      id: task.getIdentifier(),
      title: task.getTitle(),
    };
  };

  static deserialize = (serializedTask: SerializedTask): Task => {
    return new Task(serializedTask.title, serializedTask.id);
  };

  private readonly id: string;
  private title: string;

  constructor(taskTitle: string, id?: string) {
    this.id = id || uuidv4();
    this.title = taskTitle;
  }

  getIdentifier() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }
}
