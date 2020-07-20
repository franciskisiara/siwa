import { errors } from '../helpers'; 
import Siwa from '../index';

const expect = require('chai').expect

describe('Siwa', () => {
  it ('should throw an error if there is no configuration passed', () => {
    expect(() => new Siwa).to.throw(errors.NO_CONF);
  });

  it ('should throw an error if configuration is not an object', () => {
    expect(() => new Siwa('conf')).to.throw(errors.INVALID_CONF);
  });

  it ('should throw an error if required fields dont exist', () => {
    expect(() => new Siwa({})).to.throw(errors.MISSING_FIELDS);
  });
});