export const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/app-db',
  options: {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
};
