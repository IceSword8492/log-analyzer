# 使い方

## ログファイル解析

logsにダウンロードしたログのzipを解答したフォルダを配置する (例: /logs/app-debug.apk_results)

以下のコマンドを実行すると各ログフォルダ内に解析済みのファイルが生成される。

### 全ファイル解析

```bash
node .
```

### 一部のファイルを解析

- name
    - ファイル名の一部

```bash
node . <name: string>
```

## 全画像ファイル抽出

/imgs内に抽出された全画像が生成される。0

```bash
node ./createImgDir.js
```

## メモ抽出

各ログフォルダ内のmemo.txtの内容を抽出してstdoutに出力する。

```bash
node ./memo.js
```
