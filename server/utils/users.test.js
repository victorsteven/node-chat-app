const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    //lets seed the users table to be able to run of test for fetching and removing user
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Steven',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Ada',
            room: 'Node Course'
        }];
    });

    it('Should add new user', () => {
        var usersObj = new Users();
        var user =  {
            id: '123',
            name: 'Victor',
            room: 'Office Deck'
        };

        var resUser = usersObj.addUser(user.id, user.name, user.room);
        //check the equality of two arrays, where "users" is the array defined in the "Users" class
        expect(usersObj.users).toEqual([user]);
    })

    it('should remove a user', () => {
        // var remUser = users.removeUser('1');
        // expect(remUser).toEqual(['Jen', 'Ada']);

        //another approach
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        // var sameUsers = users.removeUser('233');
        // expect(sameUsers).toEqual(['Steven', 'Jen', 'Ada']);

        //another approach
        var userId = '12';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

   

    it('should get a particular user', () => {
        // var onePerson = users.getUser('2');
        // expect(onePerson).toEqual(['Jen']);
        
        //another approach
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not get a particular user with wrong id', () => {
        // var onePerson = users.getUser('344');
        // expect(onePerson).toEqual([]);


        //second approach
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });


    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Steven', 'Ada']);
    });


    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    })
});