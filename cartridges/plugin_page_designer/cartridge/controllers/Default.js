'use strict';

/**
 * @namespace Default
 */

const server = require('server');
server.extend(module.superModule);

const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Default-Start : This end point is the root of the site, when opening from the BM this is the end point executed
 * @name Base/Default-Start
 * @function
 * @memberof Default
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - append
 */
server.append('Start', function (req, res, next) {
    const Site = require('dw/system/Site');
    const PageMgr = require('dw/experience/PageMgr');
    const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    const page = PageMgr.getPage('page-designer-example');

    if (page && page.isVisible()) {
        res.page('page-designer-example');
    } else {
        res.render('home/homePage');
    }
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
