#mongorestore -d gspacex /dump/latest.agz
#mongorestore --gzip --archive=/dump/latest.agz --db gspacex -u gspacex -p gspacex --authenticationDatabase 'admin' --port 27000 --host db
#mongorestore --gzip --archive=/dump/latest.agz --db gspacex -u gspacex -p gspacex
#mongorestore --gzip --archive=/dump/latest.agz --nsInclude="*"
#mongorestore --gzip --archive=/dump/latest.agz --nsInclude="*" -u gspacex -p gspacex --authenticationDatabase 'admin' --port 27000 --host db
mongorestore --gzip --archive=/dump/latest.agz --nsInclude="*" -u gspacex -p gspacex