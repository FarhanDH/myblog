import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Class for login users.
 *
 * This class is used for login users in the application.
 * It contains the required fields for login a user, that
 * is, the username and the password.
 *
 * @export
 * @class LoginUserDto
 */
export class LoginUserDto {
  /**
   * The username for the user.
   *
   * @type {string}
   * @memberof LoginUserDto
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * The password for the user.
   *
   * @type {string}
   * @memberof LoginUserDto
   */
  @IsNotEmpty()
  @IsString()
  password: string;
}
