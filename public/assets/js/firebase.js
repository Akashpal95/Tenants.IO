

const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider);
}
window.addEventListener("DOMContentLoaded", () => {
    console.log("Dom content loaded!!!");
    firebase.initializeApp({
        apiKey: 'AIza…',
        authDomain: '<PROJECT_ID>.firebasepp.com'
    });
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    document
        .getElementById("btnSubmit")
        .addEventListener("click", (event) => {
            console.log("Hello!!!");
            event.preventDefault();
            auth
                .signInWithPopup(googleProvider)
                .then(() => {
                    console.log('Sign in with google done!');
                    console.log(auth.currentUser);
                    auth.currentUser.getIdToken(true)
                        .then((idToken) => {
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
                            window.location.assign("/");
                        })
                })
                .then(() => {
                    console.log("Signing out of firebase")
                    return firebase.auth().signOut();
                })
                .catch(error => {
                    console.log("ERROR : ", error);
                    window.location.assign("/");
                });
            return false;
        });
});

