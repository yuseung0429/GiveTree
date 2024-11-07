SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

INSERT INTO member (member_id, is_deleted, created_at, email, name, password, profile_image_id)
SELECT 0, 0, NOW(), 'givetree@givetree.co.kr', '관리자', '$2a$10$/.Jodl2CFABK5kOvvQPO3eMSGpJ4BqcCwJ2F6iD6A.h6N6sRY0VLe', NULL
    WHERE NOT EXISTS (SELECT 1 FROM member WHERE member_id = 0);