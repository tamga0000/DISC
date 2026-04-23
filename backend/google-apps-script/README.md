# Google Apps Script Backend

Backend nay phuc vu 4 viec:
- dang ky / dang nhap
- luu user va lich su assessment vao Google Sheet
- gui email ket qua DISC
- cap dashboard admin

## 1. Tao spreadsheet
- Tao 1 Google Spreadsheet moi
- Mo `Extensions > Apps Script`
- Copy file `Code.gs` va `appsscript.json` vao project
- Gan `SPREADSHEET_ID` trong `Code.gs` bang ID cua spreadsheet can dung
- Chay ham `setupSpreadsheet()`

## 2. Tao tai khoan admin
- Chay ham:
  - `seedAdmin("admin@company.com", "12345678", "Admin DISC")`

## 3. Deploy web app
- `Deploy > New deployment`
- Type: `Web app`
- Execute as: `Me`
- Who has access: `Anyone`
- Copy URL deploy

## 4. Gan frontend
- Mo file `config.js`
- Gan:
  - `window.DISC_CONFIG.apiBase = "YOUR_DEPLOYED_WEB_APP_URL"`

## 5. Google Sheet schema
Script se tu tao 4 sheet:
- `users`
- `sessions`
- `assessments`
- `email_logs`

## 6. Logic nghiep vu da duoc ap dung
- user dang ky tai trang chu hoac sau khi lam xong bai test
- user thuong khong thay dashboard admin
- sau khi nop bai:
  - backend cham diem
  - backend gui email
  - chi khi gui thanh cong moi set `result_visible_to_user = TRUE`
- neu email loi:
  - van luu assessment vao sheet
  - profile user hien trang thai loi
  - co nut cap nhat email de gui lai

## 7. Luu y bao mat
- day la ban co so de dua vao production nhe
- truoc khi dung that, nen:
  - them rate limit
  - them session expiry
  - doi sang mail provider ben ngoai neu can throughput cao
  - bo sung captcha cho dang ky
