# board-game
# Build using: docker build -t "board-game:0.0.1" --rm=true --no-cache .
# Run as: docker run --name board-game -p 8000:8000 -v /path/to/board-game/:/board-game/ -d board-game:0.0.1
# NOTE: You have to provide the absolute path to the source code of board-game
# before running the docker run command
#
# NAME             board-game
# VERSION          0.0.1
# LAST_UPDATED     2016-07-07 07:58

FROM     ubuntu:14.04
MAINTAINER Radhakrishna Nayak "nayak.radhakrishna@gmail.com"
RUN apt-get update && apt-get  -y upgrade
RUN apt-get -y install wget xz-utils
RUN wget "https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-x64.tar.xz"
RUN xz -d node-v4.4.7-linux-x64.tar.xz
RUN tar -xf node-*.tar
RUN rm node-*.tar
RUN mv node-* /opt/node
RUN echo 'export PATH=$PATH:/opt/node/bin/' >> ~/.bashrc
RUN ln -s /opt/node/bin/* /bin/
RUN npm install -g pm2
RUN npm install -g webpack
ADD run.sh /

EXPOSE 8000

CMD    ["sh", "/run.sh"]
