import axios from 'axios';
import Auth from '../services/auth';

export class DashboardApiService {
  public static fetchIndustriesRequest = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}industries`,
      Auth.authConfig(),
    ).catch(err => console.log(err.message));
    if (response) {
      return response.data;
    }
  };

  public static fetchUserRolesRequest = async () => {
    const response =
      await axios.get(
        `${process.env.REACT_APP_API_URL}user/roles`,
        Auth.authConfig(),
      ).catch(err => console.log(err.message));
    if (response) {
      return response.data;
    }
  };

  public static downloadPaymentRequest = (id: string) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}attachments/${id}`,
      Auth.authConfig(),
    ).then(res => res.data?.attachment);
  };

  public static uploadAvatar = (fmData: any, onSuccess: (arg: string) => void, onError: (arg: any) => void) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    };
    return axios.post(
      `${process.env.REACT_APP_API_URL}users/avatar`,
      fmData,
      config,
    ).then(() => onSuccess('ok')).catch(err => onError({ err }));
  };

}