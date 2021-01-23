const { Octokit } = require("@octokit/rest");

/* eslint-disable */
const options = {
  owner: process.env.GH_OWNER || "kaitmore",
  repo: process.env.GH_REPO || "copypasta",
  token: process.env.GH_TOKEN
};

exports.handler = async function (event, context) {
  const { owner, repo, token } = options;
  const github = new Octokit({ auth: token });
  const { data: releases } = await github.repos.listReleases({
    owner,
    repo
  });
  const latestRelease = releases.shift();

  let asset;
  try {
    asset = latestRelease.assets.find((a) => a.name.endsWith(".dmg"));
  } catch (e) {
    console.error("Could not find the latest release asset");
    process.exit(1);
  }
  return {
    statusCode: 200,
    body: `Download ${asset.browser_download_url}`
  };

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
