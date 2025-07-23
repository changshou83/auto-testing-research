## 切换Node版本

新建配置文件`.nodejs-path`：

```text
WINDOW_NODEJS_PATH=path\\to\\node
UNIX_NODEJS_PATH=/path/to/node
```
在命令行中运行脚本可切换当前命令行node版本：

```powershell
# powershell
./scripts/Update-Path.ps1
```
或者
```shell
# bash
./scripts/Update-Path.sh
```

## UI模式下的身份验证问题

> UI 模式默认不会运行 setup 项目，以提高测试速度。我们建议在现有身份验证到期时不时手动运行 auth.setup.ts 来进行身份验证。
> 
> 首先 在过滤器中启用 setup 项目，然后单击 auth.setup.ts 文件旁边的三角形按钮，然后再次在过滤器中禁用 setup 项目。
