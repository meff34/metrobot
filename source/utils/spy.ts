import config from '../config';
import bot from '../telebotModules/bot';

export function spy(msg: any) {
  const { first_name, last_name, username } = msg.from;
  const data = asSpier(`firstname: ${first_name}\nlastname: ${last_name}\nusername: @${username}\n\nmsg: ${msg.text}`);
  sendToSpier(data);
}

export function spyLog(msg: any) {
  const data = asLogger(msg);
  sendToSpier(data);
}

const asSpier =
  (msg: string) =>
    `#spy\n----------\n${msg}\n----------`;

const asLogger =
  (msg: string) =>
    `#log\n----------\n${msg}\n----------`;

const sendToSpier = (text: string) =>
  config.spyUserIds.forEach(spyId => bot.sendMessage(spyId, text));
