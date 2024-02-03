### Things to remember
- better to generate js files and run them for cloud database sync
- make sure to regularly backup database

### To complite the code use
```bash
npm run complite
```
then go to dist folder form the root dir and run index.js with
```
node index.js
```
```note
Do not run node dist/index.js it will cause error in file routing for module fetching
```
## How to backup database to cloud
Its save to remove the database in the cloud but using sql queries
```sql
drop table userrecords;
```
```sql
drop table users
```
these 2 will delete the databases and will not give any error while syncing
###### use this to restore database into cloud

```bash
pg_restore -U kondashivaradhan007 -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -c -C -v local_dump.sql
```
this cmd was giving a error and clearly stating to use pql
```bash
psql -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -f local_dump.sql
```
note* make sure to be ready with the passwords for each command

###### use this cmd to generate a local restore point
```bash
pg_dump -U postgres -h 127.0.0.1 -p 5432 -d rimmindDB > local_dump.sql
```