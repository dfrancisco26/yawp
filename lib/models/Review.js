const pool = require('../utils/pool');

module.exports = class Review {
  id;
  userId;
  restaurantId;
  detail;
  stars;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.restaurantId = row.restaurant_id;
    this.detail = row.detail;
    this.stars = row.stars;
  }

  static async insert(userId, restaurantId, detail, stars) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (user_id, restaurant_id, detail, stars)
              VALUES($1, $2, $3, $4)
              RETURNING *`,
      [userId, restaurantId, detail, stars]
    );

    return new Review(rows[0]);
  }
};
