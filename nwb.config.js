module.exports = {
	type: 'react-component',
	npm: {
		esModules: true,
		umd: false
	},
	webpack: {
		rules: {
			graphics: {
				name: '[path][name].[ext]'
			}
		}
	},
	karma: {
		browsers: ['Chrome'],
		extra: {
			mochaReporter: {
				divider: '°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸',
				output: 'autowatch'
			}
		}
	}
}
