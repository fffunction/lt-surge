/**
 * This is our processor map for all the helpers.
 *
 * This is our map. This ideally this would be dynamically created by
 * some sort of plugin architecture but lets not let perfect be the
 * enemy of good :)
 *
 * src: https://github.com/sintaxi/terraform/blob/master/lib/helpers/raw.js#L15
 */
module.exports = {
    html: ['jade', 'ejs', 'md'],
    css: ['styl', 'less', 'scss', 'sass'],
    js: ['coffee'],
};
