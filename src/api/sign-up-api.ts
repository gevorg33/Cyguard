import Api from './api';

class SignUpApi extends Api {
  constructor() {
    super('auth/signup');
  }
}

export default SignUpApi;
