/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    var exec = require("child_process").exec
    cmdStr = "curl  http://push.ijingniu.cn/send -X POST -d 'key=31ab2edeb942469089e8166bf39357a0&head=测试&body=啊呀'"
    exec(cmdStr, function(err, stdout, stderr) {
      if (err) {
        app.log("Send message error: " + stderr)
      } else {
        var data = JSON.parse(stdout)
        app.log(data)
      }
    })
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
