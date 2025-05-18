export interface ILabEntity {
  id?: string;
  title: string;
  description?: string;
  content: string;
  submittedAt: Date;
  topicId: string;
  maxScore: number;
}
