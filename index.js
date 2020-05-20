/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const commands = require('probot-commands')
var initKey = ""

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  commands(app, 'initKey', (context, command) => {
    var initKey2 = command.arguments.split(/, */)
    if (initKey != "") {
      var issueComment = context.issue({ body: 'Key 已更新。会发送一条测试消息，如果失败请检查 Key 值。' })
    } else {
      var issueComment = context.issue({ body: 'Key 已载入。会发送一条测试消息，如果失败请检查 Key 值。' })
    }
    initKey = initKey2

    var exec = require("child_process").exec
    const cmdStr = "curl  http://push.ijingniu.cn/send -X POST -d 'key=" + initKey + "&head=测试&body=发送成功。'"
    app.log(cmdStr)
    exec(cmdStr, function (err, stdout, stderr) {
      if (err) {
        app.log("Send message error: " + stderr)
      } else {
        var data = JSON.parse(stdout)
        app.log(data)
      }
    })

    // 31ab2edeb942469089e8166bf39357a0
    return context.github.issues.createComment(issueComment)
  })

  commands(app, 'send', (context, command) => { 
    var content = command.arguments.split(/, */)

    app.log("Key: " + initKey)

    if (initKey == "") {
      var issueComment = context.issue({ body: '无法检测到 Key，请以 /initKey <key> 初始化。' })
      return context.github.issues.createComment(issueComment)
    }

    var exec = require("child_process").exec
    const cmdStr = "curl  http://push.ijingniu.cn/send -X POST -d 'key=" + initKey + "&head=信息&body=" + content + "'" 
    app.log(cmdStr)
    exec(cmdStr, function (err, stdout, stderr) {
      if (err) {
        app.log("Send message error: " + stderr)
      } else {
        var data = JSON.parse(stdout)
        app.log(data)
      }
    })

    var issueComment = context.issue({ body: '内容已发送。' })
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
