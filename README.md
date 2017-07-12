# 网上营业厅接口

> 验证码 GET `/qr_code`

- 返回验证码数据

---
> 用户注册 POST `/user/register`

- 手机号码11位， 未注册过
- 验证码
- 登陆密码8位以上

---
> 用户登陆 POST `/user/login`

- 已注册手机号登陆
- 登陆密码

---
> 用户绑定 POST `/user/login`

- 选择的售电公司
- 选择开通的服务
- 企业名称
- 组织结构代码
- 手机后4位
- 验证码

---
> 修改用户密码 POST `/user/change_password`

- 用户原密码
- 用户新密码

---
> 更换手机号码 POST `/user/change_phone_number`

- 用户原手机号码
- 用户新手机号码

---
> 用户意见建议 POST `/user/recommend`

- 建议内容
- 图片(可选)
- 联系方式(可选)

---
> 用户用电情况 GET `/user/elec_situation`

- 返回用户每月用电数据数组

每月用电数据结构
```
[
  {
    "month": "1",
    "number": "500.0000"
  }
]
```

---
> 用户用电计划 GET `/user/elec_plan`

- 返回用户用电计划数组

用电计划结构
```
[
  {
    "year": "2017",
    "month": "1",
    "state": "draft | declared",
    "create_at": Date,
    "update_at": Date,
    "type": "month | year",
    "number": "888"
  }
]
```

---
> 用户新增用电计划 POST `/user/add_elec_plan`

- 年份
- 月份
- 用电量
- 状态


---
> 推荐阅读文章 GET `/articles/recommend`

- 返回推荐阅读文章数组 


---
> 政策法规文章 GET `/articles/policy`

- 返回政策法规文章数组


---
> 电力科普文章列表 GET `/articles/science`

- 返回电力科普文章数组

文章结构
```
[
  {
    "imgsrc": "",
    "title": "",
    "create_at": "",
    "content": "",
    "author": ""
  }
]
```

---
> 业务指南问题以及答案列表 GET `/business_guide`

- 返回业务指南问题及答案数组

```
[
  {
    "questiuon": "帐号登录之后为什么使用不了功能？",
    "answer": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ipsam, nisi itaque accusamus exercitationem voluptatum cupiditate placeat nihil doloremque modi ipsa suscipit, nobis asperiores labore. Doloremque iure, recusandae voluptatem quis?"
  }
]
```

---
> 用户合同列表 GET `/user/contracts`

- 返回当前用户的合同数组

```
[
  {
    "title": "珠海高远电能科技有限公司与珠海魅族科技有限公司购售电协议",
    "party_a": "珠海魅族科技有限公司",
    "party_b": "珠海高远电能科技有限公司",
    "content": "根据中发【2015】9号《中共中央 国务院关于进一步深化电力体制改革的若干意见》的精神，按照《广东电力市场交易基本规则（试行）》要求，甲、乙双方本着平等、自愿、公            平和诚信的原则，现就年度电力交易事宜达成以下合作协议：
              一、甲方同意向乙方购买在2017年1月1日至2017年12月31日期间（又称“交易周期”）的用电量。
              二、甲、乙双方约定按以下方式进行购售电：
              1、甲方同意在乙方购买约 2000 万千瓦时电量，其中年度双边协商交易电量 2000 万千瓦时（分解至各月如下表所示），余下部分根据每月的需求作为增量参与月度集中竞价，成交量即为月度集中竞争电量。
              2、年度双边协商交易电量的电价在政府规定的甲方目录电价基础上下降 5 分/千瓦时（含税），此价差按相关电价文件要求联动。
              3、月度集中竞争电量结算按广东电力交易规则执行，此部分电量的价差电费双方按比例分成，其中甲方占6成，乙方占 4 成。
              4、甲方月度实际用电量与月度总市场电量之间的偏差造成的考核费用，按比例由甲方和乙方进行分摊，其中甲方占 5 成，乙方占 5 成。"
    "files": ["客户名单列表.xls", "现场图片001.jpg"],
    "contract_id": "GD441520170601",
    "state": "fullfill | notfullfill",
    "elec_number": 2000,
    "sign_date": Date,
    "expire_date": Date
  }
]
```

---
> 用户结算账单列表 GET `/user/settlement_bills`

- 返回当前用户结算账单数组

```
[
  {
    "date": Date,
    "state": "confirmed | unconfirmed",
    "user_benefits": 30.00,
    "confirmer": "刘杰",
    "confirm_date": Date,
    "elec_use_date": Date,
    "username": "珠海远光软件股份有限公司",
    "settle_number": 30.0000,
    "actual_elec_use": 30.0000,
    "declare_elec_number": 5000.0000,
    "decompose_elec_number": 28.0000,
    "consultation_earn": 198.0000,
    "assign_elec_number": 0.0000,
    "bid_income": -100.0000,
    "check_elec_number": 500.0000,
    "check_bill": 28.3400
  }
]
```
















