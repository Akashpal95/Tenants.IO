
const admin = require('../config/admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// module.exports.list = async function (req, res) {
//     let snapshot = await db.collection('properties').get();
//     let propertyList = [];
//     snapshot.docs.map((doc) => {
//         let docData = doc.data();
//         if (docData.ownerID == res.locals.uid) {
//             propertyList.push({ ...docData, id: doc.id });
//         }
//     })
//     // console.log(propertyList);
//     res.render("property_list.ejs", {
//         properties: propertyList
//     });
// }
module.exports.list = async function (req, res) {
    try {
        let userRef = db.collection('owners').doc(String(res.locals.uid));
        let userData = await userRef.get();
        console.log("USer data : ", userData.data());
        let listOfPropertyData = [];
        Promise.all(userData.data().propertyList.map(async (propertyID) => {
            let propertyRef = db.collection('properties').doc(String(propertyID));
            let property = await propertyRef.get();
            if (property.exists) {
                listOfPropertyData.push({ ...property.data(), id: property.id });
            }
        }))
            .then(() => {
                console.log("List of property :", listOfPropertyData);
                res.render("property_list.ejs", {
                    properties: listOfPropertyData
                });
            });
    } catch (err) {
        console.log("ERROR : ", err);
        res.redirect('back');
    }
}
module.exports.add = function (req, res) {
    res.render("add_property.ejs");
}
module.exports.addToDB = function (req, res) {

    try {
        db
            .collection('properties')
            .add({
                name: req.body['property-name'],
                ownerID: res.locals.uid,
                location: req.body.location,
                bhk: req.body.bhk,
                rent: req.body.rent
            }).then((docRef) => {
                console.log("Result after adding property :", docRef.id);
                db.collection('owners').doc(String(res.locals.uid)).update({
                    propertyList: admin.firestore.FieldValue.arrayUnion(String(docRef.id))
                }).then(res => {
                    console.log("Successfully updated owner property list!");
                })
            }).then(() => {
                req.session.success = 'Your property has been added.';
                return res.status(200).json({
                    message: "Successfully added to db!"
                })
            });
    } catch (err) {
        console.log("ERROR in adding property to DB : ", err);
        req.session.error = 'Your property couldn\'t be added.';
        return res.status(400).json({
            message: "Unsuccessfull in adding to DB!"
        });
    }

}
module.exports.destroy = async function (req, res) {
    console.log("Property ID to delete : ", req.params.id);
    try {
        const result = await db.collection('properties').doc(String(req.params.id)).delete();
        let userRef = db.collection('owners').doc(String(res.locals.uid));
        userRef.update({
            propertyList: FieldValue.arrayRemove(String(req.params.id))
        });
        req.session.success = 'Property Deleted!';
    } catch (error) {
        console.log("ERR in deleting property : ", error);
        req.session.error = 'Error in deleting property!';
    }

    res.redirect('back');
}