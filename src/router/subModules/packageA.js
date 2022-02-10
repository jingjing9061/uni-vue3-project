module.exports = [
	{
		root: "packageA",
		pages: [
            {
				path: "test1/index",
				style: {
					navigationStyle: "custom",
					navigationBarTitleText: "测试1",
                    enablePullDownRefresh:true
				},
			},
        ]
    }
]