import Amplify from '@aws-amplify/core';
// import Storage from '@aws-amplify/storage';
import axios from 'axios';
import UIHelper from './ui-helper';
import config from '../aws-configs';

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
      oauth: config.oauth,
    },
    Storage: {
      bucket: config.s3.BUCKET,
      region: config.cognito.REGION,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      level: 'public',
    },
  });
};

export const configureAxios = () => {
  axios.interceptors.request.use(function(config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function(response) {
    return response;
  }, function(error) {
    UIHelper.listenApiErrors(error);
    return Promise.reject(error);
  });
};

export const getImageUrl = (key: string) => {
  return `https://${config.s3.BUCKET}.s3.${config.s3.REGION}.amazonaws.com/public/${encodeURIComponent(key)}`;
};