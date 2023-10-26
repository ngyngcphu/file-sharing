#show raw.where(block: false): box.with(
  fill: luma(240),
  inset: (x: 3pt, y: 0pt),
  outset: (y: 3pt),
  radius: 2pt,
)

#show raw.where(block: true): block.with(
  fill: luma(240),
  inset: 10pt,
  radius: 4pt,
)

= Phân tích yêu cầu ứng dụng

#block(inset: (left: 1cm))[
    1. Server phải có thông tin của tất cả client tham gia vào hệ thống file-sharing, bao gồm: địa chỉ IP, thông tin tất cả file được lưu trong local repository của mỗi client (tên, URL, size, timestamp).
    2. Server có một trình thông dịch chấp nhận các lệnh sau:
    #block(inset: (left: 1cm))[
        - *discover hostname*: liệt kê danh sách các file (thông tin mỗi file bao gồm: tên, URL, size, timestamp) trên local repository của 1 client tên là _hostname_. Nếu không tồn tại hoặc client _hostname_ tạm thời không chấp nhận bất cứ request nào, thông báo lỗi cho server. 
        - *ping hostname*: kiểm tra client _hostname_ có đang hoạt động trong hệ thống file-sharing hay không.
    ]
    3. Client có một trình thông dịch chấp nhận các lệnh sau:
    #block(inset: (left: 1cm))[
        - *publish lname fname*: thêm 1 file có đường dẫn _lname_ từ hệ thống file trên thiết bị cá nhân vào local repository của client và được đặt tên là _fname_. Local repository cũng lưu thêm timestamp cho mỗi file được thêm vào để phân biệt các file cùng tên. Metadata của file (tên, URL, size, timestamp) sẽ được gửi đến server, server chỉ lưu version mới nhất của một file ứng với một client.
        - *fetch fname*: tìm và tải về  một file tên _fname_ vào local repository từ các client khác trong hệ thống file-sharing. Nếu có nhiều file cùng tên, lặp qua tất cả và chọn tải về file có version mới nhất (timestamp gần đây nhất). Nếu không có tồn tại file _fname_, thông báo lỗi cho client.
        - *delete fname*: Xóa một file tên _fname_ ra khỏi local repository của client. Đồng thời, xóa metadata của file này ra khỏi server. Nếu có bất cứ request nào   về thông tin file này đến server, thông báo lỗi _Không tồn tại file_ cho client.
        - *ls fname*: Liệt kê địa chỉ IP của tất cả client chứa file _fname_ trong hệ thống file-sharing.
        - *store*: Liệt kê metadata của tất cả file hiện đang được lưu trên server.
    ]
    4. Nhiều client có thể tải xuống các file khác nhau từ một client _"mục tiêu"_ tại cùng một thời điểm. Điều này yêu cầu ứng dụng client phải hỗ trợ đa luồng để xử lý việc tải nhiều file cùng một lúc mà không gây xung đột hoặc trì hoãn.
]

#pagebreak()