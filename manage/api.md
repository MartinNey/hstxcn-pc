# 友拍平台api文档
## 全局声明
api的所有路由均以/api开头  
__GET请求的参数均为url参数, 其余请求和响应均为json格式__  
__用*号标注的参数均为可选参数__  
__GET请求的返回结果我就不写了__

__关于400 Bad Request的说明:__  
当request的参数出现错误的时候返回400, response为一个list, __示例如下__：  
[  
&emsp;{
&emsp;&emsp;"name": "phone_number",  
&emsp;&emsp;"error": [  
&emsp;&emsp;&emsp;"手机号已被使用。"  
&emsp;&emsp;]  
&emsp;}  
]  
name为错误的参数名, error为出错原因
    
__登陆与权限__：  
进行需要权限的操作时，HTTP Header中需存在Authorization: signed_value，否则返回401 Unanthorized  
已登陆但无权限的请求会返回403 Forbidden  
__需要登录的api使用 --login 标记__  
__需要管理员权限的api使用 --admin 标记__

__获取项目列表时可用的基本参数__：  
        __分页__(可用时用slice()标记)：  
            offset | int | 可为空 | 从第几项开始取数据  
            limit  | int | 可为空 | 取几项数据  
        __排序__(可用时用sort(...)标记,括号内为排序参照项,第一项为默认项)：  
            sortby | string | 可为空 | 根据什么排序  
            order  | string | 可为空 | asc: 顺序，desc: 逆序  
## api说明
### 1. 图片上传
#### /image
__POST:__  
__request:__  
image(binary)  
__response:__  
200 OK: id(图片的uuid)
### 2. 用户的登录、注册、修改信息以及激活
#### /login
__POST:__  
__request:__   
phone_number(string), password(string)  
__response:__  
200 OK: auth(token值)  
400 Bad Request
#### /register
__POST:__  
__request:__  
phone_number(string), email(string), name(string), desciption(string)(个人简介), sex(bool)(true/1为男， false/0为女), images(list[uuid])(用户的作品, 将放在首页的用户位置展示), \*major(string)(用户的专业、班级等信息), \*imagelink(string)(用户的图集链接), \*tags(list[string])(用户的个人标签), \*school(uuid), \*styles(list[uuid])(用户选择的摄影风格), \*categories(list[uuid])(用户选择的摄影类目)  
__response:__  
201 created: None  
400 Bad request 
#### /profile(查询、修改用户信息)
__GET:__  
__response__:  
200 OK 

__PATCH:__  
__request:__  
\*self_password(string)(修改密码时必填, 其他情况可为空), \*password(string)(修改密码时填写), \*password1(string)(确定密码), \*email(string), \*name(string), \*desciption(string)(个人简介), \*sex(bool)(true/1为男， false/0为女), \*major(string)(用户的专业、班级等信息), \*imagelink(string)(用户的图集链接), \*tags(list[string])(用户的个人标签), \*school(uuid), \*styles(list[uuid])(用户选择的摄影风格), \*categories(list[uuid])(用户选择的摄影类目)  
__response:__  
200 OK: 和GET一样  
#### /activate(激活用户) --admin
__POST:__  
__request:__  
phone_number(string)  
__response:__  
200 OK  
400 Bad Request
### 3. 作品集的增删改查以及点赞
#### /photographer/{摄影师uuid}/collection
__GET:__  
__request:__  
slice(), sort('create_time', 'likes')(likes为点赞数)  
__response:__  
200 OK  
#### /photographer/{摄影师uuid}/collection/count(查询摄影师作品集的个数)
__GET:__  
__response:__  
200 OK
#### /collection/{作品集uuid}/like(作品集点赞)
__GET:__  
__response:__  
204 No Content  
403 Forbidden  

__DELETE:__  
204 No Content  
403 Forbidden  
#### /collection/{作品集uuid}
__GET:__  
__response:__  
200 OK  
#### /user/collection(用户查增作品集) --login
__GET:__  
__response:__  
200 OK  

__POST:__  
__request:__  
name(string), description(string)(简介), \*model_name(string)(模特), \*photoshop(string)(后期), \*filming_time(string)(拍摄时间), images(list[uuid])(作品集内的图片)  
__response:__  
200 OK: 和/collection/(uuid)的GET的response一样  
#### /user/collection/{作品集uuid} --login
__GET:__  
__response:__  
200 OK  

__PATCH:__  
__request:__  
name(string), description(string)(简介), \*model_name(string)(模特), \*photoshop(string)(后期), \*filming_time(string)(拍摄时间)  
__response:__  
200 OK: 和/collection/(uuid)的GET的response一样  

__DELETE:__  
__response:__  
204 No Content  
#### /user/collection/{作品集uuid}/works --login
__POST:__  
__request:__   
work(uuid)(图片的uuid)  
__response:__  
200 OK  
#### /user/collection/{作品集uuid}/works/(图片uuid) --login
__DELETE:__	 
__response:__  
204 No Content  

### 4. 摄影师查询
#### /photographer(查询所有摄影师)
__GET:__ 
__request:__  
slice(), sort('number', 'create_time', 'likes'), style(uuid)(风格， 可为多个), theme(uuid)(主题)(可为多个), school(uuid)(学校)(可为多个), category(uuid)(类目)(可为多个)  
__response:__  
200 OK  
#### /photographer/search(摄影师按姓名搜索)
__GET:__  
__request:__
slice(), sort('number', 'create_time', 'likes'), keyword(uuid)(用户输入的搜索关键字)  
#### /photographer/option(查询有哪些可选的学校、风格、类目)
__GET:__  
__response:__  
200 OK  

__POST --admin:__  
__request:__ 
type(string)(值可为'style', 'school', 'category'), name(string)

#### /photographer/{摄影师uuid}
__GET:__  
__response:__  
200 OK  

### 5. 主题增删改查
#### /theme
__GET:__  
__request:__  
slice(), sort('create_time')  
__response:__  
200 OK  

__POST --admin__  
__request:__  
name(string), cover(uuid)(主题封面图片的uuid), collections(list[uuid])(主题内作品集的uuid)  
__response:__  
201 Created  
#### /theme/{主题uuid}  
__GET:__  
__response:__  
200 OK  

__PATCH --admin:__  
__request:__  
name(string), cover(uuid)(主题封面图片的uuid)  
__response:__  
200 OK  

__DELETE --admin:__  
__response:__  
204 No Content  
#### /theme/count  
__GET:__  
__response:__  
200 OK
#### /theme/{主题uuid}/collection  
__GET:__  
__response:__  
200 OK  

__POST --admin:__  
__request:__  
collection(uuid)(添加到主题的作品集的uuid)  
__response:__  
200 OK  
#### /theme/{主题uuid}/collection/{作品集uuid}
__GET:__  
__response:__  
200 OK  

__DELETE --admin:__  
__response:__  
204 No Content  
#### /theme/{主题uuid}/collection/count
__GET:__  
__response:__  
200 OK


