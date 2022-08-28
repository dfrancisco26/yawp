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

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM reviews WHERE id=$1
      `,
      [id]
    );

    return rows[0];
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM reviews WHERE id=$1
      `, [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return new Review(rows[0]);
  }
};


//Add a findbyId method to Review class.
// In authorize, need to get review, then check if userId is the same as the review's userId.
// Check req.user.id === review.userId.
// If not true, throw error, otherwise, next.
