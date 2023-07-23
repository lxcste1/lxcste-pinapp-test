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
    const clients = await getDocs(collection(db, "client"));
    const listClients = clients.docs.map((list) => list.data());
    const ages = clients.docs.map((client) => Number(client.data().age));

    const average = getAverageAge(ages)
    const standarDeviation = getStandarDeviation(ages, average)

    $('#client-average').html(average);
    $('#client-standard-deviation').html(standarDeviation);

    listClients.forEach((item) => {
        $('#client-list').append(`
            <div class="col-md-3 col-xs-6 p-1">
                <div class="card">
                    <div class="card-image--container">
                        <img
                            src="../img/profile-image.png" 
                            alt="Imagen de perfil de ${item.name} ${item.lastname}"
                            width="150"
                            height="150" />               
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.name} ${item.lastname}</h5>
                        <p class="card-text">Nacimiento: ${item.birthday}</p>
                        <p class="card-text">${item.age} años</p>
                    </div>
                </div>
            </div>            
        `)
    })
}

function getAverageAge(ages) {
    const averageCount = ages.reduce((prev, age) => prev + age, 0) / ages.length;
    
    return averageCount.toFixed(2);
}

function getStandarDeviation(ages, average) {
    const getNominator = ages.map((i) => {
        const sumAges = i - average;
        const powAges = Math.pow(sumAges, 2);

        return powAges;
    })

    const sumNominatorValues = getNominator.reduce((prev, age) => prev + age, 0);
    const getDenominator = ages.length - 1;
    
    const standarDeviation = Math.sqrt(sumNominatorValues / getDenominator);

    return standarDeviation.toFixed(2);
}

getClient();






