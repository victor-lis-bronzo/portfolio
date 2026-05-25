export const configuration = () => ({
  port: parseInt(`${process.env.PORT || 3333}`, 10),
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(`${process.env.DATABASE_PORT || 5432}`, 10),
  // },
});
