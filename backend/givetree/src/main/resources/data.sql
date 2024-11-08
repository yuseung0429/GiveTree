SET
SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

INSERT IGNORE INTO member (member_id, is_deleted, created_at, email, name, password, profile_image_id)
VALUES (
     0,
     0,
     NOW(),
     'givetree@givetree.co.kr',
     '관리자',
     '$2a$10$/.Jodl2CFABK5kOvvQPO3eMSGpJ4BqcCwJ2F6iD6A.h6N6sRY0VLe',
     NULL
);

INSERT IGNORE INTO member (member_id, is_deleted, created_at, email, name, password, profile_image_id)
VALUES (
     1,
     0,
     NOW(),
     'crash_a@naver.com',
     '이유승',
     '$2a$10$o9AU3Lpwul/Zxw0iXPk2kO1xABAakPKeDEfsjhUudcVkX/zgADb0i',
     NULL
);

INSERT IGNORE INTO member_finance (member_id, user_key, salt, simple_password)
VALUES (
     0,
     UNHEX(REPLACE('7409aac6-3df9-4bfe-9d4d-56af85c84181', '-', '')),
     UNHEX('028F68CD6340D14E152A543EE27F45461505000C945B520233E567BFC8A8A58C'),
     UNHEX('B087894AC6D243219741B6EB38769C5D1A9FD1C3539CF23869E82C354DF97155')
);

INSERT IGNORE INTO member_finance (member_id, user_key, salt, simple_password)
VALUES (
     1,
     UNHEX(REPLACE('ecb40605-24d3-414a-9a58-db07133802a6', '-', '')),
     UNHEX('85FB359D7B8B4AFBC6D9EAD6F17734025474BD89AD38475FB6F658B3AD9B2C2A'),
     UNHEX('4B026599AF93007C195B1107C92000F0D720ED66B646DB29620CFB385F4F8236')
);

INSERT IGNORE INTO account (account_id, created_at, expiry_at, is_active, member_id, account_number, bank_code, name)
VALUES (
     0,
     '2024-11-08',
     '2029-11-08',
     1,
     0,
     '0010710164044685',
     '001',
     '한국은행 수시입출금 상품'
);

INSERT IGNORE INTO account (account_id, created_at, expiry_at, is_active, member_id, account_number, bank_code, name)
VALUES (
     1,
     '2024-11-08',
     '2029-11-08',
     1,
     1,
     '0888026363792954',
     '088',
     '신한 슈퍼 SOL'
);

INSERT IGNORE INTO wallet (wallet_id, address, private_key)
VALUES (
     0,
     UNHEX('F39FD6E51AAD88F6F4CE6AB8827279CFFFB92266'),
     UNHEX('AC0974BEC39A17E36BA4A6B4D238FF944BACB478CBED5EFCAE784D7BF4F2FF80')
);

INSERT IGNORE INTO member_wallet (member_id, wallet_id)
VALUES (
   0,
   0
);

INSERT IGNORE INTO wallet (wallet_id, address, private_key)
VALUES (
     1,
     UNHEX('4B0858D9ACD7FBAC5B9D78729231EC1D0BF67B1B'),
     UNHEX('9D6FE0EFB5D58B593A68976E4DAE5E5B78B0D57BDD7EB09A9BF759758C44A21A')
);

INSERT IGNORE INTO member_wallet (member_id, wallet_id)
VALUES (
     1,
     1
);





