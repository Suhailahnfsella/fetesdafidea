# Fetesdafidea

Fetesdafidea adalah proyek berbasis Vue.js yang menggunakan API eksternal untuk mengelola data user. Aplikasi ini memiliki fitur autentikasi, pencarian, pagination, serta CRUD (Create, Read, Update, Delete) dengan validasi data.

## Langkah Awal
Pastikan kamu sudah memiliki **Node.js** atau menggunakan **NVM** (Node Version Manager) untuk mengelola versi Node.js.

- Cek apakah Node.js sudah terpasang:
  ```sh
  node -v
  ```
- Cek apakah NPM sudah terpasang:
  ```sh
  npm -v
  ```
- Jika belum, unduh dan install Node.js dari [sini](https://nodejs.org/) atau gunakan NVM dari [sini](https://github.com/nvm-sh/nvm)

## Setup Proyek
Clone repositori dan install dependensi:
```sh
npm install
```

### Jalankan server untuk development
```sh
npm run serve
```
Setelah dijalankan, buka browser dan akses: [http://localhost:8080](http://localhost:8080)

_URL tidak selalu sama persis, ada versi 8081, 8082, dst. sesuai yang ditentukan server._

Jika berhasil, maka akan tampil halaman **Sign In** seperti berikut:

![Sign In Page](https://drive.google.com/uc?export=view&id=1ZxWXmJNlk6gEof6WUQP9NrovmySzNk5V)

## Fitur Aplikasi

### 1. Login ke Aplikasi
Coba login menggunakan salah satu email user dari API ini:
[https://gorest.co.in/public/v2/users](https://gorest.co.in/public/v2/users)

- **Password default**: **Nama Belakang + 123 + \***  
  *(Contoh: jika nama belakang user adalah Malik, maka password-nya adalah `Malik123*`)*
  
  ![Login Example](https://drive.google.com/uc?export=view&id=1bCGAjpkMV6-W_g7RfaNkYEYp0EtZPqHo)
- Jika login berhasil, nama user akan tampil di pojok kiri atas.
  
  ![Logged In](https://drive.google.com/uc?export=view&id=1DzRAyGeOFY_ZXgnDyrnGl3m1zvphXggb)

### 2. Dashboard & Akses Terbatas
Halaman **Dashboard** tidak dapat diakses tanpa login. Namun, bisa diuji coba dengan mengetikkan URL secara manual:  
`http://localhost:8080/dashboard`

Jika belum login, pengguna akan diarahkan kembali ke halaman **Sign In**.

### 3. Manajemen Data User
Data yang tersimpan di API akan ditampilkan dalam bentuk tabel dengan fitur berikut:
- **Pencarian** berdasarkan berbagai kolom.
  
  ![Search Feature](https://drive.google.com/uc?export=view&id=15CAVNge64fJ32KZLq2U6vF-Wp6vIIYwL)
- **Pagination** dengan opsi 5, 10, atau 20 data per halaman.
  
  ![Pagination](https://drive.google.com/uc?export=view&id=1iw-UcKvOU6fcyctiWE5pB-Q6vkLdvN7m)
- **Navigasi halaman** menggunakan tombol **Prev, Number, Next**.
  
  ![Navigation](https://drive.google.com/uc?export=view&id=16Lp2yx0LQW-ww1VVpL3RQWDAQs-Ydw2o)

![User Management](https://drive.google.com/uc?export=view&id=1GuAfyXLjH-qFTn9lhzsuWmXE5YNRCAOv)

### 4. Menambahkan Data Baru
Form **Add New Student** dapat digunakan untuk menambah data baru.
- ID akan dibuat secara otomatis oleh server.
- Form ini dilengkapi dengan validasi dan pesan error untuk meminimalisir kesalahan input.
  
  ![Add Student](https://drive.google.com/uc?export=view&id=1zKjlW2swy-iy8I2DdsTsvuHXT_gdx0dk)

### 5. Mengedit Data User
Klik **ikon pensil** di kolom **Action** pada tabel untuk mengedit data user yang sudah ada.
  
  ![Edit Icon](https://drive.google.com/uc?export=view&id=1a-4n7BTxKWpoCD63035j5nR1pqof0jOK)
- Data akan diperbarui sesuai dengan ID yang dipilih.
  
  ![Edit User](https://drive.google.com/uc?export=view&id=1vEKBsf_0af57_AfBO79h1C24duY6hC3J)
- Terdapat validasi untuk memastikan input yang benar.
  
  ![Validation](https://drive.google.com/uc?export=view&id=1aWez35Ro4KHOGIeCm0HdJLhdFDIPtoBe)

### 6. Menghapus Data User
Klik **ikon hapus** di kolom **Action**, lalu tekan tombol **Sure** untuk mengonfirmasi penghapusan data.
  
  ![Delete User](https://drive.google.com/uc?export=view&id=1fv9sVCSOo9VZ50jgRtL8hcSw11E611HO)

### 7. Logout
Untuk mengakhiri sesi, klik tombol **Sign Out** di kanan atas. Sesi akan dihapus dari **localStorage**.
  
  ![Logout](https://drive.google.com/uc?export=view&id=1_p8aTUl8XXum11ug43kmVyzWCzTiYsfM)
