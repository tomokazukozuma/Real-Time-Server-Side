# Nginx設定
```bash
nginx -v
nginx version: nginx/1.11.9
```

#### configure ローカル環境での設定方法
```bash
Luaを使う場合は下記の環境変数を設定
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.0

./configure --with-ld-opt="-Wl,-rpath,/path/to/luajit-or-lua/lib" \
            --add-module=/path/to/ngx_devel_kit-0.3.0 \
            --add-module=/path/to/lua-nginx-module \
            --add-module=/path/to/ngx_dynamic_upstream \
            --add-module=/path/to/ngx_http_consistent_hash
```
