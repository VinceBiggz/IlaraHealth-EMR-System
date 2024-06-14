// inventory.test.js
const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');
const { generateToken } = require('../utils/tokenUtils');

describe('Inventory API', () => {
  const testItem = {
    name: 'Test Item',
    quantity: 100,
    low_stock_threshold: 10,
  };

  let adminToken, pharmacistToken, createdItemId;

  beforeAll(async () => {
    adminToken = generateToken('admin@example.com', 'admin');
    pharmacistToken = generateToken('pharmacist@example.com', 'pharmacist');
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });

    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'pharmacist@example.com',
        password: 'password123',
        role: 'pharmacist',
      });

    // Create an item for update/delete tests
    const createRes = await request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testItem);
    createdItemId = createRes.body.item_id;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM inventory');
    await pool.query('DELETE FROM users');
    await pool.end();
  });
  // ... GET tests ... (same as before)

  describe('POST /api/inventory', () => {
    it('should create a new item (201, admin)', async () => {
      const newItem = { name: 'New Test Item', quantity: 50, low_stock_threshold: 5 };
      const res = await request(app)
        .post('/api/inventory')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newItem);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('item_id');
      expect(res.body.name).toBe(newItem.name);
    });

    // ... other POST tests ... (same as before)
  });

  describe('PUT /api/inventory/:id', () => {
    it('should update an item (200, admin)', async () => {
      const updatedItem = {
        name: 'Updated Test Item',
        quantity: 50,
        low_stock_threshold: 5,
      };
      const res = await request(app)
        .put(`/api/inventory/${createdItemId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedItem);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Test Item');
      expect(res.body.quantity).toBe(50);
      expect(res.body.low_stock_threshold).toBe(5);
    });

    // ... other PUT tests ... (same as before)
  });

  describe('DELETE /api/inventory/:id', () => {
    it('should delete an item (204, admin)', async () => {
      const res = await request(app)
        .delete(`/api/inventory/${createdItemId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(204); // No content for successful delete

      // Verify that the item is actually deleted
      const getRes = await request(app)
        .get(`/api/inventory/${createdItemId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(getRes.statusCode).toBe(404); // Not found
    });

    // ... other DELETE tests ... (same as before)
  });

  // ... (tests for POST /checkout) ... (same as before)
});
