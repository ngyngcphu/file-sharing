= Kiến trúc ứng dụng

Từ các yêu cầu được phân tích ở trên, ta sử dụng kiến trúc lớp cho hệ thống file-sharing, bao gồm 4 lớp:
1. Lớp lưu trữ cục bộ (Object Storage Layer): Lớp này chính là local repository của mỗi client, lưu metadata của file và dữ liệu của file.
2. Lớp giao diện (UI Layer): Chỉ xây dựng giao diện cho client, bao gồm các thành phần liên quan đến 5 command-line: *publish lname fname*, *fetch fname*, *delete fname*, *ls fname*, *store*.
3. Lớp xử lý nghiệp vụ (Service Layer): Xử lý tất cả các request từ client, tương tác với lớp cơ sở dữ liệu để cung cấp metadata của file cho client.
4. Lớp cơ sở dữ liệu (Database Layer): Lưu metadata của tất cả file trong hệ thống file-sharing.

Ngoài ra ứng dụng còn cung cấp command-shell interpreter để thực thi các command-line của server và thay cho lớp giao diện của client.

#figure(caption: [Kiến trúc hệ thống file-sharing],
    image("../images/Architecture_Design.png")
)

#pagebreak()