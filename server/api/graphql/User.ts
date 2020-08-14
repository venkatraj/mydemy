import { schema } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

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

    t.field('profile', {
      type: 'User',
      nullable: false,
      resolve(root, args, ctx) {
        const userId = getUserId(ctx.token);
        if (!userId) {
          throw new Error('Please login!');
        }
        return ctx.db.user.findOne({
          where: {
            id: userId,
          },
        });
      },
    });

    t.list.field('instructor', {
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

    t.list.field('student', {
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

const UserInput = schema.inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.string('name', { required: true });
    t.string('email', { required: true });
    t.string('password', { required: true });
    t.string('role', { nullable: true });
  },
});

schema.extendType({
  type: 'Mutation',
  definition(t) {
    // By Admin
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();

    // By app users
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        data: 'UserCreateInput',
      },
      resolve: async (_root, { data }, ctx) => {
        const hashedPassword = await hash(data.password, 10);
        const user = await ctx.db.user.create({
          data: {
            ...data,
            password: hashedPassword,
          },
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const user = await ctx.db.user.findOne({
          where: {
            email: args.email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${args.email}`);
        }

        const isValidPassword = await compare(args.password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid Password');
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });
  },
});
