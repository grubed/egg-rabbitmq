'use strict';
const amqp = require('amqplib');

module.exports = agent => {
  agent.messenger.on('egg-ready', async () => {
    const rabbitmqConfig = agent.config.rabbitmq;
    // console.log(agent.config.rabbitmq);
    //const exchange = 'my';
    const conn = await amqp.connect(rabbitmqConfig.amqp);
    const channel = await conn.createChannel();
    await channel.assertExchange(rabbitmqConfig.exchange, rabbitmqConfig.exchangeType, {durable:true});
    const ok = await channel.assertQueue(rabbitmqConfig.queue, { exclusive: false });
    await channel.bindQueue(ok.queue, rabbitmqConfig.exchange, 'top.*');
    console.log('consume');
    await channel.consume(ok.queue, (msg) => {
      // console.log(msg);
      agent.messenger.sendRandom('xxx_action', JSON.parse(msg.content.toString()))
    console.log(`[Key: ${msg.fields.routingKey}] ${msg.content.toString()}`);
    channel.ack(msg);
  });
//   agent.beforeStart(async () => {
//
// });
});
};