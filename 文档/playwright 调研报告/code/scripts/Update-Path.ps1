$ConfigFile = "$PSScriptRoot\..\.nodejs-path"

function Read-PathFromConfig {
    if (Test-Path -Path $ConfigFile) {
        $content = Get-Content -Path $ConfigFile -Raw

        # 使用正则表达式匹配 WINDOW_NODEJS_PATH 的值
        if ($content -match 'WINDOW_NODEJS_PATH\s*=\s*([^\r\n]+)') {
            return $matches[1].Trim()  # 返回匹配到的值并去除首尾空格
        }
    }

    return $null
}

# 获取配置的路径
$NodejsPath = Read-PathFromConfig

# 验证配置文件和路径
if (-not $NodejsPath) {
    Write-Error "config file '$ConfigFile' not exist or doesn't includes a valid path"
    exit 1
}
#
if (-not (Test-Path -Path $NodejsPath -PathType Container)) {
    Write-Error "the path specified in config file '$NodejsPath' not exist or not a dictionary"
    exit 1
}

# 标准化路径格式（转为绝对路径并统一分隔符）
$NormalizedPath = (Resolve-Path -Path $NodejsPath).Path

# 检查路径是否已在 PATH 中
$PathArray = $env:PATH -split ';' | ForEach-Object { $_.Trim() }
if ($PathArray -ccontains $NormalizedPath) {
    # 移除已存在的路径
    $PathArray = $PathArray | Where-Object { $_ -cne $NormalizedPath }
}

# 添加到 PATH 开头
$env:PATH = "$NormalizedPath;$($PathArray -join ';')"

$NodeVersion = node -v
Write-Host "current node version: $NodeVersion"
