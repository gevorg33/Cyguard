import axios from 'axios';

class PayeeApiService {

  private makePostRequest(url: string, body: any) {
    return axios.post(url, body)
      .then(res => res?.data)
      .catch(err => console.log(err.message));
  }

  public sendPhoneVerification(id: string, token: string | null) {
    const data = {
      'itemType': 'payment',
      'itemId': parseInt(id),
    };
    return this.makePostRequest(
      `${process.env.REACT_APP_API_URL}verifications/send-phone-verification?token=${token}`,
      data,
    );
  }

  public verifyPayeePhone(id: string, token: any, data: any) {
    const { code } = data;
    return axios.get(
      `${process.env.REACT_APP_API_URL}payments/${id}?code=${code}&token=${token}`,
    ).then(res => res.data)
      .catch(err => console.log(err.message));
  }

  public verifyPayeeGauth(formData: any, id: string, token: any, currentPayment: any) {
    const { code } = formData;
    const data = {
      gCode: code,
      status: 'approved',
      paymentAccountDetails: { ...currentPayment },
    };
    return axios.post(
      `${process.env.REACT_APP_API_URL}payments/${id}/payee-decision?token=${token}`,
      data,
    ).then(res => res.data)
      .catch(err => console.log(err.message));
  }
}

const payeeApiService = new PayeeApiService();

export default payeeApiService;
