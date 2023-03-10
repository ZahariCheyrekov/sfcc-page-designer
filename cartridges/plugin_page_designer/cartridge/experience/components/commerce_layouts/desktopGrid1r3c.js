'use strict';
/* global response */

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.3 Row x 1 Col (Mobile) 1 Row x 3 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    const model = modelIn || new HashMap();
    const component = context.component;

    const content = context.content;

    const firstColumn = content.firstColumn;
    const secondColumn = content.secondColumn;
    const thirdColumn = content.thirdColumn;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.regions.column1.setClassName("region col-12 col-md-4 order-" + firstColumn);
    model.regions.column2.setClassName("region col-12 col-md-4 order-" + secondColumn);
    model.regions.column3.setClassName("region col-12 col-md-4 order-" + thirdColumn);

    // instruct 24 hours relative pagecache
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);

    return new Template('experience/components/commerce_layouts/desktopGrid1r3c').render(model).text;
};
