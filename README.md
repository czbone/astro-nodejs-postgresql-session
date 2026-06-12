# Astroベースのユーザ認証機能サンプル

Astroベースで`PostgreSQL`と`Redis`を使用したユーザ認証機能のサンプルプロジェクト。
フロントエンドがReact、Tailwind、Flowbite。

## コマンド

すべてのコマンドはプロジェクトのルートディレクトリからターミナルで実行します：

| コマンド         | 説明                                    |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | 依存関係をインストール                  |
| `pnpm dev`      | ローカル開発サーバーを `localhost:3000` で起動 |
| `pnpm build`    | 本番サイトを `./dist/` にビルド        |
| `pnpm preview`  | デプロイ前にローカルでビルドをプレビュー |
| `pnpm db:generate` | Prismaクライアントを生成 |
| `pnpm db:push`  | Prismaスキーマをデータベースにプッシュ |
| `pnpm db:seed`  | 初期データでデータベースをシード        |

## 準備

```bash
# モジュールインストール
pnpm install

# Prismaクライアント生成
pnpm db:generate

# データベーススキーマの適用
pnpm db:push

# 初期データの投入（オプション）
pnpm db:seed
```

### 初期データ

`pnpm db:seed` 実行後、以下のユーザでログインできます。

| メール | 名前 | ロール | パスワード |
| :----- | :--- | :----- | :--------- |
| `admin@example.com` | 管理者 | `admin` | `password` |
| `user@example.com` | 一般ユーザ | `user` | `password` |

## 環境変数の設定

### ローカル開発環境

ルートディレクトリに`.env`ファイルを作成し、以下の環境変数を設定してください。

```env
APP_TITLE=プロジェクトタイトル

# データベース設定
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/my_prisma_postgres_app?schema=public"

# セッション設定
SESSION_COOKIE_SECRET=superdupersecret
SESSION_REDIS_URL=redis://localhost:6379/
```

### 本番環境

**重要**: 本番環境（PaaS等）では、以下の環境変数を必ず設定してください。

#### 必須の環境変数

- `DATABASE_URL`: PostgreSQLデータベース接続URL
- `SESSION_REDIS_URL`: Redis接続URL
- **`SESSION_COOKIE_SECRET`**: クッキー署名用シークレット（**必ず強力なランダム文字列に変更すること**）

#### オプションの環境変数

- `APP_TITLE`: アプリケーションタイトル（デフォルト: "プロジェクトタイトル"）
- `SESSION_COOKIE_DOMAIN`: セッションクッキーのドメイン（サブドメイン間でセッションを共有する場合に設定。例: `.example.com`）
- `SESSION_COOKIE_NAME`: セッションクッキー名（デフォルト: `__session`）
- `SESSION_EXPIRES`: セッション有効期限（秒。デフォルト: `1800`）
- `SESSION_ID_PREFIX`: Redisセッションキーのプレフィックス（デフォルト: `sess:`）

#### サブドメイン間でのセッション共有

複数のアプリをサブドメイン（例: `app1.example.com` と `app2.example.com`）で運用し、PostgreSQL と Redis を共有する場合、以下を両アプリで同一に設定すると、一方でログインすれば他方もログイン状態になります。

- `SESSION_COOKIE_SECRET`
- `SESSION_REDIS_URL`
- `SESSION_COOKIE_NAME`
- `SESSION_ID_PREFIX`
- **`SESSION_COOKIE_DOMAIN`**（例: `.example.com`）

`SESSION_COOKIE_DOMAIN` を未設定の場合、クッキーは各ホスト専用となり、サブドメイン間ではセッションは共有されません。

#### セキュリティに関する注意

- `SESSION_COOKIE_SECRET`は本番環境では**必ず**強力なランダム文字列（32文字以上推奨）に変更してください
- デフォルト値（`secret`）は開発用途のみであり、本番環境では絶対に使用しないでください
- パスワードやシークレットキーは`.env`ファイルに記載し、`.gitignore`でバージョン管理から除外してください
- `SESSION_COOKIE_DOMAIN` を設定すると、その親ドメイン配下のすべてのサブドメインでクッキーが共有されます。信頼できないサブドメインを同一親ドメインで運用しないでください
