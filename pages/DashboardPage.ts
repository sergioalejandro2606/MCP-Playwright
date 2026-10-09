import { type Locator, type Page } from '@playwright/test';
import { userDisplayName } from '../data/loginData';

export class DashboardPage {
  private readonly userMenu: Locator;
  private readonly logoutItem: Locator;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.userMenu = page.getByText(userDisplayName, { exact: true });
    this.logoutItem = page.getByText('Logout', { exact: true });
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async logout(): Promise<void> {
    await this.userMenu.click();
    await this.logoutItem.click();
  }

  getHeading(): Locator {
    return this.heading;
  }
}
