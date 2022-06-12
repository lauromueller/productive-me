import { useEffect, useState } from 'react';
import { Task } from '../models';
import { ITasksPersistentStorage, LocalStoragePersistentStorage } from './localStoragePersistentStorage';

type TasksStore = {
  data: Task[];
  createTask: (taskTitle: string) => Promise<void>;
};

const localStoragePersistentStorage = new LocalStoragePersistentStorage();

const getAllTasks = async (persistentStorage: ITasksPersistentStorage) => {
  return persistentStorage.fetchAllTasks();
};

const saveAllTasks = async (persistentStorage: ITasksPersistentStorage, tasks: Task[]) => {
  return persistentStorage.saveAllTasks(tasks);
};

export const useTasksStore = (): TasksStore => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks(localStoragePersistentStorage).then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  useEffect(() => {
    saveAllTasks(localStoragePersistentStorage, tasks);
  }, [tasks]);

  const createTask = async (taskTitle: string) => {
    setTasks([...tasks, new Task(taskTitle)]);
  };

  return {
    data: tasks,
    createTask,
  };
};
