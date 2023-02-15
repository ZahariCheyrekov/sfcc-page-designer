'use strict';
/* global response */

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    const model = modelIn || new HashMap();
    const content = context.content;

    model.title = content.title;
    model.shortDescription = content.shortDescription;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.cta = URLUtils.url('Search-Show', 'cgid', content.cta.getID()).toString();

    // instruct 24 hours relative pagecache
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);

    return new Template('experience/components/commerce_assets/mainBanner').render(model).text;
};
