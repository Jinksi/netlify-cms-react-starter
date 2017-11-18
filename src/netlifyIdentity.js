import netlifyIdentity from 'netlify-identity-widget'

// check for netlifyIdentity, redirect to admin if user is logging in
netlifyIdentity.on('init', user => {
  if (!user) {
    netlifyIdentity.on('login', () => {
      document.location.href = '/admin/'
    })
  }
})

if (window.localStorage) {
  netlifyIdentity.init()
}
