BaseConfig(){
  AppName="minit-filter-on-fastify"
  DirName=$AppName
  CompressedAppName="$AppName.tar.gz"
  ENVFILE=".env.local"
  UserDir="/home/ubuntu"
  TargetHost="ubuntu@jp.osaka"
  ParentDir="$UserDir/AIGPT"
  IdRsaPath="~/.ssh/stel_rsa"
  SrcDir="$ParentDir/$DirName"
}

BaseConfig

#ssh -i $IdRsaPath $TargetHost "cd $SrcDir; rm words.txt"

scp -i $IdRsaPath "./words.txt" "$TargetHost:$SrcDir/words.txt"
ssh -i $IdRsaPath $TargetHost "cd $SrcDir; pm2 startOrRestart ecosystem.config.js"
