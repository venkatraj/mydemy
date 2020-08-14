import { rule, shield, or, deny, not, allow } from 'nexus-plugin-shield';
import { getUserId } from '../utils';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_root, _args, ctx) => {
    const userId = getUserId(ctx.token);
    return Boolean(userId);
  },
);

const isAdmin = rule({ cache: 'contextual' })(async (_root, _args, ctx) => {
  const userId = getUserId(ctx.token);
  const user = await ctx.db.user.findOne({
    where: {
      id: userId,
    },
  });
  return user.role === 'Admin';
});

const isInstructor = rule({ cache: 'contextual' })(
  async (_root, _args, ctx) => {
    const userId = getUserId(ctx.token);
    const user = await ctx.db.user.findOne({
      where: {
        id: userId,
      },
    });
    return user.role === 'Instructor';
  },
);

const permissions = shield({
  rules: {
    Query: {
      profile: isAuthenticated,
      users: isAdmin,
      student: isAdmin,
      instructor: isAdmin,
    },
    Mutation: {
      '*': isAuthenticated,
      login: allow,
      signup: allow,
      enroll: or(isAdmin, isAuthenticated),
    },
  },
});

export { permissions };
