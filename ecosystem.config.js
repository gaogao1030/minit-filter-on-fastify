PORT = 9000
console.log("ListenPORT:", PORT)
module.exports = {
  apps : [{
    name: 'minit-filter-on-fastity',
    script: 'npm',
    args: ['run', 'start'],
    env: { 
      PORT: PORT
    },
  }],
};
