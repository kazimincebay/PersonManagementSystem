Personel Yönetim Sistemi

Bu proje, Angular, .Net Core Web API ve T-SQL kullanılarak geliştirilmiş bir Personel Yönetim Sistemi'dir. Sistem, personel bilgilerinin yönetilmesini kolaylaştırmak amacıyla tasarlanmıştır.

---

Özellikler

- Personel kayıtlarının listelenmesi ve filtrelenmesi
- Yeni personel ekleme
- Personel bilgilerini güncelleme
- Personel kaydını silme
- TC Kimlik Numarası doğrulama işlemi ile yeni personel ekleme sırasında kontrol
- Angular Material bileşenleri kullanılarak modern ve kullanıcı dostu arayüz

---

Teknolojiler

- Frontend: Angular, Angular Material
- Backend: .Net Core Web API
- Veritabanı: Microsoft SQL Server (T-SQL)

---

Kurulum ve Çalıştırma

Ön Gereksinimler

- Node.js ve npm (Angular için)
- .Net Core SDK
- SQL Server veya uygun bir T-SQL destekleyen veritabanı sunucusu

Adımlar

1. Veritabanı Kurulumu:

   - Proje ile birlikte gelen SQL script'ini kullanarak gerekli tabloları ve ilişkileri oluşturun.
   - Veritabanı bağlantı ayarlarını appsettings.json dosyasında yapılandırın.

2. Backend (.Net Core Web API) Çalıştırma:

   cd backend
   dotnet restore
   dotnet run

3. Frontend (Angular) Çalıştırma:

   cd frontend
   npm install
   ng serve

4. Tarayıcınızda http://localhost:4200 adresine giderek uygulamayı görüntüleyebilirsiniz.

---

Proje Mimarisi

- Angular: Bileşen tabanlı mimari ile kullanıcı arayüzü oluşturulmuştur.
- Angular Material: UI bileşenleri için kullanılmıştır.
- .Net Core Web API: RESTful servisler sunar.
- T-SQL: Veritabanı işlemleri ve sorguları için kullanılmıştır.

---

Özelleştirme ve Geliştirme

- TC Kimlik Numarası kontrolü frontend üzerinde yapılmakta olup, kurallara göre doğrulama sağlanmaktadır.
- Filtreleme ve arama özellikleri frontend'de Angular ile gerçekleştirilmiştir.
- Yeni özellikler eklemek için ilgili Angular bileşenleri ve Web API controller'ları geliştirilebilir.

---

İletişim

Herhangi bir soru veya öneri için benimle iletişime geçebilirsiniz.

---

Not: Bu proje staj sürecinde geliştirilmiştir ve eğitim amaçlıdır.
