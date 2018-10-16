// [{
//     id: '/#1122n kcjjjjjcnj',
//     name: 'Steven',
//     room: 'The Office Fans'
// }]

// var users = [];

// var addUser = (id, name, room) => {
//     users.push({})
// }

// modules.export = {addUser};


class Users {
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        // //return user that was removed
        // //for users whoose ids dont match still keep them in the array
        // var users = this.users.filter(user => user.id !== id);
        // // return users;
        // //For testing purposes, i need to map the remaining users so as to get only their names
        // var remainingUsers = users.map(usersRem => usersRem.name)
        // return remainingUsers;

        //another approach
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }
        return user; //return user if exist or undefined
    }

    getUser(id){
        // //keep this user whose id is equal to the one found in the array
        // var user = this.users.filter(oneUser => oneUser.id === id);
        // // return user;
        // //let me map to get only that users name:
        // var userName = user.map(theUser => theUser.name);
        // return userName;

        //another approach
        //if there is a user like that, give us the first object in the array of objects
        return this.users.filter(user => user.id === id)[0]
    }

    getUserList(room){
        //return true to keep the user in the array of false to remove him. we are going to check the room.
        //only return if the condition is true, and only true cases that the user will be added to the "users" list

        // var users = this.users.filter((user) => {
        //     return user.room === room; 
        // })
        var users = this.users.filter(user => user.room === room);

        //take the  array of objects above and convert to strings, we just want to get the list of names. to do so, we use maps. Make lets us return the value we want to use, remember we have id, name and room, but we choose to return only the users name:
        var namesArray = users.map(user => user.name);

        return namesArray;

    }
}

module.exports = {Users};

// class Person {
//     constructor(name, age){
//         // console.log(name, age);
//         this.name = name;
//         this.age = age;
        
//     }
//     getUserDescription(){
//         return  `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Steven', 25);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// console.log(me.getUserDescription());
