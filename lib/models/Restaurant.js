const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.location = row.location;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }
};
