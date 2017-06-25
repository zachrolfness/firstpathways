import { PathwaysPage } from './app.po';

describe('pathways App', () => {
  let page: PathwaysPage;

  beforeEach(() => {
    page = new PathwaysPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
