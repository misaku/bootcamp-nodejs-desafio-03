class Database {
    constructor () {
        this.sgbd = process.env.DB_SGBD;
        this.port = process.env.DB_PORT;
        this.banco = process.env.DB_BANCO;
        this.user = process.env.DB_USER || null;
        this.password = process.env.DB_PASS || null;
        this.ip = process.env.DB_IP;
    }

    uri () {
        let userPass = "";
        if (this.user && this.password)
            userPass = `${this.user}:${this.password}@`;

        return `${this.sgbd}://${userPass + this.ip}:${this.port}/${this.banco}`;
    }
}

module.exports = new Database().uri();
