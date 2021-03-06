(function() {
	var Validate = {
		$maskerLoading: $('.masker-loading'),
		$blackMask: $('.masker-black'),
		//初始化
		walletName: null,
		pwd: null,
		repwd: null,
		isEmpty: true,
		//验证是否通过 
		walletNameFlag: false,
		pwdFlag: false,
		repwdFlag: false,
		agreeFlag: false,
		//验证正则
		init() {
			this.submitForm();
		},
		checkEmpty(val) {
			if(val) {
				this.isEmpty = false;
			}
		},
		checkName(elements, errContainer) {
			this.walletName = $(elements).val();
			this.checkEmpty(this.walletName);
			if(this.isEmpty) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("钱包名称不能为空");
			} else if(this.walletName.length > 8) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("钱包名称长度不能超过8位");
			} else {
				this.walletNameFlag = true;
				$(errContainer).addClass("mui-hidden");
				$(errContainer).text("");
			}
			return this;
		},
		checkPwd(elements, errContainer) {
			this.pwd = $(elements).val();
			this.checkEmpty(this.pwd);
			if(this.isEmpty) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("密码不能为空");
				return;
			} else if(this.pwd.length < 8 || this.pwd.length > 18) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("8-18位字符，建议混合大小写字母、数字、特殊字符");
				return;
			} else {
				this.pwdFlag = true;
				$(errContainer).addClass("mui-hidden");
				$(errContainer).text("");
			}
			return this;
		},
		checkRepwd(elements, errContainer) {
			this.repwd = $(elements).val();
			this.checkEmpty(this.repwd);
			if(this.isEmpty) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("确认密码不能为空");
				return;
			} else if(this.repwd !== this.pwd) {
				$(errContainer).removeClass("mui-hidden");
				$(errContainer).text("两次输入的密码不一致");
				return;
			} else {
				this.repwdFlag = true;
				$(errContainer).addClass("mui-hidden");
				$(errContainer).text("");
			}
			return this;
		},
		checkAgree() {
			var that = this;
			this.agreeFlag = $('.mui-checkbox input')[0].checked;
		},
		submitForm() {
			var that = this;
			$("#star-setup").on('tap', function() {
				that.checkName('.e-wallet-name', '.name-error');
				that.checkPwd('.e-wallet-pwd', '.pwd-error');
				that.checkRepwd('.e-wallet-repwd', '.repwd-error');
				that.checkAgree();
				if(that.walletNameFlag && that.pwdFlag && that.repwdFlag) {
					if(that.agreeFlag) {
						$(this).addClass("mui-disabled");
						that.showLoading(true, true);
						mui.toast("创建成功");
						setTimeout(function() {
							mui.openWindow('../../../asset.html', 'asset');
							that.showLoading(false, false);
						}, 3000);
					} else {
						mui.toast('请同意《服务及隐私条款》');
					}
				}
			});
		},
		showLoading(show, masker = false) {
			this.$maskerLoading[0].className = show ? 'masker-loading' : 'masker-loading mui-hidden';
			this.$blackMask[0].className = masker ? 'masker-black' : 'masker-black mui-hidden';
		},
	}
	Validate.init();
})();