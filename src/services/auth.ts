class Auth {
  public token: string | null;

  constructor() {
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwNSwiZW1haWwiOiJnZXZvcmdnYXNwYXJ5YW4zM0BnbWFpbC5jb20iLCJpYXQiOjE2NDI0MTgyNzgsImV4cCI6MTY0NDIxODI3OH0.zDAmCau0uiftHqGnQ2pLF4YaZw_fF1HbfBaVGkml3Pk';
  }

  getToken() {
    return this.token;
  }

  authConfig() {
    return {
      headers: { Authorization: `Bearer ${this.token}` }
    };
  }
}

export default new Auth();
