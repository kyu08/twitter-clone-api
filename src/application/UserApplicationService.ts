import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository, { UserDataFull } from '../infrastructure/UserRepository';

export class UserApplicationService {
  static readonly userRepository: IUserRepository = new UserRepository();

  static getFull(userId: string): Promise<UserDataFull> {
    return UserApplicationService.userRepository.getFull(userId);
  }
}
