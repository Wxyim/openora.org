---
title: "基于 Netty 实现 Redis 服务"
description: "基于 Netty 模拟实现 Redis 服务的各种功能。"
publishDate: "2026-05-08 20:01+0800"
tags: ["java", "netty", "redis", "practice"]
draft: false
---
### 前言
　　之前使用 Java 模拟实现的 Redis 存在代码耦合严重，线程通信不灵活等问题，现在探索基于 Netty 框架的实现。

### 实现服务端
　　Netty 框架使用 group 管理线程，这里建立 bossGroup 用于处理客户端连接，workerGroup 用于与管理客户端数据通信。

　　Netty 通道使用非阻塞 IO 模型。接着注册自定义处理器 Handler 到 pipeline 中。

　　这里 RedisCommandHandler 就是用于收到客户端指令，执行相应的操作。

　　监听指定端口后，调用 sync 阻塞当前主线程，防止服务器关闭以接受多客户端连接。直到服务器的 Channel 被关闭。

```java
        // 新写法 (Netty 4.2+): 使用通用多线程组 + Nio 处理器插件
        EventLoopGroup bossGroup = new MultiThreadIoEventLoopGroup(1, NioIoHandler.newFactory());

        // 默认线程数（CPU 核心数 * 2）
        EventLoopGroup workerGroup = new MultiThreadIoEventLoopGroup(NioIoHandler.newFactory());

        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class) // 指定使用 NIO (非阻塞 IO) 模型
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            // Netty 自带解码器与聚合器，注意顺序：先 Decoder，再 Aggregator
                            ch.pipeline().addLast(new RedisDecoder());
                            ch.pipeline().addLast(new RedisBulkStringAggregator());
                            ch.pipeline().addLast(new RedisArrayAggregator());
                            // 将我们自定义的事件处理器，注册到这个连接的流水线 (Pipeline) 中
                            ch.pipeline().addLast(new RedisCommandHandler());
                        }
                    });

            // 绑定端口，启动服务器
            int port = (int) argsMap.get("port");
            System.out.println("异步事件驱动 Redis 服务网关已启动，监听端口: " + port);
            ChannelFuture f = b.bind(port).sync();

            // 阻塞当前的主线程，直到服务器的 Channel 被关闭
            f.channel().closeFuture().sync();
        } finally {
            // 优雅停机
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
```

### 实现客户端
　　同样使用 Netty 提供的模型，只建立一个组即可，用于连接建立和命令交互。

　　这里加入 Netty 自带的解码器，可以自动转为 RedisMessage 对象，再通过自定义的业务处理器 Handler 处理。

　　编码器则用于出站，发送数据时转换为 ByteBuf。

　　连接到服务器后通过 while 循环执行读取从终端的输入，实现命令交互。

```java
        EventLoopGroup workerGroup = new MultiThreadIoEventLoopGroup(1, NioIoHandler.newFactory());

        try {
            Bootstrap bootstrap = new Bootstrap();

            bootstrap.group(workerGroup)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) {
                            // 解码器：将 ByteBuf 转换为 RedisMessage
                            ch.pipeline().addLast(new RedisDecoder());
                            // 聚合器：聚合 Bulk String 和 Array
                            ch.pipeline().addLast(new RedisBulkStringAggregator());
                            ch.pipeline().addLast(new RedisArrayAggregator());
                            // 编码器：将 RedisMessage 转换为 ByteBuf
                            ch.pipeline().addLast(new RedisEncoder());
                            // 业务处理器
                            ch.pipeline().addLast(new RedisClientHandler());
                        }
                    });

            Channel channel = bootstrap.connect("127.0.0.1", 6379).sync().channel();
            System.out.println("Redis 客户端已连接到: 127.0.0.1:6379");
            System.out.println("请输入 Redis 命令 (例如: SET key value)，输入 'quit' 退出:");

            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
            while (true) {
                String line = in.readLine();
                if (line == null || "quit".equalsIgnoreCase(line)) {
                    break;
                }
                if (line.trim().isEmpty()) {
                    continue;
                }

                // 将输入的字符串解析为 Redis 命令格式
                String[] cmds = line.split("\\s+");
                List<RedisMessage> children = new ArrayList<>(cmds.length);
                for (String cmd : cmds) {
                    children.add(new FullBulkStringRedisMessage(
                            ByteBufUtil.writeUtf8(channel.alloc(), cmd)
                    ));
                }
                RedisMessage request = new ArrayRedisMessage(children);
                channel.writeAndFlush(request);
            }

            channel.closeFuture().sync();
        } finally {
            // 优雅停机
            workerGroup.shutdownGracefully();
        }
```

### 待续
　　目前框架搭建完成了，只实现了几个简单的命令，得益于 Netty 的支撑，明显可以看到结构上可扩展性提升了，基于事件响应性能提高也会是必然的。
