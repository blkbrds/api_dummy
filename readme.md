# Tạo dummy api một cách đơn giản
## Tại sao chúng ta cần giả lập một api
Đôi khi bạn không có api sẳn để kiểm tra lại sau khi implement xong một tính năng cần phải gọi api. Trong trường hợp đó, để xem ứng dụng di động hoặc web hoạt động, chúng ta cần một máy chủ, ném vào đó một số dữ liệu JSON giả.
*bài viết này cung cấp phương pháp để thiết lập một máy chủ giả lập API với ít công sức bỏ ra nhất.*  
## Bắt đầu
1. **Cài đặt nodejs và nvm**  
*Cần có nodejs để chạy server*
- Các bạn vào trang chủ của nodejs [tại đây](https://nodejs.org/en/) để tải và cài đặt bản phù hợp.
*Kiểm tra lại bằng lệnh*
`node - v`.  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image1.png)  
- Mở terminal và trỏ tới thư mục vừa clone về.  
- gõ lệnh `node index`.  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image2.png)  
**Vậy là server đả sẳn sàng để có thể tạo api tại đường dẫn http://localhost:3000**  
2. **Tạo một dummy api**  
*Trong thư mục vừa clone về có một thư mục Home, nó tương ứng với base url của chúng ta http://localhost:3000*  
*Mỗi thư mục chúng ta tạo trong đó sẽ tương ứng với path trong api dummy*  
Ví dụ:  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image3.png)  
Trong hình này thư mục **api** tương ứng với đường dẫn http://localhost:3000/api, thư mục **v2** ứng với đường dẫn http://localhost:3000/api/v2.  
- **Bắt đầu với api get đơn giản**  
*Ví dụ với api docs như sau*  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image4.png)  
a. Tạo path tương tự với api url:  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image5.png)  
b. Tạo file `health-info-settings.json` tương tự với `health-info-settings` trong url và copy nội dung response trong api doccument vào file mới tạo.  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image6.png)  
c. Test thử với postman:  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image7.png)  
- **Tạo các api phức tạp hơn**
*Chúng ta thay đổi file .json một chút với các keys*
- `method`: yêu cầu method gửi lên phải đúng nếu không sẽ báo lỗi method sai. `post`, `get`, `put` ...  
- `params`: yêu cầu request gửi lên phải có params.  
- `response`: response trả về.  
**File json hoàn chỉnh như sau**  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image8.png)  
- trong trường hợp có nhiều response trả về: chúng ta thay key `response` bằng `responses` và thêm response vào `responses` như sau:  
![](https://github.com/blkbrds/api_dummy/blob/master/Image/image9.png)  
Key `200`, `201`... tương ứng với status code trả về.  
* **Trường hợp đặc biệt url chứa id**  
- Chúng ta sẽ dùng forder hoặc file `number` thay vì id đó (1, 2), khi đó, với bất kỳ id nào củng đều trỏ đến thư mục `number` hoặc file `number.json`.  
- Trường hợp muốn response cố định cho id nào thì vẫn để id đó làm tên file hoặc forder.










