= Phân tích các application protocol được sử dụng

== HTTP

Protocol này được sử dụng cho các command line sau:
#block(inset: (left: 1cm))[
    1. *discover hostname*: gửi một GET HTTP cho hostname yêu cầu trả về danh sách metadata của tất cả file hiện có trên local repository của client.
    2. *publish lname fname*: gửi một POST HTTP tải dữ liệu của file _lname_ lên local repository với tên mới là _fname_, sau đó gửi một POST HTTP tải metadata của file _fname_ lên server.
    3. *fetch fname*: gửi một GET HTTP có parameter là _fname_ lên server để tìm kiếm thông tin các client đang lưu giữ file _fname_, sau đó gửi một GET HTTP cho client đó để tải dữ liệu file yêu cầu về local repository.
    4. *delete fname*: gửi một DELETE HTTP có parameter là _fname_ lên local repository để xóa dữ liệu tất cả các version của file, sau đó gửi một DELETE HTTP lên server để xóa metadata của file đó.
    5. *ls fname*: gửi một GET HTTP có paramter là _fname_ đến server yêu cầu trả về địa chỉ IP của tất cả client đang chứa file đó trong hệ thống file-sharing.
    6. *store*: gửi một GET HTTP đến server yêu cầu trả về metadata của tất cả file hiện đang lưu giữ bởi server.
]

== WebSocket

WebSocket là một giao thức mạng cho phép truyền dữ liệu hai chiều (full-duplex) giữa máy chủ và trình duyệt hoặc giữa các ứng dụng khác nhau qua mạng Internet. Giao thức này thường được sử dụng để xây dựng các ứng dụng web thời gian thực, như trò chuyện trực tuyến, trò chơi trực tuyến, cập nhật trực tiếp, và các ứng dụng có khả năng tương tác cao.

WebSocket khác với HTTP, một giao thức mà trình duyệt thường sử dụng để tải các trang web. Với HTTP, trình duyệt gửi yêu cầu đến máy chủ và sau đó máy chủ trả lời với dữ liệu. WebSocket cho phép thiết lập một kết nối duy trì giữa trình duyệt và máy chủ, cho phép dữ liệu được truyền đi và nhận về mà không cần thiết lập lại kết nối.

WebSocket sử dụng một handshake ban đầu dựa trên HTTP để thiết lập kết nối, sau đó nó cho phép gửi và nhận dữ liệu thông qua các gói tin tin nhắn.

Protocol này được sử dụng cho command line *ping*, cho phép target host liên tục trả về các gói dữ liệu nếu host còn đang hoạt động trong hệ thống file-sharing.
