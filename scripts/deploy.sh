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

rm_exist_file(){
  if  [ -f $1  ]; then
    echo "remove $1"
    rm $1
  fi
}

Compress(){
  local cmd
  local showCMD
  local archive
  archive=$CompressedAppName
  cmd="tar -zcf $archive --exclude node_modules --exclude .env.* *"
  showCMD="tar -tvf $archive"
  echo "Ready to generate $archive"
  echo "$archive generating..."
  eval $cmd
  eval $showCMD
  echo "$archive generated"
}

rm_exist_file $CompressedAppName

Compress
wait

ssh -i $IdRsaPath $TargetHost "mkdir -p $ParentDir/$DirName"

scp -i $IdRsaPath ./$CompressedAppName $TargetHost:$ParentDir/$CompressedAppName
wait

ssh -i $IdRsaPath $TargetHost "cd $ParentDir; rm -rf $DirName; mkdir $DirName"
ssh -i $IdRsaPath $TargetHost "cd $ParentDir; tar -xvf $CompressedAppName -C $SrcDir"
ssh -i $IdRsaPath $TargetHost "cd $SrcDir; npm install; pm2 startOrRestart ecosystem.config.js"
