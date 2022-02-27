import axios from 'axios';
import Auth from '../services/auth';

class PaymentAccountManagementApi {

  private makePostRequest(url: string, body: any) {
    return axios.post(url, body, Auth.authConfig())
      .then(res => res?.data)
      .catch(err => console.log(err.message));
  }

  public createPaymentAccount(data: any) {
    return this.makePostRequest(
      `${process.env.REACT_APP_API_URL}payment-accounts`,
      data
    );
  }

  public verifyPayeeEmail(data: any, id: string, token?: any) {
    return this.makePostRequest(`${process.env.REACT_APP_API_URL}payment-accounts/${id}/verify-payee-email?token=${token}`, data);
  }

  public updatePayeePhone(data: any, id: string, token?: any) {
    return axios.patch(
      `${process.env.REACT_APP_API_URL}payment-accounts/${id}?token=${token}`,
      data,
      Auth.authConfig(),
    ).then(res => res.data)
      .catch(err => console.log(err.message));
  }

  public verifyPayeePhone(data: any, id: string, token?: any) {
    return this.makePostRequest(`${process.env.REACT_APP_API_URL}payment-accounts/${id}/verify-payee-phone?token=${token}`, data);
  }

  public verifyPayeeGauth(data: any, id: string, token?: any) {
    return this.makePostRequest(`${process.env.REACT_APP_API_URL}payment-accounts/${id}/verify-payee-gauth?token=${token}`, data);
  }

  public updateSecretSentence(data: any, id: string, token?: any) {
    return this.makePostRequest(`${process.env.REACT_APP_API_URL}payment-accounts/${id}/sentence?token=${token}`, data);
  }

  public generateQrCode(id: string | number, token?: any) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}payment-accounts/${id}/qr-code?token=${token}`,
      Auth.authConfig(),
    ).then(res => res.data)
      .catch(err => console.log(err.message));
  }

  public generateSecretSentence(token?: any) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}payment-accounts/generate-secret-sentence?token=${token}`,
      Auth.authConfig(),
    ).then(res => res.data)
      .catch(err => console.log(err.message));
  }
}

const paymentAccountManagementApi = new PaymentAccountManagementApi();

export default paymentAccountManagementApi;
