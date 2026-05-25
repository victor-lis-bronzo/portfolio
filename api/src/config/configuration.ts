export const configuration = () => ({
  port: parseInt(`${process.env.PORT || 3333}`, 10),
  database: {
    url: process.env.DATABASE_URL || 'postgresql://portfolio:portfolio123@localhost:5433/portfolio_db',
  },
  firebase: {
    bucket: process.env.FIREBASE_STORAGE_BUCKET || 'portfolio-project.appspot.com',
    emulatorHost: process.env.FIREBASE_STORAGE_EMULATOR_HOST || 'localhost:9199',
    serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './infra/firebase/service-account.json',
  },
});
