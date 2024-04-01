import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Class for creating users.
 *
 * This class is used for creating new users in the application.
 * It contains the required fields for creating a new user, that
 * is, the username and the password.
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto {
  /**
   * The username for the new user.
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  username: string;

  /**
   * The password for the new user.
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
