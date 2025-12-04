## 環境需求

- Node.js：建議使用 Node.js 18 以上（與 `mongodb@7` 相容）。
- npm：隨 Node.js 一同安裝。
- MongoDB：可選擇本機安裝 MongoDB 或使用 Docker（專案內含 `docker/docker-compose.yml`）。
- 作業系統：Windows / macOS / Linux 都可運行，範例以 PowerShell（Windows）指令為主。

## 主要檔案位置

- `server/`：Express 伺服器程式碼。
  - `server/app.js`：啟動點（主程式）。
  - `server/db.js`：MongoDB 連線管理（使用 `process.env.MONGODB_URI`）。
  - `server/repositories/participants.js`：資料庫操作（含 `listParticipants({ page, limit })`）。
  - `server/routes/signup.js`：API 路由。
- `docker/`：Docker 範例設定（`docker-compose.yml` 與 `mongo-init.js`）。
- `tests/api.http`：範例 API 請求（可用 VS Code REST Client 或 curl 測試）。

## 環境變數

- `MONGODB_URI`：MongoDB 連線字串（必填）。範例（使用 docker-compose 預設帳密與資料庫名稱）：

```
mongodb://root:password@localhost:27017/week11?authSource=admin
```

將上述字串設定到系統環境變數或在啟動前輸入（PowerShell）：

```powershell
$env:MONGODB_URI = "mongodb://root:password@localhost:27017/week11?authSource=admin"
```

或建立 `.env`（專案未內建 dotenv 設定，若需可自行在 `server/app.js` 加入 dotenv 支援）：

```
MONGODB_URI=mongodb://root:password@localhost:27017/week11?authSource=admin
```

## 使用 Docker 啟動 MongoDB

在 `Week11/docker` 目錄下有 `docker-compose.yml`，可啟動 MongoDB 容器：

```powershell
docker compose up -d
```

若第一次啟動，`mongo-init.js` 會在容器建立時執行一次（可用於初始化資料）。

## 安裝相依套件 & 啟動伺服器

1. 安裝 server 相依套件：

```powershell
npm install
```

2. 設定 `MONGODB_URI`（範例見上方）。

3. 開發模式啟動（使用 nodemon，自動重啟）：

```powershell
npm run dev
```

或直接啟動：

```powershell
npm start
```

預設伺服器會監聽 `app.js` 中設定的 port（預設作業環境請查看 `server/app.js`）。

## 測試 API

專案內有 `Week11/tests/api.http`（可用 VS Code REST Client 執行），或使用 curl：

1. 建立報名（POST）

```powershell
POST http://localhost:3001/api/signup
Content-Type: application/json

{
  "name": "新同學",
  "email": "new@example.com",
  "phone": "0911222333"
}
```

2. 取得清單（含分頁）

```powershell
GET http://localhost:3001/api/signup?page=1&limit=10
```

3. 更新（PATCH）與刪除（DELETE）請參考 `Week11/tests/api.http` 範例。

## Mongo Shell 測試指令

### 連線

- 使用本機 `mongosh`：

```bash
mongosh "mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11"
```

### 基本檢查
```bash
db.participants.find().pretty()
db.participants.getIndexes()
db.participants.find().sort({ createdAt: -1 }).skip(1).limit(10)
```

## 常見問題（FAQ）

- 問：啟動時出現 `Database not initialized` 或 `MONGODB_URI` 未設定錯誤？
  - 答：請確認已設定 `MONGODB_URI` 與 MongoDB 可連線。若使用 Docker，先執行 `docker compose up -d` 再啟動 server。

- 問：GET `/api/signup` 造成 server error（TypeError: Cannot destructure property...）？
  - 答：這通常是因為 router 與 repository 的函式簽名不一致。已修正路由中的呼叫，應使用 `listParticipants({ page, limit })`。確認你已拉取最新程式碼，並重新啟動 server。

- 問：MongoDB 連線失敗（認證錯誤或連不上）？
  - 答：檢查 `MONGODB_URI` 是否包含正確的使用者/密碼/DB 名稱與 `authSource`。若使用 Docker，檢查容器是否在 `27017` 埠運行（`docker ps`）。

- 問：新增使用者回傳 11000 duplicate key error（重複 email）？
  - 答：`participants` collection 在 `email` 上有 unique index，代表同一 email 只能註冊一次。若要允許重複請移除 index（不建議），或在前端先檢查 email 是否存在。

## MongoDB Compass
![MongoDB Compass](<MongoDB Compass.png>)