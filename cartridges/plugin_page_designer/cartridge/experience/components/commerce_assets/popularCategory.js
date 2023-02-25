'use strict';
/* global response */

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    const model = modelIn || new HashMap();
    const content = context.content;
    model.textHeadline = content.textHeadline;

    const catObj = {};
    const cat = content.category;
    catObj.ID = cat.ID;
    catObj.compID = context.component.ID;

    catObj.ctaTitle = content.ctaTitle;
    catObj.ctaTitlePositionTop = content.ctaTitlePositionTop;

    catObj.description = content.description;

    if (cat.custom.slotBannerImage) {
        catObj.imageURL = cat.custom.slotBannerImage.getURL().toString();
    }

    if (cat.image) {
        catObj.imageURL = cat.image.getURL().toString();
    }

    model.image = ImageTransformation.getScaledImage(content.image);

    catObj.url = cat.custom && 'alternativeUrl' in cat.custom && cat.custom.alternativeUrl
        ? cat.custom.alternativeUrl
        : URLUtils.url('Search-Show', 'cgid', cat.getID()).toString();

    model.category = catObj;

    // instruct 24 hours relative pagecache
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);

    return new Template('experience/components/commerce_assets/popularCategory').render(model).text;
};
