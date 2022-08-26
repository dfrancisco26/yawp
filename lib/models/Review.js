const pool = require('../utils/pool');

module.exports = class Review {
  id;
  restaurantId;
  userId;
  rating;
  detail;

  constructor(row) {
    this.id = row.id;
    this.restaurantId = row.restaurant_id;
    this.userId = row.user_id;
    this.rating = row.rating;
    this.detail = row.detail;
  }

  static async insertReview({ restaurantId, userId, rating, detail }) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (restaurant_id, user_id, rating, detail)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
      [restaurantId, userId, rating, detail]
    );
    return new Review(rows[0]);
  }

  static async getReviewsByRestaurantId(restaurantId) {
    const { rows } = await pool.query(
      `
        SELECT * 
        FROM reviews 
        WHERE restaurant_id=$1
        `, [restaurantId]
    );

    if (!rows[0]) return null;

    return rows.map((row) => new Review(row));
  }
};
