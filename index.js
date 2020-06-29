const github = require('@actions/github');
const core = require('@actions/core');

const authToken = core.getInput('token', {required: true});
const octokit = github.getOctokit(authToken);
const context = github.context;

const { owner, repo } = context.repo;
const sha = context.sha;
const sourceBranch = core.getInput('source-branch', {required: true});
const branch = core.getInput('target-branch', {required: true});
const force = (core.getInput('force') || 'false').toUpperCase() === 'TRUE'

octokit.git.getRef({ owner, repo, ref: `heads/${sourceBranch}`}).then(ref=>{
  
  const sourceSha = ref.data.object.sha;
  core.info('Source branch SHA - ' + sourceSha)

  octokit.git.updateRef({owner, repo, ref: `heads/${branch}`, sha: sourceSha, force}).
    catch(error => {
      core.setFailed(`Failed to update ref: ${error}`);
    });
  
}).
catch(error => {
  core.setFailed(`Failed to get ref: ${error}`);
});


