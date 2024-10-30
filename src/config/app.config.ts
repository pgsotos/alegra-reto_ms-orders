export default () => ({
  isProd: process.env.NODE_ENV === 'production',
  token: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    nameToken: process.env.NAME_TOKEN || 'Authorization',
    nameLevel: process.env.NAME_LEVEL || 'Level',
  },
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/inforser',
  port: process.env.PORT || 3000,
  domain: process.env.DOMAIN || 'http://localhost:3000',
  endpointMsRecipe:
    process.env.ENDPOINT_MS_RECIPE || 'http://localhost:5001/api',
  endpointMsIngredient:
    process.env.ENDPOINT_MS_INGREDIENT || 'http://localhost:5001/api',
});
