import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import { getLogin } from './authHelper';
import Auth0Lock from 'auth0-lock';


export default class AuthService extends EventEmitter {
  constructor(clientId, domain, props) {
    super();
    this.props = props;
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}/`,
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)


    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.loginUser(profile);
        browserHistory.push('/');
        // profile.auth_id = profile.user_id;
        // getLogin(profile).then(res => {

        //   res.type ? this.props.setViewer() : this.props.setPresenter();
        //   this.props.setUser(res);
        //   browserHistory.push('/');
        // })
 
        this.setProfile(profile)
      }
    })
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  loginUser(prof) {
    const profile = prof || this.getProfile();
    profile.auth_id = profile.user_id;
    getLogin(profile).then(res => {
      res.type ? this.props.setViewer() : this.props.setPresenter();
      this.props.setUser(res);
    })
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    this.props.setUser(null);
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}