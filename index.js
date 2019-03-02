// Remember that we are using ropsten for this application. Once completed we may deploy it to the mainnet for public use
if(typeof web3 != 'undefined'){
	ethereum.enable();
         console.log("web3 detected from Metamask")
         provider = web3.currentProvider
         this.web3 = new Web3(provider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         provider = new Web3.providers.HttpProvider("http://localhost:8545")
         this.web3 = new Web3(provider)
      }

const contractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"messages","outputs":[{"name":"content","type":"string"},{"name":"writtenBy","type":"address"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userInfo","outputs":[{"name":"name","type":"bytes32"},{"name":"occupation","type":"bytes32"},{"name":"bio","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_occupation","type":"bytes32"},{"name":"_bio","type":"string"}],"name":"setProfile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastMessageId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"userFollowers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"userMessages","outputs":[{"name":"content","type":"string"},{"name":"writtenBy","type":"address"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"followUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_content","type":"string"}],"name":"writeMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMyFollows","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"unfollowUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0xd9248f83cf4a1695f27bfa4bde3026f40d40920c'
const contractInstance = web3.eth.contract(contractABI).at(contractAddress)

function start() {
    initMyProfile()
    initMessages()
}

function initMyProfile() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    contractInstance.userInfo( (err, myProfile) => {
        if(err) return alert(err)

        let profileContent = ''
        let myName = web3.toUtf8(myProfile[0])
        let myOccupation = web3.toUtf8(myProfile[1])
        let myBio = myProfile[2]

        profileContent += `
            Name: <span id="my-name">${myName}</span> <br/>
            Occupation: <span id="my-occupation">${myOccupation}</span> <br/>
            Bio: <span id="my-bio">${myBio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Set Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    })
}

function setProfile() {
    let profileContent = `Name: <input type="text" id="set-profile-name" placeholder="Type your name..."/> <br/><br/>
        Occupation: <input type="text" id="set-profile-occupation" placeholder="Type your occupation..."/> <br/><br/>
        Bio: <input type="text" id="set-profile-bio" placeholder="Type your bio..."/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-occupation').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, occupation, bio) {
    contractInstance.setProfile(name, occupation, bio, (err, result) => {
        console.log(err, result)
        initMyProfile()
    })
}

function cancelSetProfile() {
    start()
}
start();

function sendMessage(message) {
    contractInstance.writeMessage(message, (err, result) => {
        console.log(err, result)
    })
    initMessages()
}

function initMessages() {
    contractInstance.lastMessageId((err, maxMessages) => {
        let sectionContent = ''
        maxMessages = maxMessages.toNumber()
        for(let i = 0; i < maxMessages; i++) {
            contractInstance.messages(i, (err, message) => {
                sectionContent += `<div class="message-box">
                    <div>${message[1]} says:</div>
                    <div>${message[0]}</div>
                </div>`

                if(i === maxMessages - 1) document.querySelector('#messages').innerHTML = sectionContent
            })
        }
    })
}

function initDummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Anonymous",
        occupation: "Beep",
        bio: "I'm just a bot"
    })
    initMyProfile()
}
