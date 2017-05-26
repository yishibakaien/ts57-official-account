module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "$": true,
        "DEBUG": true,
        "WeixinJSBridge": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        // 强制文件末尾至少保留一行空行
        "eol-last": 0,
        "no-console": 0,
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // 禁止对 function 声明重新赋值
        "no-func-assign": [
            "off"
        ],
        // 禁止在条件中使用常量表达式
        "no-constant-condition": [
            "off"
        ]
    }
};
