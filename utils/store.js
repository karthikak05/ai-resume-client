import {create} from "zustand";

const useJobStore = create((set) => ({
  jobs: [], 
  currentJob : null,
  customDescription : null,
  generatedResume : null,

  setJobs: (newJobs) => set({ jobs: newJobs }), 
  setCurrentJob: (job) => set({ currentJob: job }),
  setCustomDesc: (desc) => set({customDescription:desc}),
  setGeneratedResume: (resume) => set({generatedResume:resume})
}));

export default useJobStore;
