# ref: https://probot.github.io/docs/deployment/#heroku
git push heroku master
# heroku config:set LOG_LEVEL=trace
# heroku logs --tail