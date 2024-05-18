const dbpool = require('../db/config.js');

class Product {
    
    async addProduct(product) {
        try {
            // pg statement
            const statement = `INSERT INTO products (name, price, description, quantity) 
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *`;
            
            // pg value
            const value = [product.name, product.price, product.description, product.quantity]
            console.log(value);
            // make query
            // const client = dbpool.connect();
            const result = await dbpool.query(statement, value);
            // (await client).release();
            // check for valid results
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    
    /**
     * Returns product associated with id in database, if exists
     *
     * @param {integer} id the id to find product based on
     * @return {Object|null} the product
     */
    async findById(id) {
        try {
            // pg statement
            const statement = `SELECT *, 
                                    quantity>0 AS "in_stock" 
                                FROM products 
                                WHERE id = $1`;

            // make query
            //const client = dbpool.connect();
            const result = await dbpool.query(statement, [id]);
            //(await client).release();
            // const result = await dbpool.query(statement, [id]);

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
     * Returns products in the specified query, if exists
     *
     * @param {String} query the query to find products based on
     * @return {Array|null} the product(s) that fit the query
     */
    async findByQuery(query) {
        try {
            // pg statement
            const statement = `SELECT * , 
                                    quantity>0 AS "in_stock"
                                FROM products 
                                WHERE LOWER(description) 
                                LIKE LOWER('%' || $1 || '%')`;

            // make query
            const result = await dbpool.query(statement, [query]);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Returns all products in the database
     *
     * @return {Array|null} the product(s), if there are any on the database
     */
    async getAll() {
        try {
            // pg statement
            // const statement = `SELECT *, 
            //                         quantity>0 AS "in_stock" 
            //                     FROM products`;
            const statement = `SELECT * 
                                FROM products
                                WHERE quantity > 0`;

            // make query
            const result = await dbpool.query(statement);

            // check for valid results
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Update product associated with id in database if exists
     * 
     * @param {integer} id The id of product to update
     * @param {product} product The structure present to fields needs to update
     * @return {Object|null} The product
     */
    async updateProduct(id, product) {
        try {
            const fields = [];
            const values = [];
            let query_statement = 'UPDATE products SET ';

            if (product.name !== undefined) {
                fields.push('name = $' + (fields.length + 1));
                values.push(product.name);
            }
            if (product.price !== undefined) {
                fields.push('price = $' + (fields.length + 1));
                values.push(product.price);
            }
            if (product.quantity !== undefined) {
                fields.push('quantity = $' + (fields.length + 1));
                values.push(product.quantity);
            }
            if (product.description !== undefined) {
                fields.push('description = $' + (fields.length + 1));
                values.push(product.description);
            }

            if (fields.length === 0) {
                
                return res.status(400).json({ message: 'No fields to update' });
            }

            query_statement += fields.join(', ') + ', modified = now()' + ' WHERE id = $' + (fields.length + 1);
            values.push(id);

            const result = await dbpool.query(query_statement, values);

            return result;
            
        } catch (err) {
            console.error(error);
            throw new Error(err);
            
        }
    }
    /**
     * Updates quantity of product associated with id in database, if exists
     *
     * @param {integer} id the id to find product based on
     * @param {integer} amount the amount added or removed from quantity (positive or negative value)
     * @return {Object|null} the product
     */
     async updateQuantity(id, amount) {
        try {
            // pg statement
            const statement = `UPDATE products
	                            SET quantity=quantity + $2, modified=now()
	                            WHERE id=$1
                                RETURNING *, quantity>0 AS "in_stock"`;

            // make query
            const result = await dbpool.query(statement, [id, amount]);

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
     * Delete the product in database with id
     * @param {integer} id ID of the product want to delete
     * @return 
     */
    async deleteByID(id){
        try {
            const query_statement = `DELETE FROM products
                                        WHERE id = $1`;
            const result = await dbpool.query(query_statement, [id]);
            return result;
        } catch (err) {
            throw new Error(err);
        }
        
    }
}

module.exports = new Product();