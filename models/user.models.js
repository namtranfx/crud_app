const dbpool = require("../db/config");

class User {

    /**
    * Adds new user to the database
    * 
    * @param {Object} data Data about user
    * @return {Oject|null} The new user
    */
    async create(data) {
        try {
            // pg statement
            const statement = `INSERT INTO users (email, pw_hash, pw_salt) 
                                VALUES ($1, $2, $3) 
                                RETURNING *`;

            // pg values
            const values = [data.email, data.pw_hash, data.pw_salt];
            console.log(data);
            
            // make query
            const result = await dbpool.query(statement, values);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }


    /**
    * Updates a user in the database
    * 
    * @param {Obj} data Data about user to update
    * @return {Oject|null} The updated user
    */
    async updateUser(id, user_data) {
        try {
            const fields = [];
            const values = [];
            let query_statement = 'UPDATE users SET ';
            if (user_data.email !== undefined){
                fields.push('email = $' + (fields.length + 1));
                values.push(user_data.email);
            }
            if (user_data.first_name !== undefined) {
                fields.push('first_name = $' + (fields.length + 1));
                values.push(user_data.first_name);
            }
            if (user_data.last_name !== undefined){
                fields.push('last_name = $' + (fields.length + 1));
                values.push(user_data.last_name);
            }
            if (fields.length === 0) {
                
                return res.status(400).json({ message: 'No fields to update' });
            }
            query_statement += fields.join(', ') + ', modified=now()' + ' WHERE id = $' + (fields.length + 1);
            values.push(id); 

            
            // make query
            const result = await dbpool.query(query_statement, values);

            return result;
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Returns user associated with email in database, if exists
     *
     * @param {string} email the email to find user based on
     * @return {Object|null} the user
     */
    async findByEmail(email) {
        try {
            // pg statement
            const statement = `SELECT *
                                FROM users 
                                WHERE email = $1`;

            // make query
            const result = await dbpool.query(statement, [email]);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Returns user associated with id in database, if exists
     *
     * @param {number} id the id to find user based on
     * @return {Object|null} the user
     */
    async findById(id) {
        try {
            // pg statement
            const statement = `SELECT *
                                FROM users 
                                WHERE id = $1`;

            // make query
            const result = await dbpool.query(statement, [id]);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Deletes user associated with email in database, if exists
     * For use with testing, not for use with production. 
     *
     * @param {string} email the email to delete user based on
     * @return {Object|null} the user
     */
    async deleteByEmail(email) {
        try {
            // pg statement
            const statement = `DELETE FROM users  
                                WHERE email=$1
                                RETURNING *`

            // make query
            const result = await dbpool.query(statement, [email]);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }
    /**
     * Deletes user associated with id in database, if exists
     * For use with testing, not for use with production. 
     *
     * @param {string} id the email to delete user based on
     * @return {Object|null} the user
     */
    async deleteByID(id) {
        try {
            // pg statement
            const statement = `DELETE FROM users  
                                WHERE id = $1`;

            // make query
            const result = await dbpool.query(statement, [id]);

            return result;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = new User();