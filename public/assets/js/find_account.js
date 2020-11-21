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

    const resetPassword = (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        console.log("Email :", email);
        try {

            auth.sendPasswordResetEmail(email)
                .then(() => {
                    console.log("Email is sent!");
                    showNotification('success', 'A reset password email has been sent to you!');
                })
                .catch((err) => {
                    console.log("Error in sending mail : ", err);
                    showNotification('error', 'This account doesn\'t exist!');
                })

        } catch (err) {
            console.log('Error in sending mail :', err);
            showNotification('error', 'This account doesn\'t exist!');
        }
    }

    const findAccForm = document.getElementById('find-account-form');
    findAccForm.addEventListener('submit', resetPassword);
});