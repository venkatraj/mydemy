import { schema } from 'nexus';
import { getUserId } from '../utils';

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

    t.field('enroll', {
      type: 'Course',
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const userId = getUserId(ctx.token);
        const course = await ctx.db.course.update({
          where: {
            id: args.id,
          },
          data: {
            users: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return course;
      },
    });
  },
});
