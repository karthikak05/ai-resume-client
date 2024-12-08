import {create} from "zustand";

const useJobStore = create((set) => ({
  jobs: [], 
  setJobs: (newJobs) => set({ jobs: newJobs }), 
}));

export default useJobStore;
