import { exec } from 'child_process';
import { poolCloud } from '../../postdb';

export interface cloudWrite {
    id: string
    title: string
    user: string
    desp: string
    TagArray: string
}
// haElMPY70TOc
// creating user in cloud
export function CreateUserInCloud(email:string):void{
    try {
        console.log(`email recevied from app is ${email}`);


        // asdfa
        const cloudConnectionString = 'postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true';

        const writeCommand = `psql "${cloudConnectionString}" -c "INSERT INTO users (email) VALUES ('${email}');"`;
    
        const childProcess = exec(writeCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error writing to cloud database: ${error}`);
            } else {
                console.log('Write New user to cloud database complete.');
            }
        });
    
        childProcess.unref();
    } catch (error) {
        console.error('Error inserting data into the cloud', error);
        
    }
}
// editing record in cloud

export function EditRecordInCloud(data:cloudWrite): void {

    const { id ,title, desp, TagArray } = data;
    console.log(`come here to insert the record into cloud from userrecord with id - ${id}`);
   
    const cloudConnectionString = 'postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true';

    const writeCommand = `psql "${cloudConnectionString}" -c "UPDATE userrecords SET title = '${title}', description = '${desp}', tags = '{${TagArray}}' WHERE id = '${id}';"`;

    const childProcess = exec(writeCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error editing a record in cloud database ${error}`);
        } else {
            console.log('Editing record in cloud is complete.');
        }
    });

    childProcess.unref();
}

export function writeDataToCloud(data:cloudWrite): void {


    const { id ,title, user, desp, TagArray } = data;
    console.log(`come here to insert the record into cloud from userrecord with id - ${id}`);
    async function insertLogin(){
        try {
            poolCloud.query('BEGIN');
           // Assuming "User" table has 'id' as primary key
           const userQueryResult = await poolCloud.query('SELECT id FROM "users" WHERE email = $1', [user]);
   
           const userId = userQueryResult.rows[0].id;
   
           const insertQuery = `
             INSERT INTO "userrecords" (user_email_id, title, description, tags, media)
             VALUES ($1, $2, $3, $4, $5)
           `;
   
           const insertValues = [userId, title, desp, TagArray, null]; 
   
            poolCloud.query(insertQuery, insertValues);
   
            poolCloud.query('COMMIT');
           console.log("inserted into the cloud");
       } catch (error) {
            poolCloud.query('ROLLBACK');
           throw error;
       }
    }
   
    const cloudConnectionString = 'postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true';

    const writeCommand = `psql "${cloudConnectionString}" -c "INSERT INTO userrecords (user_email_id, title, description, tags, media)
     VALUES ('${data.id}','${data.title}','${data.desp}','{${data.TagArray}}',null);"`;

    const childProcess = exec(writeCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error writing to cloud database: ${error}`);
        } else {
            console.log('Write to cloud database complete.');
        }
    });

    childProcess.unref();
}

