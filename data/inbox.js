import faker from 'faker';

export const emailFilters = {
  all: e => (e.deleted !== true) && (e.sent === false),
  gmail: e => (e.deleted !== true) && (e.sent === false) && (e.box === 'gmail'),
  amazon: e => (e.deleted !== true) && (e.sent === false) && (e.box === 'amazon'),
  work: e => (e.deleted !== true) && (e.sent === false) && (e.box === 'work'),
  sent: e => (e.deleted !== true) && (e.sent === true),
  flagged: e => (e.deleted !== true) && (e.flagged === true),
  starred: e => (e.deleted !== true) && (e.starred === true),
  drafts: e => (e.deleted !== true) && (e.draft === true),
  tagged: e => (e.deleted !== true) && (e.tags !== undefined),
  trash: e => (e.deleted === true),
};

export default (count = 100) => {
  faker.seed(777777);
  return Array.from(Array(count)).map(() => ({
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    sentDate: faker.date.recent(),
    subject: faker.lorem.sentence(),
    sent: faker.random.boolean(),
    draft: faker.random.boolean(),
    deleted: faker.random.boolean(),
    flagged: faker.random.boolean(),
    starred: faker.random.boolean(),
    content: faker.lorem.paragraphs(10),
    box: faker.random.arrayElement(['gmail', 'amazon', 'work']),
  }));
};
