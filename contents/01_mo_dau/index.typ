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

= Phân tích yêu cầu

== Yêu cầu chức năng
#block(inset: (left: 1cm))[
    1. Server phải có thông tin của tất cả client tham gia vào hệ thống file-sharing, bao gồm: địa chỉ IP, thông tin tất cả file được lưu trong local repository của mỗi client (tên, URL, size, timestamp).
    2. Server có một trình thông dịch chấp nhận các lệnh sau:
    #block(inset: (left: 1cm))[
        - *discover hostname*: liệt kê danh sách các file (thông tin mỗi file bao gồm: tên, URL, size, timestamp) trên local repository của 1 client tên là _hostname_.
        - *ping hostname*: kiểm tra client _hostname_ có đang hoạt động trong hệ thống file-sharing hay không.
    ]
    3. Client có một trình thông dịch chấp nhận các lệnh sau:
    #block(inset: (left: 1cm))[
        - *publish lname fname*: thêm 1 file có đường dẫn _lname_ từ hệ thống file trên thiết bị cá nhân vào local repository của client và được đặt tên là _fname_. Local repository cũng lưu thêm timestamp cho mỗi file được thêm vào để phân biệt các file cùng tên. Metadata của file (tên, URL, size, timestamp) sẽ được gửi đến server.
        - *fetch fname*: tìm và tải về  một file tên _fname_ vào local repository từ các client khác trong hệ thống file-sharing. Nếu có nhiều file cùng tên, lặp qua tất cả và chọn tải về file có version mới nhất (timestamp gần đây nhất).
    ]
]

#pagebreak()