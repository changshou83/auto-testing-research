#!/bin/bash

# 配置文件路径
CONFIG_FILE="$(dirname "$(realpath "${BASH_SOURCE[0]}")")/../.nodejs-path"

# 从配置文件读取路径
read_path_from_config() {
  if [[ -f "$CONFIG_FILE" ]]; then
    # 使用grep和cut提取UNIX_NODEJS_PATH的值
    local path=$(grep -E '^UNIX_NODEJS_PATH\s*=' "$CONFIG_FILE" | cut -d '=' -f 2-)
    
    if [[ -n "$path" ]]; then
      # 去除首尾空格
      echo "$path" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//'
      return 0
    fi
  fi
  
  return 1
}

# 获取配置的路径
NODEJS_PATH=$(read_path_from_config)

# 验证配置文件和路径
if [[ -z "$NODEJS_PATH" ]]; then
  echo "错误: 配置文件 '$CONFIG_FILE' 不存在或未包含 UNIX_NODEJS_PATH" >&2
  exit 1
fi

# 标准化路径格式（转为绝对路径）
NORMALIZED_PATH=$(realpath "$NODEJS_PATH" 2>/dev/null)

if [[ ! -d "$NORMALIZED_PATH" ]]; then
  echo "错误: 配置文件中指定的路径 '$NODEJS_PATH' 不存在或不是目录" >&2
  exit 1
fi

# 检查路径是否已在 PATH 中
if [[ ":$PATH:" == *":$NORMALIZED_PATH:"* ]]; then
  # 移除已存在的路径
  PATH=$(echo "$PATH" | sed -E "s|:$NORMALIZED_PATH:|:|g; s|^$NORMALIZED_PATH:||; s|:$NORMALIZED_PATH$||")
fi

# 添加到 PATH 开头
export PATH="$NORMALIZED_PATH:$PATH"

# 输出当前Node.js版本
NODE_VERSION=$(node -v 2>/dev/null)
echo "当前 Node.js 版本: ${NODE_VERSION:-未找到node命令}"