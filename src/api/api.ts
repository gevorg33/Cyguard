import axios, { Method } from 'axios';
import config from '../aws-configs';
import { getAuthToken } from 'utils';

export type ApiPrefix = string | number;

class Api {
  url: string;

  constructor(resource: string) {
    this.url = `${config.apiGateway.URL}${ resource }`;
  }

  list = async (params: any) => {
    return this.buildQuery('get', params);
  }

  get = async (id: ApiPrefix, params: any) => {
    return this.buildQuery('get', params, id);
  }

  create = async (id: ApiPrefix, params: any) => {
    return this.buildQuery('post', params, id);
  }

  put = async (id: ApiPrefix, params: any) => {
    return this.buildQuery('put', params, id);
  }

  destroy = async (id: ApiPrefix) => {
    return this.buildQuery('delete', {}, id);
  }

  buildQuery = async (method: Method, params: any, prefix?: ApiPrefix) => {
    const token: string = await getAuthToken();
    return axios({
      url: this.getFullUrl(prefix),
      method,
      data: params.data,
      params: params.params,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      }
    });
  }

  getFullUrl = (prefix?: ApiPrefix) => {
    const result =  prefix ? `/${ prefix }` : '';
    return `${ this.url }${result}`;
  }

}

export default Api;
