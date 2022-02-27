const stage = process.env.REACT_APP_STAGE || `development`;

const development = {
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://cyguard-api.herokuapp.com/' // A trailing slash is required!
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_pWjRed2Y9',
    APP_CLIENT_ID: '5lsjfvaee6ca46cc1renvpr3vp',
    IDENTITY_POOL_ID: 'us-east-2:58bdc99e-6595-4f13-aafb-50d937b5eebc',
  },
  s3: {
    BUCKET: 'cyguard',
    REGION: 'us-east-2',
  },
};

const staging = {
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://cyguard-api.herokuapp.com/' // A trailing slash is required!
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_pWjRed2Y9',
    APP_CLIENT_ID: '5lsjfvaee6ca46cc1renvpr3vp',
    IDENTITY_POOL_ID: 'us-east-2:58bdc99e-6595-4f13-aafb-50d937b5eebc',
  },
  s3: {
    BUCKET: 'cyguard',
    REGION: 'us-east-2',
  },
};

const production = {
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://cyguard-api.herokuapp.com/' // A trailing slash is required!
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_pWjRed2Y9',
    APP_CLIENT_ID: '5lsjfvaee6ca46cc1renvpr3vp',
    IDENTITY_POOL_ID: 'us-east-2:58bdc99e-6595-4f13-aafb-50d937b5eebc',
  },
  s3: {
    BUCKET: 'cyguard',
    REGION: 'us-east-2',
  },
};

const config:any = {
  development: development,
  staging: staging,
  production: production
};

export default config[stage];
