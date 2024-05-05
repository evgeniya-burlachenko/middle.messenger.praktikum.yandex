import { store } from '../Store';
import { ChangePasswordData } from '../api/AuthAPI';
import UserAPI, { IProfileData } from '../api/UserApi';



class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateProfile(profile: IProfileData) {
    await this.api.update(profile);
  }

  async changePassword(data: ChangePasswordData) {
    console.log('mannayamashaQWERTY12345!');
    await this.api.changePassword(data);
  }

  async changeAvatar(data: FormData) {
    const userData = await this.api.changeAvatarData(data);
    store.set('currentUser', userData);
  }
}

export default new UserController();
