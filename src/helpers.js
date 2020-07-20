export const errors = {
  NO_CONF: 'Configuration not found',
  INVALID_CONF: 'Invalid configuration',
  MISSING_FIELDS: 'Required field missing',
};

function requiredValidation (config, field) {
  if (!config.hasOwnProperty(field) || !config[field]) {
    throw errors.MISSING_FIELDS
  }
}

export const validate = config => {
  if (!config) throw errors.NO_CONF;
  if (typeof config !== 'object') throw errors.INVALID_CONF;
  requiredValidation(config, 'identityToken')
  requiredValidation(config, 'package')
  requiredValidation(config, 'user')
};