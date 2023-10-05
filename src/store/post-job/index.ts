import { create } from 'zustand';

type PostJob = {
  title: string;
  description: string;
  skills: string[];
  jobType: string;
  education: string;
  experience: string;
  company: string;
  workSpaceType: string;
  location: string;
  date: string;
};

type PostJobStep2 = {
  jobCategory: string;
  location: string;
  date: string;
};

interface PostjobState {
  job: PostJob | null;
  jobStep2: PostJobStep2 | null;
  description: {
    content: string;
    css: string;
  };
  company: {
    name: string;
    id: number;
  };
  setPostJob: (data: PostJob) => void;
  setPostJobStep2: (data: PostJobStep2) => void;
  setPostJobDescription: (data: { content: string; css: string }) => void;
  setPostCompany: (data: { name: string; id: number }) => void;
}

export const usePostJob = create<PostjobState>((set) => ({
  job: null,
  jobStep2: null,
  description: {
    content: '',
    css: '',
  },
  company: {
    name: '',
    id: 0,
  },
  setPostJob: (data: PostJob) => {
    set({ job: data });
  },
  setPostJobStep2: (data: PostJobStep2) => {
    set({ jobStep2: data });
  },
  setPostJobDescription: (data: { content: string; css: string }) => {
    set({ description: data });
  },
  setPostCompany: (data: { name: string; id: number }) => {
    set({ company: data });
  },
}));

export const setJobPost = (data) => {
  return usePostJob.getState().setPostJob(data);
};

export const setPostJobStep2 = (data) => {
  return usePostJob.getState().setPostJobStep2(data);
};

export const setPostJobDescription = (data: {
  content: string;
  css: string;
}) => {
  return usePostJob.getState().setPostJobDescription(data);
};

export const setPostCompany = (data: { name: string; id: number }) => {
  return usePostJob.getState().setPostCompany(data);
};
