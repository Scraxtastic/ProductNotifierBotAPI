-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES 
CREATE TABLE IF NOT EXISTS ProductType(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS ProductName(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    productName TEXT NOT NULL,
    productTypeID UUID NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT FK_Product_Name_Type FOREIGN KEY (productTypeID) REFERENCES ProductType(id)
);

CREATE TABLE IF NOT EXISTS CompanyName(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyName TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS Product(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    link TEXT,
    thumbnail TEXT,
    image TEXT,
    websiteName TEXT NOT NULL,
    productTypeID UUID,
    productNameID UUID,
    companyNameID UUID,
    additionalFields JSON,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT FK_Product_Type FOREIGN KEY (productTypeID) REFERENCES ProductType(id),
    CONSTRAINT FK_Product_Name FOREIGN KEY (productNameID) REFERENCES ProductName(id),
    CONSTRAINT FK_Company_Name FOREIGN KEY (companyNameID) REFERENCES CompanyName(id)
);

CREATE TABLE IF NOT EXISTS ProductSnapshot(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    productID UUID NOT NULL,
    price INTEGER NOT NULL,
    available BOOLEAN NOT NULL,
    availability TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT FK_Product_ID FOREIGN KEY (productID) REFERENCES Product(id)
);

CREATE TABLE IF NOT EXISTS Apikeys(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    givenTo TEXT NOT NULL,
    permissions JSON NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE,
    updatedAt TIMESTAMP WITH TIME ZONE
);

-- INDEDXES 
CREATE INDEX product_websitename_idx ON Product(websiteName ASC);