const {Pool} = require('pg');

const PoolConfig = {
	user: 'postgres',
	password: 'natragent',
	host: 'localhost',
	port: '5432',
	database: 'postgres',
	max: 10, // max connection of pool
  	idleTimeoutMillis: 30000, // Thời gian chờ tối đa trước khi kết nối bị xóa khỏi pool
  	connectionTimeoutMillis: 2000, // Thời gian chờ tối đa để một kết nối mới được tạo ra
 
};

const dbpool = new Pool(PoolConfig);
module.exports = dbpool;
// try {
// 	const initresult = dbpool.query(`CREATE TABLE "products" (
// 		"id" SERIAL PRIMARY KEY,
// 		"name" varchar NOT NULL,
// 		"price" numeric NOT NULL,
// 		"description" text NOT NULL,
// 		"quantity" int NOT NULL DEFAULT 0
// 	  )`);
// 	  console.log("Created table");
// } catch (err){
// 	console.log(err);
// }

// try {
// 	const result = dbpool.query(`INSERT INTO products(name, price, description, quantity) 
// 	VALUES ($1, $2, $3, $4);`, ["product name", 100, "Nothing", 5]);
// 	console.log(result)
// } catch (err) {
// 	console.log("ERR");
// }
// try {
// 	console.log(dbpool.query(`SELECT * FROM products`));
// } catch (err) {
// 	console.log("Err");
// }
