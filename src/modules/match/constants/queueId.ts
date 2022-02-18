export interface QueueId {
  type: string;
  name: string;
}

export const queueId: Record<string, QueueId> = {
  400: {
    type: 'Normal',
    name: 'DRAFT 5vs5',
  },
  420: {
    type: 'Ranked',
    name: 'Solo/Duo',
  },
  430: {
    type: 'Normal',
    name: 'BLIND 5vs5',
  },
  440: {
    type: 'Ranked',
    name: 'FLEX 5vs5',
  },
  700: {
    type: 'Ranked',
    name: 'CLASH',
  },
  830: {
    type: 'Bot',
    name: 'Co-op vs. AI (Intro)',
  },
  840: {
    type: 'Bot',
    name: 'Co-op vs. AI (Beginner)',
  },
  850: {
    type: 'Bot',
    name: 'Co-op vs. AI (Intermediate)',
  },
};
