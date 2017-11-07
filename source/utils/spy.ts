import config from '../config'
import bot from '../bot'

export const spy = ({ text, first_name, last_name, username }: any) => {
  const data = asSpier(`firstname: ${first_name}\nlastname: ${last_name}\nusername: @${username}\n\nmsg: ${text}`)
  sendToSpier(data)
}

export const spyLog = (msg: any) => {
  const data = asLogger(msg)
  sendToSpier(data)
}

export const startup = () => sendToSpier('#wakeup')

const asSpier =
  (msg: string) =>
    `#spy\n----------\n${msg}\n----------`

const asLogger =
  (msg: string) =>
    `#log\n----------\n${msg}\n----------`

const sendToSpier = (text: string) =>
  config.spyUserIds.forEach(spyId => bot.sendMessage(spyId, text))
