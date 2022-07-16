import { useEffect, useState } from 'react';
import { Task } from '../models';
import { ITasksPersistentStorage } from './localStoragePersistentStorage';
import { usePersistentStorage } from './persistentStorageContext';

type TasksStore = {
  data: Task[];
  error?: string;
  createTask: (taskTitle: string) => Promise<void>;
};

const getAllTasks = async (persistentStorage: ITasksPersistentStorage) => {
  return persistentStorage.fetchAllTasks();
};

const saveAllTasks = async (persistentStorage: ITasksPersistentStorage, tasks: Task[]) => {
  return persistentStorage.saveAllTasks(tasks);
};

export const useTasksStore = (): TasksStore => {
  const persistentStorage = usePersistentStorage();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAllTasks(persistentStorage)
      .then((tasks) => setTasks(tasks))
      .catch(() => setError('Ups! Something went wrong.'));
  }, [persistentStorage]);

  const createTask = async (taskTitle: string) => {
    const newTasks = [...tasks, new Task(taskTitle)];
    saveAllTasks(persistentStorage, newTasks)
      .then(() => setTasks(newTasks))
      .catch(() => setError('Ups! Something went wrong.'));
  };

  return {
    data: tasks,
    error,
    createTask,
  };
};
