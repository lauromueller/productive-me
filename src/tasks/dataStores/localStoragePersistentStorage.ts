import { SerializedTask, Task } from '../models';

export interface ITasksPersistentStorage {
  fetchAllTasks: () => Promise<Task[]>;
  saveAllTasks: (tasks: Task[]) => Promise<void>;
}

export class LocalStoragePersistentStorage implements ITasksPersistentStorage {
  fetchAllTasks = async () => {
    const jsonTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return jsonTasks.map((task: SerializedTask) => Task.deserialize(task));
  };

  saveAllTasks = async (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks.map((task) => Task.serialize(task))));
  };
}
