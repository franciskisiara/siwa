# SIWA (Sign in with Apple)

Verification package when signing in with apple in javascript (nodejs) environments

## Dependencies

SiwA uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to verify apple's identity token & [jwks-rsa](https://github.com/auth0/node-jwks-rsa) to retrieve RSA signing keys from apple's JWKS (JSON Web Key Set) endpoint

### Installation

Using npm

```
$ npm i @agog/siwa
```

### Usage

Initialise the Siwa class by passing in the necessary configurations in the constructor. The `verify()` method then verifies the user account and returns a promise which will resolve with the state of validity.

```javascript
import Siwa from '@agog/siwa';

const siwa = new Siwa({
    user: "", //required
    package: "", //required
    identityToken: "", //required
    keySetUri: "https://appleid.apple.com/auth/keys", //NOT required
})

siwa.verify().then(response => {
    //access the validity response
})
```

### Configurations
The apix object constructor accepts an object as a parameter that **MUST** contain: 

* ***user*** - (REQUIRED) user key from apple, 
* ***package*** - (REQUIRED) identifies your application 
* ***identityToken*** - (REQUIRED) identityToken from apple
* ***keySetUri*** - (OPTIONAL) apple's keySetUri endpoint
 
## Running the tests

In order to run the tests run the following command in the root of the application

```
npm run test
```

## Built With

* [NodeJs](https://nodejs.org/en/) - The framework used
* [npm](https://www.npmjs.com/) - Package manager

## Authors

**Kisiara Francis** 
    - [Github](https://github.com/franciskisiara)
    - [Website](https://profiles.agog.co.ke/kisiara)
    - [LinkedIn](https://www.linkedin.com/in/francis-kisiara-289360ab/) -->
