import { validate } from './helpers'

const jwks = require('jwks-rsa');
const jwt = require('jsonwebtoken')

export default class Siwa {
  constructor (config) {
    validate(config)
    this.user = config.user
    this.package = config.package
    this.identityToken = config.identityToken
    this.keySetUri = config.keySetUri || 'https://appleid.apple.com/auth/keys'
  }

  /**
   * Verify the JSON web token
   */
  async verify () {
    const json = jwt.decode(this.identityToken, { complete: true })
    const appleSigningKey = await this.getAppleSigningKey(json.header.kid)
    const payload = await this.verifyJsonWebToken(appleSigningKey)
    if (payload.sub == this.user && payload.aud == this.package) {
      return {
        valid: true,
        payload: payload,
        message: "User verified successfully"
      }
    } else {
      return {
        valid: false, 
        payload: {}, 
        message: "We couldnt verify this apple user"
      }
    }
  }

  /**
   * Retrieves apple signing key 
   */
  getAppleSigningKey (kid) {
    return new Promise((resolve, reject) => {
      try {
        const client = jwks({ jwksUri: this.keySetUri })
        client.getSigningKey(kid, (err, key) => { 
          resolve(err || key.getPublicKey()) 
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Verify the JSON web token against apple's signing key
   */
  verifyJsonWebToken (appleSigningKey) {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify (this.identityToken, appleSigningKey, (err, payload) => { 
          resolve(err || payload) 
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}