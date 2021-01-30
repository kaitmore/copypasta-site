const { Octokit } = require("@octokit/rest");
const fetch = require("node-fetch");
const fs = require("fs");
const streamPipeline = require("util").promisify(require("stream").pipeline);
const path = require("path");
const https = require("https");
/* eslint-disable */
const config = {
  owner: process.env.GH_OWNER || "kaitmore",
  repo: process.env.GH_REPO || "copypasta",
  token: process.env.GH_TOKEN
};

exports.handler = async function (event, context) {
  const { owner, repo, token } = config;
  const github = new Octokit({ auth: token });

  const { data: releases } = await github.repos.listReleases({
    owner,
    repo
  });
  const latestRelease = releases.shift();

  let asset;
  try {
    asset = latestRelease.assets.find((a) => a.name.endsWith(".zip"));
  } catch (e) {
    console.error("Could not find the latest release asset");
    process.exit(1);
  }

  let content;
  // const response = await fetch(
  //   `https://${token}@api.github.com/repos/kaitmore/copypasta/releases/assets/${asset.id}`,
  //   {
  //     headers: {
  //       Accept: "application/octet-stream",
  //       "User-Agent": ""
  //     }
  //   }
  // );
  // fs.unlinkSync(`/tmp/${asset.name}`);

  // if (!response.ok)
  //   throw new Error(`unexpected response ${response.statusText}`);
  // await streamPipeline(
  //   response.body,
  //   fs.createWriteStream(`/tmp/${asset.name}`)
  // );

  // content = await fs.promises.readFile(path.join("/tmp", asset.name), {
  //   encoding: "utf8"
  // });
  console.log("here");
  // const stats = fs.statSync(path.join("/tmp", asset.name));
  const res = await once(
    https.get(
      `https://${token}@api.github.com/repos/kaitmore/copypasta/releases/assets/${asset.id}`,
      {
        headers: {
          Accept: "application/octet-stream",
          "User-Agent": ""
        }
      }
    ),
    "response"
  );
  console.log("res", res);
  const chunks = [];
  let size = 0;

  function receive(buf) {
    size += buf.length;
    chunks.push(buf);
  }
  res.on("data", receive);

  try {
    await once(res, "end");
  } finally {
    res.removeListener("data", receive);
  }

  return {
    statusCode: 200,
    isBase64Encoded: true,
    body: Buffer.concat(chunks, size).toString("base64"),
    headers: {
      "Content-type": "application/octet-stream",
      "Content-disposition": `attachment; filename=${asset.name}`
    }
  };

  function once(emitter, event) {
    return new Promise((resolve, reject) => {
      function pass(arg) {
        console.log("arg", arg);
        emitter.removeListener("error", fail);
        resolve(arg);
      }
      function fail(arg) {
        emitter.removeListener(event, fail);
        reject(arg);
      }
      emitter.once(event, pass);
      emitter.once("error", fail);
    });
  }
  // let asset_id;
  // try {
  //   asset_id = latestRelease.assets.find((a) => a.name.endsWith(".dmg")).id;
  // } catch (e) {
  //   console.error("Could not find the latest release asset");
  //   process.exit(1);
  // }
  // console.log(latestRelease.assets);
  // const asset = await github.repos.getReleaseAsset({
  //   owner,
  //   repo,
  //   asset_id
  // });

  // console.log("asset", asset);
};
