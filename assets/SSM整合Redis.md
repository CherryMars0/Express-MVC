---
title: SSM整合Redis
date: 2022-06-17 15:00:41
categories:
- coder
- 后端
tags: 
- Java
- Redis
---

## 	1.导入Maven坐标依赖

```java
   	    <!-- redis-->
        <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>2.4.2</version>
        </dependency>
        <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-redis</artifactId>
        <version>1.3.0.RELEASE</version>
        </dependency>
```

## 	2.创建redis.properties文件

```properties
        redis.host=127.0.0.1	
        redis.port=6379
        redis.password=123456
        #最大空闲数(默认:8)
        redis.maxIdle=300
        #当连接池资源耗尽时,调用者最大阻塞时间,超时将抛出异常.单位:毫秒,默认:-1,表示永不超时.
        redis.maxWaitMillis=1000
        #最大连接数(默认:8)
        redis.maxTotal=500
        #指明是否在从池中取出连接前进行检验,如果检验失败,则从池中去除连接并尝试取出另一个 (默认:false)
        redis.testOnBorrow=true
        redis.testOnReturn=true
        redis.testWhileIdle=true
        redis.blockWhenExhausted=false
        redis.numTestsPerEvictionRun=1024
        redis.timeBetweenEvictionRunsMillis=30000
        redis.minEvictableIdleTimeMillis=1800000
```

## 	3.创建application-redis.xml配置文件

```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <beans xmlns="http://www.springframework.org/schema/beans"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:p="http://www.springframework.org/schema/p"
               xmlns:context="http://www.springframework.org/schema/context"
               xsi:schemaLocation="
                    http://www.springframework.org/schema/beans
                    http://www.springframework.org/schema/beans/spring-beans.xsd
                    http://www.springframework.org/schema/context
                    http://www.springframework.org/schema/context/spring-context.xsd">
            <!--扫描redis配置文件-->
            <context:property-placeholder ignore-unresolvable="true" location="classpath:redis.properties"/>
            <!--设置连接池-->
            <bean id="poolConfig" class="redis.clients.jedis.JedisPoolConfig">
                <!-- 最大空闲连接数 -->
                <property name="maxIdle" value="${redis.maxIdle}"/>
                <!-- 最大连接数 -->
                <property name="maxTotal" value="${redis.maxTotal}" />
                <!-- 每次释放连接的最大数目 -->
                <property name="numTestsPerEvictionRun" value="${redis.numTestsPerEvictionRun}" />
                <!-- 释放连接的扫描间隔（毫秒） -->
                <property name="timeBetweenEvictionRunsMillis" value="${redis.timeBetweenEvictionRunsMillis}" />
                <!-- 连接最小空闲时间 -->
                <property name="minEvictableIdleTimeMillis" value="${redis.minEvictableIdleTimeMillis}" />
                <!-- 获取连接时的最大等待毫秒数,小于零:阻塞不确定的时间,默认-1 -->
                <property name="maxWaitMillis" value="${redis.maxWaitMillis}" />
                <!-- 在获取连接的时候检查有效性, 默认false -->
                <property name="testOnBorrow" value="${redis.testOnBorrow}" />
                <property name="testOnReturn" value="${redis.testOnReturn}" />
                <!-- 在空闲时检查有效性, 默认false -->
                <property name="testWhileIdle" value="${redis.testWhileIdle}" />
                <!-- 连接耗尽时是否阻塞, false报异常,ture阻塞直到超时, 默认true -->
                <property name="blockWhenExhausted" value="${redis.blockWhenExhausted}" />
            </bean>
            <!--Spring整合Jedis,设置连接属性-->
            <bean id="connectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory"
                  p:hostName="${redis.host}"
                  p:port="${redis.port}"
                  p:password="${redis.password}"
                  p:pool-config-ref="poolConfig"
                  p:timeout="100000"/>

            <bean id="redisTemplate"
                  class="org.springframework.data.redis.core.StringRedisTemplate">
                <property name="connectionFactory" ref="connectionFactory" />
                <!-- 如果不配置Serializer，那么存储的时候只能使用String，如果用对象类型存储，那么会提示错误 can't cast to String！！！-->
                <property name="keySerializer">
                    <!--对key的默认序列化器。默认值是StringSerializer-->
                    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
                </property>
                <!--是对value的默认序列化器，默认值是取自DefaultSerializer的JdkSerializationRedisSerializer。-->
                <property name="valueSerializer">
                    <bean class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer"/>
                </property>
                <!--存储Map时key需要的序列化配置-->
                <property name="hashKeySerializer">
                    <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
                </property>
                <!--存储Map时value需要的序列化配置-->
                <property name="hashValueSerializer">
                    <bean class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer"/>
                </property>
            </bean>
            <!--配置redis工具类bean-->
            <bean id="redisUtils" class="com.lindong.utils.RedisUtil"></bean>
        </beans>
```

## 	4.在application.xml文件中导入application-redis配置文件

```xml
		<import resource="classpath:application-redis.xml"/>
```

## 	5.创建redis工具类，便于直接使用

```java
        public final class RedisUtil {

            @Autowired
            private RedisTemplate redisTemplate;

            /**
             * 指定缓存失效时间
             *
             * @param key  键
             * @param time 时间(秒)
             * @return
             */
            public boolean expire(String key, long time) {
                try {
                    if (time > 0) {
                        redisTemplate.expire(key, time, TimeUnit.SECONDS);
                    }
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 根据key 获取过期时间
             *
             * @param key 键 不能为null
             * @return 时间(秒) 返回0代表为永久有效
             */
            public long getExpire(String key) {
                return redisTemplate.getExpire(key, TimeUnit.SECONDS);
            }

            /**
             * 判断key是否存在
             *
             * @param key 键
             * @return true 存在 false不存在
             */
            public boolean hasKey(String key) {
                try {
                    return redisTemplate.hasKey(key);
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 删除缓存
             *
             * @param key 可以传一个值 或多个
             */
            @SuppressWarnings("unchecked")
            public void del(String... key) {
                if (key != null && key.length > 0) {
                    if (key.length == 1) {
                        redisTemplate.delete(key[0]);
                    } else {
                        redisTemplate.delete(CollectionUtils.arrayToList(key));
                    }
                }
            }

            /**
             * 普通缓存获取
             *
             * @param key 键
             * @return 值
             */
            public Object get(String key) {
                return key == null ? null : redisTemplate.opsForValue().get(key);
            }

            /**
             * 普通缓存放入
             *
             * @param key   键
             * @param value 值
             * @return true成功 false失败
             */
            public boolean set(String key, Object value) {
                try {
                    redisTemplate.opsForValue().set(key, value);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }

            }

            /**
             * 普通缓存放入并设置时间
             *
             * @param key   键
             * @param value 值
             * @param time  时间(秒) time要大于0 如果time小于等于0 将设置无限期
             * @return true成功 false 失败
             */
            public boolean set(String key, Object value, long time) {
                try {
                    if (time > 0) {
                        redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
                    } else {
                        set(key, value);
                    }
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 递增
             *
             * @param key   键
             * @param delta 要增加几(大于0)
             * @return
             */
            public long incr(String key, long delta) {
                if (delta < 0) {
                    throw new RuntimeException("递增因子必须大于0");
                }
                return redisTemplate.opsForValue().increment(key, delta);
            }

            /**
             * 递减
             *
             * @param key   键
             * @param delta 要减少几(小于0)
             * @return
             */
            public long decr(String key, long delta) {
                if (delta < 0) {
                    throw new RuntimeException("递减因子必须大于0");
                }
                return redisTemplate.opsForValue().increment(key, -delta);
            }

            // ================================Map=================================

            /**
             * HashGet
             *
             * @param key  键 不能为null
             * @param item 项 不能为null
             * @return 值
             */
            public Object hget(String key, String item) {
                return redisTemplate.opsForHash().get(key, item);
            }

            /**
             * 获取hashKey对应的所有键值
             *
             * @param key 键
             * @return 对应的多个键值
             */
            public Map<Object, Object> hmget(String key) {
                return redisTemplate.opsForHash().entries(key);
            }

            /**
             * HashSet
             *
             * @param key 键
             * @param map 对应多个键值
             * @return true 成功 false 失败
             */
            public boolean hmset(String key, Map<String, Object> map) {
                try {
                    redisTemplate.opsForHash().putAll(key, map);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * HashSet 并设置时间
             *
             * @param key  键
             * @param map  对应多个键值
             * @param time 时间(秒)
             * @return true成功 false失败
             */
            public boolean hmset(String key, Map<String, Object> map, long time) {
                try {
                    redisTemplate.opsForHash().putAll(key, map);
                    if (time > 0) {
                        expire(key, time);
                    }
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 向一张hash表中放入数据,如果不存在将创建
             *
             * @param key   键
             * @param item  项
             * @param value 值
             * @return true 成功 false失败
             */
            public boolean hset(String key, String item, Object value) {
                try {
                    redisTemplate.opsForHash().put(key, item, value);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 向一张hash表中放入数据,如果不存在将创建
             *
             * @param key   键
             * @param item  项
             * @param value 值
             * @param time  时间(秒) 注意:如果已存在的hash表有时间,这里将会替换原有的时间
             * @return true 成功 false失败
             */
            public boolean hset(String key, String item, Object value, long time) {
                try {
                    redisTemplate.opsForHash().put(key, item, value);
                    if (time > 0) {
                        expire(key, time);
                    }
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 删除hash表中的值
             *
             * @param key  键 不能为null
             * @param item 项 可以使多个 不能为null
             */
            public void hdel(String key, Object... item) {
                redisTemplate.opsForHash().delete(key, item);
            }

            /**
             * 判断hash表中是否有该项的值
             *
             * @param key  键 不能为null
             * @param item 项 不能为null
             * @return true 存在 false不存在
             */
            public boolean hHasKey(String key, String item) {
                return redisTemplate.opsForHash().hasKey(key, item);
            }

            /**
             * hash递增 如果不存在,就会创建一个 并把新增后的值返回
             *
             * @param key  键
             * @param item 项
             * @param by   要增加几(大于0)
             * @return
             */
            public double hincr(String key, String item, double by) {
                return redisTemplate.opsForHash().increment(key, item, by);
            }

            /**
             * hash递减
             *
             * @param key  键
             * @param item 项
             * @param by   要减少记(小于0)
             * @return
             */
            public double hdecr(String key, String item, double by) {
                return redisTemplate.opsForHash().increment(key, item, -by);
            }

            // ============================set=============================

            /**
             * 根据key获取Set中的所有值
             *
             * @param key 键
             * @return
             */
            public Set<Object> sGet(String key) {
                try {
                    return redisTemplate.opsForSet().members(key);
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            /**
             * 根据value从一个set中查询,是否存在
             *
             * @param key   键
             * @param value 值
             * @return true 存在 false不存在
             */
            public boolean sHasKey(String key, Object value) {
                try {
                    return redisTemplate.opsForSet().isMember(key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 将数据放入set缓存
             *
             * @param key    键
             * @param values 值 可以是多个
             * @return 成功个数
             */
            public long sSet(String key, Object... values) {
                try {
                    return redisTemplate.opsForSet().add(key, values);
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }

            /**
             * 将set数据放入缓存
             *
             * @param key    键
             * @param time   时间(秒)
             * @param values 值 可以是多个
             * @return 成功个数
             */
            public long sSetAndTime(String key, long time, Object... values) {
                try {
                    Long count = redisTemplate.opsForSet().add(key, values);
                    if (time > 0)
                    expire(key, time);
                    return count;
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }

            /**
             * 获取set缓存的长度
             *
             * @param key 键
             * @return
             */
            public long sGetSetSize(String key) {
                try {
                    return redisTemplate.opsForSet().size(key);
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }

            /**
             * 移除值为value的
             *
             * @param key    键
             * @param values 值 可以是多个
             * @return 移除的个数
             */
            public long setRemove(String key, Object... values) {
                try {
                    Long count = redisTemplate.opsForSet().remove(key, values);
                    return count;
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }
            // ===============================list=================================

            /**
             * 获取list缓存的内容
             *
             * @param key   键
             * @param start 开始
             * @param end   结束 0 到 -1代表所有值
             * @return
             */
            public List<Object> lGet(String key, long start, long end) {
                try {
                    return redisTemplate.opsForList().range(key, start, end);
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            /**
             * 获取list缓存的长度
             *
             * @param key 键
             * @return
             */
            public long lGetListSize(String key) {
                try {
                    return redisTemplate.opsForList().size(key);
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }

            /**
             * 通过索引 获取list中的值
             *
             * @param key   键
             * @param index 索引 index>0时， 0 表头，1 第二个元素，依次类推；index<0时，-1，表尾，-2倒数第二个元素，依次类推
             * @return
             */
            public Object lGetIndex(String key, long index) {
                try {
                    return redisTemplate.opsForList().index(key, index);
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            /**
             * 将list放入缓存
             *
             * @param key   键
             * @param value 值
             * @return
             */
            public boolean lSet(String key, Object value) {
                try {
                    redisTemplate.opsForList().rightPush(key, value);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 将list放入缓存
             *
             * @param key   键
             * @param value 值
             * @param time  时间(秒)
             * @return
             */
            public boolean lSet(String key, Object value, long time) {
                try {
                    redisTemplate.opsForList().rightPush(key, value);
                    if (time > 0)
                    expire(key, time);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 将list放入缓存
             *
             * @param key   键
             * @param value 值
             * @return
             */
            public boolean lSet(String key, List<Object> value) {
                try {
                    redisTemplate.opsForList().rightPushAll(key, value);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 将list放入缓存
             *
             * @param key   键
             * @param value 值
             * @param time  时间(秒)
             * @return
             */
            public boolean lSet(String key, List<Object> value, long time) {
                try {
                    redisTemplate.opsForList().rightPushAll(key, value);
                    if (time > 0)
                    expire(key, time);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 根据索引修改list中的某条数据
             *
             * @param key   键
             * @param index 索引
             * @param value 值
             * @return
             */
            public boolean lUpdateIndex(String key, long index, Object value) {
                try {
                    redisTemplate.opsForList().set(key, index, value);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }

            /**
             * 移除N个值为value
             *
             * @param key   键
             * @param count 移除多少个
             * @param value 值
             * @return 移除的个数
             */
            public long lRemove(String key, long count, Object value) {
                try {
                    Long remove = redisTemplate.opsForList().remove(key, count, value);
                    return remove;
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }

        }


```

