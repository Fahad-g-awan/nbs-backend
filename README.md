npx sequelize-cli init
npx sequelize-cli db:create

npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,user_type:ENUM

npx sequelize-cli model:generate --name quotation --attributes user_id:string,user_name:string,user_email:string,user_phone:string,data:text,total:integer

npx sequelize-cli model:generate --name product --attributes image_url:array,name:string,description:string,price:integer,metadata:json

### Adding Categories

npx sequelize-cli model:generate --name categories --attributes category:string,sub_categories:array

npx sequelize-cli model:generate --name space_association --attributes type:string

npx sequelize-cli model:generate --name materialCategory --attributes material:string

npx sequelize-cli model:generate --name additional_features --attributes style:string,color:string,features:array

npx sequelize-cli model:generate --name feature --attributes feature:string

npx sequelize-cli model:generate --name styleCategory --attributes style:string

npx sequelize-cli migration:generate --name create-migrations
npx sequelize-cli db:migrate
