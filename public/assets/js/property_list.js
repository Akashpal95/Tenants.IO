
const allEventSetter = () => {
    document
        .getElementById('add-property-button')
        .addEventListener('click', (e) => {
            console.log("Add property button clicked!");
            window.location.assign("/property/add");
        })
}
window.addEventListener("DOMContentLoaded", () => {
    allEventSetter();
});