import { bkPage } from './app.po';

describe('BK App', () => {
    let page: bkPage;

    beforeEach(() => {
        page = new bkPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});
