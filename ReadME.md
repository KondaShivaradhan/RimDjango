### Things to remember
- better to generate js files and run them for cloud database sync
- make sure to regularly backup database

### To complite the code use
```bash
npm run complite
```
then go to dist folder form the root dir and run index.js with
```bash
node index.js
```
## How to pg dump and restore databse

###### use this to restore database into cloud

```bash
pg_restore -U kondashivaradhan007 -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -c -C -v local_dump.sql
```
this cmd was giving a error and clearly stating to use pql
```bash
psql -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -f local_dump.sql

```

###### use this cmd to generate a local restore point
```bash
pg_dump -U postgres -h 127.0.0.1 -p 5432 -d rimmindDB > local_dump.sql
```