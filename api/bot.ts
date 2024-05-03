import { Bot, GrammyError, HttpError, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;
const webApp = process.env.WEB_APP;
if (!token) throw new Error('BOT_TOKEN is unset');
// Create your bot and tell it about your context type
const bot = new Bot(token);

bot.use(async (ctx, next) => {
  // eslint-disable-next-line no-console
  console.log(ctx.msg);
  await next();
});

bot.catch((err) => {
  const { ctx } = err;
  // eslint-disable-next-line no-console
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    // eslint-disable-next-line no-console
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    // eslint-disable-next-line no-console
    console.error('Could not contact Telegram:', e);
  } else {
    // eslint-disable-next-line no-console
    console.error('Unknown error:', e);
  }
});

const introductionMessage = 'Приветствую!';

bot.command(
  'start',
  async (ctx) =>
    // eslint-disable-next-line no-return-await
    await ctx.reply(introductionMessage, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Запустить приложение', web_app: { url: webApp ?? '' } }],
        ],
      },
    })
);
/* eslint-disable 
  @typescript-eslint/no-var-requires,
  import/no-extraneous-dependencies,
  global-require
*/
if (process.env.NODE_ENV === 'development') {
  const { run } = require('@grammyjs/runner');
  const runner = run(bot);

  const stopRunner = () => (runner.isRunning() as boolean) && runner.stop();

  process.once('SIGINT', stopRunner);
  process.once('SIGTERM', stopRunner);
}

export default webhookCallback(bot, 'http');
