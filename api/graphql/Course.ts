import { schema } from 'nexus';

schema.objectType({
  name: 'Course',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('description');
    t.model.users();
  },
});

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.course();
    t.crud.courses();
  },
});

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCourse();
  },
});
