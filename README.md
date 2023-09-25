# Development Notes
## Database
1. Change the DB schema by editing the models in `functions\Database\Models`
2. Generate migration scripts with the `db-gen-migrations` VS Code task
3. Apply the migration scripts with the `db-apply-migrations` VS Code task

If you want to set up a new DB, you only need step #3.
The DB will be created at `.wrangler\state\v3\d1\[db-id]\db.sqlite`

The migrations scripts will be generated at `fuctions\Database\Schema`.
Don't forget to commit these changes.
