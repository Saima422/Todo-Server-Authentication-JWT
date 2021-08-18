class User{
    constructor({firstname, lastname, email, password, token}){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;