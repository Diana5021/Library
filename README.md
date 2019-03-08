### Library
####图书管理系统


#####接口
/home 主页 req:none
            res:'ok'
/book/items 列表  req: { search, pageNo, sort }  
                res: data 
/book/item/ 详情 req: { id, search , data}
                    res: data
/book/publish 发布 

/book/change  修改

/user/password 修改密码