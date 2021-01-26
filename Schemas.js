const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.furnitureSchema = Joi.object({
    furniture: Joi.object({
        title: Joi.string().required().escapeHTML(),
        translation: Joi.string().required().max(16).escapeHTML(),
        price: Joi.number().required().min(0),
        size: Joi.number().required().min(0)
    }).required(),
    deleteImages: Joi.array()
});

module.exports.roomSchema = Joi.object({
    room: Joi.object({
        category: Joi.string().required().escapeHTML(),
        translation: Joi.string().required().escapeHTML()
    }).required()
})