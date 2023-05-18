export const labels = [
  {
    id: 'all',
    type: 'system',
    name: 'all mail',
    unreadCount: 3,
  },
  {
    id: 'inbox',
    type: 'system',
    name: 'inbox',
    unreadCount: 1,
  },
  {
    id: 'sent',
    type: 'system',
    name: 'sent',
    unreadCount: 0,
  },
  {
    id: 'drafts',
    type: 'system',
    name: 'drafts',
    unreadCount: 0,
  },
  {
    id: 'trash',
    type: 'system',
    name: 'trash',
    unreadCount: 0,
  },
  {
    id: 'spam',
    type: 'system',
    name: 'spam',
    unreadCount: 1,
  },
];

export const EXAMTYPE = {
  listening: 0,
  reading: 1,
  writing: 2,
  speaking: 3,
};

export const EXAMTYPE_ARRAY = ['listening', 'reading', 'writing', 'speaking'];

export const navExamConfig = [
  {
    skill: 'listening',
    items: [
      {
        title: 'Section 1',
        path: 'listening/section-1',
        children: [
          { title: 'Question 1 - 10', path: 'listening/section-1/1-10' },
          { title: 'Question 11-13', path: 'listening/section-1/11-13' },
          { title: 'Question 14-20', path: 'listening/section-1/14-20' },
        ],
      },
    ],
  },
  {
    skill: 'reading',
    items: [
      {
        title: 'Section 1',
        path: 'reading/section-1',
        children: [
          { title: 'Question 1 - 10', path: 'reading/section-1/1-10' },
          { title: 'Question 11-13', path: 'reading/section-1/11-13' },
          { title: 'Question 14-20', path: 'reading/section-1/14-20' },
        ],
      },
    ],
  },
  {
    skill: 'writing',
    items: [
      {
        title: 'Section 1',
        path: 'writing/section-1',
        children: [
          { title: 'Question 1 - 10', path: 'writing/section-1/1-10' },
          { title: 'Question 11-13', path: 'writing/section-1/11-13' },
          { title: 'Question 14-20', path: 'writing/section-1/14-20' },
        ],
      },
    ],
  },
  {
    skill: 'speaking',
    items: [
      {
        title: 'Section 1',
        path: 'speaking/section-1',
        children: [
          { title: 'Question 1 - 10', path: 'speaking/section-1/1-10' },
          { title: 'Question 11-13', path: 'speaking/section-1/11-13' },
          { title: 'Question 14-20', path: 'speaking/section-1/14-20' },
        ],
      },
    ],
  },
];

export const SKILL_OPTIONS = ['listening', 'reading', 'writing', 'speaking'];
