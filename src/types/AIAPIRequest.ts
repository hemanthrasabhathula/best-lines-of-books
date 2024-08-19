export type AIAPIRequest = {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
};
