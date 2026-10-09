import { type Locator, type Page } from '@playwright/test';
import { paths } from '../data/loginData';

export class LoginPage {
  private readonly page: Page;

  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly requiredError: Locator;
  private readonly errorAlert: Locator;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.requiredError = page.getByText('Required', { exact: true });
    this.errorAlert = page.getByRole('alert');
    this.heading = page.getByRole('heading', { name: 'Login' });
  }

  async navigate(): Promise<void> {
    await this.page.goto(paths.login);
  }

  async fillUsername(value: string): Promise<void> {
    await this.usernameField.fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.passwordField.fill(value);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  getUsernameField(): Locator {
    return this.usernameField;
  }

  getPasswordField(): Locator {
    return this.passwordField;
  }

  getRequiredErrors(): Locator {
    return this.requiredError;
  }

  getErrorAlert(): Locator {
    return this.errorAlert;
  }

  getHeading(): Locator {
    return this.heading;
  }
}
