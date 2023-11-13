import { Router, Request, Response, NextFunction } from 'express';
import pool from '../postdb'
import { CheckID, validate } from '../Misc/CommonFunctions';
import { log } from 'console';
const router = Router();
// get All records
router.get('/', async (req: Request, res: Response) => {
    const email = req.query.email as string;

    if (!email) {
        return res.status(400).json({ error: 'Email parameter is missing' });
    }
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log(existingUser.rows[0].id);
        console.log("fethicng this uers data");

        const userRecords = await pool.query('SELECT * FROM userrecords WHERE user_email_id = $1', [existingUser.rows[0].id]);
        console.log(userRecords.rows);

        return res.status(200).send(userRecords.rows);
    } catch (error) {

    }
    res.json({ message: `Received email: ${email}` });
});
// create user  
router.post('/', async (req: Request, res: Response) => {
    console.log("came to login");

    try {
        const { email } = req.body;
        console.log(`email recevied from app is ${email}`);

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(200).send('exists');
        }

        const result = await pool.query('INSERT INTO users (email) VALUES ($1)', [email]);

        return res.status(200).send('new');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Upload
router.post('/add', async (req: Request, res: Response) => {
    const id = req.query.id as string;

    console.log(`come here to delete the record from userrecord with id - ${id}`);

    const { title, user, desp, TagArray } = req.body;
    try {
        await pool.query('BEGIN');
        // Assuming "User" table has 'id' as primary key
        const userQueryResult = await pool.query('SELECT id FROM "users" WHERE email = $1', [user]);

        if (userQueryResult.rows.length === 0) {
            // User not found, you may want to handle this case
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = userQueryResult.rows[0].id;

        // Inserting data into "UserRecords" table
        const insertQuery = `
          INSERT INTO "userrecords" (user_email_id, title, description, tags, media)
          VALUES ($1, $2, $3, $4, $5)
        `;

        const insertValues = [userId, title, desp, TagArray, null]; // Assuming media is not included in this example

        await pool.query(insertQuery, insertValues);

        await pool.query('COMMIT');
        console.log("inserted");

        return res.json({ message: 'Data added successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }

});
// Delete Record
router.delete('/', async (req: Request, res: Response) => {
    const id = req.query.id as string;
    console.log(`Came to delete the record with id - ${id}`);
    const { title, user, desp, TagArray } = req.body;
    try {
        // Delete the row from the 'userrecords' table based on the provided 'id'
        const deleteResult = await pool.query('DELETE FROM userrecords WHERE id = $1', [id]);

        // Check if any row was deleted
        if (deleteResult.rowCount && deleteResult.rowCount > 0) {
            return res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});
// edit record

router.put('/', async (req: Request, res: Response) => {
    console.log("came to update record");
    const id = req.query.id as string;
    try {
        const userId = req.params.id;
        const { title, desp, TagArray } = req.body;
        const result = await pool.query(
            'UPDATE userrecords SET title = $1, description = $2, tags = $3 WHERE id = $4',
            [title, desp, TagArray, id]
        );

        if (result.rowCount && result.rowCount > 0) {
            // If rowCount is greater than 0, the update was successful
            return res.status(200).send('updated');
        } else {
            // If rowCount is 0, no record was updated (user with the given ID not found)
            return res.status(404).send('User not found');
        }
    } catch (error) {
        
        console.error('Error updating user record:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Wrong URL');
});
export default router;
