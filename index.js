const Client = require("replcraft");

const clients = [];

async function client() {
  var numToAdd = 20 - clients.length;
  for (var i = 0; i < numToAdd; i++) {
    (async () => {
      const client = new Client();
      await client.login(process.env.token);
      clients.push(client);
    })
  }
  if (clients.length == 0) {
    const client = new Client();
    await client.login(process.env.token);
    return client;
  } else {
    return clients.shift();
  }
}

(async () => {
  const c1 = await client();
  await c1.watchAll();
  c1.on('block update', async (cause, block, x, y, z) => {
    console.log({ cause, block, x, y, z })
    if (x != 2 || y != 0 || z != 2) return;
    if (cause != 'redstone') return;
    if (block.includes('powered=true')) {
      await (await client()).setSignText(1, 0, 1, [
        "Pandapip1",
        "1",
        "B 150",
        "Written Book#6"
      ]);
      return;
    }
    for (var i = 0; i < 5; i++) {
      if (Math.random() > 0.37) {
        (await client()).setBlock(3, 1, 0, "minecraft:brown_concrete");
      } else {
        (await client()).setBlock(3, 1, 0, "minecraft:blue_concrete");
      }
      if (Math.random() > 0.37) {
        (await client()).setBlock(3, 1, 1, "minecraft:brown_concrete");
      } else {
        (await client()).setBlock(3, 1, 1, "minecraft:blue_concrete");
      }
      if (Math.random() > 0.37) {
        (await client()).setBlock(3, 1, 2, "minecraft:brown_concrete");
      } else {
        (await client()).setBlock(3, 1, 2, "minecraft:blue_concrete");
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (Math.random() < 0.05) {
      (await client()).setBlock(3, 1, 0, "minecraft:blue_concrete");
      (await client()).setBlock(3, 1, 1, "minecraft:blue_concrete");
      (await client()).setBlock(3, 1, 2, "minecraft:blue_concrete");
      await (await client()).setSignText(1, 0, 1, [
        "Pandapip1",
        "1",
        "S 1500",
        "Written Book#6"
      ]);
    } else {
      if (Math.random() > 0.67) {
        await (await client()).setBlock(3, 1, 0, "minecraft:brown_concrete");
      } else {
        await (await client()).setBlock(3, 1, 0, "minecraft:blue_concrete");
      }
      if (Math.random() > 0.70) {
        await (await client()).setBlock(3, 1, 1, "minecraft:brown_concrete");
      } else {
        await (await client()).setBlock(3, 1, 1, "minecraft:blue_concrete");
      }
      if (Math.random() > 0.70) {
        await (await client()).setBlock(3, 1, 2, "minecraft:brown_concrete");
      } else {
        await (await client()).setBlock(3, 1, 2, "minecraft:blue_concrete");
      }
      if (Math.random() < 0.70) {
        await (await client()).setBlock(3, 1, 2, "minecraft:brown_concrete");
      } else if (Math.random() < 0.5) {
        await (await client()).setBlock(3, 1, 1, "minecraft:brown_concrete");
      } else {
        await (await client()).setBlock(3, 1, 0, "minecraft:brown_concrete");
      }
      await (await client()).setSignText(1, 0, 1, [
        "Pandapip1",
        "1",
        "S 50",
        "Written Book#6"
      ]);
    }
  })
})();