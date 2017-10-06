import config from '../config';
import bot from './bot';

export function spy(msg: any) {
  const { from } = msg;
  const data = asSpier(`firstname: ${from.first_name}\nlastname: ${from.last_name}\nusername: @${from.username}\n\nmsg: ${msg.text}`);
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
