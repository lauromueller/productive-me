import { SerializedTask, Task } from '../models';
import { LocalStoragePersistentStorage } from './localStoragePersistentStorage';

const mockTask: SerializedTask = { id: '123', title: 'Mock task' };

describe('tests the localStoragePersistentStorage behavior', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should correctly load tasks from the localStorage tasks key', async () => {
    localStorage.setItem('tasks', JSON.stringify([mockTask]));

    const localStoragePersistentStorage = new LocalStoragePersistentStorage();
    const allTasks = await localStoragePersistentStorage.fetchAllTasks();

    expect(allTasks).toHaveLength(1);
    expect(allTasks[0].getIdentifier()).toBe(mockTask.id);
  });

  it('should correctly store tasks in the localStorage tasks key', async () => {
    const myTask = new Task('persisted task');

    const localStoragePersistentStorage = new LocalStoragePersistentStorage();
    await localStoragePersistentStorage.saveAllTasks([myTask]);

    const persistedTasks = await localStoragePersistentStorage.fetchAllTasks();
    expect(persistedTasks).toHaveLength(1);
    expect(persistedTasks[0].getTitle()).toBe('persisted task');
  });
});
