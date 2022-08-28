const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;
  location;
  reviews;

  constructor({ id, name, type, location, reviews }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.location = location;
    this.reviews = reviews ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
      restaurants.*,
      COALESCE(
        json_agg(to_jsonb(reviews))
      FILTER (WHERE reviews.id IS NOT NULL), '[]'
      ) AS reviews
      FROM restaurants
      LEFT JOIN reviews on reviews.restaurant_id = restaurants.id
      WHERE restaurant_id = $1
      GROUP BY restaurants.id
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
};
