import bot from '../bot';
import dictionary from '../locales/dictionary';

function subscribeLocation() {
  bot.on('location', subscriber);
}

const subscriber = (msg: any) => {
  const { latitude, longitude } = msg.location;
  msg.reply.text('Я пока так не умею :С\nНо скоро научусь!');
};

subscribeLocation();
