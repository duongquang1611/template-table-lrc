import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Định nghĩa các môi trường
const environments = {
  dev: {
    file: 'env/.env.development',
    name: 'Development',
  },
  stg: {
    file: 'env/.env.staging',
    name: 'Staging',
  },
  prod: {
    file: 'env/.env.production',
    name: 'Production',
  },
};

// Lấy môi trường từ tham số dòng lệnh
const targetEnv = process.argv[2]?.toLowerCase();

// Kiểm tra môi trường hợp lệ
if (!targetEnv || !environments[targetEnv]) {
  console.error('Vui lòng chỉ định môi trường hợp lệ: dev, stg, hoặc prod');
  console.error('Ví dụ: node scripts/switch-env.mjs dev');
  process.exit(1);
}

const envConfig = environments[targetEnv];
const sourceFile = join(__dirname, '..', envConfig.file);
const targetFile = join(__dirname, '..', '.env');

try {
  // Kiểm tra file môi trường nguồn tồn tại
  if (!existsSync(sourceFile)) {
    console.error(`File ${envConfig.file} không tồn tại!`);
    process.exit(1);
  }

  // Đọc nội dung file môi trường nguồn
  const envContent = readFileSync(sourceFile, 'utf8');

  // Ghi vào file .env
  writeFileSync(targetFile, envContent);

  console.log(`✅ Đã chuyển sang môi trường ${envConfig.name}`);
  console.log(`📝 File: ${envConfig.file}`);
  console.log('\nCác biến môi trường:');
  console.log('-------------------');
  envContent.split('\n').forEach((line) => {
    if (line && !line.startsWith('#')) {
      const [key] = line.split('=');
      console.log(key);
    }
  });
} catch (error) {
  console.error('❌ Lỗi khi chuyển đổi môi trường:', error.message);
  process.exit(1);
}
