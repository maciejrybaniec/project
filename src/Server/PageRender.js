/* @flow */
/**
 * Render static page.
 * @module Server/PageRender
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

 /**
  * Render static page.
  * @method renderPage
  * @param {string} html Page html.
  * @param {object} [appState] Initial application state.
  * @returns {string} Page template.
  */
 const renderPage = (html: string, appState?: Object): string => {
     return `
         <!doctype html>
         <html>
             <head>
                <link rel="stylesheet" href="/css/style.css" />
             </head>
             <body>
                 <div id="root">
                   <div>${html}</div>
                 </div>
                 <script>
                    window._STATE__ = ${JSON.stringify(appState)}
                </script>
             </body>
         </html>
     `
 };

 export default renderPage;
