window.addEventListener("DOMContentLoaded", () => {

    let showNotification = function (type, message) {
        new Noty({
            theme: 'relax',
            text: message,
            type: type,
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    firebase.initializeApp({
        apiKey: 'AIza…',
        authDomain: '<PROJECT_ID>.firebasepp.com'
    });
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();


    const signInWithGoogle = (event) => {
        event.preventDefault();
        console.log('signInWithGoogle button clicked!');
        auth
            .signInWithPopup(googleProvider)
            .then(() => {
                console.log('Sign in with google done!');
                console.log(auth.currentUser);
                showNotification('info', 'Google verification in Progess.');
                auth.currentUser.getIdToken(true)
                    .then((idToken) => {
                        // showNotification('info', 'Google verification in Progess.');
                        console.log('TOKEN id: ', idToken);
                        return fetch("/users/sessionLogin", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ idToken }),
                        });
                    })
                    .then((res) => {
                        console.log("RESPONSE :", res);
                        // showNotification('info', 'Google verification in Progess.');
                        window.location.assign("/");
                    })
            })
            .then(() => {
                console.log("Signing out of firebase")
                return firebase.auth().signOut();
            })
            .catch(error => {
                console.log("ERROR : ", error);
                showNotification('error', 'Google verification Failed!');
                // window.location.assign("/");
            });
        return false;
    }

    const signIn = (event) => {
        event.preventDefault();
        console.log('Sign in! form submit!')
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        console.log("Check current user before sign in  : ", auth.currentUser);
        // When the user signs in with email and password.
        showNotification('info', 'Verifying your credentials.');
        auth.signInWithEmailAndPassword(email, password).then(user => {
            // Get the user's ID token as it is needed to exchange for a session cookie.
            return auth.currentUser.getIdToken(true).then(idToken => {
                // Session login endpoint is queried and the session cookie is set.
                // CSRF protection should be taken into account.
                // ...

                console.log("ID Token : ", idToken);
                return fetch("/users/sessionLogin", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idToken }),
                });
            });

        }).then(() => {
            // A page redirect would suffice as the persistence is set to NONE.
            return auth.signOut();
        }).then(() => {
            // showNotification('info', 'Verifying your credentials.');
            window.location.assign('/');
        }).catch(error => {
            console.log("ERROR : ", error);
            showNotification('error', 'Sign In Failed!!');
        });
    };
    const signUp = (event) => {
        event.preventDefault();
        console.log('Sign up! form submit!')
        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            console.log(email, password, name, confirmPassword);
            if (password !== confirmPassword) {
                throw "Password and confirm password doesn't match!";
            }
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(function (data) {
                    let user = auth.currentUser;
                    // console.log("Before update of user : ", user);
                    user.updateProfile({
                        displayName: name,
                    }).then(function () {
                        // Update successful.
                        console.log("Successfully updated name of user : ", user);
                        showNotification('info', 'Wait while we sign you up.');

                        window.location.assign("/users/sign-in");
                    }).catch(function (error) {
                        // An error happened.
                        console.log("Error in updating user name : ", error);

                    });

                })
                .catch((error) => {
                    console.log('Error creating new user:', error);
                    showNotification('error', error.message);
                })
        } catch (error) {
            console.log('Error : ', error);
            showNotification('error', "Sorry we couldn't sign you up.");
            showNotification('error', error);
        }

    };

    let googleLoginButton = document.getElementById('google-login-button');
    googleLoginButton.addEventListener('click', signInWithGoogle);

    let signInForm = document.getElementById('sign-in-form');
    if (signInForm) {
        signInForm.addEventListener('submit', signIn);
    }
    let signUpForm = document.getElementById('sign-up-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', signUp);
    }
});