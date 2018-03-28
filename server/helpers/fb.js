const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.11'})

/* Require fb_token
*  callback object name, id, email
*/
let unwrapToken = (token, cb) =>{
  FB.setAccessToken(token)
  FB.api('/me', { fields: ['id', 'name', 'email', 'picture'] }, (response)=>{
    if(response.error) cb(response.error, null)
    else cb(null, response)
  })
}

module.exports = {
  unwrapToken
};