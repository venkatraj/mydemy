import { schema } from 'nexus';
// import { compare, hash } from 'bcryptjs'
// import { sign } from 'jsonwebtoken'
// import { APP_SECRET, getUserId } from '../utils'

schema.objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('password');
    t.string('name');
    t.string('role');
    t.model.courses();
  },
});

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();

    t.list.field('coursesByInstructor', {
      type: 'User',
      nullable: false,
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve(root, args, ctx) {
        return ctx.db.user.findMany({
          where: {
            id: parseInt(args.id),
            role: 'Instructor',
          },
        });
      },
    });

    t.list.field('coursesByStudent', {
      type: 'User',
      nullable: false,
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve(root, args, ctx) {
        return ctx.db.user.findMany({
          where: {
            id: parseInt(args.id),
            role: 'Student',
          },
        });
      },
    });
  },
});

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
  },
});
