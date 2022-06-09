(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{417:function(s,a,e){"use strict";e.r(a);var n=e(56),t=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"语句"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语句"}},[s._v("#")]),s._v(" 语句")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("if语句")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("if(expr1,expr2,expr3)\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[e("p",[s._v("上述语法中expr1代表运算表达式,expr2和expr3是符合expr1的结果")])]),s._v(" "),e("li",[e("p",[s._v("expr1的运算结果为真时,则返回结果为expr2")])]),s._v(" "),e("li",[e("p",[s._v("expr1的运算结果为假时,则返回结果为expr3")])])]),s._v(" "),e("p",[s._v("示例:")]),s._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 计算每个雇员的奖金。如果一个雇员的id是奇数并且他的名字不是以'M'开头，那么他的奖金是他工资的100%，否则奖金为0。")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("select")]),s._v(" employee_id"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("employee_id "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("and")]),s._v(" name "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("not")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("like")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'M%'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("salary"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" Employees"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("if null 表达式")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("if null(expr1,expr2)\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[s._v("expr1不为null的情况下都返回expr1,反之都是返回expr2")])]),s._v(" "),e("p",[s._v("示例")]),s._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## expr1为null返回00")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("select")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"00"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("00")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("case ... when ... then ... eles ... end")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("case 表达式\n    when 值1 then 结果1\n    when 值2 then 结果2\n    else 结果3\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("ul",[e("li",[s._v("case when 类似于if...else...语句")])]),s._v(" "),e("p",[s._v("示例")]),s._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 更新学生表中的数据,根据成绩判断")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("update")]),s._v(" students "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CASE")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHEN")]),s._v(" SCORE "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'A'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("THEN")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'优'")]),s._v("\n         "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHEN")]),s._v(" SCORE "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'B'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("THEN")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'良'")]),s._v("\n         "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHEN")]),s._v(" SCORE "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'C'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("THEN")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'中'")]),s._v(" \n         "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ELSE")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'不及格'")]),s._v(" \n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("END")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("union all")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("SELECT column_name(s) FROM table1\nUNION ALL\nSELECT column_name(s) FROM table2;\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("ul",[e("li",[s._v("这个指令的目的也是要将两个 SQL 语句的结果合并在一起。")]),s._v(" "),e("li",[s._v("UNION ALL 会将每一笔符合条件的资料都列出来，无论资料值有无重复。")]),s._v(" "),e("li",[s._v("UNION 操作符选取不同的值,只展示不同的")])]),s._v(" "),e("p",[s._v("示例")]),s._v(" "),e("p",[s._v("table1:")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[s._v(" |   employee_id   |    name      |\n |  -------------- | ------------ |\n |   2             |   Crew       |\n |   4             |   Haven      |\n |   5             |   Kristian   |\n")])])]),e("p",[s._v("table2:")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[s._v(" +-------------+--------+\n | employee_id | salary |\n +-------------+--------+\n | 5           | 76071  |\n | 1           | 22517  |\n | 4           | 63539  |\n +-------------+--------+\n")])])]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("### 表达式\nSELECT employee_id FROM table1 UNION ALL SELECT employee_id FROM table2;\n### 结果\n    +-------------+\n    | employee_id |\n    +-------------+\n    | 5           |\n    | 5           |\n    | 2           |\n    | 1           |\n    | 4           |\n    | 4           |\n    +-------------+\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])])])])])}),[],!1,null,null,null);a.default=t.exports}}]);