CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Product(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    price INTEGER,
    link TEXT,
    thumbnail TEXT,
    image TEXT,
    websiteName TEXT,
    available BOOLEAN,
    availability TEXT,
    type TEXT,
    productName TEXT,
    additionalFields json,
    createdAt TIMESTAMP WITH TIME ZONE,
    updatedAt TIMESTAMP WITH TIME ZONE
);

CREATE INDEX product_websitename_idx ON Product(
    websiteName ASC
);

CREATE INDEX product_availability_idx ON Product(
    availability ASC
);

CREATE INDEX product_type_idx ON Product(
    type ASC
);

CREATE INDEX product_productname_idx ON Product(
    productName ASC
);