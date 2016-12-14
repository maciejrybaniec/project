/**
 * PageRender specification.
 * @module Server/__tests__/PageRender
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import PageRender from '../PageRender';

describe('PageRender', () => {

    it('should inject html inside template', () => {
        const html = '<nav class="Navigation"></nav>';
        const pageTemplate = PageRender(html);

        expect(pageTemplate.includes(html)).toBe(true);
    });

    it('should set __STATE__ as global variable', () => {
        const initialState = { state: true};
        const pageTemplate = PageRender('', initialState);

        expect(pageTemplate.includes('window._STATE__')).toBe(true);
        expect(pageTemplate.includes(JSON.stringify(initialState))).toBe(true);
    });
});
