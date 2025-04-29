# API Automation Nearon

Proyek otomatisasi API testing menggunakan TypeScript dan Playwright.

## Prasyarat

- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn
- Allure Command Line Tools

## Instalasi

1. Clone repositori:
```bash
git clone [URL_REPOSITORI]
cd api-automation-nearon
```

2. Install dependencies:
```bash
npm install
# atau
yarn install
```

3. Install Allure Command Line Tools:
```bash
npm install -g allure-commandline
```

## Konfigurasi

1. Buat file `.env` di root direktori:
```bash
cp .env.example .env
```

2. Sesuaikan nilai variabel environment di file `.env` sesuai kebutuhan.

## Menjalankan Test

### Menjalankan Semua Test
```bash
npm run test
# atau
yarn test
```

### Menjalankan Test Spesifik
```bash
npm run test -- --grep "nama_test"
# atau
yarn test --grep "nama_test"
```

### Menjalankan Test dengan Allure Report
```bash
npm run test:report
# atau
yarn test:report
```

## Melihat Allure Report

1. Setelah test selesai dijalankan, generate report:
```bash
allure generate allure-results -o allure-report --clean
```

2. Buka report di browser:
```bash
allure open allure-report
```

## Struktur Proyek

```
src/
├── api/         # Endpoint dan request handlers
├── config/      # Konfigurasi proyek
├── data/        # Data test
├── types/       # Type definitions
└── utils/       # Utility functions

tests/
├── Login/       # Test cases untuk login
└── Profile/     # Test cases untuk profile
```

## Logging

Log test akan tersimpan di direktori `allure-results/`. Untuk melihat log:

1. Generate report Allure
2. Buka report di browser
3. Navigasi ke tab "Suites" untuk melihat detail log

## Troubleshooting

Jika mengalami masalah:

1. Pastikan semua dependencies terinstall dengan benar
2. Periksa konfigurasi di file `.env`
3. Bersihkan cache dan node_modules jika diperlukan:
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

## Kontribusi

1. Fork repositori
2. Buat branch baru (`git checkout -b fitur/namafitur`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/namafitur`)
5. Buat Pull Request 