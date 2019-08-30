import expressSession from 'express-session';

export const session = () =>
  expressSession({
    name: 'qid',
    secret: 'thisisjustatest',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  });
