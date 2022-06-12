import { Task } from './task';

describe('tests the Task class', () => {
  it('should keep the id when calling serialize and deserialize in sequence', () => {
    const task = new Task('my title');
    const serializedTask = Task.serialize(task);
    const deserializedTask = Task.deserialize(serializedTask);

    expect(deserializedTask.getTitle()).toBe(task.getTitle());
    expect(deserializedTask.getIdentifier()).toBe(task.getIdentifier());
  });
});
