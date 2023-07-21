import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmWdbv4cZ2vnNHLDP-31k7bhEBQy8VX_I",
    authDomain: "lxcste-pinapp-test.firebaseapp.com",
    databaseURL: "https://lxcste-pinapp-test-default-rtdb.firebaseio.com",
    projectId: "lxcste-pinapp-test",
    storageBucket: "lxcste-pinapp-test.appspot.com",
    messagingSenderId: "271191346234",
    appId: "1:271191346234:web:bf483224ca9e8c6d14f903"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$('#client-form').on('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    const clientName = $('#input-name').val();
    const clientLastname = $('#input-lastname').val();
    const clientAge = $('#input-age').val();
    const clientBirthday = $('#input-birthday').val();

    try {
        const docRef = addDoc(collection(db, "client"), {
            name: clientName,
            lastname: clientLastname,
            age: clientAge,
            birthday: clientBirthday
        });
        $('#form-success').show();
    } catch (e) {
        $('#form-danger').show();
    }

    setTimeout(() => {
        $('#form-success').hide();
        $('#form-danger').hide();
    }, 3000);
}

async function getClient() {

    const querySnapshot = await getDocs(collection(db, "client"));
    querySnapshot.forEach((doc) => {
        const totalAges = doc.data().age;

        const average = getAverageAge(Number(totalAges), totalAges.length)
        console.log(average)
        // getAverageAge(Number(totalAges), totalAges.length);


        // console.log(getAverageAge(totalAges))

        // $('#client-info').html(`${doc.data().age}`);
    });
}

function getAverageAge(ages, i) {
    const arr = [ages]

    // const average = arr.reduce((prev, age) => prev + age, 0) / i;
    return arr
}

getClient();






