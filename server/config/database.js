const mongoose = require('mongoose');

/**
 * Database connection singleton
 * Ensures only one connection is maintained throughout the application
 */
class DatabaseConnection {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
  }

  /**
   * Get or create database connection
   * @returns {Promise<mongoose.Connection>}
   */
  async getConnection() {
    // Return existing connection if available
    if (this.connection && this.connection.readyState === 1) {
      return this.connection;
    }

    // Wait if connection is in progress
    if (this.isConnecting) {
      return new Promise((resolve) => {
        const checkConnection = setInterval(() => {
          if (this.connection && this.connection.readyState === 1) {
            clearInterval(checkConnection);
            resolve(this.connection);
          }
        }, 100);
      });
    }

    // Create new connection
    this.isConnecting = true;
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      this.connection = mongoose.connection;
      this.isConnecting = false;
      console.log('✅ Database connection established');
      return this.connection;
    } catch (error) {
      this.isConnecting = false;
      console.error('❌ Database connection error:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  async closeConnection() {
    if (this.connection) {
      await mongoose.connection.close();
      this.connection = null;
      console.log('Database connection closed');
    }
  }
}

// Export singleton instance
module.exports = new DatabaseConnection();
