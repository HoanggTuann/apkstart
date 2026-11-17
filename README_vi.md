# ApkStart

<p align="center"><img src="docs/images/logo.png" alt="Logo ApkStart" width="160" /></p>

<p align="center">
  <a href="README.md">简体中文</a> |
  <a href="README_en.md">English</a> |
  <b>Tiếng Việt</b>
</p>

[![CI](https://github.com/RoutineMiku/apkstart/actions/workflows/ci.yml/badge.svg)](https://github.com/RoutineMiku/apkstart/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/RoutineMiku/apkstart?include_prereleases&sort=semver)](https://github.com/RoutineMiku/apkstart/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20x64-0078D6.svg)](#)

**Trình chạy ứng dụng Android trên Windows — Giúp các ứng dụng Android được cài đặt và sử dụng mượt mà y như phần mềm Windows nguyên bản.**

> *Lưu ý: Dự án đang trong giai đoạn phát triển ban đầu, là sản phẩm phi lợi nhuận mã nguồn mở do tác giả phát triển trong thời gian rảnh rỗi. Hoàn toàn miễn phí, không chèn quảng cáo.*

- 🖱️ **Nhấp đúp chuột vào .apk để cài đặt**: Sau khi đăng ký liên kết tệp `.apk`, bạn chỉ cần nhấp đúp vào bất kỳ tệp APK nào trong File Explorer để tự động phân tích → cài đặt → tạo biểu tượng lối tắt ngoài màn hình Desktop mà không cần mở bảng điều khiển giả lập cồng kềnh.
- 🧩 **Mỗi ứng dụng một biểu tượng Desktop riêng**: Biểu tượng chất lượng cao được trích xuất ngoại tuyến trực tiếp từ bên trong tệp APK và chuyển đổi thành tệp `.ico` đa kích thước chuẩn Windows. Nhấp đúp vào biểu tượng trên Desktop sẽ khởi chạy trực tiếp ứng dụng đó, mang lại trải nghiệm tương đương với việc mở một phần mềm Windows thông thường.
- 🪟 **Mỗi ứng dụng chạy trong một cửa sổ độc lập**: Môi trường Android khởi chạy ở chế độ hiển thị trực tiếp. ApkStart sẽ tự động đặt lại tiêu đề cửa sổ, áp dụng biểu tượng ứng dụng chuẩn, căn chỉnh kích thước theo tỷ lệ màn hình điện thoại/máy tính bảng và hỗ trợ cả hai chế độ: **Toàn màn hình** (lấp đầy chiều cao màn hình ở chính giữa) và **Cửa sổ** (tự do kéo dãn, thay đổi kích thước và ghi nhớ vị trí riêng cho từng ứng dụng).
- 🔍 **Tìm kiếm nhanh qua Windows Search**: Sau khi cài đặt, lối tắt sẽ được tạo đồng thời ở màn hình Desktop và Start Menu (`Programs\ApkStart\`). Bạn có thể gõ tên ứng dụng để tìm kiếm và mở trực tiếp từ Start Menu, thanh Taskbar cũng được nhóm riêng theo từng ứng dụng.
- 📁 **Chia sẻ tệp hai chiều thông minh**: Thư mục `%USERPROFILE%\ApkStartShared` trên Windows được đồng bộ hóa hai chiều theo thời gian thực với thư mục `/sdcard/ApkStartShared` trong Android. Tệp do ứng dụng Android lưu xuống sẽ xuất hiện ngay lập tức trên máy tính của bạn.
- 🪶 **Lớp vỏ siêu nhẹ, không phụ thuộc bên thứ ba**: Toàn bộ lớp vỏ giao diện Electron không có bất kỳ thư viện phụ thuộc npm bên thứ ba nào (các bộ phân tích tệp nén ZIP, ảnh PNG, biểu tượng ICO, và định dạng nhị phân Android XML đều được tự viết tay hoàn toàn). Môi trường runtime được bật lên khi có ứng dụng chạy và tự động thu hồi tài nguyên khi nhàn rỗi.

![Giao diện chính](docs/images/app.png)

```
┌────────────────────────────────────────────────────────────┐
│  Lối tắt Desktop (Biểu tượng ứng dụng thật .lnk)           │
│      │  Nhấp đúp chuột                                     │
│      ▼                                                     │
│  ApkStart.exe --launch <tên_gói>                           │
│      │  Runtime chưa chạy? → Tự động khởi động (API 34)    │
│      ▼                                                     │
│  Khởi chạy qua Activity LAUNCHER được hệ thống phân giải    │
│      │  Giám sát 18s: tự thử lại nếu crash / reset dữ liệu │
│      ▼                                                     │
│  Cửa sổ giả lập = Cửa sổ ứng dụng (Đổi tên, icon, tỷ lệ)   │
└────────────────────────────────────────────────────────────┘
```

## Tải về sử dụng ngay (Không cần biên dịch)

Cả hai nguồn tải đều chứa phiên bản hoàn toàn giống nhau:

- GitHub: [github.com/RoutineMiku/apkstart/releases](https://github.com/RoutineMiku/apkstart/releases)
- Gitee: [gitee.com/daily-miku/apkstart/releases](https://gitee.com/daily-miku/apkstart/releases) (Nguồn tốc độ cao tại châu Á)

Các định dạng đóng gói phát hành:

| Định dạng | Tên tệp | Trường hợp sử dụng |
|---|---|---|
| Bản Microsoft Store | `ApkStart_<phiên_bản>_x64.msix` | Cài đặt qua Microsoft Store. Tích hợp sẵn toàn bộ runtime, dùng offline ngay sau khi cài, tự động cập nhật qua Store. |
| Bản Portable đầy đủ | `ApkStart-v*-win64-full.zip` (~830 MB, giải nén ~1.3 GB) | **Không muốn cài đặt, không muốn chờ tải về**: Giải nén là dùng được ngay, toàn bộ runtime (máy ảo + ảnh đĩa hệ thống) đã tích hợp sẵn. |
| Bản cài đặt tiêu chuẩn | `ApkStart-v*-Setup.exe` (~1.3 GB) | Dành cho người dùng muốn có trình cài đặt đầy đủ, lối tắt Start Menu, Desktop và mục gỡ cài đặt trong Settings. |
| Bản Portable nhẹ | `ApkStart-v*-win64-portable.zip` (~96 MB, giải nén ~227 MB) | Dung lượng tải ban đầu nhẹ; runtime sẽ được tải tự động trong lần khởi chạy đầu tiên. |

> Tất cả các bản `ApkStart.exe` đều được đính kèm biểu tượng thương hiệu và thông tin tài nguyên phiên bản Windows (FileDescription = `ApkStart Trình chạy ứng dụng Android`, CompanyName = `RoutineMiku`).

### Cơ chế căn chỉnh tỷ lệ màn hình và loại bỏ dải đen

Hướng hiển thị phần cứng của màn hình giả lập (`hw.lcd.width/height`) quyết định khung hình thực tế. Khi hướng màn hình phần cứng không trùng khớp với thuộc tính `screenOrientation` do ứng dụng Android khai báo, hệ thống Android sẽ tự động thu hẹp nội dung vào một dải chữ nhật hẹp ở giữa kèm theo hai dải đen hai bên.

ApkStart xử lý triệt để vấn đề này bằng cách **phân tích tệp `AndroidManifest.xml` ngoại tuyến ngay trong lúc cài đặt APK**, thống kê xem ứng dụng này vốn là màn hình dọc hay ngang (tính trọng số cho Activity khởi động và các cảm biến xoay), sau đó lưu vào `apps.json`:

- Ứng dụng dọc (như TikTok, mạng xã hội, truyện tranh, phim ngắn) → Khởi tạo màn hình dọc 720×1280, độ phân giải 190 dpi (sw606dp), đồng thời mở khóa giao diện máy tính bảng hai cột.
- Ứng dụng ngang (như trò chơi, ứng dụng xem video) → Khởi tạo màn hình ngang 1280×720, hiển thị tràn viền sắc nét.

Hệ thống chỉ khởi động lại runtime đúng một lần duy nhất khi có sự thay đổi giữa ứng dụng màn hình dọc và ứng dụng màn hình ngang (~40 giây). Sau đó, các ứng dụng cùng chiều sẽ mở lên ngay tức thì. Bạn có thể bấm nút xoay màn hình trên thanh tiêu đề để đổi chiều bất cứ lúc nào (hệ thống sẽ ghi nhớ riêng cho ứng dụng đó), hoặc khóa cố định hướng hiển thị trong mục **Cài đặt → Cửa sổ ứng dụng**.

### Tự động chọn nguồn cập nhật nhanh nhất

Mở **Cài đặt → Cập nhật phần mềm → "Kiểm tra cập nhật"**, hoặc nhấp chuột phải vào biểu tượng khay hệ thống → "Kiểm tra cập nhật".

1. Đồng thời truy vấn phiên bản mới nhất từ cả GitHub và Gitee, chọn nguồn có mã phiên bản cao hơn;
2. Thử nghiệm tốc độ tải thực tế 256 KB trên các máy chủ và máy chủ proxy công cộng;
3. Tự động sắp xếp và tải song song đa luồng từ nguồn có băng thông cao nhất.

### Tính năng mặc định có sẵn (Không cần thiết lập thủ công)

- Tự khởi động cùng Windows và thu gọn xuống khay hệ thống; nhấp đúp vào biểu tượng trên Desktop để vào thẳng ứng dụng.
- Tự động tạo lối tắt trên cả Desktop và Start Menu với biểu tượng ứng dụng độ phân giải cao; các phiên bản cũ bị thiếu lối tắt sẽ được tự động bù đủ khi khởi động.
- Cửa sổ ứng dụng hiển thị trực tiếp bằng phần cứng (không phải truyền phát màn hình / screencast): chế độ toàn màn hình tự động căn giữa vừa vặn; chế độ cửa sổ tự động ghi nhớ kích thước từng ứng dụng. Bấm phím `F11` bất kỳ lúc nào để chuyển đổi.
- Tự động cấp các quyền ứng dụng Android thông thường để không bị nghẽn ở các hộp thoại xin quyền.
- **Sử dụng trực tiếp mạng của máy tính chủ**: Phía Android sử dụng cơ chế NAT tầng người dùng của QEMU, tận dụng card mạng vật lý của máy tính chủ, **hoàn toàn không tạo thêm bất kỳ card mạng ảo hay switch ảo nào trên Windows** (không cần cài thêm driver mạng).

## Biên dịch từ mã nguồn

```powershell
# 1. Cài đặt các gói phụ thuộc (bao gồm môi trường Electron)
npm install

# 2. Khởi chạy và hoàn tất cài đặt runtime ban đầu
npm start

# 3. (Tùy chọn) Đăng ký liên kết tệp .apk để nhấp đúp là cài đặt
npm run assoc:on

# 4. Đóng gói bản Portable
npm run pack
# Tệp đầu ra: dist/ApkStart-win64-portable/ApkStart.exe

# 5. Nén tệp phát hành zip
node build/zip.js dist/ApkStart-win64-portable ApkStart-win64-portable.zip
```

### Đóng gói bản cài đặt độc lập (Tích hợp sẵn runtime, cài xong không cần mạng)

```powershell
# Tối ưu hóa các thành phần runtime (nén system.img bằng xz/LZMA2 từ 3.1GB xuống ~1.1GB)
npm run runtime

# Đóng gói thành tệp cài đặt EXE (sử dụng NSIS)
npm run build:exe
# Tệp đầu ra: dist/release/ApkStart-<phiên_bản>-Setup.exe
```

## Kiến trúc Runtime: Độc lập hoàn toàn, không đụng chạm giả lập khác

ApkStart là một dự án hoàn toàn tự chủ. Tất cả các thành phần môi trường chạy Android đều được lưu trữ và quản lý riêng biệt tại `%APPDATA%\apkstart\runtime`.

| Thành phần | Nguồn tải | Kích thước | Mục đích sử dụng |
|---|---|---|---|
| adb (platform-tools) | Nguồn chính thức dl.google.com | ~8 MB | Cài đặt, khởi chạy và quản lý vòng đời ứng dụng |
| Android Emulator | Nguồn chính thức dl.google.com (tải 8 luồng) | ~440 MB | Động cơ máy ảo QEMU tích hợp mô hình phần cứng và dịch mã GPU |
| Ảnh đĩa Android 14 (Google Play x86_64) | Nguồn chính thức dl.google.com | ~3.1 GB (nén xz ~1.1 GB) | Nền tảng cốt lõi: chạy tốt cả ứng dụng x86, ứng dụng ARM64 (qua lớp dịch) và dịch vụ GMS |
| Trình điều khiển AEHD (Tùy chọn) | Nguồn chính thức dl.google.com | ~0.2 MB | Tăng tốc ảo hóa phần cứng (hoặc sử dụng WHPX có sẵn của Windows) |

### Khả năng tương thích và tự phục hồi sự cố

- **Tự động chuyển về giả lập phần mềm**: Nếu máy tính chưa bật ảo hóa phần cứng, hệ thống sẽ tự động chuyển sang mô phỏng phần mềm để đảm bảo ứng dụng vẫn khởi động được, đồng thời tự động thử lại tối đa 4 bộ tham số cấu hình khác nhau.
- **Tự động tính toán tài nguyên**: Dung lượng RAM và số nhân CPU được tính toán tự động dựa trên cấu hình máy tính của bạn (2–4 GB RAM / 2–4 nhân CPU).
- **Chẩn đoán thông minh**: Mọi lỗi xảy ra đều được giải thích rõ ràng kèm hướng dẫn khắc phục cụ thể; hỗ trợ xuất báo cáo chẩn đoán ngay trong phần Cài đặt.
- **Hoàn toàn không xung đột với các trình giả lập khác**: ApkStart sử dụng cổng ADB riêng biệt (**5044**), không can thiệp, không chiếm quyền và không bị ảnh hưởng bởi MuMu, LDPlayer, BlueStacks hay WSA.

### Cấu trúc lưu trữ dạng vùng chứa (Container) tối ưu dung lượng

- **Tầng cơ sở chỉ đọc (Read-only)**: Thư mục `system-images/` chỉ lưu một bản duy nhất trên máy và được dùng chung cho tất cả các ứng dụng.
- **Tầng ghi chép mỏng (Thin Writable Layer)**: Sử dụng kỹ thuật phân vùng vi sai (differential layer) và ảnh chụp nhanh bộ nhớ (quickboot snapshot). Khi bạn đóng cửa sổ ứng dụng cuối cùng, trạng thái RAM sẽ được lưu nhanh để lần mở sau chỉ mất khoảng 10 giây khởi động.
- **Tự động định dạng phân vùng `/data`**: Tự động tạo định dạng tệp ext4 chuẩn, hỗ trợ mã hóa mức tệp và SELinux thông qua công cụ `qemu-img` và `resize2fs` tích hợp.
- **Chặn triệt để các cửa sổ dòng lệnh đen**: Tự động ngăn chặn các cửa sổ console (`conhost.exe`, `netsimd.exe`, `emulator.exe`) nhấp nháy trên màn hình khi khởi chạy.

## Cấu trúc thư mục dự án

```
apkstart/
├─ src/
│  ├─ main.js              Tiến trình chính (Main Process): Quản lý cửa sổ, khay hệ thống, IPC
│  ├─ preload.js           Cầu nối bảo mật ngữ cảnh & API giao diện
│  ├─ splash-preload.js    Cầu nối bảo mật và i18n cho cửa sổ nạp ban đầu
│  ├─ locales/             Các tệp từ điển đa ngôn ngữ (zh-CN, en-US, vi-VN)
│  ├─ ui/                  Lớp hiển thị giao diện (HTML/CSS/JS thuần, không dùng framework nặng)
│  │  ├─ index.html        Giao diện chính và bảng điều khiển Cài đặt
│  │  ├─ app.js            Logic giao diện chính, danh sách ứng dụng, bắt sự kiện
│  │  ├─ i18n-client.js    Động cơ đa ngôn ngữ phản ứng nhanh phía máy khách
│  │  ├─ splash.html / .js Màn hình chờ nạp và tải cấu hình lần đầu
│  │  └─ shell.html / .js  Cửa sổ chứa ứng dụng Android độc lập
│  └─ core/
│     ├─ i18n.js           Động cơ đa ngôn ngữ Node.js, giải quyết ngôn ngữ và nội suy
│     ├─ zip.js            Bộ đọc tệp ZIP siêu nhẹ dạng luồng
│     ├─ axml.js           Bộ giải mã nhị phân Android XML (AXML)
│     ├─ arsc.js           Bộ phân tích tài nguyên resources.arsc (lấy tên ứng dụng, icon)
│     ├─ apk.js            Trích xuất thông tin APK: tên gói, icon, activity khởi chạy, ABI
│     ├─ png.js            Bộ mã hóa PNG thuần không phụ thuộc thư viện
│     ├─ shortcut.js       Trình tạo tệp biểu tượng .ico và tệp lối tắt Windows .lnk
│     ├─ assoc.js          Đăng ký liên kết tệp .apk trong Registry (HKCU, không cần Admin)
│     ├─ adb.js            Bộ điều khiển ADB tích hợp
│     ├─ engine.js         Trình giám sát máy ảo Android & quản lý snapshot
│     ├─ sharer.js         Đồng bộ thư mục hai chiều giữa Windows và Android
│     ├─ installer.js      Điều phối luồng cài đặt APK
│     └─ store.js          Lưu trữ cấu hình cài đặt và danh sách ứng dụng
├─ engine/                 Bộ nhớ đệm tải về các thành phần runtime
├─ tools/platform-tools/   Tệp nhị phân ADB di động
├─ test/                   Kiểm thử đơn vị và kiểm thử tích hợp
└─ build/pack.js           Kịch bản đóng gói bản phát hành
```

## Lệnh dòng lệnh (CLI)

```
ApkStart.exe                      Mở giao diện quản lý chính
ApkStart.exe <đường_dẫn_tep.apk>   Cài đặt trực tiếp tệp APK
ApkStart.exe --launch <tên_gói>   Mở trực tiếp ứng dụng trong cửa sổ riêng (lối tắt dùng lệnh này)
```

## Kiểm thử

```powershell
npm test                                   # Kiểm thử đơn vị & kiểm tra luồng runtime (chạy ngoại tuyến)
npm run test:boot                          # Kiểm tra khả năng khởi động qua máy ảo Alpine siêu nhẹ 61MB
npm run selftest                           # Tự kiểm tra toàn diện: Cài đặt → Khởi chạy → Chụp màn hình → Thư mục chia sẻ
electron test/electron-integration.js      # Kiểm thử tích hợp biểu tượng ICO và lối tắt
electron . --smoke test\shot.png           # Chạy thử và chụp ảnh màn hình kiểm tra giao diện
```

## Giải đáp thắc mắc thường gặp (FAQ)

### Thông báo "Chưa bật tăng tốc phần cứng"

Trình giả lập Android trên Windows hỗ trợ 2 cơ chế tăng tốc phần cứng:
1. **WHPX** (Nền tảng giám sát máy ảo Windows): Tính năng có sẵn trong Windows. Mở "Bật hoặc tắt tính năng của Windows" (Turn Windows features on or off), tích chọn **Windows Hypervisor Platform**, sau đó khởi động lại máy tính.
2. **AEHD** (Trình điều khiển tăng tốc Google Android Emulator): Trình điều khiển nhân hệ thống. Bấm nút **Sửa lỗi** trong mục **Cài đặt → Tự kiểm tra môi trường** để hệ thống tự động cài đặt.

### Biểu tượng Desktop hiển thị thành logo ApkStart hoặc bị trắng

1. Vào **Cài đặt → Tích hợp hệ thống → "Tạo lại lối tắt"**;
2. Hoặc xóa lối tắt đó đi, sau đó trong giao diện ApkStart, nhấp chuột phải vào ứng dụng và chọn **Tạo lối tắt Desktop**.

### Không thấy thiết bị Android khi gõ lệnh `adb devices`

Dịch vụ ADB của ApkStart chạy trên **cổng riêng 5044** để tránh xung đột với các phần mềm phát triển khác (cổng 5037 mặc định):

```powershell
$env:ANDROID_ADB_SERVER_PORT = 5044
adb devices
```

*(Lưu ý: Không chạy lệnh `adb connect 127.0.0.1:5555` thủ công, vì việc này sẽ kích hoạt hộp thoại xin quyền gỡ lỗi USB che mất màn hình ứng dụng).*

## Tác giả & Đóng góp

ApkStart được phát triển và duy trì bởi **RoutineMiku**.

- GitHub: <https://github.com/RoutineMiku/apkstart>
- Gitee: <https://gitee.com/daily-miku/apkstart>

<p align="center"><i>Phát triển bởi <b>RoutineMiku</b></i></p>

## Giấy phép mã nguồn

Phát hành theo giấy phép [MIT](LICENSE). Bộ cài đặt chỉ chứa mã nguồn của ApkStart và môi trường Electron. Các thành phần Android và tệp nhị phân QEMU được người dùng tải trực tiếp theo nhu cầu từ máy chủ chính thức của Google trong lần sử dụng đầu tiên, tuân theo các thỏa thuận cấp phép tương ứng.
