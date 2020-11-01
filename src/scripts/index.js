import '../styles/index.scss';

const axios = require('axios').default;

axios.get('https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json')
    .then((response) => {
        let result = response.data.reduce((object, value) => {
            // Filter Out Empty websiteId
            if (!object[value.websiteId]) {
                object[value.websiteId] = {chats: 0, missedChats: 0};
            }
            
            // Combine Data
            object[value.websiteId].chats += value.chats;
            object[value.websiteId].missedChats += value.missedChats;
            
            return object;
        }, {});
        
        // Iterate Object Entries
        for (const [websiteId, object] of Object.entries(result)) {
            // Template
            let data = `<tr>
            <th scope="row">${websiteId}</th>
            <td>${object.chats}</td>
            <td>${object.missedChats}</td>
            </tr>`;
            
            // Append data template to the Table
            document.getElementById('tableBody').innerHTML += data;
        }
    })
    .catch((error) => {
            window.alert(error);
        }
    );

if (process.env.NODE_ENV === 'development') {
    require('../index.html');
}
