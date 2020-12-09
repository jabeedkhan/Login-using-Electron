const { Client } = require('pg')
const {remote, ipcRenderer} = require('electron')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});
client.connect();

const insertNewUserInfomation = async (emailId, firstName, lastName, password, city) => {
    client.connect();
    const query = `
      INSERT INTO users (emailId, firstName, lastName, city, password)
      VALUES ('${emailId}', '${firstName}', '${lastName}', '${city}', '${password}')
    `;
  
    console.log('query ', query);
   
    try {
      const result = await client.query(query);
      console.log('New user informated added into db');
    } catch(e) {
      console.log('error in insert query ', e);
    } finally {
      client.end();
    }
  };
  
  const getLoginUserInformatiomFromDb = async (username, password, event) => {
    const query = `SELECT * FROM users WHERE emailId='${username}' AND password='${password}'`;
    console.log('query ', query);
    try {
        const result = await client.query(query);
        const userArrary = result.rows;
        if(userArrary.length === 0){
            event.preventDefault();
            event.stopPropagation();
            alert('Invalide User Name And Password');
            return false;
        } else {
          console.log('Logged in user details ', userArrary);
          const userInfo = userArrary[0];
          if (userInfo) {
            localStorage.setItem("city", userInfo.city);
            localStorage.setItem("firstname", userInfo.firstname);
            localStorage.setItem("lastname", userInfo.lastname);
            localStorage.setItem("emailid", userInfo.emailid);
          }
            // window.location.href = "HomePage.html";
            // ipcRenderer.send('toggle-homescreen')
            return true;
        }
      } catch(e) {
        console.log('error in select query ', e);
        event.preventDefault();
        return false;
      } finally {
        // client.end();
        console.log('finally block');
      }
  };
