describe('Currency calculator test', function() {
    it('should display from and to countries dropdowns', function() {
        browser.get('');

        expect(element.all(by.css('select[title="From country"]')).getOptions().length).
            toBeGreaterThan(1);
    });
});
