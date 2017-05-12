import { MudikaAppPage } from './app.po';

describe('mudika-app App', () => {
  let page: MudikaAppPage;

  beforeEach(() => {
    page = new MudikaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
